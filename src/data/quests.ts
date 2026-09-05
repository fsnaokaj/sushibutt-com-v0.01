export const POINTS = {
  onboard: 80,
  role: 10,
  goal: 5,
  join: 50,
  submit: 100,
  resubmit: 25,
  publish: 75,
  follow: 25,
  share: 20,
  checkin: 15
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
