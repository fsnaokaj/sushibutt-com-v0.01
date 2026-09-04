"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { UserRole } from "@/types"
import { cn } from "@/utils"

export default function JoinPage() {
  const { t } = useI18n()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const register = useAppStore((s) => s.register)
  const [role, setRole] = useState<UserRole>("clipper")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user) router.push(user.role === "brand" ? "/brand" : "/")
  }, [user, router])

  return (
    <AppShell>
      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <div>
          <p className="text-4xl mb-2">🍣 ★</p>
          <h1 className="text-2xl font-extrabold">{t("auth.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("auth.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["clipper", "brand"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn("py-3 rounded-2xl font-extrabold border", role === r ? "bg-primary text-white border-primary" : "bg-white")}
            >
              {t(`auth.${r}`)}
            </button>
          ))}
        </div>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            register({ name: name || "Star Roll", email, role })
            router.push(role === "brand" ? "/brand" : "/")
          }}
        >
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.name")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.email")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <input required type="password" placeholder={t("auth.password")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <button className="w-full py-3 bg-primary text-white rounded-full font-extrabold">{t("auth.register")}</button>
        </form>
      </div>
    </AppShell>
  )
}
