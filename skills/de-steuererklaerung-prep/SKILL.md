---
name: de-steuererklaerung-prep
description: "Prepare an employee's annual income tax return in Germany: whether filing is required or worthwhile, which forms apply, the documents to gather, the deductions commonly missed, and a walkthrough for the official online portal. Use when asked wie mache ich meine Steuererklärung, do I have to file a tax return in Germany, what can I deduct as an employee, Werbungskosten checklist, or help me prepare my ELSTER return. Produces a filing verdict, a form list, a document checklist, a deductions worksheet with the evidence for each, deadlines, and questions for a tax adviser. Preparation help, not tax advice."
version: 1.0.0
---

# Steuererklärung Prep (Germany)

Many employees in Germany are not obliged to file and still receive a refund when they do, because wage tax is withheld on standard assumptions. The work is in knowing which annex each item belongs in and keeping the evidence. This skill prepares the return; it does not file it, and every amount and deadline below must be checked against the current year's rules.

## What This Skill Produces

- A verdict: filing required, voluntary but likely worthwhile, or probably not worthwhile
- The forms and annexes that apply
- A document checklist
- A deductions worksheet by category with what counts and the evidence to keep
- The deadline, and how it changes with an adviser or for voluntary filing
- Questions to take to a tax adviser or a wage-tax assistance association

## Required Inputs

Ask for these if not provided:

- Tax year, and tax residence during it
- Employment: number of employers, tax class, wage replacement benefits received (parental, short-time work, unemployment or sickness benefit)
- Marital status and whether assessed jointly
- Children and childcare costs
- Commute: distance, days travelled, days worked from home
- Work-related spending: equipment, training, professional books, union dues, job applications, relocation, double household
- Insurance and pension contributions beyond payroll
- Other income: rental, capital, self-employment, foreign
- Donations, medical costs, household services and tradesperson invoices

## Framework

1. **Must you file?** Typical triggers: wage replacement benefits above a threshold, certain tax class combinations for couples, more than one employer at once, additional untaxed income above a threshold, or a request from the tax office. Otherwise filing is voluntary and can be done for several years back.
2. **Forms.** Main form (Hauptvordruck); Anlage N for employment income; Anlage Vorsorgeaufwand for insurance; Anlage Kind for each child; Anlage Sonderausgaben; Anlage Außergewöhnliche Belastungen; Anlage Haushaltsnahe Aufwendungen; Anlage KAP only where capital income needs declaring; Anlage V for rental; Anlage S or G with a profit statement for self-employment.
3. **Income-related expenses (Werbungskosten).** A flat allowance is applied automatically. Itemise only if the total is higher: commuting allowance per kilometre of one-way distance and day, home-office day rate with an annual cap, work equipment, training for the current profession, professional memberships, application costs, work-related relocation, double household.
4. **Special expenses (Sonderausgaben).** Pension and health insurance contributions, church tax, donations, part of childcare costs.
5. **Extraordinary burdens.** Medical and care costs above a personal threshold based on income and family status.
6. **Tax reductions.** A percentage of household services and of the labour part of tradesperson invoices, each up to a cap, paid by bank transfer with an invoice.
7. **Evidence.** Receipts are kept, not sent, unless the office asks. Keep them for the period the user's adviser recommends.
8. **Deadline.** A fixed date in the year after the tax year for those required to file, later with an adviser. Voluntary returns have a multi-year window.
9. **Check the assessment.** The objection period after the assessment notice is one month.

## Output Format

### Tax return prep: [tax year]

**Verdict:** [required / voluntary, likely worthwhile / probably not worthwhile] because [reason].
**Deadline:** [date to verify].

**Forms**
| Form | Why you need it |
|---|---|

**Documents**
- [ ] Annual wage tax statement (Lohnsteuerbescheinigung) from each employer
- [ ] Tax ID and bank details
- [ ] Statements for wage replacement benefits
- [ ] Insurance and pension contribution statements
- [ ] Childcare invoices and proof of payment
- [ ] Donation receipts
- [ ] Invoices for household services and tradespeople, with bank proof

**Deductions worksheet**
| Category | Item | Amount (yours) | Rule to verify | Evidence |
|---|---|---|---|---|

**Itemise or take the flat allowance?** [comparison]

**Walkthrough for the online portal:** [ordered steps: register, pre-filled data retrieval, forms in order, plausibility check, submit, save the transmission record]

**Ask an adviser about:** [list]

**Assumptions and gaps**
- [Figures assumed]
- [The item with the largest effect that still needs evidence]

*Preparation help, not tax advice. Rates, allowances, thresholds and deadlines change each year; verify on the official portal or with a tax adviser.*

## Quality Checks

- [ ] The filing verdict states the trigger or the reason it is voluntary
- [ ] Each form is tied to a fact about the user
- [ ] The worksheet compares itemised expenses with the flat allowance
- [ ] No rate, cap or deadline is stated as certain
- [ ] Household and tradesperson items note the bank-transfer requirement
- [ ] The objection period is mentioned

## Anti-Patterns

- **Do not quote allowances and rates from memory as current.**
- **Do not suggest claiming costs without evidence.**
- **Do not count commuting distance as a round trip.** It is the one-way distance.
- **Do not claim home-office and commuting for the same day** without checking the current rule.
- **Do not handle complex cases** (foreign income, self-employment, property sales) without referring to an adviser.

## Example Trigger Phrases

- "Muss ich eine Steuererklärung abgeben? Ich war drei Monate in Elternzeit."
- "What can I deduct as an employee who works from home three days a week?"
- "Make a checklist of documents for my German tax return."
- "Is it worth filing voluntarily for the last three years?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/de-steuererklaerung-prep.html
