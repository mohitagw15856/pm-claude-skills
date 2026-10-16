---
name: dbt-model-spec
description: "Spec a dbt model — its grain, sources, transformations, tests, and materialization. Use when asked to design a dbt model, plan a data transformation, write a staging/intermediate/mart model spec, or define dbt tests for a table. Produces a model spec — purpose & grain, lineage (sources → refs), the transformation logic, column definitions, dbt tests, materialization choice, and the skeleton SQL/YAML."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/dbt-model-spec.html
metadata:
  {
    "openclaw": { "emoji": "🛠" }
  }
---

# dbt Model Spec Skill

A dbt model is only trustworthy if its **grain** is unambiguous, its **sources** are declared, and it's
**tested**. This skill specs a model the way a good analytics engineer would — naming the grain first,
mapping lineage, defining each column, choosing the right materialization, and writing the dbt tests
that keep it correct — so the model is reviewable before a line of SQL ships.

## Required Inputs

Ask for these only if they aren't already provided:

- **What the model represents** and its **grain** (one row per ___ — the single most important decision).
- **Layer** — staging, intermediate, or mart (dimension/fact). Conventions differ per layer.
- **Sources / upstream refs** — the raw tables or models it builds on.
- **The business logic** — joins, filters, aggregations, and any business rules.

## Output Format

### dbt Model: `[model_name]`

**1. Purpose & grain** — what it is, and **one row per [grain]** stated explicitly. Layer (staging/intermediate/mart).

**2. Lineage** — `source('…')` / `ref('…')` upstreams → this model → likely downstream consumers.

**3. Transformation logic** — the joins, filters, aggregations, window functions, and business rules, in order. Flag fan-out risks (joins that break the grain).

**4. Columns** — a table: name · type · description · (key/measure/dimension). The schema contract.

| column | type | description |
|---|---|---|

**5. Tests** (dbt) — `unique` + `not_null` on the grain key, `relationships` for FKs, `accepted_values` for enums, and any custom/`dbt_utils` tests the logic needs. Tests are the model's guarantees — don't skip them.

**6. Materialization** — view / table / incremental / ephemeral, with the reasoning (incremental needs a `unique_key` + an `is_incremental()` filter).

**7. Skeleton** — a starting `model.sql` (CTE-structured: imports → logic → final select) and the `schema.yml` with tests, ready to fill in.

## Quality Checks

- [ ] The grain is stated as "one row per ___" and the key is tested unique + not_null
- [ ] Sources/refs use `source()`/`ref()`, not hard-coded table names
- [ ] Every column has a type and description (the schema contract)
- [ ] Tests cover the grain key, FKs (relationships), and enum columns
- [ ] Materialization is justified; incremental models declare a unique_key and is_incremental() logic
- [ ] Fan-out joins that could break the grain are flagged

## Anti-Patterns

- [ ] Do not leave the grain ambiguous — an untested, unclear grain is how duplicate rows and wrong metrics happen
- [ ] Do not hard-code upstream table names — use ref()/source() so lineage and environments work
- [ ] Do not ship a model with no tests — untested models silently rot; the grain key at minimum must be tested
- [ ] Do not default everything to a table — pick the materialization the use justifies (views for light, incremental for large append-only)
- [ ] Do not bury business logic without comments — the next analyst must understand the rules

## Based On

dbt / analytics-engineering best practice — explicit grain, ref/source lineage, layered modelling (staging→intermediate→mart), schema tests.

## Example Trigger Phrases

- "Design a dbt model."
- "Plan a data transformation."
- "Write a staging/intermediate/mart model spec."
- "Define dbt tests for a table."
