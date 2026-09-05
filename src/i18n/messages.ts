import { Locale } from "@/types"

export type Messages = {
  brand: string
  tagline: string
  nav: Record<string, string>
  home: Record<string, string>
  filters: Record<string, string>
  category: Record<string, string>
  sort: Record<string, string>
  campaign: Record<string, string>
  auth: Record<string, string>
  brandPage: Record<string, string>
  earnings: Record<string, string>
  profile: Record<string, string>
  notify: Record<string, string>
  settings: Record<string, string>
  board: Record<string, string>
  prizes: Record<string, string>
  roles: Record<string, string>
  goals: Record<string, string>
  onboard: Record<string, string>
  pay: Record<string, string>
  quests: Record<string, string>
  score: Record<string, string>
  copy: Record<string, { title: string; description: string; requirements: string }>
}

const en: Messages = {
  brand: "SushiButt",
  tagline: "Clip. Compete. Build. For everyone on the belt.",
  nav: {
    campaigns: "Campaigns",
    earnings: "My Earnings",
    leaderboard: "Leaderboard",
    prizes: "Prizes",
    profile: "Profile",
    notifications: "Notifications",
    settings: "Settings",
    join: "Join / Login",
    list: "List a Campaign",
    logout: "Log out"
  },
  home: {
    join: "Join Campaign",
    all: "Open Campaigns",
    empty: "No campaigns found",
    emptyHint: "Try Active, Live, Registering, or All.",
    heroMeta: "{category} · {rate}",
    payBanner: "Points and prizes are live. Cash payments coming soon.",
    starting: "Launch opens",
    showing: "{count} opens · {status}"
  },
  filters: {
    search: "Search contests, quests, jobs & clips",
    category: "Category",
    content: "Content",
    sort: "Sort by",
    clear: "Clear",
    allContent: "All content types",
    clipping: "Clipping",
    ugc: "UGC",
    quest: "Quest",
    contest: "Contest",
    job: "Job",
    active: "Active",
    live: "Live",
    registering: "Registering",
    upcoming: "Upcoming",
    ended: "Ended",
    all: "All"
  },
  category: {
    "All Categories": "All Categories",
    Music: "Music",
    Gaming: "Gaming",
    Entertainment: "Entertainment",
    Sports: "Sports",
    Lifestyle: "Lifestyle",
    Meme: "Meme",
    Jobs: "Jobs"
  },
  sort: {
    Featured: "Featured",
    "Live first": "Live first",
    Newest: "Newest",
    "Highest Budget": "Highest Budget",
    "Highest Available Budget": "Highest Available Budget",
    "Highest CPM": "Highest CPM",
    "Most Paid Out": "Most Paid Out",
    "Most Creators": "Most Creators"
  },
  campaign: {
    back: "Back",
    notFound: "Campaign not found",
    join: "Join Campaign",
    register: "Register",
    closed: "Closed",
    comingOpen: "Coming soon",
    status: "Status",
    joined: "You're in 🍣",
    share: "Share",
    overview: "Overview",
    leaderboard: "Leaderboard",
    analytics: "Analytics",
    requirements: "Requirements",
    earnings: "Payouts",
    resources: "Resources",
    budget: "budget",
    views: "views",
    noData: "No data yet.",
    noAnalytics: "No analytics yet.",
    lastUpdated: "Last updated",
    ago: "ago",
    category: "Category",
    platforms: "Platforms",
    cpm: "$/1K",
    fixed: "fixed / clip",
    points: "points race",
    prizePool: "prize pool",
    submit: "Submit clip URL",
    submitted: "Submitted · +100 pts",
    pasteUrl: "Paste public TikTok / Reels / Shorts / X URL",
    needUrl: "Need a public http(s) link.",
    brief: "The brief",
    how: "How to do it",
    source: "Source footage",
    tags: "Tags",
    length: "Length",
    dos: "Do",
    donts: "Don't",
    comingSoon: "Payments coming soon"
  },
  auth: {
    title: "Enter the conveyor belt",
    subtitle: "Creators, streamers, vibe coders, biohackers, jocks, degens, models, geeks — pick as many as you are.",
    clipper: "Clipper",
    brand: "Brand / founder",
    name: "Display name",
    email: "Email",
    password: "Password",
    register: "Create account",
    login: "Log in",
    have: "Already have an account?",
    need: "Need an account?",
    switch: "Switch",
    welcome: "Welcome back",
    guest: "Guest clipper"
  },
  brandPage: {
    title: "List a SushiButt open",
    subtitle: "Founders and brands post clipping, contests, quests, and jobs. Points are live. Cash payments coming soon.",
    name: "Title",
    budget: "Prize notes (optional)",
    cpm: "Rate notes",
    type: "Reward type",
    publish: "Publish open",
    published: "Your open is live on the belt. +75 pts",
    needBrand: "Onboard as a founder or brand to list opens. You can still be a clipper too.",
    mine: "Your live opens"
  },
  earnings: {
    title: "My Earnings",
    subtitle: "Points now. Cash payouts coming soon.",
    earned: "Cash earned",
    pending: "Pending payout",
    views: "Total views",
    points: "Sushi points",
    byCampaign: "Earnings by campaign",
    campaign: "Campaign",
    agency: "Brand",
    cpm: "Rate",
    none: "Join a campaign to start earning.",
    clips: "Your clips",
    listing: "Listing",
    engagement: "Engagement"
  },
  profile: {
    title: "Your Profile",
    member: "Member of the SushiButt belt",
    accounts: "Connected accounts",
    payouts: "Payout details",
    method: "Payout method",
    min: "Minimum payout",
    connect: "Connect",
    connected: "Connected",
    role: "Roles",
    points: "Points",
    publicTag: "Public belt tag",
    publicHint: "This is all the board shows. Your name and email stay private."
  },
  notify: {
    title: "Notifications",
    n1t: "Champagne heat",
    n1d: "Top 8 on the anonymous board wear Champagne. Champion is #1.",
    n2t: "Quest points",
    n2d: "Join, submit, list, and onboard all stack Sushi points.",
    n3t: "Ruby / Sapphire / Platinum",
    n3d: "Climb 1–33 Ruby, 34–66 Sapphire, 67–99 Platinum.",
    n4t: "Payments coming soon",
    n4d: "Points and prizes are live. Cash payouts are on the way."
  },
  settings: {
    title: "Settings",
    account: "Account",
    language: "Language",
    display: "Display name",
    email: "Email",
    save: "Save changes",
    notes: "Notifications",
    n1: "Email me when a clip is approved",
    n2: "Email me about new SushiButt campaigns",
    n3: "Weekly points + prize recap"
  },
  board: {
    title: "Gem Board",
    subtitle: "Top 99. Anonymous belt tags only — no names, no socials, no scrapeable IDs.",
    rank: "Rank",
    clipper: "Belt tag",
    points: "Points",
    views: "Views",
    prize: "Gem",
    you: "You",
    champion: "Champion",
    champagne: "Champagne",
    champagneD: "Top 8. #1 is Champion.",
    ruby: "Ruby",
    rubyD: "Ranks 1–33. Champagne sits at the top of Ruby.",
    sapphire: "Sapphire",
    sapphireD: "Ranks 34–66.",
    platinum: "Platinum",
    platinumD: "Ranks 67–99.",
    climbing: "You're on the belt",
    climbingD: "{points} pts · public tag {tag} · keep stacking to crack top 99."
  },
  prizes: {
    title: "Gems, points & prizes",
    subtitle: "Everything earns points. Gem ranks are the flex. Cash payments coming soon.",
    weekly: "Champagne (top 8)",
    weeklyD: "#1 Champion. #2–8 Champagne. Unique gem heat at the top of the belt.",
    wasabi: "Ruby · Sapphire · Platinum",
    wasabiD: "1–33 Ruby. 34–66 Sapphire. 67–99 Platinum. Climb a tier, then hunt Champagne.",
    fixed: "Floor points",
    fixedD: "Onboard, follow @sushibutt @sushibuttshelbie @poshgoof, join, submit, list — they all stack before views.",
    cpm: "Payments coming soon",
    cpmD: "No fake dollar CPMs. Views pay in Sushi points. Cash payouts are next.",
    algo: "Views & engagement",
    algoD: "8 ★ / 1K views + a log bonus, then likes / comments / shares / watch-through, then ER × platform × campaign."
  },
  roles: {
    clipper: "Clipper",
    founder: "Founder",
    brand: "Brand",
    editor: "Video editor",
    artist: "Artist",
    vibe: "Vibe coder",
    streamer: "Streamer",
    creator: "Creator",
    biohacker: "Biohacker",
    jock: "Jock",
    degen: "Degen",
    model: "Model",
    geek: "Geek"
  },
  goals: {
    clip: "Clip & post",
    compete: "Climb the gem board",
    list: "List contests / jobs",
    edit: "Edit launch films",
    art: "Make art & marketing",
    code: "Vibe code bounties",
    prizes: "Hunt prizes"
  },
  onboard: {
    who: "Who are you?",
    whoD: "Pick every hat you wear. Clipper and founder is a valid combo.",
    want: "What do you want?",
    wantD: "Select as many as you like.",
    you: "Name for your private profile",
    youD: "The public board never shows this. You'll get a Belt · XXX tag instead.",
    next: "Next",
    back: "Back",
    done: "Enter the belt",
    needRole: "Pick at least one identity.",
    needGoal: "Pick at least one goal.",
    pts: "+{n} pts for finishing onboard"
  },
  pay: {
    soon: "Payments coming soon",
    soonD: "Points and prizes are live. Cash payouts are on the way — no fake dollar rates.",
    pointsNow: "Points · prizes · payments soon"
  },
  quests: {
    kicker: "Easy points",
    title: "Follow quests",
    subtitle: "Follow the belt. Claim once. Opens X / Instagram / TikTok in a new tab.",
    done: "Claimed",
    share: "Share the belt · tag @sushibutt @sushibuttshelbie @poshgoof",
    checkin: "Daily check-in",
    table: "Onboard +{onboard} · follow +{follow} · join +{join} · submit +{submit} · then views and engagement keep scoring"
  },
  score: {
    title: "How Sushi points work",
    kicker: "The algorithm",
    clip: "Quests are the floor. Clip score grows with views and engagement.",
    viewsLine: "{perK} ★ per 1K views, plus {log} × log10(1 + views) — the first thousand hits harder than the millionth.",
    engageLine: "Likes × {like} · comments × {comment} · shares × {share} · watch-through × views × {watch}",
    erLine: "Then × engagement rate ({floor}–{cap}×) from (likes + comments + shares) ÷ views.",
    multLine: "Then × platform (YouTube {yt}× · TikTok {tt}× · IG {ig}× · X {x}×) × campaign (Shelbie Launch {shelbie}× · Intro {intro}× · Daily {daily}×).",
    example: "Example: 1K TikTok views, 50 likes, 8 comments, 5 shares, 25% watch on Shelbie Launch ≈ 260 ★.",
    syncHint: "Sync pulls public-post estimates until live TikTok / Reels / Shorts / X APIs are wired. Counts never go down. Paste real stats anytime.",
    sync: "Sync views",
    report: "Paste real stats",
    apply: "Apply stats",
    views: "Views",
    likes: "Likes",
    comments: "Comments",
    shares: "Shares",
    watch: "Watch %",
    er: "ER",
    clipPts: "Clip ★",
    clipMeta: "{likes} likes · {comments} comments · {shares} shares · {watch}% watched",
    none: "Submit a public clip URL. Views start the meter.",
    more: "Add another public URL — extra listings +25 ★, then views take over.",
    actions: "Floor points (onboard, follow, join, submit) still stack on top."
  },
  copy: {
    "official-open": {
      title: "Clip SushiButt Intro",
      description: "Cut official SushiButt intro and mascot drops — belt, nigiri, launch-film energy. Tag @sushibutt. This is the brand open.",
      requirements: "Official @sushibutt footage only. 8–20 seconds. Caption @sushibutt. Keep live 30 days."
    },
    "follow-quest": {
      title: "Follow the Belt",
      description: "Easiest points: follow @sushibutt, @sushibuttshelbie, and @poshgoof, plus SushiButt on IG and TikTok.",
      requirements: "Tap follow, follow for real, claim once. Then clip their launch posts in the other opens."
    },
    "launch-film": {
      title: "Clip Shelbie's Launch",
      description: "Help clip Shelbie's launch and intro video. Pull from @sushibuttshelbie, cut a hook in 1.5s, tag her and @sushibutt, paste the public URL.",
      requirements: "Her public launch/intro/talking-head only. 8–25s shorts or 20–45s intro cut. Tags: @sushibuttshelbie @sushibutt #ShelbieLaunch."
    },
    "daily-belt": {
      title: "Daily Clip Quest",
      description: "One new short a day from Shelbie, SushiButt, or Poshgoof. Same-day post. Keep the launch warm.",
      requirements: "Clip a post from today. 7–15 seconds. Tag the person you clipped plus #SushiButtDaily."
    }
  }
}

