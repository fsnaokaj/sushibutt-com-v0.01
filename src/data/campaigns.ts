import { Campaign } from "@/types"
import { withBasePath } from "@/utils"

export const seedCampaigns: Campaign[] = [
  {
    id: "official",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Meme",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram", "youtube"],
    rateType: "cpm",
    cpm: 2,
    budgetTotal: 25000,
    budgetSpent: 4120,
    creatorCount: 186,
    postedAgo: "1d",
    featured: true,
    approvalRate: 78,
    bannerUrl: "/banners/official.svg",
    thumbnailUrl: "/thumbnails/official.svg",
    totalViews: 1840000,
    earnings: [
      { platform: "tiktok", cpm: 2, min: 2, max: 500 },
      { platform: "instagram", cpm: 2, min: 2, max: 500 }
    ],
    topEarners: [
      { username: "sakura.clips", views: 412000, points: 9800, rank: "gold" },
      { username: "nigiri_nick", views: 288000, points: 7200, rank: "silver" },
      { username: "wasabiwave", views: 191000, points: 5100, rank: "bronze" }
    ]
  },
  {
    id: "nigiri-night",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Entertainment",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram"],
    rateType: "fixed",
    cpm: 0,
    fixedRate: 40,
    budgetTotal: 12000,
    budgetSpent: 1960,
    creatorCount: 94,
    postedAgo: "2d",
    featured: true,
    approvalRate: 71,
    bannerUrl: "/banners/nigiri-night.svg",
    thumbnailUrl: "/thumbnails/nigiri-night.svg",
    totalViews: 640000,
    earnings: [{ platform: "tiktok", cpm: 0, min: 40, max: 40 }]
  },
  {
    id: "wasabi-drop",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Meme",
    contentType: "Clipping",
    platforms: ["tiktok", "youtube", "twitter"],
    rateType: "points",
    cpm: 0,
    prizePool: 5000,
    budgetTotal: 5000,
    budgetSpent: 800,
    creatorCount: 241,
    postedAgo: "3d",
    featured: true,
    approvalRate: 64,
    bannerUrl: "/banners/wasabi-drop.svg",
    thumbnailUrl: "/thumbnails/wasabi-drop.svg",
    totalViews: 990000
  },
  {
    id: "pink-belt",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Lifestyle",
    contentType: "UGC",
    platforms: ["tiktok", "instagram"],
    rateType: "cpm",
    cpm: 3,
    budgetTotal: 18000,
    budgetSpent: 2400,
    creatorCount: 67,
    postedAgo: "4d",
    featured: true,
    approvalRate: 69,
    bannerUrl: "/banners/pink-belt.svg",
    thumbnailUrl: "/thumbnails/pink-belt.svg",
    totalViews: 420000,
    earnings: [
      { platform: "tiktok", cpm: 3, min: 3, max: 600 },
      { platform: "instagram", cpm: 3, min: 3, max: 600 }
    ]
  },
  {
    id: "star-roll",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Music",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram", "youtube"],
    rateType: "cpm",
    cpm: 1.5,
    budgetTotal: 9000,
    budgetSpent: 1350,
    creatorCount: 112,
    postedAgo: "5d",
    thumbnailUrl: "/thumbnails/star-roll.svg",
    totalViews: 510000,
    earnings: [{ platform: "tiktok", cpm: 1.5, min: 2, max: 300 }]
  },
  {
    id: "omakase",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Entertainment",
    contentType: "Clipping",
    platforms: ["tiktok", "youtube"],
    rateType: "points",
    cpm: 0,
    prizePool: 3333,
    budgetTotal: 3333,
    budgetSpent: 0,
    creatorCount: 58,
    postedAgo: "6d",
    featured: true,
    thumbnailUrl: "/thumbnails/omakase.svg",
    totalViews: 88000
  },
  {
    id: "kaiten",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Gaming",
    contentType: "Clipping",
    platforms: ["youtube", "tiktok", "twitter"],
    rateType: "cpm",
    cpm: 2.5,
    budgetTotal: 15000,
    budgetSpent: 3100,
    creatorCount: 73,
    postedAgo: "1w",
    thumbnailUrl: "/thumbnails/kaiten.svg",
    totalViews: 720000,
    earnings: [{ platform: "youtube", cpm: 2.5, min: 5, max: 750 }]
  },
  {
    id: "soy-sports",
    agency: "SushiButt",
    agencyVerified: true,
    category: "Sports",
    contentType: "Clipping",
    platforms: ["tiktok", "instagram", "twitter"],
    rateType: "fixed",
    cpm: 0,
    fixedRate: 75,
    budgetTotal: 7500,
    budgetSpent: 900,
    creatorCount: 41,
    postedAgo: "1w",
    thumbnailUrl: "/thumbnails/soy-sports.svg",
    totalViews: 210000,
    earnings: [{ platform: "tiktok", cpm: 0, min: 75, max: 75 }]
  }
]

for (const campaign of seedCampaigns) {
  campaign.bannerUrl = withBasePath(campaign.bannerUrl)
  campaign.thumbnailUrl = withBasePath(campaign.thumbnailUrl)
}

export const campaigns = seedCampaigns

export const featuredCampaigns = campaigns.filter((c) => c.featured)

export const getFeaturedHeroCampaigns = () =>
  campaigns.filter((c) => ["official", "nigiri-night", "wasabi-drop"].includes(c.id))
