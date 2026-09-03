"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Share2, ExternalLink, Users, ThumbsUp } from "lucide-react"
import { campaigns } from "@/data/campaigns"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { BudgetBar } from "@/components/ui/BudgetBar"
import { Badge } from "@/components/ui/Badge"
import { formatBudget, formatViews } from "@/utils"
import { cn } from "@/utils"

type Tab = "Overview" | "Leaderboard" | "Analytics"

const STAR_ICONS = { gold: "⭐", silver: "🥈", bronze: "🥉" } as const

export default function CampaignPage() {
  const params = useParams()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("Overview")

  const c = campaigns.find(x => x.id === params.id)
  if (!c) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Campaign not found</p>
          <button onClick={() => router.push("/")} className="text-sm text-muted-foreground hover:underline">
            ← Back to marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="border-b border-border px-6 py-3">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: details */}
          <div className="space-y-6">
            {/* Agency */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {c.agency[0]}
              </div>
              <span className="text-sm font-medium">{c.agency}</span>
              {c.agencyVerified && <span className="text-yellow-500">🔥</span>}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold">{c.title}</h1>

            {/* CTA */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors">
                Join Campaign
              </button>
              <button className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex gap-4">
                {(["Overview", "Leaderboard", "Analytics"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "pb-2 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-1.5",
                      tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t === "Overview" && "⊞"}
                    {t === "Leaderboard" && "👑"}
                    {t === "Analytics" && "📊"}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            {tab === "Overview" && (
              <div className="space-y-5">
                {c.description && (
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                )}

                {c.requirements && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Requirements</h3>
                    <div className="bg-secondary/50 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Content Requirements</p>
                      <p className="text-sm">{c.requirements}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-semibold">Earnings</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(c.earnings ?? [{ platform: c.platforms[0], cpm: c.cpm, min: c.cpm, max: c.cpm * 300 }]).map((e) => (
                      <div key={e.platform} className="border border-border rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">{e.platform}</span>
                          <PlatformIcon platform={e.platform} size="md" />
                        </div>
                        <p className="text-sm text-muted-foreground">${e.cpm}/1K views</p>
                        {(e.min || e.max) && (
                          <div className="flex gap-2 mt-2">
                            {e.min && <Badge variant="outline">${e.min} Min</Badge>}
                            {e.max && <Badge variant="outline">${e.max} Max</Badge>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {c.resourcesUrl && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Resources</h3>
                    <a
                      href={c.resourcesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-sm">📁</div>
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
                {c.topEarners?.map((e) => (
                  <div key={e.username} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{STAR_ICONS[e.rank]}</span>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                        {e.username[0]}
                      </div>
                      <span className="font-medium text-sm">{e.username}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatViews(e.views)}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                  </div>
                )) ?? <p className="text-sm text-muted-foreground text-center py-8">No data yet.</p>}
              </div>
            )}

            {tab === "Analytics" && (
              <div className="space-y-3">
                {c.totalViews ? (
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Total views</p>
                    <p className="text-3xl font-bold">{formatViews(c.totalViews)}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No analytics yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Right: banner + budget card */}
          <div className="space-y-4">
            {/* Banner image */}
            <div className="relative h-56 rounded-2xl overflow-hidden bg-muted">
              {c.thumbnailUrl ? (
                <Image src={c.thumbnailUrl} alt={c.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
            </div>

            {/* Budget card */}
            <div className="border border-border rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-foreground/50 text-sm">$</span>
                <span className="text-3xl font-bold">{c.budgetTotal.toLocaleString()}</span>
                <span className="text-foreground/50">budget</span>
              </div>

              <BudgetBar spent={c.budgetSpent} total={c.budgetTotal} showLabels />

              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <Badge variant="cpm">${c.cpm}/1K</Badge>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{c.creatorCount >= 1000 ? `${(c.creatorCount/1000).toFixed(0)}K` : c.creatorCount}</span>
                </div>
                {c.approvalRate && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.approvalRate}%</span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span>{c.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Platforms</span>
                  <div className="flex gap-1">
                    {c.platforms.map(p => <PlatformIcon key={p} platform={p} size="sm" />)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last updated</span>
                  <span>{c.postedAgo} ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
