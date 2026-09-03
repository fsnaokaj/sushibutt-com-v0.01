"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Campaign } from "@/types"
import { cn } from "@/utils"
import { useAppStore } from "@/hooks/useStore"

interface HeroBannerProps {
  campaigns: Campaign[]
}

export function HeroBanner({ campaigns }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)
  const { openModal } = useAppStore()

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % campaigns.length)
    }, 5000)
    return () => clearInterval(t)
  }, [campaigns.length])

  const c = campaigns[current]
  if (!c) return null

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "340px" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
        {c.bannerUrl && (
          <Image
            src={c.bannerUrl}
            alt={c.title}
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 pb-8">
        {/* Agency badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs text-white font-bold">
            {c.agency[0]}
          </div>
          <span className="text-white/80 text-sm">{c.agency}</span>
          {c.agencyVerified && <span className="text-yellow-400">✓</span>}
        </div>

        <h2 className="text-white text-2xl font-bold mb-1">{c.title}</h2>

        <p className="text-white/70 text-sm mb-4">
          {c.category} · ${c.cpm}/1K views · ${(c.budgetTotal / 1000).toFixed(0)}K budget
        </p>

        <button
          onClick={() => openModal(c)}
          className="w-fit px-5 py-2.5 bg-white text-foreground rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          Join Campaign
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {campaigns.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              i === current ? "bg-white w-4" : "bg-white/40"
            )}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrent((i) => (i - 1 + campaigns.length) % campaigns.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((i) => (i + 1) % campaigns.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
