import { useMemo } from "react"
import { useAllCampaigns, useAppStore } from "./useStore"
import { Campaign } from "@/types"
import { useI18n } from "@/i18n/LanguageProvider"

export function useCampaigns() {
  const { filters } = useAppStore()
  const all = useAllCampaigns()
  const { t } = useI18n()

  const filtered = useMemo(() => {
    let list: Campaign[] = [...all]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter((c) => {
        const title = t(`copy.${c.id}.title`).toLowerCase()
        return title.includes(q) || c.agency.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
      })
    }
    if (filters.category !== "All Categories") {
      list = list.filter((c) => c.category === filters.category)
    }
    if (filters.contentType !== "All Content types") {
      list = list.filter((c) => c.contentType === filters.contentType)
    }
    if (filters.platforms.length > 0) {
      list = list.filter((c) => filters.platforms.some((p) => c.platforms.includes(p)))
    }

    switch (filters.sortBy) {
      case "Highest Budget":
        list.sort((a, b) => b.budgetTotal - a.budgetTotal)
        break
      case "Highest Available Budget":
        list.sort((a, b) => b.budgetTotal - b.budgetSpent - (a.budgetTotal - a.budgetSpent))
        break
      case "Highest CPM":
        list.sort((a, b) => b.cpm - a.cpm)
        break
      case "Most Paid Out":
        list.sort((a, b) => b.budgetSpent - a.budgetSpent)
        break
      case "Most Creators":
        list.sort((a, b) => b.creatorCount - a.creatorCount)
        break
      case "Featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return list
  }, [filters, all, t])

  return { campaigns: filtered, total: filtered.length }
}
