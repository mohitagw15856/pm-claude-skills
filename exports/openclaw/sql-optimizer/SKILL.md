---
name: sql-optimizer
description: "Diagnose a slow SQL query and produce a concrete optimization plan. Use when asked to optimize SQL, speed up a slow query, reduce a query's cost/scan, fix a timeout, or review a query plan. Produces an analysis — the likely bottleneck, what the plan is doing wrong (full scans, bad joins, spills), the specific rewrite and index/partition changes, and the expected impact, with the optimized query."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/sql-optimizer.html
metadata:
  {
    "openclaw": { "emoji": "🛠" }
  }
---

# SQL Optimizer Skill

A slow query almost always has a specific, findable cause — a missing index, a non-sargable predicate, a
join that explodes rows, a scan that should be a seek. This skill diagnoses it: read what the query (and
plan, if given) is actually doing, name the bottleneck, and produce a concrete rewrite plus the index /
partition / structural changes — with the expected impact, not vague "add indexes" advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **The query** (and the engine — Postgres, BigQuery, Snowflake, MySQL… optimizations differ).
- **The symptom** — slow, expensive (bytes scanned), timing out, or just under review.
- **Context if available** — `EXPLAIN`/query plan, table sizes/row counts, existing indexes, partitioning/clustering.

## Output Format

### SQL Optimization: [query purpose]

**1. What it's doing now** — read the query (and plan): the scans, joins, sorts, and where the time/cost goes. Name the **primary bottleneck** (don't list ten micro-tweaks — find the one that matters).

**2. The problems** — ranked, each with *why* it's slow:
- Non-sargable predicates (functions on indexed columns, leading wildcards) → can't use an index.
- Missing/`wrong index or partition pruning; full scans where a seek is possible.
- Join issues — fan-out, wrong join order, missing join keys, `SELECT *` pulling everything.
- Sorts/spills, `DISTINCT`/`GROUP BY` on high-cardinality, correlated subqueries that should be joins.
- Engine-specific: BigQuery/Snowflake → bytes scanned (partition/cluster pruning), not row counts.

**3. The fix** — the **rewritten query**, plus the index / partition / clustering / materialization changes. Be specific (`CREATE INDEX … ON … (cols)`, partition on `event_date`).

**4. Expected impact** — roughly what each change buys (seek vs. scan, pruning N% of partitions, removing a sort) and how to verify (re-run `EXPLAIN`, compare bytes/rows).

## Quality Checks

- [ ] Names the single primary bottleneck, not a scattershot list
- [ ] Predicates are checked for sargability (no functions on indexed columns, no leading `%`)
- [ ] Index/partition recommendations are specific (exact columns), not "add an index"
- [ ] For columnar/cloud engines, addresses bytes scanned & pruning, not just row counts
- [ ] Provides the rewritten query and a way to verify the improvement

## Anti-Patterns

- [ ] Do not say "add indexes" generically — name the columns and explain which predicate/join they serve
- [ ] Do not ignore the engine — Postgres index tuning and BigQuery partition pruning are different games
- [ ] Do not optimize a query that should be a model — repeated heavy logic belongs in a materialized/dbt model
- [ ] Do not wrap indexed columns in functions in the WHERE clause — it kills index usage (non-sargable)
- [ ] Do not recommend changes without an expected impact or a way to measure it

## Based On

Query-optimization practice — sargability, index/partition pruning, join-order and fan-out, plan reading, columnar bytes-scanned tuning.

## Example Trigger Phrases

- "Speed up a slow query."
- "Reduce a query's cost/scan."
- "Fix a timeout."
- "Review a query plan."
