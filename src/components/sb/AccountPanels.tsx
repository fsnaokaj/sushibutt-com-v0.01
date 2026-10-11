"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useAccount } from "@/lib/client/account"
import { LINK_SLOTS, RULES } from "@/config/site"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { ShareSheet } from "./ShareSheet"
import { SetupNotice } from "./SetupNotice"
import { LoginPanel } from "./LoginPanel"

export function LiveLeaderboard() {
  const [rows, setRows] = useState<{ rank: number; handle: string; avatar: string; og: number; points: number }[] | null>(null)
  useEffect(() => { fetch("/api/board").then((r) => r.json()).then((d) => setRows(d.store ? d.rows : null)).catch(() => setRows(null)) }, [])
  if (!rows) return null
  return (
    <section className="bg-white border rounded-3xl p-5 space-y-2">
      <h2 className="font-extrabold text-lg">Live belt leaderboard</h2>
      {rows.length === 0 ? <p className="text-sm text-muted-foreground">No one on the board yet — be the first.</p> : rows.map((r) => (
        <Link key={r.handle} href={`/${r.handle}`} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-pink-50">
          <span className="w-8 text-center font-extrabold">{r.rank === 1 ? "👑" : r.rank}</span>
          <AvatarMark id={r.avatar} size={32} />
          <span className="flex-1 font-bold truncate">@{r.handle} <span className="text-xs text-muted-foreground">OG #{r.og}</span></span>
          <span className="font-extrabold text-primary">{r.points.toLocaleString()} ★</span>
        </Link>
      ))}
      <p className="text-xs text-muted-foreground">Points are free, for fun, and have no cash value.</p>
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
        <button onClick={() => setShare(true)} className="px-3 py-2 rounded-2xl bg-primary text-white font-bold text-sm">Invite friends · +{RULES.inviteInviter} ★</button>
      </div>
      <p className="text-xs text-muted-foreground">Your invite link: {invite} · {s.invites} joined. Friends get +{RULES.inviteInvitee} ★.</p>
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
      <p className="text-xs text-muted-foreground">+{RULES.link} ★ the first time you add each. Self-reported for now — OAuth verification is coming.</p>
      {LINK_SLOTS.map((slot) => (
        <form key={slot} className="flex gap-2 items-center" onSubmit={async (e) => { e.preventDefault(); const d = await a.call<{ award?: number }>("/api/me", { action: "link", slot, handle: vals[slot] || "" }); setMsg(d.ok ? `Saved ${slot}${d.award ? ` · +${d.award} ★` : ""}` : `Couldn't save (${d.error})`) }}>
          <span className="w-20 text-sm font-bold capitalize">{slot}</span>
          <input defaultValue={a.state!.links[slot] || ""} onChange={(e) => setVals((v) => ({ ...v, [slot]: e.target.value }))} placeholder="@handle" className="flex-1 px-3 py-1.5 border rounded-xl text-sm" />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">{a.state!.links[slot] ? "unverified" : "empty"}</span>
          <button className="px-3 py-1.5 rounded-xl bg-primary text-white text-sm font-bold">Save</button>
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
        <div key={i} className="flex justify-between text-sm border-t pt-2"><span>{n.note}</span><span className="font-extrabold text-primary">{n.pts ? `+${n.pts} ★` : ""}</span></div>
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
