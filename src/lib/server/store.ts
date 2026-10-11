import { randomInt } from "node:crypto"
import { redisCmd, redisPipeline } from "./redis"
import { RULES, WELCOME_WHEEL, DAILY_WHEEL, LINK_SLOTS, INVITE_LADDER, STREAKS, streakMult, viewPoints } from "@/config/site"
import { BRAND_CAMPAIGNS, ALL_FOLLOWS } from "@/config/campaigns"
import { generateHandle, sanitizeHandle, randomAvatarId, AVATARS } from "@/data/identity"

/**
 * Keys:  user:<sub> hash · handle:<h> -> sub · og:counter · lb zset (points) · claims:<sub> set
 *        clip:<id> hash · clips:pending / clips:all list · clips:user:<sub> list · listings list · notif:<sub> list
 */
export const uk = (sub: string) => `user:${sub}`
const today = () => new Date().toISOString().slice(0, 10)

/** ISO-ish week key (UTC, weeks start Monday). */
export function weekKey(t = Date.now()) {
  const d = new Date(t); const day = (d.getUTCDay() + 6) % 7
  const mon = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day))
  return mon.toISOString().slice(0, 10)
}
export async function award(sub: string, pts: number, note: string, campaign?: string) {
  if (pts <= 0) return
  await redisPipeline([
    ["HINCRBY", uk(sub), "points", pts],
    ["ZINCRBY", "lb", pts, sub],
    ["ZINCRBY", `lb:week:${weekKey()}`, pts, sub],
    ["EXPIRE", `lb:week:${weekKey()}`, 60 * 864e2],
    ...(campaign ? [["ZINCRBY", `lb:camp:${campaign}`, pts, sub]] : []),
    ["LPUSH", `notif:${sub}`, JSON.stringify({ t: Date.now(), pts, note })],
    ["LTRIM", `notif:${sub}`, 0, 49]
  ])
}

/** One-time claim guard. Returns true the first time only. */
async function once(sub: string, key: string) {
  return Number(await redisCmd(["SADD", `claims:${sub}`, key])) === 1
}

async function claimHandle(sub: string, h: string) {
  const got = await redisCmd(["SET", `handle:${h}`, sub, "NX"])
  if (got !== "OK" && (await redisCmd(["GET", `handle:${h}`])) !== sub) return false
  return true
}

/** Create on first call (OG # in signup order, random handle + avatar). Returns isNew. */
export async function touch(sub: string, email?: string, ref?: string) {
  if (await redisCmd(["HEXISTS", uk(sub), "og"])) return false
  if (Number(await redisCmd(["HSETNX", uk(sub), "creating", 1])) === 0) return false
  const og = await redisCmd(["INCR", "og:counter"])
  let handle = ""
  for (let i = 0; i < 8 && !handle; i++) {
    const h = sanitizeHandle(generateHandle(`${sub}_${i}_${Math.random()}`))
    if (h.length >= 3 && (await claimHandle(sub, h))) handle = h
  }
  await redisCmd(["HSET", uk(sub), "og", og as number, "handle", handle, "avatar", randomAvatarId(), "points", 0,
    "createdAt", new Date().toISOString(), "welcomeSpin", "ready", ...(email ? ["email", email] : [])])
  await redisCmd(["ZADD", "lb", 0, sub])
  await award(sub, RULES.onboard, "Welcome to the belt (onboard)")
  const inviter = ref ? ((await redisCmd(["GET", `handle:${sanitizeHandle(ref)}`])) as string | null) : null
  if (inviter && inviter !== sub) {
    await redisCmd(["HSET", uk(sub), "invitedBy", inviter])
    await award(sub, RULES.inviteInvitee, "Joined with an invite")
    await award(inviter, RULES.inviteInviter, `Invite bonus: @${handle} joined`)
    const n = Number(await redisCmd(["HINCRBY", uk(inviter), "invites", 1]))
    for (const step of INVITE_LADDER) if (n >= step.friends && (await once(inviter, `ladder:${step.friends}`))) await award(inviter, step.bonus, `Invite ladder: ${step.friends} friend${step.friends > 1 ? "s" : ""} joined`)
  }
  return true
}

