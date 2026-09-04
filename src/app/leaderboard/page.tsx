"use client"

import { AppShell } from "@/components/layout/AppShell"
import { globalLeaders } from "@/data/leaderboard"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { formatViews } from "@/utils"

export default function LeaderboardPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const rows = user
    ? [...globalLeaders, { username: user.name, points: user.points, views: user.points * 80, prize: "—", country: "★" }]
        .sort((a, b) => b.points - a.points)
    : globalLeaders

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold">{t("board.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("board.subtitle")}</p>
        </div>
        <div className="bg-white border rounded-3xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs">
              <tr>
                <th className="text-left px-4 py-2">{t("board.rank")}</th>
                <th className="text-left px-4 py-2">{t("board.clipper")}</th>
                <th className="text-right px-4 py-2">{t("board.points")}</th>
                <th className="text-right px-4 py-2">{t("board.views")}</th>
                <th className="text-right px-4 py-2">{t("board.prize")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.username} className={user?.name === r.username ? "bg-pink-50 font-bold" : "border-t"}>
                  <td className="px-4 py-3">{i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}</td>
                  <td className="px-4 py-3">{r.username}{user?.name === r.username ? ` (${t("board.you")})` : ""}</td>
                  <td className="px-4 py-3 text-right text-primary font-extrabold">{r.points} ★</td>
                  <td className="px-4 py-3 text-right">{formatViews(r.views)}</td>
                  <td className="px-4 py-3 text-right">{r.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
