"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, ThumbsUp } from "lucide-react"
import { Campaign } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { BudgetBar } from "@/components/ui/BudgetBar"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { formatViews } from "@/utils"
import { cn } from "@/utils"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { campaignCopy, campaignTitle, rateLabel } from "@/utils/campaign"
import { useRouter } from "next/navigation"

export function CampaignBody({ c }: { c: Campaign }) {
  const { t } = useI18n()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const joinCampaign = useAppStore((s) => s.joinCampaign)
  const submitClip = useAppStore((s) => s.submitClip)
  const submissions = useAppStore((s) => s.submissions)
  const [tab, setTab] = useState<"Overview" | "Leaderboard" | "Analytics">("Overview")
  const joined = user?.joinedIds.includes(c.id)
  const submitted = submissions[c.id]

  const onJoin = () => {
    if (!user) {
      router.push("/join")
      return
    }
    joinCampaign(c.id)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">🍣 {c.agency} ★</div>
        <h1 className="text-2xl font-extrabold">{campaignTitle(c, t)}</h1>
        <div className="flex gap-3">
          <button onClick={onJoin} className="flex-1 py-3 bg-primary text-white rounded-full font-extrabold">
            {joined ? t("campaign.joined") : t("campaign.join")}
          </button>
          {joined && (
            <button
              onClick={() => submitClip(c.id)}
              disabled={submitted}
              className="px-4 py-3 border border-border rounded-full text-sm font-bold disabled:opacity-60"
            >
              {submitted ? t("campaign.submitted") : t("campaign.submit")}
            </button>
          )}
        </div>
        <div className="flex gap-4 border-b border-border">
          {(["Overview", "Leaderboard", "Analytics"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "pb-2 text-sm font-bold border-b-2 -mb-px",
                tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              )}
            >
              {t(`campaign.${key.toLowerCase()}`)}
            </button>
          ))}
        </div>
        {tab === "Overview" && (
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">{campaignCopy(c, "description", t)}</p>
            {campaignCopy(c, "requirements", t) && (
              <div className="bg-secondary rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("campaign.requirements")}</p>
                <p>{campaignCopy(c, "requirements", t)}</p>
              </div>
            )}
            <div>
              <h3 className="font-extrabold mb-2">{t("campaign.earnings")}</h3>
              <Badge variant="cpm">{rateLabel(c, t)}</Badge>
              {c.prizePool ? <p className="mt-2 text-primary font-bold">${c.prizePool.toLocaleString()} {t("campaign.prizePool")}</p> : null}
            </div>
          </div>
        )}
        {tab === "Leaderboard" && (
          <div className="space-y-2">
            {c.topEarners?.map((e) => (
              <div key={e.username} className="flex items-center justify-between p-3 bg-secondary rounded-2xl">
                <div className="flex items-center gap-2">
                  <span>{e.rank === "gold" ? "🥇" : e.rank === "silver" ? "🥈" : "🥉"}</span>
                  <span className="font-bold text-sm">{e.username}</span>
                </div>
                <div className="text-right text-sm">
                  <p className="font-extrabold">{e.points} ★</p>
                  <p className="text-xs text-muted-foreground">{formatViews(e.views)} {t("campaign.views")}</p>
                </div>
              </div>
            )) ?? <p className="text-sm text-muted-foreground text-center py-8">{t("campaign.noData")}</p>}
          </div>
        )}
        {tab === "Analytics" && (
          <div className="bg-secondary rounded-2xl p-4">
            {c.totalViews ? (
              <>
                <p className="text-sm text-muted-foreground">{t("earnings.views")}</p>
                <p className="text-3xl font-extrabold">{formatViews(c.totalViews)}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">{t("campaign.noAnalytics")}</p>
            )}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="relative h-52 rounded-3xl overflow-hidden bg-secondary">
          {c.thumbnailUrl ? <Image src={c.thumbnailUrl} alt={campaignTitle(c, t)} fill className="object-cover" /> : null}
        </div>
        <div className="border border-border rounded-3xl p-5 space-y-3 bg-white">
          <p className="text-3xl font-extrabold">${c.budgetTotal.toLocaleString()} <span className="text-base text-muted-foreground">{t("campaign.budget")}</span></p>
          <BudgetBar spent={c.budgetSpent} total={c.budgetTotal} showLabels />
          <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
            <Badge variant="cpm">{rateLabel(c, t)}</Badge>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.creatorCount}</span>
            {c.approvalRate && <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{c.approvalRate}%</span>}
          </div>
          <div className="pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("campaign.category")}</span><span>{t(`category.${c.category}`)}</span></div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t("campaign.platforms")}</span>
              <span className="flex gap-1">{c.platforms.map((p) => <PlatformIcon key={p} platform={p} size="sm" />)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
