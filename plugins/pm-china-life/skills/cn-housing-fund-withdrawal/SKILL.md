---
name: cn-housing-fund-withdrawal
description: "Use when asked 公积金怎么提取, 租房能提公积金吗, 离职后公积金怎么办, 公积金贷款能贷多少, 异地提取公积金, or plan how to use a Chinese housing provident fund (住房公积金). Produces the withdrawal routes the person qualifies for (购房, 还贷, 租房, 离职或离开城市, 退休, 重大疾病 and others), the documents and channels for each, a comparison of withdrawing versus keeping the balance for a 公积金贷款, and the city-specific limits to confirm."
version: 1.0.0
---

# Housing Fund Withdrawal (公积金提取)

The 住房公积金 is money the person and their employer pay in every month, and many people leave it untouched for years because the withdrawal rules are local and confusing. The bigger decision is often not how to withdraw but whether to keep the balance for a cheaper 公积金贷款 later. This skill finds the routes the person qualifies for, lists what each needs, and lays out that trade-off.

Write in Simplified Chinese. Rules, limits and channels are set by each city's 住房公积金管理中心 and change; confirm everything with the local centre, its app or the 全国住房公积金小程序 before acting.

## Required Inputs

Ask for these if not provided:
- **City** where the fund is held, and the city where the person lives now
- **Situation**: renting, buying, repaying a loan, changed job, left the city, retiring, illness or hardship
- **Balance** and monthly contributions, if known
- **Plans**: whether they may buy a home in the next few years, and where

## Output Structure

### 1. Routes you qualify for
| Route | Typical conditions (confirm locally) | What you can withdraw | How often |
Common routes: 购买自住住房, 偿还购房贷款, 租房 (often with a monthly cap set by the city), 离职后 or 离开缴存城市 (rules differ for leaving the city versus changing employer), 退休, 出境定居, 重大疾病 or 生活困难, and in some cities renovation or energy upgrades.

### 2. Documents and channels
For each route: documents, channel (city centre app, 全国住房公积金小程序, bank counter, in person), and typical processing time to confirm.

### 3. Withdraw or keep for a loan
A comparison for this person: the 公积金贷款 rate against the commercial mortgage rate at the time (to look up), the loan limits that depend on balance and contribution history in many cities, and whether withdrawing now reduces a future loan amount. State the conclusion as a choice with its condition, for example "keep it if you expect to buy in this city within three years".

### 4. Moving cities
What happens to the balance if they change cities: 转移接续 between cities through the national platform, or withdrawal on leaving where the city allows it.

## Quality Checks

- [ ] Every route's conditions and limits are marked to confirm with the local centre
- [ ] Each route lists documents, channel and frequency
- [ ] The withdraw-or-keep comparison is tied to the person's own buying plans
- [ ] Moving between cities is covered when the person has moved or may move
- [ ] No rate, cap or limit is stated as current without a source to check
- [ ] Rent withdrawal caps are attributed to the city, not given as national figures

## Anti-Patterns

- **National answers to a local question.** Caps and conditions differ by city.
- **Withdrawing everything by reflex.** It can shrink a cheaper loan later.
- **Agents who promise to "unlock" the fund for a fee.** Some are fraudulent; use official channels.
- **Old rates.** Loan rates are adjusted; look them up on the day.

## Example Trigger Phrases

- "我在杭州租房，公积金能提吗？一个月能提多少？"
- "离职回老家了，上海的公积金怎么办？"
- "准备两年后买房，现在要不要把公积金提出来？"
- "How do I withdraw my Chinese housing fund after leaving the city?"
