/**
 * Brand campaigns — the ONE file to edit campaigns for SushiButt, Wine Detention, PuckGold and Fartnatics.
 * Each entry becomes a campaign card, a full campaign page (brief, steps, Do/Don't) and a promo-banner set
 * (run `node scripts/banners.mjs` after editing). Points (★) are free and have no cash value.
 * Honor system: follows and links are self-reported until verification is live.
 */
import type { Campaign } from "@/types"
import type { CampaignBrief } from "@/data/briefs"

export type BrandId = "SushiButt" | "PoshGoof" | "Wine Detention" | "PuckGold" | "Fartnatics"
type Social = { net: "x" | "instagram" | "tiktok" | "youtube"; handle: string; href: string }

export const BRANDS: Record<BrandId, { url: string; site: string; tag: string; hashtag: string; socials: Social[]; ageGate?: string }> = {
  SushiButt: {
    url: "https://sushibutt.com", site: "sushibutt.com", tag: "@sushibutt", hashtag: "#SushiButt",
    socials: [
      { net: "x", handle: "sushibutt", href: "https://x.com/sushibutt" },
      { net: "x", handle: "sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
      { net: "x", handle: "poshgoof", href: "https://x.com/poshgoof" },
      { net: "instagram", handle: "sushibutt", href: "https://www.instagram.com/sushibutt" },
      { net: "tiktok", handle: "sushibutt", href: "https://www.tiktok.com/@sushibutt" }
    ]
  },
  PoshGoof: {
    url: "https://poshgoof.com", site: "poshgoof.com", tag: "@poshgoof", hashtag: "#PoshGoof",
    socials: [
      { net: "x", handle: "poshgoof", href: "https://x.com/poshgoof" },
      { net: "tiktok", handle: "poshgoof", href: "https://www.tiktok.com/@poshgoof" }
    ]
  },
  "Wine Detention": {
    url: "https://winedetention.com", site: "winedetention.com", tag: "@winedetention", hashtag: "#WineDetention", ageGate: "21+",
    socials: [
      { net: "x", handle: "winedetention", href: "https://x.com/winedetention" },
      { net: "instagram", handle: "winedetention", href: "https://www.instagram.com/winedetention" },
      { net: "tiktok", handle: "winedetention", href: "https://www.tiktok.com/@winedetention" }
    ]
  },
  PuckGold: {
    url: "https://puckgold.com", site: "puckgold.com", tag: "@puckgoldbiz", hashtag: "#PuckGold",
    socials: [
      { net: "x", handle: "puckgoldbiz", href: "https://x.com/puckgoldbiz" },
      { net: "instagram", handle: "puckgoldbiz", href: "https://www.instagram.com/puckgoldbiz" },
      { net: "tiktok", handle: "puckgoldbiz", href: "https://www.tiktok.com/@puckgoldbiz" }
    ]
  },
  Fartnatics: {
    url: "https://fartnatics.com", site: "fartnatics.com", tag: "@fartnatics", hashtag: "#Fartnatics",
    socials: [
      { net: "x", handle: "fartnatics", href: "https://x.com/fartnatics" },
      { net: "instagram", handle: "fartnatics", href: "https://www.instagram.com/fartnatics" },
      { net: "tiktok", handle: "fartnatics", href: "https://www.tiktok.com/@fartnatics" }
    ]
  }
}

export type BrandCampaign = {
  id: string
  brand: BrandId
  kind: "follow" | "daily" | "launch" | "art" | "remix"
  title: string
  status: "live" | "registering" | "upcoming" | "ended"
  category: Campaign["category"]
  platforms: Campaign["platforms"]
  /** points for an approved clip / winning-art bonus */
  points: number
  mission: string
  who: string
  length: string
  hashtag: string
  sources: { label: string; href: string }[]
  hook?: string
  extraDos?: string[]
  extraDonts?: string[]
  endsAt?: string
  /** headline for banners */
  kicker: string
}

const PO = BRANDS.PoshGoof.socials,
  SHELBIE_TT = { label: "TikTok · @sushibuttshelbie", href: "https://www.tiktok.com/@sushibuttshelbie" },
  POSH_TT = { label: "TikTok · @poshgoof", href: "https://www.tiktok.com/@poshgoof" }
const SB = BRANDS.SushiButt.socials, WD = BRANDS["Wine Detention"].socials, PG = BRANDS.PuckGold.socials, FN = BRANDS.Fartnatics.socials
const src = (s: Social[]) => s.map((x) => ({ label: `${x.net === "x" ? "X" : x.net === "instagram" ? "Instagram" : "TikTok"} · @${x.handle}`, href: x.href }))
/** Only brand, launch, fashion, fragrance, astrology and podcast content from Shelbie is approved source footage. */
const SHELBIE_SAFE = "Only use Shelbie's brand, launch, fashion, fragrance, astrology or podcast posts. Skip older drama, politics or gambling-themed posts."

export const BRAND_CAMPAIGNS: BrandCampaign[] = [
  // ---------- SushiButt (plus the 4 original opens in src/data/campaigns.ts) ----------
  {
    id: "sb-fanart", brand: "SushiButt", kind: "art", title: "SushiButt Fan-Art Cup", status: "live", category: "Meme",
    platforms: ["instagram", "twitter", "tiktok"], points: 500, kicker: "DRAW THE BELT",
    who: "Artists, meme makers, anyone with a stylus or a phone", length: "One image (or a 7–15s animation)", hashtag: "#SushiButtArt",
    mission: "Draw, paint or meme the SushiButt belt: nigiri, camels, igloo, volcano, pink everything. Top entries by fan votes plus an admin pick win bonus points and prizes.",
    sources: src(SB), endsAt: "2026-10-25T23:59:00-07:00",
    extraDos: ["Original work only.", "Pink + sushi + belt somewhere in the frame."], extraDonts: ["No AI-traced copies of other artists.", "No NSFW."]
  },
  {
    id: "sb-podcast", brand: "SushiButt", kind: "launch", title: "Clip the podcast", status: "live", category: "Entertainment",
    platforms: ["tiktok", "instagram", "youtube"], points: 120, kicker: "CLIP SHELBIE'S PODCAST",
    who: "Podcast clippers and talking-head editors", length: "15–45 seconds", hashtag: "#ChicksClips",
    mission: "Clip Shelbie's podcast (formerly Chicks Clips TV, now on @sushibuttshelbie). Pull the best 15–45 second moments from the episodes and the PoshGoof launch.",
    sources: [
      { label: "TikTok · Chicks Clips Episode 1 (pinned)", href: "https://www.tiktok.com/@sushibuttshelbie/video/7529247149184322829" },
      { label: "TikTok · Launching PoshGoof", href: "https://www.tiktok.com/@sushibuttshelbie/video/7593640127046389047" },
      { label: "TikTok · @sushibuttshelbie clip", href: "https://www.tiktok.com/@sushibuttshelbie/video/7592892206403292471" },
      SHELBIE_TT
    ],
    hook: "Open on her strongest line, captions on, face in frame.",
    extraDos: ["Credit @sushibuttshelbie on screen.", "Keep her words in context."],
    extraDonts: [SHELBIE_SAFE, "Don't cut lines to change their meaning."]
  },
  // ---------- PoshGoof (Shelbie's fashion · fragrance · astrology brand) ----------
  {
    id: "po-follow", brand: "PoshGoof", kind: "follow", title: "Follow @poshgoof", status: "live", category: "Lifestyle",
    platforms: ["tiktok", "twitter"], points: 25, kicker: "SIGNALS BEFORE THE NOISE",
    who: "Everyone", length: "—", hashtag: "#PoshGoof",
    mission: "Follow PoshGoof on TikTok and X for horoscopes and exclusive drops. One claim per follow.", sources: [POSH_TT, ...src(PO).filter((x) => !x.href.includes("tiktok"))]
  },
  {
    id: "po-drops", brand: "PoshGoof", kind: "launch", title: "Clip PoshGoof drops", status: "live", category: "Lifestyle",
    platforms: ["tiktok", "instagram", "youtube"], points: 120, kicker: "EXCLUSIVE DROPS",
    who: "Fashion and beauty clippers", length: "8–25 seconds", hashtag: "#PoshGoofDrop",
    mission: "Clip PoshGoof's fashion and fragrance drops and the PoshGoof launch. Send people to poshgoof.com.",
    sources: [{ label: "poshgoof.com", href: "https://poshgoof.com/" }, POSH_TT, { label: "TikTok · Launching PoshGoof", href: "https://www.tiktok.com/@sushibuttshelbie/video/7593640127046389047" }],
    hook: "The product reveal first, then “signals before the noise.”",
    extraDonts: [SHELBIE_SAFE, "No invented prices or ingredients."]
  },
  {
    id: "po-horoscope", brand: "PoshGoof", kind: "daily", title: "Daily horoscope clip", status: "live", category: "Lifestyle",
    platforms: ["tiktok", "instagram"], points: 60, kicker: "DAILY HOROSCOPE",
    who: "Astrology clippers and caption editors", length: "7–15 seconds", hashtag: "#PoshGoofHoroscope",
    mission: "One short a day from PoshGoof's horoscopes: pick a sign, caption it, loop it.",
    sources: [POSH_TT, { label: "poshgoof.com", href: "https://poshgoof.com/" }],
    hook: "Start with the sign name and one line.", extraDonts: ["Don't present astrology as medical, legal or financial advice."]
  },
  {
    id: "po-art", brand: "PoshGoof", kind: "art", title: "PoshGoof fragrance & fashion fan-art contest", status: "live", category: "Lifestyle",
    platforms: ["instagram", "tiktok", "twitter"], points: 400, kicker: "FAN-ART CONTEST",
    who: "Illustrators, stylists, mood-boarders", length: "One image or moodboard", hashtag: "#PoshGoofArt",
    mission: "Make fan art, a moodboard or a bottle concept inspired by PoshGoof fashion, fragrance and astrology. Fan votes plus an admin pick.",
    sources: [POSH_TT, { label: "poshgoof.com", href: "https://poshgoof.com/" }], endsAt: "2026-10-30T23:59:00-07:00"
  },
  {
    id: "po-sweet", brand: "PoshGoof", kind: "art", title: "Sweet scent contest", status: "live", category: "Lifestyle",
    platforms: ["tiktok", "instagram", "twitter"], points: 400, kicker: "SWEET SCENT · ART OR CLIP",
    who: "Fragrance lovers, illustrators and clippers", length: "One image, or a 7–15s clip", hashtag: "#PoshGoofSweetScent",
    mission: "Make fan art or a short clip about a sweet fragrance mood — think the Fragrance by Sabrina sweet collection (Lemon Pie, Me Espresso, Cherry Baby, Caramel Dream, Sweet Tooth) — styled the PoshGoof way. Fan votes plus an admin pick. Prizes are tied to the Fartnatics giveaway (fartnatics.com/giveaway; free to enter, see its official rules). Not sponsored or endorsed by Fragrance by Sabrina.",
    sources: [POSH_TT, { label: "poshgoof.com", href: "https://poshgoof.com/" }, { label: "fragrancebysabrina.com (scent names only)", href: "https://fragrancebysabrina.com/" }, { label: "Fartnatics giveaway (prizes)", href: "https://fartnatics.com/giveaway" }],
    endsAt: "2026-11-01T23:59:00-07:00",
    extraDos: ["Text and your own art only — name the scents in words."],
    extraDonts: ["No Fragrance by Sabrina logos, product photos, or anyone's likeness.", "Don't imply Fragrance by Sabrina sponsors or endorses this.", SHELBIE_SAFE]
  },
  // ---------- Wine Detention ----------
  {
    id: "wd-follow", brand: "Wine Detention", kind: "follow", title: "Follow Wine Detention", status: "live", category: "Lifestyle",
    platforms: ["twitter", "instagram", "tiktok"], points: 25, kicker: "FOLLOW · 21+",
    who: "Everyone 21+", length: "—", hashtag: "#WineDetention",
    mission: "Follow Wine Detention on X, Instagram and TikTok. One claim per follow. 21+ only.", sources: src(WD)
  },
  {
    id: "wd-launch", brand: "Wine Detention", kind: "launch", title: "Clip the Wine Detention launch", status: "live", category: "Lifestyle",
    platforms: ["tiktok", "instagram", "youtube"], points: 150, kicker: "LAUNCH WEEKEND",
    who: "Clippers and editors with a 21+ audience", length: "8–25 seconds", hashtag: "#WineDetentionLaunch",
    mission: "Clip the Wine Detention launch weekend: eight lockers from Patio Rosé ($35) to Prestige Cuvée ($350), plus gift cards averaging a +35% bonus. Send people to winedetention.com.",
    sources: [{ label: "winedetention.com · lockers", href: "https://winedetention.com/" }, ...src(WD)],
    hook: "“$35 for a whole locker of rosé?” — price first, then the locker.",
    extraDos: ["Put “21+” on screen and in the caption.", "Use the real prices from the site."],
    extraDonts: ["No minors, no drinking-and-driving, no ‘get wasted’ messaging.", "No invented discounts or health claims."]
  },
  {
    id: "wd-label", brand: "Wine Detention", kind: "art", title: "Design a Wine Detention locker label", status: "live", category: "Lifestyle",
    platforms: ["instagram", "twitter"], points: 400, kicker: "LABEL ART CUP · 21+",
    who: "Designers and illustrators, 21+", length: "One image, label or poster", hashtag: "#WineDetentionArt",
    mission: "Design a label or poster for one of the eight Wine Detention lockers (Weeknight Bubbles, Patio Rosé, Napa Cab Lane, Prestige Cuvée…). Fan votes plus an admin pick choose the winners.",
    sources: [{ label: "winedetention.com", href: "https://winedetention.com/" }, ...src(WD)], endsAt: "2026-10-31T23:59:00-07:00",
    extraDonts: ["No imagery aimed at minors.", "Don't copy real wine labels."]
  },
  {
    id: "wd-remix", brand: "Wine Detention", kind: "remix", title: "Wine Detention pour-sound remix", status: "upcoming", category: "Music",
    platforms: ["tiktok", "instagram"], points: 120, kicker: "SOUND CHALLENGE · 21+",
    who: "Producers, editors and remixers, 21+", length: "7–15 seconds", hashtag: "#DetentionPour",
    mission: "Remix a cork-pop and pour into a beat drop, then cut it over Wine Detention locker art. Opens after launch weekend.",
    sources: [{ label: "winedetention.com", href: "https://winedetention.com/" }, ...src(WD)],
    extraDonts: ["No copyrighted songs you don't have rights to."]
  },
  // ---------- PuckGold ----------
  {
    id: "pg-follow", brand: "PuckGold", kind: "follow", title: "Follow PuckGold", status: "live", category: "Sports",
    platforms: ["twitter", "instagram", "tiktok"], points: 25, kicker: "FOLLOW THE LEAGUE",
    who: "Hockey fans, everyone", length: "—", hashtag: "#PuckGold",
    mission: "Follow @puckgoldbiz on X, Instagram and TikTok. One claim per follow.", sources: src(PG)
  },
  {
    id: "pg-daily", brand: "PuckGold", kind: "daily", title: "PuckGold Daily Clip", status: "live", category: "Sports",
    platforms: ["tiktok", "youtube", "twitter"], points: 60, kicker: "ONE HOCKEY CLIP A DAY",
    who: "Hockey clippers, NHL streamers and TikTok hockey accounts", length: "7–15 seconds", hashtag: "#PuckGoldDaily",
    mission: "One short a day from PuckGold: arena flythroughs, Golden Final moments, Pucky 13. Same-day post keeps the league warm.",
    sources: [{ label: "puckgold.com · Stadiums", href: "https://puckgold.com/stadiums.html" }, ...src(PG)],
    hook: "Open on the arena reveal or a goal horn."
  },
  {
    id: "pg-og", brand: "PuckGold", kind: "launch", title: "Clip the $36 OG Gold Puck", status: "live", category: "Sports",
    platforms: ["tiktok", "youtube", "instagram"], points: 120, kicker: "$36 OG GOLD PUCK",
    who: "Hockey clippers and collectors", length: "8–25 seconds", hashtag: "#OGGoldPuck",
    mission: "Clip the $36 OG Gold Puck: OG Limited Edition gold puck plus a 1-year Premium League Pass. Send people to puckgold.com/join.html.",
    sources: [{ label: "puckgold.com · $36 OG Pass", href: "https://puckgold.com/join.html" }, ...src(PG)],
    hook: "Gold puck close-up, then “$36 — and you get the whole season.”",
    extraDonts: ["Don't imply the NHL, EA or any league sponsors PuckGold.", "No NHL broadcast footage."]
  },
  {
    id: "pg-giveaway", brand: "PuckGold", kind: "launch", title: "Clip the PuckGold Fan Zone giveaway", status: "live", category: "Sports",
    platforms: ["tiktok", "instagram"], points: 100, kicker: "FREE GIVEAWAY",
    who: "Anyone who can explain a giveaway in 15 seconds", length: "8–20 seconds", hashtag: "#PuckGoldGiveaway",
    mission: "Tell fans how to enter the free PuckGold Fan Zone giveaway: free account, quests, invites. No purchase necessary; official rules on puckgold.com.",
    sources: [{ label: "puckgold.com · Fan Zone giveaway", href: "https://puckgold.com/fan-zone.html#giveaway" }, ...src(PG)],
    extraDos: ["Say “no purchase necessary”.", "Point to the official rules."], extraDonts: ["Don't promise anyone will win.", "Don't invent prizes."]
  },
  {
    id: "pg-fanart", brand: "PuckGold", kind: "art", title: "Founding Four jersey art cup", status: "live", category: "Sports",
    platforms: ["instagram", "twitter", "tiktok"], points: 500, kicker: "JERSEY ART CUP",
    who: "Artists and kit designers", length: "One image", hashtag: "#PuckGoldArt",
    mission: "Design a fan jersey or poster for a Founding Four team: Mighty Geckz, Cardinals, Whoomp! or Choo Choo. Fan votes plus an admin pick.",
    sources: [{ label: "puckgold.com · Teams", href: "https://puckgold.com/teams.html" }, ...src(PG)], endsAt: "2026-10-28T23:59:00-07:00"
  },
  // ---------- Fartnatics ----------
  {
    id: "fn-follow", brand: "Fartnatics", kind: "follow", title: "Follow Fartnatics", status: "live", category: "Meme",
    platforms: ["twitter", "instagram", "tiktok"], points: 25, kicker: "FOLLOW THE CLOUD",
    who: "Everyone", length: "—", hashtag: "#Fartnatics",
    mission: "Follow Fartnatics on X, Instagram and TikTok. One claim per follow.", sources: src(FN)
  },
  {
    id: "fn-daily", brand: "Fartnatics", kind: "daily", title: "Fartnatics Daily Meme", status: "live", category: "Meme",
    platforms: ["tiktok", "instagram", "twitter"], points: 50, kicker: "ONE MEME A DAY",
    who: "Meme clippers and comedy editors", length: "7–15 seconds", hashtag: "#FartnaticsDaily",
    mission: "One funny short a day about Fartnatics: the cloud, the spin, the leaderboard. Keep it TikTok-safe.",
    sources: [{ label: "fartnatics.com", href: "https://fartnatics.com/" }, ...src(FN)], hook: "The spin landing, then the reaction."
  },
  {
    id: "fn-giveaway", brand: "Fartnatics", kind: "launch", title: "Clip the Fartnatics giveaway", status: "live", category: "Meme",
    platforms: ["tiktok", "instagram", "youtube"], points: 100, kicker: "GIVEAWAY + WELCOME SPIN",
    who: "Clippers who like a bit", length: "8–20 seconds", hashtag: "#FartnaticsGiveaway",
    mission: "Show the free Welcome Spin and the Fartnatics giveaway. Send people to fartnatics.com/giveaway. FC points have no cash value.",
    sources: [{ label: "fartnatics.com · giveaway", href: "https://fartnatics.com/giveaway" }, ...src(FN)],
    extraDonts: ["Don't claim points are worth money.", "Don't promise anyone will win."]
  },
  {
    id: "fn-sound", brand: "Fartnatics", kind: "remix", title: "Fartnatics soundboard remix", status: "live", category: "Music",
    platforms: ["tiktok", "instagram"], points: 120, kicker: "SOUND CHALLENGE",
    who: "Producers, editors, chaos agents", length: "7–15 seconds", hashtag: "#FartnaticsRemix",
    mission: "Turn the Fartnatics soundboard into a beat. Best loops get featured.",
    sources: [{ label: "fartnatics.com", href: "https://fartnatics.com/" }, ...src(FN)],
    extraDonts: ["No copyrighted songs you don't have rights to."]
  },
  {
    id: "fn-cloudart", brand: "Fartnatics", kind: "art", title: "Draw the Fartnatics cloud", status: "live", category: "Meme",
    platforms: ["instagram", "twitter", "tiktok"], points: 400, kicker: "CLOUD ART CUP",
    who: "Artists and meme makers", length: "One image or meme", hashtag: "#FartnaticsArt",
    mission: "Draw or meme the Fartnatics cloud mascot. Fan votes plus an admin pick choose the winners.",
    sources: [{ label: "fartnatics.com", href: "https://fartnatics.com/" }, ...src(FN)], endsAt: "2026-10-27T23:59:00-07:00",
    extraDonts: ["Keep it SFW."]
  }
]

/** Follow quests (server-validated ids) for every brand. */
export const ALL_FOLLOWS = (Object.keys(BRANDS) as BrandId[]).flatMap((b) =>
  BRANDS[b].socials.map((s) => ({ id: `${s.net}-${s.handle}`, brand: b, ...s }))
)

export const PRIZE_LABEL = "Points · prizes · payments soon"

export function toCampaign(c: BrandCampaign): Campaign {
  return {
    id: c.id, customTitle: c.title, agency: c.brand, agencyVerified: true, brand: c.brand, kind: c.kind,
    category: c.category, contentType: c.kind === "follow" || c.kind === "daily" ? "Quest" : c.kind === "art" ? "Contest" : "Clipping",
    platforms: c.platforms, rateType: "points", cpm: 0, budgetTotal: 0, budgetSpent: 0, creatorCount: 0, postedAgo: "today",
    featured: false, status: c.status, endsAt: c.endsAt, points: c.points, prizeLabel: PRIZE_LABEL,
    bannerUrl: `/promo/${c.id}/card.png`, thumbnailUrl: `/promo/${c.id}/card.png`, resourcesUrl: c.sources[0]?.href
  }
}

export function toBrief(c: BrandCampaign): CampaignBrief {
  const b = BRANDS[c.brand]
  const tags = [b.tag, "@sushibutt", c.hashtag, ...(b.ageGate ? ["#21Plus"] : [])]
  const hook = c.hook ? `Cut a hook in the first 1.5 seconds. ${c.hook}` : "Cut a hook in the first 1.5 seconds: punchline, product or face first."
  const post = `Post public on TikTok, Reels, Shorts or X. Tag ${b.tag} and @sushibutt, add ${c.hashtag}. Keep it live 30 days.`
  const steps: Record<BrandCampaign["kind"], string[]> = {
    follow: [
      `Tap each follow below and follow ${b.tag} ( +25 pts each, once ).`,
      "Come back and claim. Honor system for now: claims are self-reported until account verification is live.",
      "Daily check-in ( +15 pts ) and share the belt ( +20 pts ) for easy extra points."
    ],
    daily: ["Join this open ( +50 pts ).", `Pull today's footage from the source links (${b.site} or ${b.tag} only).`, hook, post, "Paste the public URL and submit ( +100 pts first submit; " + c.points + " ★ per approved clip )."],
    launch: ["Join this open ( +50 pts ).", `Grab official footage from ${b.site} and ${b.tag}.`, hook, post, "Paste the public URL and submit ( +100 pts first submit; " + c.points + " ★ when approved )."],
    remix: ["Join this open ( +50 pts ).", "Build your sound or remix (original audio or audio you have rights to).", `Cut it over official ${c.brand} visuals from the source links.`, post, "Paste the public URL and submit ( +100 pts first submit; " + c.points + " ★ when approved )."],
    art: ["Join this open ( +50 pts ).", "Make one original image (or a short animation).", `Post it public with ${b.tag} @sushibutt ${c.hashtag}, or host the image at any public https link.`, "Submit the link below ( +100 pts first submit ). Approved entries go into the gallery.", `Fans vote once a day (+5 ★ for voting). Top votes plus an admin pick win (+${c.points} ★ bonus and prizes).`]
  }
  const dos = { follow: ["Follow from the account you use most."], daily: ["Vertical 9:16, captions on.", "One idea per clip.", "Loop-friendly ending."], launch: ["Vertical 9:16, captions on.", "Real prices and offer wording only."], remix: ["Keep the loop under 15s.", "Credit the original sound."], art: ["Original work, high resolution.", "Brand colors welcome."] }[c.kind]
  const donts = ["Do not put private info on screen.", "Do not reupload someone else's edit or art.", ...(c.kind === "follow" ? ["Do not follow-unfollow to farm points."] : [])]
  return {
    who: c.who, mission: c.mission, length: c.length, tags, sources: c.sources, steps: steps[c.kind],
    dos: [...dos, ...(c.extraDos || [])], donts: [...donts, ...(c.extraDonts || [])],
    submit: c.kind === "follow" ? "One claim per follow. Honor system until verification is live." : c.kind === "art" ? "Public https link to your image or post. One entry per person." : `Public post URL. Caption must include ${b.tag}.`
  }
}
