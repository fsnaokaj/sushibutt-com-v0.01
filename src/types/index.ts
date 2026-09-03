// Campaign types
export type ContentType = "Clipping" | "UGC"
export type Category =
  | "All Categories"
  | "Music"
  | "Gaming"
  | "Entertainment"
  | "Sports"
  | "Education"
  | "Lifestyle"
  | "Technology"
  | "Product"
  | "Personal brand"

export type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "facebook"

export type SortBy =
  | "Featured"
  | "Newest"
  | "Highest Budget"
  | "Highest Available Budget"
  | "Highest CPM"
  | "Most Paid Out"
  | "Most Creators"

export interface Earnings {
  platform: Platform
  cpm: number // $ per 1K views
  min?: number
  max?: number
}

export interface TopEarner {
  username: string
  views: number
  avatarUrl?: string
  rank: "gold" | "silver" | "bronze"
}

export interface Campaign {
  id: string
  title: string
  agency: string
  agencyVerified: boolean
  agencyLogoUrl?: string
  bannerUrl?: string // path to /public/banners/
  thumbnailUrl?: string // path to /public/thumbnails/
  category: Category
  contentType: ContentType
  platforms: Platform[]
  cpm: number // $ per 1K views
  budgetTotal: number
  budgetSpent: number
  creatorCount: number
  postedAgo: string // e.g. "2d", "1mo"
  description?: string
  featured?: boolean
  approvalRate?: number
  earnings?: Earnings[]
  topEarners?: TopEarner[]
  totalViews?: number
  requirements?: string
  resourcesUrl?: string
}

// Filter/sort state
export interface FilterState {
  search: string
  category: Category
  contentType: ContentType | "All Content types"
  platforms: Platform[]
  sortBy: SortBy
}

// Modal state
export interface ModalState {
  open: boolean
  campaign: Campaign | null
}
