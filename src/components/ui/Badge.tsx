"use client"

import { cn } from "@/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "cpm" | "default" | "success" | "outline"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
        variant === "cpm" && "bg-pink-100 text-pink-700",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "outline" && "border border-border bg-transparent text-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
