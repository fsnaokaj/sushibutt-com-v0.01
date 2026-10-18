#!/usr/bin/env node
/**
 * Promo banner generator. Renders HTML in headless Chrome for every campaign + featured offer:
 *   public/promo/<id>/{card 1200x675, hero 1600x600, story 1080x1920, square 1080x1080}.png + kit.zip
 * Usage:  PUPPETEER_CORE=/path/to/puppeteer-core CHROME=/usr/bin/google-chrome node scripts/banners.mjs [id-filter]
 * Edit campaigns in src/config/campaigns.ts and offers in src/config/offers.ts, then re-run.
 */
import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { createRequire } from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)
const ts = require("typescript")
const puppeteer = require(process.env.PUPPETEER_CORE || "puppeteer-core")

function loadTs(file) {
  const src = fs.readFileSync(path.join(root, file), "utf8")
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const m = { exports: {} }
  new Function("module", "exports", "require", out)(m, m.exports, require)
  return m.exports
}
const { BRAND_CAMPAIGNS, BRANDS } = loadTs("src/config/campaigns.ts")
const { OFFERS } = loadTs("src/config/offers.ts")
const asset = (p) => pathToFileURL(path.join(root, "public", p)).href

const img = (p) => asset(p)
/** Bright, saturated themes (never near-black). */
const THEME = {
  SushiButt: { bg: ["#ff4fa3", "#ff8a5c", "#ffd84d"], ink: "#3b0a24", hi: "#ffffff", sticker: "#ffe14d", stickerInk: "#3b0a24", font: "Luckiest Guy", word: "SUSHIBUTT", mark: "🍣" },
  PoshGoof: { bg: ["#a78bfa", "#f472b6", "#fde68a"], ink: "#2e1250", hi: "#ffffff", sticker: "#fff1a8", stickerInk: "#2e1250", font: "Paytone One", word: "POSHGOOF", mark: "✨" },
  "Wine Detention": { bg: ["#f43f5e", "#fbbf77", "#fef3c7"], ink: "#4a0b1e", hi: "#ffffff", sticker: "#fde047", stickerInk: "#4a0b1e", font: "Anton", word: "DETENTION", mark: "🍷" },
  PuckGold: { bg: ["#2563eb", "#38bdf8", "#e0f2fe"], ink: "#0b1f4d", hi: "#ffffff", sticker: "#facc15", stickerInk: "#0b1f4d", font: "Anton", word: "PUCKGOLD", mark: "🏒", accent: "#e11d48" },
  Fartnatics: { bg: ["#8fd5f4", "#d7f2f9", "#c9ef8a"], ink: "#0f3a4c", hi: "#ffffff", sticker: "#f58a2f", stickerInk: "#ffffff", font: "Bricolage Grotesque", word: "fartnatics", mark: "☁️", accent: "#12808a" }, // 2026 brand kit
  "Pack Rips": { bg: ["#facc15", "#fb923c", "#60a5fa"], ink: "#1e1b4b", hi: "#ffffff", sticker: "#ffffff", stickerInk: "#1e1b4b", font: "Bungee", word: "RIP NIGHT", mark: "🃏" },
  "Glow Up": { bg: ["#fda4af", "#fbcfe8", "#fef3c7"], ink: "#4c0519", hi: "#ffffff", sticker: "#f43f5e", stickerInk: "#ffffff", font: "Lilita One", word: "GLOW UP", mark: "✨" },
  "Mystery Box": { bg: ["#2dd4bf", "#a3e635", "#fde047"], ink: "#083344", hi: "#ffffff", sticker: "#f43f5e", stickerInk: "#ffffff", font: "Lilita One", word: "MYSTERY BOX", mark: "🎁" }
}
/** Art layers per campaign (x/y/w in % of the art zone; rot in deg). */
const P = (src, x, y, w, rot = 0, extra = {}) => ({ t: "img", src: img(src), x, y, w, rot, ...extra })
const E = (ch, x, y, size, rot = 0) => ({ t: "emoji", ch, x, y, size, rot })
const CARD = (x, y, w, rot, label, hue) => ({ t: "card", x, y, w, rot, label, hue })
function artFor(j) {
  const id = j.id
  if (id.startsWith("pg-fanart")) return [P("promo-src/pg-jersey-cardinals.png", 2, 18, 62, -8, { card: true }), P("promo-src/pg-jersey-geckz.png", 36, 34, 62, 7, { card: true }), P("promo-src/pg-puck-sticker.png", 60, -6, 38, 12)]
  if (id === "pg-premium" || id === "offer-puckgold-premium") return [P("promo-src/pg-logo-stacked.png", 14, 0, 72, -4), P("promo-src/pg-puck-sticker.png", 58, 56, 40, 14)]
  if (j.brand === "PuckGold" && /og|puckgold-og/.test(id)) return [P("promo-src/pg-puck-sticker.png", 4, 6, 92, -10), P("promo-src/pg-gold.png", 62, 58, 34, 10, { card: true })]
  if (id.includes("giveaway") && j.brand === "PuckGold") return [P("promo-src/pg-gold.png", 8, 6, 64, -6, { card: true }), P("promo-src/pg-puck-sticker.png", 52, 48, 46, 12), E("🎁", 0, 62, 26, -12)]
  if (j.brand === "PuckGold") return [P("promo-src/pg-jersey-geckz.png", 0, 22, 74, -7, { card: true }), P("promo-src/pg-logo-stacked.png", 52, -4, 46, 6), P("promo-src/pg-puck-sticker.png", 50, 56, 42, 14)]
  if (id === "fn-giveaway") return [P("promo-src/fn-party-prizes.png", -4, 6, 108, -3), E("🎉", 0, -2, 22, -14), E("✨", 78, -4, 16, 10)]
  if (j.brand === "Fartnatics") return [P("promo-src/fn-kit-card.png", 0, 30, 78, -6, { card: true }), P("promo-src/fn-logo-mark.png", 44, -6, 54, 8), E(id.includes("giveaway") ? "🎁" : "🫧", 2, 2, 20, -12)]
  if (j.brand === "Wine Detention") return [P("promo-src/wd-vip-drops.png", -6, 0, 112, -2), E(id.includes("champagne") ? "🍾" : id === "wd-follow" ? "🎟️" : "🎉", 74, -4, 20, 14)]
  if (false) return [P("offers/wd-hero.png", 0, 10, 70, -7, { card: true }), P("offers/wd-bubbles.png", 42, 40, 56, 8, { card: true }), E("🍾", 62, -4, 22, 18)]
  if (j.brand === "PoshGoof") return [E("♈", 4, 4, 18, -14), E("♌", 70, 2, 16, 12), E("♓", 2, 64, 16, 8), E(id === "po-sweet" ? "🍰" : id === "po-horoscope" ? "🔮" : "👗", 22, 16, 50, -6), E(id === "po-sweet" ? "🍒" : "✨", 62, 52, 28, 14)]
  if (j.brand === "Pack Rips") return [CARD(6, 14, 40, -14, "?", 200), CARD(32, 4, 40, 0, "CHASE", 290), CARD(58, 16, 40, 14, "?", 40), E(id.includes("spin") ? "🎰" : id.includes("guess") ? "🔮" : "⚡", 36, 62, 26, -8)]
  if (j.brand === "Glow Up") { const m = { "gu-teeth-7day": "🦷", "gu-hot-towel": "🪒", "gu-dupe-legit": "💄", "gu-grwm": "🪞", "gu-pr-box": "📦" }; return [E(m[id] || "💅", 16, 10, 56, -8), E("✨", 66, 4, 22, 14), E("💖", 4, 64, 20, -10)] }
  if (j.brand === "Mystery Box") return [E("🎁", 12, 4, 66, -8), E("❓", 70, 0, 22, 16), E("✨", 2, 62, 20, -10)]
  const sb = { "launch-film": "hero-fans", "official-open": "hero-camels", "daily-belt": "hero-igloo", "sb-fanart": "hero-camels", "sb-podcast": "hero-fans" }[id] || "hero-camels"
  return [P(`promo-src/${sb}.png`, 0, 16, 78, -6, { card: true }), E(id === "sb-podcast" ? "🎙️" : "🍣", 56, -4, 34, 14)]
}
const ORIGINALS = [
  { id: "follow-quest", brand: "SushiButt", title: "Follow the Belt", kicker: "EASIEST POINTS", sticker: "+2.5K ★", cta: "+2,500 ★ per follow" },
  { id: "launch-film", brand: "SushiButt", title: "Clip Shelbie's Launch", kicker: "LAUNCH CLIP", sticker: "+10K ★", cta: "+10,000 ★ per submit" },
  { id: "daily-belt", brand: "SushiButt", title: "Daily Clip Quest", kicker: "#SUSHIBUTTDAILY", sticker: "+10K ★", cta: "+10,000 ★ per submit" },
  { id: "official-open", brand: "SushiButt", title: "Clip SushiButt Intro", kicker: "REGISTERING NOW", sticker: "+10K ★", cta: "+10,000 ★ per submit" }
]
const k = (n) => (n >= 1e6 ? `${n / 1e6}M` : n >= 1000 ? `${Math.round(n / 100) / 10}K` : `${n}`)
const jobs = [
  ...ORIGINALS.map((o) => ({ ...o, url: `sushibutt.com/campaigns/${o.id}` })),
  ...BRAND_CAMPAIGNS.map((c) => ({ id: c.id, brand: c.brand, title: c.title, kicker: c.kicker, age: BRANDS[c.brand].ageGate,
    sticker: c.kind === "spin" ? `UP TO ${k(c.points)} ★` : `+${k(c.points)} ★`,
    cta: c.kind === "follow" ? `+${c.points.toLocaleString("en-US")} ★ per follow` : c.kind === "art" ? "Enter free · vote daily" : c.kind === "predict" ? "Free guess · no purchase" : c.kind === "spin" ? "Free daily spin" : `+${c.points.toLocaleString("en-US")} ★ per approved clip`,
    url: `sushibutt.com/campaigns/${c.id}` })),
  ...OFFERS.map((o) => ({ id: `offer-${o.id}`, brand: o.brand, title: o.title, kicker: o.badge || "FEATURED OFFER", age: o.ageGate,
    sticker: o.price.length <= 9 ? o.price : null, cta: o.price, url: new URL(o.url).host.replace("www.", "") + (new URL(o.url).pathname.length > 1 ? new URL(o.url).pathname.replace(/\/$/, "") : "") }))
]
const SIZES = { card: [1200, 675], hero: [1600, 600], story: [1080, 1920], square: [1080, 1080] }
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`

function layer(l, Z) {
  const common = `position:absolute;left:${l.x}%;top:${l.y}%;transform:rotate(${l.rot}deg);`
  if (l.t === "emoji") return `<div style="${common}font-size:${l.size * Z / 100}px;line-height:1;filter:drop-shadow(0 ${Z * .02}px ${Z * .03}px rgba(0,0,0,.25))">${l.ch}</div>`
  if (l.t === "card") return `<div style="${common}width:${l.w}%;aspect-ratio:5/7;border-radius:${Z * .03}px;border:${Z * .014}px solid #fff;background:conic-gradient(from 200deg,hsl(${l.hue} 95% 70%),hsl(${l.hue + 60} 95% 75%),hsl(${l.hue + 140} 90% 72%),hsl(${l.hue} 95% 70%));box-shadow:0 ${Z * .04}px ${Z * .08}px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;font-family:'Bungee';font-size:${Z * (l.label.length > 2 ? .06 : .16)}px;color:#fff;text-shadow:0 ${Z * .008}px 0 rgba(0,0,0,.25)">${l.label}</div>`
  const frame = l.card ? `border:${Z * .016}px solid #fff;border-radius:${l.round ? "50%" : Z * .035 + "px"};box-shadow:0 ${Z * .05}px ${Z * .1}px rgba(0,0,0,.3);background:#fff;object-fit:cover;${l.round ? "aspect-ratio:1/1;" : "aspect-ratio:4/3;"}` : `filter:drop-shadow(0 ${Z * .04}px ${Z * .05}px rgba(0,0,0,.3));object-fit:contain;`
  return `<img src="${l.src}" style="${common}width:${l.w}%;${frame}"/>`
}

