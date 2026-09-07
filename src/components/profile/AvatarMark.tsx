import { getAvatar } from "@/data/identity"
import { cn } from "@/utils"

export function AvatarMark({
  id,
  size = 64,
  className
}: {
  id?: string
  size?: number
  className?: string
}) {
  const avatar = getAvatar(id)
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full shrink-0 border-2 border-[#1a0a12] shadow-[2px_2px_0_#1a0a12]", className)}
      style={{ width: size, height: size, background: avatar.bg, fontSize: size * 0.46 }}
      aria-hidden
    >
      {avatar.emoji}
    </span>
  )
}
