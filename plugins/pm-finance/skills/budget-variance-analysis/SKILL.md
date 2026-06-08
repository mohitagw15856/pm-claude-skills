---
name: budget-variance-analysis
description: "Produce a structured budget variance analysis from actual vs budget figures. Use when asked to analyse budget variances, explain underspend or overspend, write a variance commentary, or investigate why actuals differ from plan. Produces a categorised variance table with root cause analysis and management commentary."
---

# Budget Variance Analysis Skill

Produces a complete variance analysis from numbers through to root cause explanation and management commentary.

## Required Inputs
- **Actuals and budget figures** (paste as table or describe line by line)
- **Period** (month / quarter / YTD)
- **Materiality threshold** (e.g. £10k or 5%)
- **Known reasons for variances** (if any)
- **Audience** (CFO / board / management / auditor)

## Output Structure

### 1. Variance Summary Table

| Line Item | Budget | Actual | Variance £ | Variance % | F/A |
|---|---|---|---|---|---|
| Revenue | | | | | |
| Cost of Sales | | | | | |
| Gross Profit | | | | | |
| Opex | | | | | |
| EBITDA | | | | | |

F = Favourable | A = Adverse

### 2. Material Variance Commentary

For each variance above threshold:

**[Line item] — £[amount] F/A ([%])**
- **Root cause:** [Specific explanation — not "timing" without detail]
- **Permanent or timing?** Will this reverse next period?
- **Management action:** What is being done
- **Forecast impact:** Does this change full-year outlook?

### 3. Top 3 Variances Requiring Attention
Ranked by materiality and strategic significance.

### 4. Forecast Revision
Does the full-year forecast need updating? State revised expectation and key assumptions.

### 5. Executive Summary
3-4 sentences of management commentary suitable for a board pack.

## Quality Checks
- [ ] All variances above threshold explained
- [ ] Root causes specific (not vague)
- [ ] Favourable/Adverse correctly labelled
- [ ] Forecast impact stated for material variances

## Anti-Patterns

- [ ] Do not explain a variance as "timing" without specifying which period it will reverse into and what amount is expected
- [ ] Do not label a favourable variance on a cost line without checking whether it is due to underspend, delayed spend, or reduced activity — the cause determines whether it is genuinely good news
- [ ] Do not omit variances below the materiality threshold entirely — note them collectively so the reader knows they exist and were reviewed
- [ ] Do not present a variance analysis without a forecast impact statement for material items — historical variances without forward implications are incomplete

## Example Trigger Phrases
- "Write a variance analysis for these actuals vs budget: [paste]"
- "Explain why we are over budget on [cost line]"
- "Write the variance commentary for our finance review"
- "Produce a budget vs actual analysis for Q[N]"
