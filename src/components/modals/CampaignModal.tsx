"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ArrowLeft, Share2, ExternalLink, Users, ThumbsUp, Star } from "lucide-react"
import { useAppStore } from "@/hooks/useStore"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { BudgetBar } from "@/components/ui/BudgetBar"
import { Badge } from "@/components/ui/Badge"
import { formatBudget, formatViews } from "@/utils"
import { cn } from "@/utils"

type Tab = "Overview" | "Leaderboard" | "Analytics"

const STAR_ICONS = {
  gold: "⭐",
  silver: "🥈",
  bronze: "🥉"
}

export function CampaignModal() {
  const { modal, closeModal } = useAppStore()
  const [tab, setTab] = useState<Tab>("Overview")
  const c = modal.campaign

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden"
      setTab("Overview")
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [modal.open])

  if (!modal.open || !c) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Banner image */}
        <div className="relative h-64 bg-muted overflow-hidden rounded-t-2xl">
          {c.thumbnailUrl ? (
            <Image src={c.thumbnailUrl} alt={c.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Agency + title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {c.agency[0]}
              </div>
              <span className="text-sm font-medium">{c.agency}</span>
              {c.agencyVerified && <span className="text-yellow-500 text-sm">🔥</span>}
              {c.approvalRate && (
                <span className="text-sm text-muted-foreground ml-auto flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {c.approvalRate}% approval rate
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold">{c.title}</h2>
          </div>

          {/* Budget */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-muted-foreground text-sm">$</span>
              <span className="text-2xl font-bold">{c.budgetTotal.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">budget</span>
            </div>
            <BudgetBar spent={c.budgetSpent} total={c.budgetTotal} showLabels />

            {/* Meta */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <Badge variant="cpm">${c.cpm}/1K</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{c.creatorCount >= 1000 ? `${(c.creatorCount/1000).toFixed(0)}K` : c.creatorCount}</span>
              </div>
              <div className="flex gap-1">
                {c.platforms.map(p => (
                  <PlatformIcon key={p} platform={p} size="sm" />
                ))}
              </div>
              {c.approvalRate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{c.approvalRate}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-3 text-sm border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{c.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Platforms</span>
              <div className="flex gap-1">
                {c.platforms.map(p => (
                  <PlatformIcon key={p} platform={p} size="sm" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Content</span>
              <span className="font-medium">{c.contentType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last updated</span>
              <span className="font-medium">{c.postedAgo} ago</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex gap-4">
              {(["Overview", "Leaderboard", "Analytics"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "pb-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                    tab === t
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {tab === "Overview" && (
            <div className="space-y-5">
              {/* Description */}
              {c.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              )}

              {/* Requirements */}
              {c.requirements && (
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Content Requirements</p>
                    <p className="text-sm">{c.requirements}</p>
                  </div>
                </div>
              )}

              {/* Earnings */}
              {c.earnings && c.earnings.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Earnings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {c.earnings.map((e) => (
                      <div key={e.platform} className="border border-border rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">{e.platform}</span>
                          <PlatformIcon platform={e.platform} size="md" />
                        </div>
                        <p className="text-sm text-muted-foreground">${e.cpm}/1K views</p>
                        {(e.min || e.max) && (
                          <div className="flex gap-2 mt-1">
                            {e.min && <Badge variant="outline">${e.min} Min</Badge>}
                            {e.max && <Badge variant="outline">${e.max} Max</Badge>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {c.resourcesUrl && (
                <div>
                  <h4 className="font-semibold mb-3">Resources</h4>
                  <a
                    href={c.resourcesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">📁</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Google Drive</p>
                        <p className="text-xs text-muted-foreground">Requirements</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              )}
            </div>
          )}

          {tab === "Leaderboard" && (
            <div className="space-y-3">
              {c.topEarners && c.topEarners.length > 0 ? (
                <>
                  <h4 className="font-semibold">Top Earners</h4>
                  {c.topEarners.map((earner, i) => (
                    <div key={earner.username} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{STAR_ICONS[earner.rank]}</span>
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {earner.username[0]}
                        </div>
                        <span className="font-medium text-sm">{earner.username}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatViews(earner.views)}</p>
                        <p className="text-xs text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-8">No leaderboard data yet.</p>
              )}
            </div>
          )}

          {tab === "Analytics" && (
            <div className="space-y-4">
              {c.totalViews ? (
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-muted-foreground text-sm mb-1">Total views</p>
                  <p className="text-3xl font-bold">{formatViews(c.totalViews)}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-8">No analytics data yet.</p>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors">
              Join Campaign
            </button>
            <button className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
