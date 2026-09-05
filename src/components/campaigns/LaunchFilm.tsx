"use client"

import { useEffect, useRef } from "react"
import { withBasePath } from "@/utils"

const SCENES = [
  { id: "camels", src: "/hero/hero-camels.png", alt: "Camels crossing dusk dunes" },
  { id: "igloo", src: "/hero/hero-igloo.png", alt: "Igloo on a frozen pond hockey rink" },
  { id: "fans", src: "/hero/hero-fans.png", alt: "Arena crowd on their feet" },
  { id: "volcano", src: "/hero/hero-volcano.png", alt: "Volcano launch over an empty net" }
] as const

const LINES = [
  { at: 0.00, until: 0.18, kicker: "SushiButt presents", title: "THE BELT", sub: "" },
  { at: 0.20, until: 0.46, kicker: "Pond ice. Whole planet.", title: "COLDEST GAME", sub: "ON EARTH" },
  { at: 0.48, until: 0.70, kicker: "The crowd is the GM.", title: "FANS DECIDE", sub: "" },
  { at: 0.72, until: 1.00, kicker: "Empty net. All in.", title: "PULLED GOALIE", sub: "TO LAUNCH" }
]

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n))
}

function sceneAlpha(p: number, i: number, n: number) {
  const fade = 0.1
  const start = i / n
  const end = (i + 1) / n
  if (p < start - fade) return 0
  if (p > end + fade) return 0
  if (p < start) return clamp((p - (start - fade)) / fade)
  if (p > end) return clamp(1 - (p - end) / fade)
  return 1
}

function lineAlpha(p: number, at: number, until: number) {
  const fade = 0.045
  if (p < at || p > until) {
    if (p > at - fade && p < at) return (p - (at - fade)) / fade
    if (p > until && p < until + fade) return 1 - (p - until) / fade
    return 0
  }
  return 1
}

function scrollParent(el: HTMLElement) {
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const y = getComputedStyle(node).overflowY
    if (y === "auto" || y === "scroll") return node
    node = node.parentElement
  }
  return document.scrollingElement as HTMLElement
}

