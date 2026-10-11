"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { ShareSheet } from "@/components/sb/ShareSheet"
import { useAccount } from "@/lib/client/account"

type P = { handle: string; avatar: string; og: number; points: number; rank: number | null; bio: string; links: Record<string, string>; approvedClips: number; invites: number }
export function PublicProfile({ handle }: { handle: string }) {
  const [p, setP] = useState<P | null>(null)
  const [state, setState] = useState<"loading" | "ok" | "missing" | "nostore">("loading")
  const [share, setShare] = useState(false)
  const a = useAccount()
  useEffect(() => {
    fetch(`/api/u/${handle}`).then((r) => r.json()).then((d) => { if (d.profile) { setP(d.profile); setState("ok") } else setState(d.store === false ? "nostore" : "missing") }).catch(() => setState("missing"))
  }, [handle])
  const url = `https://sushibutt.com/${handle}`
  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-5">
        {state === "loading" && <p className="text-center text-muted-foreground">Loading…</p>}
        {(state === "missing" || state === "nostore") && (
          <div className="bg-white border rounded-3xl p-6 text-center space-y-3">
            <p className="text-xl font-extrabold">@{handle}</p>
            <p className="text-muted-foreground">{state === "nostore" ? "Profiles open as soon as accounts go live." : "No one on the belt has this handle yet."}</p>
            <Link href="/join" className="inline-block px-5 py-2.5 bg-primary text-white rounded-full font-extrabold">Join the belt</Link>
          </div>
        )}
        {p && (
          <div className="bg-white border rounded-3xl p-6 space-y-4 text-center">
            <div className="flex justify-center"><AvatarMark id={p.avatar} size={96} /></div>
            <div><p className="text-2xl font-extrabold">@{p.handle}</p><p className="text-sm text-muted-foreground">OG #{p.og}</p></div>
            {p.bio && <p className="text-sm">{p.bio}</p>}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-pink-50 rounded-2xl p-3"><p className="font-extrabold text-lg">{p.points.toLocaleString()}</p><p className="text-muted-foreground">★ points</p></div>
              <div className="bg-pink-50 rounded-2xl p-3"><p className="font-extrabold text-lg">{p.rank ? `#${p.rank}` : "—"}</p><p className="text-muted-foreground">rank</p></div>
              <div className="bg-pink-50 rounded-2xl p-3"><p className="font-extrabold text-lg">{p.approvedClips}</p><p className="text-muted-foreground">approved clips</p></div>
            </div>
            {Object.keys(p.links).length > 0 && <div className="flex flex-wrap justify-center gap-2 text-xs">{Object.entries(p.links).map(([k, v]) => <span key={k} className="px-2 py-1 rounded-full border">{k}: @{v} <span className="text-muted-foreground">(self-reported)</span></span>)}</div>}
            <div className="flex gap-2 justify-center">
              <button onClick={() => setShare(true)} className="px-5 py-2.5 rounded-full bg-primary text-white font-extrabold">Share profile</button>
              {!a.state && <Link href={`/join?ref=${p.handle}`} className="px-5 py-2.5 rounded-full border font-extrabold">Join with @{p.handle}&apos;s invite</Link>}
            </div>
          </div>
        )}
        <ShareSheet open={share} onClose={() => setShare(false)} url={url} text={`@${handle} on the SushiButt belt 🍣`} />
      </div>
    </AppShell>
  )
}
