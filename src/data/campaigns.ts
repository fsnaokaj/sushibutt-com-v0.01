import { Campaign } from "@/types"
import { withBasePath } from "@/utils"

export const seedCampaigns: Campaign[] = [
  {
    id: "official-open",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Meme",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram", "youtube"],
    rateType: "points",
    cpm: 0,
    budgetTotal: 0,
    budgetSpent: 0,
    creatorCount: 0,
    postedAgo: "today",
    featured: true,
    status: "registering",
    bannerUrl: "/banners/official-open.svg",
    thumbnailUrl: "/thumbnails/official-open.svg",
    resourcesUrl: "https://x.com/sushibutt"
  },
  {
    id: "follow-quest",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Lifestyle",
    contentType: "Quest",
    platforms: ["twitter", "instagram", "tiktok"],
    rateType: "points",
    cpm: 0,
    budgetTotal: 0,
    budgetSpent: 0,
    creatorCount: 0,
    postedAgo: "today",
    featured: true,
    status: "live",
    bannerUrl: "/banners/follow-quest.svg",
    thumbnailUrl: "/thumbnails/follow-quest.svg"
  },
  {
    id: "launch-film",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Entertainment",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram", "youtube"],
    rateType: "points",
    cpm: 0,
    budgetTotal: 0,
    budgetSpent: 0,
    creatorCount: 0,
    postedAgo: "today",
    featured: true,
    status: "live",
    bannerUrl: "/banners/launch-film.svg",
    thumbnailUrl: "/thumbnails/launch-film.svg",
    resourcesUrl: "https://x.com/sushibuttshelbie"
  },
  {
    id: "daily-belt",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Lifestyle",
    contentType: "Quest",
    platforms: ["tiktok", "instagram", "twitter"],
    rateType: "points",
    cpm: 0,
    budgetTotal: 0,
    budgetSpent: 0,
    creatorCount: 0,
    postedAgo: "today",
    featured: true,
    status: "live",
    bannerUrl: "/banners/daily-belt.svg",
    thumbnailUrl: "/thumbnails/daily-belt.svg",
    resourcesUrl: "https://x.com/sushibuttshelbie"
  }
]

for (const campaign of seedCampaigns) {
  campaign.bannerUrl = withBasePath(campaign.bannerUrl)
  campaign.thumbnailUrl = withBasePath(campaign.thumbnailUrl)
}

export const campaigns = seedCampaigns
export const featuredCampaigns = campaigns.filter((c) => c.featured)
export const LAUNCH_OPEN_IDS = seedCampaigns.map((c) => c.id)
export const RETIRED_OPEN_IDS = new Set([
  "official",
  "nigiri-night",
  "wasabi-drop",
  "pink-belt",
  "star-roll",
  "omakase",
  "kaiten",
  "soy-sports"
])
export const getFeaturedHeroCampaigns = () => campaigns.filter((c) => c.featured).slice(0, 4)