function tr(over: Partial<Messages>): Messages {
  return {
    ...en,
    ...over,
    nav: { ...en.nav, ...over.nav },
    home: { ...en.home, ...over.home },
    filters: { ...en.filters, ...over.filters },
    category: { ...en.category, ...over.category },
    sort: { ...en.sort, ...over.sort },
    campaign: { ...en.campaign, ...over.campaign },
    auth: { ...en.auth, ...over.auth },
    brandPage: { ...en.brandPage, ...over.brandPage },
    earnings: { ...en.earnings, ...over.earnings },
    profile: { ...en.profile, ...over.profile },
    notify: { ...en.notify, ...over.notify },
    settings: { ...en.settings, ...over.settings },
    board: { ...en.board, ...over.board },
    prizes: { ...en.prizes, ...over.prizes },
    roles: { ...en.roles, ...over.roles },
    goals: { ...en.goals, ...over.goals },
    onboard: { ...en.onboard, ...over.onboard },
    pay: { ...en.pay, ...over.pay },
    quests: { ...en.quests, ...over.quests },
    score: { ...en.score, ...over.score },
    copy: { ...en.copy, ...over.copy }
  }
}

const ja = tr({
  brand: "SushiButt",
  tagline: "クリップして、競争して、ピンクで稼ぐ。",
  nav: { campaigns: "キャンペーン", earnings: "収益", leaderboard: "ランキング", prizes: "賞品", profile: "プロフィール", notifications: "通知", settings: "設定", join: "登録 / ログイン", list: "キャンペーン掲載", logout: "ログアウト" },
  home: { join: "参加する", all: "開催中のキャンペーン", empty: "見つかりません", emptyHint: "フィルターを変えてみてください" },
  filters: { search: "キャンペーンとクリッパーを検索", category: "カテゴリ", content: "コンテンツ", sort: "並び替え", clear: "クリア", allContent: "すべてのタイプ", clipping: "クリッピング", ugc: "UGC" },
  category: { "All Categories": "すべて", Music: "音楽", Gaming: "ゲーム", Entertainment: "エンタメ", Sports: "スポーツ", Lifestyle: "ライフスタイル", Meme: "ミーム" },
  campaign: { back: "戻る", notFound: "キャンペーンがありません", join: "参加する", joined: "参加済み 🍣", overview: "概要", leaderboard: "ランキング", analytics: "分析", requirements: "条件", earnings: "報酬", budget: "予算", views: "再生", submit: "クリップを提出", submitted: "提出済み · +100pts", fixed: "固定 / 本", points: "ポイント戦", prizePool: "賞金プール" },
  auth: { title: "ベルトに乗る", subtitle: "クリッパーはポイントと賞品を競い、ブランドは案件を出します。", clipper: "クリッパーです", brand: "ブランドです", name: "表示名", email: "メール", password: "パスワード", register: "アカウント作成", login: "ログイン", have: "すでにアカウントがある", need: "アカウントが必要", welcome: "おかえり", guest: "ゲスト" },
  brandPage: { title: "キャンペーンを掲載", subtitle: "CPM、固定単価、またはポイント賞金を設定。", name: "タイトル", budget: "予算 (USD)", publish: "公開する", published: "公開されました。", needBrand: "創業者かブランドとしてオンボード。クリッパーも同時OK。", mine: "あなたの案件" },
  earnings: { title: "収益", subtitle: "再生、報酬、ポイント。", earned: "合計収益", pending: "保留中", views: "総再生", points: "ポイント", byCampaign: "案件別", none: "参加して稼ぎ始めましょう。" },
  profile: { title: "プロフィール", member: "SushiButtメンバー", accounts: "連携アカウント", payouts: "支払い", connect: "連携", connected: "連携済", role: "ロール", points: "ポイント" },
  settings: { title: "設定", language: "言語", save: "保存", notes: "通知" },
})

