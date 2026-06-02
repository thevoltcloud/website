// Mint a single-use magic-link token, persist its hash, and email the link.
// Shared by the self-service request route and the admin approve/add actions.
import { randomToken, sha256hex } from '@/lib/investor-auth'
import { createMagicToken, logEvent, type RequestContext } from '@/lib/investor-store'
import { sendMagicLink } from '@/lib/email'

export async function issueMagicLink(email: string, origin: string, ctx: RequestContext): Promise<boolean> {
  const raw = randomToken()
  const hash = await sha256hex(raw)
  await createMagicToken(email, hash, ctx)
  const res = await sendMagicLink(email, `${origin}/api/investors/verify?token=${raw}`)
  if (res.ok) await logEvent('link_sent', ctx, { email })
  return res.ok
}
