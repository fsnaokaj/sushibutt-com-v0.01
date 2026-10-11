"use client"
import { useState } from "react"
import Link from "next/link"
import { useAccount } from "@/lib/client/account"
import { AvatarMark } from "@/components/profile/AvatarMark"

export function LoginPanel() {
  const a = useAccount()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  const run = async (f: () => Promise<void>) => { setBusy(true); setErr(""); try { await f() } catch (e) { setErr((e as Error).message || "Something went wrong") } setBusy(false) }

  if (a.status === "setup_login") return null
  if (a.state) {
    return (
      <div className="bg-white border rounded-3xl p-5 flex items-center gap-4">
        <AvatarMark id={a.state.avatar} size={56} />
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-lg truncate">@{a.state.handle}</p>
          <p className="text-sm text-muted-foreground">OG #{a.state.og} · {a.state.points.toLocaleString()} ★</p>
        </div>
        <Link href={a.state.welcomeSpin === "ready" ? "/spin" : "/profile"} className="px-4 py-2 rounded-full bg-primary text-white font-extrabold text-sm">{a.state.welcomeSpin === "ready" ? "Welcome Spin" : "Profile"}</Link>
      </div>
    )
  }
  return (
    <div className="bg-white border rounded-3xl p-5 space-y-3">
      <h2 className="text-xl font-extrabold">Sign up or log in</h2>
      <p className="text-sm text-muted-foreground">Email code via Dynamic. You get an OG number, a random @handle and a free Welcome Spin.</p>
      {step === "email" ? (
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); run(async () => { await a.sendCode(email.trim()); setStep("code") }) }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 px-3 py-2 border rounded-xl" />
          <button disabled={busy} className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold">{busy ? "…" : "Send code"}</button>
        </form>
      ) : (
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); run(async () => { await a.verifyCode(code.trim()) }) }}>
          <input inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-digit code" className="flex-1 px-3 py-2 border rounded-xl" />
          <button disabled={busy} className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold">{busy ? "…" : "Verify"}</button>
        </form>
      )}
      {err && <p className="text-sm text-rose-600">{err}</p>}
      <p className="text-xs text-muted-foreground">Points (★) are free, for fun, and have no cash value. Cash payouts: coming soon.</p>
    </div>
  )
}
