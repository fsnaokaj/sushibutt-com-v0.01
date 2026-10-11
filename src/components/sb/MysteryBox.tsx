"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

/** Next Friday 12:00 PM Phoenix time (UTC-7, no DST) */
function nextFriday(now: number) {
  const d = new Date(now - 7 * 36e5)
  const add = (5 - d.getUTCDay() + 7) % 7
  let t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + add, 12) + 7 * 36e5
  if (t <= now) t += 7 * 864e5
  return t
}
export function MysteryBox() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => { setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [])
  const ms = now ? nextFriday(now) - now : 0
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60
  return (
    <section className="rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-to-r from-amber-50 via-pink-50 to-sky-50 p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
      <div className="text-5xl">🎁</div>
      <div className="flex-1">
        <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Mystery Box Friday</p>
        <h2 className="text-xl font-extrabold">This week&apos;s sponsored box opens in <span className="font-mono">{now ? `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : "…"}</span></h2>
        <p className="text-sm text-muted-foreground">Free to enter: clip or vote in the Mystery Box campaign. Sponsor: <b>Your brand here</b>. Fridays 12:00 PM MST (Arizona).</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/campaigns/mb-friday" className="px-4 py-2 rounded-full bg-primary text-white font-extrabold text-sm text-center">Enter free</Link>
        <Link href="/sponsors#mystery-box" className="px-4 py-2 rounded-full border bg-white font-extrabold text-sm text-center">Sponsor next week&apos;s box</Link>
      </div>
    </section>
  )
}
