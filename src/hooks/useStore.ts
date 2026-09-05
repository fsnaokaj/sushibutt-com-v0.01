"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Campaign, FilterState, GoalId, ModalState, RoleId, User } from "@/types"
import { seedCampaigns, RETIRED_OPEN_IDS, LAUNCH_OPEN_IDS } from "@/data/campaigns"
import { isActiveOpen } from "@/utils/campaign"
import { POINTS } from "@/data/quests"
import { applyStats, Clip, ClipStats, detectPlatform, estimateStats } from "@/data/scoring"
import { withBasePath } from "@/utils"
import { canList } from "@/utils/user"

export { POINTS }

interface AppState {
  filters: FilterState
  modal: ModalState
  user: User | null
  extraCampaigns: Campaign[]
  clips: Clip[]
  claimedQuests: Record<string, boolean>
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
  openModal: (campaign: Campaign) => void
  closeModal: () => void
  register: (input: { name: string; email: string; roles: RoleId[]; goals: GoalId[] }) => void
  logout: () => void
  joinCampaign: (id: string) => void
  submitClip: (id: string, url: string) => void
  refreshClips: () => void
  reportClipStats: (clipId: string, stats: ClipStats) => void
  claimQuest: (id: string, pts: number) => void
  checkin: () => void
  publishCampaign: (input: { title: string; budget: number; cpm: number; rateType: Campaign["rateType"]; status?: Campaign["status"] }) => void
}

const defaultFilters: FilterState = {
  search: "",
  category: "All Categories",
  contentType: "All Content types",
  platforms: [],
  sortBy: "Featured",
  status: "active"
}

const today = () => new Date().toISOString().slice(0, 10)

