# Data Quality Audit Skill

Bad analysis usually starts with bad data nobody checked. This skill audits a dataset across the dimensions that matter, names the specific issues (and the exact check to confirm each), and prioritises fixes by how much they distort the answer.

## Working from a brief

Given a dataset description, sample rows, or a schema, **produce the full audit anyway** — infer the likely issues for that kind of data and give the concrete check (SQL/pandas-style) to verify each. If given actual data, ground the findings in it. Never just say "check for errors"; specify them.

## Required Inputs

Ask for (if not already provided):
- **The dataset** — schema, a sample, or a description (what each column is, the grain)
- **What it'll be used for** (the analysis/decision it feeds — focuses the audit)
- **Source & freshness** (where it comes from, how often it updates)
- **Known issues** the user already suspects

## Output Format

### 1. Summary
Overall read (🟢 usable / 🟡 fix-first / 🔴 don't trust yet) and the one issue most likely to mislead.

### 2. Quality scorecard

| Dimension | Check | Finding | Severity |
|---|---|---|---|
| Completeness | nulls / missing per key column | | |
| Uniqueness | duplicate rows / keys | | |
| Validity | type, format, range, allowed values | | |
| Consistency | cross-field & cross-table agreement | | |
| Accuracy | sanity vs known totals / reality | | |
| Timeliness | freshness, gaps in the time series | | |

### 3. Specific issues
For each real issue: what it is, **the check to confirm it** (a concrete query/snippet), why it matters for the intended use, and severity.

### 4. Fix plan (prioritised)
Ordered by impact-on-the-decision: what to fix first, how (drop / impute / dedupe / cast / clamp / re-source), and what to flag rather than fix.

### 5. Guardrails
2–3 automated checks to add so these issues get caught next time (e.g. a not-null assertion, a row-count delta alarm, an allowed-values test).

## Quality Checks

- [ ] Covers all six dimensions, not just missing values
- [ ] Each issue comes with a concrete check to confirm it, not just a label
- [ ] Severity is judged against the intended use of the data
- [ ] Fix plan is prioritised by impact and says fix-vs-flag
- [ ] Recommends guardrails to prevent recurrence

## Anti-Patterns

- Only checking for nulls and calling it done
- "Clean your data" with no specific issues or checks
- Treating all issues as equally severe regardless of the decision
- Fixing data silently with no record of what was changed
