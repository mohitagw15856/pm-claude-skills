---
name: chart
description: "Turn numbers into a chart — bar, line, area, pie, or doughnut. Use when asked to chart or graph data, visualize metrics/trends/breakdowns, or show numbers as a picture instead of a table. Produces a ready-to-render chart spec (renders live in the playground and exports as PNG) plus a one-line read of what the chart shows."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/chart.html
metadata:
  {
    "openclaw": { "emoji": "🖼" }
  }
---

# Chart Skill

A table of numbers hides the story; a chart shows it. This skill turns data into a clean, correctly-typed
chart — a **trend** as a line, a **comparison** as bars, a **composition** as a pie/doughnut — emitted as a
small JSON spec inside a ` ```chart ` block that renders live in the playground (and exports as PNG).

## Required Inputs

Ask for these only if they aren't already provided:

- **The data** — the numbers, with their labels/categories (paste a table, list, or metrics).
- **What you want to show** — a trend over time, a comparison between things, or parts of a whole. This decides the chart type.
- **Series** — one metric or several (e.g. revenue *and* churn over the same months).
- **Title** (optional) — what the chart is about.

If the data implies the wrong chart type for the goal, pick the right type and say why.

## Output Format

### [What the chart shows]

A one-line read — the takeaway the chart makes obvious.

```chart
{
  "type": "line",
  "title": "MRR vs. churned MRR (2026)",
  "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "series": [
    { "name": "MRR ($k)", "data": [120, 138, 151, 167, 180, 201] },
    { "name": "Churned ($k)", "data": [8, 9, 7, 11, 9, 8] }
  ]
}
```

**Notes** (optional) — caveats, the source of the numbers, or what a follow-up chart would show.

## Chart Spec Rules (so it renders)

- Emit a single ` ```chart ` block containing **valid JSON** (double-quoted keys/strings, no trailing commas, no comments).
- `type`: `"bar"`, `"line"`, `"area"`, `"pie"`, or `"doughnut"`.
- `labels`: the x-axis categories (or the slice names for pie/doughnut).
- `series`: an array of `{ "name": "...", "data": [numbers] }`. Pie/doughnut uses the first series only.
- Every series' `data` length must match `labels` length. Numbers only — no units inside the array (put units in the series name or title).
- **Choose the type by intent:** trend over time → line/area; compare categories → bar; parts of a whole → pie/doughnut.

## Quality Checks

- [ ] Chart type matches the intent (trend → line, comparison → bar, composition → pie)
- [ ] The JSON is valid and renders without edits (no trailing commas, all strings quoted)
- [ ] Every series' data length equals the number of labels
- [ ] Units/scale are clear (in the title or series names), and the one-line read states the takeaway
- [ ] Multiple series are used only when they share the same axis/scale

## Anti-Patterns

- [ ] Do not use a pie chart for more than ~6 slices or for trends — pies show composition, not change
- [ ] Do not put units or text inside the numeric `data` array — it breaks the chart
- [ ] Do not emit invalid JSON (trailing commas, single quotes, comments) — it won't render
- [ ] Do not mismatch lengths — a series shorter/longer than the labels misaligns the chart
- [ ] Do not chart numbers you weren't given — flag gaps instead of inventing data points

## Based On

Data-visualization practice (chart-type-to-intent: trend/comparison/composition), emitted as a renderable chart spec.

## Example Trigger Phrases

- "Chart this data."
- "Graph our monthly revenue."
- "Visualise these metrics."
- "Show these numbers as a picture instead of a table."
