"use client"
import { useAccount } from "@/lib/client/account"

/** Honest status line when login or the account store isn't connected yet. */
export function SetupNotice() {
  const { status } = useAccount()
  if (status === "setup_login") return <div className="rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 text-sm px-4 py-3 font-bold">Accounts open soon. Sign-in is being connected; until then points shown here are a preview saved on this device only.</div>
  if (status === "setup_store") return <div className="rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 text-sm px-4 py-3 font-bold">You&apos;re signed in. The points store is being connected; your account will appear here shortly.</div>
  if (status === "error") return <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-900 text-sm px-4 py-3 font-bold">Couldn&apos;t reach the account server. Try again in a moment.</div>
  return null
}
