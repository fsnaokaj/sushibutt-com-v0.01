"use client"
import { AppShell } from "@/components/layout/AppShell"
import { FeaturedOffers } from "@/components/sb/FeaturedOffers"
import { FounderCard } from "@/components/sb/FounderCard"
export default function OffersPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <FeaturedOffers full />
        <FounderCard />
      </div>
    </AppShell>
  )
}
