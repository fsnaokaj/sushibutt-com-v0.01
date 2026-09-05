"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { POINTS, useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { GOAL_IDS, GoalId, ROLE_IDS, RoleId } from "@/types"
import { cn } from "@/utils"
import { toggleItem } from "@/utils/user"

export default function JoinPage() {
  const { t } = useI18n()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const register = useAppStore((s) => s.register)
  const [step, setStep] = useState(0)
  const [roles, setRoles] = useState<RoleId[]>(["clipper"])
  const [goals, setGoals] = useState<GoalId[]>(["clip"])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user) router.push(user.roles.some((r) => r === "founder" || r === "brand") ? "/brand" : "/")
  }, [user, router])

  const pts = POINTS.onboard + roles.length * POINTS.role + goals.length * POINTS.goal

  const panels = useMemo(() => [
    {
      title: t("onboard.who"),
      hint: t("onboard.whoD"),
      body: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ROLE_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setRoles((r) => toggleItem(r, id))}
              className={cn(
                "py-3 px-2 rounded-2xl text-sm font-extrabold border text-left",
                roles.includes(id) ? "bg-primary text-white border-primary" : "bg-white"
              )}
            >
              {t(`roles.${id}`)}
            </button>
          ))}
        </div>
      )
    },
    {
      title: t("onboard.want"),
      hint: t("onboard.wantD"),
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {GOAL_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setGoals((g) => toggleItem(g, id))}
              className={cn(
                "py-3 px-3 rounded-2xl text-sm font-extrabold border text-left",
                goals.includes(id) ? "bg-primary text-white border-primary" : "bg-white"
              )}
            >
              {t(`goals.${id}`)}
            </button>
          ))}
        </div>
      )
    },
    {
      title: t("onboard.you"),
      hint: t("onboard.youD"),
      body: (
        <div className="space-y-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.name")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.email")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <input type="password" placeholder={t("auth.password")} className="w-full px-3 py-2 border rounded-xl bg-white" />
          <p className="text-sm font-bold text-primary">{t("onboard.pts", { n: pts })}</p>
        </div>
      )
    }
  ], [t, roles, goals, name, email, pts])

  const panel = panels[step]
  const canNext =
    (step === 0 && roles.length > 0) ||
    (step === 1 && goals.length > 0) ||
    (step === 2 && name.trim() && email.trim())

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
        <div>
          <p className="text-4xl mb-2">🍣 ★</p>
          <h1 className="text-2xl font-extrabold">{t("auth.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("auth.subtitle")}</p>
        </div>
        <div className="flex gap-1">
          {panels.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-secondary")} />
          ))}
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (step < 2) {
              if (!canNext) return
              setStep(step + 1)
              return
            }
            if (!canNext) return
            register({ name, email, roles, goals })
            router.push(roles.some((r) => r === "founder" || r === "brand") ? "/brand" : "/")
          }}
        >
          <div>
            <h2 className="font-extrabold text-lg">{panel.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{panel.hint}</p>
          </div>
          {panel.body}
          {!canNext && step < 2 && (
            <p className="text-xs text-muted-foreground">{step === 0 ? t("onboard.needRole") : t("onboard.needGoal")}</p>
          )}
          <div className="flex gap-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="flex-1 py-3 border rounded-full font-extrabold">
                {t("onboard.back")}
              </button>
            )}
            <button type="submit" disabled={!canNext} className="flex-1 py-3 bg-primary text-white rounded-full font-extrabold disabled:opacity-50">
              {step === 2 ? t("onboard.done") : t("onboard.next")}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
