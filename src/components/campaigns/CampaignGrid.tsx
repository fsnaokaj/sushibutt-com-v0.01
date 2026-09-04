"use client"

import { CampaignCard } from "./CampaignCard"
import { useCampaigns } from "@/hooks/useCampaigns"
import { useI18n } from "@/i18n/LanguageProvider"

export function CampaignGrid() {
  const { campaigns, total } = useCampaigns()
  const { t } = useI18n()
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
      {total === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-extrabold mb-1">{t("home.empty")}</p>
          <p className="text-sm">{t("home.emptyHint")}</p>
        </div>
      )}
    </div>
  )
}
