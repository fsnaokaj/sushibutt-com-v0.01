import { useMemo } from "react"
import { campaigns } from "@/data/campaigns"
import { useAppStore } from "./useStore"
import { Campaign } from "@/types"

export function useCampaigns() {
  const { filters } = useAppStore()

  const filtered = useMemo(() => {
    let list: Campaign[] = [...campaigns]

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.agency.toLowerCase().includes(q)
      )
    }

    // Category
    if (filters.category !== "All Categories") {
      list = list.filter((c) => c.category === filters.category)
    }

    // Content type
    if (filters.contentType !== "All Content types") {
      list = list.filter((c) => c.contentType === filters.contentType)
    }

    // Platforms
    if (filters.platforms.length > 0) {
      list = list.filter((c) =>
        filters.platforms.some((p) => c.platforms.includes(p))
      )
    }

    // Sort
    switch (filters.sortBy) {
      case "Newest":
        // Already ordered in data, keep as is
        break
      case "Highest Budget":
        list.sort((a, b) => b.budgetTotal - a.budgetTotal)
        break
      case "Highest Available Budget":
        list.sort(
          (a, b) =>
            b.budgetTotal - b.budgetSpent - (a.budgetTotal - a.budgetSpent)
        )
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
        break
    }

    return list
  }, [filters])

  return { campaigns: filtered, total: filtered.length }
}