const ko = tr({
  brand: "SushiButt",
  tagline: "클립하고, 경쟁하고, 핑크로 벌어라.",
  nav: { campaigns: "캠페인", earnings: "수익", leaderboard: "리더보드", prizes: "상품", profile: "프로필", notifications: "알림", settings: "설정", join: "가입 / 로그인", list: "캠페인 등록", logout: "로그아웃" },
  home: { join: "캠페인 참여", all: "진행 중 캠페인", empty: "캠페인이 없습니다", emptyHint: "필터를 바꿔보세요" },
  filters: { search: "캠페인과 클리퍼 검색", category: "카테고리", content: "콘텐츠", sort: "정렬", clear: "지우기", allContent: "모든 유형", clipping: "클리핑", ugc: "UGC" },
  category: { "All Categories": "전체", Music: "음악", Gaming: "게임", Entertainment: "엔터", Sports: "스포츠", Lifestyle: "라이프", Meme: "밈" },
  campaign: { back: "뒤로", join: "참여하기", joined: "참여함 🍣", overview: "개요", leaderboard: "리더보드", requirements: "조건", earnings: "페이아웃", budget: "예산", submit: "클립 제출", submitted: "제출됨 · +100pts", fixed: "고정 / 클립", points: "포인트전", prizePool: "상금" },
  auth: { title: "벨트에 올라타기", subtitle: "클리퍼는 포인트와 상품을 놓고 경쟁하고, 브랜드는 캠페인을 올립니다.", clipper: "클리퍼입니다", brand: "브랜드입니다", register: "계정 만들기", login: "로그인", name: "이름", email: "이메일", password: "비밀번호" },
  brandPage: { title: "캠페인 올리기", name: "제목", budget: "예산 (USD)", publish: "게시", published: "게시되었습니다.", needBrand: "파운더나 브랜드로 온보딩. 클리퍼도 동시에 가능.", mine: "내 캠페인" },
  earnings: { title: "내 수익", earned: "총 수익", pending: "대기 중", views: "총 조회", points: "포인트", none: "캠페인에 참여해 수익을 시작하세요." },
  profile: { title: "프로필", member: "SushiButt 멤버", connect: "연결", connected: "연결됨", role: "역할", points: "포인트" },
  settings: { title: "설정", language: "언어", save: "저장" },
})

