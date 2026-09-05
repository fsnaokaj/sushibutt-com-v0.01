export type GemId = "champion" | "champagne" | "ruby" | "sapphire" | "platinum"

export function gemForRank(rank: number): { id: GemId; label: string; emoji: string; range: string } {
  if (rank === 1) return { id: "champion", label: "Champion", emoji: "👑", range: "#1" }
  if (rank <= 8) return { id: "champagne", label: "Champagne", emoji: "🥂", range: "#2–8" }
  if (rank <= 33) return { id: "ruby", label: "Ruby", emoji: "♦️", range: "#9–33" }
  if (rank <= 66) return { id: "sapphire", label: "Sapphire", emoji: "💠", range: "#34–66" }
  return { id: "platinum", label: "Platinum", emoji: "⚪", range: "#67–99" }
}

export function gemBand(rank: number): "champagne" | "ruby" | "sapphire" | "platinum" {
  if (rank <= 8) return "champagne"
  if (rank <= 33) return "ruby"
  if (rank <= 66) return "sapphire"
  return "platinum"
}

/** Public alias that cannot be reverse-mapped to a person. */
export function beltTag(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const code = (h >>> 0).toString(36).toUpperCase().slice(0, 3).padStart(3, "X")
  return `Belt · ${code}`
}

function pts(rank: number) {
  return Math.round(16200 - (rank - 1) * 148 + ((rank * 17) % 41))
}

export const boardSeats = Array.from({ length: 99 }, (_, i) => {
  const rank = i + 1
  return {
    rank,
    tag: beltTag(`seat-${rank}-v1`),
    points: pts(rank),
    gem: gemForRank(rank)
  }
})
