import { requireUser, ok, fail } from "@/lib/server/auth"
import { redisConfig, redisCmd } from "@/lib/server/redis"
import { touch, readState, submitClip, readClips, gallery } from "@/lib/server/store"
export const dynamic = "force-dynamic"
/** GET ?gallery=<campaignId> (public) or my clips (auth).  POST {campaignId,url,platform} */
export async function GET(req: Request) {
  try {
    if (!redisConfig()) throw new Error("store_not_configured")
    const g = new URL(req.url).searchParams.get("gallery")
    if (g) return ok({ entries: await gallery(g) })
    const { sub } = await requireUser(req)
    const ids = (await redisCmd(["LRANGE", `clips:user:${sub}`, 0, 99])) as string[]
    return ok({ clips: (await readClips(ids)).map(({ sub: _s, ...c }) => c) })
  } catch (e) { return fail(e) }
}
export async function POST(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) throw new Error("store_not_configured")
    await touch(sub, email)
    const b = (await req.json().catch(() => ({}))) as Record<string, string>
    const r = await submitClip(sub, String(b.campaignId || "").slice(0, 60), String(b.url || "").slice(0, 500), String(b.platform || ""))
    return ok({ ...r, state: await readState(sub) })
  } catch (e) { return fail(e) }
}