export function LaunchFilm() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const tickRefs = useRef<(HTMLButtonElement | null)[]>([])
  const kickerRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cueRef = useRef<HTMLParagraphElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])
  const progress = useRef(0)
  const auto = useRef(true)
  const last = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!track || !stage || !canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const flakes = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 0.4 + Math.random() * 1.8,
      v: 0.08 + Math.random() * 0.35,
      a: 0.15 + Math.random() * 0.5
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = stage.clientWidth * dpr
      canvas.height = stage.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    const parent = scrollParent(track)

    const readScroll = () => {
      const view = parent.clientHeight || window.innerHeight
      const span = Math.max(1, track.offsetHeight - view)
      return clamp(parent.scrollTop / span)
    }

    const paint = (p: number, now: number) => {
      SCENES.forEach((_, i) => {
        const node = sceneRefs.current[i]
        if (!node) return
        const a = sceneAlpha(p, i, SCENES.length)
        const drift = Math.sin(now / 4200 + i) * 1.2
        const zoom = 1.08 + p * 0.08 + i * 0.01
        node.style.opacity = String(a)
        node.style.transform = `scale(${zoom}) translate3d(${drift}%, ${-p * 2}%, 0)`
      })

      let best = LINES[0]
      let bestA = 0
      for (const line of LINES) {
        const a = lineAlpha(p, line.at, line.until)
        if (a > bestA) {
          bestA = a
          best = line
        }
      }
      if (kickerRef.current) {
        kickerRef.current.textContent = best.kicker
        kickerRef.current.style.opacity = String(bestA)
        kickerRef.current.style.transform = `translateY(${(1 - bestA) * 12}px)`
      }
      if (titleRef.current) {
        titleRef.current.textContent = best.title
        titleRef.current.style.opacity = String(bestA)
        titleRef.current.style.transform = `translateY(${(1 - bestA) * 28}px)`
      }
      if (subRef.current) {
        subRef.current.textContent = best.sub
        subRef.current.style.opacity = String(best.sub ? bestA : 0)
        subRef.current.style.transform = `translateY(${(1 - bestA) * 16}px)`
      }
      if (barRef.current) barRef.current.style.width = `${p * 100}%`
      const scene = Math.min(SCENES.length - 1, Math.floor(p * SCENES.length + 0.001))
      tickRefs.current.forEach((btn, i) => {
        if (!btn) return
        btn.style.background = i === scene ? "#fb7185" : "rgba(255,255,255,0.28)"
      })
      if (cueRef.current) {
        const cue = p < 0.08 ? 1 : clamp(1 - (p - 0.08) / 0.1)
        cueRef.current.style.opacity = String(cue)
        cueRef.current.style.visibility = cue < 0.05 ? "hidden" : "visible"
      }

      const w = stage.clientWidth
      const h = stage.clientHeight
      ctx.clearRect(0, 0, w, h)
      const snow = p > 0.18 && p < 0.72
      const ember = p > 0.62
      const sand = p < 0.28
      for (const f of flakes) {
        f.y += f.v * (ember ? 0.9 : 0.45) * 0.016
        f.x += (ember ? 0.0008 : sand ? 0.0016 : 0.0004) * f.s
        if (f.y > 1) f.y = 0
        if (f.x > 1) f.x = 0
        ctx.beginPath()
        if (ember) {
          ctx.fillStyle = `rgba(255, ${120 + f.s * 40}, 60, ${f.a * 0.7})`
          ctx.arc(f.x * w, f.y * h, f.s * 1.3, 0, Math.PI * 2)
        } else if (snow) {
          ctx.fillStyle = `rgba(255,255,255,${f.a * 0.85})`
          ctx.arc(f.x * w, f.y * h, f.s * 1.1, 0, Math.PI * 2)
        } else if (sand) {
          ctx.fillStyle = `rgba(255, 210, 160, ${f.a * 0.35})`
          ctx.arc(f.x * w, f.y * h, f.s * 0.7, 0, Math.PI * 2)
        } else continue
        ctx.fill()
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(48, now - (last.current || now))
      last.current = now
      if (reduced) {
        progress.current = 0.82
      } else if (auto.current) {
        progress.current = (progress.current + dt / 24000) % 1
        const scrolled = readScroll()
        if (scrolled > 0.02) {
          auto.current = false
          progress.current = scrolled
        }
      } else {
        progress.current = readScroll()
        if (parent.scrollTop <= 8) auto.current = true
      }
      paint(progress.current, now)
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (readScroll() > 0.02) auto.current = false
    }
    parent.addEventListener("scroll", onScroll, { passive: true })
    let raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [])

  const jump = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const parent = scrollParent(track)
    const view = parent.clientHeight || window.innerHeight
    const span = Math.max(1, track.offsetHeight - view)
    auto.current = false
    progress.current = (i + 0.42) / SCENES.length
    parent.scrollTo({ top: progress.current * span, behavior: "auto" })
  }

  return (
    <section ref={trackRef} className="launch-track" aria-label="Launch film">
      <div ref={stageRef} className="launch-stage">
        {SCENES.map((scene, i) => (
          <div
            key={scene.id}
            ref={(node) => { sceneRefs.current[i] = node }}
            className="launch-scene"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBasePath(scene.src)} alt={scene.alt} />
          </div>
        ))}
        <canvas ref={canvasRef} className="launch-wx" aria-hidden />
        <div className="launch-grade" aria-hidden />
        <div className="launch-grain" aria-hidden />
        <div className="launch-bars" aria-hidden />

        <div className="launch-copy">
          <p ref={kickerRef} className="launch-kicker">SushiButt presents</p>
          <h1 ref={titleRef} className="launch-title">THE BELT</h1>
          <p ref={subRef} className="launch-sub" />
        </div>

        <p ref={cueRef} className="launch-cue">Scroll to play</p>

        <div className="launch-player">
          <div className="launch-ticks">
            {SCENES.map((s, i) => (
              <button key={s.id} type="button" aria-label={s.alt} ref={(node) => { tickRefs.current[i] = node }} onClick={() => jump(i)} />
            ))}
          </div>
          <div className="launch-bar"><div ref={barRef} /></div>
        </div>
      </div>
    </section>
  )
}
