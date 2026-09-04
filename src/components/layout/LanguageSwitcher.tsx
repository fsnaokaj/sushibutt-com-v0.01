"use client"

import { useI18n } from "@/i18n/LanguageProvider"
import { LOCALES, LOCALE_LABELS } from "@/i18n/messages"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <label className="block px-2 pb-2">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        className="w-full text-xs bg-secondary border border-border rounded-lg px-2 py-1.5 outline-none"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>{LOCALE_LABELS[l]}</option>
        ))}
      </select>
    </label>
  )
}