const zh = tr({
  brand: "SushiButt",
  tagline: "剪辑、竞赛、赚粉色奖金。",
  nav: { campaigns: "活动", earnings: "收益", leaderboard: "排行榜", prizes: "奖品", profile: "资料", notifications: "通知", settings: "设置", join: "注册 / 登录", list: "发布活动", logout: "退出" },
  home: { join: "参加活动", all: "进行中的活动", empty: "没有活动", emptyHint: "试试调整筛选" },
  filters: { search: "搜索活动与剪辑者", category: "分类", content: "内容", sort: "排序", clear: "清除", allContent: "全部类型", clipping: "剪辑", ugc: "UGC" },
  category: { "All Categories": "全部", Music: "音乐", Gaming: "游戏", Entertainment: "娱乐", Sports: "体育", Lifestyle: "生活", Meme: "梗" },
  campaign: { back: "返回", join: "参加", joined: "已参加 🍣", overview: "概览", leaderboard: "排行榜", requirements: "要求", earnings: "结算", budget: "预算", submit: "提交成片", submitted: "已提交 · +100分", fixed: "固定 / 条", points: "积分赛", prizePool: "奖池" },
  auth: { title: "上传送带", subtitle: "创作者争积分与奖品，品牌发布活动。", clipper: "我是剪辑者", brand: "我是品牌", register: "创建账户", login: "登录", name: "昵称", email: "邮箱", password: "密码" },
  brandPage: { title: "发布 SushiButt 活动", name: "标题", budget: "预算 (USD)", publish: "发布", published: "已上线。", needBrand: "以创始人或品牌身份加入。同时也可以是剪辑者。", mine: "你的活动" },
  earnings: { title: "我的收益", earned: "总收益", pending: "待结算", views: "总播放", points: "积分", none: "参加活动开始赚钱。" },
  profile: { title: "资料", member: "SushiButt 成员", connect: "连接", connected: "已连接", role: "身份", points: "积分" },
  settings: { title: "设置", language: "语言", save: "保存" },
})

