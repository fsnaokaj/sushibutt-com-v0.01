"use client"

import { AppShell } from "@/components/layout/AppShell"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import Link from "next/link"

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
              <p className="font-extrabold">{t(`auth.${user.role}`)}</p>
            </div>
            <div className="border rounded-2xl p-4 bg-white">
              <p className="text-xs text-muted-foreground">{t("profile.points")}</p>
              <p className="font-extrabold text-primary">{user.points} ★</p>
            </div>
          </div>
        )}
        <div>
          <h2 className="font-extrabold mb-3">{t("profile.payouts")}</h2>
          <div className="border rounded-2xl p-4 bg-white space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("profile.method")}</span><span>PayPal</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("profile.min")}</span><span>$50.00</span></div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
