"use client"

import { useState, useRef, useEffect } from "react"
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { useAppStore } from "@/hooks/useStore"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { Platform, Category, SortBy } from "@/types"
import { cn } from "@/utils"

const PLATFORMS: Platform[] = ["youtube", "tiktok", "instagram", "twitter", "facebook"]

const CATEGORIES: Category[] = [
  "All Categories",
  "Music",
  "Gaming",
  "Entertainment",
  "Sports",
  "Education",
  "Lifestyle",
  "Technology"
]

const SORT_OPTIONS: SortBy[] = [
  "Featured",
  "Newest",
  "Highest Budget",
  "Highest Available Budget",
  "Highest CPM",
  "Most Paid Out",
  "Most Creators"
]

const CONTENT_TYPES = ["All Content types", "Clipping", "UGC"] as const

type DropdownKey = "sort" | "category" | "content" | null

export function FilterBar() {
  const { filters, setFilter, resetFilters } = useAppStore()
  const [open, setOpen] = useState<DropdownKey>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const togglePlatform = (p: Platform) => {
    const current = filters.platforms
    if (current.includes(p)) {
      setFilter("platforms", current.filter((x) => x !== p))
    } else {
      setFilter("platforms", [...current, p])
    }
  }

  const hasActiveFilters =
    filters.search ||
    filters.category !== "All Categories" ||
    filters.contentType !== "All Content types" ||
    filters.platforms.length > 0

  return (
    <div ref={ref} className="flex items-center gap-2 flex-wrap relative">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Campaigns and creators"
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground"
        />
        {filters.search && (
          <button
            onClick={() => setFilter("search", "")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Sort button */}
      <button
        onClick={() => setOpen(open === "sort" ? null : "sort")}
        className="flex items-center gap-1.5 px-3 py-2 text-sm bg-secondary border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>

      {/* Platform filters */}
      {PLATFORMS.map((p) => (
        <button
          key={p}
          onClick={() => togglePlatform(p)}
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center border transition-colors",
            filters.platforms.includes(p)
              ? "bg-foreground text-background border-foreground"
              : "bg-secondary border-border hover:bg-muted"
          )}
        >
          <PlatformIcon platform={p} size="sm" className={filters.platforms.includes(p) ? "text-background" : ""} />
        </button>
      ))}

      {/* Category dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(open === "category" ? null : "category")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg transition-colors",
            filters.category !== "All Categories"
              ? "bg-foreground text-background border-foreground"
              : "bg-secondary border-border hover:bg-muted"
          )}
        >
          Category
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {open === "category" && (
          <div className="absolute top-full mt-1 right-0 z-50 bg-card border border-border rounded-xl shadow-lg py-1 min-w-48">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter("category", cat as Category)
                  setOpen(null)
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between",
                  filters.category === cat && "font-medium"
                )}
              >
                {cat}
                {filters.category === cat && (
                  <span className="w-4 h-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content type dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(open === "content" ? null : "content")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg transition-colors",
            filters.contentType !== "All Content types"
              ? "bg-foreground text-background border-foreground"
              : "bg-secondary border-border hover:bg-muted"
          )}
        >
          Content
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {open === "content" && (
          <div className="absolute top-full mt-1 right-0 z-50 bg-card border border-border rounded-xl shadow-lg py-1 min-w-40">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct}
                onClick={() => {
                  setFilter("contentType", ct as typeof filters.contentType)
                  setOpen(null)
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between",
                  filters.contentType === ct && "font-medium"
                )}
              >
                {ct}
                {filters.contentType === ct && (
                  <span className="w-4 h-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort dropdown */}
      {open === "sort" && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-card border border-border rounded-xl shadow-lg py-1 min-w-56">
          <p className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">Sort by</p>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilter("sortBy", s)
                setOpen(null)
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between",
                filters.sortBy === s && "font-medium"
              )}
            >
              {s}
              {filters.sortBy === s && (
                <span className="w-4 h-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  )
}
