"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { TrendingUp, DollarSign, Eye, Award } from "lucide-react"
import { campaigns } from "@/data/campaigns"
import { formatViews } from "@/utils"

// Mock personal earnings data — wire up to real backend later
const myStats = {
  totalEarned: 4218.32,
  pendingPayout: 612.40,
  totalViews: 2840000,
  activeCampaigns: 6
}

const myCampaigns = campaigns.slice(0, 6).map((c, i) => ({
  ...c,
  myViews: [669567, 290340, 153927, 98200, 75600, 41200][i],
  myEarnings: [1339.13, 580.68, 307.85, 196.4, 113.4, 41.2][i]
}))

export default function EarningsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">My Earnings</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Track your views, payouts, and campaign performance.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={<DollarSign className="w-4 h-4" />}
              label="Total earned"
              value={`$${myStats.totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Pending payout"
              value={`$${myStats.pendingPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            />
            <StatCard
              icon={<Eye className="w-4 h-4" />}
              label="Total views"
              value={formatViews(myStats.totalViews)}
            />
            <StatCard
              icon={<Award className="w-4 h-4" />}
              label="Active campaigns"
              value={myStats.activeCampaigns.toString()}
            />
          </div>

          {/* Campaign earnings table */}
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
              <h2 className="font-semibold text-sm">Earnings by campaign</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left px-4 py-2 font-medium">Campaign</th>
                  <th className="text-left px-4 py-2 font-medium">Agency</th>
                  <th className="text-right px-4 py-2 font-medium">Views</th>
                  <th className="text-right px-4 py-2 font-medium">CPM</th>
                  <th className="text-right px-4 py-2 font-medium">Earned</th>
                </tr>
              </thead>
              <tbody>
                {myCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.agency}</td>
                    <td className="px-4 py-3 text-right">{formatViews(c.myViews)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">${c.cpm}/1K</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ${c.myEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-secondary/50 rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
