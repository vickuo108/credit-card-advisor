// ────────────────────────────────────────────────
//  初始化
// ────────────────────────────────────────────────
const CUSTOM_CARDS_KEY = 'vicCustomCreditCards';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lastUpdated').textContent = LAST_UPDATED;
  populateCategorySelect();
  renderCustomCards();
  bindEvents();
});

function populateCategorySelect() {
  const select = document.getElementById('categorySelect');
  CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = `${cat.icon} ${cat.label}`;
    select.appendChild(opt);
  });
}

function bindEvents() {
  document.getElementById('searchBtn').addEventListener('click', handleSearch);
  document.getElementById('resetBtn').addEventListener('click', handleReset);
  document.getElementById('toggleAddCardBtn').addEventListener('click', toggleAddCardPanel);
  document.getElementById('cancelAddCardBtn').addEventListener('click', hideAddCardPanel);
  document.getElementById('saveNewCardBtn').addEventListener('click', saveNewCard);

  // 文字輸入：即時偵測類別
  document.getElementById('textInput').addEventListener('input', e => {
    const text = e.target.value.trim();
    if (!text) {
      document.getElementById('textHint').textContent = '';
      return;
    }
    const cat = matchTextToCategory(text);
    if (cat) {
      document.getElementById('textHint').textContent = `偵測到：${cat.icon} ${cat.label}`;
      document.getElementById('categorySelect').value = '';
    } else {
      document.getElementById('textHint').textContent = '找不到對應類別，請從下拉選單選擇';
    }
  });

  // 若選了下拉，清空文字輸入提示
  document.getElementById('categorySelect').addEventListener('change', () => {
    document.getElementById('textInput').value = '';
    document.getElementById('textHint').textContent = '';
  });

  // Enter 鍵觸發查詢
  document.getElementById('textInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
  document.getElementById('amountInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

// ────────────────────────────────────────────────
//  查詢邏輯
// ────────────────────────────────────────────────
function handleSearch() {
  const selectVal = document.getElementById('categorySelect').value;
  const textVal   = document.getElementById('textInput').value.trim();
  const amount    = parseFloat(document.getElementById('amountInput').value) || null;

  let categoryId = selectVal;

  // 若未選下拉，嘗試從文字判斷
  if (!categoryId && textVal) {
    const cat = matchTextToCategory(textVal);
    if (cat) {
      categoryId = cat.id;
    }
  }

  if (!categoryId) {
    alert('請選擇消費類別，或在下方輸入消費情境描述（例如：外送、超市、加油）');
    return;
  }

  const results = searchCards(categoryId);
  renderResults(results, categoryId, amount);
}

function handleReset() {
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('categorySelect').value = '';
  document.getElementById('textInput').value = '';
  document.getElementById('textHint').textContent = '';
  document.getElementById('amountInput').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 把文字對應到類別
function matchTextToCategory(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  CATEGORIES.forEach(cat => {
    let score = 0;
    cat.keywords.forEach(kw => {
      if (lower.includes(kw.toLowerCase())) score += kw.length;
    });
    if (score > bestScore) { bestScore = score; best = cat; }
  });
  return bestScore > 0 ? best : null;
}

// 找出所有這個類別有回饋的卡片，由高到低排序
function searchCards(categoryId) {
  const results = [];
  getAllCards().forEach(card => {
    const reward = card.rewards[categoryId];
    if (reward && reward.rate > 0) {
      results.push({
        card,
        reward,
        rate: reward.rate,
        newCustomerOnly: rewardIsNewCustomerOnly(reward),
        requiresAction: rewardRequiresAction(reward),
      });
    }
  });
  // 舊戶/一般適用優先，再優先不用登錄/領券/切換的回饋；同組內按回饋率與上限排序。
  results.sort((a, b) => {
    if (a.newCustomerOnly !== b.newCustomerOnly) return a.newCustomerOnly ? 1 : -1;
    if (a.requiresAction !== b.requiresAction) return a.requiresAction ? 1 : -1;
    if (b.rate !== a.rate) return b.rate - a.rate;
    const capA = a.reward.cap === null ? Infinity : a.reward.cap;
    const capB = b.reward.cap === null ? Infinity : b.reward.cap;
    return capB - capA;
  });
  return results;
}

// ────────────────────────────────────────────────
//  渲染結果
// ────────────────────────────────────────────────
function renderResults(results, categoryId, amount) {
  const section = document.getElementById('resultsSection');
  const cat = CATEGORIES.find(c => c.id === categoryId);
  ensureResultsLayout();

  if (results.length === 0) {
    section.innerHTML = `
      <div class="no-result">
        <p>😅 你手上的 ${getAllCards().length} 張卡在「${escapeHtml(cat.label)}」這個類別，目前沒有找到特定回饋。</p>
        <p style="margin-top:8px;font-size:13px;color:#9CA3AF">建議選擇一般消費回饋率最高的卡片。</p>
      </div>
      <button class="reset-btn" id="resetBtn">重新查詢</button>
    `;
    section.style.display = 'block';
    document.getElementById('resetBtn').addEventListener('click', handleReset);
    return;
  }

  const top = results[0];
  const rest = results.slice(1);

  // ── 1. 建議刷這張 ──
  document.getElementById('topCardContent').innerHTML = renderTopCard(top, cat, amount);

  // ── 2. 其他有回饋的卡 ──
  const otherSection = document.getElementById('otherCardsSection');
  const otherList    = document.getElementById('otherCardsList');
  if (rest.length > 0) {
    otherList.innerHTML = rest.map((r, idx) => renderOtherCard(r, cat, amount, idx)).join('');
    otherSection.style.display = 'block';
  } else {
    otherSection.style.display = 'none';
  }

  // ── 3. 比較表 ──
  renderComparisonTable(results, cat);

  // ── 4. 結論 ──
  document.getElementById('conclusionText').innerHTML = generateConclusion(results, cat, amount);

  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 綁定「詳細資訊」展開事件
  document.querySelectorAll('.detail-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const content  = document.getElementById(targetId);
      const isOpen   = content.classList.contains('open');
      content.classList.toggle('open', !isOpen);
      this.classList.toggle('open', !isOpen);
      this.querySelector('.arrow').textContent = isOpen ? '▼' : '▲';
    });
  });
}

function ensureResultsLayout() {
  const section = document.getElementById('resultsSection');
  if (document.getElementById('topCardContent')) return;

  section.innerHTML = `
    <div class="top-recommendation" id="topCard">
      <div class="recommend-badge">建議刷這張</div>
      <div class="card-content" id="topCardContent"></div>
    </div>
    <div class="other-cards-section" id="otherCardsSection" style="display:none">
      <h3>你的卡</h3>
      <div id="otherCardsList"></div>
    </div>
    <div class="comparison-section">
      <h3>詳細的卡片比較整理如下：</h3>
      <div class="table-scroll">
        <table class="comparison-table" id="comparisonTable">
          <thead id="comparisonHead"></thead>
          <tbody id="comparisonBody"></tbody>
        </table>
      </div>
    </div>
    <div class="conclusion-section">
      <p id="conclusionText"></p>
    </div>
    <button class="reset-btn" id="resetBtn">重新查詢</button>
  `;
  document.getElementById('resetBtn').addEventListener('click', handleReset);
}

// ── 建議刷這張內容 ──
function renderTopCard(result, cat, amount) {
  const { card, reward } = result;
  const rateStr    = formatRate(reward.rate);
  const capStr     = formatRewardCap(reward);
  const rewardAmt  = amount ? calcReward(amount, reward) : null;
  const cardName   = escapeHtml(card.name);
  const rewardType = escapeHtml(card.rewardType);
  const catLabel   = escapeHtml(cat.label);
  const note       = reward.note ? escapeHtml(reward.note) : '';

  return `
    <div class="card-name">${cardName}</div>
    <div class="card-stats">
      <div class="stat-row">
        <span class="stat-label">${cat.icon} ${catLabel} 回饋率</span>
        <span class="stat-value">${rateStr}（${rewardType}）</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">每月回饋上限</span>
        <span class="stat-value">${capStr}</span>
      </div>
      ${rewardAmt !== null ? `
      <div class="stat-row">
        <span class="stat-label">預計回饋金額</span>
        <span class="stat-value">NT$${rewardAmt.toFixed(0)}</span>
      </div>` : ''}
    </div>
    ${note ? `<p style="font-size:12px;color:#6B7280;margin-bottom:12px">⚠️ ${note}</p>` : ''}

    <button class="detail-toggle" data-target="top-detail">
      <span>詳細資訊</span><span class="arrow">▼</span>
    </button>
    <div id="top-detail" class="detail-content">
      <div class="detail-section-title">推薦原因</div>
      <p class="reason-text">在「${catLabel}」消費情境下，${cardName} 提供 ${rateStr} ${rewardType}回饋（${capStr}），為你手上所有卡中回饋最高的選擇。</p>
      <div class="detail-section-title">卡片特色</div>
      <ul class="features-list">
        ${card.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>
      ${card.officialUrl ? `<a href="${escapeAttribute(card.officialUrl)}" target="_blank" class="official-link">前往官網查看最新優惠 →</a>` : ''}
    </div>
  `;
}

// ── 其他有回饋的卡 ──
function renderOtherCard(result, cat, amount, idx) {
  const { card, reward } = result;
  const rateStr   = formatRate(reward.rate);
  const capStr    = formatRewardCap(reward);
  const rewardAmt = amount ? calcReward(amount, reward) : null;
  const detailId  = `other-detail-${idx}`;
  const cardName  = escapeHtml(card.name);
  const rewardType = escapeHtml(card.rewardType);
  const catLabel  = escapeHtml(cat.label);
  const note      = reward.note ? escapeHtml(reward.note) : '';

  return `
    <div class="other-card-item">
      <div class="other-card-header">
        <span class="other-card-name">${cardName}</span>
        <span class="other-card-rate">${rateStr} ${rewardType}</span>
      </div>
      <div class="other-card-meta">
        ${capStr}
        ${rewardAmt !== null ? ` ／ 預計回饋 NT$${rewardAmt.toFixed(0)}` : ''}
      </div>
      ${note ? `<div style="font-size:12px;color:#9CA3AF;margin-bottom:6px">⚠️ ${note}</div>` : ''}
      <div class="other-card-actions">
        <button class="btn-detail detail-toggle" data-target="${detailId}">
          詳細資訊 <span class="arrow">▼</span>
        </button>
        ${card.officialUrl ? `<a href="${escapeAttribute(card.officialUrl)}" target="_blank" class="btn-official">前往官網 →</a>` : ''}
      </div>
      <div id="${detailId}" class="other-card-detail">
        <div class="detail-section-title" style="margin-top:0">推薦原因</div>
        <p class="reason-text" style="font-size:13px">${cardName} 在「${catLabel}」提供 ${rateStr} ${rewardType}回饋。</p>
        <div class="detail-section-title">卡片特色</div>
        <ul class="features-list">
          ${card.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// ── 比較表 ──
function renderComparisonTable(results, cat) {
  const head = document.getElementById('comparisonHead');
  const body = document.getElementById('comparisonBody');

  // Header: 你的卡 | 卡1 | 卡2 | ...
  head.innerHTML = `<tr>
    <th class="row-label">你的卡</th>
    ${results.map(r => `<th>${escapeHtml(r.card.name)}</th>`).join('')}
  </tr>`;

  // Row 1: 回饋率
  const rateRow = `<tr>
    <td class="row-label">回饋率</td>
    ${results.map(r => `<td class="rate-value">${formatRate(r.reward.rate)}${escapeHtml(r.card.rewardType)}</td>`).join('')}
  </tr>`;

  // Row 2: 月上限
  const capRow = `<tr>
    <td class="row-label">每月上限</td>
    ${results.map(r => `<td>${escapeHtml(formatRewardCap(r.reward))}</td>`).join('')}
  </tr>`;

  body.innerHTML = rateRow + capRow;
}

// ── 結論 ──
function generateConclusion(results, cat, amount) {
  const top = results[0];
  const topRate = formatRate(top.rate);
  const topName = escapeHtml(top.card.name);
  const catLabel = escapeHtml(cat.label);
  const topRewardType = escapeHtml(top.card.rewardType);
  const actionOption = results.find(r => r.requiresAction && r.rate > top.rate);
  const newCustomerOption = results.find(r => r.newCustomerOnly && r.rate > top.rate);

  let text = `<strong>結論：</strong>在「${cat.icon} ${catLabel}」的消費情境下，`;

  if (results.length === 1) {
    text += `你手上只有 <strong>${topName}</strong> 提供此類別的特定回饋，享 ${topRate} ${topRewardType}。`;
  } else {
    const second = results[1];
    const secondName = escapeHtml(second.card.name);
    const secondRewardType = escapeHtml(second.card.rewardType);
    if (top.rate === second.rate) {
      text += `<strong>${topName}</strong> 與 <strong>${secondName}</strong> 並列最高 ${topRate} 回饋。`;
      if (isRewardUncapped(top.reward) && !isRewardUncapped(second.reward)) {
        text += `${topName} 無月上限，彈性較大；`;
      }
    } else {
      text += `<strong>${topName}</strong> 以 ${topRate} ${topRewardType}領先，為最佳選擇；`;
      text += `<strong>${secondName}</strong> 次之，提供 ${formatRate(second.rate)} ${secondRewardType}。`;
    }
  }

  if (top.reward.note) {
    text += `使用 ${topName} 請注意：${escapeHtml(top.reward.note)}。`;
  }

  if (actionOption) {
    text += `若你願意先完成登錄、領券或方案切換，${escapeHtml(actionOption.card.name)} 可到 ${formatRate(actionOption.rate)}，但我已優先推薦不用額外操作的卡。`;
  }

  if (newCustomerOption) {
    text += `${escapeHtml(newCustomerOption.card.name)} 有 ${formatRate(newCustomerOption.rate)} 的新戶/新卡友限定回饋；排序時已先以舊戶或一般適用回饋為主。`;
  }

  if (amount && results.length > 1) {
    const topAmt    = calcReward(amount, top.reward);
    const secondAmt = calcReward(amount, results[1].reward);
    const diff = topAmt - secondAmt;
    if (diff > 0) {
      text += `消費 NT$${amount.toLocaleString()} 時，選 ${topName} 比 ${escapeHtml(results[1].card.name)} 多回饋約 NT$${diff.toFixed(0)}。`;
    }
  }

  return text;
}

// ────────────────────────────────────────────────
//  新增信用卡
// ────────────────────────────────────────────────
function toggleAddCardPanel() {
  const panel = document.getElementById('addCardPanel');
  const shouldOpen = panel.style.display === 'none';
  panel.style.display = shouldOpen ? 'block' : 'none';
  if (shouldOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideAddCardPanel() {
  document.getElementById('addCardPanel').style.display = 'none';
}

function saveNewCard() {
  const name = document.getElementById('newCardName').value.trim();
  const bank = document.getElementById('newCardBank').value.trim();

  if (!name) {
    alert('請輸入卡片名稱');
    return;
  }

  if (!bank) {
    alert('請輸入銀行名稱');
    return;
  }

  const customCards = loadCustomCards();
  customCards.push({
    id: `custom_${Date.now()}`,
    name,
    bank,
    rewardType: '',
    rewardNote: '',
    officialUrl: '',
    features: [],
    rewards: {},
    status: 'pending_official_research',
    requestedAt: new Date().toISOString(),
    isCustom: true,
  });

  saveCustomCards(customCards);
  resetAddCardForm();
  hideAddCardPanel();
  renderCustomCards();
}

function resetAddCardForm() {
  ['newCardName', 'newCardBank'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function renderCustomCards() {
  const list = document.getElementById('customCardsList');
  const customCards = loadCustomCards();
  if (customCards.length === 0) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = `
    <h3>待查官方資料</h3>
    ${customCards.map(card => `
      <div class="custom-card-item">
        <div>
          <div class="custom-card-name">${escapeHtml(card.name)}</div>
          <div class="custom-card-meta">${escapeHtml(card.bank || '自訂卡片')} · 待我查官網後寫入資料檔</div>
        </div>
        <button class="delete-card-btn" type="button" data-id="${escapeAttribute(card.id)}">刪除</button>
      </div>
    `).join('')}
  `;

  list.querySelectorAll('.delete-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const remaining = loadCustomCards().filter(card => card.id !== btn.dataset.id);
      saveCustomCards(remaining);
      renderCustomCards();
    });
  });
}

function getAllCards() {
  return CARDS.concat(loadCustomCards().filter(card => card.status !== 'pending_official_research'));
}

function loadCustomCards() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_CARDS_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function saveCustomCards(cards) {
  localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(cards));
}

// ────────────────────────────────────────────────
//  工具函式
// ────────────────────────────────────────────────
function formatRate(rate) {
  return (rate * 100).toFixed(1).replace(/\.0$/, '') + '%';
}

function calcReward(amount, reward) {
  if (typeof reward.baseRate === 'number' && typeof reward.bonusRate === 'number') {
    const base = amount * reward.baseRate;
    const bonus = amount * reward.bonusRate;
    return base + (reward.bonusCap ? Math.min(bonus, reward.bonusCap) : bonus);
  }
  const raw = amount * reward.rate;
  return reward.cap ? Math.min(raw, reward.cap) : raw;
}

function formatRewardCap(reward) {
  if (reward.bonusCap && reward.baseRate) {
    return `加碼上限 NT$${reward.bonusCap.toLocaleString()}（基本${formatRate(reward.baseRate)}無上限）`;
  }
  return reward.cap ? `月上限 NT$${reward.cap.toLocaleString()}` : '無上限';
}

function isRewardUncapped(reward) {
  return !reward.cap && !reward.bonusCap;
}

function rewardRequiresAction(reward) {
  const note = reward.note || '';
  return /需|登錄|領券|切換|限量|活動|達檻|任務|踩點|每月|每季|每波|額滿/.test(note);
}

function rewardIsNewCustomerOnly(reward) {
  const note = reward.note || '';
  return /新戶|新卡友|新申辦|新卡|首刷|首次申辦|限新戶|限新卡/.test(note) && !/舊戶|不限新舊戶|新舊戶/.test(note);
}

function normalizeUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}
