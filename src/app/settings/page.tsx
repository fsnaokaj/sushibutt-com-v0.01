"use client"

import { Sidebar } from "@/components/layout/Sidebar"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          <div className="space-y-4">
            <div className="border border-border rounded-xl p-4">
              <h2 className="font-semibold text-sm mb-3">Account</h2>
              <div className="space-y-3">
                <Field label="Display name" defaultValue="Your Name" />
                <Field label="Email" defaultValue="creator@example.com" type="email" />
              </div>
            </div>

            <div className="border border-border rounded-xl p-4">
              <h2 className="font-semibold text-sm mb-3">Notifications</h2>
              <div className="space-y-2">
                <Toggle label="Email me when a submission is approved" defaultChecked />
                <Toggle label="Email me about new campaigns" defaultChecked />
                <Toggle label="Email me weekly earnings summary" />
              </div>
            </div>

            <button className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
              Save changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full mt-1 px-3 py-2 text-sm bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  )
}

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="w-4 h-4 accent-foreground" />
    </label>
  )
}
