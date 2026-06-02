import { NextResponse } from 'next/server'
import { readSessionCookie, sha256hex } from '@/lib/investor-auth'
import { resolveSession, logEvent, requestContext } from '@/lib/investor-store'
import { getInvestorBlob } from '@/lib/investor-blob'

export const runtime = 'nodejs'

// Allowlist of downloadable data-room files. Keys are opaque; the real files
// live in the private Blob store and are streamed server-side — nothing is
// reachable by guessing a URL.
const FILES: Record<string, { name: string; type: string }> = {
  'two-pager': {
    name: 'Volt_Two_Pager.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  'investor-deck': {
    name: 'Volt_Investor_Deck.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  'series-a-deck': {
    name: 'Volt_Series_A_Deck.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  'financial-model': {
    name: 'Volt_Financial_Model.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'execution-plan': {
    name: 'Volt_90Day_Execution_Plan.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
}

export async function GET(request: Request) {
  // Defense in depth: middleware already gates this path, but re-check here so
  // the route is safe even if the matcher ever changes — and so we can attribute
  // the download to a specific investor in the audit log.
  const raw = readSessionCookie(request.headers.get('cookie'))
  const email = raw ? await resolveSession(await sha256hex(raw)) : null
  if (!email) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const key = new URL(request.url).searchParams.get('file') ?? ''
  const entry = FILES[key]
  if (!entry) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const blob = await getInvestorBlob(entry.name)
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: 'file unavailable' }, { status: 404 })
  }

  await logEvent('download', requestContext(request), { email, docKey: key })

  return new NextResponse(blob.stream, {
    headers: {
      'Content-Type': entry.type,
      'Content-Disposition': `attachment; filename="${entry.name}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
