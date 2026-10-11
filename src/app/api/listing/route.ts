import { ok, fail } from "@/lib/server/auth"
import { redisConfig, redisCmd } from "@/lib/server/redis"
export const dynamic = "force-dynamic"
/** List a Campaign request form (public). Stored in KV for review; nothing is published automatically. */
export async function POST(req: Request) {
  try {
    if (!redisConfig()) throw new Error("store_not_configured")
    const b = (await req.json().catch(() => ({}))) as Record<string, unknown>
    const s = (k: string, n = 300) => String(b[k] ?? "").trim().slice(0, n)
    if (!s("brand") || !/^\S+@\S+\.\S+$/.test(s("email"))) return Response.json({ ok: false, error: "missing_fields" }, { status: 400 })
    if (s("website_hp")) return ok({}) // honeypot
    const entry = { at: new Date().toISOString(), brand: s("brand", 80), email: s("email", 120), url: s("url", 200), title: s("title", 120), type: s("type", 30), platforms: s("platforms", 80), budget: s("budget", 60), details: s("details", 2000) }
    await redisCmd(["LPUSH", "listings", JSON.stringify(entry)])
    await redisCmd(["LTRIM", "listings", 0, 499])
    return ok({})
  } catch (e) { return fail(e) }
}
