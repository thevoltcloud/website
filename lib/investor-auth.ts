// Investor data-room auth primitives. No shared password anymore — access is
// per-email via single-use magic links that mint an opaque session token.
//
// Works in both the edge runtime (middleware) and node runtime (route handlers):
// uses Web Crypto (global in both) for hashing and randomness.

export const COOKIE_NAME = 'volt_ir'
export const SESSION_TTL_DAYS = 30
export const TOKEN_TTL_MINUTES = 15

// 32 random bytes, hex — used as the raw magic-link token and the raw session
// token. Only the hash is ever stored; the raw value lives in the URL / cookie.
export function randomToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function sha256hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
}

// Bootstrap admins via env (comma-separated). These emails can always reach the
// admin console; additional admins can be flagged in the DB (investors.is_admin).
export function adminEmails(): string[] {
  return (process.env.INVESTOR_ADMIN_EMAILS ?? 'angel@cuemby.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return adminEmails().includes(email.toLowerCase())
}

// Public origin of an incoming request (honors Vercel's proxy headers), used to
// build absolute magic-link / redirect URLs that match the host the user is on.
export function requestOrigin(req: Request): string {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voltcloud.ai'
}

// Read the raw session token from a Cookie header value (edge-safe, no next/headers).
export function readSessionCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined
  return cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1)
}
