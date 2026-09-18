"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Trophy, TrendingUp, User } from "lucide-react"
import { cn } from "@/utils"
import { useI18n } from "@/i18n/LanguageProvider"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useI18n()
  const items = [
    { href: "/", label: t("nav.campaigns"), icon: LayoutGrid },
    { href: "/leaderboard", label: t("nav.board"), icon: Trophy },
    { href: "/earnings", label: t("nav.earn"), icon: TrendingUp },
    { href: "/profile", label: t("nav.profile"), icon: User }
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-[10px] font-extrabold",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
