import { NextResponse } from 'next/server'
import { normalizeEmail, isValidEmail, requestOrigin } from '@/lib/investor-auth'
import { upsertRequest, getInvestor, logEvent, requestContext, recentRequestCount } from '@/lib/investor-store'
import { issueMagicLink } from '@/lib/magic-link'

export const runtime = 'nodejs'

// POST { email, name?, firm? } — records the access request and, only if the
// email is already approved, emails a magic link. Response is always neutral so
// the form can't be used to discover who is on the allowlist.
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const email = normalizeEmail(typeof body.email === 'string' ? body.email : '')
  const name = typeof body.name === 'string' ? body.name.slice(0, 200) : undefined
  const firm = typeof body.firm === 'string' ? body.firm.slice(0, 200) : undefined
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const ctx = requestContext(req)
  const recent = await recentRequestCount(ctx.ip, 10)

  await upsertRequest(email, name, firm)
  await logEvent('request', ctx, { email })

  // Rate-limit link issuance per IP; still record the request above.
  if (recent < 5) {
    const investor = await getInvestor(email)
    if (investor?.status === 'approved') {
      await issueMagicLink(email, requestOrigin(req), ctx)
    }
  }

  return NextResponse.json({ ok: true })
}
