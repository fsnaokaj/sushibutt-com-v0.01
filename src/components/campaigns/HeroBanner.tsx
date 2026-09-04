"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Campaign } from "@/types"
import { cn } from "@/utils"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { campaignTitle, rateLabel } from "@/utils/campaign"

export function HeroBanner({ campaigns }: { campaigns: Campaign[] }) {
  const [current, setCurrent] = useState(0)
  const { openModal } = useAppStore()
  const { t } = useI18n()

  useEffect(() => {
    const timer = setInterval(() => setCurrent((i) => (i + 1) % campaigns.length), 5000)
    return () => clearInterval(timer)
  }, [campaigns.length])

  const c = campaigns[current]
  if (!c) return null

  return (
    <div className="relative w-full overflow-hidden rounded-3xl" style={{ height: 320 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-400">
        {c.bannerUrl && (
          <Image src={c.bannerUrl} alt={campaignTitle(c, t)} fill className="object-cover opacity-35" priority />
        )}
      </div>
      <div className="starfield" aria-hidden>
        {["★", "✦", "🍣", "★", "☆", "🍣"].map((s, i) => (
          <span key={i} style={{ left: `${10 + i * 15}%`, top: `${16 + (i % 3) * 22}%`, animationDelay: `${i * 0.3}s` }}>{s}</span>
        ))}
      </div>
      <div className="relative h-full flex flex-col justify-end p-6 pb-8">
        <div className="flex items-center gap-2 mb-2 text-white/90 text-sm font-bold">
          <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">🍣</span>
          {c.agency} ★
        </div>
        <h2 className="text-white text-3xl font-extrabold mb-1 drop-shadow">{campaignTitle(c, t)}</h2>
        <p className="text-white/85 text-sm mb-4 font-medium">
          {t("category." + c.category)} · {rateLabel(c, t)} · ${(c.budgetTotal / 1000).toFixed(0)}K {t("campaign.budget")}
        </p>
        <button
          onClick={() => openModal(c)}
          className="w-fit px-5 py-2.5 bg-white text-primary rounded-full text-sm font-extrabold hover:scale-105 transition-transform"
        >
          {t("home.join")}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {campaigns.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={cn("h-1.5 rounded-full transition-all", i === current ? "bg-white w-5" : "bg-white/50 w-1.5")} />
        ))}
      </div>
      <button onClick={() => setCurrent((i) => (i - 1 + campaigns.length) % campaigns.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white">
        <ChevronLeft className="w-4 h-4 mx-auto" />
      </button>
      <button onClick={() => setCurrent((i) => (i + 1) % campaigns.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white">
        <ChevronRight className="w-4 h-4 mx-auto" />
      </button>
    </div>
  )
}
