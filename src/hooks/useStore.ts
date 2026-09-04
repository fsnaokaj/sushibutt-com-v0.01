"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Campaign, FilterState, ModalState, User, UserRole } from "@/types"
import { seedCampaigns } from "@/data/campaigns"
import { withBasePath } from "@/utils"

interface AppState {
  filters: FilterState
  modal: ModalState
  user: User | null
  extraCampaigns: Campaign[]
  submissions: Record<string, boolean>
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
  openModal: (campaign: Campaign) => void
  closeModal: () => void
  register: (input: { name: string; email: string; role: UserRole }) => void
  logout: () => void
  joinCampaign: (id: string) => void
  submitClip: (id: string) => void
  publishCampaign: (input: { title: string; budget: number; cpm: number; rateType: Campaign["rateType"] }) => void
}

const defaultFilters: FilterState = {
  search: "",
  category: "All Categories",
  contentType: "All Content types",
  platforms: [],
  sortBy: "Featured"
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      modal: { open: false, campaign: null },
      user: null,
      extraCampaigns: [],
      submissions: {},

      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
      resetFilters: () => set({ filters: defaultFilters }),
      openModal: (campaign) => set({ modal: { open: true, campaign } }),
      closeModal: () => set((state) => ({ modal: { ...state.modal, open: false } })),

      register: ({ name, email, role }) =>
        set({
          user: {
            id: `u_${Date.now()}`,
            name,
            email,
            role,
            points: role === "clipper" ? 120 : 0,
            joinedIds: [],
            createdCampaigns: []
          }
        }),

      logout: () => set({ user: null }),

      joinCampaign: (id) =>
        set((state) => {
          if (!state.user || state.user.joinedIds.includes(id)) return state
          return {
            user: {
              ...state.user,
              joinedIds: [...state.user.joinedIds, id],
              points: state.user.points + 50
            }
          }
        }),

      submitClip: (id) =>
        set((state) => {
          if (!state.user || state.submissions[id]) return state
          return {
            submissions: { ...state.submissions, [id]: true },
            user: { ...state.user, points: state.user.points + 100 }
          }
        }),

      publishCampaign: ({ title, budget, cpm, rateType }) =>
        set((state) => {
          if (!state.user || state.user.role !== "brand") return state
          const id = `brand-${Date.now()}`
          const campaign: Campaign = {
            id,
            customTitle: title,
            agency: state.user.name,
            agencyVerified: true,
            category: "Meme",
            contentType: "Clipping",
            platforms: ["tiktok", "instagram"],
            rateType,
            cpm: rateType === "cpm" ? cpm : 0,
            fixedRate: rateType === "fixed" ? cpm : undefined,
            prizePool: rateType === "points" ? budget : undefined,
            budgetTotal: budget,
            budgetSpent: 0,
            creatorCount: 0,
            postedAgo: "now",
            featured: true,
            thumbnailUrl: withBasePath("/thumbnails/official.svg")
          }
          return {
            extraCampaigns: [campaign, ...state.extraCampaigns],
            user: {
              ...state.user,
              createdCampaigns: [campaign, ...state.user.createdCampaigns]
            }
          }
        })
    }),
    { name: "sushibutt-store" }
  )
)

export function useAllCampaigns() {
  const extra = useAppStore((s) => s.extraCampaigns)
  return [...extra, ...seedCampaigns]
}
