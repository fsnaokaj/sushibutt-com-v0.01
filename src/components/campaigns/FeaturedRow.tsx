"use client"

import Image from "next/image"
import { campaigns } from "@/data/campaigns"
import { useAppStore } from "@/hooks/useStore"
import { Campaign } from "@/types"

export function FeaturedRow() {
  const featured = campaigns.filter((c) => c.featured)
  const { openModal } = useAppStore()

  if (featured.length === 0) return null

  return (
    <section>
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Featured
      </h2>
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-3" style={{ minWidth: "max-content" }}>
          {featured.map((c) => (
            <FeaturedCard key={c.id} campaign={c} onClick={() => openModal(c)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ campaign, onClick }: { campaign: Campaign; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="campaign-card bg-card border border-border rounded-xl overflow-hidden cursor-pointer w-48 shrink-0 text-left"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        {campaign.thumbnailUrl ? (
          <Image
            src={campaign.thumbnailUrl}
            alt={campaign.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
      </div>
      <div className="p-2.5 space-y-1">
        <p className="text-xs text-muted-foreground truncate">{campaign.agency}</p>
        <p className="text-xs font-semibold leading-snug line-clamp-2">{campaign.title}</p>
        <span className="inline-block text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
          ${campaign.cpm}/1K
        </span>
      </div>
    </button>
  )
}
