"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, User, Settings, Bell, TrendingUp, Trophy, Gift, LogIn, Plus, Tag, Disc3, Target, Megaphone } from "lucide-react"
import { cn } from "@/utils"
import { useI18n } from "@/i18n/LanguageProvider"
import { useAppStore } from "@/hooks/useStore"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { BrandMark } from "./BrandMark"

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const logout = useAppStore((s) => s.logout)

  const nav = [
    { icon: LayoutGrid, label: t("nav.campaigns"), href: "/" },
    { icon: Tag, label: "Offers", href: "/offers" },
    { icon: Target, label: "Quests", href: "/quests" },
    { icon: Disc3, label: "Spin", href: "/spin" },
    { icon: Trophy, label: t("nav.leaderboard"), href: "/leaderboard" },
    { icon: Gift, label: t("nav.prizes"), href: "/prizes" },
    { icon: TrendingUp, label: t("nav.earnings"), href: "/earnings" },
    { icon: User, label: t("nav.profile"), href: "/profile" },
    { icon: Bell, label: t("nav.notifications"), href: "/notifications" },
    { icon: Settings, label: t("nav.settings"), href: "/settings" },
    { icon: Megaphone, label: "Sponsors", href: "/sponsors" }
  ]

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-white/80 backdrop-blur h-full flex flex-col">
      <div className="px-3 py-4 border-b border-border">
        <BrandMark />
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-auto">
        {nav.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
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
          <Link href="/profile" onClick={onNavigate} className="flex items-center gap-2 px-2">
            <AvatarMark id={user.avatarId} size={32} />
            <div className="min-w-0 text-xs">
              <p className="font-bold truncate">@{user.handle || user.name}</p>
              <p className="text-primary font-bold">{user.points.toLocaleString("en-US")} ★</p>
            </div>
          </Link>
        ) : (
          <Link href="/join" onClick={onNavigate} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-xl text-sm font-bold">
            <LogIn className="w-4 h-4" />
            {t("nav.join")}
          </Link>
        )}
        {user ? (
          <button onClick={() => { logout(); onNavigate?.() }} className="w-full text-left px-2 text-xs text-muted-foreground hover:text-foreground">{t("nav.logout")}</button>
        ) : null}
        <Link href="/brand" onClick={onNavigate} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-secondary rounded-xl text-sm font-bold hover:bg-accent">
          <Plus className="w-4 h-4" />
          {t("nav.list")}
        </Link>
      </div>
    </aside>
  )
}
