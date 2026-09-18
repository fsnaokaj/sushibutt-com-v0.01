"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { BrandMark } from "./BrandMark"
import { BottomNav } from "./BottomNav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden">
      <div className="hidden lg:flex h-full">
        <Sidebar />
      </div>

      {menuOpen ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-pink-950/35 backdrop-blur-sm" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="relative h-full w-64 bg-white shadow-2xl">
            <button type="button" onClick={() => setMenuOpen(false)} className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center" aria-label="Close menu">
              <X className="w-4 h-4" />
            </button>
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-border bg-white/90 backdrop-blur-sm">
          <button type="button" onClick={() => setMenuOpen(true)} className="w-9 h-9 rounded-xl border bg-white flex items-center justify-center" aria-label="Open menu">
            <Menu className="w-4 h-4" />
          </button>
          <BrandMark compact />
        </header>
        <main className="flex-1 min-h-0 overflow-y-auto pb-16 lg:pb-0">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
