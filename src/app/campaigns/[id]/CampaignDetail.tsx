"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useAllCampaigns } from "@/hooks/useStore"
import { CampaignBody } from "@/components/campaigns/CampaignBody"
import { AppShell } from "@/components/layout/AppShell"
import { useI18n } from "@/i18n/LanguageProvider"

export function CampaignDetail() {
  const params = useParams()
  const router = useRouter()
  const { t } = useI18n()
  const all = useAllCampaigns()
  const c = all.find((x) => x.id === params.id)

  if (!c) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <p className="font-extrabold mb-2">{t("campaign.notFound")}</p>
            <button onClick={() => router.push("/")} className="text-primary font-bold">{t("campaign.back")}</button>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="border-b border-border px-6 py-3">
        <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> {t("campaign.back")}
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CampaignBody c={c} />
      </div>
    </AppShell>
  )
}
