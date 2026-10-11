/** SushiButt site config. Public values only. */
// Dynamic.xyz environment ID. PLACEHOLDER until SushiButt gets its own Dynamic env:
// set NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID in Vercel (and add https://sushibutt.com to that env's CORS origins).
export const DYNAMIC_ENV_ID = (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "").trim()
export const LOGIN_READY = /^[0-9a-f-]{36}$/i.test(DYNAMIC_ENV_ID)
export const SITE_URL = "https://sushibutt.com"

/** Number formatting used everywhere points appear. */
export const fmt = (n: number) => Math.round(n).toLocaleString("en-US")

/** Points (★) are free, for fun, and have no cash value. ALL point values live here. */
export const RULES = {
  onboard: 8000,
  checkin: 1500,
  follow: 2500,
  join: 5000,
  submit: 10000,
  share: 2000,
  link: 2500,
  /** bonus once an admin confirms the bio code (or OAuth later) */
  verify: 7500,
  inviteInviter: 10000,
  inviteInvitee: 5000,
  vote: 500,
  clipApproved: 10000,
  publish: 7500,
  /** daily chest: claim after today's check-in + daily spin */
  dailyChest: 15000,
  /** Whop purchase bonus (placeholder until the webhook exists). POINTS ONLY — never giveaway entries. */
  purchaseBonus: 25000
}

/** Invite ladder: one-time bonuses when your invited friends reach these counts. */
export const INVITE_LADDER = [
  { friends: 1, bonus: 10000 },
  { friends: 3, bonus: 40000 },
  { friends: 10, bonus: 150000 },
  { friends: 25, bonus: 500000 }
]

/** Farming streaks (consecutive daily check-ins). The check-in award is multiplied; each tier pays a one-time bonus. */
export const STREAKS = [
  { days: 3, mult: 1.5, bonus: 10000 },
  { days: 7, mult: 2, bonus: 35000 },
  { days: 30, mult: 3, bonus: 250000 }
]
export const streakMult = (streak: number) => STREAKS.filter((s) => streak >= s.days).reduce((m, s) => Math.max(m, s.mult), 1)

/** Milestone celebrations (confetti) at lifetime points. */
export const MILESTONES = [100000, 500000, 1000000]

/** Welcome Spin: one free spin per new account, picked on the server. Weights sum to 1000. 5K → 1M. */
export const WELCOME_WHEEL = [
  { value: 5000, weight: 350, color: "#f9a8d4" },
  { value: 7500, weight: 250, color: "#fbcfe8" },
  { value: 10000, weight: 180, color: "#f472b6" },
  { value: 15000, weight: 110, color: "#fde68a" },
  { value: 25000, weight: 70, color: "#a7f3d0" },
  { value: 50000, weight: 30, color: "#bae6fd" },
  { value: 100000, weight: 9, color: "#ddd6fe" },
  { value: 1000000, weight: 1, color: "#fca5a5" }
]

/** Daily spin: one free spin per UTC day. Weights sum to 1000. */
export const DAILY_WHEEL = [
  { value: 500, weight: 400, color: "#fce7f3" },
  { value: 1000, weight: 280, color: "#fbcfe8" },
  { value: 2500, weight: 170, color: "#f9a8d4" },
  { value: 5000, weight: 90, color: "#fde68a" },
  { value: 10000, weight: 45, color: "#a7f3d0" },
  { value: 25000, weight: 12, color: "#bae6fd" },
  { value: 100000, weight: 3, color: "#ddd6fe" }
]
export const wheelMean = (w: { value: number; weight: number }[]) => w.reduce((a, s) => a + s.value * s.weight, 0) / w.reduce((a, s) => a + s.weight, 0)

export const FOLLOWS = [
  { id: "x-sushibutt", net: "x", handle: "sushibutt", href: "https://x.com/sushibutt" },
  { id: "x-sushibuttshelbie", net: "x", handle: "sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
  { id: "x-poshgoof", net: "x", handle: "poshgoof", href: "https://x.com/poshgoof" },
  { id: "ig-sushibutt", net: "instagram", handle: "sushibutt", href: "https://www.instagram.com/sushibutt" },
  { id: "tt-sushibutt", net: "tiktok", handle: "sushibutt", href: "https://www.tiktok.com/@sushibutt" }
] as const

/** Account linking slots (self-reported handle now; OAuth verification later). */
export const LINK_SLOTS = ["x", "tiktok", "instagram", "youtube", "twitch", "kick", "spotify", "substack"] as const

/** Whop placeholders: set the plan IDs in Vercel env when paid items go live. */
export const WHOP = {
  supportPack: { label: "Belt Supporter pack (cosmetic)", price: "TBA", planEnv: "WHOP_PLAN_SUPPORTER" },
  boost: { label: "Belt Boost (cosmetic)", price: "TBA", planEnv: "WHOP_PLAN_BOOST" },
  brandListing: { label: "Featured campaign listing", price: "TBA", planEnv: "WHOP_PLAN_LISTING" }
}

/**
 * View-based points for APPROVED clips. Admin enters views/likes/comments/shares (no platform API yet);
 * points recalculate and only the difference is awarded. Capped per clip.
 */
export const VIEW_FORMULA = { perThousandViews: 1000, like: 20, comment: 60, share: 100, capPerClip: 500000 }
export const viewPoints = (v: { views?: number; likes?: number; comments?: number; shares?: number }) =>
  Math.min(VIEW_FORMULA.capPerClip, Math.floor(((v.views || 0) / 1000) * VIEW_FORMULA.perThousandViews + (v.likes || 0) * VIEW_FORMULA.like + (v.comments || 0) * VIEW_FORMULA.comment + (v.shares || 0) * VIEW_FORMULA.share))

/** Sponsor kit (/sponsors). Prices are placeholders — set them here. */
export const SPONSOR_TIERS = [
  { id: "starter", name: "Starter", from: "from $X", perks: ["1 campaign card + full brief", "Promo banner set (4 sizes)", "Follow quest for your accounts", "1 week on the belt"] },
  { id: "featured", name: "Featured", from: "from $X", perks: ["Everything in Starter", "Featured offer on the home page", "3 campaigns (clip · daily · art contest)", "Mystery Box Friday slot", "2 weeks + weekly report"] },
  { id: "headline", name: "Headline", from: "from $X", perks: ["Everything in Featured", "Hero placement + brand filter chip", "Up to 5 campaigns + sound challenge", "Dedicated clipper pool outreach", "Monthly, with performance pool option"] }
]
export const SPONSOR_STATS = [
  { label: "Members", value: "TBA" },
  { label: "Clips submitted", value: "TBA" },
  { label: "Approved-clip views", value: "TBA" },
  { label: "Avg. views / clip", value: "TBA" }
]
