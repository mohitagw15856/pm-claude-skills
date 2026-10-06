---
name: expense-sheet-design
description: "Design an expense-tracking sheet that survives real receipts — the capture-at-spend habit, the category set that matches reimbursement or tax rules, the receipt-link discipline, and the month-end close that takes minutes because the work happened at spend-time. Use when asked track my business expenses, build an expense sheet for the team, get ready for reimbursement/tax season, or my shoebox of receipts needs a system. Produces the sheet structure, the capture ritual, the category mapping to the real downstream rules, and the month-end close."
---

# Expense Sheet Design Skill

Expense tracking has one law: it happens at spend-time or it happens badly. The March reconstruction — a shoebox of receipts, a statement, and archaeology — produces worse data at fifty times the cost of a fifteen-second capture habit. The sheet's design serves that habit: columns light enough to fill from a phone, categories that map to the *downstream consumer's* rules (the reimbursement policy, the tax return's lines — not aesthetic taxonomy), receipts linked not shoeboxed, and a month-end close that's minutes because every entry already exists.

## What This Skill Produces

- **The sheet structure** — the capture-light column set (date, amount, merchant, category, receipt-link, notes-if-odd), one row per expense
- **The category set** — mapped to the actual downstream: the employer's reimbursement categories, or the tax return's deduction lines (jurisdiction-flagged), never invented ontology
- **The capture ritual** — the fifteen-second at-spend habit: photograph receipt → one row → done
- **The month-end close** — reconcile against the statement, chase the gaps, subtotal by category, file the export

## Required Inputs

Ask for these if not provided:
- **The downstream consumer** — reimbursement (get the policy's categories and rules — per-diem? caps? receipt thresholds?), tax deductions (the return's categories — via the local professional per [quarterly-tax-rhythm](../quarterly-tax-rhythm/SKILL.md) discipline), or just visibility; the categories are *theirs*, not ours
- **The spend surfaces** — cards (which), cash frequency, subscriptions (auto-captured monthly rows), mileage/travel if relevant (their own capture rules)
- **The volume and the users** — solo (one sheet, one habit) vs. team (submission rules and the approver's view enter the design)

## Framework: The Design Rules

1. **Capture-light or capture-never:** the row takes ≤15 seconds from a phone: date (auto-ish), amount, merchant, category from a dropdown, receipt photo linked. Every additional required field taxes the habit; notes are for the *odd* expense, not every expense.
2. **Categories are the downstream's, verbatim:** if the reimbursement policy has nine categories, the dropdown has those nine, spelled identically — month-end becomes transcription instead of translation. Tax-facing sheets use the return's deduction lines, flagged verify-with-the-professional; a beautiful custom taxonomy that maps to nothing is future manual work, scheduled.
3. **The receipt lives with the row:** photo at spend-time into one folder ([filename-convention](../filename-convention/SKILL.md): date_merchant_amount), link in the row — the shoebox is retired. Receipt-threshold rules (many policies/authorities only require receipts above X — verify) noted so effort matches requirement.
4. **The statement is the auditor:** month-end close = statement vs. sheet — missing rows chased while memory exists (the 15-minute version of March's archaeology), duplicates caught, then category subtotals produced in downstream-ready form. The close is fast *because* capture happened; it is not the capture mechanism.
5. **The odd ones get their note now:** the client-dinner attendees, the mixed personal/business split, the why of the weird charge — one line at capture-time, because these are exactly the entries that are inexplicable in March and the ones auditors ask about (the [document-retention-map](../document-retention-map/SKILL.md) keeps the records as long as they can ask).

## Output Format

# Expense Sheet: [scope] — feeds: [reimbursement policy / tax return / visibility]

## The Structure
[Columns with the ≤15-second test applied · the dropdown source · the receipt-link route]

## Category Mapping
| Sheet category (= downstream's) | Downstream line | Receipt required? (verify) |
|---|---|---|

## The Capture Ritual
[The 15-second flow, phone-first · subscriptions as auto-rows · the odd-one note rule]

## Month-End Close (15 min)
[Statement reconcile → chase gaps → subtotals in downstream format → export filed]

> Reimbursement rules and deduction categories are the downstream's law — policy documents and local tax professionals define them; this sheet transcribes, never decides. Not tax advice.

## Quality Checks

- [ ] A row passes the 15-second phone test
- [ ] Categories are verbatim from the downstream consumer
- [ ] Every row links its receipt; thresholds noted where rules allow less
- [ ] The close reconciles against the statement monthly
- [ ] Odd expenses carry their explanation from day one

## Anti-Patterns

- [ ] Do not design for the reconstruction — the sheet serves the at-spend habit or it serves the shoebox
- [ ] Do not invent categories — the downstream's list, spelled identically, is the whole trick
- [ ] Do not require heavy rows — every mandatory field beyond five costs compliance
- [ ] Do not skip the monthly reconcile — capture without audit drifts, quietly
- [ ] Do not decide deductibility in the sheet — categories transcribe; the professional decides

## Example Trigger Phrases

- "Track my business expenses."
- "Build an expense sheet for the team."
- "Get ready for reimbursement/tax season."
- "My shoebox of receipts needs a system."
