"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Bell, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"

const notifications = [
  {
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
    title: "Payout sent",
    desc: "$307.85 from Kitsch - Viral Content Clipping has been sent to your PayPal.",
    time: "2h ago"
  },
  {
    icon: CheckCircle2,
    color: "text-blue-600 bg-blue-100",
    title: "Submission approved",
    desc: "Your clip for StockX [Official Clipping] was approved and is now earning.",
    time: "5h ago"
  },
  {
    icon: AlertCircle,
    color: "text-amber-600 bg-amber-100",
    title: "Budget running low",
    desc: "Post Sonic 35th Anniversary Event Highlight Clips is 96% spent — join soon.",
    time: "1d ago"
  },
  {
    icon: Bell,
    color: "text-purple-600 bg-purple-100",
    title: "New campaign available",
    desc: "Talking-Head UGC [English] just launched with a $20,000 budget.",
    time: "12d ago"
  }
]

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <h1 className="text-2xl font-bold">Notifications</h1>

          <div className="space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3 p-4 border border-border rounded-xl">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                  <n.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
