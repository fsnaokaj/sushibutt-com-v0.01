"use client"

import { useEffect, useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { PayBanner } from "@/components/ui/PayBanner"
import { WHOP } from "@/config/site"

/** List a Campaign: request form stored in KV and reviewed by the SushiButt team. Nothing goes live automatically. */
export default function BrandPage() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle")
  const [err, setErr] = useState("")
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState("busy")
    const body = Object.fromEntries(new FormData(e.currentTarget).entries())
    const r = await fetch("/api/listing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const d = await r.json().catch(() => ({}))
    if (d.ok) setState("done")
    else { setState("error"); setErr(d.error === "store_not_configured" ? "The listing inbox is being connected. Email the team or try again soon." : d.error === "missing_fields" ? "Add your brand name and a valid email." : "Couldn't send. Try again.") }
  }
  useEffect(() => { const q = new URLSearchParams(window.location.search); const v = q.get("type") || (q.get("tier") ? `sponsor-${q.get("tier")}` : ""); const el = document.getElementById("lc-type") as HTMLSelectElement | null; if (v && el) el.value = v }, [])
  const field = "w-full px-3 py-2 border rounded-xl bg-white"
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">List a campaign</h1>
          <p className="text-sm text-muted-foreground mt-1">Tell us what you want clipped. We review every request and reply by email.</p>
        </div>
        <PayBanner />
        {state === "done" ? (
          <div className="bg-white border rounded-3xl p-6"><p className="text-lg font-extrabold">Request received 🍣</p><p className="text-sm text-muted-foreground">We&apos;ll be in touch. Nothing is published until we review it with you.</p></div>
        ) : (
          <form onSubmit={submit} className="space-y-3 bg-white border rounded-3xl p-5">
            <input name="brand" required placeholder="Brand / creator name" className={field} />
            <input name="email" type="email" required placeholder="Contact email" className={field} />
            <input name="url" placeholder="Website or main social link" className={field} />
            <input name="title" placeholder="Campaign title (e.g. Clip our launch)" className={field} />
            <select name="type" className={field} id="lc-type" defaultValue="clipping">
              <option value="clipping">Clipping campaign</option><option value="ugc">UGC</option><option value="contest">Art / meme contest</option><option value="remix">Remix / sound challenge</option><option value="quest">Follow quest</option><option value="mystery-box">Mystery Box Friday sponsor</option><option value="sponsor-starter">Sponsor tier: Starter</option><option value="sponsor-featured">Sponsor tier: Featured</option><option value="sponsor-headline">Sponsor tier: Headline</option>
            </select>
            <input name="platforms" placeholder="Platforms (TikTok, Reels, Shorts, X…)" className={field} />
            <input name="budget" placeholder="Budget or prize idea (optional)" className={field} />
            <textarea name="details" rows={5} placeholder="Source footage, tags, do/don't, dates…" className={field} />
            <input name="website_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button disabled={state === "busy"} className="w-full py-3 bg-primary text-white rounded-full font-extrabold disabled:opacity-50">{state === "busy" ? "Sending…" : "Send request"}</button>
            {state === "error" && <p className="text-sm text-rose-600">{err}</p>}
            <p className="text-xs text-muted-foreground">Paid placements ({WHOP.brandListing.label}) will run through Whop — price {WHOP.brandListing.price}. Clippers earn points now; cash payouts are coming soon.</p>
          </form>
        )}
      </div>
    </AppShell>
  )
}