function payoutClips(clips: Clip[], now = Date.now()) {
  let delta = 0
  const next = clips.map((clip) => {
    const applied = applyStats(clip, estimateStats(clip.url, clip.submittedAt, now), now)
    delta += applied.delta
    return applied.clip
  })
  return { clips: next, delta }
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      modal: { open: false, campaign: null },
      user: null,
      extraCampaigns: [],
      clips: [],
      claimedQuests: {},

      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
      resetFilters: () => set({ filters: defaultFilters }),
      openModal: (campaign) => set({ modal: { open: true, campaign } }),
      closeModal: () => set((state) => ({ modal: { ...state.modal, open: false } })),

      register: ({ name, email, roles, goals }) =>
        set({
          user: {
            id: `u_${Date.now()}`,
            name,
            email,
            roles,
            goals,
            points: POINTS.onboard + roles.length * POINTS.role + goals.length * POINTS.goal,
            joinedIds: [],
            createdCampaigns: [],
            onboarded: true
          }
        }),

      logout: () => set({ user: null }),

      joinCampaign: (id) =>
        set((state) => {
          if (!state.user || state.user.joinedIds.includes(id)) return state
          const campaign = [...seedCampaigns, ...state.extraCampaigns].find((c) => c.id === id)
          if (campaign && !isActiveOpen(campaign)) return state
          return {
            user: {
              ...state.user,
              joinedIds: [...state.user.joinedIds, id],
              points: state.user.points + POINTS.join
            }
          }
        }),

      submitClip: (id, url) =>
        set((state) => {
          const link = url.trim()
          if (!state.user || !/^https?:\/\//i.test(link)) return state
          if (state.clips.some((c) => c.url === link)) return state
          const now = Date.now()
          const platform = detectPlatform(link)
          const firstForCampaign = !state.clips.some((c) => c.campaignId === id)
          const listing = firstForCampaign ? POINTS.submit : POINTS.resubmit
          const draft: Clip = {
            id: `clip_${now}`,
            campaignId: id,
            url: link,
            platform,
            submittedAt: now,
            lastSyncAt: 0,
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            avgWatchPct: 0,
            earnedPts: 0
          }
          const applied = applyStats(draft, estimateStats(link, now, now), now)
          return {
            clips: [applied.clip, ...state.clips],
            user: {
              ...state.user,
              joinedIds: state.user.joinedIds.includes(id) ? state.user.joinedIds : [...state.user.joinedIds, id],
              points: state.user.points + listing + applied.delta
            }
          }
        }),

      refreshClips: () =>
        set((state) => {
          if (!state.user || state.clips.length === 0) return state
          const paid = payoutClips(state.clips)
          if (paid.delta === 0 && paid.clips.every((c, i) => c.lastSyncAt === state.clips[i]?.lastSyncAt)) {
            return { clips: paid.clips }
          }
          return {
            clips: paid.clips,
            user: { ...state.user, points: state.user.points + paid.delta }
          }
        }),

      reportClipStats: (clipId, stats) =>
        set((state) => {
          if (!state.user) return state
          let delta = 0
          const clips = state.clips.map((clip) => {
            if (clip.id !== clipId) return clip
            const applied = applyStats(clip, stats)
            delta = applied.delta
            return applied.clip
          })
          return {
            clips,
            user: { ...state.user, points: state.user.points + delta }
          }
        }),

      claimQuest: (id, pts) =>
        set((state) => {
          if (!state.user || state.claimedQuests[id]) return state
          return {
            claimedQuests: { ...state.claimedQuests, [id]: true },
            user: { ...state.user, points: state.user.points + pts }
          }
        }),

      checkin: () =>
        set((state) => {
          if (!state.user) return state
          const day = today()
          if (state.user.lastCheckin === day) return state
          return {
            user: {
              ...state.user,
              lastCheckin: day,
              points: state.user.points + POINTS.checkin
            }
          }
        }),

      publishCampaign: ({ title, budget, cpm, rateType, status }) =>
        set((state) => {
          if (!canList(state.user) || !state.user) return state
          const id = `brand-${Date.now()}`
          const campaign: Campaign = {
            id,
            customTitle: title,
            agency: "Founder",
            agencyVerified: true,
            category: "Jobs",
            contentType: "Job",
            platforms: ["tiktok", "instagram"],
            rateType,
            cpm: rateType === "cpm" ? cpm : 0,
            fixedRate: rateType === "fixed" ? cpm : undefined,
            prizePool: rateType === "points" ? budget : undefined,
            budgetTotal: 0,
            budgetSpent: 0,
            creatorCount: 0,
            postedAgo: "now",
            featured: true,
            status: status ?? "registering",
            thumbnailUrl: withBasePath("/thumbnails/official-open.svg")
          }
          return {
            extraCampaigns: [campaign, ...state.extraCampaigns],
            user: {
              ...state.user,
              points: state.user.points + POINTS.publish,
              createdCampaigns: [campaign, ...state.user.createdCampaigns]
            }
          }
        })
    }),
    {
      name: "sushibutt-store-v3",
      version: 7,
      migrate: (persisted) => {
        const state = persisted as Partial<AppState> & { submissions?: Record<string, string> }
        if (state.extraCampaigns?.length) {
          state.extraCampaigns = state.extraCampaigns
            .filter((c) => c.id.startsWith("brand-") && !RETIRED_OPEN_IDS.has(c.id))
            .slice(0, 4)
        }
        state.filters = { ...defaultFilters, ...state.filters, status: state.filters?.status ?? "active" }
        if (!state.clips) {
          const subs = state.submissions ?? {}
          const now = Date.now()
          let extra = 0
          state.clips = Object.entries(subs)
            .filter((entry): entry is [string, string] => typeof entry[1] === "string" && /^https?:\/\//i.test(entry[1]))
            .map(([campaignId, url], i) => {
              const submittedAt = now - 3_600_000
              const draft: Clip = {
                id: `clip_migrated_${campaignId}_${i}`,
                campaignId,
                url,
                platform: detectPlatform(url),
                submittedAt,
                lastSyncAt: 0,
                views: 0,
                likes: 0,
                comments: 0,
                shares: 0,
                avgWatchPct: 0,
                earnedPts: 0
              }
              const applied = applyStats(draft, estimateStats(url, submittedAt), now)
              extra += applied.delta
              return applied.clip
            })
          if (state.user && extra) {
            state.user = { ...state.user, points: state.user.points + extra }
          }
        }
        return state as AppState
      },
      partialize: (state) => ({
        user: state.user,
        extraCampaigns: state.extraCampaigns,
        clips: state.clips,
        claimedQuests: state.claimedQuests,
        filters: { ...defaultFilters, ...state.filters }
      }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<AppState>
        return {
          ...currentState,
          ...persisted,
          modal: currentState.modal,
          filters: { ...defaultFilters, ...persisted.filters }
        }
      }
    }
  )
)

export function useAllCampaigns() {
  const extra = useAppStore((s) => s.extraCampaigns)
  const listed = extra
    .filter((c) => c.id.startsWith("brand-") && !RETIRED_OPEN_IDS.has(c.id) && !LAUNCH_OPEN_IDS.includes(c.id))
    .slice(0, 4)
  return [...seedCampaigns, ...listed]
}
