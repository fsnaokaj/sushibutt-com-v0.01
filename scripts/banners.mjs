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

const THEME = {
  SushiButt: { bg: "linear-gradient(135deg,#fff0f6 0%,#ffd1e6 55%,#ffe9c7 100%)", ink: "#4a0f2c", accent: "#ec4899", accent2: "#f59e0b", font: "'Bebas Neue'", body: "'Nunito'", art: asset("promo-src/hero-camels.png"), mark: "🍣", artFit: "cover" },
  PoshGoof: { bg: "linear-gradient(135deg,#f7f0ff 0%,#ffe4f0 60%,#fff6dd 100%)", ink: "#2e1250", accent: "#8b5cf6", accent2: "#ec4899", font: "'Playfair Display'", body: "'Nunito'", art: null, mark: "✨", artFit: "cover" },
  "Wine Detention": { bg: "linear-gradient(135deg,#fff8ef 0%,#fde2e4 60%,#fff 100%)", ink: "#4a1024", accent: "#9f1239", accent2: "#d4a017", font: "'Bebas Neue'", body: "'Nunito'", art: asset("offers/wd-hero.png"), mark: "🍷", artFit: "cover" },
  PuckGold: { bg: "linear-gradient(135deg,#eef4ff 0%,#ffffff 50%,#fff4d6 100%)", ink: "#0b1f4d", accent: "#c8102e", accent2: "#d4a017", font: "'Bebas Neue'", body: "'Space Grotesk'", art: asset("promo-src/pg-emblem.png"), mark: "🏒", artFit: "contain" },
  Fartnatics: { bg: "linear-gradient(135deg,#e0f2fe 0%,#f0fdf4 55%,#ffedd5 100%)", ink: "#0c3a5a", accent: "#fb923c", accent2: "#22c55e", font: "'Baloo 2'", body: "'Nunito'", art: asset("promo-src/fn-mascot.jpg"), mark: "☁️", artFit: "contain" }
}
const ORIGINALS = [
  { id: "follow-quest", brand: "SushiButt", title: "Follow the Belt", kicker: "EASIEST POINTS", cta: "+25 ★ per follow" },
  { id: "launch-film", brand: "SushiButt", title: "Clip Shelbie's Launch", kicker: "LAUNCH CLIP", cta: "+100 ★ per submit" },
  { id: "daily-belt", brand: "SushiButt", title: "Daily Clip Quest", kicker: "#SushiButtDaily", cta: "+100 ★ per submit" },
  { id: "official-open", brand: "SushiButt", title: "Clip SushiButt Intro", kicker: "REGISTERING", cta: "+100 ★ per submit" }
]
const jobs = [
  ...ORIGINALS.map((o) => ({ ...o, url: `sushibutt.com/campaigns/${o.id}` })),
  ...BRAND_CAMPAIGNS.map((c) => ({ id: c.id, brand: c.brand, title: c.title, kicker: c.kicker, age: BRANDS[c.brand].ageGate,
    cta: c.kind === "follow" ? `+${c.points} ★ per follow` : c.kind === "art" ? `+${c.points} ★ winner bonus · vote daily` : `+${c.points} ★ per approved clip`,
    url: `sushibutt.com/campaigns/${c.id}` })),
  ...OFFERS.map((o) => ({ id: `offer-${o.id}`, brand: o.brand, title: o.title, kicker: o.badge || "FEATURED OFFER", age: o.ageGate,
    cta: o.price, url: new URL(o.url).host.replace("www.", "") + (new URL(o.url).pathname.length > 1 ? new URL(o.url).pathname : ""),
    art: o.art.startsWith("/offers/") ? asset(o.art.slice(1)) : null }))
]
const SIZES = { card: [1200, 675], hero: [1600, 600], story: [1080, 1920], square: [1080, 1080] }

