// 資料更新時間
const LAST_UPDATED = "2026-05";

// 消費類別定義
const CATEGORIES = [
  { id: 'food_delivery',    label: '外送平台',   icon: '🛵', keywords: ['外送', 'uber eats', 'ubereats', 'foodpanda', 'food panda', '外賣', '叫外送'] },
  { id: 'restaurant',       label: '餐廳/美食',  icon: '🍽️', keywords: ['餐廳', '餐飲', '吃飯', '用餐', '下午茶', '火鍋', '燒烤', '咖啡', '便當', '牛排', '美食'] },
  { id: 'convenience_store',label: '超商',       icon: '🏪', keywords: ['超商', '7-11', '711', '全家', 'familymart', 'ok mart', 'ok超商', '萊爾富'] },
  { id: 'supermarket',      label: '超市/量販',  icon: '🛒', keywords: ['超市', '量販', '全聯', '家樂福', '好市多', 'costco', '大潤發', '愛買', '大買家', 'lopia'] },
  { id: 'gas_station',      label: '加油/充電',  icon: '⛽', keywords: ['加油', '中油', '台塑', 'shell', '加油站', '全國加油'] },
  { id: 'shopee',           label: '蝦皮購物',   icon: '🦀', keywords: ['蝦皮', 'shopee', '蝦皮購物'] },
  { id: 'online_shopping',  label: '網購（非蝦皮）', icon: '📦', keywords: ['網購', '網路購物', 'momo', 'pchome', 'amazon', '淘寶', '博客來', 'shein', 'iherb', 'farfetch'] },
  { id: 'department_store', label: '百貨/Outlet', icon: '🏬', keywords: ['百貨', 'outlet', '新光三越', '遠東', 'sogo', '遠百', 'mitsui', 'laport', '京站', '夢時代', '中友'] },
  { id: 'travel_booking',   label: '旅遊/訂房',  icon: '🏨', keywords: ['旅遊', '訂房', 'agoda', 'booking', 'airbnb', 'klook', 'kkday', 'expedia', '旅行社', '雄獅', '易遊', 'trip.com', '旅館', '飯店', '住宿'] },
  { id: 'airline',          label: '航空機票',   icon: '🛫', keywords: ['機票', '航空', '飛機', '長榮', '中華航空', '星宇', '台灣虎航', '廉航', '訂機票', 'eva', 'china airlines'] },
  { id: 'overseas',         label: '海外消費',   icon: '🌏', keywords: ['海外', '國外', '出國', '境外', '日本消費', '韓國消費', '歐洲', '美國', '港澳', '泰國', '新加坡'] },
  { id: 'streaming',        label: '串流/訂閱',  icon: '📺', keywords: ['netflix', 'disney+', 'disney', 'spotify', 'apple music', '串流', '影音訂閱', 'hbo', 'prime video', 'youtube premium', '愛奇藝'] },
  { id: 'ai_services',      label: 'AI服務',     icon: '🤖', keywords: ['chatgpt', 'claude', 'ai訂閱', 'notion', 'canva', 'perplexity', 'midjourney', 'openai'] },
  { id: 'transportation',   label: '交通',        icon: '🚇', keywords: ['交通', '捷運', '公車', '高鐵', '台鐵', 'uber', '計程車', 'taxi', 'linego', '台灣大車隊', '搭車', '乘車'] },
  { id: 'insurance',        label: '保費',        icon: '🛡️', keywords: ['保費', '保險', '壽險', '車險', '醫療險', '保單', '年繳保費'] },
  { id: 'pharmacy',         label: '藥妝/藥局',  icon: '💊', keywords: ['藥妝', '藥局', '康是美', '屈臣氏', '寶雅', '丁丁', '杏一', '佑全', '大樹藥局'] },
  { id: 'entertainment',    label: '娛樂/購票',  icon: '🎭', keywords: ['購票', 'kktix', '拓元', '年代', '演唱會', '電影', 'ktv', '錢櫃', '好樂迪', '娛樂'] },
  { id: 'telecom',          label: '電信費',      icon: '📱', keywords: ['電信費', '話費', '台哥大', '中華電信', '台灣大哥大', '遠傳', '5g', '手機費', '電信帳單'] },
  { id: 'home_deco',        label: '居家/家具',  icon: '🏠', keywords: ['ikea', '特力屋', 'hola', '宜得利', '居家', '家具', '裝修', '瑪黑', '生活用品'] },
  { id: 'fashion',          label: '時尚服飾',   icon: '👗', keywords: ['uniqlo', 'zara', 'net', 'gu', 'lululemon', '服飾', '穿搭', '衣服', '服裝', '時尚'] },
  { id: 'eco_charging',     label: '綠能/充電',  icon: '🌱', keywords: ['tesla', 'gogoro', '綠能', '充電樁', 'ev充電', '電動車充電', 'evoasis', 'evalue', 'uspace'] },
  { id: 'mobile_payment',   label: '行動支付',   icon: '📲', keywords: ['apple pay', 'google pay', 'samsung pay', 'garmin pay', '行動支付', 'nfc', '感應支付'] },
];

