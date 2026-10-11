"use client"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { SPONSOR_TIERS, SPONSOR_STATS, VIEW_FORMULA, fmt } from "@/config/site"

export default function SponsorsPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="rounded-3xl bg-gradient-to-br from-pink-100 via-white to-amber-100 border p-6 sm:p-10 space-y-3">
          <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Sponsor kit</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">Put your brand on the belt.</h1>
          <p className="text-muted-foreground max-w-2xl">SushiButt turns a brief into hundreds of short clips: clippers compete for points, prizes and leaderboard spots, and you get the content.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link href="/brand" className="px-5 py-2.5 rounded-full bg-primary text-white font-extrabold">List a campaign</Link>
            <a href="/sponsors/sushibutt-media-kit.pdf" download className="px-5 py-2.5 rounded-full border bg-white font-extrabold">Download media kit (PDF)</a>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-extrabold">What a brand gets</h2>
          <div className="grid sm:grid-cols-4 gap-3">
            {[["📝", "Brief", "Mission, tags, source footage, hooks, do/don't — written for clippers."], ["🖼️", "Banners", "Card, hero, story and square art plus a downloadable promo kit."], ["✅", "Quests", "Follow, daily, share and connect quests that grow your accounts."], ["✂️", "Clipper pool", "Clippers, editors and creators racing the leaderboard for your campaign."]].map(([e, t, d]) => (
              <div key={t} className="bg-white border rounded-3xl p-4"><p className="text-3xl">{e}</p><p className="font-extrabold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-extrabold">Tiers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {SPONSOR_TIERS.map((t, i) => (
              <div key={t.id} className={`rounded-3xl border p-5 space-y-3 ${i === 1 ? "bg-pink-50 border-primary" : "bg-white"}`}>
                <p className="text-xl font-extrabold">{t.name}</p>
                <p className="text-2xl font-extrabold text-primary">{t.from}</p>
                <ul className="text-sm space-y-1">{t.perks.map((p) => <li key={p}>✓ {p}</li>)}</ul>
                <Link href={`/brand?tier=${t.id}`} className="block text-center px-4 py-2 rounded-full bg-primary text-white font-extrabold">Start with {t.name}</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border bg-white p-5 space-y-2">
          <h2 className="text-xl font-extrabold">Performance pool add-on</h2>
          <p className="text-sm text-muted-foreground">Fund a prize pool that pays out on approved-clip performance. Today clippers earn points ({fmt(VIEW_FORMULA.perThousandViews)} ★ per 1K views plus engagement, capped at {fmt(VIEW_FORMULA.capPerClip)} ★ per clip); cash payouts are coming soon and pool terms are agreed per campaign. Pricing: from $X.</p>
        </section>

        <section id="mystery-box" className="rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-to-r from-amber-50 to-pink-50 p-5 space-y-2">
          <h2 className="text-xl font-extrabold">🎁 Sponsor a Mystery Box Friday</h2>
          <p className="text-sm text-muted-foreground">Your products in the weekly box, your name on the countdown, and a clip campaign around the reveal. Free entry for fans, always.</p>
          <Link href="/brand?type=mystery-box" className="inline-block px-5 py-2.5 rounded-full bg-primary text-white font-extrabold">Sponsor next week&apos;s box</Link>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-extrabold">Audience</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{SPONSOR_STATS.map((s) => <div key={s.label} className="bg-white border rounded-3xl p-4"><p className="text-2xl font-extrabold">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></div>)}</div>
          <p className="text-xs text-muted-foreground">Live numbers will replace these placeholders once accounts open. We don&apos;t publish estimates.</p>
        </section>
      </div>
    </AppShell>
  )
}
