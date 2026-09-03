import { mkdirSync, writeFileSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(join(root, "src/data/campaigns.ts"), "utf8")

const PALETTE = [
  ["#0f172a", "#1d4ed8"],
  ["#111827", "#059669"],
  ["#1c1917", "#ea580c"],
  ["#18181b", "#7c3aed"],
  ["#0c4a6e", "#0284c7"],
  ["#3f1d12", "#f59e0b"],
  ["#1e1b4b", "#ec4899"],
  ["#14532d", "#22c55e"],
  ["#4a044e", "#a855f7"],
  ["#7f1d1d", "#ef4444"]
]

function hash(str) {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

function svg({ title, width, height, from, to }) {
  const safe = title.replace(/[<>&]/g, "")
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" fill="white" font-family="system-ui,sans-serif" font-size="${Math.round(width / 22)}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${safe}</text>
</svg>
`
}

const banners = [...source.matchAll(/bannerUrl:\s*"\/banners\/([^"]+)"/g)].map((m) => m[1])
const thumbs = [...source.matchAll(/thumbnailUrl:\s*"\/thumbnails\/([^"]+)"/g)].map((m) => m[1])
const titles = [...source.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1])

mkdirSync(join(root, "public/banners"), { recursive: true })
mkdirSync(join(root, "public/thumbnails"), { recursive: true })

function writeAssets(files, dir, width, height) {
  files.forEach((file, i) => {
    const title = titles[i] ?? file.replace(/\.[^.]+$/, "")
    const [from, to] = PALETTE[hash(file) % PALETTE.length]
    const svgName = file.replace(/\.(jpg|jpeg|png|webp)$/i, ".svg")
    writeFileSync(join(root, dir, svgName), svg({ title, width, height, from, to }))
  })
}

writeAssets(banners, "public/banners", 1400, 520)
writeAssets(thumbs, "public/thumbnails", 480, 270)

let next = source
  .replaceAll("/banners/", "/banners/")
  .replace(/bannerUrl:\s*"(\/banners\/[^"]+)\.(jpg|jpeg|png|webp)"/g, 'bannerUrl: "$1.svg"')
  .replace(/thumbnailUrl:\s*"(\/thumbnails\/[^"]+)\.(jpg|jpeg|png|webp)"/g, 'thumbnailUrl: "$1.svg"')

writeFileSync(join(root, "src/data/campaigns.ts"), next)
console.log(`Wrote ${banners.length} banners and ${thumbs.length} thumbnails`)
