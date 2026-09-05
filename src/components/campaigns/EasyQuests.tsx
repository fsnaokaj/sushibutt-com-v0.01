"use client"

import { POINTS, FOLLOW_QUESTS, SHARE_QUEST } from "@/data/quests"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { useRouter } from "next/navigation"
import { cn } from "@/utils"

const NET: Record<string, string> = { x: "X", instagram: "Instagram", tiktok: "TikTok" }

export function EasyQuests({ compact }: { compact?: boolean }) {
  const { t } = useI18n()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const claimed = useAppStore((s) => s.claimedQuests)
  const claimQuest = useAppStore((s) => s.claimQuest)
  const checkin = useAppStore((s) => s.checkin)
  const checkedIn = user?.lastCheckin === new Date().toISOString().slice(0, 10)

  const run = (id: string, pts: number, href: string) => {
    if (!user) {
      router.push("/join")
      return
    }
    window.open(href, "_blank", "noopener,noreferrer")
    claimQuest(id, pts)
  }

  return (
    <section className="bg-white border rounded-3xl p-5 space-y-4">
      <div>
        <p className="text-xs font-extrabold tracking-widest uppercase text-primary">{t("quests.kicker")}</p>
        <h2 className="text-xl font-extrabold">{t("quests.title")}</h2>
        {!compact && <p className="text-sm text-muted-foreground mt-1">{t("quests.subtitle")}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <button
          type="button"
          disabled={checkedIn}
          onClick={() => {
            if (!user) {
              router.push("/join")
              return
            }
            checkin()
          }}
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left sm:col-span-2",
            checkedIn ? "bg-pink-50 border-primary/30 opacity-80" : "bg-white hover:border-primary"
          )}
        >
          <span className="font-extrabold">{t("quests.checkin")}</span>
          <span className="text-sm font-extrabold text-primary">{checkedIn ? t("quests.done") : `+${POINTS.checkin} ★`}</span>
        </button>
        {FOLLOW_QUESTS.map((q) => {
          const done = !!claimed[q.id]
          return (
            <button
              key={q.id}
              type="button"
              disabled={done}
              onClick={() => run(q.id, q.pts, q.href)}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left",
                done ? "bg-pink-50 border-primary/30 opacity-80" : "bg-white hover:border-primary"
              )}
            >
              <span>
                <span className="block text-xs text-muted-foreground">{NET[q.network]}</span>
                <span className="font-extrabold">@{q.handle}</span>
              </span>
              <span className="text-sm font-extrabold text-primary">{done ? t("quests.done") : `+${q.pts} ★`}</span>
            </button>
          )
        })}
        <button
          type="button"
          disabled={!!claimed[SHARE_QUEST.id]}
          onClick={() => run(SHARE_QUEST.id, SHARE_QUEST.pts, SHARE_QUEST.href)}
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left sm:col-span-2",
            claimed[SHARE_QUEST.id] ? "bg-pink-50 border-primary/30 opacity-80" : "bg-white hover:border-primary"
          )}
        >
          <span>
            <span className="block text-xs text-muted-foreground">X</span>
            <span className="font-extrabold">{t("quests.share")}</span>
          </span>
          <span className="text-sm font-extrabold text-primary">{claimed[SHARE_QUEST.id] ? t("quests.done") : `+${SHARE_QUEST.pts} ★`}</span>
        </button>
      </div>
      <p className="text-xs text-muted-foreground">{t("quests.table", { follow: POINTS.follow, join: POINTS.join, submit: POINTS.submit, onboard: POINTS.onboard })}</p>
    </section>
  )
}
