import { Campaign } from "@/types"

export function campaignTitle(c: Campaign, t: (path: string) => string) {
  if (c.customTitle) return c.customTitle
  const translated = t(`copy.${c.id}.title`)
  return translated.startsWith("copy.") ? c.id : translated
}

export function campaignCopy(c: Campaign, field: "description" | "requirements", t: (path: string) => string) {
  const translated = t(`copy.${c.id}.${field}`)
  return translated.startsWith("copy.") ? "" : translated
}

export function rateLabel(c: Campaign, t: (path: string) => string) {
  if (c.rateType === "fixed") return `$${c.fixedRate} ${t("campaign.fixed")}`
  if (c.rateType === "points") return `${t("campaign.points")}`
  return `$${c.cpm}/1K`
}
