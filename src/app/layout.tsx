import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Nunito } from "next/font/google"
import "@/styles/globals.css"
import { LanguageProvider } from "@/i18n/LanguageProvider"
import { AccountProvider } from "@/lib/client/account"
import { MilestoneConfetti } from "@/components/sb/Confetti"

const nunito = Nunito({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["500", "700", "800"] })
const display = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display" })

export const metadata: Metadata = {
  metadataBase: new URL("https://sushibutt.com"),
  title: "SushiButt.com — Clip. Compete. Build.",
  description: "Clipping, contests, quests, and vibe jobs for creators, streamers, founders, and everyone on the belt. Points and prizes now. Payments coming soon.",
  applicationName: "SushiButt",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "SushiButt",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#ec4899" }]
  },
  openGraph: { type: "website", siteName: "SushiButt", url: "https://sushibutt.com", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SushiButt: Clip. Compete. Build." }] },
  twitter: { card: "summary_large_image", site: "@sushibutt", images: ["/og-image.png"] },
  other: { "msapplication-TileColor": "#ec4899", "msapplication-TileImage": "/mstile-150x150.png", "msapplication-config": "/browserconfig.xml" }
}

export const viewport: Viewport = {
  themeColor: "#ec4899",
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${display.variable}`}>
        <LanguageProvider><AccountProvider>{children}<MilestoneConfetti /></AccountProvider></LanguageProvider>
      </body>
    </html>
  )
}
