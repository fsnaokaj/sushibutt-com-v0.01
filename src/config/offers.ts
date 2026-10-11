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
  /** clipping campaigns for this brand live in src/config/campaigns.ts */
}

export const OFFERS: Offer[] = [
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
    title: "Launch weekend · 8 lockers",
    price: "$35–$350",
    blurb: "Eight wine lockers from Patio Rosé to Prestige Cuvée, plus gift cards with an average +35% bonus.",
    bullets: ["Patio Rosé $35", "Weeknight Bubbles $53", "Napa Cab Lane $88", "Prestige Cuvée $350", "Gift cards avg +35% bonus"],
    url: "https://winedetention.com/",
    art: "/offers/wd-hero.png",
    badge: "Launch weekend",
    ageGate: "21+"
  },
  {
    id: "puckgold-og",
    brand: "PuckGold",
    title: "$36 OG Gold Puck",
    price: "$36",
    blurb: "OG Limited Edition gold puck plus a 1-year Premium League Pass. Founding offer.",
    bullets: ["OG Limited Edition gold puck", "1-year Premium League Pass", "Founding member badge"],
    url: "https://puckgold.com/join.html",
    art: "/offers/pg-puck.jpg",
    badge: "Founding offer"
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
