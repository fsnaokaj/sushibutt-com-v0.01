/**
 * Featured offers — the ONE place to edit partner offers and their clipping campaigns.
 * Prices are copied from each brand's own site; keep this honest when they change.
 * Links get ?ref=<handle> added automatically for signed-in members.
 */
export type Offer = {
  id: string
  brand: string
  title: string
  price: string
  blurb: string
  bullets: string[]
  url: string
  art: string
  badge?: string
  ageGate?: string
  alt?: { label: string; url: string }
  /** clipping campaigns for this brand live in src/config/campaigns.ts */
}

export const OFFERS: Offer[] = [
  {
    id: "puckgold-og",
    brand: "PuckGold",
    title: "$36 OG Gold Puck + 1-Year Pass",
    price: "$36 one payment",
    blurb: "OG Limited Edition gold puck plus a 1-Year Premium League Pass. Founding offer, limited time.",
    bullets: ["OG Limited Edition gold puck", "1-Year Premium League Pass", "Buy on Whop or puckgold.com"],
    url: "https://whop.com/puckgold/og-gold-puck/",
    alt: { label: "puckgold.com/join.html", url: "https://puckgold.com/join.html" },
    art: "/promo-src/pg-puck-sticker.png",
    badge: "Top offer"
  },
  {
    id: "puckgold-premium",
    brand: "PuckGold",
    title: "Premium League Pass",
    price: "$12.99 / month",
    blurb: "PuckGold Premium League Pass: Fan Zone boosts, early drops and more. Cancel anytime.",
    bullets: ["Premium League Pass (digital)", "Fan Zone boosts", "Cancel anytime"],
    url: "https://puckgold.com/join.html",
    art: "/promo-src/pg-logo-stacked.png",
    badge: "Membership"
  },
  {
    id: "poshgoof",
    brand: "PoshGoof",
    title: "Horoscopes & exclusive drops",
    price: "Free to follow",
    blurb: "Shelbie's fashion, fragrance and astrology brand. Signals before the noise.",
    bullets: ["Daily horoscopes", "Exclusive fashion & fragrance drops", "TikTok @poshgoof"],
    url: "https://poshgoof.com/",
    art: "/promo/offer-poshgoof/card.png",
    badge: "Founder brand"
  },
  {
    id: "wine-detention",
    brand: "Wine Detention",
    title: "OG VIP Mystery Drops",
    price: "from $350",
    blurb: "VIP early access for the bad boys and bad girls in detention. Sealed mystery drops for the whitelist and OGs, revealed after checkout.",
    bullets: ["Founding Members: OG VIP Mystery Drop $350 · most popular", "Let's Pop: Champagne After Hours Special $888", "The Private Reserve: Bougie Luxury Stash $1,750", "OG Flash Deal: All Three $2,738", "Gift cards $175 · $350 · $500 · $1,000"],
    url: "https://winedetention.com/vip",
    alt: { label: "Gift cards", url: "https://winedetention.com/#/gifts" },
    art: "/promo-src/wd-vip-drops.png",
    badge: "VIP EARLY ACCESS",
    ageGate: "21+"
  },
  {
    id: "puckgold-giveaway",
    brand: "PuckGold",
    title: "Fan Zone giveaway",
    price: "Free to enter",
    blurb: "Create a free PuckGold account, earn entries with quests, follows and invites. No purchase necessary; see official rules.",
    bullets: ["Free entry", "Extra entries for quests & invites", "Official rules on puckgold.com"],
    url: "https://puckgold.com/fan-zone.html#giveaway",
    art: "/offers/pg-lockup.png",
    badge: "Giveaway"
  },
  {
    id: "fartnatics",
    brand: "Fartnatics",
    title: "Join Fartnatics + giveaway",
    price: "Free",
    blurb: "Claim your @handle, take the free Welcome Spin and enter the Fartnatics giveaway.",
    bullets: ["Free account & Welcome Spin", "Giveaway at fartnatics.com/giveaway", "FC points have no cash value"],
    url: "https://fartnatics.com/giveaway",
    art: "/offers/fartnatics.png",
    badge: "Giveaway"
  }
]

export function offerLink(url: string, handle?: string | null) {
  if (!handle) return url
  const u = new URL(url)
  u.searchParams.set("ref", handle)
  return u.toString()
}
