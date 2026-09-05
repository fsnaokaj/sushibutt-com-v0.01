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
import { campaignTitle, campaignCopy, openStatus, rateLabel, statusTone } from "@/utils/campaign"

export function CampaignCard({ campaign, className }: { campaign: Campaign; className?: string }) {
  const { openModal } = useAppStore()
  const { t } = useI18n()
  const title = campaignTitle(campaign, t)
  const blurb = campaignCopy(campaign, "description", t)
  const status = openStatus(campaign)

  return (
    <button
      onClick={() => openModal(campaign)}
      className={cn("campaign-card text-left bg-white border border-border rounded-2xl overflow-hidden w-full", className)}
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {campaign.thumbnailUrl && (
          <Image src={campaign.thumbnailUrl} alt={title} fill className="object-cover" />
        )}
        <span className={cn("absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide", statusTone(status))}>
          {t(`filters.${status}`)}
        </span>
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
        <h3 className="text-sm font-extrabold leading-snug line-clamp-2">{title}</h3>
        {blurb ? (
          <p className="text-xs text-muted-foreground line-clamp-2">{blurb}</p>
        ) : null}
        {campaign.budgetTotal > 0 ? <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} /> : null}
        <div className="flex items-center justify-between">
          {campaign.creatorCount > 0 ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              {campaign.creatorCount}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">{campaign.contentType}</span>
          )}
          <Badge variant="cpm">{rateLabel(campaign, t)}</Badge>
        </div>
      </div>
    </button>
  )
}
