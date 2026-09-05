import { Campaign, OpenStatus } from "@/types"

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
  if (c.rateType === "points" || !c.budgetTotal) return t("pay.pointsNow")
  if (c.rateType === "fixed") return t("pay.soon")
  return t("pay.soon")
}

export function openStatus(c: Campaign): OpenStatus {
  return c.status ?? "live"
}

export function isActiveOpen(c: Campaign) {
  const status = openStatus(c)
  return status === "live" || status === "registering"
}

export function statusTone(status: OpenStatus) {
  if (status === "live") return "bg-emerald-100 text-emerald-800"
  if (status === "registering") return "bg-pink-100 text-pink-800"
  if (status === "upcoming") return "bg-amber-100 text-amber-800"
  return "bg-zinc-200 text-zinc-600"
}
