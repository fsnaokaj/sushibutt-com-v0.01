/** SushiButt site config. Public values only. */
// Dynamic.xyz environment ID. PLACEHOLDER until SushiButt gets its own Dynamic env:
// set NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID in Vercel (and add https://sushibutt.com to that env's CORS origins).
export const DYNAMIC_ENV_ID = (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "").trim()
export const LOGIN_READY = /^[0-9a-f-]{36}$/i.test(DYNAMIC_ENV_ID)
export const SITE_URL = "https://sushibutt.com"

/** Points (★) are free, for fun, and have no cash value. */
export const RULES = {
  checkin: 15,
  follow: 25,
  share: 20,
  link: 50,
  inviteInviter: 100,
  inviteInvitee: 50,
  clipApproved: 100
}

/** Welcome Spin: one free spin per new account, picked on the server. Weights sum to 1000. */
export const WELCOME_WHEEL = [
  { value: 50, weight: 350, color: "#f9a8d4" },
  { value: 75, weight: 250, color: "#fbcfe8" },
  { value: 100, weight: 180, color: "#f472b6" },
  { value: 150, weight: 110, color: "#fde68a" },
  { value: 250, weight: 70, color: "#a7f3d0" },
  { value: 500, weight: 30, color: "#bae6fd" },
  { value: 1000, weight: 9, color: "#ddd6fe" },
  { value: 5000, weight: 1, color: "#fca5a5" }
]

export const FOLLOWS = [
  { id: "x-sushibutt", net: "x", handle: "sushibutt", href: "https://x.com/sushibutt" },
  { id: "x-sushibuttshelbie", net: "x", handle: "sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
  { id: "x-poshgoof", net: "x", handle: "poshgoof", href: "https://x.com/poshgoof" },
  { id: "ig-sushibutt", net: "instagram", handle: "sushibutt", href: "https://www.instagram.com/sushibutt" },
  { id: "tt-sushibutt", net: "tiktok", handle: "sushibutt", href: "https://www.tiktok.com/@sushibutt" }
] as const

/** Account linking slots (self-reported handle now; OAuth verification later). */
export const LINK_SLOTS = ["x", "tiktok", "instagram", "youtube", "twitch", "kick"] as const

/** Whop placeholders: set the plan IDs in Vercel env when paid items go live. */
export const WHOP = {
  boost: { label: "Belt Boost (cosmetic)", price: "TBA", planEnv: "WHOP_PLAN_BOOST" },
  brandListing: { label: "Featured campaign listing", price: "TBA", planEnv: "WHOP_PLAN_LISTING" }
}
