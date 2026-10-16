---
name: "Use when asked to walk me through an annual report, teach me"
description: "Use when asked to walk me through an annual report, teach me to read this 10-K, explain a company's accounts to a beginner, or tutor me on the financial statements in an uploaded report. Walks a beginner up a fixed six-rung ladder — statement map, balance sheet line by line, operating profit to free cash flow, five sector-appropriate ratios with healthy ranges, the sceptical read, then a reusable checklist and a five-question quiz. Produces a page-referenced tutorial in which every figure cites the page it came from and anything missing is marked 'not disclosed in this report'. Educational, not financial advice."
---

# Annual Report Tutor Skill

Teaches a beginner to read one real annual report, rung by rung, with every number traced to a page. The document is the only source of truth: the skill reads, it never remembers or estimates.

## What This Skill Produces

- A six-rung tutorial built from the uploaded report, delivered one rung per turn (or all at once on request)
- A statement map, an annotated balance sheet, a profit-to-cash reconciliation with working shown, five ratios with page references and sector ranges, a numbers-versus-narrative split
- A one-page reusable checklist and a five-question quiz with answers withheld until attempted

## Required Inputs

- **An uploaded annual report PDF** (annual report, 10-K, integrated report). Hard requirement: if none is attached, ask for it and stop. Do not proceed from a company name, a summary, or memory.
- Optional: the learner's sector guess (the skill confirms it from the report) and their experience level (default: complete beginner).

## Example Trigger Phrases

- "Walk me through this annual report like I've never read one"
- "Teach me to read this 10-K"
- "I've uploaded the accounts — explain the balance sheet line by line"
- "Tutor me on this company's financial statements"

## Hard Rules

1. **Every figure carries a page reference** in the form `(p. N)`. A figure without a page is a defect.
2. **If a figure cannot be found in the document, write exactly: "not disclosed in this report".** Never reason, estimate, or recall a value to fill a gap. Never compute a ratio whose inputs include a not-disclosed figure; show the ratio row with "not computable — [input] not disclosed in this report".
3. Quote the report's own units and currency on every table (e.g. `£m`, `$ thousands`) and never convert silently.
4. No buy, sell, hold, or valuation opinion at any rung. If asked, redirect to a regulated adviser.
5. One rung per turn by default. End each rung with one prompt back to the learner. Move on only when they answer or say "next". If they ask for everything at once, deliver all six rungs in order in one artifact.

## The Ladder

### Rung 1 — Map the three statements

Output exactly:

| Statement | Starts on page | Period covered | The question it answers |
|---|---|---|---|
| Income statement (P&L) | p. N | FY.. | Did the business make a profit this year? |
| Balance sheet | p. N | at DD Mon YYYY | What does it own and owe on one day? |
| Cash flow statement | p. N | FY.. | Where did cash actually come from and go? |

Then three single lines: the auditor's report starts on `p. N`; the notes to the accounts start on `p. N`; the pages the audit opinion says it covers are `pp. N–M` (or "not disclosed in this report"). Close with the prompt: *"Open the balance sheet page. Tell me the first line you don't understand."*

### Rung 2 — The balance sheet, line by line

Output exactly one table covering every line on the primary balance sheet, in the report's order:

| Line (as printed) | Page | This year | Last year | Plain-English meaning |
|---|---|---|---|---|

Then **The five lines that matter most**, chosen for the sector (default: cash and equivalents; total borrowings including lease liabilities; trade receivables; inventories, or deferred revenue/contract liabilities for software; total equity). For each, three fixed fields:
- **Figure:** amount `(p. N)`, this year vs last year, with the change.
- **Why it matters:** one sentence.
- **Where to look next:** the note number and page that breaks it down.

Then **The two lines beginners misread**, always these two unless the sector demands a substitute, in the same three-field format plus a fourth, **What it is not:**
1. Goodwill and intangibles — the premium paid for acquisitions, not something that can be sold; watch for impairment `(p. N)`.
2. Retained earnings — accumulated past profits, not a pile of cash; the cash is on the cash line.

Prompt: *"Which of the five lines moved most, and can you find the note that explains why?"*

### Rung 3 — Operating profit to free cash flow

Output the walk as one table, working shown, with the running total on every row:

| Step | Line item | Page | Amount | Running total | Why cash and profit diverge here (one sentence) |
|---|---|---|---|---|---|
| 1 | Operating profit (statutory) | p. N | | | Starting point — accounting profit, not cash |
| 2 | + Depreciation and amortisation | p. N | | | Non-cash charges added back |
| 3 | ± Working capital movements | p. N | | | Sales not yet collected, stock built, bills not yet paid |
| 4 | ± Other non-cash and provisions | p. N | | | Share-based pay, impairments, provisions |
| 5 | − Tax paid | p. N | | | Cash tax differs from the tax charge |
| 6 | − Interest paid (if in operating) | p. N | | | Note where the report classifies it |
| 7 | = Cash from operations | p. N | | | Must tie to the cash flow statement figure |
| 8 | − Capital expenditure (PP&E and intangibles) | p. N | | | Investment is spent cash but not an expense |
| 9 | − Lease payments (principal) | p. N | | | Under IFRS 16 these sit in financing |
| 10 | = Free cash flow | | | | The skill's definition; state if the company's own FCF differs |

