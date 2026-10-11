import { requireUser, ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { touch, readState, welcomeSpin } from "@/lib/server/store"
import { WELCOME_WHEEL } from "@/config/site"
export const dynamic = "force-dynamic"
/** GET: published odds.  POST: the one-time Welcome Spin, picked on the server. */
export async function GET() {
  const total = WELCOME_WHEEL.reduce((a, s) => a + s.weight, 0)
  return ok({ odds: WELCOME_WHEEL.map((s) => ({ value: s.value, chance: s.weight / total })), mean: WELCOME_WHEEL.reduce((a, s) => a + s.value * s.weight, 0) / total })
}
export async function POST(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) throw new Error("store_not_configured")
    await touch(sub, email)
    const r = await welcomeSpin(sub)
    if (!r) return Response.json({ ok: false, error: "already_spun", state: await readState(sub) }, { status: 409 })
    return ok({ ...r, state: await readState(sub) })
  } catch (e) { return fail(e) }
}
