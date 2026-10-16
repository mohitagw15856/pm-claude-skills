---
name: jp-year-end-adjustment
description: "Use when asked 年末調整の書き方, how do I fill in my nenmatsu chōsei forms, which deductions can I claim at year-end in Japan, 扶養控除等申告書の書き方, 保険料控除申告書, or do I need to file a tax return instead. Produces which forms the person must submit to their employer, line-by-line guidance for their situation, the deductions they can claim through year-end adjustment, what must go to a tax return instead, and a checklist of certificates to gather."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/jp-year-end-adjustment.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Japan Year-End Tax Adjustment (年末調整)

In Japan the employer settles most employees' income tax for the year through 年末調整, using forms the employee fills in each autumn. The forms are dense, and mistakes mean overpaid tax or a correction later. Some deductions cannot be claimed this way at all and need a 確定申告. This skill tells the person which forms apply, how to fill them in for their situation, and what to do separately.

Write in Japanese unless the person asks for English or Chinese. Forms, deduction amounts and deadlines are set by the National Tax Agency (国税庁) and change; mark every figure to confirm on nta.go.jp or with the employer's instructions. This is information, not tax advice; for complex cases suggest a 税理士.

## Required Inputs

Ask for these if not provided:
- **Employment**: one employer or several, annual salary estimate, main employer for tax (甲欄)
- **Family**: spouse and their income, dependants and their ages and income, anyone with a disability
- **Insurance and pensions paid this year**: life, medical, nursing care, earthquake insurance, national pension or iDeCo (小規模企業共済等掛金)
- **Housing loan**: first year or later year of the housing loan deduction
- **Other**: medical expenses, ふるさと納税, side income, mid-year job change

## Output Structure

### 1. Which forms you submit
| Form | Who needs it | What it is for |
給与所得者の扶養控除等（異動）申告書, 基礎控除申告書兼配偶者控除等申告書兼所得金額調整控除申告書, 保険料控除申告書, and 住宅借入金等特別控除申告書 from the second year of a housing loan (confirm current form names and whether the employer uses an online system).

### 2. Filling them in for your situation
Section by section for the person's facts: who counts as a dependant or for the spouse deduction given their income (confirm current income limits), and which certificate supports each insurance line.

### 3. What year-end adjustment cannot do
Deductions that need a 確定申告 instead: medical expenses, the first year of the housing loan deduction, ふるさと納税 beyond the one-stop limit, donations, and cases where year-end adjustment does not apply (for example very high salaries or side income above the threshold; confirm).

### 4. Certificate checklist
| Certificate | From whom | When it usually arrives |

### 5. After submission
How the result shows on the December or January payslip and the 源泉徴収票, and how to correct a mistake (ask the employer before 31 January, or file a return later).

## Quality Checks

- [ ] Every form name, income limit and deadline is marked to confirm with the NTA or the employer
- [ ] Dependant and spouse decisions use the family members' own incomes
- [ ] Each insurance or pension line is tied to a certificate
- [ ] Items that need a 確定申告 are listed separately
- [ ] The output says it is information, not tax advice

## Anti-Patterns

- **Listing a dependant whose income is too high.** It causes a back-tax bill later.
- **Expecting medical expenses to be handled by the employer.** They need a tax return.
- **Throwing away the 源泉徴収票.** It is needed for a return, loans and visa renewals.
- **Guessing deduction amounts.** Use the figures on the certificates.

## Example Trigger Phrases

- "年末調整の書類、何をどう書けばいいか教えて。妻はパートで年収100万円です。"
- "iDeCoと生命保険は年末調整でどう書く？"
- "How do I fill in my year-end adjustment forms in Japan? I have two kids."
- "我在日本上班，年末调整要交哪些表？"