Under the table, three fixed lines: **Tie-out:** row 7 equals the reported cash from operations `(p. N)` — yes/no, and the gap if no. **Company's own FCF:** amount `(p. N)` and how its definition differs, or "not disclosed in this report". **Your check:** name one subtraction (e.g. step 8) and instruct the learner to recompute it by hand before moving on. Prompt: *"Recompute step [n] yourself. Does it match?"*

### Rung 4 — Five ratios for this sector

State the sector and how the report confirms it `(p. N)`. Pick the five-ratio set from this menu and output one table:

| Ratio | Formula | Inputs (page each) | Result | Healthy range for this sector | This company sits |
|---|---|---|---|---|---|

Sector menus (healthy ranges are rules of thumb; label them so):
- **Industrial / consumer:** gross margin; operating margin; net debt ÷ EBITDA (< 2× comfortable, > 3× stretched); cash conversion = FCF ÷ operating profit (80–100%+); receivable days (30–60).
- **Software / SaaS:** revenue growth; gross margin (70%+); statutory operating margin; FCF margin (15%+ mature); deferred revenue growth vs revenue growth (should not lag badly).
- **Bank:** CET1 ratio (well above regulatory minimum, typically 12–16%); net interest margin; cost-to-income (< 60% efficient); loan-to-deposit (< 100%); return on tangible equity (10%+).
- **Retail:** gross margin; inventory days (sector-specific — cite the prior year as the benchmark); net debt including leases ÷ EBITDA; cash conversion; like-for-like growth (narrative — flag it as unaudited).
- **Property / REIT:** loan-to-value (< 40% conservative); interest cover (> 2×); occupancy (narrative — flag); dividend covered by cash earnings (yes/no); change in NAV per share.

Any ratio with a not-disclosed input is shown as not computable. Prompt: *"Which ratio would you want a second year of before trusting it?"*

### Rung 5 — The sceptical side

Output two columns, minimum four rows each, every cell with a page:

| What the numbers show (page) | What is narrative (page) |
|---|---|

Rules: audited statements and notes go left; highlights, chairman's statement, CEO review, KPIs, "adjusted" and "underlying" figures go right. Then **Three questions a sceptic asks**, each tied to a specific page, and one line naming the biggest gap between the story and the statements. Prompt: *"Pick one narrative claim. Which audited line would prove or disprove it?"*

### Rung 6 — Checklist and quiz

**One-page checklist** (reusable on any report), exactly twelve items, each a yes/no with a blank for a page number:
1. Found the three statements and their pages
2. Found the audit opinion and what it covers
3. Cash vs last year
4. Total borrowings incl. leases vs last year
5. Goodwill as % of total assets
6. Cash from operations ties to the statement
7. Free cash flow computed and compared with company's version
8. Five sector ratios computed
9. Any ratio not computable — noted why
10. Adjusted figures reconciled to statutory
11. Biggest story-vs-statements gap named
12. One subtraction checked by hand

**Five-question quiz**, answers withheld: each question names the page range to look in. Reveal an answer only after the learner attempts it; then give the answer with the page and one sentence on the misread if they were wrong. Question types: one locate-a-figure, one compute-a-ratio, one why-cash-differs, one is-it-audited, one what-would-you-check-next.

## Output Format

Each rung is headed `## Rung N — [title]` and contains only the tables and fixed fields defined above, in that order, followed by the rung prompt in italics. The artifact ends, verbatim: *"Educational, not financial advice. Decisions with real money belong with a regulated adviser."*

## Quality Checks

- [ ] A report PDF was uploaded; the skill did not proceed without one — pass/fail
- [ ] Every figure in every rung carries `(p. N)` — pass/fail
- [ ] Every missing figure reads exactly "not disclosed in this report" and no ratio was computed from one — pass/fail
- [ ] Rung 3 row 7 is explicitly tied out to the reported cash from operations — pass/fail
- [ ] Rung 4 uses the sector menu and labels ranges as rules of thumb — pass/fail
- [ ] Rung 5 places every adjusted or underlying figure in the narrative column — pass/fail
- [ ] Quiz answers are absent from the first delivery — pass/fail
- [ ] No buy, sell, or valuation opinion anywhere — pass/fail
- [ ] The disclaimer line is the final line, verbatim — pass/fail

## Anti-Patterns

- [ ] Do not fill a gap from memory of the company, prior years, or peers
- [ ] Do not convert units, currencies, or periods silently
- [ ] Do not present the company's adjusted profit as the starting point of Rung 3
- [ ] Do not skip rungs or merge them when the learner is pacing one per turn
- [ ] Do not grade the quiz before the learner has answered
- [ ] Do not describe a company as cheap, expensive, safe, or a good business

## Related Skills in This Bundle

`profit-to-cash-walk` (Rung 3 standalone), `audited-boundary-check` (Rung 5 deep dive), `company-compare-same-definitions` (two reports), `investing-vocabulary-explainer` (any term, in context).
