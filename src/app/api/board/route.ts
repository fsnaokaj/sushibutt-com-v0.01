import { ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { leaderboard } from "@/lib/server/store"
export const dynamic = "force-dynamic"
export async function GET() {
  try {
    if (!redisConfig()) return ok({ store: false, rows: [] })
    return ok({ store: true, rows: await leaderboard(100) })
  } catch (e) { return fail(e) }
}
