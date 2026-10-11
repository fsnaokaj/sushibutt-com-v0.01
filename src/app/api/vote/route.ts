import { requireUser, ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { touch, readState, vote } from "@/lib/server/store"
export const dynamic = "force-dynamic"
export async function POST(req: Request) {
  try {
    const { sub, email } = await requireUser(req)
    if (!redisConfig()) throw new Error("store_not_configured")
    await touch(sub, email)
    const b = (await req.json().catch(() => ({}))) as Record<string, string>
    const r = await vote(sub, String(b.campaignId), String(b.clipId))
    return ok({ ...r, state: await readState(sub) })
  } catch (e) { return fail(e) }
}
