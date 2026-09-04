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
  copy: Record<string, { title: string; description: string; requirements: string }>
}

const en: Messages = {
  brand: "SushiButt",
  tagline: "Clip. Compete. Get paid in pink.",
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
    emptyHint: "Try adjusting your filters",
    heroMeta: "{category} · {rate} · {budget} budget"
  },
  filters: {
    search: "Search sushi campaigns & clippers",
    category: "Category",
    content: "Content",
    sort: "Sort by",
    clear: "Clear",
    allContent: "All content types",
    clipping: "Clipping",
    ugc: "UGC"
  },
  category: {
    "All Categories": "All Categories",
    Music: "Music",
    Gaming: "Gaming",
    Entertainment: "Entertainment",
    Sports: "Sports",
    Lifestyle: "Lifestyle",
    Meme: "Meme"
  },
  sort: {
    Featured: "Featured",
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
    submit: "Submit a clip",
    submitted: "Clip submitted · +100 pts"
  },
  auth: {
    title: "Enter the conveyor belt",
    subtitle: "Clippers compete for points and prizes. Brands list campaigns with CPM or fixed rates.",
    clipper: "I'm a clipper",
    brand: "I'm a brand",
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
    title: "List a SushiButt campaign",
    subtitle: "Brands drop open clipping or UGC campaigns. Set a CPM, a fixed clip rate, or a points prize pool.",
    name: "Campaign title",
    budget: "Budget (USD)",
    cpm: "CPM ($ / 1K views)",
    type: "Payout type",
    publish: "Publish campaign",
    published: "Campaign is live on the belt.",
    needBrand: "Register as a brand to list campaigns.",
    mine: "Your live campaigns"
  },
  earnings: {
    title: "My Earnings",
    subtitle: "Views, payouts, points, and campaign performance.",
    earned: "Total earned",
    pending: "Pending payout",
    views: "Total views",
    points: "Sushi points",
    byCampaign: "Earnings by campaign",
    campaign: "Campaign",
    agency: "Brand",
    cpm: "Rate",
    none: "Join a campaign to start earning."
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
    role: "Role",
    points: "Points"
  },
  notify: {
    title: "Notifications",
    n1t: "Prize heat is on",
    n1d: "Omakase Weekly prize pool is live. Top 8 clippers split $3,333.",
    n2t: "Clip approved",
    n2d: "Your Nigiri Night meme clip was approved. +40 fixed + 100 pts.",
    n3t: "Wasabi Drop climbing",
    n3d: "You moved up 4 spots on the Wasabi Drop leaderboard.",
    n4t: "New official campaign",
    n4d: "SushiButt Official Clipping just opened with a $25K budget."
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
    title: "Global Leaderboard",
    subtitle: "Clippers stacked by Sushi points. Climb for weekly pink-belt prizes.",
    rank: "Rank",
    clipper: "Clipper",
    points: "Points",
    views: "Views",
    prize: "Prize",
    you: "you"
  },
  prizes: {
    title: "Prizes & rates",
    subtitle: "Some campaigns pay CPM. Some pay a fixed rate per approved clip. Some are pure points races.",
    weekly: "Weekly Omakase",
    weeklyD: "Top 8 on the global board split $3,333 every Sunday.",
    wasabi: "Wasabi Drop",
    wasabiD: "$5,000 prize pool for the spiciest meme clips this month.",
    fixed: "Fixed-rate belts",
    fixedD: "Nigiri Night pays $40/clip. Soy Sauce Sports pays $75/clip.",
    cpm: "CPM belts",
    cpmD: "Official $2/1K · Pink Belt $3/1K · Kaiten $2.50/1K · Star Roll $1.50/1K."
  },
  copy: {
    official: {
      title: "SushiButt Official Clipping",
      description: "Clip the official SushiButt drops — pink mascot bits, conveyor-belt chaos, and star-roll punchlines. Post as-is or recut for your page.",
      requirements: "Use only official SushiButt footage. Tag @sushibutt. English or local-language captions. Keep posts live 30 days. 10+ seconds."
    },
    "nigiri-night": {
      title: "Nigiri Night Meme Clips",
      description: "Late-night sushi memes. Fixed $40 per approved clip — no view minimum once quality clears.",
      requirements: "Original meme edit using the Nigiri Night pack. No watermarks except yours. Safe-for-work. 8–30 seconds."
    },
    "wasabi-drop": {
      title: "Wasabi Drop Challenge",
      description: "Spiciest reaction and meme clips win the monthly $5K prize pool. Rank is 100% points.",
      requirements: "One clip per day max. Must include the wasabi sting sound. Points for views, comments, and remixes."
    },
    "pink-belt": {
      title: "Pink Belt Talking-Head UGC",
      description: "Show your face. Talk SushiButt, pink belts, and why the belt slaps. $3 CPM.",
      requirements: "Face on camera. English, Spanish, Japanese, or Korean. 20–45 seconds. Natural lighting."
    },
    "star-roll": {
      title: "Star Roll Soundbites",
      description: "Music-first clips of the Star Roll anthem and sushi ASMR hits. $1.50 CPM.",
      requirements: "Keep the official audio bed. Add stars/text stickers. Vertical only."
    },
    omakase: {
      title: "Omakase Weekly",
      description: "Chef's choice weekly race. Points only. Top 8 split $3,333 every Sunday night.",
      requirements: "Any official asset. Fresh post each week. Highest points Sunday 23:59 UTC wins tiers."
    },
    kaiten: {
      title: "Kaiten Stream Clips",
      description: "Clip SushiButt live conveyor streams and gaming collabs. $2.50 CPM.",
      requirements: "Clip from the official live folder only. 12+ seconds. No donation-goal spam."
    },
    "soy-sports": {
      title: "Soy Sauce Sports",
      description: "Sports-highlight sushi memes. Fixed $75 per approved clip.",
      requirements: "Fair-use sports moments + SushiButt overlay. 10–25 seconds. Tag @sushibutt."
    }
  }
}

