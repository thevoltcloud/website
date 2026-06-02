import { NextResponse } from 'next/server'
import { COOKIE_NAME, readSessionCookie, sha256hex } from '@/lib/investor-auth'
import { resolveSession, revokeSession, logEvent, requestContext } from '@/lib/investor-store'

export const runtime = 'nodejs'

// POST — revoke the current session and clear the cookie.
export async function POST(req: Request) {
  const ctx = requestContext(req)
  const raw = readSessionCookie(req.headers.get('cookie'))
  if (raw) {
    const hash = await sha256hex(raw)
    const email = await resolveSession(hash).catch(() => null)
    await revokeSession(hash)
    await logEvent('logout', ctx, { email })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