const ru = tr({
  brand: "SushiButt",
  tagline: "Клипай. Соревнуйся. Получай розовые деньги.",
  nav: { campaigns: "Кампании", earnings: "Доход", leaderboard: "Таблица", prizes: "Призы", profile: "Профиль", notifications: "Уведомления", settings: "Настройки", join: "Вход / Регистрация", list: "Создать кампанию", logout: "Выйти" },
  home: { join: "Вступить", all: "Открытые кампании", empty: "Кампаний нет", emptyHint: "Смените фильтры" },
  filters: { search: "Поиск кампаний и клиперов", category: "Категория", content: "Контент", sort: "Сортировка", clear: "Сброс", allContent: "Все типы", clipping: "Клипы", ugc: "UGC" },
  category: { "All Categories": "Все", Music: "Музыка", Gaming: "Игры", Entertainment: "Шоу", Sports: "Спорт", Lifestyle: "Лайфстайл", Meme: "Мемы" },
  campaign: { back: "Назад", join: "Вступить", joined: "Вы в деле 🍣", overview: "Обзор", leaderboard: "Таблица", requirements: "Условия", earnings: "Выплаты", budget: "бюджет", submit: "Отправить клип", submitted: "Отправлено · +100 очков", fixed: "фикс / клип", points: "гонка очков", prizePool: "призовой фонд" },
  auth: { title: "На ленту", subtitle: "Клиперы бьются за очки и призы. Бренды запускают кампании.", clipper: "Я клипер", brand: "Я бренд", register: "Создать аккаунт", login: "Войти", name: "Имя", email: "Почта", password: "Пароль" },
  brandPage: { title: "Запустить кампанию", name: "Название", budget: "Бюджет (USD)", publish: "Опубликовать", published: "Кампания в эфире.", needBrand: "Онбординг как фаундер или бренд. Клипером тоже можно.", mine: "Ваши кампании" },
  earnings: { title: "Мой доход", earned: "Всего", pending: "Ожидает", views: "Просмотры", points: "Очки", none: "Вступите в кампанию, чтобы начать." },
  profile: { title: "Профиль", member: "Участник SushiButt", connect: "Связать", connected: "Связано", role: "Роль", points: "Очки" },
  settings: { title: "Настройки", language: "Язык", save: "Сохранить" },
})

