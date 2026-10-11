import { ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { leaderboard, topClips, weekKey } from "@/lib/server/store"
export const dynamic = "force-dynamic"
/** GET ?scope=all|week|campaign&id=<campaignId>|clips */
export async function GET(req: Request) {
  try {
    if (!redisConfig()) return ok({ store: false, rows: [] })
    const q = new URL(req.url).searchParams
    const scope = q.get("scope") || "all"
    if (scope === "clips") return ok({ store: true, clips: await topClips(25) })
    const key = scope === "week" ? `lb:week:${weekKey()}` : scope === "campaign" ? `lb:camp:${String(q.get("id") || "").slice(0, 60)}` : "lb"
    return ok({ store: true, rows: await leaderboard(100, key) })
  } catch (e) { return fail(e) }
}
