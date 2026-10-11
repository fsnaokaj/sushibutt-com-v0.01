import { requireUser, ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { touch, readState, welcomeSpin, dailySpin } from "@/lib/server/store"
import { WELCOME_WHEEL, DAILY_WHEEL, wheelMean } from "@/config/site"
export const dynamic = "force-dynamic"
/** GET: published odds.  POST: the one-time Welcome Spin, picked on the server. */
export async function GET() {
  const odds = (w: typeof WELCOME_WHEEL) => { const t = w.reduce((a, s) => a + s.weight, 0); return { odds: w.map((s) => ({ value: s.value, chance: s.weight / t })), mean: wheelMean(w) } }
  return ok({ welcome: odds(WELCOME_WHEEL), daily: odds(DAILY_WHEEL) })
}
export async function POST(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) throw new Error("store_not_configured")
    await touch(sub, email)
    const body = (await req.json().catch(() => ({}))) as { mode?: string }
    const r = body.mode === "daily" ? await dailySpin(sub) : await welcomeSpin(sub)
    if (!r) return Response.json({ ok: false, error: "already_spun", state: await readState(sub) }, { status: 409 })
    return ok({ ...r, state: await readState(sub) })
  } catch (e) { return fail(e) }
}
