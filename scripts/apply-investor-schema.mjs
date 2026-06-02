// One-time / idempotent schema apply for the investor data-room.
//   node scripts/apply-investor-schema.mjs
// Loads connection vars from .env.local (Neon/Vercel Postgres), then runs each
// statement in scripts/investor-schema.sql.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

// Minimal .env.local loader (KEY="value" or KEY=value), no external dep.
try {
  const env = readFileSync(join(root, '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!m) continue
    let v = m[2].trim()
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1)
    if (!(m[1] in process.env)) process.env[m[1]] = v
  }
} catch {
  console.error('Could not read .env.local — run `vercel env pull` or provision the DB first.')
  process.exit(1)
}

const { sql } = await import('@vercel/postgres')

const file = readFileSync(join(root, 'scripts/investor-schema.sql'), 'utf8')
const statements = file
  .split('\n')
  .filter((l) => !l.trim().startsWith('--'))
  .join('\n')
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean)

console.log(`Applying ${statements.length} statements…`)
for (const stmt of statements) {
  const label = stmt.split('\n')[0].slice(0, 70)
  await sql.query(stmt)
  console.log('  ok:', label)
}
const { rows } = await sql.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('investors','magic_tokens','sessions','access_log') ORDER BY table_name"
)
console.log('Tables present:', rows.map((r) => r.table_name).join(', '))
process.exit(0)
