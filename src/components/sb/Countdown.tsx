"use client"
import { useEffect, useState } from "react"
export function Countdown({ to }: { to: string }) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => { setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [])
  if (now == null) return <span className="font-mono font-extrabold">…</span>
  const ms = Date.parse(to) - now
  if (ms <= 0) return <span className="font-extrabold">Ended · winners being picked</span>
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60
  return <span className="font-mono font-extrabold">{d}d {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</span>
}
