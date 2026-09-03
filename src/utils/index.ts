import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBudget(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`
  }
  return `$${amount.toLocaleString()}`
}

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`
  return views.toString()
}

export function getBudgetPercent(spent: number, total: number): number {
  return Math.min((spent / total) * 100, 100)
}

export function formatCPM(cpm: number): string {
  return `$${cpm}/1K`
}

export function getAvailableBudget(spent: number, total: number): number {
  return total - spent
}

export function withBasePath(path?: string): string | undefined {
  if (!path) return path
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  return path.startsWith("http") || path.startsWith(base) ? path : `${base}${path}`
}
