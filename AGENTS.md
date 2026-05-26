# Credit Card Data Update Guide

This project is a personal credit-card reward advisor. Data quality matters more
than broad marketing claims. When updating `cards-data.js`, write data in a way
that helps decide which card to actually use for a purchase.

## Core Principle

Do not record only "最高 X%" unless the underlying conditions are also clear.
Prefer old-customer, generally available rewards for ranking. New-customer,
registration-only, limited-quota, or campaign rewards may be listed, but must be
clearly labeled so they do not silently become the default recommendation.

## Required Fields To Check

For every card and every reward category, verify and document:

- Whether the reward is for existing customers, new customers, new cardholders,
  or both.
- Base reward rate and bonus reward rate.
- Whether the displayed rate is a simple rate or a combined rate.
- Reward cap, including the unit and period:
  - monthly
  - statement cycle
  - quarterly
  - annual
  - campaign period
  - points, cash, miles, coins, or store credit
- Whether the cap applies to the whole reward or only the bonus portion.
- Required action:
  - registration
  - coupon claiming
  - switching a card plan
  - binding auto-debit
  - using a specific payment method
  - completing missions or spending thresholds
- Registration timing:
  - when registration opens
  - when registration closes
  - whether registration is monthly, quarterly, per wave, or once per campaign
  - whether registration must happen before spending
  - whether there is a quota or early close condition
- Activity period and posting/request deadline.
- Eligible merchants and important exclusions.
- Whether online, in-store, overseas, app, wallet, or third-party payment
  transactions are treated differently.

## Data Modeling Rules

Use the most precise structure the app supports.

Use `rate` for the headline effective rate used in sorting:

```js
overseas: { rate: 0.05, cap: null, note: '...' }
```

If a reward is composed of base + bonus, split it:

```js
overseas: {
  rate: 0.05,
  baseRate: 0.01,
  bonusRate: 0.04,
  bonusCap: 600,
  capLabel: '加碼每期帳單上限600點（基本1%無上限）',
  cap: null,
  note: '舊戶適用；基本國外1%無上限 + 指定地區4%加碼每期帳單上限600點',
}
```

Use `capLabel` whenever a plain monthly NT$ cap would be misleading, such as:

- "每期帳單上限600點"
- "每季上限 NT$1,000"
- "年度上限20,000蝦幣"
- "活動期間每戶限回饋1次"

Keep `note` useful for real decisions. Good notes should mention old/new
customer status, action requirements, timing, eligible merchants, and exclusions.

## Sorting Assumptions

The app currently prioritizes:

1. Existing-customer or generally available rewards.
2. Rewards that do not require registration, coupon claiming, plan switching, or
   limited campaign actions.
3. Higher effective reward rate.
4. Higher cap or uncapped rewards.

Therefore:

- Mark new-customer-only rewards with words such as `限新戶`, `新卡友限定`, or
  `首刷`.
- Mark generally available rewards with `舊戶適用` or `不限新舊戶`.
- Mark required actions with explicit words such as `需登錄`, `需領券`, `需切換`,
  `限量`, `達檻`, `任務`, or `踩點`.

These phrases are intentionally used by the ranking logic in `app.js`.

## Source Requirements

Prefer official sources:

- Bank card product pages.
- Bank campaign pages.
- Official partner campaign pages when the bank points there.
- Official PDF terms or campaign notices.

When official pages are dynamic or incomplete, do not guess. Write a cautious
note such as:

```js
note: '官方頁面待複核；目前僅確認一般消費1%，指定通路加碼需查活動頁'
```

In the final update summary, list:

- Sources used.
- Cards changed.
- Cards that still need manual verification.
- Any assumptions or ambiguous official wording.

## Validation

After updating data:

1. Run `node --check cards-data.js`.
2. Run `node --check app.js`.
3. Add or run a small smoke test when changing reward calculation behavior.
4. Update `LAST_UPDATED` in `cards-data.js` using `YYYY-MM`.
5. Confirm the page header will show the new update month.

## Commit Guidance

Keep updates scoped. If only data changed, commit only `cards-data.js` and any
directly related docs. If calculation logic changes, include focused tests or
smoke checks in the update summary.
