export type SourceLink = { label: string; href: string }

export type CampaignBrief = {
  who: string
  mission: string
  length: string
  tags: string[]
  sources: SourceLink[]
  steps: string[]
  dos: string[]
  donts: string[]
  submit: string
}

export const briefs: Record<string, CampaignBrief> = {
  "launch-film": {
    who: "Clippers, editors, and anyone with a phone",
    mission:
      "Help clip Shelbie's launch and intro. Cut her talking-head, launch bits, and first-look footage into shorts that make people hit follow. You are pushing @sushibuttshelbie — not a generic sushi meme.",
    length: "8–25 seconds (shorts) or 20–45 seconds (intro cut)",
    tags: ["@sushibuttshelbie", "@sushibutt", "#SushiButt", "#ShelbieLaunch"],
    sources: [
      { label: "X · @sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
      { label: "Instagram · @sushibuttshelbie", href: "https://www.instagram.com/sushibuttshelbie" },
      { label: "TikTok · @sushibuttshelbie", href: "https://www.tiktok.com/@sushibuttshelbie" }
    ],
    steps: [
      "Join this open ( +50 pts ).",
      "Pull her latest launch, intro, or talking-head from the source links. Screen-record only her public posts — no DMs, no private lives.",
      "Cut a hook in the first 1.5 seconds. Examples: the punchline first, a face close-up, or “wait for the launch.”",
      "Keep her voice. Captions on. Pink SushiButt sticker or @sushibuttshelbie on screen is enough branding.",
      "Post public on TikTok, Reels, Shorts, or X. Tag @sushibuttshelbie and @sushibutt in the caption.",
      "Paste the public URL below and submit ( +100 pts )."
    ],
    dos: [
      "Vertical 9:16 for shorts. 16:9 is OK for a YouTube intro cut.",
      "One idea per clip. Launch moment, intro line, or reaction — not a 3-minute recap.",
      "Safe for work. Her face and voice stay clear."
    ],
    donts: [
      "Do not crop her out, mock her, or add insult text.",
      "Do not burn in your email, phone, or full legal name.",
      "Do not use other people’s private footage."
    ],
    submit: "Paste the public TikTok / Reels / Shorts / X URL. Must be live and public."
  },
  "official-open": {
    who: "Clippers promoting SushiButt itself",
    mission:
      "Clip the official SushiButt intro and mascot drops — conveyor belt, pink nigiri, camels / igloo / volcano launch film energy. This is the brand open, not Shelbie’s personal launch.",
    length: "8–20 seconds",
    tags: ["@sushibutt", "@sushibuttshelbie", "@poshgoof", "#SushiButt"],
    sources: [
      { label: "X · @sushibutt", href: "https://x.com/sushibutt" },
      { label: "Instagram · @sushibutt", href: "https://www.instagram.com/sushibutt" },
      { label: "TikTok · @sushibutt", href: "https://www.tiktok.com/@sushibutt" }
    ],
    steps: [
      "Join ( +50 pts ).",
      "Grab official SushiButt footage from @sushibutt only — mascot, belt, launch-film stills, site hero.",
      "Cut a cold open: “coldest game on earth,” “fans decide,” or “pulled goalie to launch.”",
      "Tag @sushibutt in caption. Optional: @sushibuttshelbie @poshgoof.",
      "Post public, keep live 30 days, paste the URL, submit ( +100 pts )."
    ],
    dos: [
      "Official look: pink, sushi, belt, launch-film scenes.",
      "Captions in any language.",
      "Loop-friendly ending."
    ],
    donts: [
      "Do not pass off random sushi ASMR as official.",
      "Do not put private info on screen.",
      "Do not steal another clipper’s edit and reupload."
    ],
    submit: "Public post URL. Caption must include @sushibutt."
  },
  "follow-quest": {
    who: "Everyone. This is the easiest open on the belt.",
    mission:
      "Follow the three accounts we are launching with: @sushibutt, @sushibuttshelbie, and @poshgoof. Then follow SushiButt on Instagram and TikTok. One claim per follow.",
    length: "Under 2 minutes",
    tags: ["@sushibutt", "@sushibuttshelbie", "@poshgoof"],
    sources: [
      { label: "X · @sushibutt", href: "https://x.com/sushibutt" },
      { label: "X · @sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
      { label: "X · @poshgoof", href: "https://x.com/poshgoof" }
    ],
    steps: [
      "Onboard if you have not ( +80 pts and up ).",
      "Tap each follow button. It opens the profile. Hit Follow.",
      "Come back — the claim is +25 pts each, once.",
      "Optional: share the belt with all three tags ( +20 pts ).",
      "Daily check-in is a separate +15 pts."
    ],
    dos: [
      "Follow for real so you see launch clips to recut.",
      "Turn on alerts for @sushibuttshelbie if you are clipping her launch."
    ],
    donts: [
      "Do not claim and unfollow in the same minute. Honor system until we verify.",
      "Do not spam their replies with links."
    ],
    submit: "No clip URL needed. Claims are on the follow buttons."
  },
  "daily-belt": {
    who: "Clippers who can post one short a day",
    mission:
      "Every day, clip one new public post from Shelbie, SushiButt, or Poshgoof. Same-day energy. Help the launch stay warm without waiting for a big pack.",
    length: "7–15 seconds",
    tags: ["@sushibuttshelbie", "@sushibutt", "@poshgoof", "#SushiButtDaily"],
    sources: [
      { label: "X · @sushibuttshelbie", href: "https://x.com/sushibuttshelbie" },
      { label: "Instagram · @sushibuttshelbie", href: "https://www.instagram.com/sushibuttshelbie" },
      { label: "TikTok · @sushibuttshelbie", href: "https://www.tiktok.com/@sushibuttshelbie" },
      { label: "X · @sushibutt", href: "https://x.com/sushibutt" },
      { label: "X · @poshgoof", href: "https://x.com/poshgoof" }
    ],
    steps: [
      "Check in today ( +15 pts ).",
      "Pick today’s post from one of the three sources. Screenshot the time so it is clearly new.",
      "Cut a 7–15s vertical. Hook first. Caption: who you clipped + the three tags.",
      "Post public. Paste URL. Submit ( +100 pts ). Join this open first if you have not ( +50 pts )."
    ],
    dos: [
      "One daily submit is the quest. Extra clips can go in Shelbie Launch or Official Intro.",
      "If they posted a launch teaser today, clip that — not an old dunk."
    ],
    donts: [
      "Do not recycle yesterday’s clip with a new caption.",
      "Do not clip hate comments. Clip the creator."
    ],
    submit: "Public URL posted today. Caption must tag the person you clipped."
  }
}
