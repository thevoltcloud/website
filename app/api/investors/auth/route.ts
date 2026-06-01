import { NextResponse } from 'next/server'
import { COOKIE_NAME, COOKIE_MAX_AGE, getPassword, expectedToken } from '@/lib/investor-auth'

// POST { password } -> verify the shared passphrase, set the gate cookie.
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  if (password !== getPassword()) {
    return NextResponse.json({ error: 'Incorrect access code.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, await expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
  return res
}

// DELETE -> log out (clear the cookie).
export async function DELETE() {
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
