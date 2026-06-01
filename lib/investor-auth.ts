// Shared investor-room auth. Works in both the edge runtime (middleware) and the
// node runtime (API routes) — uses Web Crypto, which is global in both.
//
// Model: a single shared passphrase (INVESTOR_PASSWORD) gates the room. On a
// correct password the auth route sets an httpOnly cookie whose value is a hash
// of a server secret (INVESTOR_AUTH_SECRET). Middleware recomputes that hash and
// compares — the cookie proves "authenticated" without ever storing the
// passphrase, and can't be forged without the secret.
//
// Set both as (non-public) env vars on the deployment. The dev fallbacks below
// only apply when the vars are missing, so local builds work.

export const COOKIE_NAME = 'volt_ir'
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function getSecret(): string {
  return process.env.INVESTOR_AUTH_SECRET ?? 'volt-dev-secret-change-me'
}

export function getPassword(): string {
  return process.env.INVESTOR_PASSWORD ?? 'volt-demo'
}

export async function expectedToken(): Promise<string> {
  const data = new TextEncoder().encode(`volt-investor:${getSecret()}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function isAuthorized(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const expected = await expectedToken()
  // length check first; constant-ish comparison
  if (token.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}
