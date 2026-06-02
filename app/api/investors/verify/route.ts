import { NextResponse } from 'next/server'
import { COOKIE_NAME, SESSION_TTL_DAYS, randomToken, sha256hex, requestOrigin } from '@/lib/investor-auth'
import { consumeMagicToken, createSession, logEvent, requestContext } from '@/lib/investor-store'

export const runtime = 'nodejs'

// GET ?token=… — the magic-link target. Consumes the token (single-use), starts
// a session, sets the cookie, and redirects into the room.
export async function GET(req: Request) {
  const ctx = requestContext(req)
  const origin = requestOrigin(req)
  const token = new URL(req.url).searchParams.get('token') ?? ''

  if (!token) {
    return NextResponse.redirect(`${origin}/investors/login?error=invalid`)
  }

  const email = await consumeMagicToken(await sha256hex(token))
  if (!email) {
    await logEvent('denied', ctx, { meta: { reason: 'bad-or-expired-token' } })
    return NextResponse.redirect(`${origin}/investors/login?error=expired`)
  }

  const rawSession = randomToken()
  await createSession(email, await sha256hex(rawSession), ctx)
  await logEvent('verified', ctx, { email })

  const res = NextResponse.redirect(`${origin}/investors`)
  res.cookies.set(COOKIE_NAME, rawSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 86_400,
  })
  return res
}