export type State = {
  og: number; handle: string; avatar: string; points: number; rank: number | null; invites: number
  welcomeSpin: string; checkedInToday: boolean; dailySpun: boolean; chestOpened: boolean; streak: number; verifyCode: string; verified: Record<string, string>; claims: string[]; links: Record<string, string>; bio: string
}

export async function readState(sub: string): Promise<State> {
  const [h, claims, rank] = (await redisPipeline([["HGETALL", uk(sub)], ["SMEMBERS", `claims:${sub}`], ["ZREVRANK", "lb", sub]])) as [string[], string[], number | null]
  const m: Record<string, string> = {}
  for (let i = 0; i < (h || []).length; i += 2) m[h[i]] = h[i + 1]
  const links: Record<string, string> = {}
  for (const s of LINK_SLOTS) if (m[`link:${s}`]) links[s] = m[`link:${s}`]
  return {
    og: Number(m.og || 0), handle: m.handle || "", avatar: m.avatar || "sushi", points: Number(m.points || 0),
    rank: rank == null ? null : rank + 1, invites: Number(m.invites || 0), welcomeSpin: m.welcomeSpin || "done",
    checkedInToday: m.lastCheckin === today(), dailySpun: m.lastDailySpin === today(), chestOpened: (claims || []).includes(`chest:${today()}`),
    streak: m.lastCheckin === today() || m.lastCheckin === new Date(Date.now() - 864e5).toISOString().slice(0, 10) ? Number(m.streak || 0) : 0,
    verifyCode: m.verifyCode || "", verified: Object.fromEntries(LINK_SLOTS.filter((x) => m[`verify:${x}`]).map((x) => [x, m[`verify:${x}`]])), claims: claims || [], links, bio: m.bio || ""
  }
}

export async function setProfile(sub: string, p: { handle?: string; avatar?: string; bio?: string; reroll?: boolean }) {
  const cur = (await redisCmd(["HGET", uk(sub), "handle"])) as string
  let h = p.handle !== undefined ? sanitizeHandle(p.handle) : undefined
  if (p.reroll) h = sanitizeHandle(generateHandle(`${sub}_${Math.random()}`))
  if (h !== undefined && h !== cur) {
    if (h.length < 3) throw Object.assign(new Error("invalid_handle"), { status: 400 })
    if (!(await claimHandle(sub, h))) throw Object.assign(new Error("taken"), { status: 409 })
    await redisCmd(["HSET", uk(sub), "handle", h])
    if (cur) await redisCmd(["DEL", `handle:${cur}`])
  }
  if (p.reroll && !p.avatar) p.avatar = randomAvatarId()
  if (p.avatar && AVATARS.some((a) => a.id === p.avatar)) await redisCmd(["HSET", uk(sub), "avatar", p.avatar])
  if (p.bio !== undefined) await redisCmd(["HSET", uk(sub), "bio", String(p.bio).slice(0, 80)])
}

function pick(w: { value: number; weight: number }[]) {
  const total = w.reduce((a, s) => a + s.weight, 0)
  let r = randomInt(total)
  for (let i = 0; i < w.length; i++) { if (r < w[i].weight) return i; r -= w[i].weight }
  return 0
}
export async function dailySpin(sub: string) {
  const ok = await redisCmd(["EVAL", "if redis.call('HGET',KEYS[1],'lastDailySpin')==ARGV[1] then return 0 end redis.call('HSET',KEYS[1],'lastDailySpin',ARGV[1]) return 1", 1, uk(sub), today()])
  if (Number(ok) !== 1) return null
  const seg = pick(DAILY_WHEEL)
  await award(sub, DAILY_WHEEL[seg].value, `Daily spin: +${DAILY_WHEEL[seg].value.toLocaleString("en-US")} ★`)
  return { segment: seg, value: DAILY_WHEEL[seg].value }
}

