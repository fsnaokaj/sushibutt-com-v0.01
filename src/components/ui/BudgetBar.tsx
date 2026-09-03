"use client"

import { formatBudget, getBudgetPercent } from "@/utils"
import { cn } from "@/utils"

interface BudgetBarProps {
  spent: number
  total: number
  showLabels?: boolean
  className?: string
}

export function BudgetBar({ spent, total, showLabels = false, className }: BudgetBarProps) {
  const pct = getBudgetPercent(spent, total)

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{formatBudget(spent)}</span>
          <span>{formatBudget(total)}</span>
        </div>
      )}
      <div className="budget-bar">
        <div
          className="budget-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
