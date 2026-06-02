// Quick CLI view of the investor-room audit log.
//   node scripts/investor-log.mjs [limit]
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
try {
  for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!m) continue
    let v = m[2].trim()
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1)
    if (!(m[1] in process.env)) process.env[m[1]] = v
  }
} catch { console.error('no .env.local'); process.exit(1) }

const limit = Number(process.argv[2] ?? 30)
const { sql } = await import('@vercel/postgres')

const counts = await sql.query('SELECT event, COUNT(*)::int n FROM access_log GROUP BY event ORDER BY n DESC')
console.log('Event totals:', counts.rows.map((r) => `${r.event}=${r.n}`).join('  ') || '(none)')

const { rows } = await sql.query(
  `SELECT created_at, email, event, doc_key, ip, geo_city, geo_country FROM access_log ORDER BY created_at DESC LIMIT $1`,
  [limit],
)
console.log(`\nLast ${rows.length} events:`)
for (const r of rows) {
  const loc = [r.geo_city, r.geo_country].filter(Boolean).join(', ') || '—'
  console.log(`  ${new Date(r.created_at).toISOString()}  ${(r.email ?? '—').padEnd(22)} ${r.event.padEnd(11)} ${r.doc_key ?? ''}  [${loc} ${r.ip ?? ''}]`)
}
process.exit(0)
