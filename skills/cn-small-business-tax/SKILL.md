---
name: cn-small-business-tax
description: "Use when asked 个体户怎么报税, 小规模纳税人增值税怎么算, 小微企业所得税优惠, 经营所得汇算, 开票超过免税额怎么办, or plan taxes for a sole trader (个体工商户) or small company in China. Produces the taxes that apply (增值税, 附加税费, 个人所得税经营所得 or 企业所得税), the relief that may apply with the announcement to check, a worked estimate from the person's own figures, a filing calendar, and the questions for the local tax office or 12366."
version: 1.0.0
---

# Small Business Tax (个体户与小微企业税务)

Sole traders and small companies in China face a short list of taxes with a long list of relief, and the relief has end dates. People overpay by missing relief they qualify for, or underpay by assuming relief that has lapsed or does not fit their structure. This skill identifies what applies, estimates from the person's own numbers, and sets out when to file.

Write in Simplified Chinese. Tax relief in China is issued by announcements with expiry dates; every rate, threshold and relief here must be checked against the current announcement at the 电子税务局, the 12366 hotline or a tax adviser. This is a planning aid, not tax advice.

## Required Inputs

Ask for these if not provided:
- **Structure**: 个体工商户, 个人独资企业, 合伙企业, or 有限责任公司; and VAT status (小规模纳税人 or 一般纳税人)
- **Revenue** by month or quarter, whether invoiced, and whether customers need 专用发票
- **Costs** and how they are evidenced
- **Collection method** for a 个体户: 查账征收 or 核定征收
- **Location**, since some local relief and 附加税费 rules vary

## Output Structure

### 1. Taxes that apply
| Tax | Applies? | Rate or method | Relief to check (announcement) |
Typically 增值税 (for 小规模纳税人, a reduced rate and an exemption below a monthly or quarterly sales threshold have applied under announcements running to 2027; confirm), 附加税费 (城建税, 教育费附加, 地方教育附加, often halved for small taxpayers under current relief), and income tax: 个人所得税经营所得 for a 个体户 (progressive rates, with a reduction on part of the income under current relief) or 企业所得税 for a company (小型微利企业 relief).

### 2. Worked estimate
From the person's figures only, with every step shown:
| Step | Amount | Basis |
Revenue, VAT due or exempt, surcharges, taxable income after costs, income tax, and the effective rate. Where a relief applies, show the tax with and without it.

### 3. Filing calendar
| When | What | Where |
VAT and surcharges monthly or quarterly; 经营所得 prepayments and the annual reconciliation (typically by 31 March for the previous year); 企业所得税 quarterly prepayments and annual filing; all dates to confirm.

### 4. Choices to discuss with an adviser
Whether to stay a 小规模纳税人 or register as 一般纳税人 (customers needing 专用发票), 查账 versus 核定, and when a change of structure is worth exploring, framed as questions rather than recommendations.

## Quality Checks

- [ ] Every rate, threshold and relief names the announcement to check and says it may have changed
- [ ] The estimate uses only the person's figures, with each step shown
- [ ] Tax with and without each relief is shown where relief applies
- [ ] The filing calendar covers every tax identified
- [ ] Structural choices are framed as questions for an adviser, not advice
- [ ] The output states it is not tax advice

## Anti-Patterns

- **Relief without an expiry date.** Most small-business relief is temporary.
- **Assuming company relief applies to a 个体户.** The income tax regimes differ.
- **Estimating costs the person did not give.** Unevidenced costs are not deductible.
- **Promoting schemes to "save tax".** Arrangements without substance draw audits.

## Example Trigger Phrases

- "我是个体户，一个季度开票 35 万，增值税怎么交？"
- "小规模纳税人的增值税优惠到什么时候？"
- "经营所得年度汇算怎么报？"
- "Estimate taxes for my small company in China."
