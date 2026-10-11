import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { sanitizeHandle } from "@/data/identity"
import { PublicProfile } from "./PublicProfile"

export const dynamic = "force-dynamic"
export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const h = sanitizeHandle(params.handle)
  return {
    title: `@${h} on SushiButt`,
    description: `@${h} is on the SushiButt belt. Clip. Compete. Build.`,
    openGraph: { images: [`/api/og/${h}`], url: `https://sushibutt.com/${h}` },
    twitter: { card: "summary_large_image", images: [`/api/og/${h}`] }
  }
}
export default function Page({ params }: { params: { handle: string } }) {
  const h = sanitizeHandle(params.handle)
  if (!/^[a-z0-9._]{3,20}$/.test(h)) notFound()
  return <PublicProfile handle={h} />
}
