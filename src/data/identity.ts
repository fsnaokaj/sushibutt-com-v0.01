export const AVATARS = [
  { id: "sushi", emoji: "🍣", bg: "#ec4899" },
  { id: "camel", emoji: "🐫", bg: "#f59e0b" },
  { id: "ice", emoji: "🧊", bg: "#38bdf8" },
  { id: "volcano", emoji: "🌋", bg: "#ef4444" },
  { id: "horn", emoji: "📣", bg: "#a855f7" },
  { id: "crown", emoji: "👑", bg: "#fbbf24" },
  { id: "ninja", emoji: "🥷", bg: "#111827" },
  { id: "cat", emoji: "🐱", bg: "#fb7185" },
  { id: "frog", emoji: "🐸", bg: "#22c55e" },
  { id: "alien", emoji: "👽", bg: "#84cc16" },
  { id: "ghost", emoji: "👻", bg: "#94a3b8" },
  { id: "shark", emoji: "🦈", bg: "#0ea5e9" },
  { id: "fire", emoji: "🔥", bg: "#f97316" },
  { id: "rice", emoji: "🍙", bg: "#f472b6" },
  { id: "puck", emoji: "🏒", bg: "#334155" },
  { id: "star", emoji: "⭐", bg: "#e11d48" }
] as const

export type AvatarId = (typeof AVATARS)[number]["id"]

const ADJ = ["cold", "wasabi", "nigiri", "belt", "chaotic", "spicy", "frozen", "pulled", "lucky", "feral", "tiny", "loud", "pink", "night"]
const NOUN = ["camel", "igloo", "goalie", "nigiri", "goblin", "guppy", "fan", "puck", "rice", "butt", "clip", "shark", "roll", "drop"]

function hash(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return h >>> 0
}

export function sanitizeHandle(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .replace(/^[._]+|[._]+$/g, "")
    .slice(0, 20)
}

export function generateHandle(seed = `${Date.now()}_${Math.random()}`) {
  const h = hash(seed)
  const adj = ADJ[h % ADJ.length]
  const noun = NOUN[(h >>> 8) % NOUN.length]
  const n = (h % 90) + 8
  const styles = [`${adj}${noun}${n}`, `${noun}_${adj}`, `${adj}.${noun}${n % 10}`, `${noun}${n}`]
  return sanitizeHandle(styles[h % styles.length]) || `belt${n}`
}

export function randomHandle() {
  return generateHandle(`${Date.now()}_${Math.random()}_${Math.random()}`)
}

export function avatarFromSeed(seed: string): AvatarId {
  return AVATARS[hash(seed) % AVATARS.length].id
}

export function randomAvatarId(): AvatarId {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)].id
}

export function nextAvatarId(id?: string): AvatarId {
  const i = AVATARS.findIndex((a) => a.id === id)
  return AVATARS[(i + 1) % AVATARS.length].id
}

export function getAvatar(id?: string) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]
}

export function displayNameFromHandle(handle: string) {
  return handle.replace(/[._]/g, " ").replace(/\d+$/, "").trim() || handle
}

export function hydrateIdentity<T extends { id?: string; name?: string; handle?: string; avatarId?: string; bio?: string; privateAccount?: boolean }>(user: T): T & { handle: string; avatarId: string; bio: string; privateAccount: boolean; name: string } {
  const handle = sanitizeHandle(user.handle || "") || generateHandle(user.id || user.name || "belt")
  return {
    ...user,
    handle,
    avatarId: user.avatarId || avatarFromSeed(user.id || handle),
    bio: user.bio ?? "",
    privateAccount: user.privateAccount ?? false,
    name: (user.name || "").trim() || displayNameFromHandle(handle)
  }
}
