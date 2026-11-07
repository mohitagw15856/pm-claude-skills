---
name: in-income-tax-regime-chooser
description: "Compare India's old and new income tax regimes for a salaried or freelance taxpayer from their own figures: which deductions and exemptions are lost under the new regime, a side-by-side tax computation, the break-even deduction level, when the choice can be switched, and what to confirm against the current Finance Act. Use when asked old vs new tax regime which is better for me, kaunsa regime choose karun, should I keep 80C investments, or to check the regime an employer defaulted me into. Produces the comparison table, a recommendation with its condition, and a confirmation checklist."
version: 1.0.0
---

# Income Tax Regime Chooser (India)

The new regime is the default, so many people are in it without ever comparing. Whether it wins depends on one number: how much the person actually claims in deductions and exemptions under the old regime. This skill computes both regimes from the user's figures, finds the break-even point, and says which is better and under what condition. It is preparation, not tax advice; slabs, standard deduction and rebate limits change with each Finance Act and must be verified.

## What This Skill Produces

- A side-by-side computation of taxable income and tax under both regimes, with cess
- The break-even deduction level above which the old regime wins
- A list of what the person loses by choosing the new regime (HRA, LTA, 80C, 80D, home loan interest on a self-occupied house, and others)
- The switching rules for salaried versus business income, and the form and timing involved
- A checklist of figures to confirm against the current Finance Act and Form 16

## Required Inputs

Ask for (if not already provided), else infer and label as an assumption:
- Income type: salaried, freelance or business, or both
- Gross salary with the HRA component and rent paid, or gross receipts and expenses for business income
- Deductions the person actually claims or could claim: 80C instruments, 80D premiums, home loan interest and principal, NPS employer and own contributions, education loan interest, donations
- Age band (senior citizen slabs differ under the old regime)
- Assessment year, so the correct slabs are used
- Whether the employer has already deducted TDS under a chosen regime

## Framework: How to Compare

1. **Start from the same gross.** Both computations begin from the same gross income. Standard deduction applies in both, at the amounts notified for the year (verify).
2. **Old regime deductions.** HRA exemption (least of the three limbs), LTA, professional tax, 80C up to its cap, 80CCD(1B) NPS, 80D health premiums by age, 24(b) home loan interest up to the self-occupied cap, 80E, 80G, 80TTA or 80TTB. Use only what the person can evidence.
3. **New regime.** Most of the above fall away. Employer NPS contribution under 80CCD(2) and the standard deduction remain; a few others survive (verify the current list). Slabs are wider and the rebate threshold is higher.
4. **Compute both.** Apply the slabs for the assessment year, the rebate under section 87A where income is within the limit, surcharge if applicable, and 4 percent cess. Show the arithmetic.
5. **Break-even.** Solve for the deduction total at which the two tax figures are equal. Below it, the new regime wins; above it, the old one does. Express it as a rupee figure the person can compare with their own claims.
6. **Switching rules.** Salaried taxpayers can choose each year at return filing, regardless of what the employer used for TDS. Taxpayers with business or professional income who opt out of the new regime can switch back only once; the choice is made on the prescribed form before the return due date. State this and tell the person to verify the form number and date.
7. **Practical traps.** Employer defaulted the person into the new regime without asking; rent paid but no rent receipts or landlord PAN; home loan on a let-out property, which is treated differently; investments made only for 80C that now earn poor returns.

## Output Format

### Regime comparison for [name or "you"], AY [year]

| Line | Old regime | New regime |
|---|---|---|
| Gross income | [amount] | [amount] |
| Standard deduction | [amount, verify] | [amount, verify] |
| HRA / LTA / professional tax | [amount] | not available |
| 80C, 80CCD(1B), 80D, 24(b), others | [amount] | not available (except [list]) |
| Taxable income | [amount] | [amount] |
| Tax by slabs | [amount] | [amount] |
| Rebate 87A | [amount] | [amount] |
| Surcharge and cess | [amount] | [amount] |
| **Total tax** | **[amount]** | **[amount]** |

**Difference:** [amount] in favour of the [old / new] regime (illustrative; recompute with the slabs in force).

**Break-even:** the old regime wins once your total deductions and exemptions exceed about [amount]. You currently claim about [amount].

**What you give up under the new regime:** [list the specific items with their current values].

**Switching:** [salaried: choose at filing each year / business income: one-time switch back, on the prescribed form before the due date, verify].

**Confirm before filing:**
- [ ] Slabs, standard deduction and rebate limit for AY [year] from the current Finance Act
- [ ] HRA figures against rent receipts and, where required, the landlord's PAN
- [ ] Form 16 shows the regime the employer used; TDS can be reconciled at filing
- [ ] 80C and 80D proofs exist for the amounts claimed

*Prepared from the figures given. Confirm with the income tax portal's calculator or a chartered accountant before choosing, especially if you have business income.*

## Quality Checks

- [ ] Both regimes are computed from the same gross with the arithmetic shown line by line
- [ ] The break-even deduction figure is stated and compared with what the person actually claims
- [ ] Every slab, cap and limit is marked as needing verification for the assessment year
- [ ] The switching rule distinguishes salaried from business income
- [ ] The recommendation is conditional and the output ends with the preparation-not-advice line

## Anti-Patterns

- **Comparing on gross alone.** The whole decision lives in the deductions.
- **Using last year's slabs without saying so.** Always name the assessment year and flag the figures.
- **Counting deductions the person cannot evidence.** No rent receipts, no HRA.
- **Telling a business-income taxpayer they can flip every year.** They cannot.
- **Declaring a winner without the condition.** State the break-even.

## Example Trigger Phrases

- "Salary 14 lakh, HRA 2.4 lakh, rent 25,000 a month, 80C full. Old or new regime?"
- "Kaunsa tax regime choose karun, mere paas home loan bhi hai?"
- "My company put me on the new regime by default. Can I change it when I file?"
- "At what level of deductions does the old regime become better?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/in-income-tax-regime-chooser.html