const es = tr({
  brand: "SushiButt",
  tagline: "Corta. Compite. Cobra en rosa.",
  nav: { campaigns: "Campañas", earnings: "Ganancias", leaderboard: "Clasificación", prizes: "Premios", profile: "Perfil", notifications: "Avisos", settings: "Ajustes", join: "Entrar / Registro", list: "Publicar campaña", logout: "Salir" },
  home: { join: "Unirme", all: "Campañas abiertas", empty: "Sin campañas", emptyHint: "Prueba otros filtros" },
  filters: { search: "Busca campañas y clippers", category: "Categoría", content: "Contenido", sort: "Ordenar", clear: "Limpiar", allContent: "Todos los tipos", clipping: "Clipping", ugc: "UGC" },
  category: { "All Categories": "Todas", Music: "Música", Gaming: "Gaming", Entertainment: "Entretenimiento", Sports: "Deportes", Lifestyle: "Estilo de vida", Meme: "Meme" },
  campaign: { back: "Volver", join: "Unirme", joined: "Ya estás dentro 🍣", overview: "Resumen", leaderboard: "Clasificación", requirements: "Requisitos", earnings: "Pagos", budget: "presupuesto", submit: "Enviar clip", submitted: "Enviado · +100 pts", fixed: "fijo / clip", points: "carrera de puntos", prizePool: "bote" },
  auth: { title: "Súbete a la cinta", subtitle: "Los clippers compiten por puntos y premios. Las marcas publican campañas.", clipper: "Soy clipper", brand: "Soy marca", register: "Crear cuenta", login: "Entrar", name: "Nombre", email: "Email", password: "Contraseña" },
  brandPage: { title: "Publica una campaña", name: "Título", budget: "Presupuesto (USD)", publish: "Publicar", published: "La campaña ya está en la cinta.", needBrand: "Entra como founder o marca. También puedes ser clipper.", mine: "Tus campañas" },
  earnings: { title: "Mis ganancias", earned: "Total", pending: "Pendiente", views: "Vistas", points: "Puntos", none: "Únete a una campaña para empezar." },
  profile: { title: "Perfil", member: "Miembro de SushiButt", connect: "Conectar", connected: "Conectado", role: "Rol", points: "Puntos" },
  settings: { title: "Ajustes", language: "Idioma", save: "Guardar" },
})

