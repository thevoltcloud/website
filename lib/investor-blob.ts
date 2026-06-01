import { get } from '@vercel/blob'

// Confidential investor material lives in a PRIVATE Vercel Blob store under the
// investor-room/ prefix. Everything is read server-side with the read-write
// token — the private blob URLs are never exposed to the browser, so the
// /investors gate (middleware) remains the only way in.
const PREFIX = 'investor-room'

function token(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN
}

// Returns the blob stream + metadata, or null if missing / no credentials.
export async function getInvestorBlob(pathname: string) {
  try {
    return await get(`${PREFIX}/${pathname}`, { access: 'private', token: token() })
  } catch {
    return null
  }
}

// Convenience for small JSON payloads stored in the room.
export async function getInvestorJson<T>(pathname: string): Promise<T | null> {
  const result = await getInvestorBlob(pathname)
  if (!result || result.statusCode !== 200) return null
  try {
    const text = await new Response(result.stream).text()
    return JSON.parse(text) as T
  } catch {
    return null
  }
}
