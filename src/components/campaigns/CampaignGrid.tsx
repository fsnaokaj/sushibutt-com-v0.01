"use client"

import { CampaignCard } from "./CampaignCard"
import { useCampaigns } from "@/hooks/useCampaigns"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"

export function CampaignGrid() {
  const { campaigns, total } = useCampaigns()
  const status = useAppStore((s) => s.filters.status) ?? "active"
  const { t } = useI18n()
  const opens = campaigns.slice(0, 8)
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground mb-3">
        {t("home.showing", { count: total, status: t(`filters.${status}`) })}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {opens.map((c) => (
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
