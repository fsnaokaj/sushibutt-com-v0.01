"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useAccount } from "@/lib/client/account"
import { LINK_SLOTS, RULES, fmt, VIEW_FORMULA } from "@/config/site"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { ShareSheet } from "./ShareSheet"
import { SetupNotice } from "./SetupNotice"
import { LoginPanel } from "./LoginPanel"

type Row = { rank: number; handle: string; avatar: string; og: number; points: number }
type ClipRow = { id: string; handle: string; campaign: string; url: string; views: number; viewPts: number }

export function Podium({ rows }: { rows: Row[] }) {
  const order = [rows[1], rows[0], rows[2]]
  const h = ["h-20", "h-28", "h-14"]
  return (
    <div className="grid grid-cols-3 gap-2 items-end">
      {order.map((r, i) => r ? (
        <Link key={r.handle} href={`/${r.handle}`} className="flex flex-col items-center gap-1 text-center min-w-0">
          <span className="text-2xl">{["🥈", "👑", "🥉"][i]}</span>
          <AvatarMark id={r.avatar} size={i === 1 ? 56 : 44} />
          <span className="font-extrabold text-sm truncate max-w-full">@{r.handle}</span>
          <span className="text-xs font-bold text-primary">{fmt(r.points)} ★</span>
          <div className={`w-full rounded-t-2xl ${h[i]} ${["bg-slate-200", "bg-amber-300", "bg-orange-200"][i]}`} />
        </Link>
      ) : <div key={i} />)}
    </div>
  )
}

export function LiveLeaderboard({ campaignId }: { campaignId?: string }) {
  const [scope, setScope] = useState<"all" | "week" | "clips">("all")
  const [rows, setRows] = useState<Row[] | null>(null)
  const [clips, setClips] = useState<ClipRow[]>([])
  const [store, setStore] = useState(true)
  useEffect(() => {
    const q = campaignId ? `scope=campaign&id=${campaignId}` : `scope=${scope}`
    fetch(`/api/board?${q}`).then((r) => r.json()).then((d) => { setStore(d.store !== false); if (scope === "clips" && !campaignId) setClips(d.clips || []); else setRows(d.rows || []) }).catch(() => setStore(false))
  }, [scope, campaignId])
  if (!store) return campaignId ? <p className="text-sm text-muted-foreground text-center py-6">Leaderboards go live with accounts.</p> : null
  return (
    <section className="bg-white border rounded-3xl p-5 space-y-3">
      {!campaignId && (
        <div className="flex gap-2 flex-wrap">
          {([["all", "All-time"], ["week", "This week"], ["clips", "Top clips by views"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setScope(k)} className={`px-3 py-1 rounded-full border text-sm font-extrabold ${scope === k ? "bg-primary text-white" : "bg-white"}`}>{l}</button>
          ))}
        </div>
      )}
      {scope === "clips" && !campaignId ? (
        clips.length === 0 ? <p className="text-sm text-muted-foreground">No clip view counts yet.</p> : clips.map((c, i) => (
          <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-pink-50 text-sm">
            <span className="w-8 text-center font-extrabold">{i < 3 ? ["👑", "🥈", "🥉"][i] : i + 1}</span>
            <span className="flex-1 truncate"><b>@{c.handle}</b> · {c.campaign}</span>
            <span className="font-extrabold">{fmt(c.views)} views</span>
          </a>
        ))
      ) : !rows ? null : rows.length === 0 ? <p className="text-sm text-muted-foreground">No one on the board yet — be the first.</p> : (
        <>
          <Podium rows={rows.slice(0, 3)} />
          {rows.slice(3).map((r) => (
            <Link key={r.handle} href={`/${r.handle}`} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-pink-50">
              <span className="w-8 text-center font-extrabold">{r.rank}</span>
              <AvatarMark id={r.avatar} size={32} />
              <span className="flex-1 font-bold truncate">@{r.handle} <span className="text-xs text-muted-foreground">OG #{r.og}</span></span>
              <span className="font-extrabold text-primary">{fmt(r.points)} ★</span>
            </Link>
          ))}
        </>
      )}
      <p className="text-xs text-muted-foreground">Points are free, for fun, and have no cash value. Clip view points: {fmt(VIEW_FORMULA.perThousandViews)} ★ per 1K views + likes/comments/shares, capped at {fmt(VIEW_FORMULA.capPerClip)} ★ per clip.</p>
    </section>
  )
}

