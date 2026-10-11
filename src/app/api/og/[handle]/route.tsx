import { ImageResponse } from "next/og"
import { redisConfig } from "@/lib/server/redis"
import { publicProfile } from "@/lib/server/store"
import { getAvatar, sanitizeHandle } from "@/data/identity"
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
/** 1200x630 share card for /<handle>. */
export async function GET(_: Request, { params }: { params: { handle: string } }) {
  const h = sanitizeHandle(params.handle)
  const p = redisConfig() ? await publicProfile(h).catch(() => null) : null
  const av = getAvatar(p?.avatar)
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "linear-gradient(135deg,#fff1f7,#ffd6ea)", color: "#4a0f2c", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#ec4899" }}>🍣 SUSHIBUTT.COM ★ THE BELT</div>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ width: 220, height: 220, borderRadius: 60, background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130 }}>{av.emoji}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 800 }}>@{p?.handle || h}</div>
            <div style={{ fontSize: 40, display: "flex" }}>{p ? `OG #${p.og} · ${p.points.toLocaleString()} ★${p.rank ? ` · rank #${p.rank}` : ""}` : "Clip. Compete. Build."}</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30 }}>Join the belt at sushibutt.com/{p?.handle || h} · points have no cash value</div>
      </div>
    ),
    { width: 1200, height: 630, emoji: "twemoji" }
  )
}