const nl = tr({
  brand: "SushiButt",
  tagline: "Clip. Strijd. Word in het roze betaald.",
  nav: { campaigns: "Campagnes", earnings: "Inkomsten", leaderboard: "Ranglijst", prizes: "Prijzen", profile: "Profiel", notifications: "Meldingen", settings: "Instellingen", join: "Join / Login", list: "Campagne plaatsen", logout: "Uitloggen" },
  home: { join: "Meedoen", all: "Open campagnes", empty: "Geen campagnes", emptyHint: "Pas je filters aan" },
  filters: { search: "Zoek campagnes en clippers", category: "Categorie", content: "Content", sort: "Sorteren", clear: "Wissen", allContent: "Alle types", clipping: "Clipping", ugc: "UGC" },
  category: { "All Categories": "Alles", Music: "Muziek", Gaming: "Gaming", Entertainment: "Entertainment", Sports: "Sport", Lifestyle: "Lifestyle", Meme: "Meme" },
  campaign: { back: "Terug", join: "Meedoen", joined: "Je zit erin 🍣", overview: "Overzicht", leaderboard: "Ranglijst", requirements: "Eisen", earnings: "Uitbetaling", budget: "budget", submit: "Clip insturen", submitted: "Ingestuurd · +100 pts", fixed: "vast / clip", points: "puntenrace", prizePool: "prijzenpot" },
  auth: { title: "Stap op de band", subtitle: "Clippers vechten om punten en prijzen. Merken zetten campagnes live.", clipper: "Ik ben clipper", brand: "Ik ben merk", register: "Account maken", login: "Inloggen", name: "Naam", email: "E-mail", password: "Wachtwoord" },
  brandPage: { title: "Zet een campagne live", name: "Titel", budget: "Budget (USD)", publish: "Publiceren", published: "Campagne staat op de band.", needBrand: "Onboard als founder of merk. Clipper mag erbij.", mine: "Jouw campagnes" },
  earnings: { title: "Mijn inkomsten", earned: "Totaal", pending: "In behandeling", views: "Views", points: "Punten", none: "Doe mee om te verdienen." },
  profile: { title: "Profiel", member: "SushiButt-lid", connect: "Koppelen", connected: "Gekoppeld", role: "Rol", points: "Punten" },
  settings: { title: "Instellingen", language: "Taal", save: "Opslaan" },
})