// 12 張卡片資料
// rate 為回饋率（小數），cap 為每月回饋上限（NT$，null=無上限），note 為備註
const CARDS = [

  // ── 1. 國泰世華 CUBE 卡 ──
  {
    id: 'cathay_cube',
    name: '國泰世華 CUBE 卡',
    bank: '國泰世華銀行',
    rewardType: '小樹點',
    rewardNote: '1 小樹點 = NT$1，可折抵信用卡帳款',
    officialUrl: 'https://www.cathay-cube.com.tw/cathaybk/personal/product/credit-card/cards/cube',
    features: [
      '每日免費切換四大方案：玩數位／樂饗購／趣旅行／集精選',
      '以 CUBE App 繳費或自動扣繳，指定消費享 3%（Level 2）',
      '一般消費 0.3% 無上限，無須切換',
      '申辦電子帳單即可免年費',
    ],
    rewards: {
      food_delivery:     { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「樂饗購」方案，每日可免費切換一次；未切換或通路未列入指定清單時僅一般回饋' },
      restaurant:        { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「樂饗購」方案，每日可免費切換一次；以官方指定餐飲/美食通路為準' },
      department_store:  { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「樂饗購」方案，每日可免費切換一次；以官方指定百貨/商場通路為準' },
      entertainment:     { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「樂饗購」方案，每日可免費切換一次；娛樂票券/指定通路需依官方清單判定' },
      online_shopping:   { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「玩數位」方案，每日可免費切換一次；指定網購/數位平台才適用' },
      shopee:            { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「玩數位」方案，每日可免費切換一次；蝦皮活動疊加與否依蝦皮/國泰公告' },
      streaming:         { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「玩數位」方案，每日可免費切換一次；限官方列入之影音/音樂/訂閱平台' },
      ai_services:       { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「玩數位」方案，每日可免費切換一次；AI/SaaS是否列入以官方指定數位通路為準' },
      travel_booking:    { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「趣旅行」方案，每日可免費切換一次；限官方指定訂房/旅遊平台' },
      airline:           { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「趣旅行」方案，每日可免費切換一次；限官方指定航空/旅遊通路' },
      overseas:          { rate: 0.03,  cap: null, note: '舊戶適用；需於消費當日切換「趣旅行」方案，每日可免費切換一次；海外交易另有國外交易服務費' },
      convenience_store: { rate: 0.02,  cap: null, note: '舊戶適用；需切換「集精選」方案；限官方指定超商如7-11、全家等，未列入通路僅一般回饋' },
      supermarket:       { rate: 0.02,  cap: null, note: '舊戶適用；需切換「集精選」方案；限官方指定超市/量販如全聯、家樂福等' },
      gas_station:       { rate: 0.02,  cap: null, note: '舊戶適用；需切換「集精選」方案；限官方指定加油/充電通路，如中油直營、U-POWER等' },
      home_deco:         { rate: 0.02,  cap: null, note: '舊戶適用；需切換「集精選」方案；限官方指定居家通路，如IKEA等' },
    }
  },

  // ── 2. 玉山 Unicard ──
  {
    id: 'esun_unicard',
    name: '玉山 Unicard',
    bank: '玉山銀行',
    rewardType: '玉山 e point',
    rewardNote: '1 玉山 e point = NT$1，可折抵消費或轉換哩程',
    officialUrl: 'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
    features: [
      '百大指定通路最高 4.5%（UP選方案）',
      '簡單選方案：百大通路享 3%，無需每日切換',
      '綁定玉山帳戶自動扣繳，一般消費享 1%',
      '含蝦皮、LINE Pay、街口支付等指定通路',
    ],
    rewards: {
      food_delivery:     { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；UP選可更高但需自行選通路/方案，實際上限與活動期以玉山Wallet公告為準' },
      restaurant:        { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限官方百大通路清單，非指定餐飲僅一般回饋' },
      convenience_store: { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限指定超商/支付通路，是否含代收代付需依官方排除項目' },
      supermarket:       { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限指定超市/量販，Costco等特殊通路需另查官方清單' },
      online_shopping:   { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%，含蝦皮、momo等指定網購；UP選方案可能有更高回饋但需另選' },
      shopee:            { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；蝦皮平台活動疊加與否依玉山/蝦皮公告' },
      streaming:         { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；僅官方列入之串流/訂閱商店適用' },
      travel_booking:    { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限指定訂房/旅遊平台，海外交易或分期可能排除' },
      airline:           { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限指定航空/旅遊通路，票務代理需依收單商店判定' },
      department_store:  { rate: 0.03,  cap: null, note: '舊戶適用；「簡單選」百大指定通路3%；限官方指定百貨/商場，櫃位交易需依請款商店判定' },
    }
  },

  // ── 3. 中信 Uniopen 卡 ──
  {
    id: 'ctbc_uniopen',
    name: '中信 Uniopen 卡',
    bank: '中國信託',
    rewardType: '優利點',
    rewardNote: '1 優利點 = NT$1，可折抵消費',
    officialUrl: 'https://www.ctbcbank.com/twrbo/zh_tw/cc_index/cc_product/cc_introduction_index/C_uniopen.html',
    features: [
      '統一集團通路（7-11、統一超商等）最高 7% 優利點（需每月領券與踩點任務）',
      '國外實體消費最高 11% 回饋（指定國家加碼需每月領券）',
      '國內一般消費 1% 無上限',
      '國外消費 3% 無上限',
    ],
    rewards: {
      convenience_store: { rate: 0.07, baseRate: 0.01, bonusRate: 0.06, bonusCap: 500, cap: null, note: '舊戶適用；統一集團通路最高7%=國內一般1%無上限+通路/踩點加碼；需每月1日起至月底於中信銀行App領取卡友專屬券，並於不同統一集團品牌踩點；各項加碼分別有上限，交易需依官方請款期限入帳' },
      overseas:          { rate: 0.11, baseRate: 0.03, bonusRate: 0.08, bonusCap: 500, cap: null, note: '舊戶適用；指定國家實體商店最高11%=國外一般3%無上限+指定國家加碼；需每月1日起至月底於中信銀行App領券，交易需次月15日前請款；指定國家加碼月上限500點' },
      online_shopping:   { rate: 0.01,  cap: null, note: '舊戶適用；國內一般消費基本1%優利點無上限；非統一指定/活動通路不適用加碼' },
      restaurant:        { rate: 0.01,  cap: null, note: '舊戶適用；國內一般消費基本1%優利點無上限；餐飲若非活動指定通路僅基本回饋' },
    }
  },

  // ── 4. 富邦 Open Possible 卡（富邦+台灣大哥大） ──
  {
    id: 'fubon_open_possible',
    name: '富邦 Open Possible 卡',
    bank: '台北富邦銀行（台哥大聯名）',
    rewardType: '統一超商虛擬商品卡',
    rewardNote: '回饋以 500 元面額統一超商虛擬商品卡發放，非現金折抵',
    officialUrl: 'https://www.taiwanmobile.com/csonline/plcc/open_possible.html',
    features: [
      '台哥大 5G 電信費最高 3.5% 回饋',
      'AI 工具、超商、加油、myfone 門市與海外一般消費 2%',
      '海外限時活動刷滿 NT$10,000 送 NT$500 統一超商虛擬商品卡（需登錄）',
      'myfone 門市及網路門市消費享優惠',
    ],
    rewards: {
      telecom:  { rate: 0.035, baseRate: 0.02, bonusRate: 0.015, cap: null, note: '舊戶適用；台灣大哥大5G電信費最高3.5%=基本2%+加碼1.5%；當月帳單新增消費滿NT$5,000才享加碼；4G、代付、非指定電信費通常為2%' },
      overseas: { rate: 0.02,  cap: null, note: '舊戶適用；海外一般消費2%統一超商虛擬商品卡回饋；2026/4/13-6/30海外累積滿NT$10,000另送NT$500，需登錄、限量、每戶限回饋1次' },
    }
  },

  // ── 5. 台新 Richart 卡 ──
  {
    id: 'taishin_richart',
    name: '台新 Richart 卡',
    bank: '台新銀行',
    rewardType: '現金回饋',
    rewardNote: '直接折抵帳單，如現金',
    officialUrl: 'https://mkp.taishinbank.com.tw/TsCms/marketing/expose/WM_20251216135624463/index.html',
    features: [
      '開啟「7大刷」自動依消費通路給回饋，不須手動切換',
      '外送、餐廳、超商、網購、海外等大多數通路皆 3.3%',
      '台新Pay綁定最高 3.8%，假日不限通路 2%',
      '保費 1.3% 回饋，多項類別無月上限',
    ],
    rewards: {
      food_delivery:     { rate: 0.033, cap: null, note: '舊戶適用；需於Richart Life/指定平台切換「好饗刷」；Uber Eats、Foodpanda等指定外送適用，非指定外送或未切換僅一般回饋' },
      restaurant:        { rate: 0.033, cap: null, note: '舊戶適用；需切換「好饗刷」；限餐廳/餐飲指定通路，百貨美食街等依收單商店判定' },
      entertainment:     { rate: 0.033, cap: null, note: '舊戶適用；需切換「好饗刷」；購票、KTV、指定飯店等以官方指定通路清單為準' },
      convenience_store: { rate: 0.033, cap: null, note: '舊戶適用；需切換「天天刷」；7-11、全家通常限使用台新Pay綁定支付，其他超商/代收代付需依官方排除項目' },
      supermarket:       { rate: 0.033, cap: null, note: '舊戶適用；需切換「天天刷」；家樂福、大買家、唐吉訶德、LOPIA等指定通路適用' },
      gas_station:       { rate: 0.033, cap: null, note: '舊戶適用；需切換「天天刷」；中油、全國加油等指定加油站適用，非指定油站僅一般回饋' },
      pharmacy:          { rate: 0.033, cap: null, note: '舊戶適用；需切換「天天刷」；康是美、屈臣氏、寶雅等指定藥妝/生活通路適用' },
      transportation:    { rate: 0.033, cap: null, note: '舊戶適用；需切換「天天刷」；高鐵、台鐵、Uber、台灣大車隊等指定交通通路適用' },
      department_store:  { rate: 0.033, cap: null, note: '舊戶適用；需切換「大筆刷」；新光三越、遠東、SOGO等指定百貨適用，櫃位請款名稱需符合指定通路' },
      home_deco:         { rate: 0.033, cap: null, note: '舊戶適用；需切換「大筆刷」；IKEA、特力屋、HOLA等指定居家通路適用' },
      fashion:           { rate: 0.033, cap: null, note: '舊戶適用；需切換「大筆刷」；UNIQLO、ZARA、NET等指定服飾通路適用' },
      online_shopping:   { rate: 0.033, cap: null, note: '舊戶適用；需切換「數趣刷」；蝦皮、momo、PChome、Amazon等指定網購平台適用' },
      shopee:            { rate: 0.033, cap: null, note: '舊戶適用；需切換「數趣刷」；蝦皮購物指定通路適用，平台活動/分期排除需另看公告' },
      streaming:         { rate: 0.033, cap: null, note: '舊戶適用；需切換「數趣刷」；Netflix、Disney+、Spotify等指定訂閱平台適用' },
      ai_services:       { rate: 0.033, cap: null, note: '舊戶適用；需切換「數趣刷」；ChatGPT、Claude、Notion、Canva等指定數位服務適用' },
      overseas:          { rate: 0.033, cap: null, note: '舊戶適用；需切換「玩旅刷」；海外消費3.3%回饋，另收國外交易服務費，網路跨境/實體判定依請款地' },
      airline:           { rate: 0.033, cap: null, note: '舊戶適用；需切換「玩旅刷」；長榮、中華航空、星宇等指定航空通路適用，旅行社代刷需看請款商店' },
      travel_booking:    { rate: 0.033, cap: null, note: '舊戶適用；需切換「玩旅刷」；Agoda、Klook、KKday、雄獅等指定旅遊平台適用' },
      insurance:         { rate: 0.013, cap: null, note: '舊戶適用；保費1.3%回饋，是否含分期/代繳/特定險種需依台新保費條款與排除項目' },
      mobile_payment:    { rate: 0.038, cap: null, note: '舊戶適用；需切換「Pay著刷」並以台新Pay/台灣Pay等指定支付消費；最高3.8%，通路與海外台新Pay+限制依官方清單' },
    }
  },

  // ── 6. 第一銀行 iLEO 卡 ──
  {
    id: 'firstbank_ileo',
    name: '第一銀行 iLEO 卡',
    bank: '第一銀行',
    rewardType: '現金回饋',
    rewardNote: '現金回饋直接折抵帳單',
    officialUrl: 'https://card.firstbank.com.tw/sites/card/zh_TW/1565690685937',
    features: [
      '一般消費 0.5% 現金回饋，無上限',
      'LINE Pay 綁定大眾交通享 2% 回饋',
      '指定數位訂閱領券最高 7%（活動至 2026/6）',
      '指定通路最高 2%（月加碼上限 NT$500）',
    ],
    rewards: {
      streaming:      { rate: 0.07, baseRate: 0.005, bonusRate: 0.065, bonusCap: 200, cap: null, note: '舊戶適用；2026/1/1-6/30 指定數位訂閱制最高7%；需當月領券，官方活動說明加碼每戶每月上限200元，次期帳單折抵' },
      transportation: { rate: 0.02, cap: null,  note: '舊戶適用；需以LINE Pay綁定iLEO卡支付指定大眾交通工具；高鐵/計程車/非LINE Pay交通交易是否適用需依官方規則' },
      mobile_payment: { rate: 0.02, cap: null,  note: '舊戶適用；LINE Pay綁定消費2%；指定通路、排除項目與是否需領券依第一銀行活動頁' },
    }
  },

  // ── 7. 永豐 Sport 卡 ──
  {
    id: 'sinopac_sport',
    name: '永豐 Sport 卡',
    bank: '永豐銀行',
    rewardType: '豐點',
    rewardNote: '豐點可折抵消費，1點 = NT$1',
    officialUrl: 'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/sportcard.html',
    features: [
      'Apple Pay / Google Pay / Samsung Pay / Garmin Pay 最高 5% 豐點',
      '運動健身、醫藥保健、電競娛樂通路最高 5%',
      '一般消費 1% 無上限',
      '大咖 DACARD App 啟用運動數據可解鎖加碼',
    ],
    rewards: {
      mobile_payment:    { rate: 0.05, baseRate: 0.01, bonusRate: 0.04, bonusCap: 300, cap: null, note: '舊戶適用；Apple Pay/Google Pay/Samsung Pay/Garmin Pay最高5%=基本1%+加碼4%；需啟用大咖DACARD運動數據/符合指定條件，加碼每戶每月上限300豐點' },
      pharmacy:          { rate: 0.05, baseRate: 0.01, bonusRate: 0.04, bonusCap: 300, cap: null, note: '舊戶適用；醫藥保健指定通路最高5%=基本1%+加碼4%；需符合Sport卡活動條件，加碼每戶每月上限300豐點' },
      entertainment:     { rate: 0.05, baseRate: 0.01, bonusRate: 0.04, bonusCap: 300, cap: null, note: '舊戶適用；運動健身/電競娛樂指定通路最高5%=基本1%+加碼4%；需符合Sport卡活動條件，加碼每戶每月上限300豐點' },
      online_shopping:   { rate: 0.01, cap: null, note: '舊戶適用；一般消費基本1%豐點無上限；非指定運動/支付/醫藥娛樂通路不適用加碼' },
      restaurant:        { rate: 0.01, cap: null, note: '舊戶適用；一般消費基本1%豐點無上限；餐飲非指定運動/娛樂通路僅基本回饋' },
    }
  },

  // ── 8. 富邦 momo 聯名卡 ──
  {
    id: 'fubon_momo',
    name: '富邦 momo 聯名卡',
    bank: '台北富邦銀行',
    rewardType: 'momo 幣／現金回饋',
    rewardNote: 'momo站內回饋 momo幣（1幣=NT$1），站外現金回饋折抵帳單',
    officialUrl: 'https://www.fubon.com/banking/personal/credit_card/all_card/momo/momo.htm',
    features: [
      'momo 購物網站內消費最高 3% momo 幣（月上限 1,000 幣）',
      'momo 精選品牌最高 7% momo 幣回饋',
      '站外一般消費 1% 現金回饋（2026/4 起升級）',
      '海外消費 1% 現金回饋',
    ],
    rewards: {
      online_shopping: { rate: 0.03, cap: 1000, note: '舊戶適用；momo站內消費3% momo幣，月上限1,000 momo幣；精選品牌最高7%=3%基本+品牌加碼，品牌加碼是否需登錄/是否無上限依momo活動頁' },
      overseas:        { rate: 0.01, cap: null,  note: '舊戶適用；站外/海外一般消費1%現金回饋或momo幣依官方當期權益；海外另收國外交易服務費' },
    }
  },

  // ── 9. 台北富邦 J 卡 ──
  {
    id: 'fubon_j',
    name: '台北富邦 J 卡',
    bank: '台北富邦銀行',
    rewardType: '現金回饋',
    rewardNote: '現金回饋直接折抵帳單',
    officialUrl: 'https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000307',
    features: [
      '日本、韓國、泰國實體消費單筆滿 NT$1,000 最高 6% 回饋（每季登錄一次）',
      '日本三大交通卡（SUICA、ICOCA、PASMO）最高 10%',
      '一般消費 1% 無上限',
      '保費 0.5% 回饋（或享 12 期 0 利率分期）',
    ],
    rewards: {
      overseas:   { rate: 0.06, baseRate: 0.01, bonusRate: 0.05, bonusCap: 1000, capLabel: '加碼每季上限 NT$1,000（基本1%無上限）', cap: null, note: '舊戶適用；日本/韓國/泰國當地實體消費單筆滿NT$1,000最高6%=一般1%+海外活動加碼；2026/4-9每月20日16:00至月底23:59開放登錄，各月限量20,000名，每季每戶加碼上限NT$1,000' },
      airline:    { rate: 0.01, cap: null, note: '舊戶適用；航空/旅行社若不符合日韓泰實體活動，僅一般消費1%現金回饋；機票線上交易通常不列入實體活動' },
      insurance:  { rate: 0.005, cap: null, note: '舊戶適用；保費0.5%回饋；可分期/0利率與回饋是否併用需依富邦保費條款' },
    }
  },

  // ── 10. 星展 eco 卡 ──
  {
    id: 'dbs_eco',
    name: '星展 eco 卡',
    bank: '星展銀行（台灣）',
    rewardType: '現金積點',
    rewardNote: '現金積點 1 點 = NT$1，可折抵帳單',
    officialUrl: 'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html',
    features: [
      '日本、韓國、泰國、新加坡、美洲、歐洲實體消費 5%',
      'Tesla、Gogoro 等綠能消費最高 10%（月上限 300 點加碼）',
      '國內外一般消費 1% 無上限',
      '2026/5-8 指定行動支付最高 15%（月上限 NT$1,500）',
    ],
    rewards: {
      overseas:       { rate: 0.05, baseRate: 0.01, bonusRate: 0.04, bonusCap: 600, capLabel: '加碼每期帳單上限600點（基本1%無上限）', cap: null, note: '舊戶適用；日韓泰、新加坡、美洲、歐洲實體消費，基本國外1%無上限 + 指定地區4%加碼每期帳單上限600點' },
      eco_charging:   { rate: 0.10, baseRate: 0.01, bonusRate: 0.09, bonusCap: 300, capLabel: '加碼每期帳單上限300點（基本1%無上限）', cap: null, note: '舊戶適用；Tesla/Gogoro等指定綠能消費最高10%=一般1%+綠能加碼；加碼每期帳單上限300點，指定通路依星展公告' },
      mobile_payment: { rate: 0.15, baseRate: 0.01, bonusRate: 0.14, bonusCap: 1500, capLabel: '活動加碼每月上限 NT$1,500（基本1%無上限）', cap: null, note: '舊戶適用；限時活動2026/5-8指定行動支付最高15%=一般1%+活動加碼；需每月分別至星展Card+登錄且一般消費達檻，依達檻排序，每月最高NT$1,500' },
      food_delivery:  { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；外送若未列入當期活動僅基本回饋' },
      restaurant:     { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；餐飲無指定加碼時僅基本回饋' },
      convenience_store: { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；代收代付、儲值等排除項目需依星展公告' },
      supermarket:    { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；量販/超市無指定加碼時僅基本回饋' },
      online_shopping:{ rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；跨境網購不等同海外實體指定地區加碼' },
      shopee:         { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；蝦皮平台活動需另查星展/蝦皮當期公告' },
      streaming:      { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；訂閱制服務無指定活動時僅基本回饋' },
      transportation: { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；交通票證/儲值可能屬排除項目，需看請款方式' },
      insurance:      { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；保費/分期是否列入回饋依星展信用卡權益排除項目' },
      airline:        { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；航空網路購票不屬日韓泰等海外實體店加碼' },
      travel_booking: { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；訂房/旅遊平台無指定活動時僅基本回饋' },
      department_store: { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；百貨無指定活動時僅基本回饋' },
      fashion:        { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；服飾通路無指定活動時僅基本回饋' },
      home_deco:      { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；居家通路無指定活動時僅基本回饋' },
      pharmacy:       { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；藥妝通路無指定活動時僅基本回饋' },
      entertainment:  { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；票券/娛樂無指定活動時僅基本回饋' },
      gas_station:    { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；加油/充電若非綠能指定通路僅基本回饋' },
      telecom:        { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；電信費無指定活動時僅基本回饋' },
      ai_services:    { rate: 0.01, cap: null, note: '舊戶適用；一般消費1%現金積點無上限；AI/SaaS訂閱無指定活動時僅基本回饋' },
    }
  },

  // ── 11. 國泰世華蝦皮購物聯名卡 ──
  {
    id: 'cathay_shopee',
    name: '國泰世華蝦皮聯名卡',
    bank: '國泰世華銀行',
    rewardType: '蝦幣',
    rewardNote: '1 蝦幣 = NT$1，可於蝦皮購物折抵消費',
    officialUrl: 'https://www.cathay-cube.com.tw/cathaybk/personal/product/credit-card/cards/shopee',
    features: [
      '蝦皮站內天天 4% 蝦幣回饋，促銷檔期最高疊加至 10%',
      '指定外送、旅遊場景最高 7% 蝦幣',
      '站外一般消費 0.5% 蝦幣無上限',
      '每月累積消費達標再享蝦皮免運券',
    ],
    rewards: {
      shopee:        { rate: 0.04, baseRate: 0.005, bonusRate: 0.035, bonusCap: 20000, capLabel: '國泰加碼年度上限20,000蝦幣（基本0.5%另計）', cap: null, note: '舊戶適用；蝦皮站內最高4%依全站累積消費級距與商城/非商城而定，含國泰基本0.5%與蝦皮/國泰加碼；國泰提供之蝦皮加碼年度上限20,000蝦幣，促銷檔期最高10%需另看活動' },
      food_delivery: { rate: 0.07,  cap: 3000, note: '指定外送最高7%（原站外0.5%+加碼6.5%）；2026/4-6第二波登錄時間為2026/6/23 16:00-6/25 23:59，每波限量10,000名，每波每戶上限3,000蝦幣，額滿提前關閉' },
      travel_booking:{ rate: 0.07,  cap: 3000, note: '指定旅遊/航空/交通最高7%（原站外0.5%+加碼6.5%）；2026/4-6第二波登錄時間為2026/6/23 16:00-6/25 23:59，每波限量10,000名，每波每戶上限3,000蝦幣，額滿提前關閉' },
      online_shopping: { rate: 0.005, cap: null, note: '舊戶適用；蝦皮以外站外一般消費0.5%蝦幣，常見排除包含稅費、公用事業費、超商小額支付、停車/eTag、保費/基金等' },
    }
  },

  // ── 12. 中信 LINE Pay 卡 ──
  {
    id: 'ctbc_linepay',
    name: '中信 LINE Pay 卡',
    bank: '中國信託',
    rewardType: 'LINE POINTS',
    rewardNote: '1 LINE POINT = NT$1，可於 LINE Pay 折抵消費',
    officialUrl: 'https://www.ctbcbank.com/content/twrbo/zh_tw/cc_index/cc_product/cc_introduction_index/C_LINEPay.html',
    features: [
      '國內外一般消費 1% LINE POINTS，無上限',
      '指定通路領券最高 16% 回饋（需於活動頁領券）',
      '國外實體消費最高 2.8%（含 1.8% 加碼）',
      '一卡通儲值金搭大眾交通享 1% 加碼',
    ],
    rewards: {
      food_delivery:  { rate: 0.01,  cap: null, note: '舊戶適用；國內外一般消費1% LINE POINTS無上限；指定通路最高16%需於活動頁領券，不列入免登錄主推薦' },
      restaurant:     { rate: 0.01,  cap: null, note: '舊戶適用；國內外一般消費1% LINE POINTS無上限；餐飲若有LINE Pay/中信通路券需另行領券' },
      online_shopping:{ rate: 0.01,  cap: null, note: '舊戶適用；國內外一般消費1% LINE POINTS無上限；網購通路加碼需活動頁領券並依上限/名額' },
      shopee:         { rate: 0.01,  cap: null, note: '舊戶適用；國內外一般消費1% LINE POINTS無上限；蝦皮若有指定券或平台活動需另行領取' },
      overseas:       { rate: 0.028, baseRate: 0.01, bonusRate: 0.018, cap: null, note: '舊戶適用；國外實體商店最高2.8%=一般1%+國外實體加碼1.8%；限面對面交易，網路跨境/條碼/第三方支付不列入加碼' },
      transportation: { rate: 0.01,  cap: null, note: '舊戶適用；已綁定LINE Pay信用卡/簽帳金融卡之一卡通功能支付大眾運輸才具點數資格；高鐵、計程車除外' },
      streaming:      { rate: 0.01,  cap: null, note: '舊戶適用；國內外一般消費1% LINE POINTS無上限；串流通路加碼需領券或活動公告' },
      insurance:      { rate: 0.01,  cap: null, note: '舊戶適用；一般消費1% LINE POINTS；保費是否排除、分期是否給點依中信回饋計畫注意事項' },
      convenience_store: { rate: 0.01, cap: null, note: '舊戶適用；一般消費1% LINE POINTS；超商代收、儲值、小額支付排除需依中信公告' },
      department_store:  { rate: 0.01, cap: null, note: '舊戶適用；一般消費1% LINE POINTS；百貨通路券/活動需另行領券才有加碼' },
      travel_booking:    { rate: 0.01, cap: null, note: '舊戶適用；一般消費1% LINE POINTS；旅遊/訂房加碼需看LINE Pay或中信活動券' },
      airline:           { rate: 0.01, cap: null, note: '舊戶適用；一般消費1% LINE POINTS；國外航空實體櫃台可能適用海外實體加碼，網路購票通常僅一般回饋' },
    }
  },

];

// ────────────────────────────────────────────────
//  新增信用卡範本（給 Claude 參考用）
//
//  使用方式：跟 Claude 說「幫我新增 [卡名] 信用卡」，
//  Claude 會去官網抓資料，然後照下面格式在 CARDS 陣列尾端新增一筆。
//
//  {
//    id: 'bank_cardname',          // 唯一識別碼，全小寫英文加底線
//    name: '銀行名稱 卡片名稱',
//    bank: '銀行名稱',
//    rewardType: '現金回饋',        // 或「LINE POINTS」「點數」「哩程」等
//    officialUrl: 'https://...',    // 官網介紹頁
//    features: [                   // 2-4 條卡片特色亮點
//      '特色一',
//      '特色二',
//    ],
//    rewards: {
//      // 有特定回饋的類別才填；沒有的省略（不出現在比較表）
//      // note 需寫明是否限新戶/新卡友；若舊戶也適用，請寫「舊戶適用」或「不限新舊戶」。
//      food_delivery:    { rate: 0.03,  cap: null,  note: '舊戶適用；說明（選填）' },
//      restaurant:       { rate: 0.01,  cap: 500,   note: '不限新舊戶；月回饋上限 NT$500' },
//      overseas:         { rate: 0.05,  cap: null },
//    }
//  },
//
//  類別 id 清單：
//  food_delivery / restaurant / convenience_store / supermarket / gas_station /
//  shopee / online_shopping / department_store / travel_booking / airline /
//  overseas / streaming / ai_services / transportation / insurance /
//  pharmacy / entertainment / telecom / home_deco / fashion /
//  eco_charging / mobile_payment
// ────────────────────────────────────────────────
