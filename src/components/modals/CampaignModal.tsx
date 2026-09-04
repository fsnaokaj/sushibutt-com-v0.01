"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useAppStore } from "@/hooks/useStore"
import { CampaignBody } from "@/components/campaigns/CampaignBody"

export function CampaignModal() {
  const { modal, closeModal } = useAppStore()

  useEffect(() => {
    document.body.style.overflow = modal.open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [modal.open])

  if (!modal.open || !modal.campaign) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-pink-950/30 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <button onClick={closeModal} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        <CampaignBody c={modal.campaign} />
      </div>
    </div>
  )
}
