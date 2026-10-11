"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { useAccount } from "@/lib/client/account"
import { WELCOME_WHEEL } from "@/config/site"
import { SetupNotice } from "@/components/sb/SetupNotice"
import { LoginPanel } from "@/components/sb/LoginPanel"
import { AvatarMark } from "@/components/profile/AvatarMark"

const N = WELCOME_WHEEL.length
const TOTAL = WELCOME_WHEEL.reduce((a, s) => a + s.weight, 0)
const MEAN = WELCOME_WHEEL.reduce((a, s) => a + s.value * s.weight, 0) / TOTAL

export default function SpinPage() {
  const a = useAccount()
  const [rot, setRot] = useState(0)
  const [result, setResult] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  const ready = a.state?.welcomeSpin === "ready"
  useEffect(() => { if (a.isNew) a.ackNew() }, [a])

  const spin = async () => {
    setBusy(true); setErr("")
    const d = await a.call<{ segment?: number; value?: number }>("/api/spin", {})
    if (d.ok && d.segment != null) {
      const seg = 360 / N
      setRot(360 * 6 + (360 - (d.segment * seg + seg / 2)))
      setTimeout(() => { setResult(d.value!); setBusy(false) }, 4200)
    } else { setErr(d.error === "already_spun" ? "Your Welcome Spin is already used." : `Couldn't spin (${d.error}).`); setBusy(false) }
  }
  const grad = WELCOME_WHEEL.map((s, i) => `${s.color} ${(i * 360) / N}deg ${((i + 1) * 360) / N}deg`).join(",")

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <p className="text-xs font-extrabold tracking-widest uppercase text-primary">One free spin per account</p>
          <h1 className="text-3xl font-extrabold">Welcome Spin</h1>
          <p className="text-sm text-muted-foreground">The server picks the result using the published odds below. Points (★) have no cash value.</p>
        </div>
        <SetupNotice />
        {!a.state && <LoginPanel />}
        {a.state && (
          <div className="bg-white border rounded-3xl p-5 flex items-center gap-4">
            <AvatarMark id={a.state.avatar} size={56} />
            <div className="flex-1"><p className="font-extrabold">@{a.state.handle}</p><p className="text-sm text-muted-foreground">OG #{a.state.og} · {a.state.points.toLocaleString()} ★</p></div>
            <button onClick={() => a.call("/api/me", { action: "reroll" })} className="px-3 py-2 rounded-full border font-bold text-sm">🎲 Reroll handle & avatar</button>
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-10 text-3xl">▼</div>
            <div className="w-full h-full rounded-full border-8 border-white shadow-xl transition-transform duration-[4000ms] ease-out" style={{ background: `conic-gradient(${grad})`, transform: `rotate(${rot}deg)` }}>
              {WELCOME_WHEEL.map((s, i) => (
                <span key={i} className="absolute left-1/2 top-1/2 font-extrabold text-sm sm:text-base text-[#4a0f2c]" style={{ transform: `rotate(${(i + 0.5) * (360 / N)}deg) translateY(-42%) translateY(-6rem)`, transformOrigin: "0 0" }}>{s.value}</span>
              ))}
            </div>
          </div>
          {result != null ? <p className="text-2xl font-extrabold text-primary">+{result.toLocaleString()} ★ 🎉</p> : null}
          {a.state && (ready ? <button disabled={busy} onClick={spin} className="px-8 py-3 rounded-full bg-primary text-white font-extrabold text-lg disabled:opacity-50">{busy ? "Spinning…" : "Spin"}</button> : result == null && <p className="text-sm text-muted-foreground">Welcome Spin used. <Link href="/" className="text-primary font-bold">Earn more with quests →</Link></p>)}
          {err && <p className="text-sm text-rose-600">{err}</p>}
        </div>
        <div id="odds" className="bg-white border rounded-3xl p-5">
          <h2 className="font-extrabold mb-2">Published odds</h2>
          <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground"><th>Prize</th><th>Chance</th></tr></thead>
            <tbody>{WELCOME_WHEEL.map((s) => <tr key={s.value} className="border-t"><td className="py-1 font-bold">{s.value.toLocaleString()} ★</td><td>{((s.weight / TOTAL) * 100).toFixed(1)}%</td></tr>)}</tbody></table>
          <p className="text-xs text-muted-foreground mt-2">Average {MEAN.toFixed(1)} ★. Free, never sold, one per account. Points are for fun and have no cash value.</p>
        </div>
      </div>
    </AppShell>
  )
}
