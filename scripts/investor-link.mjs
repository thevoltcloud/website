// Approve an email and print a single-use magic link WITHOUT sending email.
// Bootstrap access (before Resend is configured) and a live test of the
// token -> verify -> session flow.
//
//   node scripts/investor-link.mjs <email> [name] [firm]
//
// Reads the DB connection from .env.local (Neon/Vercel Postgres).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { randomBytes, createHash } from 'node:crypto'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

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
  console.error('Could not read .env.local'); process.exit(1)
}

const [, , emailArg, name, firm] = process.argv
if (!emailArg) { console.error('Usage: node scripts/investor-link.mjs <email> [name] [firm]'); process.exit(1) }
const email = emailArg.trim().toLowerCase()

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://volt.cuemby.cloud'
const { sql } = await import('@vercel/postgres')

// Approve (idempotent).
await sql.query(
  `INSERT INTO investors (email, name, firm, status, approved_by, approved_at)
   VALUES ($1,$2,$3,'approved','bootstrap-cli',now())
   ON CONFLICT (email) DO UPDATE SET status='approved', approved_by='bootstrap-cli', approved_at=now(),
     name=COALESCE(investors.name, EXCLUDED.name), firm=COALESCE(investors.firm, EXCLUDED.firm)`,
  [email, name ?? null, firm ?? null],
)

// Mint a token valid for 60 minutes (manual paste).
const raw = randomBytes(32).toString('hex')
const hash = createHash('sha256').update(raw).digest('hex')
const expires = new Date(Date.now() + 60 * 60_000).toISOString()
await sql.query(
  `INSERT INTO magic_tokens (email, token_hash, expires_at) VALUES ($1,$2,$3)`,
  [email, hash, expires],
)

console.log(`\nApproved ${email}. One-time link (valid 60 min):\n`)
console.log(`${site}/api/investors/verify?token=${raw}\n`)
process.exit(0)
