"use client"

import { AppShell } from "@/components/layout/AppShell"
import { boardSeats, beltTag, gemForRank } from "@/data/leaderboard"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { cn } from "@/utils"

const BANDS = [
  { id: "champagne" as const, from: 1, to: 8, glow: "from-amber-50 to-pink-50 border-amber-200" },
  { id: "ruby" as const, from: 9, to: 33, glow: "from-rose-50 to-white border-rose-200" },
  { id: "sapphire" as const, from: 34, to: 66, glow: "from-sky-50 to-white border-sky-200" },
  { id: "platinum" as const, from: 67, to: 99, glow: "from-slate-50 to-white border-slate-200" }
]

export default function LeaderboardPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const tag = user ? beltTag(user.id) : ""
  const rows = (() => {
    const seats = boardSeats.map((s) => ({ ...s, isYou: false, label: s.tag }))
    if (!user) return seats
    const idx = seats.findIndex((s) => user.points >= s.points)
    if (idx === -1) return seats
    seats.splice(idx, 0, {
      rank: 0,
      tag,
      points: user.points,
      gem: gemForRank(idx + 1),
      isYou: true,
      label: t("board.you")
    })
    seats.pop()
    return seats.map((s, i) => ({ ...s, rank: i + 1, gem: gemForRank(i + 1) }))
  })()
  const youRank = rows.find((r) => r.isYou)?.rank

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{t("board.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("board.subtitle")}</p>
        </div>

        {user && (
          <div className="rounded-3xl border bg-white p-4">
            <p className="text-xs text-muted-foreground">{t("board.climbing")}</p>
            <p className="font-extrabold text-primary">
              {t("board.climbingD", { points: user.points, tag })}
            </p>
            {youRank && (
              <p className="text-sm mt-1">
                {gemForRank(youRank).emoji} #{youRank} {gemForRank(youRank).label}
              </p>
            )}
          </div>
        )}

        {BANDS.map((band) => (
          <section key={band.id} className={cn("rounded-3xl border overflow-hidden bg-gradient-to-b", band.glow)}>
            <div className="px-4 py-3 flex items-baseline justify-between">
              <h2 className="font-extrabold">
                {band.id === "champagne" ? "🥂 " : band.id === "ruby" ? "♦️ " : band.id === "sapphire" ? "💠 " : "⚪ "}
                {t(`board.${band.id}`)}
              </h2>
              <p className="text-xs text-muted-foreground">{t(`board.${band.id}D`)}</p>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2">{t("board.rank")}</th>
                  <th className="text-left px-4 py-2">{t("board.clipper")}</th>
                  <th className="text-right px-4 py-2">{t("board.prize")}</th>
                  <th className="text-right px-4 py-2">{t("board.points")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.filter((r) => r.rank >= band.from && r.rank <= band.to).map((r) => {
                  const gem = gemForRank(r.rank)
                  return (
                    <tr key={r.rank} className={cn("border-t", r.isYou && "bg-pink-100 font-bold", r.rank === 1 && "bg-amber-50")}>
                      <td className="px-4 py-2.5">{r.rank === 1 ? "👑" : r.rank}</td>
                      <td className="px-4 py-2.5 font-mono text-xs sm:text-sm">{r.label}</td>
                      <td className="px-4 py-2.5 text-right">{gem.emoji} {r.rank === 1 ? t("board.champion") : gem.label}</td>
                      <td className="px-4 py-2.5 text-right text-primary font-extrabold">{r.points} ★</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </AppShell>
  )
}
