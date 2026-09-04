"use client"

import { AppShell } from "@/components/layout/AppShell"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"

export default function SettingsPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-extrabold">{t("settings.title")}</h1>
        <div className="border rounded-2xl p-4 bg-white space-y-3">
          <h2 className="font-extrabold text-sm">{t("settings.language")}</h2>
          <LanguageSwitcher />
        </div>
        <div className="border rounded-2xl p-4 bg-white space-y-3">
          <h2 className="font-extrabold text-sm">{t("settings.account")}</h2>
          <label className="block text-xs text-muted-foreground">{t("settings.display")}
            <input defaultValue={user?.name} className="w-full mt-1 px-3 py-2 border rounded-xl" />
          </label>
          <label className="block text-xs text-muted-foreground">{t("settings.email")}
            <input defaultValue={user?.email} className="w-full mt-1 px-3 py-2 border rounded-xl" />
          </label>
        </div>
        <div className="border rounded-2xl p-4 bg-white space-y-2">
          <h2 className="font-extrabold text-sm">{t("settings.notes")}</h2>
          <label className="flex justify-between text-sm"><span>{t("settings.n1")}</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between text-sm"><span>{t("settings.n2")}</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between text-sm"><span>{t("settings.n3")}</span><input type="checkbox" /></label>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white rounded-full font-extrabold">{t("settings.save")}</button>
      </div>
    </AppShell>
  )
}
