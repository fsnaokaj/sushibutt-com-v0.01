import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "@/styles/globals.css"
import { LanguageProvider } from "@/i18n/LanguageProvider"

const nunito = Nunito({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["500", "700", "800"] })

export const metadata: Metadata = {
  title: "SushiButt.com — Clip. Compete. Get paid in pink.",
  description: "The SushiButt clipping marketplace. Brands list campaigns. Clippers compete for points, leaderboards, and prizes.",
  icons: { icon: "/favicon.svg" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
