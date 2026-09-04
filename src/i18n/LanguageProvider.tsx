"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Locale } from "@/types"
import { messages, Messages } from "./messages"

type I18n = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string, vars?: Record<string, string | number>) => string
  m: Messages
}

const I18nContext = createContext<I18n | null>(null)

function lookup(obj: unknown, path: string): string | undefined {
  const val = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
  return typeof val === "string" ? val : undefined
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("sb-locale") as Locale | null
    if (saved && messages[saved]) setLocaleState(saved)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("sb-locale", l)
    document.documentElement.lang = l
  }

  const value = useMemo<I18n>(() => {
    const m = messages[locale]
    return {
      locale,
      setLocale,
      m,
      t: (path, vars) => {
        let s = lookup(m, path) ?? lookup(messages.en, path) ?? path
        if (vars) {
          for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v))
        }
        return s
      }
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider")
  return ctx
}
