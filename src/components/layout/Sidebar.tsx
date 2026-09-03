"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Scissors, LayoutGrid, User, Settings, Bell, TrendingUp, Plus } from "lucide-react"
import { cn } from "@/utils"

const NAV = [
  { icon: LayoutGrid, label: "Campaigns", href: "/" },
  { icon: TrendingUp, label: "My Earnings", href: "/earnings" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-card h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
          <Scissors className="w-4 h-4 text-background" />
        </div>
        <span className="font-bold text-lg tracking-tight">ClipFlow</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom - Start campaign */}
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-muted transition-colors">
          <Plus className="w-4 h-4" />
          List a Campaign
        </button>
      </div>
    </aside>
  )
}
