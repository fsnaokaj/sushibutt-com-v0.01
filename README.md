# ClipFlow — Campaign Marketplace

SushiButt.com v0.01. A clipping & UGC campaign marketplace built with Next.js 14, TypeScript, and Tailwind CSS.

**Live:** https://fsnaokaj.github.io/sushibutt-com-v0.01/

**Repo:** https://github.com/fsnaokaj/sushibutt-com-v0.01

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **State:** Zustand
- **Icons:** Lucide React
- **Charts:** Recharts
- **UI Primitives:** Radix UI

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm start
```

## Adding Campaigns

Edit `src/data/campaigns.ts` and add a new entry to the `campaigns` array. Drop matching images in `public/banners/` and `public/thumbnails/`.

Placeholder artwork can be regenerated with:

```bash
node scripts/generate-placeholders.mjs
```
