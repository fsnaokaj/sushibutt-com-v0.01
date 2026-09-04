import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const items = [
  ["official", "SushiButt Official"],
  ["nigiri-night", "Nigiri Night"],
  ["wasabi-drop", "Wasabi Drop"],
  ["pink-belt", "Pink Belt UGC"],
  ["star-roll", "Star Roll"],
  ["omakase", "Omakase Weekly"],
  ["kaiten", "Kaiten Streams"],
  ["soy-sports", "Soy Sauce Sports"]
]
const pinks = [["#fb7185", "#ec4899"], ["#f472b6", "#db2777"], ["#fda4af", "#e11d48"], ["#f9a8d4", "#be185d"]]

function svg(title, w, h, from, to) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="8%" y="18%" font-size="${Math.round(w/28)}" fill="white">★ 🍣 ★</text>
  <text x="50%" y="54%" fill="white" font-family="Nunito,system-ui,sans-serif" font-size="${Math.round(w/18)}" font-weight="800" text-anchor="middle">${title}</text>
</svg>`
}

mkdirSync(join(root, "public/banners"), { recursive: true })
mkdirSync(join(root, "public/thumbnails"), { recursive: true })
items.forEach(([id, title], i) => {
  const [from, to] = pinks[i % pinks.length]
  writeFileSync(join(root, `public/banners/${id}.svg`), svg(title, 1400, 520, from, to))
  writeFileSync(join(root, `public/thumbnails/${id}.svg`), svg(title, 480, 270, from, to))
})
console.log(`Wrote ${items.length} pink sushi assets`)