/* ---------- Bio-code verification: user puts the code in their bio, admin confirms ---------- */
export async function requestVerify(sub: string, slot: string) {
  const h = (await redisCmd(["HGET", uk(sub), `link:${slot}`])) as string | null
  if (!h) throw Object.assign(new Error("link_first"), { status: 400 })
  let code = (await redisCmd(["HGET", uk(sub), "verifyCode"])) as string | null
  if (!code) { code = `SB-${randomInt(36 ** 5).toString(36).toUpperCase().padStart(5, "0")}`; await redisCmd(["HSET", uk(sub), "verifyCode", code]) }
  const handle = (await redisCmd(["HGET", uk(sub), "handle"])) as string
  await redisCmd(["HSET", "verify:queue", `${sub}|${slot}`, JSON.stringify({ sub, slot, social: h, handle, code, at: Date.now() })])
  return code
}
export async function listVerify() {
  const raw = ((await redisCmd(["HGETALL", "verify:queue"])) as string[]) || []
  const out = []
  for (let i = 0; i < raw.length; i += 2) out.push({ key: raw[i], ...JSON.parse(raw[i + 1]) })
  return out
}
export async function decideVerify(key: string, approve: boolean) {
  const raw = (await redisCmd(["HGET", "verify:queue", key])) as string | null
  if (!raw) return false
  const v = JSON.parse(raw) as { sub: string; slot: string; social: string }
  await redisCmd(["HDEL", "verify:queue", key])
  if (approve) {
    await redisCmd(["HSET", uk(v.sub), `verify:${v.slot}`, v.social])
    if (await once(v.sub, `verify:${v.slot}`)) await award(v.sub, RULES.verify, `Verified ${v.slot} @${v.social}`)
  } else await redisCmd(["LPUSH", `notif:${v.sub}`, JSON.stringify({ t: Date.now(), pts: 0, note: `Couldn't verify ${v.slot} — put your code in your bio and try again` })])
  return true
}

/** Whop purchase bonus — called only by the (future) Whop webhook. Adds POINTS ONLY, never giveaway entries. */
export async function purchaseBonus(sub: string, orderId: string) {
  if (Number(await redisCmd(["SADD", "whop:orders", orderId])) === 0) return 0
  await award(sub, RULES.purchaseBonus, "Purchase bonus (points only)")
  return RULES.purchaseBonus
}

export async function welcomeSpin(sub: string) {
  const seg = pick(WELCOME_WHEEL)
  // atomically consume: only one caller flips ready -> done
  const flipped = await redisCmd(["EVAL", "if redis.call('HGET',KEYS[1],'welcomeSpin')=='ready' then redis.call('HSET',KEYS[1],'welcomeSpin','done') return 1 end return 0", 1, uk(sub)])
  if (Number(flipped) !== 1) return null
  await award(sub, WELCOME_WHEEL[seg].value, `Welcome Spin: +${WELCOME_WHEEL[seg].value.toLocaleString("en-US")} ★`)
  return { segment: seg, value: WELCOME_WHEEL[seg].value }
}

