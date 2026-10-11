import { isAdmin, ok, fail } from "@/lib/server/auth"
import { redisConfig, redisCmd } from "@/lib/server/redis"
import { readClips, reviewClip } from "@/lib/server/store"
export const dynamic = "force-dynamic"
/** Header x-admin-pass required. GET: clips + listings.  POST {id, decision:'approved'|'rejected'} */
export async function GET(req: Request) {
  try {
    if (!isAdmin(req)) return Response.json({ ok: false, error: "forbidden" }, { status: 403 })
    if (!redisConfig()) throw new Error("store_not_configured")
    const ids = (await redisCmd(["LRANGE", "clips:all", 0, 199])) as string[]
    const listings = ((await redisCmd(["LRANGE", "listings", 0, 99])) as string[]).map((x) => JSON.parse(x))
    return ok({ clips: await readClips(ids), listings })
  } catch (e) { return fail(e) }
}
export async function POST(req: Request) {
  try {
    if (!isAdmin(req)) return Response.json({ ok: false, error: "forbidden" }, { status: 403 })
    if (!redisConfig()) throw new Error("store_not_configured")
    const b = (await req.json().catch(() => ({}))) as Record<string, string>
    if (b.decision !== "approved" && b.decision !== "rejected") return Response.json({ ok: false, error: "bad_decision" }, { status: 400 })
    return ok(await reviewClip(String(b.id), b.decision))
  } catch (e) { return fail(e) }
}
