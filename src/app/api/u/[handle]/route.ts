import { ok, fail } from "@/lib/server/auth"
import { redisConfig } from "@/lib/server/redis"
import { publicProfile } from "@/lib/server/store"
export const dynamic = "force-dynamic"
export async function GET(_: Request, { params }: { params: { handle: string } }) {
  try {
    if (!redisConfig()) return ok({ store: false, profile: null })
    const p = await publicProfile(params.handle)
    if (!p) return Response.json({ ok: false, error: "not_found" }, { status: 404 })
    return ok({ store: true, profile: p })
  } catch (e) { return fail(e) }
}
