import { RULES } from "@/config/site"

/** Mirrors src/config/site.ts (edit values there). */
export const POINTS = {
  onboard: RULES.onboard,
  role: 1000,
  goal: 500,
  join: RULES.join,
  submit: RULES.submit,
  resubmit: 2500,
  publish: RULES.publish,
  follow: RULES.follow,
  share: RULES.share,
  checkin: RULES.checkin
} as const

export type QuestNet = "x" | "instagram" | "tiktok"

export type FollowQuest = {
  id: string
  handle: string
  pts: number
  href: string
  network: QuestNet
}

export const FOLLOW_QUESTS: FollowQuest[] = [
  { id: "x-sushibutt", handle: "sushibutt", pts: POINTS.follow, href: "https://x.com/sushibutt", network: "x" },
  { id: "x-sushibuttshelbie", handle: "sushibuttshelbie", pts: POINTS.follow, href: "https://x.com/sushibuttshelbie", network: "x" },
  { id: "x-poshgoof", handle: "poshgoof", pts: POINTS.follow, href: "https://x.com/poshgoof", network: "x" },
  { id: "ig-sushibutt", handle: "sushibutt", pts: POINTS.follow, href: "https://www.instagram.com/sushibutt", network: "instagram" },
  { id: "tt-sushibutt", handle: "sushibutt", pts: POINTS.follow, href: "https://www.tiktok.com/@sushibutt", network: "tiktok" }
]

export const SHARE_QUEST = {
  id: "share-belt",
  pts: POINTS.share,
  href: "https://x.com/intent/tweet?text=On%20the%20SushiButt%20belt.%20%40sushibutt%20%40sushibuttshelbie%20%40poshgoof&url=https%3A%2F%2Fsushibutt.com"
}
