"use client"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { useAccount } from "@/lib/client/account"
import { RULES, INVITE_LADDER, STREAKS, LINK_SLOTS, WHOP, fmt, streakMult } from "@/config/site"
import { EasyQuests } from "@/components/campaigns/EasyQuests"
import { SetupNotice } from "@/components/sb/SetupNotice"
import { LoginPanel } from "@/components/sb/LoginPanel"
import { cn } from "@/utils"

function Row({ title, sub, pts, done, action }: { title: string; sub?: string; pts: string; done?: boolean; action?: React.ReactNode }) {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-2xl border", done ? "bg-pink-50 border-primary/30" : "bg-white")}>
      <div className="flex-1 min-w-0"><p className="font-extrabold">{title}</p>{sub && <p className="text-xs text-muted-foreground">{sub}</p>}</div>
      <span className="text-sm font-extrabold text-primary whitespace-nowrap">{done ? "✓ Done" : pts}</span>
      {action}
    </div>
  )
}

export default function QuestsPage() {
  const a = useAccount()
  const s = a.state
  const chestReady = !!s && s.checkedInToday && s.dailySpun && !s.chestOpened
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Farm the belt</p>
          <h1 className="text-3xl font-extrabold">Quests</h1>
          <p className="text-sm text-muted-foreground">Race to 100K, 500K and 1M ★. Points are free, for fun, and have no cash value.</p>
        </div>
        <SetupNotice />
        {!s && <LoginPanel />}

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold">Daily</h2>
          <Row title="Daily check-in" sub={`Base +${fmt(RULES.checkin)} ★ × your streak multiplier${s ? ` (now ${streakMult(s.streak + (s.checkedInToday ? 0 : 1))}x)` : ""}`} pts={`+${fmt(RULES.checkin)}+`} done={s?.checkedInToday}
            action={s && !s.checkedInToday ? <button onClick={() => a.call("/api/me", { action: "quest", kind: "checkin" })} className="px-3 py-1.5 rounded-full bg-primary text-white text-sm font-bold">Check in</button> : null} />
          <Row title="Daily spin" sub="One free spin a day, picked on the server. Odds published." pts="500 – 100,000" done={s?.dailySpun}
            action={s && !s.dailySpun ? <Link href="/spin?mode=daily" className="px-3 py-1.5 rounded-full bg-primary text-white text-sm font-bold">Spin</Link> : null} />
          <Row title="Daily chest" sub="Unlocks after today's check-in and daily spin." pts={`+${fmt(RULES.dailyChest)}`} done={s?.chestOpened}
            action={chestReady ? <button onClick={() => a.call("/api/me", { action: "quest", kind: "chest" })} className="px-3 py-1.5 rounded-full bg-amber-400 text-[#4a0f2c] text-sm font-extrabold">Open 🎁</button> : null} />
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold">Farming streaks {s ? <span className="text-primary">· day {s.streak}</span> : null}</h2>
          {STREAKS.map((t) => <Row key={t.days} title={`${t.days}-day streak`} sub={`Check-ins pay ${t.mult}x from day ${t.days}`} pts={`+${fmt(t.bonus)}`} done={!!s && s.streak >= t.days} />)}
          <p className="text-xs text-muted-foreground">Miss a day (UTC) and the streak resets to 1.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold">Invite ladder {s ? <span className="text-primary">· {s.invites} joined</span> : null}</h2>
          <p className="text-sm text-muted-foreground">Every friend: +{fmt(RULES.inviteInviter)} ★ for you, +{fmt(RULES.inviteInvitee)} ★ for them. Plus ladder bonuses:</p>
          {INVITE_LADDER.map((l) => <Row key={l.friends} title={`${l.friends} friend${l.friends > 1 ? "s" : ""}`} pts={`+${fmt(l.bonus)}`} done={!!s && s.invites >= l.friends} />)}
          {s && <p className="text-xs">Your link: <Link className="text-primary font-bold" href={`/${s.handle}`}>sushibutt.com/{s.handle}</Link></p>}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold">Connect & verify accounts</h2>
          {LINK_SLOTS.map((slot) => <Row key={slot} title={slot[0].toUpperCase() + slot.slice(1)} sub={s?.verified[slot] ? `Verified @${s.verified[slot]}` : s?.links[slot] ? `@${s.links[slot]} · unverified` : "Not connected"} pts={`+${fmt(RULES.link)} · verify +${fmt(RULES.verify)}`} done={!!s?.verified[slot]} />)}
          <p className="text-xs text-muted-foreground">Connect in <Link href="/settings" className="text-primary font-bold">Settings</Link>. To verify, put your code in that profile&apos;s bio; an admin confirms it. OAuth verification is coming.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold">Buy something</h2>
          <Row title={WHOP.supportPack.label} sub="Via Whop — checkout opens soon." pts={`+${fmt(RULES.purchaseBonus)}`} action={<button disabled className="px-3 py-1.5 rounded-full border text-sm font-bold opacity-50">Soon</button>} />
          <p className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">Purchases add points only. They never add giveaway entries or improve odds — no purchase necessary to enter any giveaway.</p>
        </section>

        <EasyQuests />
      </div>
    </AppShell>
  )
}
