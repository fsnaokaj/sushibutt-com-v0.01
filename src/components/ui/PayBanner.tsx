"use client"

import { useI18n } from "@/i18n/LanguageProvider"

export function PayBanner({ compact }: { compact?: boolean }) {
  const { t } = useI18n()
  return (
    <div className="rounded-2xl border border-primary/30 bg-pink-50 px-4 py-3">
      <p className="text-sm font-extrabold text-primary">{t("pay.soon")}</p>
      {!compact && <p className="text-xs text-muted-foreground mt-0.5">{t("pay.soonD")}</p>}
    </div>
  )
}
