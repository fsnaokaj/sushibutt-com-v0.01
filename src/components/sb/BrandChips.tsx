"use client"
import { useAppStore, useAllCampaigns } from "@/hooks/useStore"
import { cn } from "@/utils"

import { BRANDS as B } from "@/config/campaigns"
const BRANDS = ["All", ...Object.keys(B)]
export function BrandChips() {
  const brand = useAppStore((s) => s.filters.brand) || "All"
  const setFilter = useAppStore((s) => s.setFilter)
  const all = useAllCampaigns()
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Brand">
      {BRANDS.map((b) => {
        const n = b === "All" ? all.length : all.filter((c) => (c.brand || "SushiButt") === b).length
        return (
          <button key={b} onClick={() => setFilter("brand", b)} className={cn("shrink-0 px-3 py-1.5 rounded-full border text-sm font-extrabold", brand === b ? "bg-primary text-white border-primary" : "bg-white hover:border-primary")}>
            {b} <span className="opacity-70">{n}</span>
          </button>
        )
      })}
    </div>
  )
}
