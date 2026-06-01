import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Lead + newsletter capture. Upserts a HubSpot contact (dedup by email) using a
// private-app token (HUBSPOT_TOKEN, scope crm.objects.contacts.write). Without
// the token configured the submission is accepted and logged so the form still
// works in preview/dev. No data is persisted here beyond the HubSpot call.

type Kind = 'contact' | 'newsletter'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function splitName(full: string): { firstname?: string; lastname?: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { firstname: parts[0] }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields. Silently accept and drop.
  if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const kind: Kind = body.kind === 'newsletter' ? 'newsletter' : 'contact'
  const name = typeof body.name === 'string' ? body.name.slice(0, 120) : ''
  const company = typeof body.company === 'string' ? body.company.slice(0, 160).trim() : ''
  const interest = typeof body.interest === 'string' ? body.interest.slice(0, 60).trim() : ''
  const message = typeof body.message === 'string' ? body.message.slice(0, 2000).trim() : ''

  const properties: Record<string, string> = { email }
  Object.assign(properties, splitName(name))
  if (company) properties.company = company

  if (kind === 'newsletter') {
    properties.lifecyclestage = 'subscriber'
  } else {
    properties.lifecyclestage = 'lead'
    properties.hs_lead_status = 'NEW'
    const note = [interest && `Interested in: ${interest}`, message].filter(Boolean).join('\n\n')
    if (note) properties.message = note
  }

  const token = process.env.HUBSPOT_TOKEN
  if (!token) {
    console.info('lead (HubSpot not configured):', { kind, email, company })
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: [{ idProperty: 'email', id: email, properties }] }),
    })

    if (!res.ok) {
      // Log for recovery but don't surface internals or fail the UX — the user
      // can also reach hello@voltcloud.ai.
      const detail = await res.text().catch(() => '')
      console.error('HubSpot upsert failed:', res.status, detail.slice(0, 500))
    }
  } catch (err) {
    console.error('HubSpot upsert error:', err)
  }

  return NextResponse.json({ ok: true })
}
