"use client"

import { AppShell } from "@/components/layout/AppShell"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import Link from "next/link"
import { beltTag } from "@/data/leaderboard"
import { PayBanner } from "@/components/ui/PayBanner"

export default function ProfilePage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl">🍣</div>
          <div>
            <h1 className="text-xl font-extrabold">{user?.name ?? t("profile.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("profile.member")}</p>
          </div>
        </div>
        {!user && <Link href="/join" className="inline-block px-5 py-2.5 bg-primary text-white rounded-full font-extrabold">{t("nav.join")}</Link>}
        {user && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border rounded-2xl p-4 bg-white">
              <p className="text-xs text-muted-foreground">{t("profile.role")}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {user.roles.map((r) => (
                  <span key={r} className="text-xs font-extrabold px-2 py-1 rounded-full bg-secondary">{t(`roles.${r}`)}</span>
                ))}
              </div>
            </div>
            <div className="border rounded-2xl p-4 bg-white">
              <p className="text-xs text-muted-foreground">{t("profile.points")}</p>
              <p className="font-extrabold text-primary">{user.points} ★</p>
            </div>
            <div className="border rounded-2xl p-4 bg-white sm:col-span-2">
              <p className="text-xs text-muted-foreground">{t("profile.publicTag")}</p>
              <p className="font-mono font-extrabold">{beltTag(user.id)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("profile.publicHint")}</p>
            </div>
          </div>
        )}
        <div>
          <h2 className="font-extrabold mb-3">{t("profile.payouts")}</h2>
          <PayBanner />
        </div>
      </div>
    </AppShell>
  )
}
