"use client"

import { useEffect, useState } from "react"
import { LinkedAccounts } from "@/components/sb/AccountPanels"
import { AppShell } from "@/components/layout/AppShell"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { useAppStore } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { nextAvatarId, randomAvatarId, randomHandle, sanitizeHandle } from "@/data/identity"

export default function SettingsPage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [handle, setHandle] = useState(user?.handle ?? "")
  const [bio, setBio] = useState(user?.bio ?? "")
  const [avatarId, setAvatarId] = useState(user?.avatarId ?? "sushi")
  const [privateAccount, setPrivateAccount] = useState(user?.privateAccount ?? false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setHandle(user.handle)
    setBio(user.bio)
    setAvatarId(user.avatarId)
    setPrivateAccount(user.privateAccount)
  }, [user])

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <LinkedAccounts />
        <h1 className="text-2xl font-extrabold">{t("settings.title")}</h1>
        <div className="border rounded-2xl p-4 bg-white space-y-3">
          <h2 className="font-extrabold text-sm">{t("settings.language")}</h2>
          <LanguageSwitcher />
        </div>
        <div className="border rounded-2xl p-4 bg-white space-y-3">
          <h2 className="font-extrabold text-sm">{t("settings.account")}</h2>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setAvatarId((id) => nextAvatarId(id))} aria-label={t("onboard.shufflePic")}>
              <AvatarMark id={avatarId} size={64} />
            </button>
            <button type="button" onClick={() => setAvatarId(randomAvatarId())} className="text-xs font-extrabold text-primary">
              {t("onboard.shufflePic")}
            </button>
          </div>
          <label className="block text-xs text-muted-foreground">{t("settings.handle")}
            <div className="flex gap-2 mt-1">
              <input value={handle} onChange={(e) => setHandle(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl font-mono" />
              <button type="button" onClick={() => setHandle(randomHandle())} className="px-3 py-2 border rounded-xl text-xs font-extrabold">{t("onboard.shuffle")}</button>
            </div>
          </label>
          <label className="block text-xs text-muted-foreground">{t("settings.display")}
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl" />
          </label>
          <label className="block text-xs text-muted-foreground">{t("settings.email")}
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl" />
          </label>
          <label className="block text-xs text-muted-foreground">{t("profile.bio")}
            <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 80))} rows={2} className="w-full mt-1 px-3 py-2 border rounded-xl" />
          </label>
          <label className="flex justify-between text-sm font-bold">
            <span>{t("profile.private")}</span>
            <input type="checkbox" checked={privateAccount} onChange={(e) => setPrivateAccount(e.target.checked)} />
          </label>
        </div>
        <div className="border rounded-2xl p-4 bg-white space-y-2">
          <h2 className="font-extrabold text-sm">{t("settings.notes")}</h2>
          <label className="flex justify-between text-sm"><span>{t("settings.n1")}</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between text-sm"><span>{t("settings.n2")}</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between text-sm"><span>{t("settings.n3")}</span><input type="checkbox" /></label>
        </div>
        <button
          type="button"
          onClick={() => {
            updateProfile({
              name,
              email,
              handle: sanitizeHandle(handle) || user?.handle,
              bio,
              avatarId,
              privateAccount
            })
            setSaved(true)
            window.setTimeout(() => setSaved(false), 1600)
          }}
          disabled={!user}
          className="px-5 py-2.5 bg-primary text-white rounded-full font-extrabold disabled:opacity-50"
        >
          {saved ? t("settings.saved") : t("settings.save")}
        </button>
      </div>
    </AppShell>
  )
}
