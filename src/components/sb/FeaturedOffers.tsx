"use client"
import Link from "next/link"
import { OFFERS, offerLink } from "@/config/offers"
import { useAccount } from "@/lib/client/account"

export function FeaturedOffers({ full }: { full?: boolean }) {
  const { state } = useAccount()
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-widest uppercase text-primary">From the SushiButt family</p>
          <h2 className="text-xl font-extrabold">Featured offers</h2>
        </div>
        {!full && <Link href="/offers" className="text-sm font-extrabold text-primary">All offers →</Link>}
      </div>
      <div className={full ? "grid sm:grid-cols-2 gap-4" : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"}>
        {OFFERS.map((o) => (
          <a key={o.id} href={offerLink(o.url, state?.handle)} target="_blank" rel="noopener noreferrer sponsored" className="campaign-card block bg-white border rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/promo/offer-${o.id}/card.png`} onError={(e) => { (e.target as HTMLImageElement).src = o.art }} alt={`${o.brand} — ${o.title}`} className="w-full aspect-[16/9] object-cover bg-pink-50" />
            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-primary">{o.brand}</span>
                {o.badge && <span className="text-[10px] font-extrabold uppercase bg-pink-100 text-pink-800 rounded-full px-2 py-0.5">{o.badge}</span>}
                {o.ageGate && <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded-full px-2 py-0.5">{o.ageGate}</span>}
              </div>
              <h3 className="font-extrabold leading-snug">{o.title}</h3>
              <p className="text-lg font-extrabold">{o.price}</p>
              {full && <p className="text-sm text-muted-foreground">{o.blurb}</p>}
              {full && <ul className="text-sm list-disc pl-5">{o.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              <p className="text-sm font-extrabold text-primary">Open {new URL(o.url).hostname.replace("www.", "")} ↗</p>
            </div>
          </a>
        ))}
      </div>
      {full && <p className="text-xs text-muted-foreground">Offers are run by each brand on its own site; prices and terms there apply. Signed-in links include your @handle as ?ref= so the brand can credit you. Wine Detention is 21+ only.</p>}
    </section>
  )
}
