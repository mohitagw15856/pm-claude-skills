---
name: jp-tax-return
description: "Use when asked 確定申告のやり方, do I need to file a tax return in Japan, how do I claim medical expense deduction, ふるさと納税の確定申告, 副業の確定申告, how to file with e-Tax, or 日本报税怎么弄. Produces whether the person must or should file, the income and deductions to declare, a step-by-step filing plan with e-Tax or on paper, the documents to gather, and the deadlines and payment options to confirm with the National Tax Agency."
version: 1.0.0
---

# Japan Tax Return (確定申告)

Most employees in Japan never file a return because their employer settles tax through year-end adjustment. But anyone with side income, freelance work, two employers, large medical bills, a new housing loan or ふるさと納税 beyond the one-stop limit may have to, or would get money back by doing so. This skill decides whether the person needs to file, and walks them through it.

Write in Japanese unless the person asks for English or Chinese. Thresholds, forms and the filing period are set by the National Tax Agency (国税庁) and change; mark every figure to confirm on nta.go.jp. This is information, not tax advice; for business accounts, blue returns or inheritance, suggest a 税理士.

## Required Inputs

Ask for these if not provided:
- **Income**: salary (from the 源泉徴収票), side or freelance income and expenses, pensions, investment income outside NISA, rent
- **Employers**: how many, and whether year-end adjustment was done
- **Deductions to claim**: medical expenses, ふるさと納税, housing loan (first year), donations, insurance not claimed at work
- **Tools**: マイナンバーカード and a smartphone or card reader for e-Tax, or paper
- **Last year**: whether they filed, and as blue (青色) or white (白色) for business income

## Output Structure

### 1. Do you need to file?
| Situation | Must file / should file / no need | Why (confirm thresholds) |
Including the side-income threshold for employees, two employers, and refunds worth claiming. Note that 住民税 reporting may still be needed when a national return is not.

### 2. What to declare
Income by type with the amounts the person gave, deductible expenses for side income, and each deduction with its rule (for example the medical expense threshold, and that the ふるさと納税 one-stop exception is cancelled once a return is filed, so every donation must be declared).

### 3. Filing step by step
With e-Tax (マイナポータル連携 where it helps) or the NTA's online form, or on paper; the order of screens or sections, and what to keep.

### 4. Documents checklist
| Document | For | Where it comes from |

### 5. Deadlines and payment
The filing period (typically mid-February to mid-March; confirm the dates for the year), refund timing, payment methods and the transfer-tax option, and what happens if the deadline is missed.

## Quality Checks

- [ ] The need to file is decided from the person's facts before any steps are given
- [ ] Every threshold, date and form is marked to confirm with the NTA
- [ ] The ふるさと納税 one-stop cancellation is stated whenever a return is filed
- [ ] Side-income expenses are separated from personal spending
- [ ] The output says it is information, not tax advice

## Anti-Patterns

- **Assuming an employee never needs to file.** Side income, two jobs and refunds change that.
- **Filing and forgetting the one-stop donations.** They must all go on the return.
- **Claiming personal costs as business expenses.** It invites a correction with penalties.
- **Missing the deadline for a refund-only return.** Refund claims have their own time limit; confirm it.

## Example Trigger Phrases

- "副業で年30万円くらい稼いだ。確定申告は必要？"
- "医療費が15万円かかった。医療費控除のやり方を教えて。"
- "How do I file my Japanese tax return with e-Tax? I'm a freelancer."
- "在日本做副业要报税吗？怎么用 e-Tax？"
