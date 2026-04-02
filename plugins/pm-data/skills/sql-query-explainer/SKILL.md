---
name: sql-query-explainer
description: "Explain, optimise, or translate SQL queries into plain language. Use when asked to explain a SQL query, optimise slow SQL, write a data dictionary, translate SQL to plain English for non-technical stakeholders, or review a query for correctness and performance. Works across PostgreSQL, MySQL, BigQuery, Snowflake, and standard SQL."
---

# SQL Query Explainer Skill

This skill explains SQL queries in plain language, identifies optimisation opportunities, and helps communicate data logic to non-technical stakeholders. It also writes and documents new queries from natural language descriptions.

## Modes

Detect which mode the user needs based on their request:

1. **Explain** — Translate existing SQL into plain English
2. **Optimise** — Review SQL for performance issues and suggest improvements
3. **Write** — Generate SQL from a natural language description
4. **Document** — Produce a data dictionary or query documentation

---

## Mode 1: Explain

When given a SQL query, produce:

### Plain English Summary
[1–3 sentences. What does this query do? What data does it return? Write as if explaining to a business analyst, not a developer.]

### Step-by-Step Walkthrough

Break the query into logical sections. For each section:
- Quote the SQL clause
- Explain what it does in plain English
- Flag any complexity (e.g. window functions, subqueries, CTEs)

### What the Result Looks Like

[Describe the shape of the output: "Returns one row per user, with columns for X, Y, Z. Ordered by [field] descending."]

### Potential Issues to Flag

- [Gotchas, edge cases, or implicit assumptions in this query]
- [e.g. "This will include NULLs in the user_id column if the LEFT JOIN finds no match"]

---

## Mode 2: Optimise

When asked to optimise a query, produce:

### Performance Assessment

Rate overall: 🟢 Well-optimised / 🟡 Some improvements possible / 🔴 Significant issues

### Issues Found

For each issue:

**Issue [N]: [Short name, e.g. "Missing index on join column"]**
- **What it is:** [Plain explanation]
- **Why it matters:** [Performance impact — e.g. "Full table scan on a 10M row table"]
- **Fix:**
```sql
-- Before
[original snippet]

-- After
[improved snippet]
```
- **Expected improvement:** [Estimate if possible]

### Optimisation Checklist

- [ ] SELECT * used? (Replace with specific columns)
- [ ] Implicit type conversions on JOIN/WHERE columns?
- [ ] Missing indexes on JOIN or WHERE columns?
- [ ] N+1 patterns (queries inside loops)?
- [ ] DISTINCT used where GROUP BY would be faster?
- [ ] Window functions used where a subquery would be clearer/faster?
- [ ] CTEs re-used or materialised unnecessarily?
- [ ] Large IN() lists that could use a JOIN instead?

---

## Mode 3: Write

When given a natural language description, generate the SQL query and then explain it using Mode 1.

Ask the user to confirm:
- **Database/dialect** (PostgreSQL / MySQL / BigQuery / Snowflake / SQLite / Standard SQL)
- **Table and column names** (if known; otherwise use descriptive placeholder names like `users`, `orders`, `user_id`)
- **Any filters, sorting, or aggregation requirements**

Produce:
1. The SQL query with inline comments
2. Plain English explanation (Mode 1 format)

---

## Mode 4: Document

When asked to create documentation for a query or table:

### Query Documentation

```
Query: [Name]
Purpose: [One sentence — what business question this answers]
Author: [If provided]
Last reviewed: [If provided]

Inputs:
  - Table: [table_name] — [what it contains]
  - Filter: [any WHERE conditions and their business meaning]

Output columns:
  | Column | Type | Description |
  |--------|------|-------------|
  | [name] | [type] | [plain English description] |

Assumptions:
  - [Any implicit assumptions the query makes]

Known limitations:
  - [Edge cases not handled, data quality dependencies, etc.]
```

---

## Quality Checks

- [ ] Plain English explanation avoids SQL jargon
- [ ] Optimisation suggestions include before/after SQL
- [ ] Written queries include inline comments
- [ ] Output shape is described (columns, row grain, ordering)
- [ ] Dialect-specific syntax is flagged when non-standard

## Example Trigger Phrases

- "Explain this SQL query: [paste query]"
- "Optimise this slow query: [paste query]"
- "Write a SQL query that [natural language description]"
- "Document this query for my non-technical stakeholders"
- "Why is this query returning unexpected results?"
