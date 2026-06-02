import { NextResponse } from 'next/server'
import { readSessionCookie, sha256hex, isAdminEmail, normalizeEmail, isValidEmail, requestOrigin } from '@/lib/investor-auth'
import {
  resolveSession,
  getInvestor,
  listInvestors,
  recentLogs,
  approveInvestor,
  revokeInvestor,
  addApproved,
  logEvent,
  requestContext,
} from '@/lib/investor-store'
import { issueMagicLink } from '@/lib/magic-link'

export const runtime = 'nodejs'

// Resolve the caller and confirm they're an admin (env allowlist OR is_admin flag).
async function requireAdmin(req: Request): Promise<string | null> {
  const raw = readSessionCookie(req.headers.get('cookie'))
  if (!raw) return null
  const email = await resolveSession(await sha256hex(raw))
  if (!email) return null
  if (isAdminEmail(email)) return email
  const investor = await getInvestor(email)
  return investor?.is_admin ? email : null
}

export async function GET(req: Request) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const [investors, logs] = await Promise.all([listInvestors(), recentLogs(200)])
  return NextResponse.json({ investors, logs })
}

// POST { action: 'approve'|'revoke'|'add', email, name?, firm? }
export async function POST(req: Request) {
  const admin = await requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const action = body.action
  const email = normalizeEmail(typeof body.email === 'string' ? body.email : '')
  if (!isValidEmail(email)) return NextResponse.json({ error: 'invalid email' }, { status: 400 })

  const ctx = requestContext(req)

  if (action === 'revoke') {
    await revokeInvestor(email)
    await logEvent('revoked', ctx, { email, meta: { by: admin } })
    return NextResponse.json({ ok: true })
  }

  if (action === 'approve' || action === 'add') {
    const name = typeof body.name === 'string' ? body.name.slice(0, 200) : undefined
    const firm = typeof body.firm === 'string' ? body.firm.slice(0, 200) : undefined
    if (action === 'add') {
      await addApproved(email, admin, name, firm)
    } else {
      await approveInvestor(email, admin)
    }
    await logEvent('approved', ctx, { email, meta: { by: admin } })
    // Granting access = sending them a link immediately.
    await issueMagicLink(email, requestOrigin(req), ctx)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'unknown action' }, { status: 400 })
}
