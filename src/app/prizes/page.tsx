"use client"

import { AppShell } from "@/components/layout/AppShell"
import { useI18n } from "@/i18n/LanguageProvider"
import { PayBanner } from "@/components/ui/PayBanner"
import { ScoreFormula } from "@/components/campaigns/ScoreFormula"

export default function PrizesPage() {
  const { t } = useI18n()
  const cards = [
    { title: t("prizes.algo"), desc: t("prizes.algoD"), emoji: "▶" },
    { title: t("prizes.weekly"), desc: t("prizes.weeklyD"), emoji: "🥂" },
    { title: t("prizes.wasabi"), desc: t("prizes.wasabiD"), emoji: "♦️" },
    { title: t("prizes.fixed"), desc: t("prizes.fixedD"), emoji: "★" },
    { title: t("prizes.cpm"), desc: t("prizes.cpmD"), emoji: "💸" }
  ]
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold">{t("prizes.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("prizes.subtitle")}</p>
        </div>
        <PayBanner />
        <div className="border rounded-3xl p-5 bg-white">
          <ScoreFormula />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((c) => (
            <div key={c.title} className="bg-white border rounded-3xl p-5">
              <p className="text-3xl mb-2">{c.emoji}</p>
              <h2 className="font-extrabold">{c.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
