# Company Compare, Same Definitions Skill

Two companies never define "adjusted" the same way. This skill throws both companies' own ratios away, recomputes five from the audited statements with one formula each, and lists every place the two reports mean different things by the same word.

## What This Skill Produces

- A definitions block: five ratios, one formula each, applied identically to both reports
- A comparison table with a page reference for every input from both reports
- A definitions-differ section: every metric the two companies define differently
- Three questions a beginner should ask before believing either company's highlights

## Required Inputs

- **Two uploaded annual report PDFs.** Hard requirement: if fewer than two are attached, ask and stop.
- **Same sector.** Confirm from each report's own business description `(p. N)`. If the sectors differ, say so, state that the ratios will not be comparable, and proceed only if the learner insists; keep the warning at the top of the artifact.
- Optional: which five ratios, if the learner has a preference (default: the sector menu below).

## Example Trigger Phrases

- "Compare these two annual reports on the same basis"
- "Both companies say their margin is 20% — is that the same 20%?"
- "Put these two retailers side by side using the same ratios"
- "Which of these two reports should I trust more, and why?"

## Hard Rules

1. Every figure carries `(p. N)` and names the company. A figure without both is a defect.
2. **Never use a company's own reported ratio.** Recompute from audited figures. If an input is missing for either company, the ratio row reads "not computable — [input] not disclosed in [Company] report".
3. One formula per ratio, written once, applied to both. If the companies' year-ends, currencies, or accounting standards differ, state it in the alignment block and compare ratios, never absolute amounts.
4. Every metric that appears in both companies' highlights under the same or similar name must be checked for definitional difference and listed, whether or not it is one of the five.
5. No buy, sell, valuation, or "better company" opinion. "More transparent about definitions" is allowed when tied to pages.

## Sector Ratio Menu

Choose the set matching the confirmed sector; write the formula exactly as used.
- **Industrial / consumer:** gross margin; statutory operating margin; net debt (incl. leases) ÷ EBITDA; cash conversion = free cash flow ÷ operating profit; receivable days.
- **Software / SaaS:** revenue growth; gross margin; statutory operating margin; free cash flow margin; deferred revenue growth vs revenue growth.
- **Bank:** CET1 ratio; net interest margin; cost-to-income; loan-to-deposit; return on tangible equity.
- **Retail:** gross margin; inventory days; net debt (incl. leases) ÷ EBITDA; cash conversion; capex ÷ revenue.
- **Property / REIT:** loan-to-value; interest cover; dividend ÷ cash earnings; change in NAV per share; admin costs ÷ rental income.

Free cash flow, wherever used, is the skill's definition (cash from operations − capex − lease principal), never either company's.

## Output Format

### Same-Definitions Comparison: [Company A] vs [Company B], [sector]

**Alignment** — four fixed lines: year-ends `(p. N / p. N)`; currencies; accounting standards (IFRS / US GAAP / other) `(p. N / p. N)`; any restatement of prior-year figures in either report `(p. N)` or "none disclosed".

**Definitions used** — five lines, `Ratio = numerator ÷ denominator`, each naming the exact statement line used for each input.

**Comparison table**

| Ratio | [A] inputs (pages) | [A] result | [B] inputs (pages) | [B] result | Gap | Note |
|---|---|---|---|---|---|---|

`Note` holds only: a not-computable reason, a classification difference that affects the input, or "—".

**Where the definitions differ** — one row per metric that both companies present, five columns:

| Metric (as each names it) | [A] definition (page) | [B] definition (page) | Audited status A / B | What the difference does to the comparison |
|---|---|---|---|---|
| e.g. Adjusted EBITDA / Underlying EBITDA | excludes restructuring, SBC (p. 34) | excludes restructuring only (p. 41) | Outside / Outside | A's figure is flattered by SBC exclusion of £X (p. 34) |

`Audited status` takes `Inside` or `Outside` per company: Inside if the figure appears on a page the audit opinion covers. Include at minimum: the profit measure each highlights, the cash measure each highlights, and any growth figure (organic, like-for-like, constant currency).

**Three questions before believing either company's highlights** — exactly three, each ending with the page on which the answer should live for each company, or "not disclosed" for the one that omits it. They must cover: (1) what each company removed to get from statutory to its headline profit; (2) whether the highlighted cash figure is the skill's free cash flow or something more generous; (3) whether the growth figure survives on a statutory, reported-currency basis.

End verbatim: *"Educational, not financial advice. Decisions with real money belong with a regulated adviser."*

## Quality Checks

- [ ] Two reports uploaded and the sector confirmed from both, with pages — pass/fail
- [ ] Every ratio uses one written formula applied to both companies — pass/fail
- [ ] No company-reported ratio appears in the comparison table — pass/fail
- [ ] Every input cell for both companies carries a page — pass/fail
- [ ] Every missing input yields a not-computable row naming the company and input — pass/fail
- [ ] The definitions-differ table covers the highlighted profit, cash, and growth measures of both companies — pass/fail
- [ ] Every definitions-differ row states the effect on the comparison with an amount or "not quantifiable from the report" — pass/fail
- [ ] Exactly three questions, each with a page or not-disclosed marker per company — pass/fail
- [ ] No "better company", "cheaper", or "safer" language — pass/fail
- [ ] The disclaimer line is the final line, verbatim — pass/fail

## Anti-Patterns

- [ ] Do not compare absolute amounts across different currencies or year lengths
- [ ] Do not accept either company's free cash flow definition, even if both claim the same name
- [ ] Do not average, blend, or "adjust for comparability" — flag the difference and leave both figures as computed
- [ ] Do not omit a metric from the definitions-differ table because the two definitions look similar; similar is not identical
- [ ] Do not rank the companies

## Related Skills in This Bundle

`annual-report-tutor` (learn one report first), `audited-boundary-check` (inside/outside for one report in depth), `profit-to-cash-walk` (the FCF definition used here), `investing-vocabulary-explainer`.
