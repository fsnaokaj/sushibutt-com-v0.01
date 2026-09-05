"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { useAllCampaigns, useAppStore } from "@/hooks/useStore"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { Category, Platform, SortBy, STATUS_FILTERS, StatusFilter } from "@/types"
import { cn } from "@/utils"
import { isActiveOpen, openStatus } from "@/utils/campaign"
import { useI18n } from "@/i18n/LanguageProvider"

const PLATFORMS: Platform[] = ["youtube", "tiktok", "instagram", "twitter", "facebook"]
const CATEGORIES: Category[] = ["All Categories", "Music", "Gaming", "Entertainment", "Sports", "Lifestyle", "Meme", "Jobs"]
const SORT_OPTIONS: SortBy[] = ["Featured", "Live first", "Newest", "Most Creators", "Highest Budget", "Highest Available Budget", "Highest CPM", "Most Paid Out"]
const CONTENT_TYPES = ["All Content types", "Clipping", "UGC", "Quest", "Contest", "Job"] as const

export function FilterBar() {
  const { filters, setFilter, resetFilters } = useAppStore()
  const all = useAllCampaigns()
  const { t } = useI18n()
  const [open, setOpen] = useState<"sort" | "category" | "content" | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const status = filters.status ?? "active"

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const counts = useMemo(() => {
    const next: Record<StatusFilter, number> = {
      active: 0,
      all: all.length,
      live: 0,
      registering: 0,
      upcoming: 0,
      ended: 0
    }
    for (const campaign of all) {
      const current = openStatus(campaign)
      next[current] += 1
      if (isActiveOpen(campaign)) next.active += 1
    }
    return next
  }, [all])

  const hasActive =
    filters.search ||
    filters.category !== "All Categories" ||
    filters.contentType !== "All Content types" ||
    filters.platforms.length > 0 ||
    status !== "active"

  return (
    <div ref={ref} className="sticky top-0 z-20 -mx-4 px-4 py-3 space-y-2 bg-background/95 backdrop-blur-sm border-b border-border/60 relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={status === key}
            onClick={() => setFilter("status", key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-extrabold border shrink-0",
              status === key ? "bg-primary text-white border-primary" : "bg-white border-border text-muted-foreground"
            )}
          >
            {t(`filters.${key}`)}
            <span className={cn("ml-1 tabular-nums", status === key ? "text-white/80" : "text-muted-foreground")}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            placeholder={t("filters.search")}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button onClick={() => setOpen(open === "sort" ? null : "sort")} className="px-3 py-2 bg-white border border-border rounded-xl" aria-label={t("filters.sort")}>
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() =>
              setFilter("platforms", filters.platforms.includes(p) ? filters.platforms.filter((x) => x !== p) : [...filters.platforms, p])
            }
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center border",
              filters.platforms.includes(p) ? "bg-primary text-white border-primary" : "bg-white border-border"
            )}
          >
            <PlatformIcon platform={p} size="sm" className={filters.platforms.includes(p) ? "text-white" : ""} />
          </button>
        ))}
        <div className="relative">
          <button onClick={() => setOpen(open === "category" ? null : "category")} className="flex items-center gap-1 px-3 py-2 text-sm bg-white border rounded-xl">
            {t("filters.category")} <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {open === "category" && (
            <div className="absolute top-full mt-1 right-0 z-50 bg-white border rounded-xl shadow-lg py-1 min-w-44">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => { setFilter("category", cat); setOpen(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-secondary">
                  {t(`category.${cat}`)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setOpen(open === "content" ? null : "content")} className="flex items-center gap-1 px-3 py-2 text-sm bg-white border rounded-xl">
            {t("filters.content")} <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {open === "content" && (
            <div className="absolute top-full mt-1 right-0 z-50 bg-white border rounded-xl shadow-lg py-1 min-w-40">
              {CONTENT_TYPES.map((ct) => (
                <button key={ct} onClick={() => { setFilter("contentType", ct); setOpen(null) }} className="w-full text-left px-4 py-2 text-sm hover:bg-secondary">
                  {ct === "All Content types" ? t("filters.allContent") : t(`filters.${ct.toLowerCase()}`)}
                </button>
              ))}
            </div>
          )}
        </div>
        {open === "sort" && (
          <div className="absolute top-full mt-1 left-0 z-50 bg-white border rounded-xl shadow-lg py-1 min-w-56">
            {SORT_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => { setFilter("sortBy", s); setOpen(null) }}
                className={cn("w-full text-left px-4 py-2 text-sm hover:bg-secondary", filters.sortBy === s && "font-extrabold text-primary")}
              >
                {t(`sort.${s}`)}
              </button>
            ))}
          </div>
        )}
        {hasActive && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-muted-foreground">
            <X className="w-3.5 h-3.5" /> {t("filters.clear")}
          </button>
        )}
      </div>
    </div>
  )
}
