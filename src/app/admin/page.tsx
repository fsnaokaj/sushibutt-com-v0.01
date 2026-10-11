"use client"
import { useState } from "react"
type Clip = Record<string, string>
export default function AdminPage() {
  const [pass, setPass] = useState("")
  const [data, setData] = useState<{ clips: Clip[]; listings: Record<string, string>[] } | null>(null)
  const [err, setErr] = useState("")
  const [filter, setFilter] = useState("pending")
  const load = async (p = pass) => {
    setErr("")
    const r = await fetch("/api/admin", { headers: { "x-admin-pass": p } })
    const d = await r.json().catch(() => ({}))
    if (d.ok) { setData(d); sessionStorage.setItem("sb_admin", p) } else setErr(d.error || `http_${r.status}`)
  }
  const decide = async (id: string, decision: string) => {
    await fetch("/api/admin", { method: "POST", headers: { "x-admin-pass": pass, "Content-Type": "application/json" }, body: JSON.stringify({ id, decision }) })
    load()
  }
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-5">
      <h1 className="text-2xl font-extrabold">SushiButt admin · clip review</h1>
      <meta name="robots" content="noindex" />
      {!data && (
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); load() }}>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passphrase" className="flex-1 px-3 py-2 border rounded-xl" />
          <button className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold">Open</button>
        </form>
      )}
      {err && <p className="text-rose-600 font-bold">{err === "store_not_configured" ? "KV store not connected yet." : err}</p>}
      {data && (
        <>
          <div className="flex gap-2">{["pending", "approved", "rejected", "all"].map((f) => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full border font-bold text-sm ${filter === f ? "bg-primary text-white" : "bg-white"}`}>{f} ({f === "all" ? data.clips.length : data.clips.filter((c) => c.status === f).length})</button>)}</div>
          <div className="space-y-2">
            {data.clips.filter((c) => filter === "all" || c.status === filter).map((c) => (
              <div key={c.id} className="bg-white border rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1 min-w-0 text-sm">
                  <p className="font-extrabold">@{c.handle} · {c.campaign} · {c.platform} · <span className="text-primary">{c.status}</span></p>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs break-all text-primary">{c.url}</a>
                  <p className="text-xs text-muted-foreground">{new Date(Number(c.at)).toLocaleString()}</p>
                </div>
                {c.status === "pending" && <div className="flex gap-2"><button onClick={() => decide(c.id, "approved")} className="px-3 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-sm">Approve</button><button onClick={() => decide(c.id, "rejected")} className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 font-bold text-sm">Reject</button></div>}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-extrabold pt-4">Campaign listing requests ({data.listings.length})</h2>
          <div className="space-y-2">{data.listings.map((l, i) => <div key={i} className="bg-white border rounded-2xl p-3 text-sm"><p className="font-extrabold">{l.brand} · {l.title} <span className="text-muted-foreground font-normal">({l.type})</span></p><p>{l.email} · {l.url} · {l.platforms} · budget: {l.budget}</p><p className="text-muted-foreground whitespace-pre-wrap">{l.details}</p><p className="text-xs text-muted-foreground">{l.at}</p></div>)}</div>
        </>
      )}
    </main>
  )
}
