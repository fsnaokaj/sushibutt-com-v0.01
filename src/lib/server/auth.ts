import { createRemoteJWKSet, jwtVerify } from "jose"
import { NextResponse } from "next/server"

const envId = () => (process.env.DYNAMIC_ENVIRONMENT_ID || process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "").trim()
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

export class HttpError extends Error { constructor(public status: number, msg: string) { super(msg) } }

/** Verify the Dynamic JWT (RS256 against the env's JWKS). Returns the Dynamic user id + email. */
export async function requireUser(req: Request): Promise<{ sub: string; email?: string }> {
  const id = envId()
  if (!id) throw new HttpError(503, "auth_not_configured")
  const h = req.headers.get("authorization") || ""
  const token = h.startsWith("Bearer ") ? h.slice(7) : ""
  if (!token) throw new HttpError(401, "missing_token")
  jwks ||= createRemoteJWKSet(new URL(`https://app.dynamicauth.com/api/v0/sdk/${id}/.well-known/jwks`))
  try {
    const { payload } = await jwtVerify(token, jwks, { algorithms: ["RS256"] })
    if (!payload.sub) throw new Error()
    if ((payload as { environment_id?: string }).environment_id && (payload as { environment_id?: string }).environment_id !== id) throw new Error()
    return { sub: payload.sub, email: (payload as { email?: string }).email }
  } catch {
    throw new HttpError(401, "invalid_token")
  }
}

export function ok(body: unknown) { return NextResponse.json({ ok: true, ...(body as object) }, { headers: { "Cache-Control": "no-store" } }) }
export function fail(err: unknown) {
  const e = err as { status?: number; message?: string }
  if (e?.message === "store_not_configured") return NextResponse.json({ ok: false, error: "store_not_configured" }, { status: 503 })
  if (e?.status) return NextResponse.json({ ok: false, error: e.message }, { status: e.status })
  console.error(err)
  return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
}

/** Admin passphrase (override with ADMIN_PASSPHRASE env). */
export function isAdmin(req: Request) {
  const want = process.env.ADMIN_PASSPHRASE || "wasabi-belt-77"
  return (req.headers.get("x-admin-pass") || "") === want
}
