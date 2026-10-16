---
trigger: model_decision
description: "Use when asked to check whether a figure is audited, which headline numbers sit outside the audited accounts, what 'adjusted' or 'underlying' means in this report, or who is vouching for the numbers in the highlights. For every headline figure in the highlights, chairman's statement and CEO review of an uploaded annual report, states whether it sits inside or outside the audited statements and what was added or removed versus the nearest audited number. Produces a boundary table, the list of figures outside the boundary, and a plain-English summary of who is vouching for what. Educational, not financial advice."
---

# Audited Boundary Check Skill

Draws the line the report's front half blurs: which headline numbers an auditor signed off, which ones the company chose, and exactly what changed between the two.

## What This Skill Produces

- The audit boundary: which pages and statements the opinion covers, and the opinion type
- A boundary table covering every headline figure in the highlights, chairman's statement and CEO review
- The outside-the-boundary list, each figure bridged to its nearest audited equivalent
- A plain-English summary of who is vouching for what

## Required Inputs

- **An uploaded annual report PDF.** Hard requirement: if none is attached, ask and stop.
- Optional: which sections to scan if the learner wants to go beyond the default three (highlights, chairman's statement, CEO review).

## Example Trigger Phrases

- "Which of these headline numbers are actually audited?"
- "What does 'adjusted operating profit' leave out in this report?"
- "Is the growth figure on page 2 inside the accounts or made up by management?"
- "Who is vouching for the numbers in the highlights?"
- "Run an audited boundary check on this annual report"

## Hard Rules

1. Every figure carries `(p. N)`. A figure with no page is a defect.
2. A figure that cannot be located in the audited pages, and has no company-provided reconciliation, gets "nearest audited equivalent: not disclosed in this report" — never a reasoned guess.
3. "Audited" means the figure appears, in that form, on a page the audit opinion states it covers. Arithmetic on audited figures (a growth %, a margin) is **derived**, not audited, and is classified outside.
4. Never call an outside figure wrong, misleading, or fake. The skill describes the boundary; it does not judge intent.
5. No buy, sell, or valuation opinion.

## Process

1. **Find the audit report** `(p. N)`. Record: auditor name; opinion type (unqualified / qualified / adverse / disclaimer, or the local equivalent); the sentence stating which pages or statements the opinion covers; and the "other information" paragraph confirming the auditor read but did not audit the front half. If any element is absent, write "not disclosed in this report".
2. **Draw the boundary**: list the audited statements and their pages; everything else is outside.
3. **Harvest every headline figure** from the highlights, chairman's statement and CEO review: every currency amount, percentage, ratio, count, or ranking. Do not skip small ones.
4. **Classify each figure**: `Inside` (appears verbatim on an audited page), `Derived` (arithmetic on inside figures — show the arithmetic), `Outside` (adjusted, underlying, like-for-like, constant-currency, pro-forma, KPI, operational metric, market claim).
5. **Bridge each Outside figure** to its nearest audited equivalent using the company's own reconciliation table if one exists `(p. N)`; list every item added or removed with its amount. If no reconciliation exists, say so.
6. **Write the vouching summary.**

## Output Format

### Audited Boundary Check: [company, period]

**The boundary**
- Auditor: [name] `(p. N)` · Opinion: [type] `(p. N)`
- Covers: [statements and pages, quoted] `(p. N)`
- Front-half status: [quote or paraphrase of the other-information paragraph] `(p. N)`

**Boundary table** — one row per headline figure, in the order they appear:

| Figure (as printed, page) | Audited? | Nearest audited equivalent (page) | What differs |
|---|---|---|---|
| e.g. Adjusted EBITDA £412m (p. 2) | No — Outside | Operating profit £298m (p. 61) | + D&A £71m, + exceptional items £38m, + share-based pay £5m (recon p. 34) |
| e.g. Revenue £2,104m (p. 2) | Yes — Inside | Same (p. 60) | — |
| e.g. Revenue growth 8% (p. 3) | No — Derived | £2,104m ÷ £1,948m − 1 (p. 60) | Arithmetic on audited figures; check the prior year is not restated |

`Audited?` takes exactly one of: `Yes — Inside`, `No — Derived`, `No — Outside`.

**Figures outside the boundary** — numbered list, one line each: figure, page, what was added or removed with amounts, and whether the company reconciled it `(p. N)` or "no reconciliation disclosed in this report". Group operational metrics (customers, NPS, market share, employee counts) at the end under *No audited equivalent exists*.

**Who is vouching for what** — exactly three short paragraphs:
1. *The auditor* vouches for: [the statements listed], to the standard of [opinion type]; what an unqualified opinion does and does not mean in one sentence.
2. *The directors* vouch for the whole report, including every Outside figure; name the directors' responsibility statement page or "not disclosed in this report".
3. *Nobody independent* vouches for: [list the Outside and operational figures]; the reader is trusting management's definitions, which can change year to year.

End verbatim: *"Educational, not financial advice. Decisions with real money belong with a regulated adviser."*

## Quality Checks

- [ ] The audit opinion page, type, and covered pages are quoted or marked not disclosed — pass/fail
- [ ] Every currency amount, percentage, ratio, and count in the three scanned sections has a row — pass/fail
- [ ] Every row uses one of the three exact `Audited?` values — pass/fail
- [ ] Every Outside row names its nearest audited equivalent with a page, or says not disclosed — pass/fail
- [ ] Every bridge lists items with amounts, not just labels — pass/fail
- [ ] Derived rows show their arithmetic — pass/fail
- [ ] No row uses "misleading", "fake", "inflated", or similar — pass/fail
- [ ] The vouching summary has exactly three paragraphs — pass/fail
- [ ] The disclaimer line is the final line, verbatim — pass/fail

## Anti-Patterns

- [ ] Do not treat "adjusted" as a synonym for dishonest; describe what was removed and let the reader decide
- [ ] Do not treat "audited" as a synonym for correct; the opinion is on material fairness, not on every figure
- [ ] Do not assume the front half is unaudited without quoting the other-information paragraph or marking it not disclosed
- [ ] Do not bridge a figure from memory of what companies usually adjust; use this report's reconciliation or say none exists
- [ ] Do not skip the small numbers; a headcount or NPS claim is exactly the kind of figure nobody independent checks

## Related Skills in This Bundle

`annual-report-tutor` (the full walk), `profit-to-cash-walk` (bridge profit to cash), `company-compare-same-definitions` (two reports), `investing-vocabulary-explainer` (define any term).
