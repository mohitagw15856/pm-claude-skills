---
name: metric-semantic-layer
description: "Define a metric in a semantic layer so it means one thing everywhere. Use when asked to define a metric, build a semantic layer / metrics layer entry, stop 'revenue means three things' problems, or write a metric definition for dbt MetricFlow / Cube / LookML. Produces a metric definition — exact formula, the base measure & aggregation, dimensions, filters, grain, edge cases, and a tool-ready spec."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/metric-semantic-layer.html
metadata:
  {
    "openclaw": { "emoji": "🛠" }
  }
---

# Metric Semantic Layer Skill

"Active users" means three different things in three dashboards — that's the problem a semantic layer
solves: define each metric **once**, precisely, and every tool reads the same definition. This skill
writes that definition — the exact formula, base measure, allowed dimensions, default filters, and the
edge cases that usually cause drift — in a tool-ready form (dbt MetricFlow / Cube / LookML).

## Required Inputs

Ask for these only if they aren't already provided:

- **The metric** — its name and the business question it answers.
- **The base data** — the model/table and the column(s) it's computed from.
- **The aggregation** — sum, count, count distinct, average, ratio.
- **Dimensions & filters** — how it can be sliced, and any default filters (exclude test accounts, internal users, refunds).
- **Tool** — dbt MetricFlow, Cube, LookML, or tool-agnostic.

## Output Format

### Metric: `[metric_name]`

**1. Definition (plain English)** — one sentence a non-analyst understands, and the precise version ("count of distinct user_ids with ≥1 qualifying event in the period, excluding internal/test accounts").

**2. Formula** — the exact calculation: base measure · aggregation · numerator/denominator (for ratios).

**3. Grain & time** — the time grain it's reported at, the date column it's anchored to, and how partial periods are handled.

**4. Dimensions** — the dimensions it can be sliced by (and any it must *not* be — non-additive metrics break when summed across the wrong dimension).

**5. Default filters** — what's always excluded (test/internal/refunds) so every consumer gets the same number.

**6. Edge cases** — null handling, late-arriving data, deduplication, currency/timezone, and additivity (can it be summed across days? across segments?). This section is where metric drift is prevented.

**7. Tool-ready spec** — the YAML/LookML for the chosen tool (MetricFlow `metrics:` / Cube `measures:` / LookML `measure:`), ready to commit.

## Quality Checks

- [ ] Has both a plain-English and an exact definition
- [ ] States the base measure, aggregation, and (for ratios) numerator/denominator
- [ ] Default filters are explicit, so every tool returns the same number
- [ ] Additivity is addressed (which dimensions it can/can't be summed across)
- [ ] Edge cases (nulls, dedup, timezone, late data) are handled
- [ ] A tool-ready spec is provided, not just prose

## Anti-Patterns

- [ ] Do not leave the definition fuzzy — "active users" without the exact rule is how three dashboards disagree
- [ ] Do not omit default filters — if one tool counts test accounts and another doesn't, the metric is broken
- [ ] Do not ignore additivity — summing a non-additive metric (like a distinct count) across days gives a wrong number
- [ ] Do not define metrics in BI tools instead of the semantic layer — that's how definitions fork
- [ ] Do not skip timezone/null/dedup edge cases — they cause the subtle, hard-to-find discrepancies

## Based On

Semantic-layer / metrics-layer practice (dbt MetricFlow, Cube, LookML) — single-source metric definitions with explicit grain, filters, and additivity.

## Example Trigger Phrases

- "Define a metric."
- "Build a semantic layer / metrics layer entry."
- "Stop 'revenue means three things' problems."
- "Write a metric definition for dbt MetricFlow / Cube / LookML."
