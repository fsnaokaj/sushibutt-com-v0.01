"use client"
/**
 * Real accounts: Dynamic.xyz (headless SDK, email OTP) + server state in Upstash KV.
 * When the Dynamic env ID or KV isn't configured yet, status explains it and nothing fake is shown.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DYNAMIC_ENV_ID, LOGIN_READY } from "@/config/site"

export type ServerState = {
  og: number; handle: string; avatar: string; points: number; rank: number | null; invites: number
  welcomeSpin: string; checkedInToday: boolean; dailySpun: boolean; chestOpened: boolean; streak: number; verifyCode: string; verified: Record<string, string>; claims: string[]; links: Record<string, string>; bio: string
}
export type Notif = { t: number; pts: number; note: string }
export type Status = "setup_login" | "out" | "loading" | "setup_store" | "error" | "ready"
type Api = <T = Record<string, unknown>>(path: string, body?: unknown) => Promise<{ ok: boolean; error?: string; state?: ServerState } & T>

type Ctx = {
  status: Status; state: ServerState | null; notifications: Notif[]; isNew: boolean; email?: string
  sendCode: (email: string) => Promise<void>; verifyCode: (code: string) => Promise<void>; logout: () => void
  refresh: () => Promise<void>; call: Api; ackNew: () => void
}
const AccountCtx = createContext<Ctx | null>(null)
export const useAccount = () => useContext(AccountCtx)!

const REF_KEY = "sb_ref"
export function rememberRef() {
  if (typeof window === "undefined") return
  const r = new URLSearchParams(window.location.search).get("ref")
  if (r) localStorage.setItem(REF_KEY, r)
}

let sdk: any = null
let client: any = null
async function loadSdk() {
  if (!LOGIN_READY) return null
  if (client) return { sdk, client }
  sdk = await import("@dynamic-labs-sdk/client")
  client = sdk.createDynamicClient({ environmentId: DYNAMIC_ENV_ID, metadata: { name: "SushiButt", universalLink: "https://sushibutt.com" } })
  return { sdk, client }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>(LOGIN_READY ? "loading" : "setup_login")
  const [state, setState] = useState<ServerState | null>(null)
  const [notifications, setNotifs] = useState<Notif[]>([])
  const [isNew, setIsNew] = useState(false)
  const [email, setEmail] = useState<string>()
  const [otp, setOtp] = useState<unknown>(null)

  const call: Api = useCallback(async (path, body) => {
    const token = client?.token
    if (!token) return { ok: false, error: "signed_out" } as any
    try {
      const r = await fetch(path, { method: body === undefined ? "GET" : "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) })
      const d = await r.json().catch(() => ({ ok: false, error: `http_${r.status}` }))
      if (d.state) setState(d.state)
      return d
    } catch { return { ok: false, error: "network" } as any }
  }, [])

  const refresh = useCallback(async () => {
    if (!client?.token) { setStatus("out"); return }
    const ref = localStorage.getItem(REF_KEY)
    const d = await call<{ store?: boolean; isNew?: boolean; notifications?: Notif[] }>(ref ? `/api/me?ref=${encodeURIComponent(ref)}` : "/api/me")
    if (d.ok && d.store === false) setStatus("setup_store")
    else if (d.ok && d.state) { setStatus("ready"); localStorage.removeItem(REF_KEY); if (d.isNew) setIsNew(true); setNotifs(d.notifications || []) }
    else if (d.error === "store_not_configured") setStatus("setup_store")
    else setStatus("error")
  }, [call])

  useEffect(() => {
    rememberRef()
    if (!LOGIN_READY) return
    let off: (() => void) | undefined
    loadSdk().then(async (x) => {
      if (!x) return
      try { await x.sdk.waitForClientInitialized?.(x.client) } catch { /* older sdk */ }
      setEmail(x.client.user?.email)
      await refresh()
      try { off = x.sdk.onEvent?.({ event: "userChanged", listener: () => { setEmail(x.client.user?.email); refresh() } }) } catch { /* noop */ }
    }).catch(() => setStatus("error"))
    return () => off?.()
  }, [refresh])

  const value = useMemo<Ctx>(() => ({
    status, state: status === "ready" ? state : null, notifications, isNew, email,
    ackNew: () => setIsNew(false),
    sendCode: async (e) => { const x = await loadSdk(); if (!x) throw new Error("login_not_configured"); setOtp(await x.sdk.sendEmailOTP({ email: e })) },
    verifyCode: async (code) => { const x = await loadSdk(); if (!x) throw new Error("login_not_configured"); await x.sdk.verifyOTP({ otpVerification: otp, verificationToken: code }); setEmail(x.client.user?.email); setStatus("loading"); await refresh() },
    logout: () => { sdk?.logout?.().catch?.(() => undefined); setState(null); setStatus("out") },
    refresh, call
  }), [status, state, notifications, isNew, email, otp, refresh, call])

  return <AccountCtx.Provider value={value}>{children}</AccountCtx.Provider>
}