function tr(over: Partial<Messages> & { copy: Messages["copy"] }): Messages {
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
  brandPage: { title: "キャンペーンを掲載", subtitle: "CPM、固定単価、またはポイント賞金を設定。", name: "タイトル", budget: "予算 (USD)", publish: "公開する", published: "公開されました。", needBrand: "ブランドとして登録してください。", mine: "あなたの案件" },
  earnings: { title: "収益", subtitle: "再生、報酬、ポイント。", earned: "合計収益", pending: "保留中", views: "総再生", points: "ポイント", byCampaign: "案件別", none: "参加して稼ぎ始めましょう。" },
  profile: { title: "プロフィール", member: "SushiButtメンバー", accounts: "連携アカウント", payouts: "支払い", connect: "連携", connected: "連携済", role: "ロール", points: "ポイント" },
  settings: { title: "設定", language: "言語", save: "保存", notes: "通知" },
  board: { title: "グローバルランキング", subtitle: "Sushiポイント順。上位は週間賞品。", clipper: "クリッパー", points: "ポイント", views: "再生", prize: "賞品", you: "あなた" },
  prizes: { title: "賞品とレート", subtitle: "CPM、固定単価、ポイント戦があります。", weekly: "週刊おまかせ", weeklyD: "日曜に上位8人が $3,333 を分配。", wasabi: "わさびドロップ", wasabiD: "今月いちばん辛いミームで $5,000。", fixed: "固定ベルト", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75。", cpm: "CPMベルト", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50。" },
  notify: { title: "通知", n1t: "賞品ヒート", n1d: "おまかせ週間プール開催中。", n2t: "承認", n2d: "Nigiri Nightが承認されました。", n3t: "順位アップ", n3d: "わさびランキングで4位上昇。", n4t: "新キャンペーン", n4d: "Official Clippingが$25Kでオープン。" },
  copy: {
    official: { title: "SushiButt公式クリッピング", description: "公式ピンクマスコットとコンベア映像をクリップ。", requirements: "公式素材のみ。@sushibuttをタグ。10秒以上。30日公開。" },
    "nigiri-night": { title: "にぎりナイト ミーム", description: "承認で1本$40固定。", requirements: "公式パック使用。8–30秒。ウォーターマークは自分のみ。" },
    "wasabi-drop": { title: "わさびドロップ", description: "月間$5K。ポイント勝負。", requirements: "1日1本。わさびSE必須。" },
    "pink-belt": { title: "ピンクベルト顔出しUGC", description: "顔出しでSushiButtを語る。$3 CPM。", requirements: "顔出し。20–45秒。英/日/韓/西。" },
    "star-roll": { title: "スターロール音源", description: "公式アンセムの音楽クリップ。$1.50 CPM。", requirements: "公式音源。縦動画。星ステッカーOK。" },
    omakase: { title: "週刊おまかせ", description: "毎週上位8人が$3,333。", requirements: "毎週新規投稿。日曜23:59 UTC締切。" },
    kaiten: { title: "回転配信クリップ", description: "公式ライブ配信を切る。$2.50 CPM。", requirements: "公式ライブフォルダのみ。12秒以上。" },
    "soy-sports": { title: "醤油スポーツ", description: "スポーツ×寿司ミーム。承認$75。", requirements: "10–25秒。@sushibuttタグ。" }
  }
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
  brandPage: { title: "캠페인 올리기", name: "제목", budget: "예산 (USD)", publish: "게시", published: "게시되었습니다.", needBrand: "브랜드로 가입하세요.", mine: "내 캠페인" },
  earnings: { title: "내 수익", earned: "총 수익", pending: "대기 중", views: "총 조회", points: "포인트", none: "캠페인에 참여해 수익을 시작하세요." },
  profile: { title: "프로필", member: "SushiButt 멤버", connect: "연결", connected: "연결됨", role: "역할", points: "포인트" },
  settings: { title: "설정", language: "언어", save: "저장" },
  board: { title: "글로벌 리더보드", subtitle: "스시 포인트 순위. 주간 핑크벨트 상품.", clipper: "클리퍼", points: "포인트", views: "조회", prize: "상품", you: "나" },
  prizes: { title: "상품과 단가", weekly: "주간 오마카세", weeklyD: "일요일 상위 8명이 $3,333 분배.", wasabi: "와사비 드롭", wasabiD: "이번 달 가장 매운 밈에 $5,000.", fixed: "고정 벨트", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "CPM 벨트", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "알림", n1t: "상품 히트", n1d: "오마카세 주간 풀 오픈.", n2t: "승인", n2d: "Nigiri Night 클립 승인.", n3t: "순위 상승", n3d: "와사비 보드에서 4계단 상승.", n4t: "새 캠페인", n4d: "Official Clipping $25K 오픈." },
  copy: {
    official: { title: "SushiButt 공식 클리핑", description: "공식 핑크 마스코트와 컨베이어 장면을 클립하세요.", requirements: "공식 소재만. @sushibutt 태그. 10초 이상. 30일 유지." },
    "nigiri-night": { title: "니기리 나이트 밈", description: "승인 클립당 $40 고정.", requirements: "공식 팩 사용. 8–30초." },
    "wasabi-drop": { title: "와사비 드롭 챌린지", description: "월 $5K 포인트 레이스.", requirements: "하루 1개. 와사비 효과음 필수." },
    "pink-belt": { title: "핑크벨트 토킹헤드 UGC", description: "얼굴 나오고 SushiButt 이야기. $3 CPM.", requirements: "얼굴 노출. 20–45초." },
    "star-roll": { title: "스타롤 사운드바이트", description: "공식 앤섬 음악 클립. $1.50 CPM.", requirements: "공식 오디오. 세로 영상." },
    omakase: { title: "주간 오마카세", description: "매주 상위 8명 $3,333.", requirements: "매주 새 게시물. 일요일 마감." },
    kaiten: { title: "카이텐 스트림 클립", description: "공식 라이브 클립. $2.50 CPM.", requirements: "공식 라이브 폴더만. 12초+." },
    "soy-sports": { title: "간장 스포츠", description: "스포츠 스시 밈. 승인 $75.", requirements: "10–25초. @sushibutt 태그." }
  }
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
  brandPage: { title: "发布 SushiButt 活动", name: "标题", budget: "预算 (USD)", publish: "发布", published: "已上线。", needBrand: "请以品牌身份注册。", mine: "你的活动" },
  earnings: { title: "我的收益", earned: "总收益", pending: "待结算", views: "总播放", points: "积分", none: "参加活动开始赚钱。" },
  profile: { title: "资料", member: "SushiButt 成员", connect: "连接", connected: "已连接", role: "身份", points: "积分" },
  settings: { title: "设置", language: "语言", save: "保存" },
  board: { title: "全球排行榜", subtitle: "按寿司积分排名，冲击每周粉带奖。", clipper: "剪辑者", points: "积分", views: "播放", prize: "奖品", you: "你" },
  prizes: { title: "奖品与单价", weekly: "每周御厨", weeklyD: "每周日前8名平分 $3,333。", wasabi: "芥末掉落", wasabiD: "本月最辣梗奖池 $5,000。", fixed: "固定腰带", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75。", cpm: "CPM 腰带", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50。" },
  notify: { title: "通知", n1t: "奖池升温", n1d: "每周御厨奖池已开。", n2t: "已通过", n2d: "Nigiri Night 成片已通过。", n3t: "名次上升", n3d: "芥末榜上升4名。", n4t: "新活动", n4d: "官方剪辑 $25K 开启。" },
  copy: {
    official: { title: "SushiButt 官方剪辑", description: "剪官方粉红吉祥物与传送带名场面。", requirements: "仅官方素材。标记 @sushibutt。至少10秒。保留30天。" },
    "nigiri-night": { title: "握寿司之夜梗视频", description: "通过后每条固定 $40。", requirements: "使用官方包。8–30秒。" },
    "wasabi-drop": { title: "芥末掉落挑战", description: "月度 $5K 积分赛。", requirements: "每天最多1条。必须带芥末音效。" },
    "pink-belt": { title: "粉带出镜 UGC", description: "出镜讲 SushiButt。$3 CPM。", requirements: "露脸。20–45秒。" },
    "star-roll": { title: "星星卷音频", description: "官方主题曲剪辑。$1.50 CPM。", requirements: "官方音频。竖屏。" },
    omakase: { title: "每周御厨", description: "每周前8名分 $3,333。", requirements: "每周新帖。周日截止。" },
    kaiten: { title: "回转直播剪辑", description: "官方直播切片。$2.50 CPM。", requirements: "仅官方直播文件夹。12秒+。" },
    "soy-sports": { title: "酱油体育", description: "体育寿司梗。通过 $75。", requirements: "10–25秒。标记 @sushibutt。" }
  }
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
  brandPage: { title: "Запустить кампанию", name: "Название", budget: "Бюджет (USD)", publish: "Опубликовать", published: "Кампания в эфире.", needBrand: "Зарегистрируйтесь как бренд.", mine: "Ваши кампании" },
  earnings: { title: "Мой доход", earned: "Всего", pending: "Ожидает", views: "Просмотры", points: "Очки", none: "Вступите в кампанию, чтобы начать." },
  profile: { title: "Профиль", member: "Участник SushiButt", connect: "Связать", connected: "Связано", role: "Роль", points: "Очки" },
  settings: { title: "Настройки", language: "Язык", save: "Сохранить" },
  board: { title: "Глобальная таблица", subtitle: "Клиперы по суши-очкам. Призы каждую неделю.", clipper: "Клипер", points: "Очки", views: "Просмотры", prize: "Приз", you: "вы" },
  prizes: { title: "Призы и ставки", weekly: "Недельный омакасе", weeklyD: "Топ-8 делят $3,333 каждое воскресенье.", wasabi: "Васаби дроп", wasabiD: "$5,000 за самые острые мемы месяца.", fixed: "Фикс-пояса", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "CPM-пояса", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "Уведомления", n1t: "Призы горят", n1d: "Недельный пул омакасе открыт.", n2t: "Клип принят", n2d: "Nigiri Night одобрен.", n3t: "Рост в таблице", n3d: "+4 места в Wasabi Drop.", n4t: "Новая кампания", n4d: "Official Clipping с бюджетом $25K." },
  copy: {
    official: { title: "Официальный клиппинг SushiButt", description: "Режьте официальные розовые дропы и конвейерный хаос.", requirements: "Только официальные исходники. Тег @sushibutt. 10+ сек. 30 дней." },
    "nigiri-night": { title: "Нигири Найт мемы", description: "Фикс $40 за одобренный клип.", requirements: "Пак Nigiri Night. 8–30 сек." },
    "wasabi-drop": { title: "Васаби дроп", description: "Месячный пул $5K. Только очки.", requirements: "Макс. 1 клип в день. Звук васаби обязателен." },
    "pink-belt": { title: "Розовый пояс UGC", description: "Лицо в кадре, рассказ про SushiButt. $3 CPM.", requirements: "Лицо. 20–45 сек." },
    "star-roll": { title: "Саундбайты Star Roll", description: "Музыкальные клипы гимна. $1.50 CPM.", requirements: "Официальное аудио. Вертикаль." },
    omakase: { title: "Недельный омакасе", description: "Топ-8 делят $3,333 каждое воскресенье.", requirements: "Новый пост каждую неделю." },
    kaiten: { title: "Клипы кайтен-стримов", description: "Нарезка официальных стримов. $2.50 CPM.", requirements: "Только официальная папка. 12+ сек." },
    "soy-sports": { title: "Соевый спорт", description: "Спорт + суши-мемы. $75 за клип.", requirements: "10–25 сек. Тег @sushibutt." }
  }
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
  brandPage: { title: "Publica una campaña", name: "Título", budget: "Presupuesto (USD)", publish: "Publicar", published: "La campaña ya está en la cinta.", needBrand: "Regístrate como marca.", mine: "Tus campañas" },
  earnings: { title: "Mis ganancias", earned: "Total", pending: "Pendiente", views: "Vistas", points: "Puntos", none: "Únete a una campaña para empezar." },
  profile: { title: "Perfil", member: "Miembro de SushiButt", connect: "Conectar", connected: "Conectado", role: "Rol", points: "Puntos" },
  settings: { title: "Ajustes", language: "Idioma", save: "Guardar" },
  board: { title: "Clasificación global", subtitle: "Clippers por puntos sushi. Premios semanales.", clipper: "Clipper", points: "Puntos", views: "Vistas", prize: "Premio", you: "tú" },
  prizes: { title: "Premios y tarifas", weekly: "Omakase semanal", weeklyD: "El top 8 se parte $3,333 cada domingo.", wasabi: "Wasabi Drop", wasabiD: "Bote de $5,000 al meme más picante.", fixed: "Cinturones fijos", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "Cinturones CPM", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "Avisos", n1t: "Hay premio", n1d: "El bote semanal omakase está vivo.", n2t: "Clip aprobado", n2d: "Tu clip de Nigiri Night fue aprobado.", n3t: "Subiste", n3d: "+4 puestos en Wasabi Drop.", n4t: "Nueva campaña", n4d: "Official Clipping abre con $25K." },
  copy: {
    official: { title: "Clipping oficial SushiButt", description: "Corta los drops oficiales del mascota rosa y la cinta loca.", requirements: "Solo material oficial. Etiqueta @sushibutt. 10+ segundos. 30 días." },
    "nigiri-night": { title: "Memes Nigiri Night", description: "$40 fijos por clip aprobado.", requirements: "Pack oficial. 8–30 segundos." },
    "wasabi-drop": { title: "Reto Wasabi Drop", description: "Bote mensual de $5K. Solo puntos.", requirements: "Máx. 1 clip al día. Sonido wasabi obligatorio." },
    "pink-belt": { title: "UGC cinturón rosa", description: "Cara a cámara hablando de SushiButt. $3 CPM.", requirements: "Cara visible. 20–45 segundos." },
    "star-roll": { title: "Audio Star Roll", description: "Clips musicales del himno. $1.50 CPM.", requirements: "Audio oficial. Vertical." },
    omakase: { title: "Omakase semanal", description: "Top 8 se parte $3,333 cada domingo.", requirements: "Post nuevo cada semana." },
    kaiten: { title: "Clips de stream kaiten", description: "Corta lives oficiales. $2.50 CPM.", requirements: "Solo carpeta live oficial. 12+ segundos." },
    "soy-sports": { title: "Soy Sauce Sports", description: "Memes de deporte + sushi. $75 por clip.", requirements: "10–25 segundos. Etiqueta @sushibutt." }
  }
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
  brandPage: { title: "Zet een campagne live", name: "Titel", budget: "Budget (USD)", publish: "Publiceren", published: "Campagne staat op de band.", needBrand: "Registreer als merk.", mine: "Jouw campagnes" },
  earnings: { title: "Mijn inkomsten", earned: "Totaal", pending: "In behandeling", views: "Views", points: "Punten", none: "Doe mee om te verdienen." },
  profile: { title: "Profiel", member: "SushiButt-lid", connect: "Koppelen", connected: "Gekoppeld", role: "Rol", points: "Punten" },
  settings: { title: "Instellingen", language: "Taal", save: "Opslaan" },
  board: { title: "Wereldranglijst", subtitle: "Clippers op sushipunten. Wekelijkse pink-belt prijzen.", clipper: "Clipper", points: "Punten", views: "Views", prize: "Prijs", you: "jij" },
  prizes: { title: "Prijzen & tarieven", weekly: "Wekelijkse omakase", weeklyD: "Top 8 deelt $3,333 elke zondag.", wasabi: "Wasabi Drop", wasabiD: "$5,000 pot voor de pittigste memes.", fixed: "Vaste banden", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "CPM-banden", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "Meldingen", n1t: "Prijsheat", n1d: "Wekelijkse omakase-pot is live.", n2t: "Clip goedgekeurd", n2d: "Je Nigiri Night-clip is goedgekeurd.", n3t: "Geklommen", n3d: "+4 plekken op Wasabi Drop.", n4t: "Nieuwe campagne", n4d: "Official Clipping opent met $25K." },
  copy: {
    official: { title: "SushiButt Official Clipping", description: "Clip de officiële roze mascotte en bandchaos.", requirements: "Alleen officieel beeld. Tag @sushibutt. 10+ sec. 30 dagen live." },
    "nigiri-night": { title: "Nigiri Night memes", description: "Vast $40 per goedgekeurde clip.", requirements: "Officiële pack. 8–30 sec." },
    "wasabi-drop": { title: "Wasabi Drop Challenge", description: "Maandelijkse $5K. Alleen punten.", requirements: "Max 1 clip per dag. Wasabi-sound verplicht." },
    "pink-belt": { title: "Pink Belt talking-head UGC", description: "Gezicht op camera over SushiButt. $3 CPM.", requirements: "Gezicht zichtbaar. 20–45 sec." },
    "star-roll": { title: "Star Roll soundbites", description: "Muziekclips van de anthem. $1.50 CPM.", requirements: "Officiële audio. Verticaal." },
    omakase: { title: "Wekelijkse omakase", description: "Top 8 deelt $3,333 elke zondag.", requirements: "Elke week een nieuwe post." },
    kaiten: { title: "Kaiten streamclips", description: "Knip officiële lives. $2.50 CPM.", requirements: "Alleen officiële live-map. 12+ sec." },
    "soy-sports": { title: "Soy Sauce Sports", description: "Sport-sushimemes. $75 per clip.", requirements: "10–25 sec. Tag @sushibutt." }
  }
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
  brandPage: { title: "Lancer une campagne", name: "Titre", budget: "Budget (USD)", publish: "Publier", published: "Campagne en ligne.", needBrand: "Inscris-toi en marque.", mine: "Tes campagnes" },
  earnings: { title: "Mes gains", earned: "Total", pending: "En attente", views: "Vues", points: "Points", none: "Rejoins une campagne pour commencer." },
  profile: { title: "Profil", member: "Membre SushiButt", connect: "Connecter", connected: "Connecté", role: "Rôle", points: "Points" },
  settings: { title: "Réglages", language: "Langue", save: "Enregistrer" },
  board: { title: "Classement mondial", subtitle: "Clippeurs aux points sushi. Prix rose chaque semaine.", clipper: "Clippeur", points: "Points", views: "Vues", prize: "Prix", you: "toi" },
  prizes: { title: "Prix et tarifs", weekly: "Omakase hebdo", weeklyD: "Le top 8 se partage $3,333 chaque dimanche.", wasabi: "Wasabi Drop", wasabiD: "Cagnotte $5,000 pour le mème le plus piquant.", fixed: "Ceintures fixes", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "Ceintures CPM", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "Notifs", n1t: "Cagnotte chaude", n1d: "Le pot omakase de la semaine est live.", n2t: "Clip validé", n2d: "Ton clip Nigiri Night est validé.", n3t: "Tu montes", n3d: "+4 places sur Wasabi Drop.", n4t: "Nouvelle campagne", n4d: "Official Clipping ouvre avec $25K." },
  copy: {
    official: { title: "Clipping officiel SushiButt", description: "Clippe la mascotte rose et le chaos du tapis.", requirements: "Rush officiel only. Tag @sushibutt. 10+ sec. 30 jours." },
    "nigiri-night": { title: "Mèmes Nigiri Night", description: "$40 fixe par clip validé.", requirements: "Pack officiel. 8–30 sec." },
    "wasabi-drop": { title: "Défi Wasabi Drop", description: "Cagnotte mensuelle $5K. 100% points.", requirements: "1 clip/jour max. Son wasabi obligatoire." },
    "pink-belt": { title: "UGC ceinture rose", description: "Caméra visage, parle SushiButt. $3 CPM.", requirements: "Visage visible. 20–45 sec." },
    "star-roll": { title: "Soundbites Star Roll", description: "Clips musique de l’hymne. $1.50 CPM.", requirements: "Audio officiel. Vertical." },
    omakase: { title: "Omakase hebdo", description: "Top 8 se partage $3,333 chaque dimanche.", requirements: "Nouveau post chaque semaine." },
    kaiten: { title: "Clips streams kaiten", description: "Coupe les lives officiels. $2.50 CPM.", requirements: "Dossier live officiel only. 12+ sec." },
    "soy-sports": { title: "Soy Sauce Sports", description: "Mèmes sport + sushi. $75 / clip.", requirements: "10–25 sec. Tag @sushibutt." }
  }
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
  brandPage: { title: "Lancia una campagna", name: "Titolo", budget: "Budget (USD)", publish: "Pubblica", published: "Campagna sul nastro.", needBrand: "Registrati come brand.", mine: "Le tue campagne" },
  earnings: { title: "I miei guadagni", earned: "Totale", pending: "In attesa", views: "Views", points: "Punti", none: "Entra in una campagna per iniziare." },
  profile: { title: "Profilo", member: "Membro SushiButt", connect: "Collega", connected: "Collegato", role: "Ruolo", points: "Punti" },
  settings: { title: "Impostazioni", language: "Lingua", save: "Salva" },
  board: { title: "Classifica globale", subtitle: "Clipper per punti sushi. Premi pink belt ogni settimana.", clipper: "Clipper", points: "Punti", views: "Views", prize: "Premio", you: "tu" },
  prizes: { title: "Premi e tariffe", weekly: "Omakase settimanale", weeklyD: "La top 8 si divide $3,333 ogni domenica.", wasabi: "Wasabi Drop", wasabiD: "Montepremi $5,000 al meme più piccante.", fixed: "Cinture fisse", fixedD: "Nigiri Night $40 / Soy Sauce Sports $75.", cpm: "Cinture CPM", cpmD: "Official $2 · Pink Belt $3 · Kaiten $2.50 · Star Roll $1.50." },
  notify: { title: "Notifiche", n1t: "Premi on", n1d: "Il montepremi omakase settimanale è live.", n2t: "Clip approvata", n2d: "La tua clip Nigiri Night è approvata.", n3t: "Sei salito", n3d: "+4 posti su Wasabi Drop.", n4t: "Nuova campagna", n4d: "Official Clipping apre con $25K." },
  copy: {
    official: { title: "Clipping ufficiale SushiButt", description: "Taglia i drop ufficiali della mascotte rosa.", requirements: "Solo materiale ufficiale. Tagga @sushibutt. 10+ sec. 30 giorni." },
    "nigiri-night": { title: "Meme Nigiri Night", description: "$40 fissi a clip approvata.", requirements: "Pack ufficiale. 8–30 sec." },
    "wasabi-drop": { title: "Wasabi Drop Challenge", description: "Montepremi mensile $5K. Solo punti.", requirements: "Max 1 clip al giorno. Suono wasabi obbligatorio." },
    "pink-belt": { title: "UGC cintura rosa", description: "Volto in camera su SushiButt. $3 CPM.", requirements: "Volto visibile. 20–45 sec." },
    "star-roll": { title: "Soundbite Star Roll", description: "Clip musicali dell’inno. $1.50 CPM.", requirements: "Audio ufficiale. Verticale." },
    omakase: { title: "Omakase settimanale", description: "Top 8 si divide $3,333 ogni domenica.", requirements: "Post nuovo ogni settimana." },
    kaiten: { title: "Clip stream kaiten", description: "Taglia le live ufficiali. $2.50 CPM.", requirements: "Solo cartella live ufficiale. 12+ sec." },
    "soy-sports": { title: "Soy Sauce Sports", description: "Meme sport + sushi. $75 a clip.", requirements: "10–25 sec. Tagga @sushibutt." }
  }
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
