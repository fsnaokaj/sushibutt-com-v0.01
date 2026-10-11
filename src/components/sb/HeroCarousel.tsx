"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

const SLIDES = [
  { art: "offer-puckgold-og", href: "/campaigns/pg-og-whop", alt: "PuckGold $36 OG Gold Puck + 1-year Premium League Pass" },
  { art: "offer-puckgold-premium", href: "/campaigns/pg-premium", alt: "Premium PuckGold membership — League Pass" },
  { art: "offer-puckgold-giveaway", href: "/campaigns/pg-giveaway", alt: "PuckGold Fan Zone giveaway" },
  { art: "fn-giveaway", href: "/campaigns/fn-giveaway", alt: "Fartnatics giveaway" },
  { art: "mb-friday", href: "/campaigns/mb-friday", alt: "Mystery Box Friday" },
  { art: "pg-yt-shorts", href: "/campaigns/pg-yt-shorts", alt: "PuckGold YouTube Shorts clip campaign" },
  { art: "offer-wine-detention", href: "/campaigns/wd-launch", alt: "Clip the Wine Detention launch (21+)" }
]

export function HeroCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SLIDES.length

  const go = useCallback((k: number) => {
    const el = ref.current
    if (!el) return
    const j = (k + n) % n
    el.scrollTo({ left: j * el.clientWidth, behavior: "smooth" })
  }, [n])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const on = () => setI(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
    el.addEventListener("scroll", on, { passive: true })
    return () => el.removeEventListener("scroll", on)
  }, [])

  useEffect(() => {
    if (paused) return
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const t = setInterval(() => go(i + 1), 5500)
    return () => clearInterval(t)
  }, [i, paused, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative isolate z-0 rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-pink-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={ref} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SLIDES.map((s, k) => (
          <Link key={s.art} href={s.href} className="relative shrink-0 w-full snap-start aspect-[8/3] block" aria-label={`${k + 1} of ${n}: ${s.alt}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/promo/${s.art}/hero.png`} alt={s.alt} width={1600} height={600} draggable={false}
              loading={k === 0 ? "eager" : "lazy"} fetchPriority={k === 0 ? "high" : "auto"}
              className="absolute inset-0 w-full h-full object-cover select-none" />
          </Link>
        ))}
      </div>
      <button type="button" aria-label="Previous" onClick={() => go(i - 1)}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow items-center justify-center text-xl font-black text-pink-600 hover:bg-white">‹</button>
      <button type="button" aria-label="Next" onClick={() => go(i + 1)}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow items-center justify-center text-xl font-black text-pink-600 hover:bg-white">›</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-white/80 px-2 py-1 backdrop-blur-sm">
        {SLIDES.map((s, k) => (
          <button key={s.art} type="button" aria-label={`Go to slide ${k + 1}`} aria-current={k === i}
            onClick={() => go(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-5 bg-pink-500" : "w-2 bg-pink-300"}`} />
        ))}
      </div>
    </section>
  )
}
