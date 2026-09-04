"use client"

import { useAllCampaigns } from "@/hooks/useStore"
import { CampaignCard } from "./CampaignCard"
import { useI18n } from "@/i18n/LanguageProvider"

export function FeaturedRow() {
  const all = useAllCampaigns()
  const { t } = useI18n()
  const featured = all.filter((c) => c.featured)
  if (!featured.length) return null
  return (
    <section>
      <h2 className="text-sm font-extrabold text-primary uppercase tracking-wide mb-3">★ {t("sort.Featured")}</h2>
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-3" style={{ minWidth: "max-content" }}>
          {featured.map((c) => (
            <div key={c.id} className="w-48 shrink-0">
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
