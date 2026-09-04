"use client"

import Image from "next/image"
import { Users } from "lucide-react"
import { Campaign } from "@/types"
import { cn } from "@/utils"
import { Badge } from "@/components/ui/Badge"
import { BudgetBar } from "@/components/ui/BudgetBar"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { campaignTitle, rateLabel } from "@/utils/campaign"

export function CampaignCard({ campaign, className }: { campaign: Campaign; className?: string }) {
  const { openModal } = useAppStore()
  const { t } = useI18n()

  return (
    <button
      onClick={() => openModal(campaign)}
      className={cn("campaign-card text-left bg-white border border-border rounded-2xl overflow-hidden w-full", className)}
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {campaign.thumbnailUrl && (
          <Image src={campaign.thumbnailUrl} alt={campaignTitle(campaign, t)} fill className="object-cover" />
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {campaign.platforms.map((p) => (
            <div key={p} className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
              <PlatformIcon platform={p} size="sm" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-bold text-primary">🍣 {campaign.agency}</span>
          <span>· {campaign.postedAgo}</span>
        </div>
        <h3 className="text-sm font-extrabold leading-snug line-clamp-2">{campaignTitle(campaign, t)}</h3>
        <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} />
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            {campaign.creatorCount}
          </span>
          <Badge variant="cpm">{rateLabel(campaign, t)}</Badge>
        </div>
      </div>
    </button>
  )
}
