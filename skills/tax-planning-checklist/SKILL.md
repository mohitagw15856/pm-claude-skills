---
name: tax-planning-checklist
description: "Generate a structured tax planning checklist and review framework for any individual or business context. Use when asked to review tax planning, prepare for year-end tax, check tax efficiency, or identify tax-saving opportunities. Produces a checklist of considerations, common reliefs, and a review framework. Not a substitute for qualified tax advice."
---

# Tax Planning Checklist Skill

Produces a structured tax planning review framework — identifying common reliefs, year-end planning opportunities, and potential gaps. Always recommend a qualified tax adviser for implementation.

WARNING: Tax law changes frequently and varies by jurisdiction. This checklist produces a framework for discussion, not tax advice. Always verify with a qualified accountant or tax adviser before taking action.

## Required Inputs

Ask the user for these if not provided:
- **Entity type** (individual / sole trader / limited company / partnership / trust)
- **Jurisdiction** (UK / US / EU / Other — defaults to UK if unspecified)
- **Approximate income or revenue** (to identify relevant thresholds)
- **Key concerns** (optional — e.g. capital gains, pension, inheritance, R&D credits)
- **Time horizon** (year-end planning / ongoing / specific event like sale or exit)

## Output Structure

---

# Tax Planning Checklist — [Entity Type] — [Tax Year / Period]

**Jurisdiction:** [UK / US / Other]
**Entity type:** [Individual / Limited company / etc.]
**Key thresholds to note:** [List relevant tax-year thresholds — e.g. personal allowance, basic rate band, VAT threshold]

---

## Section 1: Income and Allowances

- [ ] Personal allowance fully utilised? (UK: £12,570 — check if taper applies above £100k income)
- [ ] Dividend allowance used where relevant? (UK: £500 2024/25)
- [ ] Savings interest allowance reviewed?
- [ ] Salary/dividend split optimised for owner-managed companies?
- [ ] Any income timing opportunities before year-end?
- [ ] Spouse or partner allowances — any transfer or use opportunities?

---

## Section 2: Pension and Retirement

- [ ] Annual pension allowance assessed? (UK: £60,000 or 100% of earnings, whichever lower)
- [ ] Carry forward of unused annual allowances from prior 3 years checked?
- [ ] Company pension contributions reviewed (corporation tax deductible)?
- [ ] Salary sacrifice arrangements in place or reviewed?
- [ ] Lifetime allowance implications assessed? (UK: abolished April 2024 — but transitional protections still relevant for some)

---

## Section 3: Capital Gains Tax

- [ ] Annual CGT exempt amount used? (UK: £3,000 for 2024/25)
- [ ] Crystallising gains before year-end to use exemption?
- [ ] Loss harvesting opportunities reviewed?
- [ ] Business Asset Disposal Relief (BADR) eligibility checked for business sales?
- [ ] EIS / SEIS investments reviewed for CGT deferral?
- [ ] Bed-and-ISA / bed-and-SIPP opportunities assessed?

---

## Section 4: Business Reliefs (UK Limited Companies)

- [ ] R&D tax credit eligibility reviewed? (SME scheme vs RDEC depending on size)
- [ ] Capital allowances claimed on qualifying expenditure?
- [ ] Annual Investment Allowance (AIA) utilised? (UK: £1m)
- [ ] Patent Box relief explored for IP-derived profits?
- [ ] Employment Allowance claimed?
- [ ] Entrepreneurs' Relief / BADR reviewed for shareholding structure?
- [ ] Loss reliefs utilised or carried forward optimally?

---

## Section 5: VAT

- [ ] VAT registration threshold monitored? (UK: £90,000 rolling 12 months)
- [ ] Flat rate scheme vs standard accounting reviewed?
- [ ] Partial exemption position reviewed if relevant?
- [ ] VAT on property or mixed-use assets checked?

---

## Section 6: Inheritance Tax and Estate Planning

- [ ] Annual gifting allowances used? (UK: £3,000 per person per year)
- [ ] Business property relief and agricultural property relief eligibility?
- [ ] Trust structures reviewed for IHT efficiency?
- [ ] Life insurance written in trust to prevent estate inclusion?
- [ ] Nil rate band and residence nil rate band utilised optimally?

---

## Section 7: ISAs and Tax-Efficient Wrappers

- [ ] ISA allowance fully subscribed? (UK: £20,000 per person 2024/25)
- [ ] Junior ISAs for children considered?
- [ ] Venture Capital Trusts (VCT) or EIS investments considered for income tax relief?
- [ ] Lifetime ISA (LISA) reviewed for eligible individuals?

---

## Year-End Action Summary

Based on the above, prioritise these before year-end:

| Action | Potential saving | Deadline | Adviser needed? |
|---|---|---|---|
| [Action] | [£ estimate or "significant"] | [Date] | Yes / No |

---

## Quality Checks

- [ ] Jurisdiction confirmed before applying any thresholds or rules
- [ ] Year-end deadlines identified for time-sensitive opportunities
- [ ] High-impact items prioritised (not just a long undifferentiated list)
- [ ] Disclaimer is prominent — this is a framework, not tax advice
- [ ] Threshold figures are flagged as requiring verification for current tax year

## Example Trigger Phrases

- "Give me a tax planning checklist for [year-end / my situation]"
- "What tax reliefs should I consider as a [sole trader / limited company / individual]?"
- "Review my tax efficiency before the end of the tax year"
- "What should I check for my year-end tax planning?"
