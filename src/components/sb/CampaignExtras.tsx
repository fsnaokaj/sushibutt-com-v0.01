"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Download } from "lucide-react"
import type { Campaign } from "@/types"
import { useAccount } from "@/lib/client/account"
import { BRANDS, ALL_FOLLOWS, PRIZE_LABEL, NET_LABEL, type BrandId } from "@/config/campaigns"
import { Countdown } from "./Countdown"
import { RULES } from "@/config/site"

const PROMO = ["card", "hero", "story", "square"] as const
const LABEL: Record<string, string> = { card: "Card 1200×675", hero: "Hero 1600×600", story: "Story 1080×1920", square: "Square 1080×1080" }

/** Server-backed pieces shared by every campaign page: submit, gallery/votes, promo kit, brand follows. */
export function CampaignExtras({ c, joined }: { c: Campaign; joined: boolean }) {
  const a = useAccount()
  const brand = (c.brand || "SushiButt") as BrandId
  const isArt = c.kind === "art"
  const [url, setUrl] = useState("")
  const [platform, setPlatform] = useState(isArt ? "image" : "")
  const [msg, setMsg] = useState("")
  const [mine, setMine] = useState<{ id: string; url: string; status: string; campaign: string }[]>([])
  const [entries, setEntries] = useState<{ id: string; handle: string; url: string; votes: number }[]>([])
  const hasPromo = c.bannerUrl?.startsWith("/promo/") || ["follow-quest", "launch-film", "daily-belt", "official-open"].includes(c.id)
  const [ended, setEnded] = useState(false)
  useEffect(() => { if (c.endsAt) setEnded(Date.now() > Date.parse(c.endsAt)) }, [c.endsAt])

  useEffect(() => {
    if (a.state) a.call<{ clips: typeof mine }>("/api/clips").then((d) => d.ok && setMine(d.clips.filter((x) => x.campaign === c.id)))
    if (isArt) fetch(`/api/clips?gallery=${c.id}`).then((r) => r.json()).then((d) => d.ok && setEntries(d.entries)).catch(() => undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state?.handle, c.id])

  const submit = async () => {
    setMsg("")
    const d = await a.call<{ pts?: number; id?: string }>("/api/clips", { campaignId: c.id, url: url.trim(), platform })
    if (d.ok) { setMsg(c.kind === "predict" ? "Guess locked. Good luck!" : `Submitted for review${d.pts ? ` · +${d.pts.toLocaleString("en-US")} ★` : ""}. Approval adds +${(c.points ?? 10000).toLocaleString("en-US")} ★.`); setUrl(""); setMine((m) => [{ id: d.id!, url, status: "pending", campaign: c.id }, ...m]) }
    else setMsg({ duplicate: "That URL was already submitted.", bad_url: "Paste a public https:// link.", bad_platform: "Pick the platform." }[d.error || ""] || `Couldn't submit (${d.error}).`)
  }
  const vote = async (clipId: string) => {
    const d = await a.call<{ voted?: boolean }>("/api/vote", { campaignId: c.id, clipId })
    setMsg(d.ok ? (d.voted ? "Vote counted · +5 ★. Come back tomorrow to vote again." : "You already voted today.") : `Couldn't vote (${d.error}).`)
    if (d.ok && d.voted) setEntries((e) => e.map((x) => (x.id === clipId ? { ...x, votes: x.votes + 1 } : x)))
  }
  const brandFollows = brand !== "SushiButt" ? ALL_FOLLOWS.filter((f) => f.brand === brand && (c.id !== "pg-spotify" || f.net === "spotify")) : []

  return (
    <div className="space-y-4">
      {(c.endsAt || c.prizeLabel || isArt) && (
        <div className="rounded-3xl border bg-gradient-to-r from-pink-50 to-amber-50 p-4 text-sm space-y-1">
          {c.endsAt && <p>Ends in <Countdown to={c.endsAt} /></p>}
          <p className="font-extrabold text-primary">{c.prizeLabel || PRIZE_LABEL}</p>
          {isArt && <p className="text-muted-foreground">Winners: fan votes plus an admin pick. Winning bonus +{c.points?.toLocaleString("en-US")} ★. Prizes announced by {brand}.</p>}
        </div>
      )}

      {c.kind === "spin" && <Link href="/spin?mode=daily" className="block text-center py-3 rounded-full bg-primary text-white font-extrabold">Take your free daily spin</Link>}
      {a.state && joined && c.kind !== "follow" && c.kind !== "spin" && !ended && c.kind === "predict" && (
        <div className="rounded-3xl border bg-white p-4 space-y-2">
          <p className="font-extrabold">Your chase-card guess (free, one per person)</p>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Card name, e.g. a set\u2019s top secret rare" className="w-full px-3 py-2 border rounded-xl text-sm" />
          <button onClick={submit} disabled={url.trim().length < 2} className="w-full py-2.5 rounded-full bg-primary text-white font-extrabold disabled:opacity-40">Lock my guess</button>
          {mine.map((m) => <p key={m.id} className="text-xs">Your guess: <b>{m.url}</b> · {m.status}</p>)}
        </div>
      )}
      {a.state && joined && c.kind !== "follow" && c.kind !== "spin" && c.kind !== "predict" && !ended && (
        <div className="rounded-3xl border bg-white p-4 space-y-2">
          <p className="font-extrabold">{isArt ? "Submit your art" : "Submit a clip"}</p>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={isArt ? "https:// link to your image or post" : "https:// public TikTok / YouTube / Reels / X / Twitch / Kick URL"} className="w-full px-3 py-2 border rounded-xl text-sm" />
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm">
            <option value="">Auto-detect platform</option>
            <option value="tiktok">TikTok</option><option value="youtube">YouTube Shorts</option><option value="youtube-long">YouTube (long-form)</option><option value="instagram">Instagram Reels</option><option value="x">X</option><option value="twitch">Twitch (clip/VOD)</option><option value="kick">Kick (clip/VOD)</option><option value="spotify">Spotify</option><option value="substack">Substack</option>
            {isArt && <option value="image">Image link</option>}
          </select>
          <button onClick={submit} disabled={!url} className="w-full py-2.5 rounded-full bg-primary text-white font-extrabold disabled:opacity-40">Submit for review</button>
          {mine.map((m) => <p key={m.id} className="text-xs break-all"><span className={m.status === "approved" ? "text-emerald-700 font-bold" : m.status === "rejected" ? "text-rose-600 font-bold" : "text-amber-700 font-bold"}>{m.status}</span> · {m.url}</p>)}
        </div>
      )}
      {!a.state && c.kind !== "follow" && c.kind !== "spin" && a.status !== "setup_login" && <p className="text-sm"><Link href="/join" className="text-primary font-extrabold">Sign in</Link> to submit.</p>}
      {msg && <p className="text-sm font-bold text-primary">{msg}</p>}

      {brandFollows.length > 0 && (
        <div className="rounded-3xl border bg-white p-4 space-y-2">
          <p className="font-extrabold">Follow / subscribe to {brand} · +{RULES.follow.toLocaleString("en-US")} ★ each (once)</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {brandFollows.map((f) => {
              const done = a.state?.claims.includes(`follow:${f.id}`)
              return (
                <button key={f.id} disabled={done} onClick={() => { window.open(f.href, "_blank", "noopener"); if (a.state) a.call("/api/me", { action: "quest", kind: "follow", id: f.id }) }} className="px-3 py-2 rounded-2xl border text-left text-sm disabled:opacity-60">
                  <span className="block text-xs text-muted-foreground">{NET_LABEL[f.net] || f.net}</span><span className="font-extrabold">@{f.handle}</span> <span className="text-primary font-bold">{done ? "✓" : `+${RULES.follow.toLocaleString("en-US")} ★`}</span>
                </button>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">Honor system until verification is live. {BRANDS[brand].ageGate ? `${BRANDS[brand].ageGate} only.` : ""}</p>
        </div>
      )}

      {isArt && (
        <div className="rounded-3xl border bg-white p-4 space-y-3">
          <p className="font-extrabold">Gallery · vote once a day (+5 ★)</p>
          {entries.length === 0 ? <p className="text-sm text-muted-foreground">No approved entries yet. Be the first.</p> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {entries.map((e) => (
                <div key={e.id} className="rounded-2xl border overflow-hidden">
                  {/\.(png|jpe?g|webp|gif)(\?|$)/i.test(e.url) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.url} alt={`Entry by @${e.handle}`} className="w-full aspect-square object-cover bg-pink-50" />
                  ) : <a href={e.url} target="_blank" rel="noopener noreferrer" className="block aspect-square bg-pink-50 p-3 text-xs break-all text-primary font-bold">Open entry ↗</a>}
                  <div className="p-2 flex items-center justify-between text-xs">
                    <span className="font-bold truncate">@{e.handle}</span>
                    <button disabled={!a.state || ended} onClick={() => vote(e.id)} className="px-2 py-1 rounded-full bg-primary text-white font-bold disabled:opacity-40">♥ {e.votes}</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {hasPromo && (
        <div className="rounded-3xl border bg-white p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-extrabold">Promo banners</p>
            {(["card", "hero", "story", "square"] as const).map((f) => (
              <a key={f} href={`/promo/${c.id}/${f}.png`} download className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-white text-sm font-extrabold"><Download className="w-4 h-4" />{f}</a>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PROMO.map((p) => (
              <a key={p} href={`/promo/${c.id}/${p}.png`} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/promo/${c.id}/${p}.png`} alt={LABEL[p]} loading="lazy" className="w-full h-28 object-cover rounded-xl border bg-pink-50" />
                <span className="text-[11px] text-muted-foreground">{LABEL[p]}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
