import { Platform } from "@/types"

export type ClipStats = {
  views: number
  likes: number
  comments: number
  shares: number
  avgWatchPct: number
}

export type Clip = ClipStats & {
  id: string
  campaignId: string
  url: string
  platform: Platform
  submittedAt: number
  lastSyncAt: number
  earnedPts: number
}

export type ScoreBreakdown = {
  viewsPts: number
  likePts: number
  commentPts: number
  sharePts: number
  watchPts: number
  raw: number
  er: number
  erMult: number
  platformMult: number
  campaignMult: number
  total: number
}

/** Points per 1K views (linear floor). */
export const VIEW_PER_K = 8
/** Early-traction bonus. 1K views ≈ +84, 10K ≈ +112, 100K ≈ +140. */
export const VIEW_LOG = 28
export const LIKE_W = 0.45
export const COMMENT_W = 1.8
export const SHARE_W = 2.5
export const WATCH_W = 0.004
export const ER_FLOOR = 0.8
export const ER_GAIN = 6
export const ER_CAP = 1.8

export const PLATFORM_MULT: Record<Platform, number> = {
  youtube: 1.25,
  tiktok: 1.15,
  instagram: 1.1,
  twitter: 1,
  facebook: 0.9
}

export const CAMPAIGN_MULT: Record<string, number> = {
  "launch-film": 1.35,
  "official-open": 1.2,
  "daily-belt": 1.1
}

export function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

export function engagementRate(stats: ClipStats) {
  if (stats.views <= 0) return 0
  return (stats.likes + stats.comments + stats.shares) / stats.views
}

export function detectPlatform(url: string): Platform {
  const u = url.toLowerCase()
  if (u.includes("youtu.be") || u.includes("youtube.com")) return "youtube"
  if (u.includes("instagram.com") || u.includes("instagr.am")) return "instagram"
  if (u.includes("tiktok.com")) return "tiktok"
  if (u.includes("facebook.com") || u.includes("fb.watch") || u.includes("fb.com")) return "facebook"
  if (u.includes("x.com") || u.includes("twitter.com")) return "twitter"
  return "tiktok"
}

export function scoreClip(
  stats: ClipStats,
  platform: Platform,
  campaignId: string
): ScoreBreakdown {
  const views = Math.max(0, stats.views)
  const likes = Math.max(0, stats.likes)
  const comments = Math.max(0, stats.comments)
  const shares = Math.max(0, stats.shares)
  const watch = clamp(stats.avgWatchPct, 0, 100)

  const viewsPts = VIEW_PER_K * (views / 1000) + VIEW_LOG * Math.log10(1 + views)
  const likePts = likes * LIKE_W
  const commentPts = comments * COMMENT_W
  const sharePts = shares * SHARE_W
  const watchPts = views * (watch / 100) * WATCH_W
  const raw = viewsPts + likePts + commentPts + sharePts + watchPts
  const er = views > 0 ? (likes + comments + shares) / views : 0
  const erMult = clamp(ER_FLOOR + ER_GAIN * er, ER_FLOOR, ER_CAP)
  const platformMult = PLATFORM_MULT[platform] ?? 1
  const campaignMult = CAMPAIGN_MULT[campaignId] ?? 1
  const total = Math.floor(raw * erMult * platformMult * campaignMult)

  return {
    viewsPts,
    likePts,
    commentPts,
    sharePts,
    watchPts,
    raw,
    er,
    erMult,
    platformMult,
    campaignMult,
    total
  }
}

function hash32(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Stand-in for live TikTok / Reels / Shorts / X stats until APIs land.
 * Deterministic per URL. Counts only go up with age.
 */
export function estimateStats(url: string, submittedAt: number, now = Date.now()): ClipStats {
  const ageH = Math.max(0, (now - submittedAt) / 3_600_000)
  const h = hash32(url)
  const viral = 0.5 + (h % 1200) / 1000
  const seed = 35 + (h % 220)
  const views = seed + Math.floor(viral * 220 * Math.log1p(ageH * 3.2) * (1 + 0.4 * Math.tanh(ageH / 16)))
  const er = 0.028 + (h % 90) / 1000
  return {
    views,
    likes: Math.floor(views * er * 0.7),
    comments: Math.floor(views * er * 0.13),
    shares: Math.floor(views * er * 0.17),
    avgWatchPct: 18 + (h % 27)
  }
}

export function mergeStats(current: ClipStats, incoming: ClipStats): ClipStats {
  return {
    views: Math.max(current.views, Math.floor(incoming.views)),
    likes: Math.max(current.likes, Math.floor(incoming.likes)),
    comments: Math.max(current.comments, Math.floor(incoming.comments)),
    shares: Math.max(current.shares, Math.floor(incoming.shares)),
    avgWatchPct: Math.max(current.avgWatchPct, incoming.avgWatchPct)
  }
}

export function applyStats(clip: Clip, incoming: ClipStats, now = Date.now()) {
  const stats = mergeStats(clip, incoming)
  const scored = scoreClip(stats, clip.platform, clip.campaignId)
  const earnedPts = Math.max(clip.earnedPts, scored.total)
  return {
    clip: { ...clip, ...stats, earnedPts, lastSyncAt: now },
    delta: earnedPts - clip.earnedPts,
    scored
  }
}

export function clipTotals(clips: Clip[]) {
  return clips.reduce(
    (acc, c) => {
      acc.views += c.views
      acc.likes += c.likes
      acc.comments += c.comments
      acc.shares += c.shares
      acc.pts += c.earnedPts
      return acc
    },
    { views: 0, likes: 0, comments: 0, shares: 0, pts: 0 }
  )
}
