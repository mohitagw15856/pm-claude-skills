---
trigger: model_decision
description: "Use when asked to reconcile operating profit to free cash flow, walk from EBIT to FCF, explain why profit and cash differ in this report, or show a company's cash conversion from its own accounts. Takes operating profit from an uploaded annual report and walks line by line to free cash flow using the report's own numbers, arithmetic shown at every step. Produces a step table (line, page, amount, running total, one-sentence reason cash and profit diverge), a drift flag on every line where the arithmetic could go wrong, a tie-out to the reported cash flow statement, and an instruction to independently check at least one subtraction. Educational, not financial advice."
---

# Profit to Cash Walk Skill

Standalone version of the reconciliation rung: start at statutory operating profit, end at free cash flow, and show every subtraction so the reader can catch the skill's own mistakes.

## What This Skill Produces

- A ten-step walk from operating profit to free cash flow, every amount page-referenced, running total on every row
- One sentence per line on why cash and profit diverge there
- A drift flag on every line where the arithmetic could go wrong, with the reason
- A tie-out against the reported cash flow statement and the company's own free cash flow, if disclosed
- An instruction naming one subtraction for the reader to recompute by hand

## Required Inputs

- **An uploaded annual report PDF.** Hard requirement: if none is attached, ask and stop.
- Optional: which year to walk (default: the current year; the prior year on request, as a second table).

## Example Trigger Phrases

- "Walk me from operating profit to free cash flow using this report"
- "Why is this company's cash so much lower than its profit?"
- "Reconcile EBIT to FCF from the accounts I uploaded"
- "Show me the cash conversion step by step"

## Hard Rules

1. Every amount carries `(p. N)`. Start from **statutory** operating profit on the income statement, never an adjusted figure.
2. If a line cannot be found, write "not disclosed in this report" in the amount cell, carry the running total unchanged, and flag the row. Never estimate.
3. Quote the report's units and currency in the table header. Brackets in the report mean negative; state the sign convention you are using above the table.
4. **Drift flag rule.** Mark a row `⚠` whenever any of these is true: a sign was inferred rather than printed; a unit or currency was converted; two figures from different pages were combined; the figure is derived rather than read; the report classifies the item somewhere other than the walk expects (e.g. interest in financing). State which condition triggered the flag.
5. The walk must tie to the cash flow statement at step 7. If it does not, print the gap and do not smooth it.
6. No buy, sell, or valuation opinion.

## Output Format

### Profit to Cash Walk: [company, FY, units and currency]

**Sign convention:** [e.g. "Outflows shown as negatives; brackets in the report read as negative."]

| Step | Line item | Page | Amount | Running total | Drift | Why cash and profit diverge here |
|---|---|---|---|---|---|---|
| 1 | Operating profit (statutory) | p. N | | | | Accounting profit — the starting point, not cash |
| 2 | + Depreciation and amortisation | p. N | | | | Expenses charged this year for cash spent in earlier years |
| 3 | ± Change in receivables | p. N | | | | Sales booked but not yet collected |
| 4 | ± Change in inventories | p. N | | | | Cash tied up in stock not yet sold |
| 5 | ± Change in payables | p. N | | | | Bills owed but not yet paid keep cash in the business |
| 6 | ± Other non-cash items and provisions | p. N | | | | Share-based pay, impairments, provisions booked but not paid |
| 7 | − Tax paid | p. N | | | | Cash tax lags and differs from the tax charge |
| 8 | = Cash from operations | p. N | | | | Must equal the cash flow statement — see tie-out |
| 9 | − Capex (PP&E and intangibles) | p. N | | | | Spent cash that the P&L spreads over years |
| 10 | − Lease payments (principal) | p. N | | | | Under IFRS 16 lease cash sits in financing, not operating |
| 11 | = Free cash flow | — | | | | What is left to repay debt, pay dividends, or keep |

Notes on the table: if the report shows working capital as one line, use one row and mark it `⚠` (combined). If interest paid is inside operating cash flow, add a row after step 7 and flag it (classification). Show the arithmetic of every running total as `previous ± amount = total`.

**Tie-out**
- Step 8 vs reported cash from operations `(p. N)`: match / gap of [amount]. If gap: "unexplained by the lines above; the cash flow statement note on p. N lists [items]" or "not disclosed in this report".
- Company's own free cash flow `(p. N)`: [amount]; definition differs by [items], or "not disclosed in this report".
- Cash conversion: step 11 ÷ step 1 = [x]% (derived — `⚠`).

**Flagged rows** — one line per `⚠`: step number, which drift condition, what the reader should look at on the page.

**Your check** — exactly this instruction, with the step filled in: *"Before trusting this table, recompute step [n] yourself: take [amount, page] minus [amount, page] and confirm you get [total]. If it does not match, the error is mine, not the report's."* Choose the step with the largest amount that was read, not derived.

End verbatim: *"Educational, not financial advice. Decisions with real money belong with a regulated adviser."*

## Quality Checks

- [ ] Step 1 is statutory operating profit from the income statement, with page — pass/fail
- [ ] Every amount cell has a page or reads "not disclosed in this report" — pass/fail
- [ ] Every running total shows its arithmetic — pass/fail
- [ ] Every row meeting a drift condition carries `⚠` and the condition is named — pass/fail
- [ ] Step 8 is tied out to the reported figure, with the gap printed if any — pass/fail
- [ ] The divergence column has exactly one sentence per row — pass/fail
- [ ] The "Your check" instruction names a specific step, both inputs, and the expected result — pass/fail
- [ ] The disclaimer line is the final line, verbatim — pass/fail

## Anti-Patterns

- [ ] Do not start from adjusted, underlying, or EBITDA figures
- [ ] Do not plug a missing line to force the tie-out
- [ ] Do not convert thousands to millions, or one currency to another, without a flag
- [ ] Do not describe cash conversion as good or bad; state the figure and the sector's rough norm only if the learner asks
- [ ] Do not omit lease payments because the report's own free cash flow definition omits them; show both

## Related Skills in This Bundle

`annual-report-tutor` (this walk as Rung 3 of six), `audited-boundary-check` (is the company's FCF figure audited?), `company-compare-same-definitions`, `investing-vocabulary-explainer`.
