export type ContentType = "Clipping" | "UGC"
export type Category =
  | "All Categories"
  | "Music"
  | "Gaming"
  | "Entertainment"
  | "Sports"
  | "Lifestyle"
  | "Meme"
export type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "facebook"
export type SortBy =
  | "Featured"
  | "Newest"
  | "Highest Budget"
  | "Highest Available Budget"
  | "Highest CPM"
  | "Most Paid Out"
  | "Most Creators"
export type RateType = "cpm" | "fixed" | "points"
export type UserRole = "clipper" | "brand"

export interface Earnings {
  platform: Platform
  cpm: number
  min?: number
  max?: number
}

export interface TopEarner {
  username: string
  views: number
  points: number
  avatar?: string
  rank: "gold" | "silver" | "bronze"
}

export interface Campaign {
  id: string
  customTitle?: string
  agency: string
  agencyVerified: boolean
  agencyLogoUrl?: string
  bannerUrl?: string
  thumbnailUrl?: string
  category: Category
  contentType: ContentType
  platforms: Platform[]
  rateType: RateType
  cpm: number
  fixedRate?: number
  prizePool?: number
  budgetTotal: number
  budgetSpent: number
  creatorCount: number
  postedAgo: string
  featured?: boolean
  approvalRate?: number
  earnings?: Earnings[]
  topEarners?: TopEarner[]
  totalViews?: number
  resourcesUrl?: string
}

export interface FilterState {
  search: string
  category: Category
  contentType: ContentType | "All Content types"
  platforms: Platform[]
  sortBy: SortBy
}

export interface ModalState {
  open: boolean
  campaign: Campaign | null
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  points: number
  joinedIds: string[]
  createdCampaigns: Campaign[]
}

export type Locale = "en" | "ja" | "ko" | "zh" | "ru" | "es" | "nl" | "fr" | "it"