function html(j, size) {
  const t = THEME[j.brand] || THEME.SushiButt
  const [w, h] = SIZES[size]
  const vertical = size === "story", sq = size === "square"
  const s = Math.min(w, h) / 675 // scale
  const art = j.art || t.art
  const titleSize = Math.round((vertical ? 150 : sq ? 120 : size === "hero" ? 104 : 96) * (j.title.length > 34 ? 0.72 : j.title.length > 22 ? 0.86 : 1) * (vertical ? 1 : s > 1 ? 1 : 1))
  const zodiac = j.brand === "PoshGoof" ? `<div style="position:absolute;inset:0;font-size:${80 * s}px;opacity:.13;color:${t.accent};display:flex;flex-wrap:wrap;gap:${40 * s}px;padding:${40 * s}px;line-height:1">♈♉♊♋♌♍♎♏♐♑♒♓♈♉♊♋♌♍</div>` : ""
  const artBlock = art ? `<div style="flex:${vertical ? "0 0 46%" : sq ? "0 0 44%" : "0 0 42%"};position:relative;border-radius:${36 * s}px;overflow:hidden;background:#fff;box-shadow:0 ${20 * s}px ${60 * s}px rgba(0,0,0,.12);border:${6 * s}px solid #fff">
      <img src="${art}" style="width:100%;height:100%;object-fit:${t.artFit};display:block"/></div>` : `<div style="flex:0 0 ${vertical || sq ? "40%" : "36%"};display:flex;align-items:center;justify-content:center;font-size:${260 * s}px">${t.mark}</div>`
  return `<!doctype html><html><head><meta charset="utf8"><style>*{box-sizing:border-box;margin:0}body{width:${w}px;height:${h}px;overflow:hidden}</style></head>
  <body><div style="position:relative;width:${w}px;height:${h}px;background:${t.bg};font-family:${t.body},sans-serif;color:${t.ink};display:flex;flex-direction:${vertical || sq ? "column-reverse" : "row"};gap:${44 * s}px;padding:${(vertical ? 90 : 56) * s}px">
    ${zodiac}
    <div style="position:absolute;right:${-120 * s}px;top:${-120 * s}px;width:${420 * s}px;height:${420 * s}px;border-radius:50%;background:${t.accent2};opacity:.18"></div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:${(vertical ? 34 : 18) * s}px;position:relative;min-width:0">
      <div style="display:flex;align-items:center;gap:${14 * s}px;font-weight:800;font-size:${(vertical ? 40 : 28) * s}px;letter-spacing:.08em;color:${t.accent}">
        <span>${t.mark}</span><span>${j.brand.toUpperCase()}</span>${j.age ? `<span style="margin-left:${10 * s}px;background:${t.ink};color:#fff;border-radius:999px;padding:${4 * s}px ${14 * s}px;font-size:${(vertical ? 30 : 22) * s}px">${j.age}</span>` : ""}
      </div>
      <div style="font-weight:800;font-size:${(vertical ? 34 : 24) * s}px;letter-spacing:.18em;opacity:.75">${j.kicker}</div>
      <div style="font-family:${t.font},sans-serif;font-weight:800;font-size:${titleSize * (vertical ? 1 : s)}px;line-height:.95;letter-spacing:.01em">${j.title}</div>
      <div style="display:flex"><span style="background:${t.accent};color:#fff;font-weight:900;font-size:${(vertical ? 48 : 32) * s}px;padding:${14 * s}px ${30 * s}px;border-radius:999px;box-shadow:0 ${8 * s}px 0 ${t.ink}22">${j.cta}</span></div>
      <div style="font-weight:800;font-size:${(vertical ? 34 : 24) * s}px;opacity:.85">${j.url} · on 🍣 sushibutt.com</div>
      <div style="font-size:${(vertical ? 24 : 16) * s}px;opacity:.6">Points have no cash value · payments coming soon</div>
    </div>
    ${artBlock}
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
    await page.screenshot({ path: path.join(dir, `${size}.png`) })
    fs.unlinkSync(tmp)
  }
  execSync(`python3 -c "import zipfile,sys;z=zipfile.ZipFile('kit.zip','w',zipfile.ZIP_DEFLATED);[z.write(f) for f in ['card.png','hero.png','story.png','square.png']]"`, { cwd: dir })
  console.log("✓", j.id)
}
await browser.close()
