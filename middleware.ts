import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME, isAuthorized } from '@/lib/investor-auth'

// Gate the investor room and its download API. The login page stays public so
// people can authenticate; the auth API is not matched (it must accept the POST).
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/investors/login') {
    return NextResponse.next()
  }

  const authorized = await isAuthorized(req.cookies.get(COOKIE_NAME)?.value)
  if (authorized) {
    return NextResponse.next()
  }

  // Downloads are fetched programmatically — answer with 401 rather than an
  // HTML redirect so the client can surface a clean error.
  if (pathname.startsWith('/api/investors/download')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const url = req.nextUrl.clone()
  url.pathname = '/investors/login'
  url.searchParams.set('from', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/investors/:path*', '/api/investors/download'],
}