export async function claimQuest(sub: string, kind: string, id?: string) {
  if (kind === "checkin") {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
    const r = await redisCmd(["EVAL", "if redis.call('HGET',KEYS[1],'lastCheckin')==ARGV[1] then return -1 end local st=1 if redis.call('HGET',KEYS[1],'lastCheckin')==ARGV[2] then st=tonumber(redis.call('HGET',KEYS[1],'streak') or '0')+1 end redis.call('HSET',KEYS[1],'lastCheckin',ARGV[1],'streak',st) return st", 1, uk(sub), today(), y])
    const streak = Number(r)
    if (streak < 0) return 0
    const pts = Math.round(RULES.checkin * streakMult(streak))
    await award(sub, pts, `Daily check-in · day ${streak} streak${streakMult(streak) > 1 ? ` (${streakMult(streak)}x)` : ""}`)
    for (const t of STREAKS) if (streak >= t.days && (await once(sub, `streak:${t.days}:${Math.floor((streak - t.days) / 1000)}`))) await award(sub, t.bonus, `${t.days}-day farming streak bonus`)
    return pts
  }
  if (kind === "chest") {
    const [lc, ld] = (await redisCmd(["HMGET", uk(sub), "lastCheckin", "lastDailySpin"])) as string[]
    if (lc !== today() || ld !== today()) throw Object.assign(new Error("chest_locked"), { status: 409 })
    if (!(await once(sub, `chest:${today()}`))) return 0
    await award(sub, RULES.dailyChest, "Daily chest opened"); return RULES.dailyChest
  }
  if (kind === "follow") {
    const nid = String(id || "").replace(/^ig-/, "instagram-").replace(/^tt-/, "tiktok-")
    const f = ALL_FOLLOWS.find((x) => x.id === nid); if (!f) return -1
    if (!(await once(sub, `follow:${f.id}`))) return 0
    await award(sub, RULES.follow, `Followed ${f.net} @${f.handle} (self-reported)`); return RULES.follow
  }
  if (kind === "share") {
    if (!(await once(sub, "share"))) return 0
    await award(sub, RULES.share, "Shared the belt"); return RULES.share
  }
  if (kind === "join" && id) {
    if (!(await once(sub, `join:${id}`))) return 0
    await award(sub, RULES.join, `Joined ${id}`); return RULES.join
  }
  return -1
}

export async function linkAccount(sub: string, slot: string, handle: string) {
  if (!(LINK_SLOTS as readonly string[]).includes(slot)) throw Object.assign(new Error("bad_slot"), { status: 400 })
  const h = handle.trim().replace(/^@/, "")
  if (!/^[A-Za-z0-9_.]{2,30}$/.test(h)) throw Object.assign(new Error("invalid_handle"), { status: 400 })
  await redisCmd(["HSET", uk(sub), `link:${slot}`, h])
  if (await once(sub, `link:${slot}`)) { await award(sub, RULES.link, `Linked ${slot} @${h} (self-reported)`); return RULES.link }
  return 0
}

