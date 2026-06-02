// Transactional email via Resend. Only the investor magic link for now.
// Gracefully no-ops (logs a warning) if RESEND_API_KEY isn't configured yet, so
// the rest of the flow keeps working in dev / before the domain is verified.
import { Resend } from 'resend'

function fromAddress(): string {
  return process.env.INVESTOR_FROM_EMAIL ?? 'Volt Investors <investors@cuemby.cloud>'
}

export async function sendMagicLink(email: string, url: string): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — magic link not sent to', email)
    return { ok: false, error: 'email-not-configured' }
  }

  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: email,
    subject: 'Your Volt investor data-room link',
    text: `Here is your secure link to the Volt investor data room:\n\n${url}\n\nThis link is single-use and expires in 15 minutes. If you didn't request it, you can ignore this email.`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0f172a">
        <h1 style="font-size:20px;margin:0 0 8px">Volt Investor Room</h1>
        <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px">
          Here is your secure, single-use link to the data room. It expires in 15 minutes.
        </p>
        <p style="margin:0 0 24px">
          <a href="${url}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px">Open the data room</a>
        </p>
        <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0">
          If you didn't request this, you can safely ignore it. Confidential — please don't forward this link.
        </p>
      </div>`,
  })

  if (error) {
    console.error('[email] Resend error:', error)
    return { ok: false, error: String((error as { message?: string }).message ?? error) }
  }
  return { ok: true }
}
