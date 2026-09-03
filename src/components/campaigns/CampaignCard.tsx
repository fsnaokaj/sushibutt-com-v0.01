"use client"

import Image from "next/image"
import { Users } from "lucide-react"
import { Campaign } from "@/types"
import { cn, formatBudget, formatViews } from "@/utils"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { Badge } from "@/components/ui/Badge"
import { BudgetBar } from "@/components/ui/BudgetBar"
import { useAppStore } from "@/hooks/useStore"

interface CampaignCardProps {
  campaign: Campaign
  className?: string
}

export function CampaignCard({ campaign, className }: CampaignCardProps) {
  const { openModal } = useAppStore()

  return (
    <div
      className={cn(
        "campaign-card bg-card border border-border rounded-xl overflow-hidden cursor-pointer",
        className
      )}
      onClick={() => openModal(campaign)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {campaign.thumbnailUrl ? (
          <Image
            src={campaign.thumbnailUrl}
            alt={campaign.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to gradient placeholder
              const el = e.currentTarget as HTMLImageElement
              el.style.display = "none"
            }}
          />
        ) : null}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

        {/* Platform icons top-right */}
        <div className="absolute top-2 right-2 flex gap-1">
          {campaign.platforms.map((p) => (
            <div
              key={p}
              className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow"
            >
              <PlatformIcon platform={p} size="sm" className="text-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 space-y-2">
        {/* Agency row */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground overflow-hidden">
            {campaign.agencyLogoUrl ? (
              <Image src={campaign.agencyLogoUrl} alt={campaign.agency} width={20} height={20} />
            ) : (
              campaign.agency[0]
            )}
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {campaign.agency}
            {campaign.agencyVerified && (
              <span className="ml-1 text-yellow-500">🔥</span>
            )}
          </span>
          <span className="text-xs text-muted-foreground ml-auto shrink-0">· {campaign.postedAgo}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
          {campaign.title}
        </h3>

        {/* Budget bar */}
        <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} />

        {/* Stats row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>
              {campaign.creatorCount >= 1000
                ? `${(campaign.creatorCount / 1000).toFixed(0)}K`
                : campaign.creatorCount}
            </span>
          </div>

          <Badge variant="cpm">${campaign.cpm}/1K</Badge>
        </div>
      </div>
    </div>
  )
}