const fr = tr({
  brand: "SushiButt",
  tagline: "Clippe. Affronte. Sois payé en rose.",
  nav: { campaigns: "Campagnes", earnings: "Gains", leaderboard: "Classement", prizes: "Prix", profile: "Profil", notifications: "Notifs", settings: "Réglages", join: "Rejoindre / Connexion", list: "Publier une campagne", logout: "Déconnexion" },
  home: { join: "Rejoindre", all: "Campagnes ouvertes", empty: "Aucune campagne", emptyHint: "Change tes filtres" },
  filters: { search: "Cherche campagnes et clippeurs", category: "Catégorie", content: "Contenu", sort: "Trier", clear: "Effacer", allContent: "Tous les types", clipping: "Clipping", ugc: "UGC" },
  category: { "All Categories": "Toutes", Music: "Musique", Gaming: "Jeux", Entertainment: "Divertissement", Sports: "Sport", Lifestyle: "Lifestyle", Meme: "Mème" },
  campaign: { back: "Retour", join: "Rejoindre", joined: "Tu es in 🍣", overview: "Aperçu", leaderboard: "Classement", requirements: "Règles", earnings: "Paiements", budget: "budget", submit: "Envoyer un clip", submitted: "Envoyé · +100 pts", fixed: "fixe / clip", points: "course de points", prizePool: "cagnotte" },
  auth: { title: "Monte sur le tapis", subtitle: "Les clippeurs jouent les points et les prix. Les marques lancent des campagnes.", clipper: "Je suis clippeur", brand: "Je suis marque", register: "Créer un compte", login: "Connexion", name: "Nom", email: "Email", password: "Mot de passe" },
  brandPage: { title: "Lancer une campagne", name: "Titre", budget: "Budget (USD)", publish: "Publier", published: "Campagne en ligne.", needBrand: "Onboarde en fondateur ou marque. Clippeur en même temps OK.", mine: "Tes campagnes" },
  earnings: { title: "Mes gains", earned: "Total", pending: "En attente", views: "Vues", points: "Points", none: "Rejoins une campagne pour commencer." },
  profile: { title: "Profil", member: "Membre SushiButt", connect: "Connecter", connected: "Connecté", role: "Rôle", points: "Points" },
  settings: { title: "Réglages", language: "Langue", save: "Enregistrer" },
})

const it = tr({
  brand: "SushiButt",
  tagline: "Clippa. Competi. Incassa in rosa.",
  nav: { campaigns: "Campagne", earnings: "Guadagni", leaderboard: "Classifica", prizes: "Premi", profile: "Profilo", notifications: "Notifiche", settings: "Impostazioni", join: "Entra / Registrati", list: "Pubblica campagna", logout: "Esci" },
  home: { join: "Unisciti", all: "Campagne aperte", empty: "Nessuna campagna", emptyHint: "Prova altri filtri" },
  filters: { search: "Cerca campagne e clipper", category: "Categoria", content: "Contenuto", sort: "Ordina", clear: "Pulisci", allContent: "Tutti i tipi", clipping: "Clipping", ugc: "UGC" },
  category: { "All Categories": "Tutte", Music: "Musica", Gaming: "Gaming", Entertainment: "Intrattenimento", Sports: "Sport", Lifestyle: "Lifestyle", Meme: "Meme" },
  campaign: { back: "Indietro", join: "Unisciti", joined: "Sei dentro 🍣", overview: "Panoramica", leaderboard: "Classifica", requirements: "Requisiti", earnings: "Pagamenti", budget: "budget", submit: "Invia clip", submitted: "Inviato · +100 pts", fixed: "fisso / clip", points: "corsa punti", prizePool: "montepremi" },
  auth: { title: "Sali sul nastro", subtitle: "I clipper lottano per punti e premi. I brand lanciano campagne.", clipper: "Sono clipper", brand: "Sono brand", register: "Crea account", login: "Accedi", name: "Nome", email: "Email", password: "Password" },
  brandPage: { title: "Lancia una campagna", name: "Titolo", budget: "Budget (USD)", publish: "Pubblica", published: "Campagna sul nastro.", needBrand: "Entra come founder o brand. Puoi essere anche clipper.", mine: "Le tue campagne" },
  earnings: { title: "I miei guadagni", earned: "Totale", pending: "In attesa", views: "Views", points: "Punti", none: "Entra in una campagna per iniziare." },
  profile: { title: "Profilo", member: "Membro SushiButt", connect: "Collega", connected: "Collegato", role: "Ruolo", points: "Punti" },
  settings: { title: "Impostazioni", language: "Lingua", save: "Salva" },
})

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  ru: "Русский",
  es: "Español",
  nl: "Nederlands",
  fr: "Français",
  it: "Italiano"
}

export const LOCALES: Locale[] = ["en", "ja", "ko", "zh", "ru", "es", "nl", "fr", "it"]

export const messages: Record<Locale, Messages> = { en, ja, ko, zh, ru, es, nl, fr, it }
