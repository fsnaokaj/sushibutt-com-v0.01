"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { HeroBanner } from "@/components/campaigns/HeroBanner"
import { FilterBar } from "@/components/campaigns/FilterBar"
import { CampaignGrid } from "@/components/campaigns/CampaignGrid"
import { FeaturedRow } from "@/components/campaigns/FeaturedRow"
import { CampaignModal } from "@/components/modals/CampaignModal"
import { getFeaturedHeroCampaigns } from "@/data/campaigns"

const heroCampaigns = getFeaturedHeroCampaigns()

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

          {/* Hero banner */}
          <HeroBanner campaigns={heroCampaigns} />

          {/* Filters */}
          <FilterBar />

          {/* Featured campaigns row */}
          <FeaturedRow />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">All Campaigns</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Campaign grid */}
          <CampaignGrid />
        </div>
      </main>

      {/* Modal */}
      <CampaignModal />
    </div>
  )
}
