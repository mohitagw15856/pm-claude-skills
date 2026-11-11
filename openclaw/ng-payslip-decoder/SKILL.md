---
name: ng-payslip-decoder
description: "Decode a Nigerian payslip line by line: gross pay and its components, PAYE income tax, pension, National Housing Fund, health insurance and other deductions, and whether net pay adds up, with a note on the tax law changes that took effect in 2026. Use when asked explain my payslip, why is my PAYE so high, how is tax calculated on my salary in Nigeria, check my pension deduction, or abeg break down my salary. Produces a line-by-line explanation, a recalculation of the main deductions from the rules the user confirms, a list of discrepancies to raise with payroll, and what to keep for the annual tax record. Not tax advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ng-payslip-decoder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Nigerian Payslip Decoder

A Nigerian payslip splits salary into basic, housing, transport and other allowances because several deductions are calculated on some components and not others. That split, and the reliefs applied before tax, decide the net figure. Nigeria's personal income tax rules changed with new tax legislation effective from 2026, so a payslip from this year should not be checked against older formulas. This skill explains each line and recalculates the main deductions from rules the user confirms. It is not tax advice.

## What This Skill Produces

- A plain-language explanation of every line on the payslip
- A recalculation of pension, housing fund and PAYE with the working shown
- A list of discrepancies to raise with payroll
- A note on which rules apply to the pay period
- Records to keep for the year

## Required Inputs

Ask for these if not provided:

- The payslip: each earnings line and each deduction line with amounts
- Pay period (month and year), since the tax rules differ before and after 2026
- Annual gross pay and whether a 13th month or bonus is paid
- State of residence, since PAYE is paid to the state tax authority
- Annual rent paid, if relief on rent is claimed
- Other deductions: loans, cooperative, union dues, health scheme
- Whether the employee has a pension account and a tax identification number

## Framework

1. **Earnings.** Basic, housing, transport, utility, meal, leave allowance, 13th month, overtime, bonus. Note which the employer treats as monthly emoluments for pension.
2. **Pension.** Under the contributory scheme the employee contributes a minimum of 8 percent and the employer 10 percent of monthly emoluments, commonly basic plus housing plus transport. The employee's share is deducted before tax. Verify the base your employer uses.
3. **National Housing Fund.** 2.5 percent of basic salary where it applies. Check whether the employer deducts it.
4. **Health insurance.** Contributions under the health insurance scheme or a private plan, where applicable.
5. **PAYE.**
   - **Pay periods before 2026:** a consolidated relief allowance (a fixed amount or 1 percent of gross, whichever is higher, plus 20 percent of gross) was deducted, then graduated bands applied.
   - **Pay periods from 2026:** the new tax law replaced that relief with a tax-free first band and a relief on rent paid, and changed the bands and rates. Ask the user to confirm the current bands from the state tax authority, the federal revenue service or their payroll office, then apply them.
   - Tax-exempt deductions (pension, housing fund, health insurance, life assurance) reduce taxable income.
6. **Other deductions.** Loans, salary advances, cooperative, union dues. These do not reduce tax.
7. **Net pay.** Gross minus all deductions. Check the arithmetic.
8. **Employer-side items** not on the payslip: employer pension, the social insurance trust fund and the industrial training fund.
9. **Year end.** The employee is entitled to evidence of tax paid and should confirm remittance of tax and pension.

## Output Format

### Payslip decoded: [month and year]

**Rules applied:** [pre-2026 / 2026 onwards], bands as confirmed by [source the user gave].

| Line | Amount | What it is | Calculated on | Check |
|---|---|---|---|---|

**Recalculation**
| Item | Working | Expected | On payslip | Difference |
|---|---|---|---|---|
| Pension (employee) | | | | |
| National Housing Fund | | | | |
| Taxable income (monthly) | | | | |
| PAYE | | | | |
| Net pay | | | | |

**Raise with payroll**
1. [discrepancy and the question to ask]

**Keep:** payslips, pension account statements, evidence of tax remitted, rent receipts if relief is claimed.

**Assumptions and gaps**
- [Bands or bases assumed pending confirmation]
- [What the pension statement would confirm]

*An explanation and estimate, not tax advice. Confirm current bands, reliefs and rates with your state tax authority or a tax professional.*

## Quality Checks

- [ ] The pay period is identified and the right rule set is used
- [ ] PAYE bands come from the user or are marked unconfirmed
- [ ] Pension is checked against the stated base
- [ ] Every deduction is classified as tax-reducing or not
- [ ] Net pay arithmetic is verified
- [ ] Discrepancies are phrased as questions for payroll

## Anti-Patterns

- **Do not apply the old consolidated relief allowance to 2026 payslips.**
- **Do not invent tax bands.** Ask for them or mark the result unconfirmed.
- **Do not assume pension is on gross pay.**
- **Do not accuse payroll of error** from a small rounding difference.
- **Do not ignore non-remittance.** Suggest checking the pension account statement.

## Example Trigger Phrases

- "Explain every line on my payslip. I earn 450k a month in Lagos."
- "Why did my PAYE change in January?"
- "Is my pension deduction right? Basic 150k, housing 75k, transport 50k."
- "Abeg, break down how they arrived at this net pay."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/ng-payslip-decoder.html

<!-- pm-claude-skills v84.0.0 | skill: ng-payslip-decoder | source: skills/ng-payslip-decoder/SKILL.md | sha256: e523cab13e6a17d136f61e0866c4eb20019dcbb7adc034b75ef2123d493dd162 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