/* ---------- Clips ---------- */
export function clipPoints(campaignId: string) {
  return BRAND_CAMPAIGNS.find((c) => c.id === campaignId)?.points ?? RULES.clipApproved
}
export function detectPlatform(url: string) {
  const u = url.toLowerCase()
  if (u.includes("tiktok.com")) return "tiktok"
  if (u.includes("instagram.com")) return "instagram"
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube"
  if (u.includes("x.com") || u.includes("twitter.com")) return "x"
  if (u.includes("spotify.com")) return "spotify"
  if (u.includes("twitch.tv")) return "twitch"
  if (u.includes("kick.com")) return "kick"
  if (u.includes("substack.com")) return "substack"
  return ""
}
export async function submitClip(sub: string, campaignId: string, url: string, platform: string) {
  const camp = BRAND_CAMPAIGNS.find((c) => c.id === campaignId)
  if (camp?.kind === "spin") throw Object.assign(new Error("no_submissions"), { status: 400 })
  if (camp?.kind === "predict") {
    const guess = url.trim().slice(0, 120)
    if (guess.length < 2) throw Object.assign(new Error("bad_guess"), { status: 400 })
    if (Number(await redisCmd(["SADD", `guess:${campaignId}`, sub])) === 0) throw Object.assign(new Error("duplicate"), { status: 409 })
    const id = `g${Date.now().toString(36)}${randomInt(1e6).toString(36)}`
    const handle = (await redisCmd(["HGET", uk(sub), "handle"])) as string
    await redisPipeline([
      ["HSET", `clip:${id}`, "id", id, "sub", sub, "handle", handle || "", "campaign", campaignId, "url", guess, "platform", "guess", "status", "pending", "at", Date.now()],
      ["LPUSH", "clips:all", id], ["LPUSH", `clips:user:${sub}`, id]
    ])
    let pts = 0
    if (await once(sub, `submit:${campaignId}`)) { pts = RULES.join; await award(sub, pts, `Guessed in ${campaignId}`) }
    return { id, pts }
  }
  let parsed: URL
  try { parsed = new URL(url) } catch { throw Object.assign(new Error("bad_url"), { status: 400 }) }
  if (parsed.protocol !== "https:") throw Object.assign(new Error("bad_url"), { status: 400 })
  const plat = platform || detectPlatform(url)
  if (!["tiktok", "instagram", "youtube", "youtube-long", "x", "spotify", "twitch", "kick", "substack", "image"].includes(plat)) throw Object.assign(new Error("bad_platform"), { status: 400 })
  if (Number(await redisCmd(["SADD", "clips:urls", parsed.toString()])) === 0) throw Object.assign(new Error("duplicate"), { status: 409 })
  const id = `c${Date.now().toString(36)}${randomInt(1e6).toString(36)}`
  const handle = (await redisCmd(["HGET", uk(sub), "handle"])) as string
  await redisPipeline([
    ["HSET", `clip:${id}`, "id", id, "sub", sub, "handle", handle || "", "campaign", campaignId, "url", parsed.toString(), "platform", plat, "status", "pending", "at", Date.now()],
    ["LPUSH", "clips:all", id], ["LPUSH", `clips:user:${sub}`, id]
  ])
  let pts = 0
  if (await once(sub, `submit:${campaignId}`)) { pts = RULES.submit; await award(sub, RULES.submit, `Submitted to ${campaignId}`) }
  return { id, pts }
}
export async function readClips(ids: string[]) {
  if (!ids.length) return []
  const rows = (await redisPipeline(ids.map((i) => ["HGETALL", `clip:${i}`]))) as string[][]
  return rows.map((h) => { const m: Record<string, string> = {}; for (let i = 0; i < (h || []).length; i += 2) m[h[i]] = h[i + 1]; return m }).filter((m) => m.id)
}
export async function reviewClip(id: string, decision: "approved" | "rejected") {
  const r = await redisCmd(["EVAL", "local s=redis.call('HGET',KEYS[1],'status') if s~='pending' then return s or 'missing' end redis.call('HSET',KEYS[1],'status',ARGV[1]) return 'ok'", 1, `clip:${id}`, decision])
  if (r !== "ok") return { changed: false, status: r }
  const [sub, campaign] = (await redisCmd(["HMGET", `clip:${id}`, "sub", "campaign"])) as string[]
  if (decision === "approved") { const p = clipPoints(campaign); await award(sub, p, `Approved (${campaign}): +${p.toLocaleString("en-US")} ★`, campaign); await redisCmd(["HINCRBY", uk(sub), "approvedClips", 1]) }
  else await redisCmd(["LPUSH", `notif:${sub}`, JSON.stringify({ t: Date.now(), pts: 0, note: `Clip not approved (${campaign})` })])
  return { changed: true, status: decision }
}

/** Admin enters engagement for an approved clip; awards only the delta (capped per clip). */
export async function setClipStats(id: string, v: { views?: number; likes?: number; comments?: number; shares?: number; proof?: string }) {
  const [status, sub, campaign, prev] = (await redisCmd(["HMGET", `clip:${id}`, "status", "sub", "campaign", "viewPts"])) as string[]
  if (status !== "approved") throw Object.assign(new Error("not_approved"), { status: 409 })
  const n = (x: unknown) => Math.max(0, Math.min(1e10, Math.floor(Number(x) || 0)))
  const stats = { views: n(v.views), likes: n(v.likes), comments: n(v.comments), shares: n(v.shares) }
  const pts = viewPoints(stats)
  const delta = pts - Number(prev || 0)
  await redisCmd(["HSET", `clip:${id}`, "views", stats.views, "likes", stats.likes, "comments", stats.comments, "shares", stats.shares, "viewPts", Math.max(pts, Number(prev || 0)), ...(v.proof ? ["proof", String(v.proof).slice(0, 500)] : [])])
  await redisCmd(["ZADD", "clips:views", stats.views, id])
  if (delta > 0) await award(sub, delta, `Views & engagement on your ${campaign} clip: +${delta.toLocaleString("en-US")} ★`, campaign)
  return { pts, delta: Math.max(0, delta) }
}

