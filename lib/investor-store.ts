// All Postgres access for the investor data-room: allowlist, magic tokens,
// sessions, and the append-only audit log. Edge- and node-safe (@vercel/postgres).
import { sql } from '@vercel/postgres'
import { SESSION_TTL_DAYS, TOKEN_TTL_MINUTES } from '@/lib/investor-auth'

export type InvestorStatus = 'pending' | 'approved' | 'revoked'

export interface Investor {
  id: number
  email: string
  name: string | null
  firm: string | null
  status: InvestorStatus
  is_admin: boolean
  notes: string | null
  approved_by: string | null
  approved_at: string | null
  created_at: string
}

export type AccessEvent =
  | 'request'
  | 'link_sent'
  | 'verified'
  | 'denied'
  | 'page_view'
  | 'download'
  | 'approved'
  | 'revoked'
  | 'logout'

export interface RequestContext {
  ip?: string
  ua?: string
  referer?: string
  geoCountry?: string
  geoCity?: string
}

// Pull IP / UA / referer / Vercel geo off request headers for logging.
export function contextFromHeaders(h: Headers): RequestContext {
  const city = h.get('x-vercel-ip-city')
  return {
    ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
    ua: h.get('user-agent') || undefined,
    referer: h.get('referer') || undefined,
    geoCountry: h.get('x-vercel-ip-country') || undefined,
    geoCity: city ? decodeURIComponent(city) : undefined,
  }
}

export function requestContext(req: Request): RequestContext {
  return contextFromHeaders(req.headers)
}

// ---- Investors / allowlist -------------------------------------------------

export async function getInvestor(email: string): Promise<Investor | null> {
  const { rows } = await sql<Investor>`SELECT * FROM investors WHERE email = ${email} LIMIT 1`
  return rows[0] ?? null
}

// Record (or refresh) a self-service access request. Never downgrades an
// existing approved/revoked row; only fills in missing name/firm.
export async function upsertRequest(email: string, name?: string, firm?: string): Promise<Investor> {
  const { rows } = await sql<Investor>`
    INSERT INTO investors (email, name, firm)
    VALUES (${email}, ${name ?? null}, ${firm ?? null})
    ON CONFLICT (email) DO UPDATE
      SET name = COALESCE(investors.name, EXCLUDED.name),
          firm = COALESCE(investors.firm, EXCLUDED.firm)
    RETURNING *`
  return rows[0]
}

// Admin-add an email straight to approved (pre-approving a known investor).
export async function addApproved(email: string, by: string, name?: string, firm?: string): Promise<Investor> {
  const { rows } = await sql<Investor>`
    INSERT INTO investors (email, name, firm, status, approved_by, approved_at)
    VALUES (${email}, ${name ?? null}, ${firm ?? null}, 'approved', ${by}, now())
    ON CONFLICT (email) DO UPDATE
      SET status = 'approved', approved_by = ${by}, approved_at = now(),
          name = COALESCE(investors.name, EXCLUDED.name),
          firm = COALESCE(investors.firm, EXCLUDED.firm)
    RETURNING *`
  return rows[0]
}

export async function approveInvestor(email: string, by: string): Promise<Investor | null> {
  const { rows } = await sql<Investor>`
    UPDATE investors SET status = 'approved', approved_by = ${by}, approved_at = now()
    WHERE email = ${email} RETURNING *`
  return rows[0] ?? null
}

export async function revokeInvestor(email: string): Promise<void> {
  await sql`UPDATE investors SET status = 'revoked' WHERE email = ${email}`
  await revokeAllSessions(email)
}

export async function listInvestors(): Promise<Investor[]> {
  const { rows } = await sql<Investor>`SELECT * FROM investors ORDER BY created_at DESC`
  return rows
}

// ---- Magic tokens ----------------------------------------------------------

export async function createMagicToken(
  email: string,
  tokenHash: string,
  ctx: RequestContext,
): Promise<void> {
  const expires = new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000).toISOString()
  await sql`
    INSERT INTO magic_tokens (email, token_hash, expires_at, ip, ua)
    VALUES (${email}, ${tokenHash}, ${expires}, ${ctx.ip ?? null}, ${ctx.ua ?? null})`
}

// Atomically consume a token: only succeeds once, and only if unexpired.
export async function consumeMagicToken(tokenHash: string): Promise<string | null> {
  const { rows } = await sql<{ email: string }>`
    UPDATE magic_tokens SET used_at = now()
    WHERE token_hash = ${tokenHash} AND used_at IS NULL AND expires_at > now()
    RETURNING email`
  return rows[0]?.email ?? null
}

// ---- Sessions --------------------------------------------------------------

export async function createSession(email: string, sessionHash: string, ctx: RequestContext): Promise<void> {
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86_400_000).toISOString()
  await sql`
    INSERT INTO sessions (email, session_hash, expires_at, ip, ua)
    VALUES (${email}, ${sessionHash}, ${expires}, ${ctx.ip ?? null}, ${ctx.ua ?? null})`
}

// Returns the session's email if the session is live (exists, not revoked, not
// expired) AND the investor is still approved; otherwise null.
export async function resolveSession(sessionHash: string): Promise<string | null> {
  const { rows } = await sql<{ email: string }>`
    SELECT s.email FROM sessions s
    JOIN investors i ON i.email = s.email
    WHERE s.session_hash = ${sessionHash}
      AND s.revoked_at IS NULL AND s.expires_at > now()
      AND i.status = 'approved'
    LIMIT 1`
  return rows[0]?.email ?? null
}

export async function revokeSession(sessionHash: string): Promise<void> {
  await sql`UPDATE sessions SET revoked_at = now() WHERE session_hash = ${sessionHash} AND revoked_at IS NULL`
}

export async function revokeAllSessions(email: string): Promise<void> {
  await sql`UPDATE sessions SET revoked_at = now() WHERE email = ${email} AND revoked_at IS NULL`
}

// ---- Audit log -------------------------------------------------------------

export async function logEvent(
  event: AccessEvent,
  ctx: RequestContext,
  opts: { email?: string | null; docKey?: string; meta?: unknown } = {},
): Promise<void> {
  await sql`
    INSERT INTO access_log (email, event, doc_key, ip, ua, referer, geo_country, geo_city, meta)
    VALUES (${opts.email ?? null}, ${event}, ${opts.docKey ?? null}, ${ctx.ip ?? null}, ${ctx.ua ?? null},
            ${ctx.referer ?? null}, ${ctx.geoCountry ?? null}, ${ctx.geoCity ?? null},
            ${opts.meta ? JSON.stringify(opts.meta) : null})`
}

export interface LogRow {
  id: number
  email: string | null
  event: AccessEvent
  doc_key: string | null
  ip: string | null
  ua: string | null
  referer: string | null
  geo_country: string | null
  geo_city: string | null
  created_at: string
}

export async function recentLogs(limit = 200): Promise<LogRow[]> {
  const { rows } = await sql<LogRow>`SELECT * FROM access_log ORDER BY created_at DESC LIMIT ${limit}`
  return rows
}

// Crude per-IP rate limit for the request endpoint: count 'request' events in
// the last N minutes. Keeps the magic-link form from being used as a spam relay.
export async function recentRequestCount(ip: string | undefined, minutes = 10): Promise<number> {
  if (!ip) return 0
  const { rows } = await sql<{ n: number }>`
    SELECT COUNT(*)::int AS n FROM access_log
    WHERE event = 'request' AND ip = ${ip} AND created_at > now() - (${minutes} * interval '1 minute')`
  return rows[0]?.n ?? 0
}
