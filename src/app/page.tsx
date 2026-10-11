"use client"

import { AppShell } from "@/components/layout/AppShell"
import { LaunchFilm } from "@/components/campaigns/LaunchFilm"
import { EasyQuests } from "@/components/campaigns/EasyQuests"
import { FilterBar } from "@/components/campaigns/FilterBar"
import { CampaignGrid } from "@/components/campaigns/CampaignGrid"
import { CampaignModal } from "@/components/modals/CampaignModal"
import { useI18n } from "@/i18n/LanguageProvider"
import { PayBanner } from "@/components/ui/PayBanner"
import { FeaturedOffers } from "@/components/sb/FeaturedOffers"
import { BrandChips } from "@/components/sb/BrandChips"
import { LoginPanel } from "@/components/sb/LoginPanel"
import { SetupNotice } from "@/components/sb/SetupNotice"
import { FounderCard } from "@/components/sb/FounderCard"

export default function Home() {
  const { t } = useI18n()
  return (
    <AppShell>
      <div id="opens" className="max-w-7xl mx-auto px-4 py-4 space-y-5">
        <LaunchFilm />
        <div>
          <p className="text-primary font-extrabold text-xs tracking-[0.2em]">SUSHIBUTT.COM ★ THE BELT</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{t("tagline")}</h1>
        </div>
        <PayBanner />
        <SetupNotice />
        <LoginPanel />
        <FeaturedOffers />
        <FounderCard />
        <EasyQuests />
        <FilterBar />
        <BrandChips />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-extrabold text-primary uppercase tracking-wide">{t("home.starting")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <CampaignGrid />
      </div>
      <CampaignModal />
    </AppShell>
  )
}
