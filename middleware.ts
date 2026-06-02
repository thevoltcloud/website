import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME, sha256hex } from '@/lib/investor-auth'
import { resolveSession } from '@/lib/investor-store'

// Gate the investor room and its download API behind a live session. The login
// page is public (so people can request a link); the request/verify APIs aren't
// matched (they must be reachable while signed out). Admin authorization is
// enforced in the admin page + admin API, not here.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/investors/login') {
    return NextResponse.next()
  }

  const raw = req.cookies.get(COOKIE_NAME)?.value
  const email = raw ? await resolveSession(await sha256hex(raw)) : null
  if (email) {
    return NextResponse.next()
  }

  // Downloads are fetched programmatically — answer 401 rather than redirect.
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
