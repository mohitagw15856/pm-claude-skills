---
name: cn-year-end-bonus
description: "Use when asked 年终奖怎么算, 13薪和年终奖有什么区别, 年终奖怎么交税, 单独计税还是并入综合所得, 年终奖被扣了怎么办, 离职了年终奖还发吗, 怎么问 HR 年终奖, or understand a year-end bonus in mainland China. Produces how the person's bonus is likely calculated from their documents, the 13薪 versus discretionary bonus distinction, the tax options with a worked comparison marked to confirm, questions to ask HR or the manager in writing, and the steps if a bonus is withheld after resignation, all marked to confirm against current rules. Not tax or legal advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-year-end-bonus.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Year-End Bonus Clarifier (年终奖、13薪与个税)

The year-end bonus is often a large share of annual pay in China, and the least understood. People do not know whether it is contractual or discretionary, how the coefficient was applied, which tax method is cheaper, or whether leaving before the payout date means losing it. This skill reads the person's documents, explains how the bonus is most likely calculated, compares the tax options, and prepares the questions to ask HR.

Write in Simplified Chinese unless asked otherwise. Bonus rules depend on the contract, the company's bonus policy and the 员工手册; tax rules and court practice change. Every rule below is marked 需核实: confirm with HR or the local tax office (or the 个人所得税 App) before acting. This is information, not tax or legal advice; for a dispute, consult a labour lawyer or the local 劳动仲裁委员会.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Documents**: the labour contract, the offer letter, the bonus or performance policy, the 员工手册 sections on bonus
- **Pay**: monthly base salary, any 13薪 or 14薪 clause, last year's bonus
- **Performance**: the rating received and the scale, and any coefficient the company announced
- **Dates**: joining date, the bonus period, the expected payout date, and a resignation or termination date if relevant
- **Annual income** for the tax comparison: other comprehensive income, special deductions and additional deductions (专项附加扣除)
- **The question**: how it is calculated, tax, a lower amount than expected, or withheld after leaving

## Output Structure

### 1. 你的年终奖是哪一种 (what kind of bonus this is)
| 类型 | 依据 | 含义 |
- **13薪 / 14薪 written into the contract**: usually a fixed amount, closer to wages; pro-rating on joining or leaving depends on the wording
- **绩效年终奖 under a policy**: base × months × company coefficient × individual coefficient, or a pool shared by rating
- **Fully discretionary bonus**: the company decides; the policy and past practice still matter
State which one the documents support, quoting the clause, and what is unclear.

### 2. 估算 (estimate)
A worked calculation from the person's numbers, for example 月薪 20,000 × 2 个月 × 公司系数 0.9 × 个人系数 1.2 = 43,200, with each input's source and the pro-rating for a part year. Mark every assumed figure.

### 3. 个税 (tax options, 需核实)
- **单独计税 (separate taxation)** for 全年一次性奖金: the bonus divided by 12 sets the rate from the monthly table, then tax = bonus × rate − quick deduction. This option was extended to 31 December 2027 by 财政部 税务总局公告 2023 年第 30 号 (confirm it is still in force).
- **并入综合所得 (combined with annual income)**: chosen in the annual reconciliation (年度汇算) if cheaper.
- **The threshold trap (年终奖临界点)**: under separate taxation, a bonus just above 36,000, 144,000, 300,000, 420,000, 660,000 or 960,000 can leave the person with less after tax than a slightly smaller bonus. Show the comparison for the person's figure.
| 方案 | 应纳税额 | 税后 |
Recommend checking both options in the 个人所得税 App during 年度汇算; do not state a final figure as certain.

### 4. 问 HR / 上级的问题 (questions to ask, in writing)
- 我的年终奖依据哪份制度？能否提供书面版本？
- 公司系数和个人系数分别是多少？我的绩效等级对应多少？
- 发放时间是哪天？分期发放吗？
- 入职或离职不满一年如何折算？
- 采用单独计税还是并入综合所得？
A short polite message the person can send, plus a script for the conversation with the manager about a lower than expected result.

### 5. 离职后年终奖被扣 (withheld after resignation, 需核实)
- What the contract and policy say about "发放日在职" conditions, and whether the policy was adopted and made known to employees
- Court practice: 最高人民法院指导性案例 183 号 (2022) held that where the employee worked the bonus year and the contract ended for reasons not attributable to the employee, refusing the bonus only because they left before the payout date was not supported. Outcomes depend on facts and local practice; confirm with a lawyer.
- Steps: collect the evidence (contract, policy, payslips, past bonus records, performance result, messages); ask HR in writing; consider 劳动仲裁, noting the one-year limitation period (仲裁时效) from when the person knew or should have known (confirm)
- Where severance is also in question, see `cn-severance-calculator`.

## Programmatic Helper

```bash
python3 skills/cn-year-end-bonus/scripts/bonus_tax.py --bonus 100000 --other-taxable 150000
python3 skills/cn-year-end-bonus/scripts/bonus_tax.py --traps
```

Compares separate taxation with combining, using only the person's figures, and lists the threshold-trap ranges. Standard library only.

## Quality Checks

- [ ] The bonus type is tied to a quoted clause, or marked as unclear
- [ ] Every rate, threshold, date and case reference is marked 需核实
- [ ] The tax comparison uses the person's figures and shows both options
- [ ] No figure is presented as guaranteed; assumptions are labelled
- [ ] The output says it is not tax or legal advice and names where to confirm
- [ ] Questions to HR are written, polite and specific

## Anti-Patterns

- **Treating every bonus as guaranteed.** A discretionary bonus and a contractual 13薪 are different claims.
- **Quoting tax figures without the person's other income.** The cheaper option depends on the whole year.
- **Arguing verbally.** Ask in writing so there is a record.
- **Resigning just before payout without reading the policy.** Check the dates and conditions first.
- **Threatening arbitration in the first message.** Ask and document first; escalate if needed.

## Example Trigger Phrases

- "我月薪 2 万，绩效 B+，公司说系数 0.9，年终奖大概多少？怎么交税？"
- "合同写了 13 薪，我 10 月离职，第 13 个月工资还能拿吗？"
- "年终奖 3.7 万和 3.6 万哪个税后更多？"
- "12 月干满了，1 月离职，公司说发放日不在职不发年终奖，合法吗？"
- "Explain how my year-end bonus in China is taxed."
