---
name: "Decode a Kenyan payslip line by line: gross pay, PAYE, the s"
description: "Decode a Kenyan payslip line by line: gross pay, PAYE, the social security contribution, the social health insurance contribution, the affordable housing levy, reliefs and other deductions, with a recalculation and the one-third rule check. Use when asked explain my payslip, why is my net salary so low, how is PAYE calculated in Kenya, check my NSSF and SHIF deductions, or nisaidie kuelewa payslip yangu. Produces a line-by-line explanation, a recalculation with working from rates the user confirms, discrepancies to raise with payroll, and what to keep for the annual return. Not tax advice."
---

# Kenyan Payslip Decoder

Statutory deductions on Kenyan salaries have changed repeatedly: social security contributions are rising in phases, the health fund was replaced, a housing levy was added, and the tax treatment of those deductions was amended. A payslip is therefore easy to mistrust and hard to check from memory. This skill explains each line and recalculates the main deductions from rates the user confirms for the pay period. It is not tax advice.

## What This Skill Produces

- A plain-language explanation of each line
- A recalculation of the statutory deductions and PAYE with working
- A check against the rule that deductions must leave a minimum share of basic pay
- A list of discrepancies to raise with payroll
- Records to keep for the annual return

## Required Inputs

Ask for these if not provided:

- The payslip: earnings and deductions with amounts
- Pay period (month and year)
- Basic pay, allowances and benefits in kind
- Pension scheme membership and whether the employer has contracted out of part of the social security contribution
- Mortgage interest, insurance premiums or post-retirement medical fund contributions claimed
- Voluntary deductions: loans, savings cooperative, union, welfare
- Whether the employee is a resident for tax

## Framework

1. **Gross pay.** Basic pay plus allowances plus taxable benefits.
2. **Social security contribution.** A percentage from the employee, matched by the employer, on pensionable earnings in two tiers with lower and upper earnings limits that step up each year under the phased schedule. Confirm the limits for the pay period.
3. **Social health insurance.** A percentage of gross pay with a minimum monthly amount, replacing the former banded health fund deduction.
4. **Affordable housing levy.** A percentage of gross pay from the employee, matched by the employer.
5. **Taxable pay.** Following the amendment that took effect at the end of 2024, the health contribution and the housing levy are deducted in arriving at taxable income, alongside allowable pension contributions up to the cap. Earlier periods used reliefs instead. Confirm which treatment applies to the pay period.
6. **PAYE.** Apply the monthly graduated bands to taxable pay, then subtract personal relief and any insurance relief. Ask the user to confirm the current bands and relief amounts from the revenue authority's published tables.
7. **Other deductions.** Loans, cooperative savings and similar do not reduce tax.
8. **One-third rule.** Total deductions should not leave the employee with less than one third of basic pay. Flag if breached.
9. **Net pay.** Check the arithmetic.
10. **Year end.** The employer issues the annual tax deduction card, used for the individual return due by mid-year. A nil or individual return is required even where PAYE is the only tax.

## Output Format

### Payslip decoded: [month and year]

**Rates applied:** as confirmed by [source], for [period].

| Line | Amount | What it is | Calculated on | Check |
|---|---|---|---|---|

**Recalculation**
| Item | Working | Expected | On payslip | Difference |
|---|---|---|---|---|
| Social security (tier one and two) | | | | |
| Social health insurance | | | | |
| Housing levy | | | | |
| Taxable pay | | | | |
| PAYE after reliefs | | | | |
| Net pay | | | | |

**One-third rule:** basic pay [x], one third [x], take-home [x]: [met / breached].

**Raise with payroll**
1. [discrepancy and question]

**Keep:** payslips, the annual tax deduction card, statements from the social security fund and the health authority, relief certificates.

**Assumptions and gaps**
- [Rates or limits pending confirmation]
- [Which tax treatment of statutory deductions was assumed]

*An explanation and estimate, not tax advice. Confirm current rates and limits with the revenue authority or a tax professional.*

## Quality Checks

- [ ] The pay period is identified and its rates confirmed or marked unconfirmed
- [ ] Each statutory deduction shows its base and working
- [ ] The tax treatment of health and housing deductions matches the period
- [ ] The one-third rule is checked
- [ ] Discrepancies are framed as questions

## Anti-Patterns

- **Do not use the old health fund bands** for current payslips.
- **Do not quote earnings limits from a previous year.**
- **Do not invent PAYE bands or relief amounts.**
- **Do not treat loan repayments as tax-reducing.**
- **Do not ignore a breach of the one-third rule.**

## Example Trigger Phrases

- "Explain my payslip. Gross is 120,000 and I take home 82,000."
- "Why did my NSSF deduction go up again in February?"
- "Is the housing levy calculated on basic or gross?"
- "Nisaidie kuelewa hizi deductions kwa payslip yangu."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/ke-payslip-decoder.html

<!-- pm-claude-skills v84.0.0 | skill: ke-payslip-decoder | source: skills/ke-payslip-decoder/SKILL.md | sha256: c804f4d63202a83aa4aa1f62da236ed01b30c416f4ac92237ba6d3793b2b4ef1 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
