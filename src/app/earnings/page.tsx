"use client"

import { AppShell } from "@/components/layout/AppShell"
import { useAllCampaigns, useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { campaignTitle, rateLabel } from "@/utils/campaign"
import Link from "next/link"

export default function EarningsPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const all = useAllCampaigns()
  const mine = all.filter((c) => user?.joinedIds.includes(c.id))

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{t("earnings.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("earnings.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            [t("earnings.earned"), "$0.00"],
            [t("earnings.pending"), "$0.00"],
            [t("earnings.views"), "0"],
            [t("earnings.points"), `${user?.points ?? 0} ★`]
          ].map(([label, value]) => (
            <div key={label} className="bg-white border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-extrabold">{value}</p>
            </div>
          ))}
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
                  <th className="text-right px-4 py-2">{t("earnings.cpm")}</th>
                </tr>
              </thead>
              <tbody>
                {mine.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-3 font-bold">{campaignTitle(c, t)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.agency}</td>
                    <td className="px-4 py-3 text-right">{rateLabel(c, t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppShell>
  )
}
