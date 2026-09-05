"use client"

import { useState } from "react"
import { Clip, engagementRate } from "@/data/scoring"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { formatViews } from "@/utils"
import { PlatformIcon } from "@/components/ui/PlatformIcon"

export function ClipScoreCard({ clip, campaignTitle }: { clip: Clip; campaignTitle: string }) {
  const { t } = useI18n()
  const reportClipStats = useAppStore((s) => s.reportClipStats)
  const [open, setOpen] = useState(false)
  const [views, setViews] = useState(String(clip.views))
  const [likes, setLikes] = useState(String(clip.likes))
  const [comments, setComments] = useState(String(clip.comments))
  const [shares, setShares] = useState(String(clip.shares))
  const [watch, setWatch] = useState(String(clip.avgWatchPct))
  const er = engagementRate(clip)

  const apply = () => {
    reportClipStats(clip.id, {
      views: Number(views) || 0,
      likes: Number(likes) || 0,
      comments: Number(comments) || 0,
      shares: Number(shares) || 0,
      avgWatchPct: Number(watch) || 0
    })
    setOpen(false)
  }

  return (
    <div className="border-t p-4 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-extrabold text-sm">{campaignTitle}</p>
          <a href={clip.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold break-all">{clip.url}</a>
        </div>
        <PlatformIcon platform={clip.platform} size="sm" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <Stat label={t("score.views")} value={formatViews(clip.views)} />
        <Stat label={t("score.er")} value={`${(er * 100).toFixed(1)}%`} />
        <Stat label={t("earnings.engagement")} value={`${clip.likes + clip.comments + clip.shares}`} />
        <Stat label={t("score.clipPts")} value={`${clip.earnedPts} ★`} />
      </div>
      <p className="text-xs text-muted-foreground">
        {t("score.clipMeta", { likes: clip.likes, comments: clip.comments, shares: clip.shares, watch: clip.avgWatchPct })}
      </p>
      <button type="button" onClick={() => setOpen((v) => !v)} className="text-xs font-bold text-primary">
        {t("score.report")}
      </button>
      {open ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <Num label={t("score.views")} value={views} onChange={setViews} />
          <Num label={t("score.likes")} value={likes} onChange={setLikes} />
          <Num label={t("score.comments")} value={comments} onChange={setComments} />
          <Num label={t("score.shares")} value={shares} onChange={setShares} />
          <Num label={t("score.watch")} value={watch} onChange={setWatch} />
          <button type="button" onClick={apply} className="col-span-2 sm:col-span-5 py-2 bg-primary text-white rounded-full text-xs font-extrabold">
            {t("score.apply")}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-extrabold">{value}</p>
    </div>
  )
}

function Num({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="text-[10px] uppercase tracking-wide text-muted-foreground">
      {label}
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-2 py-1.5 border rounded-lg bg-white text-sm font-bold"
      />
    </label>
  )
}
