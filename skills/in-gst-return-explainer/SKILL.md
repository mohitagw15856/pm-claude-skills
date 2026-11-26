---
name: in-gst-return-explainer
description: "Explain which GST returns an Indian business must file and when: GSTR-1, GSTR-3B, the annual GSTR-9, the composition scheme's CMP-08 and GSTR-4, and the QRMP quarterly option, with what goes in each, how late fees and interest work, and a filing calendar for the user's registration type. Use when asked which GST returns do I need to file, GSTR-1 vs GSTR-3B, what is QRMP, GST return due dates for a small business, or to build a GST compliance calendar. Produces the return map, a month-by-month calendar and a pre-filing checklist."
version: 1.0.0
---

# GST Return Explainer (India)

Most GST penalties for small businesses come from not knowing which return applies, not from tax evasion. A regular taxpayer, a composition dealer and a QRMP filer each have a different set of forms and dates. This skill maps the returns to the user's registration, builds a calendar, and lists what to reconcile before filing. It is preparation, not professional tax advice.

## What This Skill Produces

- The return map: which forms apply to this registration, what each contains, and which are auto-populated
- A twelve-month filing calendar with the due dates in force, marked for verification against the current GST Council notification
- The late fee and interest mechanics, so a missed date can be costed
- A pre-filing reconciliation checklist (GSTR-2B against purchase register, e-invoices against GSTR-1)

## Required Inputs

Ask for (if not already provided), else infer and label as an assumption:
- Registration type: regular, composition, or regular under QRMP
- Annual aggregate turnover band (the QRMP and composition thresholds depend on it)
- State of registration and whether there are multiple GSTINs
- Nature of supplies: goods, services, exports, e-commerce sales, reverse charge purchases
- Whether e-invoicing applies (turnover threshold, verify the current limit)
- Current filing status: up to date, or months pending

## Framework: Which Returns Apply

1. **Regular taxpayer, monthly.** GSTR-1 (outward supplies, invoice-level) by the 11th of the following month; GSTR-3B (summary, tax payment, input tax credit) by the 20th. GSTR-2B is the auto-drafted ITC statement to reconcile against before 3B.
2. **Regular taxpayer under QRMP.** Available below the turnover threshold (verify the current limit). GSTR-1 and GSTR-3B become quarterly; tax is still paid monthly through PMT-06 by the 25th, using the fixed-sum or self-assessment method. The Invoice Furnishing Facility lets a filer push B2B invoices monthly so buyers get credit on time.
3. **Composition scheme.** Quarterly payment on CMP-08 by the 18th after the quarter; annual return GSTR-4 by the 30th of April (verify, the date has moved by notification). No input tax credit, no tax collected on invoices, bill of supply instead of tax invoice.
4. **Annual.** GSTR-9 for regular taxpayers above the exemption threshold, with GSTR-9C reconciliation above the higher threshold. Composition dealers file GSTR-4 instead. Verify both thresholds for the financial year.
5. **Special cases.** GSTR-7 for TDS deductors, GSTR-8 for e-commerce operators, ITC-04 for job work, GSTR-10 on cancellation. Mention only the ones the inputs trigger.
6. **Late fees and interest.** Late fee per day per Act (CGST and SGST each), capped by turnover band, with nil-return concessions; interest at the notified annual rate on tax paid late, computed from the due date. State the mechanics and tell the user to take the current rates from the GST portal.
7. **Sequence.** GSTR-1 before GSTR-3B. A pending 3B blocks later 1s. Unreconciled 2B credit claimed in 3B is the most common notice trigger.

## Output Format

### GST return map for [business name]

**Registration:** [regular monthly / regular QRMP / composition], GSTIN in [state], turnover band [band].

| Return | What it is | Frequency | Due date | Applies to you |
|---|---|---|---|---|
| GSTR-1 | outward supplies, invoice-level | [monthly/quarterly] | [date] | [yes/no] |
| GSTR-3B | summary, pay tax, claim ITC | [monthly/quarterly] | [date] | [yes/no] |
| PMT-06 | monthly tax payment under QRMP | monthly | 25th | [yes/no] |
| CMP-08 | composition quarterly payment | quarterly | 18th after quarter | [yes/no] |
| GSTR-4 / GSTR-9 / 9C | annual | yearly | [date] | [which one] |

**Twelve-month calendar** (verify every date against the current notification; dates falling on holidays do not extend):

| Month | Action | Form | Due |
|---|---|---|---|
| [month] | [file / pay] | [form] | [date] |

**If you miss a date:** late fee of [per-day amount, verify] per Act up to the cap for your band, plus interest at [current rate, verify] per annum on unpaid tax from the due date.

**Before each filing:**
- [ ] Sales register matches e-invoices and the GSTR-1 draft
- [ ] GSTR-2B credit reconciled with the purchase register; unmatched credit not claimed
- [ ] Reverse charge liabilities paid in cash, not from credit
- [ ] Previous period's 3B filed, otherwise this one is blocked

*Prepared from the information given. Confirm dates, thresholds, rates and your scheme eligibility on the GST portal or with a chartered accountant before relying on this.*

## Quality Checks

- [ ] The return map matches the stated registration type and only lists forms that apply
- [ ] Every due date, threshold and rate is marked for verification against the current notification
- [ ] The calendar covers twelve months with no month missing an action for a monthly filer
- [ ] The late fee and interest section explains the mechanism rather than asserting a fixed figure as permanent
- [ ] The output ends with the preparation-not-advice line and names the portal or professional to confirm with

## Anti-Patterns

- **Giving a composition dealer GSTR-1 and 3B.** They file CMP-08 and GSTR-4.
- **Treating QRMP as no monthly work.** Tax is still paid monthly on PMT-06.
- **Quoting thresholds and late fees as fixed.** They change by notification.
- **Advising to claim all 2B credit.** Only matched, eligible credit, with blocked credit excluded.
- **Skipping the sequence rule.** A pending 3B blocks later returns.

## Example Trigger Phrases

- "I run a small services firm with 60 lakh turnover. Which GST returns do I file and when?"
- "GSTR-1 aur GSTR-3B mein kya difference hai, dono bharne padenge?"
- "Should I opt for QRMP? Build me a GST calendar for the year."
- "We missed two months of GSTR-3B. What does it cost and what do we file first?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/in-gst-return-explainer.html
