"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { PlatformIcon } from "@/components/ui/PlatformIcon"
import { Link2, CheckCircle2 } from "lucide-react"

const connectedAccounts = [
  { platform: "tiktok" as const, handle: "@yourclips", followers: "124K", connected: true },
  { platform: "instagram" as const, handle: "@yourclips", followers: "58K", connected: true },
  { platform: "youtube" as const, handle: "Not connected", followers: "", connected: false },
  { platform: "twitter" as const, handle: "Not connected", followers: "", connected: false },
]

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-bold">
              Y
            </div>
            <div>
              <h1 className="text-xl font-bold">Your Profile</h1>
              <p className="text-sm text-muted-foreground">Member since June 2026</p>
            </div>
          </div>

          {/* Connected accounts */}
          <div>
            <h2 className="font-semibold mb-3">Connected accounts</h2>
            <div className="space-y-2">
              {connectedAccounts.map((acc) => (
                <div
                  key={acc.platform}
                  className="flex items-center justify-between border border-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <PlatformIcon platform={acc.platform} size="md" />
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">{acc.platform}</p>
                      <p className="text-xs text-muted-foreground">
                        {acc.handle}{acc.followers && ` · ${acc.followers} followers`}
                      </p>
                    </div>
                  </div>
                  {acc.connected ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Connected
                    </span>
                  ) : (
                    <button className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 border border-border rounded-full hover:bg-secondary transition-colors">
                      <Link2 className="w-3.5 h-3.5" />
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payout info */}
          <div>
            <h2 className="font-semibold mb-3">Payout details</h2>
            <div className="border border-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payout method</span>
                <span className="font-medium">PayPal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">creator@example.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum payout</span>
                <span className="font-medium">$50.00</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
