"use client"

import { useState } from "react"
import { AccountSummary } from "@/components/sb/AccountPanels"
import Link from "next/link"
import { Share2 } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { AvatarMark } from "@/components/profile/AvatarMark"
import { CampaignCard } from "@/components/campaigns/CampaignCard"
import { PayBanner } from "@/components/ui/PayBanner"
import { useAppStore, useAllCampaigns } from "@/hooks/useStore"
import { useI18n } from "@/i18n/LanguageProvider"
import { beltTag } from "@/data/leaderboard"
import { nextAvatarId, randomAvatarId, randomHandle, sanitizeHandle } from "@/data/identity"
import { cn } from "@/utils"

export default function ProfilePage() {
  const { t } = useI18n()
  const user = useAppStore((s) => s.user)
  const clips = useAppStore((s) => s.clips)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const all = useAllCampaigns()
  const [tab, setTab] = useState<"clips" | "opens">("clips")
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!user) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <div className="text-left"><AccountSummary /></div>
          <AvatarMark id="sushi" size={88} />
          <h1 className="text-2xl font-extrabold">{t("profile.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("profile.guest")}</p>
          <Link href="/join" className="inline-block px-6 py-3 bg-primary text-white rounded-full font-extrabold">{t("nav.join")}</Link>
        </div>
      </AppShell>
    )
  }

  const opens = all.filter((c) => user.joinedIds.includes(c.id))
  const likes = clips.reduce((n, c) => n + c.likes, 0)

  const share = async () => {
    const text = `https://sushibutt.com/@${user.handle}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        <AccountSummary />
        <div className="flex items-start justify-between">
          <AvatarMark id={user.avatarId} size={92} />
          <button type="button" onClick={share} className="w-9 h-9 rounded-full border bg-white flex items-center justify-center" aria-label={t("profile.share")}>
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h1 className="text-xl font-extrabold leading-tight">{user.name}</h1>
          <p className="text-sm font-bold text-muted-foreground">@{user.handle}</p>
          {user.privateAccount ? <p className="text-xs font-extrabold text-primary mt-1">{t("profile.privateOn")}</p> : null}
        </div>

        <div className="flex gap-8">
          <Stat n={user.joinedIds.length} label={t("profile.following")} />
          <Stat n={0} label={t("profile.fans")} />
          <Stat n={likes || user.points} label={t("profile.likes")} />
        </div>

        {user.bio ? <p className="text-sm">{user.bio}</p> : <p className="text-sm text-muted-foreground">{t("profile.bioHint")}</p>}

        <div className="flex gap-2">
          <button type="button" onClick={() => setEditing((v) => !v)} className="flex-1 py-2 border rounded-xl text-sm font-extrabold bg-white">
            {editing ? t("profile.doneEdit") : t("profile.edit")}
          </button>
          <button type="button" onClick={() => updateProfile({ avatarId: randomAvatarId(), handle: randomHandle() })} className="flex-1 py-2 border rounded-xl text-sm font-extrabold bg-white">
            {t("profile.shuffleLook")}
          </button>
        </div>
        {copied ? <p className="text-xs font-extrabold text-primary">{t("profile.copied")}</p> : null}

        {editing ? (
          <EditSheet
            name={user.name}
            handle={user.handle}
            bio={user.bio}
            avatarId={user.avatarId}
            privateAccount={user.privateAccount}
            onSave={(patch) => {
              updateProfile(patch)
              setEditing(false)
            }}
          />
        ) : null}

        <div className="grid grid-cols-3 text-center text-xs font-extrabold border-b">
          {(["clips", "opens"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn("py-3", tab === id ? "text-primary border-b-2 border-primary" : "text-muted-foreground")}
            >
              {t(`profile.${id}`)}
            </button>
          ))}
          <span className="py-3 text-muted-foreground">{user.points.toLocaleString("en-US")} ★</span>
        </div>

        {tab === "clips" ? (
          clips.length ? (
            <div className="grid grid-cols-3 gap-1">
              {clips.map((clip) => (
                <a key={clip.id} href={clip.url} target="_blank" rel="noreferrer" className="aspect-[9/16] rounded-lg bg-secondary border flex flex-col justify-end p-2">
                  <span className="text-[10px] font-extrabold uppercase">{clip.platform}</span>
                  <span className="text-[10px] text-muted-foreground">{clip.views} views</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t("profile.noClips")}</p>
          )
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {opens.length ? opens.map((c) => <CampaignCard key={c.id} campaign={c} />) : <p className="col-span-2 text-sm text-muted-foreground text-center py-8">{t("profile.noOpens")}</p>}
          </div>
        )}

        <p className="text-xs text-muted-foreground font-mono">{t("profile.publicTag")}: {beltTag(user.id)}</p>
        <PayBanner compact />
      </div>
    </AppShell>
  )
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-extrabold text-lg leading-none">{n}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

function EditSheet({
  name,
  handle,
  bio,
  avatarId,
  privateAccount,
  onSave
}: {
  name: string
  handle: string
  bio: string
  avatarId: string
  privateAccount: boolean
  onSave: (patch: { name: string; handle: string; bio: string; avatarId: string; privateAccount: boolean }) => void
}) {
  const { t } = useI18n()
  const [nextName, setNextName] = useState(name)
  const [nextHandle, setNextHandle] = useState(handle)
  const [nextBio, setNextBio] = useState(bio)
  const [nextAvatar, setNextAvatar] = useState(avatarId)
  const [locked, setLocked] = useState(privateAccount)

  return (
    <div className="border rounded-2xl p-4 bg-white space-y-3">
      <button type="button" onClick={() => setNextAvatar((id) => nextAvatarId(id))} className="mx-auto block" aria-label={t("onboard.shufflePic")}>
        <AvatarMark id={nextAvatar} size={72} />
      </button>
      <input value={nextName} onChange={(e) => setNextName(e.target.value)} placeholder={t("auth.name")} className="w-full px-3 py-2 border rounded-xl" />
      <div className="flex gap-2">
        <span className="self-center text-muted-foreground font-extrabold">@</span>
        <input value={nextHandle} onChange={(e) => setNextHandle(e.target.value)} className="flex-1 px-3 py-2 border rounded-xl font-mono" />
        <button type="button" onClick={() => setNextHandle(randomHandle())} className="px-3 border rounded-xl text-xs font-extrabold">{t("onboard.shuffle")}</button>
      </div>
      <textarea value={nextBio} onChange={(e) => setNextBio(e.target.value.slice(0, 80))} placeholder={t("profile.bio")} rows={2} className="w-full px-3 py-2 border rounded-xl text-sm" />
      <label className="flex items-center justify-between text-sm font-bold">
        <span>{t("profile.private")}</span>
        <input type="checkbox" checked={locked} onChange={(e) => setLocked(e.target.checked)} />
      </label>
      <button
        type="button"
        onClick={() => onSave({
          name: nextName,
          handle: sanitizeHandle(nextHandle) || handle,
          bio: nextBio,
          avatarId: nextAvatar,
          privateAccount: locked
        })}
        className="w-full py-2.5 bg-primary text-white rounded-full font-extrabold"
      >
        {t("settings.save")}
      </button>
    </div>
  )
}