function html(j, size) {
  const t = THEME[j.brand] || THEME.SushiButt
  const [w, h] = SIZES[size]
  const V = size === "story", S = size === "square", H = size === "hero"
  const u = Math.min(w, h) / 100 // 1u = 1% of short side
  const len = j.title.length
  const tSize = (V ? 13 : S ? 12.5 : H ? 15 : 14) * u * (len > 30 ? .7 : len > 22 ? .82 : len > 14 ? .94 : 1) * (V ? 1.0 : 1)
  const art = artFor(j)
  // art zone
  const zone = V ? { l: 6, t: 4, w: 88, h: 46 } : S ? { l: 44, t: 6, w: 54, h: 60 } : H ? { l: 58, t: 4, w: 38, h: 92 } : { l: 52, t: 6, w: 46, h: 88 }
  const Z = Math.min(zone.w * w, zone.h * h) / 100
  const text = V ? { l: 7, t: 52, w: 86 } : S ? { l: 6, t: 44, w: 88 } : H ? { l: 4, t: 0, w: 54 } : { l: 5, t: 0, w: 50 }
  return `<!doctype html><html><head><meta charset="utf8"><style>*{box-sizing:border-box;margin:0}body{width:${w}px;height:${h}px;overflow:hidden}</style></head><body>
  <div style="position:relative;width:${w}px;height:${h}px;overflow:hidden;background:linear-gradient(${V ? 165 : 120}deg,${t.bg[0]} 0%,${t.bg[1]} 55%,${t.bg[2]} 100%);font-family:'Nunito',sans-serif;color:${t.ink}">
    <div style="position:absolute;inset:0;background:radial-gradient(circle at ${V ? "50% 28%" : "74% 45%"},rgba(255,255,255,.75) 0%,rgba(255,255,255,0) ${V ? 45 : 38}%)"></div>
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(-28deg,rgba(255,255,255,.10) 0 ${3 * u}px,rgba(255,255,255,0) ${3 * u}px ${7 * u}px)"></div>
    <div style="position:absolute;left:${-2 * u}px;${V ? `top:${44 * u}px` : `bottom:${-4 * u}px`};font-family:'${t.font}';font-size:${(V ? 34 : 30) * u}px;line-height:.8;white-space:nowrap;color:transparent;-webkit-text-stroke:${.35 * u}px rgba(255,255,255,.55);letter-spacing:.02em">${t.word} ${t.word}</div>
    <div style="position:absolute;left:${zone.l}%;top:${zone.t}%;width:${zone.w}%;height:${zone.h}%">${art.map((l) => layer(l, Z)).join("")}</div>
    ${j.sticker ? `<div style="position:absolute;${V ? `right:${6 * u}px;top:${40 * u}px` : S ? `left:${30 * u}px;top:${4 * u}px` : `left:${(H ? 50 : 42) * w / 100}px;top:${6 * u}px`};width:${(V ? 26 : 21) * u}px;height:${(V ? 26 : 21) * u}px;border-radius:50%;background:${t.sticker};color:${t.stickerInk};border:${.9 * u}px solid #fff;box-shadow:0 ${1.2 * u}px ${2.5 * u}px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;text-align:center;transform:rotate(-12deg);font-family:'${t.font}';font-size:${(V ? 5.2 : 4.3) * u * (j.sticker.length > 8 ? .72 : 1)}px;line-height:1;padding:${2 * u}px;z-index:3">${j.sticker}</div>` : ""}
    <div style="position:absolute;left:${text.l}%;${V || S ? `bottom:${(V ? 9 : 7.5) * u}px;max-height:${(V ? 46 : 54) * h / 100}px;` : `top:${text.t}%;height:100%;`}width:${text.w}%;display:flex;flex-direction:column;justify-content:center;gap:${(V ? 2.6 : 1.8) * u}px;z-index:2">
      <div style="display:flex;align-items:center;gap:${1.4 * u}px;flex-wrap:wrap">
        <span style="background:#fff;color:${t.ink};font-weight:900;font-size:${(V ? 3.4 : 2.8) * u}px;letter-spacing:.14em;padding:${.9 * u}px ${2 * u}px;border-radius:999px;box-shadow:0 ${.6 * u}px 0 rgba(0,0,0,.15)">${t.mark} ${j.brand.toUpperCase()}</span>
        ${j.age ? `<span style="background:${t.ink};color:#fff;font-weight:900;font-size:${(V ? 3.2 : 2.6) * u}px;padding:${.9 * u}px ${1.8 * u}px;border-radius:999px">${j.age}</span>` : ""}
      </div>
      <div style="font-weight:900;font-size:${(V ? 3.6 : 2.7) * u}px;letter-spacing:.2em;color:${t.ink};opacity:.85">${j.kicker}</div>
      <div style="font-family:'${t.font}';font-size:${tSize}px;line-height:.95;color:${t.hi};text-transform:uppercase;text-shadow:0 ${.7 * u}px 0 ${t.ink},0 ${1.6 * u}px ${3 * u}px rgba(0,0,0,.25);-webkit-text-stroke:${.25 * u}px ${t.ink};letter-spacing:.01em">${j.title}</div>
      <div style="display:flex;margin-top:${.8 * u}px"><span style="background:#fff;color:${t.ink};font-weight:900;font-size:${(V ? 4.4 : 3.3) * u}px;padding:${1.6 * u}px ${3.4 * u}px;border-radius:999px;box-shadow:0 ${.9 * u}px 0 ${t.ink}">${j.cta} →</span></div>
      <div style="font-weight:800;font-size:${(V ? 3 : 2.3) * u}px;color:${t.ink}">${j.url}</div>
    </div>
    <div style="position:absolute;right:${2.4 * u}px;bottom:${2 * u}px;font-weight:900;font-size:${(V ? 2.6 : 2) * u}px;color:${t.ink};background:rgba(255,255,255,.75);padding:${.6 * u}px ${1.6 * u}px;border-radius:999px;z-index:4">🍣 sushibutt.com · points have no cash value</div>
    <div style="position:absolute;inset:0;background-image:${GRAIN};opacity:.16;mix-blend-mode:multiply;pointer-events:none"></div>
  </div></body></html>`
}

const filter = process.argv[2]
const browser = await puppeteer.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox", "--allow-file-access-from-files"] })
const page = await browser.newPage()
for (const j of jobs) {
  if (filter && !j.id.includes(filter)) continue
  const dir = path.join(root, "public/promo", j.id)
  fs.mkdirSync(dir, { recursive: true })
  for (const [size, [w, h]] of Object.entries(SIZES)) {
    const tmp = path.join(dir, `.${size}.html`)
    fs.writeFileSync(tmp, html(j, size))
    await page.setViewport({ width: w, height: h })
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r }))))
    await page.screenshot({ path: path.join(dir, `${size}.png`) })
    fs.unlinkSync(tmp)
  }
// (zip kits removed to keep deploy small)   execSync(`python3 -c "import zipfile,sys;z=zipfile.ZipFile('kit.zip','w',zipfile.ZIP_DEFLATED);[z.write(f) for f in ['card.png','hero.png','story.png','square.png']]"`, { cwd: dir })
  console.log("✓", j.id)
}
await browser.close()
