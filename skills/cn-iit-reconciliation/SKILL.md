---
name: cn-iit-reconciliation
description: "Prepare for China's annual individual income tax reconciliation (个税年度汇算): check income, deductions and special additional deductions, compare the two treatments of a year-end bonus, and estimate the refund or amount to pay before filing in the 个人所得税 app. Use when asked 个税汇算怎么弄, 年终奖单独计税还是合并, 我能退多少税, 专项附加扣除, or how does China's annual tax reconciliation work. Produces a filing checklist, the deductions the person may be missing, a bonus comparison, the estimate with workings, and deadlines. Not tax advice."
version: 1.0.0
---

# China Annual Tax Reconciliation (个税年度汇算)

Each year, people with comprehensive income in mainland China settle the difference between tax withheld and tax actually due. Many leave money unclaimed by missing special additional deductions, or pay more by choosing the wrong treatment for a year-end bonus. This skill prepares the filing: checks the inputs, finds missed deductions, compares the bonus options, and estimates the result before the person opens the app.

Write the output in Simplified Chinese unless asked otherwise.

## What This Skill Produces

- **A filing checklist**: what to have ready and where it is in the 个人所得税 app
- **Deductions review**: each special additional deduction, whether the person may qualify, and what is needed
- **A bonus comparison**: separate taxation versus merged, with the cheaper one
- **The estimate**: refund or amount to pay, with the workings
- **Deadlines**: the filing window and the appointment slots

## Required Inputs

Ask for these if not provided:
- **Annual income** by type: wages, one-off bonus, labour remuneration (劳务报酬), author's remuneration (稿酬), royalties
- **Personal social insurance and housing fund contributions** for the year
- **Circumstances for special additional deductions**: children, infants under three, continuing education, serious illness costs, first-home mortgage interest, rent and city, supporting parents aged 60 or over
- **Other deductions**: personal pension contributions, qualifying commercial health insurance
- **Tax already withheld**, from the app's income detail page

## Framework

1. **Check the income detail** in the app against payslips. Unknown income entries should be disputed in the app, not ignored.
2. **Special additional deductions**: go through each category, ask the qualifying facts, and note the evidence needed. Do not decide eligibility on behalf of the tax authority; flag likely ones.
3. **Bonus treatment**: compute both. Separate taxation divides the bonus by 12 to find the rate in the monthly table. It is often, but not always, cheaper; for lower incomes merging can be better. The separate option is available until 31 December 2027; check it still applies.
4. **Estimate**: taxable income = counted income − 60,000 − social insurance − special additional deductions − other deductions. Apply the annual table. Compare with tax withheld.
5. **File**: the window usually runs from 1 March to 30 June of the following year, with appointment slots early in March. Keep evidence for five years.

## Programmatic Helper

```bash
python3 skills/cn-iit-reconciliation/scripts/cn_iit.py --wages 360000 --social-insurance 40000 --special 36000 --withheld 30000
python3 skills/cn-iit-reconciliation/scripts/cn_iit.py --wages 300000 --bonus 60000 --social-insurance 35000 --withheld 20000
```

Uses the national rates and basic deduction in force since 2019. Standard library only.

## Output Format

### 个税年度汇算准备：[纳税年度]

**一、准备材料清单**

**二、专项附加扣除检查**
| 项目 | 是否可能符合 | 需要的信息或凭证 |

**三、年终奖计税方式比较**
| 方式 | 应纳税额 |，推荐：[方式]

**四、估算结果**
| 项目 | 金额 |（收入、扣除、应纳税所得额、应纳税额、已预缴、应退 / 应补）

**五、时间安排**：办理时间与预约

End verbatim: *"以上为估算，不构成税务意见。请以个人所得税 App 的计算结果为准，税率与政策如有调整以最新规定为准。"*

## Quality Checks
- [ ] Every special additional deduction category was asked about
- [ ] Both bonus treatments were computed when there is a bonus
- [ ] The estimate's arithmetic is shown
- [ ] Rules that depend on dates are marked to check
- [ ] The disclaimer appears verbatim

## Anti-Patterns
- **Assuming separate bonus taxation is always cheaper.** Compute both.
- **Claiming deductions the person does not qualify for.** Claims are checked and can be reversed with penalties.
- **Ignoring unknown income entries** in the app.
- **Presenting the estimate as final.** The app's calculation is authoritative.

## Example Trigger Phrases
- "个税汇算我能退多少？年薪 36 万，有一个孩子，在上海租房。"
- "年终奖单独计税还是并入综合所得更划算？"
- "专项附加扣除我漏了哪些？"
- "Explain China's annual tax reconciliation for me."
