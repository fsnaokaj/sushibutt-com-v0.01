"use client"

import { useState, useEffect } from "react"
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
import { campaignTitle, isActiveOpen, openStatus, rateLabel, statusTone } from "@/utils/campaign"
import { CampaignBrief } from "@/components/campaigns/CampaignBrief"
import { EasyQuests } from "@/components/campaigns/EasyQuests"
import { PayBanner } from "@/components/ui/PayBanner"
import { beltTag, gemForRank } from "@/data/leaderboard"
import { briefs } from "@/data/briefs"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function CampaignBody({ c }: { c: Campaign }) {
  const { t } = useI18n()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const joinCampaign = useAppStore((s) => s.joinCampaign)
  const submitClip = useAppStore((s) => s.submitClip)
  const refreshClips = useAppStore((s) => s.refreshClips)
  const clips = useAppStore((s) => s.clips)
  const [tab, setTab] = useState<"Overview" | "Leaderboard" | "Analytics">("Overview")
  const [url, setUrl] = useState("")
  const joined = user?.joinedIds.includes(c.id)
  const mine = clips.filter((clip) => clip.campaignId === c.id)
  const needsUrl = c.id !== "follow-quest"
  const status = openStatus(c)
  const canJoin = isActiveOpen(c)
  const joinLabel = joined
    ? t("campaign.joined")
    : status === "registering"
      ? t("campaign.register")
      : status === "upcoming"
        ? t("campaign.comingOpen")
        : status === "ended"
          ? t("campaign.closed")
          : t("campaign.join")

  useEffect(() => {
    refreshClips()
  }, [refreshClips])

  const onJoin = () => {
    if (!user) {
      router.push("/join")
      return
    }
    joinCampaign(c.id)
  }

  const onSubmit = () => {
    if (!needsUrl) return
    submitClip(c.id, url)
    setUrl("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">🍣 {c.agency} ★</div>
        <h1 className="text-2xl font-extrabold">{campaignTitle(c, t)}</h1>
        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide", statusTone(status))}>
          {t(`filters.${status}`)}
        </span>
        {briefs[c.id]?.mission && (
          <p className="text-sm text-muted-foreground">{briefs[c.id].mission}</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={onJoin}
            disabled={!joined && !canJoin}
            className="flex-1 py-3 bg-primary text-white rounded-full font-extrabold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {joinLabel}
          </button>
        </div>
        {joined && needsUrl && (
          <div className="space-y-2">
            {mine.map((clip) => (
              <div key={clip.id} className="rounded-2xl border p-3 bg-white text-sm space-y-1">
                <a href={clip.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary break-all">{clip.url}</a>
                <p className="font-extrabold text-primary">{clip.earnedPts} ★ · {formatViews(clip.views)} {t("score.views").toLowerCase()}</p>
                <p className="text-xs text-muted-foreground">
                  {t("score.clipMeta", { likes: clip.likes, comments: clip.comments, shares: clip.shares, watch: clip.avgWatchPct })}
                </p>
              </div>
            ))}
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t("campaign.pasteUrl")}
              className="w-full px-3 py-2 border rounded-xl bg-white text-sm"
            />
            <button
              onClick={onSubmit}
              className="w-full py-3 border border-border rounded-full text-sm font-bold"
            >
              {t("campaign.submit")}
            </button>
            {mine.length > 0 && <p className="text-xs text-muted-foreground">{t("score.more")}</p>}
            {url && !/^https?:\/\//i.test(url.trim()) && (
              <p className="text-xs text-muted-foreground">{t("campaign.needUrl")}</p>
            )}
            {mine.length > 0 && (
              <button type="button" onClick={refreshClips} className="text-xs font-bold text-primary">{t("score.sync")}</button>
            )}
          </div>
        )}
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
          <div className="space-y-4">
            <CampaignBrief id={c.id} />
            {c.id === "follow-quest" || c.id === "daily-belt" ? <EasyQuests compact /> : null}
            <div>
              <h3 className="font-extrabold mb-2 text-sm">{t("campaign.earnings")}</h3>
              <Badge variant="cpm">{rateLabel(c, t)}</Badge>
              <div className="mt-2"><PayBanner compact /></div>
              <p className="text-xs text-muted-foreground mt-2">
                {t("score.clip")}{" "}
                <Link href="/prizes" className="text-primary font-bold">{t("score.title")}</Link>
              </p>
            </div>
          </div>
        )}
        {tab === "Leaderboard" && (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((rank) => {
              const gem = gemForRank(rank)
              return (
                <div key={rank} className="flex items-center justify-between p-3 bg-secondary rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span>{rank === 1 ? "👑" : gem.emoji}</span>
                    <span className="font-mono text-sm">{beltTag(`${c.id}-${rank}`)}</span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-extrabold">{Math.max(40, 420 - rank * 37)} ★</p>
                    <p className="text-xs text-muted-foreground">{rank === 1 ? t("board.champion") : gem.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {tab === "Analytics" && (
          <div className="space-y-3">
            {mine.length === 0 ? (
              <div className="bg-secondary rounded-2xl p-4">
                <p className="text-sm text-muted-foreground text-center py-8">{t("campaign.noAnalytics")}</p>
              </div>
            ) : (
              mine.map((clip) => (
                <div key={clip.id} className="bg-secondary rounded-2xl p-4 space-y-1">
                  <p className="text-3xl font-extrabold">{formatViews(clip.views)}</p>
                  <p className="text-sm text-muted-foreground">{t("earnings.views")}</p>
                  <p className="text-sm font-extrabold text-primary">{clip.earnedPts} ★</p>
                  <p className="text-xs text-muted-foreground">
                    {clip.likes} / {clip.comments} / {clip.shares} · {clip.avgWatchPct}%
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="relative h-52 rounded-3xl overflow-hidden bg-secondary">
          {c.thumbnailUrl ? <Image src={c.thumbnailUrl} alt={campaignTitle(c, t)} fill className="object-cover" /> : null}
        </div>
        <div className="border border-border rounded-3xl p-5 space-y-3 bg-white">
          <p className="text-xl font-extrabold">{t("pay.pointsNow")}</p>
          {c.budgetTotal > 0 ? <BudgetBar spent={c.budgetSpent} total={c.budgetTotal} showLabels /> : null}
          <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
            <Badge variant="cpm">{rateLabel(c, t)}</Badge>
            {c.creatorCount > 0 && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.creatorCount}</span>}
            {c.approvalRate && <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{c.approvalRate}%</span>}
          </div>
          <div className="pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("campaign.status")}</span><span>{t(`filters.${status}`)}</span></div>
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
