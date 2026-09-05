"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { Campaign } from "@/types"
import { CampaignCard } from "@/components/campaigns/CampaignCard"
import { CampaignModal } from "@/components/modals/CampaignModal"
import { canList } from "@/utils/user"
import { PayBanner } from "@/components/ui/PayBanner"

export default function BrandPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const publishCampaign = useAppStore((s) => s.publishCampaign)
  const [title, setTitle] = useState("")
  const [budget, setBudget] = useState(0)
  const [cpm, setCpm] = useState(0)
  const [rateType, setRateType] = useState<Campaign["rateType"]>("points")
  const [status, setStatus] = useState<NonNullable<Campaign["status"]>>("registering")
  const [done, setDone] = useState(false)
  const allowed = canList(user)

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{t("brandPage.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("brandPage.subtitle")}</p>
        </div>
        <PayBanner />
        {!allowed ? (
          <div className="border rounded-3xl p-6 bg-white">
            <p className="mb-3">{t("brandPage.needBrand")}</p>
            <Link href="/join" className="inline-block px-5 py-2.5 bg-primary text-white rounded-full font-extrabold">{t("nav.join")}</Link>
          </div>
        ) : (
          <form
            className="space-y-3 bg-white border rounded-3xl p-5"
            onSubmit={(e) => {
              e.preventDefault()
              publishCampaign({ title, budget, cpm, rateType, status })
              setDone(true)
              setTitle("")
            }}
          >
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("brandPage.name")} className="w-full px-3 py-2 border rounded-xl" />
            <input type="text" value={budget || ""} onChange={(e) => setBudget(Number(e.target.value) || 0)} placeholder={t("brandPage.budget")} className="w-full px-3 py-2 border rounded-xl" />
            <select value={rateType} onChange={(e) => setRateType(e.target.value as Campaign["rateType"])} className="w-full px-3 py-2 border rounded-xl">
              <option value="points">{t("campaign.points")}</option>
              <option value="cpm">CPM · {t("pay.soon")}</option>
              <option value="fixed">{t("campaign.fixed")} · {t("pay.soon")}</option>
            </select>
            {rateType !== "points" && (
              <input type="number" step="0.5" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} placeholder={t("brandPage.cpm")} className="w-full px-3 py-2 border rounded-xl" />
            )}
            <select value={status} onChange={(e) => setStatus(e.target.value as NonNullable<Campaign["status"]>)} className="w-full px-3 py-2 border rounded-xl">
              <option value="registering">{t("filters.registering")}</option>
              <option value="live">{t("filters.live")}</option>
              <option value="upcoming">{t("filters.upcoming")}</option>
              <option value="ended">{t("filters.ended")}</option>
            </select>
            <button className="w-full py-3 bg-primary text-white rounded-full font-extrabold">{t("brandPage.publish")}</button>
            {done && <p className="text-primary font-bold text-sm">{t("brandPage.published")}</p>}
          </form>
        )}
        {user?.createdCampaigns.length ? (
          <div>
            <h2 className="font-extrabold mb-3">{t("brandPage.mine")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {user.createdCampaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)}
            </div>
          </div>
        ) : null}
      </div>
      <CampaignModal />
    </AppShell>
  )
}
