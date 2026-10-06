---
name: data-quality-checks
description: "Design the data quality checks for a table or pipeline across the standard dimensions. Use when asked to add data quality tests, define DQ checks, catch bad data before it hits dashboards, or set up monitoring for a dataset. Produces a checks plan across completeness, validity, uniqueness, freshness, consistency, and accuracy — each with the rule, severity, and where it runs (dbt test / Great Expectations / SQL assertion)."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/data-quality-checks.html
metadata:
  {
    "openclaw": { "emoji": "🛠" }
  }
---

# Data Quality Checks Skill

Bad data quietly poisons dashboards and models until someone notices the number is wrong. The fix is
checks that fail loudly *before* that — across the standard DQ dimensions. This skill designs them for a
specific table/pipeline: the exact rule per dimension, its severity (block vs. warn), and where it runs
(dbt test, Great Expectations, or a SQL assertion), so quality is enforced, not hoped for.

## Required Inputs

Ask for these only if they aren't already provided:

- **The table/pipeline** and what it represents (grain, key columns).
- **The columns that matter** — keys, required fields, enums, ranges, dates.
- **Freshness expectation** — how current the data must be.
- **Tooling** — dbt tests, Great Expectations, Soda, or raw SQL assertions.

## Output Format

### Data Quality Checks: `[table]`

Checks organised by dimension — each with the **rule**, **severity** (🔴 block the pipeline / 🟡 warn), and **where it runs**:

| Dimension | Check | Rule | Severity | Implement as |
|---|---|---|---|---|
| **Completeness** | required fields non-null | `not_null` on [cols] | 🔴 | dbt test |
| **Uniqueness** | grain key unique | `unique` on [key] | 🔴 | dbt test |
| **Validity** | values in allowed set/range | `accepted_values` / range | 🟡 | GE / SQL |
| **Freshness** | data is current | max(loaded_at) within SLA | 🔴 | dbt source freshness |
| **Consistency** | cross-field / cross-table | e.g. totals reconcile, FK exists | 🟡 | SQL assertion |
| **Accuracy** | matches a source of truth | reconcile vs. system-of-record | 🟡 | SQL assertion |

**Notes:**
- **Severity discipline** — only block on checks that should *stop* the pipeline (a duplicated grain key, stale critical data). Over-blocking trains people to ignore alerts.
- **Where to check** — at ingestion (catch early) vs. in the model vs. post-build; recommend per check.
- **On failure** — what happens (halt, quarantine rows, alert + continue) and who's paged.

## Quality Checks

- [ ] Covers the core dimensions (completeness, uniqueness, validity, freshness, consistency)
- [ ] Each check has an explicit rule and a severity (block vs. warn)
- [ ] Severity is disciplined — only truly critical checks block the pipeline
- [ ] Freshness has a measurable SLA, not "should be recent"
- [ ] Each check names where it runs and what happens on failure

## Anti-Patterns

- [ ] Do not block the pipeline on every check — alert fatigue makes people ignore the real failures; reserve 🔴 for critical
- [ ] Do not only test the happy path — the grain key, nulls, and freshness are where the real breakage hides
- [ ] Do not write checks with no failure action — a test that fails into the void changes nothing
- [ ] Do not skip freshness — stale data that looks fine is the most dangerous kind
- [ ] Do not check only one table in isolation — cross-table consistency (FKs, reconciliations) catches integration bugs

## Based On

Data-quality practice — the six DQ dimensions, dbt tests / Great Expectations / source-freshness, severity-tiered enforcement.

## Example Trigger Phrases

- "Define DQ checks."
- "Catch bad data before it hits dashboards."
- "Set up monitoring for a dataset."