export function AccountSummary() {
  const a = useAccount()
  const [share, setShare] = useState(false)
  if (!a.state) return <><SetupNotice /><LoginPanel /></>
  const s = a.state
  const invite = `https://sushibutt.com/${s.handle}`
  return (
    <section className="bg-white border rounded-3xl p-5 space-y-4">
      <div className="flex items-center gap-4">
        <AvatarMark id={s.avatar} size={64} />
        <div className="flex-1 min-w-0"><p className="text-xl font-extrabold truncate">@{s.handle}</p><p className="text-sm text-muted-foreground">OG #{s.og} · {s.points.toLocaleString()} ★{s.rank ? ` · rank #${s.rank}` : ""}</p></div>
        <button onClick={() => a.call("/api/me", { action: "reroll" })} className="px-3 py-2 rounded-full border text-sm font-bold">🎲 Reroll</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link href={`/${s.handle}`} className="px-3 py-2 rounded-2xl border text-center font-bold text-sm">Public profile</Link>
        <button onClick={() => setShare(true)} className="px-3 py-2 rounded-2xl bg-primary text-white font-bold text-sm">Invite friends · +{fmt(RULES.inviteInviter)} ★</button>
      </div>
      <p className="text-xs text-muted-foreground">Your invite link: {invite} · {s.invites} joined. Friends get +{fmt(RULES.inviteInvitee)} ★.</p>
      {s.welcomeSpin === "ready" && <Link href="/spin" className="block text-center px-3 py-2 rounded-2xl bg-amber-100 font-extrabold">🎡 Your free Welcome Spin is waiting</Link>}
      <button onClick={a.logout} className="text-xs text-muted-foreground underline">Log out</button>
      <ShareSheet open={share} onClose={() => setShare(false)} url={invite} text="Join me on the SushiButt belt 🍣" onShared={() => a.call("/api/me", { action: "quest", kind: "share" })} />
    </section>
  )
}

export function LinkedAccounts() {
  const a = useAccount()
  const [vals, setVals] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState("")
  if (!a.state) return null
  return (
    <section className="bg-white border rounded-3xl p-5 space-y-3">
      <h2 className="font-extrabold text-lg">Linked accounts</h2>
      <p className="text-xs text-muted-foreground">+{fmt(RULES.link)} ★ the first time you add each, then +{fmt(RULES.verify)} ★ when verified. To verify: put your code <b className="font-mono">{a.state.verifyCode || "(tap Verify)"}</b> in that profile&apos;s bio and tap Verify; an admin confirms it. OAuth verification is coming.</p>
      {LINK_SLOTS.map((slot) => (
        <form key={slot} className="flex gap-2 items-center" onSubmit={async (e) => { e.preventDefault(); const d = await a.call<{ award?: number }>("/api/me", { action: "link", slot, handle: vals[slot] || "" }); setMsg(d.ok ? `Saved ${slot}${d.award ? ` · +${fmt(d.award)} ★` : ""}` : `Couldn't save (${d.error})`) }}>
          <span className="w-20 text-sm font-bold capitalize">{slot}</span>
          <input defaultValue={a.state!.links[slot] || ""} onChange={(e) => setVals((v) => ({ ...v, [slot]: e.target.value }))} placeholder="@handle" className="flex-1 px-3 py-1.5 border rounded-xl text-sm" />
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.state!.verified[slot] ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>{a.state!.verified[slot] ? "verified" : a.state!.links[slot] ? "unverified" : "empty"}</span>
          <button className="px-3 py-1.5 rounded-xl bg-primary text-white text-sm font-bold">Save</button>
          {a.state!.links[slot] && !a.state!.verified[slot] && <button type="button" onClick={async () => { const d = await a.call<{ code?: string }>("/api/me", { action: "verify", slot }); setMsg(d.ok ? `Put ${d.code} in your ${slot} bio. An admin will confirm it (+${fmt(RULES.verify)} ★).` : `Couldn't request (${d.error})`) }} className="px-3 py-1.5 rounded-xl border text-sm font-bold">Verify</button>}
        </form>
      ))}
      {msg && <p className="text-sm font-bold text-primary">{msg}</p>}
    </section>
  )
}

export function LiveNotifications() {
  const a = useAccount()
  if (!a.state) return null
  return (
    <section className="bg-white border rounded-3xl p-5 space-y-2">
      <h2 className="font-extrabold text-lg">Activity</h2>
      {a.notifications.length === 0 ? <p className="text-sm text-muted-foreground">Nothing yet.</p> : a.notifications.map((n, i) => (
        <div key={i} className="flex justify-between text-sm border-t pt-2"><span>{n.note}</span><span className="font-extrabold text-primary">{n.pts ? `+${fmt(n.pts)} ★` : ""}</span></div>
      ))}
    </section>
  )
}

export function LiveEarnings() {
  const a = useAccount()
  if (!a.state) return null
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="bg-white border rounded-3xl p-5"><p className="text-sm text-muted-foreground">Points</p><p className="text-3xl font-extrabold text-primary">{a.state.points.toLocaleString()} ★</p><p className="text-xs text-muted-foreground">No cash value.</p></div>
      <div className="bg-white border rounded-3xl p-5"><p className="text-sm text-muted-foreground">Cash</p><p className="text-3xl font-extrabold">Coming soon</p><p className="text-xs text-muted-foreground">No dollar rates until payouts are live.</p></div>
    </section>
  )
}
