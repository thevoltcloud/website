import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { COOKIE_NAME, isAuthorized } from '@/lib/investor-auth'

export const runtime = 'nodejs'

// Allowlist of downloadable data-room files. Keys are opaque; the real filenames
// live server-side under investor-assets/ (outside /public), so nothing here is
// reachable by guessing a static URL.
const FILES: Record<string, { name: string; type: string }> = {
  'two-pager': {
    name: 'Volt_Two_Pager.pdf',
    type: 'application/pdf',
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
  // the route is safe even if the matcher ever changes.
  const token = request.headers
    .get('cookie')
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1)

  if (!(await isAuthorized(token))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const key = new URL(request.url).searchParams.get('file') ?? ''
  const entry = FILES[key]
  if (!entry) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  try {
    const data = await readFile(path.join(process.cwd(), 'investor-assets', entry.name))
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': entry.type,
        'Content-Disposition': `attachment; filename="${entry.name}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'file unavailable' }, { status: 404 })
  }
}
