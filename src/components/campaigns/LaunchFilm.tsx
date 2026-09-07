"use client"

import { useEffect, useRef, useState } from "react"
import { campaigns } from "@/data/campaigns"
import { useAppStore } from "@/hooks/useStore"
import { withBasePath } from "@/utils"

const PROMOS = [
  { id: "camels", src: "/hero/hero-camels.png", emoji: "🐫", kicker: "🍣 DROP", title: "THE BELT", cta: "CLIP IT", campaignId: "official-open" },
  { id: "igloo", src: "/hero/hero-igloo.png", emoji: "🧊", kicker: "POND ICE", title: "COLDEST GAME", cta: "GO CRAZY", campaignId: "launch-film" },
  { id: "fans", src: "/hero/hero-fans.png", emoji: "📣", kicker: "U DECIDE", title: "FANS OWN IT", cta: "FOLLOW", campaignId: "follow-quest" },
  { id: "volcano", src: "/hero/hero-volcano.png", emoji: "🌋", kicker: "ALL IN", title: "PULLED GOALIE", cta: "DAILY", campaignId: "daily-belt" }
] as const

export function LaunchFilm() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const paused = useRef(false)
  const [active, setActive] = useState(0)
  const openModal = useAppStore((s) => s.openModal)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      if (paused.current) return
      setActive((i) => (i + 1) % PROMOS.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    const card = cardRefs.current[active]
    if (!scroller || !card) return
    scroller.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
  }, [active])

  return (
    <section
      className="promo-rail"
      aria-roledescription="carousel"
      aria-label="Promo banners"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onTouchStart={() => { paused.current = true }}
    >
      <div ref={scrollerRef} className="promo-scroller">
        {PROMOS.map((promo, i) => (
          <button
            key={promo.id}
            ref={(node) => {
              cardRefs.current[i] = node
            }}
            type="button"
            className={i === active ? "promo-tile is-on" : "promo-tile"}
            aria-label={`${promo.title}. ${promo.kicker}`}
            onClick={() => {
              const campaign = campaigns.find((item) => item.id === promo.campaignId)
              if (campaign) openModal(campaign)
            }}
          >
            <span className="promo-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath(promo.src)} alt="" />
              <span className="promo-emoji" aria-hidden>{promo.emoji}</span>
            </span>
            <span className="promo-copy">
              <span className="promo-kicker">{promo.kicker}</span>
              <span className="promo-title">{promo.title}</span>
            </span>
            <span className="promo-cta" aria-hidden>{promo.cta}</span>
          </button>
        ))}
      </div>
      <div className="promo-dots">
        {PROMOS.map((promo, i) => (
          <button
            key={promo.id}
            type="button"
            aria-label={`Show ${promo.title}`}
            aria-current={i === active ? "true" : undefined}
            className={i === active ? "is-on" : undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}