export async function topClips(n = 20) {
  const raw = ((await redisCmd(["ZREVRANGE", "clips:views", 0, n - 1])) as string[]) || []
  return (await readClips(raw)).map((c) => ({ id: c.id, handle: c.handle, campaign: c.campaign, url: c.url, platform: c.platform, views: Number(c.views || 0), viewPts: Number(c.viewPts || 0) }))
}

export async function leaderboard(n = 50, key = "lb") {
  const raw = (await redisCmd(["ZREVRANGE", key, 0, n - 1, "WITHSCORES"])) as string[]
  const subs: string[] = [], scores: number[] = []
  for (let i = 0; i < raw.length; i += 2) { subs.push(raw[i]); scores.push(Number(raw[i + 1])) }
  const rows = (await redisPipeline(subs.map((s) => ["HMGET", uk(s), "handle", "avatar", "og"]))) as string[][]
  return subs.map((_, i) => ({ rank: i + 1, handle: rows[i]?.[0] || "", avatar: rows[i]?.[1] || "sushi", og: Number(rows[i]?.[2] || 0), points: scores[i] })).filter((r) => r.handle)
}

export async function publicProfile(handle: string) {
  const sub = (await redisCmd(["GET", `handle:${sanitizeHandle(handle)}`])) as string | null
  if (!sub) return null
  const s = await readState(sub)
  const approved = Number((await redisCmd(["HGET", uk(sub), "approvedClips"])) || 0)
  return { handle: s.handle, avatar: s.avatar, og: s.og, points: s.points, rank: s.rank, bio: s.bio, links: s.links, approvedClips: approved, invites: s.invites }
}

/* ---------- Art competition voting: one vote per user per day per competition, +5 ★ for voting ---------- */
export async function vote(sub: string, campaignId: string, clipId: string) {
  const [camp, status, owner] = (await redisCmd(["HMGET", `clip:${clipId}`, "campaign", "status", "sub"])) as string[]
  if (camp !== campaignId || status !== "approved") throw Object.assign(new Error("bad_entry"), { status: 400 })
  if (owner === sub) throw Object.assign(new Error("own_entry"), { status: 400 })
  const c = BRAND_CAMPAIGNS.find((x) => x.id === campaignId)
  if (!c || c.kind !== "art") throw Object.assign(new Error("not_art"), { status: 400 })
  if (c.endsAt && Date.now() > Date.parse(c.endsAt)) throw Object.assign(new Error("ended"), { status: 409 })
  const r = await redisCmd(["SET", `vote:${campaignId}:${sub}:${today()}`, clipId, "NX", "EX", 172800])
  if (r !== "OK") return { voted: false }
  await redisCmd(["ZINCRBY", `votes:${campaignId}`, 1, clipId])
  await award(sub, RULES.vote, `Voted in ${c.title}`)
  return { voted: true }
}
export async function gallery(campaignId: string) {
  const ids = ((await redisCmd(["LRANGE", "clips:all", 0, 499])) as string[]) || []
  const rows = (await readClips(ids)).filter((c) => c.campaign === campaignId && c.status === "approved")
  const scores = rows.length ? ((await redisPipeline(rows.map((r) => ["ZSCORE", `votes:${campaignId}`, r.id]))) as (string | null)[]) : []
  return rows.map((r, i) => ({ id: r.id, handle: r.handle, url: r.url, platform: r.platform, votes: Number(scores[i] || 0) })).sort((a, b) => b.votes - a.votes)
}
