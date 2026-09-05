export type ContentType = "Clipping" | "UGC" | "Quest" | "Contest" | "Job"
export type Category =
  | "All Categories"
  | "Music"
  | "Gaming"
  | "Entertainment"
  | "Sports"
  | "Lifestyle"
  | "Meme"
  | "Jobs"
export type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "facebook"
export type SortBy =
  | "Featured"
  | "Newest"
  | "Live first"
  | "Most Creators"
  | "Highest Budget"
  | "Highest Available Budget"
  | "Highest CPM"
  | "Most Paid Out"
export type OpenStatus = "live" | "registering" | "upcoming" | "ended"
export type StatusFilter = "active" | "all" | OpenStatus
export const OPEN_STATUSES: OpenStatus[] = ["live", "registering", "upcoming", "ended"]
export const STATUS_FILTERS: StatusFilter[] = ["active", "live", "registering", "upcoming", "ended", "all"]
export type RateType = "cpm" | "fixed" | "points"
export type RoleId =
  | "clipper"
  | "founder"
  | "brand"
  | "editor"
  | "artist"
  | "vibe"
  | "streamer"
  | "creator"
  | "biohacker"
  | "jock"
  | "degen"
  | "model"
  | "geek"

export const ROLE_IDS: RoleId[] = [
  "clipper", "founder", "brand", "editor", "artist", "vibe",
  "streamer", "creator", "biohacker", "jock", "degen", "model", "geek"
]

export const GOAL_IDS = ["clip", "compete", "list", "edit", "art", "code", "prizes"] as const
export type GoalId = (typeof GOAL_IDS)[number]

export interface Earnings {
  platform: Platform
  cpm: number
  min?: number
  max?: number
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
  status?: OpenStatus
  approvalRate?: number
  earnings?: Earnings[]
  totalViews?: number
  resourcesUrl?: string
}

export interface FilterState {
  search: string
  category: Category
  contentType: ContentType | "All Content types"
  platforms: Platform[]
  sortBy: SortBy
  status: StatusFilter
}

export interface ModalState {
  open: boolean
  campaign: Campaign | null
}

export interface User {
  id: string
  name: string
  email: string
  roles: RoleId[]
  goals: GoalId[]
  points: number
  joinedIds: string[]
  createdCampaigns: Campaign[]
  onboarded: boolean
  lastCheckin?: string
}

export type Locale = "en" | "ja" | "ko" | "zh" | "ru" | "es" | "nl" | "fr" | "it"
