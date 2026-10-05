---
name: pay-stub-decoder
description: "Decode a pay stub line by line — every deduction explained, the gross-to-net story, and the errors worth catching. Use when asked to explain my pay stub, why is my paycheck smaller than expected, what are all these deductions, or check my paycheck for mistakes. Produces a line-by-line decode, the gross-to-net waterfall, the error checklist (withholding, benefits, overtime), and the fixes to raise with payroll."
---

# Pay Stub Decoder Skill

Most people can't explain a third of the lines on their own pay stub — which is exactly how errors survive for years. This skill decodes every line, shows the gross-to-net waterfall, and runs the error checklist: wrong withholding status, benefit deductions that don't match elections, missing overtime, and the retirement match that quietly isn't there.

## What This Skill Produces

- **Line-by-line decode** — every earning, tax, and deduction in plain English
- **The waterfall** — gross → taxes → pre-tax deductions → post-tax → net, with percentages
- **The error checklist** — run against the user's stated situation, discrepancies flagged
- **Payroll fixes** — what to raise, with the wording

## Required Inputs

Ask for these only if not provided:
- **The stub** — lines and amounts (redact identifiers freely; the codes and numbers are what matter)
- **The expectations:** stated salary/rate, hours if hourly, benefit elections (retirement %, insurance tier), filing status
- **Jurisdiction** — tax lines and mandatory deductions vary by country/state; never guess
- **What prompted this** — "smaller than expected" gets a targeted diff, not just a tour

## Framework

1. **Codes to English:** payroll abbreviations (the cryptic 6-character kind) decoded by pattern and context; anything genuinely ambiguous gets flagged *ask payroll what this code means* rather than guessed.
2. **Pre-tax vs post-tax matters:** the waterfall shows *where* each deduction lands, because a pre-tax dollar costs less than a post-tax one — and misclassified deductions are a real error class.
3. **The five common errors:** withholding status not matching filing reality · benefit deduction ≠ elected amount · missing/mis-multiplied overtime · retirement contribution or employer match absent or mismatched · state/locality taxes for the wrong place (remote-work classic).
4. **Annualize the surprises:** a $38 mystery deduction is $988/year — every finding shows both numbers.
5. **Year-to-date is the audit trail:** YTD columns catch errors the single stub hides (a match that stopped in March shows here first).

## Output Format

### Pay Stub Decode: [period]

**The waterfall:** Gross $[n] → taxes −$[n] ([n]%) → pre-tax −$[n] → post-tax −$[n] → **Net $[n]** ([n]% of gross)

**Line decode** | Line/code | Plain English | Amount | /year | Check |
**⚠ Findings** — each: the line, expected vs actual, the annualized gap, likely cause
**For payroll:** [the message: specific lines, specific asks — payroll fixes line items, not feelings]
**Looks right:** [the lines verified clean — decoded confidence, not just alarms]

End verbatim: *"This is a plain-language reading, not tax or legal advice — payroll rules vary by jurisdiction; confirm anything load-bearing with payroll or a tax professional."*

## Quality Checks

- [ ] Every line is decoded or explicitly flagged ask-payroll — none skipped
- [ ] The waterfall reconciles to the stated net to the cent
- [ ] Findings show single-period and annualized amounts
- [ ] The error checklist ran against the user's stated elections
- [ ] Clean lines are affirmed, not just silent
- [ ] The disclaimer appears verbatim

## Anti-Patterns

- [ ] Do not guess ambiguous codes — a wrong decode plants a wrong grievance
- [ ] Do not treat all deductions as losses — the waterfall distinguishes taxes, savings, and benefits
- [ ] Do not skip YTD — the single stub hides what the year reveals
- [ ] Do not draft an angry payroll email — line numbers and expected-vs-actual get fixes; tone gets ticket queues
- [ ] Do not give tax advice — decode what IS withheld; what SHOULD be is a professional's call

## Example Trigger Phrases

- "Explain my pay stub."
- "Why is my paycheck smaller than expected?"
- "What are all these deductions?"
- "Check my paycheck for mistakes."
