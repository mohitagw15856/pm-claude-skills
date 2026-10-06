---
name: pivot-analysis-planner
description: "Plan pivot-table analysis that answers the actual question — the question-to-layout mapping (rows, values, filters chosen on purpose), the data-shape check that pivots require, and the drill-down path from summary to so-what. Use when asked analyze this data with a pivot, what's driving the total, break this down by category and month, or my pivot shows nonsense. Produces the question decomposition, the pivot layout(s) with reasons, the data-shape fixes needed first, and the reading guide."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/pivot-analysis-planner.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Pivot Analysis Planner Skill

Pivot tables answer "what's driving X" in seconds — when the layout matches the question and the data is shaped right. Most pivot frustration is one of those two: a layout assembled by dragging until something looks meaningful, or data that isn't tidy (merged cells, subtotal rows baked in, one-column-per-month) feeding a pivot that double-counts. This skill works backwards from the question: decompose it, shape-check the data, choose the layout deliberately, and plan the drill-down — because the first pivot is the *start* of the analysis, not its output.

## What This Skill Produces

- **The question decomposition** — the vague ask ("analyze sales") turned into pivotable questions ("which product line drove the Q2 change, and is it price or volume?")
- **The shape check** — the data problems that break pivots, found before the pivot finds them
- **The layout plan** — rows/columns/values/filters per question, each placement with its reason
- **The reading guide** — what the pivot will show, the drill-down path, and the so-what test

## Required Inputs

Ask for these if not provided:
- **The question, pushed to specific:** "analyze this" becomes 2–3 answerable questions — the decomposition is half the skill, and it needs the user's intent
- **The data's shape** — columns and a sample; tidy (one row = one record, one column = one variable) or the fixes list gets written first
- **The comparison that matters** — vs last period? vs plan? across segments? Comparisons decide the column dimension and whether calculated fields are needed

## Framework: The Planning Rules

1. **Question first, layout second:** each pivotable question maps to a layout — "what drove the change" → dimension in rows, period in columns, delta readable across; "where is it concentrated" → dimension in rows, values sorted descending, running % if available. Dragging-until-interesting produces coincidences, not answers.
2. **Tidy data or fix it first:** pivots need one-row-one-record: unmerge cells, delete pre-baked subtotal rows (they double-count), unpivot month-columns into a date column ([data-cleaning-pass](../data-cleaning-pass/SKILL.md) handles the mess). Five minutes of shaping saves an hour of pivot mystery.
3. **Values need their aggregation chosen, not defaulted:** SUM for additive things, COUNT for events, AVERAGE almost never without a weight-check (the average-of-averages trap). Every value field's aggregation is a decision with a reason.
4. **Filters are the scope contract:** what's excluded (test rows, internal accounts, incomplete current month) gets decided and *stated in the output* — an unlabeled filtered pivot is how two people present different totals from one dataset.
5. **Plan the drill, then the so-what:** the summary pivot points somewhere; the plan names the next cut ("if the East drop is real, re-pivot East by product") and ends at the so-what test — a pivot finding that suggests no action or decision was trivia, and the reading guide says which findings would matter.

## Output Format

# Pivot Plan: [dataset] — question: [the real one]

## Decomposition
[The ask → 2–3 pivotable questions]

## Shape Check
[Tidy? · the fixes needed first, if any]

## Layouts
| Question | Rows | Columns | Values (aggregation + why) | Filters (stated) |
|---|---|---|---|---|

## Reading Guide
[What each layout will show · the drill path · the so-what test: which findings change a decision]

## Quality Checks

- [ ] Every layout traces to a decomposed question
- [ ] The shape check ran before any layout advice
- [ ] Every value field's aggregation has a reason; average-of-averages is guarded
- [ ] Filters/exclusions are stated where the output will be shown
- [ ] The drill-down path and so-what test exist — the pivot is a step, not the deliverable

## Anti-Patterns

- [ ] Do not drag until interesting — layouts follow questions or they follow noise
- [ ] Do not pivot over baked-in subtotal rows — the double-count classic
- [ ] Do not average averages — weight or don't
- [ ] Do not present a filtered pivot without its scope note — that's how meetings get two truths
- [ ] Do not stop at the summary — the first pivot locates the question; the drill answers it

## Example Trigger Phrases

- "Analyze this data with a pivot."
- "What's driving the total?"
- "Break this down by category and month."
- "My pivot shows nonsense."
