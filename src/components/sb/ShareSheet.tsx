"use client"
import { useState } from "react"
import { X, Copy, Check } from "lucide-react"

/** Custom share sheet (X, Threads, WhatsApp, Telegram, Reddit, Facebook, email, copy, native). */
export function ShareSheet({ url, text, open, onClose, onShared }: { url: string; text: string; open: boolean; onClose: () => void; onShared?: () => void }) {
  const [copied, setCopied] = useState(false)
  if (!open) return null
  const u = encodeURIComponent(url), t = encodeURIComponent(text)
  const targets = [
    { label: "X", href: `https://x.com/intent/tweet?text=${t}&url=${u}`, bg: "#e5e7eb" },
    { label: "Threads", href: `https://www.threads.net/intent/post?text=${t}%20${u}`, bg: "#f3e8ff" },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, bg: "#dcfce7" },
    { label: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, bg: "#e0f2fe" },
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${t}`, bg: "#ffedd5" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, bg: "#dbeafe" },
    { label: "Email", href: `mailto:?subject=${t}&body=${u}`, bg: "#fce7f3" }
  ]
  return (
    <div className="fixed inset-0 z-[80] bg-black/30 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold">Share</h3>
          <button onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {targets.map((x) => (
            <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" onClick={onShared} className="flex flex-col items-center gap-1 text-xs font-bold">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold" style={{ background: x.bg }}>{x.label.slice(0, 2)}</span>
              {x.label}
            </a>
          ))}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button onClick={() => { navigator.share({ url, text }).then(onShared).catch(() => undefined) }} className="flex flex-col items-center gap-1 text-xs font-bold">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center bg-pink-100">⋯</span>More
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <input readOnly value={url} className="flex-1 px-3 py-2 border rounded-xl text-sm bg-pink-50" />
          <button onClick={() => { navigator.clipboard.writeText(url); setCopied(true); onShared?.(); setTimeout(() => setCopied(false), 1500) }} className="px-3 py-2 rounded-xl bg-primary text-white font-bold text-sm flex items-center gap-1">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  )
}
