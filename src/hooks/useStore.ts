import { create } from "zustand"
import { Campaign, FilterState, ModalState } from "@/types"

interface AppState {
  filters: FilterState
  modal: ModalState
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
  openModal: (campaign: Campaign) => void
  closeModal: () => void
}

const defaultFilters: FilterState = {
  search: "",
  category: "All Categories",
  contentType: "All Content types",
  platforms: [],
  sortBy: "Featured"
}

export const useAppStore = create<AppState>((set) => ({
  filters: defaultFilters,
  modal: { open: false, campaign: null },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  openModal: (campaign) =>
    set({ modal: { open: true, campaign } }),

  closeModal: () =>
    set((state) => ({ modal: { ...state.modal, open: false } }))
}))
