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
      food_delivery:     { rate: 0.03,  cap: null, note: '需切換「樂饗購」方案（每日一次）' },
      restaurant:        { rate: 0.03,  cap: null, note: '需切換「樂饗購」方案（每日一次）' },
      department_store:  { rate: 0.03,  cap: null, note: '需切換「樂饗購」方案（每日一次）' },
      entertainment:     { rate: 0.03,  cap: null, note: '需切換「樂饗購」方案（每日一次）' },
      online_shopping:   { rate: 0.03,  cap: null, note: '需切換「玩數位」方案（每日一次）' },
      shopee:            { rate: 0.03,  cap: null, note: '需切換「玩數位」方案（每日一次）' },
      streaming:         { rate: 0.03,  cap: null, note: '需切換「玩數位」方案（每日一次）' },
      ai_services:       { rate: 0.03,  cap: null, note: '需切換「玩數位」方案（每日一次）' },
      travel_booking:    { rate: 0.03,  cap: null, note: '需切換「趣旅行」方案（每日一次）' },
      airline:           { rate: 0.03,  cap: null, note: '需切換「趣旅行」方案（每日一次）' },
      overseas:          { rate: 0.03,  cap: null, note: '需切換「趣旅行」方案（每日一次）' },
      convenience_store: { rate: 0.02,  cap: null, note: '切換「集精選」方案（7-11、全家等指定超商）' },
      supermarket:       { rate: 0.02,  cap: null, note: '切換「集精選」方案（全聯、家樂福）' },
      gas_station:       { rate: 0.02,  cap: null, note: '切換「集精選」方案（中油直營、U-POWER）' },
      home_deco:         { rate: 0.02,  cap: null, note: '切換「集精選」方案（IKEA）' },
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
      food_delivery:     { rate: 0.03,  cap: null, note: '百大指定通路（簡單選），含外送平台' },
      restaurant:        { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      convenience_store: { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      supermarket:       { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      online_shopping:   { rate: 0.03,  cap: null, note: '百大指定通路（含蝦皮、momo）' },
      shopee:            { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      streaming:         { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      travel_booking:    { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      airline:           { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
      department_store:  { rate: 0.03,  cap: null, note: '百大指定通路（簡單選）' },
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
      convenience_store: { rate: 0.07,  cap: 500,  note: '統一集團通路最高 7%；需每月1日起至月底於中信銀行App領取「uniopen聯名卡卡友專屬券」，並於不同統一集團品牌踩點；2%通路加碼月上限500點，踩點加碼月上限500點' },
      overseas:          { rate: 0.11,  cap: 500,  note: '指定國家實體商店最高 11%；需每月1日起至月底於中信銀行App領券，交易需次月15日前請款；指定國家加碼月上限500點' },
      online_shopping:   { rate: 0.01,  cap: null, note: '一般消費基本回饋' },
      restaurant:        { rate: 0.01,  cap: null, note: '一般消費基本回饋' },
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
      telecom:  { rate: 0.035, cap: null, note: '當月帳單新增消費滿 NT$5,000 才享加碼；台灣大哥大 5G 電信費 3.5%，4G/代付等為2%' },
      overseas: { rate: 0.02,  cap: null, note: '海外一般消費2%；2026/4/13-6/30 海外累積滿 NT$10,000 另送 NT$500 統一超商虛擬商品卡，需登錄、限量，活動期間每戶限回饋1次' },
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
      food_delivery:     { rate: 0.033, cap: null, note: '好饗刷：Uber Eats、Foodpanda' },
      restaurant:        { rate: 0.033, cap: null, note: '好饗刷：全台餐廳' },
      entertainment:     { rate: 0.033, cap: null, note: '好饗刷：購票、KTV、指定飯店' },
      convenience_store: { rate: 0.033, cap: null, note: '天天刷：全家、7-11（含台新Pay）' },
      supermarket:       { rate: 0.033, cap: null, note: '天天刷：家樂福、大買家' },
      gas_station:       { rate: 0.033, cap: null, note: '天天刷：中油、全國加油' },
      pharmacy:          { rate: 0.033, cap: null, note: '天天刷：康是美、屈臣氏、寶雅' },
      transportation:    { rate: 0.033, cap: null, note: '天天刷：高鐵、台鐵、Uber、台灣大車隊' },
      department_store:  { rate: 0.033, cap: null, note: '大筆刷：新光三越、遠東、SOGO 等' },
      home_deco:         { rate: 0.033, cap: null, note: '大筆刷：IKEA、特力屋、HOLA' },
      fashion:           { rate: 0.033, cap: null, note: '大筆刷：UNIQLO、ZARA、NET' },
      online_shopping:   { rate: 0.033, cap: null, note: '數趣刷：蝦皮、momo、PChome、Amazon' },
      shopee:            { rate: 0.033, cap: null, note: '數趣刷：蝦皮購物' },
      streaming:         { rate: 0.033, cap: null, note: '數趣刷：Netflix、Disney+、Spotify' },
      ai_services:       { rate: 0.033, cap: null, note: '數趣刷：ChatGPT、Claude、Notion、Canva' },
      overseas:          { rate: 0.033, cap: null, note: '玩旅刷：所有海外消費' },
      airline:           { rate: 0.033, cap: null, note: '玩旅刷：長榮、中華航空、星宇等' },
      travel_booking:    { rate: 0.033, cap: null, note: '玩旅刷：Agoda、Klook、KKday、雄獅' },
      insurance:         { rate: 0.013, cap: null, note: '保費 1.3% 回饋，無上限' },
      mobile_payment:    { rate: 0.038, cap: null, note: '台新Pay綁定最高 3.8%' },
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
      streaming:      { rate: 0.07, cap: 700,  note: '指定訂閱制領券，活動至 2026/6/30' },
      transportation: { rate: 0.02, cap: null,  note: 'LINE Pay 綁定大眾交通工具' },
      mobile_payment: { rate: 0.02, cap: null,  note: 'LINE Pay 綁定消費' },
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
      mobile_payment:    { rate: 0.05, cap: 300,  note: 'Apple/Google/Samsung/Garmin Pay，月上限 NT$300 豐點加碼' },
      pharmacy:          { rate: 0.05, cap: 300,  note: '醫藥保健通路，月上限 NT$300 豐點加碼' },
      entertainment:     { rate: 0.05, cap: 300,  note: '電競娛樂通路，月上限 NT$300 豐點加碼' },
      online_shopping:   { rate: 0.01, cap: null, note: '一般消費基本回饋' },
      restaurant:        { rate: 0.01, cap: null, note: '一般消費基本回饋' },
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
      online_shopping: { rate: 0.03, cap: 1000, note: 'momo 站內消費，月上限 1,000 momo 幣；精選品牌最高 7%' },
      overseas:        { rate: 0.01, cap: null,  note: '海外一般消費' },
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
      overseas:   { rate: 0.06, cap: 1000, note: '限日本、韓國、泰國當地實體消費單筆滿 NT$1,000；每季登錄一次即可，不用每月重複登錄。2026/4-9 每月20日16:00開放至月底23:59，各月限量20,000名；每季每戶加碼上限 NT$1,000' },
      airline:    { rate: 0.01, cap: null, note: '一般消費回饋（無特定航空加碼）' },
      insurance:  { rate: 0.005, cap: null, note: '保費 0.5% 回饋' },
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
      overseas:       { rate: 0.05, cap: null, note: '日韓泰、新加坡、美洲、歐洲實體消費' },
      eco_charging:   { rate: 0.10, cap: 300,  note: 'Tesla、Gogoro，月加碼上限 300 點' },
      mobile_payment: { rate: 0.15, cap: 1500, note: '限時活動 2026/5-8，需每月分別至星展Card+登錄且一般消費達檻；5月5/4 15:00-5/31、6月6/1 15:00-6/30、7月7/1 15:00-7/31、8月8/3 15:00-8/31；依達檻排序，每月最高 NT$1,500' },
      food_delivery:  { rate: 0.01, cap: null, note: '一般消費無上限' },
      restaurant:     { rate: 0.01, cap: null, note: '一般消費無上限' },
      convenience_store: { rate: 0.01, cap: null, note: '一般消費無上限' },
      supermarket:    { rate: 0.01, cap: null, note: '一般消費無上限' },
      online_shopping:{ rate: 0.01, cap: null, note: '一般消費無上限' },
      shopee:         { rate: 0.01, cap: null, note: '一般消費無上限' },
      streaming:      { rate: 0.01, cap: null, note: '一般消費無上限' },
      transportation: { rate: 0.01, cap: null, note: '一般消費無上限' },
      insurance:      { rate: 0.01, cap: null, note: '一般消費無上限' },
      airline:        { rate: 0.01, cap: null, note: '一般消費無上限' },
      travel_booking: { rate: 0.01, cap: null, note: '一般消費無上限' },
      department_store: { rate: 0.01, cap: null, note: '一般消費無上限' },
      fashion:        { rate: 0.01, cap: null, note: '一般消費無上限' },
      home_deco:      { rate: 0.01, cap: null, note: '一般消費無上限' },
      pharmacy:       { rate: 0.01, cap: null, note: '一般消費無上限' },
      entertainment:  { rate: 0.01, cap: null, note: '一般消費無上限' },
      gas_station:    { rate: 0.01, cap: null, note: '一般消費無上限' },
      telecom:        { rate: 0.01, cap: null, note: '一般消費無上限' },
      ai_services:    { rate: 0.01, cap: null, note: '一般消費無上限' },
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
      shopee:        { rate: 0.04,  cap: null, note: '蝦皮站內天天 4%，促銷可達 10%' },
      food_delivery: { rate: 0.07,  cap: 3000, note: '指定外送最高7%（原站外0.5%+加碼6.5%）；2026/4-6第二波登錄時間為2026/6/23 16:00-6/25 23:59，每波限量10,000名，每波每戶上限3,000蝦幣，額滿提前關閉' },
      travel_booking:{ rate: 0.07,  cap: 3000, note: '指定旅遊/航空/交通最高7%（原站外0.5%+加碼6.5%）；2026/4-6第二波登錄時間為2026/6/23 16:00-6/25 23:59，每波限量10,000名，每波每戶上限3,000蝦幣，額滿提前關閉' },
      online_shopping: { rate: 0.005, cap: null, note: '蝦皮以外網購，站外一般消費 0.5%' },
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
      food_delivery:  { rate: 0.01,  cap: null, note: '一般消費基本回饋；指定通路領券最高 16%' },
      restaurant:     { rate: 0.01,  cap: null, note: '一般消費基本回饋；指定通路領券最高 16%' },
      online_shopping:{ rate: 0.01,  cap: null, note: '一般消費基本回饋；指定通路領券最高 16%' },
      shopee:         { rate: 0.01,  cap: null, note: '一般消費基本回饋；指定通路領券最高 16%' },
      overseas:       { rate: 0.028, cap: null, note: '國外實體消費，含基本 1% + 加碼 1.8%' },
      transportation: { rate: 0.01,  cap: null, note: '一卡通儲值金搭大眾交通' },
      streaming:      { rate: 0.01,  cap: null, note: '一般消費基本回饋；指定通路領券最高 16%' },
      insurance:      { rate: 0.01,  cap: null, note: '一般消費基本回饋' },
      convenience_store: { rate: 0.01, cap: null, note: '一般消費基本回饋' },
      department_store:  { rate: 0.01, cap: null, note: '一般消費基本回饋' },
      travel_booking:    { rate: 0.01, cap: null, note: '一般消費基本回饋' },
      airline:           { rate: 0.01, cap: null, note: '一般消費基本回饋' },
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
//      food_delivery:    { rate: 0.03,  cap: null,  note: '說明（選填）' },
//      restaurant:       { rate: 0.01,  cap: 500,   note: '月回饋上限 NT$500' },
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
