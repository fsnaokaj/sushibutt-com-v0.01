import { requireUser, ok, fail } from "@/lib/server/auth"
import { redisConfig, redisCmd } from "@/lib/server/redis"
import { touch, readState, setProfile, claimQuest, linkAccount, requestVerify } from "@/lib/server/store"
export const dynamic = "force-dynamic"

/** GET: create-on-first-call + state.  POST {action:'profile'|'reroll'|'quest'|'link', ...} */
export async function GET(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) return ok({ store: false, state: null })
    const ref = new URL(req.url).searchParams.get("ref") || undefined
    const isNew = await touch(sub, email, ref)
    const notif = ((await redisCmd(["LRANGE", `notif:${sub}`, 0, 29])) as string[]).map((n) => JSON.parse(n))
    return ok({ store: true, isNew, state: await readState(sub), notifications: notif })
  } catch (e) { return fail(e) }
}
export async function POST(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) throw new Error("store_not_configured")
    await touch(sub, email)
    const b = (await req.json().catch(() => ({}))) as Record<string, string>
    let award = 0
    if (b.action === "profile") await setProfile(sub, { handle: b.handle, avatar: b.avatar, bio: b.bio })
    else if (b.action === "reroll") await setProfile(sub, { reroll: true })
    else if (b.action === "quest") { award = await claimQuest(sub, b.kind, b.id); if (award < 0) return Response.json({ ok: false, error: "bad_quest" }, { status: 400 }) }
    else if (b.action === "link") award = await linkAccount(sub, b.slot, b.handle)
    else if (b.action === "verify") { const code = await requestVerify(sub, b.slot); return ok({ code, award: 0, state: await readState(sub) }) }
    else return Response.json({ ok: false, error: "bad_action" }, { status: 400 })
    return ok({ award, state: await readState(sub) })
  } catch (e) { return fail(e) }
}
