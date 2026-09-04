"use client"

import { AppShell } from "@/components/layout/AppShell"
import { useI18n } from "@/i18n/LanguageProvider"

export default function NotificationsPage() {
  const { t } = useI18n()
  const items = [
    [t("notify.n1t"), t("notify.n1d"), "🍱"],
    [t("notify.n2t"), t("notify.n2d"), "✅"],
    [t("notify.n3t"), t("notify.n3d"), "🌶️"],
    [t("notify.n4t"), t("notify.n4d"), "⭐"]
  ]
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-extrabold">{t("notify.title")}</h1>
        {items.map(([title, desc, emoji]) => (
          <div key={title} className="flex gap-3 p-4 border rounded-2xl bg-white">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">{emoji}</div>
            <div>
              <p className="font-extrabold text-sm">{title}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
