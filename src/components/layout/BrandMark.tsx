import Link from "next/link"
import { cn } from "@/utils"

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 min-w-0", className)}>
      <span className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-lg shadow-[2px_2px_0_#1a0a12] border-2 border-[#1a0a12] shrink-0">
        🍣
      </span>
      <span className="min-w-0">
        <span className="block font-[family-name:var(--font-display)] text-2xl leading-none tracking-wide">SUSHIBUTT</span>
        {!compact ? (
          <span className="block text-[10px] text-primary font-extrabold tracking-[0.22em]">.COM ★ THE BELT</span>
        ) : (
          <span className="block text-[10px] text-primary font-extrabold tracking-[0.18em]">.COM ★</span>
        )}
      </span>
    </Link>
  )
}
