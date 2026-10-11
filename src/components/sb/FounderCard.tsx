import Link from "next/link"

/** Shelbie founder card (brand, launch, fashion, fragrance, astrology and podcast content only). */
export function FounderCard() {
  return (
    <section className="bg-white border rounded-3xl p-5 flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-300 to-amber-200 flex items-center justify-center text-3xl shrink-0">✨</div>
      <div className="space-y-1.5 min-w-0">
        <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Founder</p>
        <h2 className="text-xl font-extrabold">Shelbie · @sushibuttshelbie</h2>
        <p className="text-sm text-muted-foreground">Founder of <b>PoshGoof</b> (fashion, fragrance & astrology — “signals before the noise”) and host of the podcast formerly known as Chicks Clips TV, now on @sushibuttshelbie. DM her on TikTok for paid clipping opportunities.</p>
        <div className="flex flex-wrap gap-2 pt-1 text-sm font-extrabold">
          <a className="px-3 py-1.5 rounded-full bg-primary text-white" href="https://www.tiktok.com/@sushibuttshelbie" target="_blank" rel="noopener noreferrer">TikTok @sushibuttshelbie</a>
          <a className="px-3 py-1.5 rounded-full border" href="https://www.tiktok.com/@poshgoof" target="_blank" rel="noopener noreferrer">TikTok @poshgoof</a>
          <a className="px-3 py-1.5 rounded-full border" href="https://poshgoof.com" target="_blank" rel="noopener noreferrer">poshgoof.com</a>
          <Link className="px-3 py-1.5 rounded-full border" href="/campaigns/sb-podcast">Clip the podcast</Link>
        </div>
      </div>
    </section>
  )
}
