"use client"

import { CampaignCard } from "./CampaignCard"
import { useCampaigns } from "@/hooks/useCampaigns"

export function CampaignGrid() {
  const { campaigns, total } = useCampaigns()

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
      {total === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-1">No campaigns found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
