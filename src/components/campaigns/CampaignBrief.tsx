"use client"

import { briefs } from "@/data/briefs"
import { useI18n } from "@/i18n/LanguageProvider"

export function CampaignBrief({ id }: { id: string }) {
  const { t } = useI18n()
  const brief = briefs[id]
  if (!brief) return null

  return (
    <div className="space-y-4 text-sm">
      <div className="rounded-2xl bg-secondary p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("campaign.brief")}</p>
        <p className="font-extrabold">{brief.who}</p>
        <p className="text-muted-foreground">{brief.mission}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        <div className="rounded-2xl border p-3 bg-white">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("campaign.length")}</p>
          <p className="font-bold">{brief.length}</p>
        </div>
        <div className="rounded-2xl border p-3 bg-white">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("campaign.tags")}</p>
          <p className="font-bold break-words">{brief.tags.join(" ")}</p>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("campaign.source")}</p>
        <div className="flex flex-wrap gap-2">
          {brief.sources.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-extrabold"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("campaign.how")}</p>
        <ol className="space-y-2">
          {brief.steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="w-6 h-6 shrink-0 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border p-3 bg-white">
          <p className="text-xs uppercase tracking-wide text-primary font-extrabold mb-1">{t("campaign.dos")}</p>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {brief.dos.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border p-3 bg-white">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-extrabold mb-1">{t("campaign.donts")}</p>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {brief.donts.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{brief.submit}</p>
    </div>
  )
}
