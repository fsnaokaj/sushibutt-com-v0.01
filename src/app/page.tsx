"use client"

import { AppShell } from "@/components/layout/AppShell"
import { HeroBanner } from "@/components/campaigns/HeroBanner"
import { FilterBar } from "@/components/campaigns/FilterBar"
import { CampaignGrid } from "@/components/campaigns/CampaignGrid"
import { FeaturedRow } from "@/components/campaigns/FeaturedRow"
import { CampaignModal } from "@/components/modals/CampaignModal"
import { getFeaturedHeroCampaigns } from "@/data/campaigns"
import { useI18n } from "@/i18n/LanguageProvider"

export default function Home() {
  const { t } = useI18n()
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div>
          <p className="text-primary font-extrabold text-sm tracking-wide">sushibutt.com ★ 🍣</p>
          <h1 className="text-3xl font-extrabold">{t("tagline")}</h1>
        </div>
        <HeroBanner campaigns={getFeaturedHeroCampaigns()} />
        <FilterBar />
        <FeaturedRow />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-extrabold text-primary uppercase tracking-wide">{t("home.all")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <CampaignGrid />
      </div>
      <CampaignModal />
    </AppShell>
  )
}
