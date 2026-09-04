"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, User, Settings, Bell, TrendingUp, Trophy, Gift, LogIn, Plus } from "lucide-react"
import { cn } from "@/utils"
import { useI18n } from "@/i18n/LanguageProvider"
import { useAppStore } from "@/hooks/useStore"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const logout = useAppStore((s) => s.logout)

  const nav = [
    { icon: LayoutGrid, label: t("nav.campaigns"), href: "/" },
    { icon: Trophy, label: t("nav.leaderboard"), href: "/leaderboard" },
    { icon: Gift, label: t("nav.prizes"), href: "/prizes" },
    { icon: TrendingUp, label: t("nav.earnings"), href: "/earnings" },
    { icon: User, label: t("nav.profile"), href: "/profile" },
    { icon: Bell, label: t("nav.notifications"), href: "/notifications" },
    { icon: Settings, label: t("nav.settings"), href: "/settings" }
  ]

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-white/80 backdrop-blur h-screen sticky top-0 flex flex-col">
      <Link href="/" className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-lg shadow-sm">
          🍣
        </div>
        <div>
          <p className="font-extrabold text-base tracking-tight leading-none">SushiButt</p>
          <p className="text-[10px] text-primary font-bold tracking-wide">.com ★</p>
        </div>
      </Link>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-auto">
        {nav.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors",
                active ? "bg-primary text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <LanguageSwitcher />

      <div className="p-3 border-t border-border space-y-2">
        {user ? (
          <div className="px-2 text-xs">
            <p className="font-bold truncate">{user.name}</p>
            <p className="text-primary font-bold">{user.points} ★</p>
            <button onClick={logout} className="text-muted-foreground hover:text-foreground mt-1">{t("nav.logout")}</button>
          </div>
        ) : (
          <Link href="/join" className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-xl text-sm font-bold">
            <LogIn className="w-4 h-4" />
            {t("nav.join")}
          </Link>
        )}
        <Link href="/brand" className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-secondary rounded-xl text-sm font-bold hover:bg-accent">
          <Plus className="w-4 h-4" />
          {t("nav.list")}
        </Link>
      </div>
    </aside>
  )
}
