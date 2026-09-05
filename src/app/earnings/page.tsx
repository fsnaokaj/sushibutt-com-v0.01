"use client"

import { useEffect } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { useAllCampaigns, useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { campaignTitle, rateLabel } from "@/utils/campaign"
import { clipTotals } from "@/data/scoring"
import { formatViews } from "@/utils"
import Link from "next/link"
import { PayBanner } from "@/components/ui/PayBanner"
import { ScoreFormula } from "@/components/campaigns/ScoreFormula"
import { ClipScoreCard } from "@/components/campaigns/ClipScoreCard"

export default function EarningsPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const clips = useAppStore((s) => s.clips)
  const refreshClips = useAppStore((s) => s.refreshClips)
  const all = useAllCampaigns()
  const mine = all.filter((c) => user?.joinedIds.includes(c.id))
  const totals = clipTotals(clips)

  useEffect(() => {
    refreshClips()
  }, [refreshClips])

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{t("earnings.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("earnings.subtitle")}</p>
        </div>
        <PayBanner />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            [t("earnings.earned"), "$0.00"],
            [t("earnings.pending"), "$0.00"],
            [t("earnings.views"), formatViews(totals.views)],
            [t("earnings.points"), `${user?.points ?? 0} ★`]
          ].map(([label, value]) => (
            <div key={label} className="bg-white border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-extrabold">{value}</p>
            </div>
          ))}
        </div>

        <div className="border rounded-3xl p-5 bg-white">
          <ScoreFormula compact />
          {clips.length > 0 && (
            <button type="button" onClick={refreshClips} className="mt-3 px-4 py-2 rounded-full bg-primary text-white text-sm font-extrabold">
              {t("score.sync")}
            </button>
          )}
        </div>

        <div className="border rounded-3xl overflow-hidden bg-white">
          <div className="px-4 py-3 border-b bg-secondary/50 font-extrabold text-sm">{t("earnings.clips")}</div>
          {clips.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              {t("score.none")}{" "}
              <Link href="/" className="text-primary font-bold">{t("nav.campaigns")}</Link>
            </p>
          ) : (
            clips.map((clip) => {
              const campaign = all.find((c) => c.id === clip.campaignId)
              return (
                <ClipScoreCard
                  key={clip.id}
                  clip={clip}
                  campaignTitle={campaign ? campaignTitle(campaign, t) : clip.campaignId}
                />
              )
            })
          )}
        </div>

        <div className="border rounded-3xl overflow-hidden bg-white">
          <div className="px-4 py-3 border-b bg-secondary/50 font-extrabold text-sm">{t("earnings.byCampaign")}</div>
          {mine.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              {t("earnings.none")}{" "}
              <Link href="/" className="text-primary font-bold">{t("nav.campaigns")}</Link>
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-2">{t("earnings.campaign")}</th>
                  <th className="text-left px-4 py-2">{t("earnings.agency")}</th>
                  <th className="text-right px-4 py-2">{t("score.views")}</th>
                  <th className="text-right px-4 py-2">{t("score.clipPts")}</th>
                  <th className="text-right px-4 py-2">{t("earnings.cpm")}</th>
                </tr>
              </thead>
              <tbody>
                {mine.map((c) => {
                  const mineClips = clips.filter((clip) => clip.campaignId === c.id)
                  const sum = clipTotals(mineClips)
                  return (
                    <tr key={c.id} className="border-t">
                      <td className="px-4 py-3 font-bold">{campaignTitle(c, t)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.agency}</td>
                      <td className="px-4 py-3 text-right">{formatViews(sum.views)}</td>
                      <td className="px-4 py-3 text-right font-extrabold text-primary">{sum.pts} ★</td>
                      <td className="px-4 py-3 text-right">{rateLabel(c, t)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppShell>
  )
}
