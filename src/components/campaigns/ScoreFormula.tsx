"use client"

import { useI18n } from "@/i18n/LanguageProvider"
import { CAMPAIGN_MULT, ER_CAP, ER_FLOOR, ER_GAIN, LIKE_W, COMMENT_W, PLATFORM_MULT, SHARE_W, VIEW_LOG, VIEW_PER_K, WATCH_W } from "@/data/scoring"

export function ScoreFormula({ compact }: { compact?: boolean }) {
  const { t } = useI18n()
  return (
    <div className={compact ? "space-y-2 text-sm" : "space-y-3 text-sm"}>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("score.kicker")}</p>
        <h2 className="font-extrabold text-lg">{t("score.title")}</h2>
      </div>
      <p className="text-muted-foreground">{t("score.clip")}</p>
      <ol className="space-y-1.5 list-decimal pl-5">
        <li>
          {t("score.viewsLine", { perK: VIEW_PER_K, log: VIEW_LOG })}
        </li>
        <li>
          {t("score.engageLine", { like: LIKE_W, comment: COMMENT_W, share: SHARE_W, watch: WATCH_W })}
        </li>
        <li>
          {t("score.erLine", { floor: ER_FLOOR, gain: ER_GAIN, cap: ER_CAP })}
        </li>
        <li>
          {t("score.multLine", {
            yt: PLATFORM_MULT.youtube,
            tt: PLATFORM_MULT.tiktok,
            ig: PLATFORM_MULT.instagram,
            x: PLATFORM_MULT.twitter,
            shelbie: CAMPAIGN_MULT["launch-film"],
            intro: CAMPAIGN_MULT["official-open"],
            daily: CAMPAIGN_MULT["daily-belt"]
          })}
        </li>
      </ol>
      <p className="text-xs text-muted-foreground">{t("score.example")}</p>
      {!compact && <p className="text-xs text-muted-foreground">{t("score.syncHint")}</p>}
    </div>
  )
}
