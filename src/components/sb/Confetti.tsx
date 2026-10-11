"use client"
import { useEffect, useState } from "react"
import { useAccount } from "@/lib/client/account"
import { MILESTONES, fmt } from "@/config/site"

/** Milestone celebration (100K / 500K / 1M ★) with CSS confetti. Each milestone shows once per device. */
export function MilestoneConfetti() {
  const { state } = useAccount()
  const [hit, setHit] = useState<number | null>(null)
  useEffect(() => {
    if (!state) return
    const seen = JSON.parse(localStorage.getItem("sb_ms") || "[]") as number[]
    const m = [...MILESTONES].reverse().find((x) => state.points >= x && !seen.includes(x))
    if (m) { localStorage.setItem("sb_ms", JSON.stringify([...seen, ...MILESTONES.filter((x) => x <= m)])); setHit(m) }
  }, [state])
  if (!hit) return null
  const colors = ["#ec4899", "#f59e0b", "#22c55e", "#38bdf8", "#a855f7", "#fb7185"]
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      <style>{`@keyframes sbfall{0%{transform:translateY(-10vh) rotate(0)}100%{transform:translateY(110vh) rotate(720deg)}}`}</style>
      {Array.from({ length: 90 }, (_, i) => (
        <span key={i} style={{ position: "absolute", left: `${(i * 37) % 100}%`, top: 0, width: 8, height: 14, background: colors[i % 6], borderRadius: 2, animation: `sbfall ${2.5 + (i % 7) * 0.3}s ${(i % 10) * 0.12}s linear forwards` }} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto" onClick={() => setHit(null)}>
        <div className="bg-white rounded-3xl border-4 border-primary px-8 py-6 text-center shadow-2xl">
          <p className="text-5xl">🎉</p>
          <p className="text-3xl font-extrabold text-primary">{fmt(hit)} ★ club!</p>
          <p className="text-sm text-muted-foreground mt-1">You crossed {fmt(hit)} points. Tap to keep farming.</p>
        </div>
      </div>
    </div>
  )
}
