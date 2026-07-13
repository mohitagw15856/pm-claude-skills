---
name: "Structure a cohort analysis for retention, LTV, or behaviour"
description: "Structure a cohort analysis for retention, LTV, or behavioural patterns. Use when asked to run a cohort analysis, analyse retention by cohort, segment users by behaviour over time, or calculate lifetime value by acquisition period. Produces a complete cohort analysis framework with methodology, cohort definitions, retention curves, and prioritised interventions."
---

# Cohort Analysis Skill

Produces a structured cohort analysis covering retention curves, LTV estimation, behavioural segmentation, leading churn indicators, and prioritised interventions. Output is ready to present to product leadership or share with growth and data teams.

---

## Required Inputs

**Ask for any of these that are missing before starting. Do not fabricate numbers, benchmarks, or schema details.**

| Input | What to ask if missing |
|---|---|
| **Analysis goal** | Retention improvement / LTV modelling / behavioural segmentation / churn prediction — pick one primary goal |
| **Product or feature** | What is being analysed? |
| **Cohort definition** | What groups users into a cohort? (acquisition month, signup channel, plan tier, feature adoption date) |
| **Observation window** | How many periods to track? (e.g. 12 months, 8 weeks) |
| **Key metric** | What is measured per cohort? (retention rate, revenue, engagement score, feature usage) |
| **Available data** | Paste schema, table names, or describe what metrics exist — do not assume |
| **Baseline or goal** | Any existing retention benchmarks or targets to compare against? |

If the user cannot supply actual data, produce the framework with clearly marked placeholders (`[X%]`, `[£X]`, `[N users]`) and note which sections require real data to complete.

---

## Process

Follow these steps in order:

1. **Confirm inputs** — surface any ambiguities before producing output (e.g. conflicting cohort definitions, missing observation window).
2. **Define cohorts** — establish entry event, exit criteria, and exclusions so cohorts are mutually exclusive.
3. **Build retention table** — populate or template the period-by-period matrix; identify the plateau period.
4. **Project LTV** — use observed retention data only; flag if data is insufficient.
5. **Segment by behaviour** — create mutually exclusive behavioural segments; identify the activation threshold.
6. **Surface leading churn signals** — list observable signals with lead time and intervention mapping.
7. **Compare cohorts over time** — assess whether product changes are showing up in newer cohorts.
8. **Prioritise recommendations** — tie every recommendation to a specific cohort or segment finding.
9. **Provide SQL reference** — adapt the template query to the user's actual schema if supplied.
10. **Run quality checks** — verify all checklist items before delivering output.

---

## Output Template

Produce the following sections in order. Omit a section only if explicitly out of scope; note the omission.

---

# Cohort Analysis: [Product / Feature]

**Analysis goal:** [Retention / LTV / Behavioural segmentation / Churn prediction]
**Cohort definition:** [e.g. Acquisition month — users grouped by calendar month of first sign-up]
**Observation window:** [X months / weeks]
**Primary metric:** [Metric name and definition]
**Data source:** [Tables or metrics used — do not invent if not supplied]
**Date prepared:** [Date]

---

## 1. Cohort Definitions

| Cohort | Period | Size | Description |
|---|---|---|---|
| [Cohort 1] | [Jan 2025] | [N users] | [e.g. Users who signed up in Jan 2025 via organic search] |
| [Cohort 2] | [Feb 2025] | [N users] | [Description] |

**Cohort logic:**
- **Entry event:** [e.g. First sign-up / First purchase / Feature activation]
- **Exit / churn definition:** [e.g. No activity matching key retention event for 30 days]
- **Exclusions:** [e.g. Internal test accounts, trial users with < 3 days of data, cohorts with < [N] users — see anti-patterns]

> **Note:** If any cohort falls below the minimum size threshold for statistical reliability, flag it explicitly and exclude it from trend conclusions.

---

## 2. Retention Curve

**How to read:** Each cell shows the percentage of the cohort that performed the key retention event in period N. Period 0 = 100% by definition.

| Cohort | P0 | P1 | P2 | P3 | P6 | P12 |
|---|---|---|---|---|---|---|
| [Jan 2025] | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| [Feb 2025] | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| [Trend vs prior cohort] | — | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] |

**Retention plateau:** [At what period does the curve flatten? What % does it flatten at? If the observation window is too short to show a plateau, state this explicitly.]

**Key observations:**
- [e.g. The largest single-period drop is P1 → P2, averaging X pp — this is the primary churn moment to address]
- [e.g. Cohorts acquired via [channel] show X pp higher retention at P6 vs the overall average]
- [e.g. Retention at P3 has moved from X% (oldest cohort) to Y% (newest cohort) — a change of Z pp]

**Retention chart** — render one line per cohort, period on x-axis:

```chart
{
  "type": "line",
  "title": "Retention by cohort (%)",
  "labels": ["P0", "P1", "P2", "P3", "P6", "P12"],
  "series": [
    { "name": "[Cohort 1]", "data": [100, "[X]", "[X]", "[X]", "[X]", "[X]"] },
    { "name": "[Cohort 2]", "data": [100, "[X]", "[X]", "[X]", "[X]", "[X]"] }
  ]
}
```

---

## 3. LTV Projection

> Skip this section if revenue data is not available. Do not estimate ARPU without a data source — note the gap and ask for it.

**ARPU per period:** [Currency and amount per active user per period — sourced from: X]
**Retention curve used:** [Which cohort or blended average, and why]

| Period | Retained % | Revenue per retained user | Cumulative LTV |
|---|---|---|---|
| Month 1 | [X%] | [£X] | [£X] |
| Month 3 | [X%] | [£X] | [£X] |
| Month 6 | [X%] | [£X] | [£X] |
| Month 12 | [X%] | [£X] | [£X] |

**Blended LTV at 12M:** [£X — specify which cohorts and weighting method]

**LTV by segment:**

| Segment | LTV (12M) | vs Blended baseline | Key driver of difference |
|---|---|---|---|
| [Organic] | [£X] | [+X%] | [e.g. Higher P6 retention] |
| [Paid] | [£X] | [-X%] | [e.g. Lower activation rate] |
| [Enterprise] | [£X] | [+X%] | [e.g. Higher ARPU per period] |

---

## 4. Behavioural Segmentation

Segments are defined by what users did, not when they arrived. Segments must be mutually exclusive and collectively exhaustive within the analysed population.

| Segment | Definition | % of cohort | Retention (P6) | LTV (12M) |
|---|---|---|---|---|
| **Power users** | [e.g. Completed core action ≥ 3×/week in first 30 days] | [X%] | [X%] | [£X] |
| **Casual users** | [e.g. Completed core action 1–2×/week in first 30 days] | [X%] | [X%] | [£X] |
| **Dormant** | [e.g. Logged in but never completed core action] | [X%] | [X%] | [£X] |
| **Never activated** | [e.g. Signed up but never completed onboarding step 1] | [X%] | [X%] | [£X] |

**Activation threshold (the "aha moment"):** [What specific action, taken within the first X days, most strongly predicts long-term retention? Source this from the data — do not assume a generic answer.]

---

## 5. Leading Indicators of Churn

Signals that appear **before** users churn, enabling pre-emptive intervention. All signals listed must be observable in production data — flag any that are theoretical only.

| Signal | Lead time before churn | Correlation strength | Recommended intervention |
|---|---|---|---|
| [e.g. No login for 7 consecutive days] | [7 days] | [Strong / Moderate / Weak] | [e.g. Automated re-engagement email at day 7] |
| [e.g. Support ticket with unresolved escalation] | [~14 days] | [Moderate] | [e.g. CSM outreach within 48 hours of escalation] |
| [e.g. Core feature usage dropped >50% week-on-week] | [~10 days] | [Strong] | [e.g. In-app prompt linking to use-case tutorial] |

> **Data requirement:** Correlation strength must come from observed data. If unavailable, mark as [Hypothesis — not yet validated] and recommend an A/B test or survival analysis to confirm.

---

## 6. Cohort Comparison: Trend Over Time

Assess whether product changes are visible in retention outcomes for newer cohorts.

| Metric | [Oldest cohort] | [Newest cohort] | Change | Notes |
|---|---|---|---|---|
| P1 retention | [X%] | [X%] | [↑/↓ X pp] | |
| P3 retention | [X%] | [X%] | [↑/↓ X pp] | |
| Activation rate | [X%] | [X%] | [↑/↓ X pp] | |
| Avg. sessions, first 30 days | [X] | [X] | [↑/↓] | |

**Verdict:** [Are more recent cohorts performing better or worse? What shipped during this period that could explain the change? If no causal explanation is available, state that — do not invent one.]

---

## 7. Recommendations

Every recommendation must reference a specific cohort, segment, or signal from sections above. Generic advice that could apply to any product must be cut.

| # | Recommendation | Anchored to finding | Target segment | Expected impact | Effort | Priority |
|---|---|---|---|---|---|---|
| 1 | [Specific action] | [Section X, finding Y] | [Segment] | [e.g. +X pp P1 retention — basis for estimate] | [Low / Med / High] | P1 |
| 2 | [Specific action] | [Section X, finding Y] | [Segment] | [e.g. +X pp P3 retention] | [Low / Med / High] | P1 |
| 3 | [Specific action] | [Section X, finding Y] | [Segment] | [e.g. +£X LTV at 12M] | [Low / Med / High] | P2 |

> If expected impact cannot be estimated from available data, say so — do not fabricate a percentage lift.

---

## 8. SQL Reference

Adapt this template to the user's actual schema if supplied. Replace placeholder table and column names — do not ship a query the user cannot run.

```sql
-- Retention cohort query
-- Replace: users, events, created_at, event_date, user_id, event_type, [start_date], [key_retention_event]
SELECT
  DATE_TRUNC('month', u.created_at)    AS cohort_month,
  DATE_TRUNC('month', e.event_date)    AS activity_month,
  DATEDIFF('month', u.created_at, e.event_date) AS period,
  COUNT(DISTINCT e.user_id)            AS retained_users,
  COUNT(DISTINCT c.user_id)            AS cohort_size,
  ROUND(
    COUNT(DISTINCT e.user_id) * 100.0
    / NULLIF(COUNT(DISTINCT c.user_id), 0), 1
  )                                    AS retention_rate
FROM users u
JOIN (
  SELECT user_id, DATE_TRUNC('month', created_at) AS cohort_month
  FROM users
  WHERE created_at >= '[start_date]'
) c ON u.user_id = c.user_id
   AND DATE_TRUNC('month', u.created_at) = c.cohort_month
JOIN events e
  ON u.user_id = e.user_id
 AND e.event_type = '[key_retention_event]'
GROUP BY 1, 2, 3
ORDER BY 1, 3;
```

**Adapt for your stack:** BigQuery uses `DATE_DIFF`; Redshift uses `DATEDIFF`; Snowflake uses `DATEDIFF` or `TIMESTAMPDIFF`. Confirm dialect before running.

---

## Quality Checks

Run all checks before delivering output. Do not mark a check as passed unless it is verifiably true given the supplied data.

- [ ] **Mutual exclusivity:** No user can appear in two cohorts — entry event and date boundaries are unambiguous
- [ ] **Retention plateau:** The curve shows a visible plateau, or the analysis explicitly states the window is too short to confirm one
- [ ] **LTV grounding:** LTV projections use observed retention and observed ARPU — not assumed figures
- [ ] **Behavioural segments:** Mutually exclusive and collectively exhaustive — every user in scope falls into exactly one segment
- [ ] **Minimum cohort size:** Any cohort below the reliability threshold is flagged and excluded from trend conclusions
- [ ] **Churn signals:** All leading indicators listed are observable in production data, or explicitly marked as hypotheses
- [ ] **Recommendations anchored:** Every recommendation references a specific finding — no free-floating growth advice
- [ ] **SQL adapted:** Query uses the user's actual table/column names if schema was provided

---

## Anti-Patterns

Avoid these failure modes — they produce analysis that looks rigorous but cannot be trusted or acted upon.

| Anti-pattern | Why it fails | Correct approach |
|---|---|---|
| Overlapping cohort membership | Retention numbers across cohorts cannot be compared | Define a single, unambiguous entry event; one user, one cohort |
| Assumed ARPU in LTV projections | Hides segment differences; produces a number that sounds precise but isn't | Use observed revenue per retained user per period, broken out by segment |
| Drawing conclusions from undersized cohorts | Random variation masquerades as signal | Flag minimum cohort size; exclude or caveat cohorts below threshold |
| Conflating login with retention | A user who logs in but does not complete the key event is not retained by definition | Retention = completion of the defined key retention event, not a session |
| Fabricating lift estimates | Projected impact numbers without a data basis mislead prioritisation decisions | If impact cannot be estimated from data, say so and recommend a test |
| Generic recommendations | Advice that could apply to any SaaS product adds no analytical value | Every recommendation must reference a specific cohort, segment, or signal finding |

---

## Trigger Phrases

This skill activates on phrases including:

- "Run a cohort analysis for [product]"
- "Analyse retention by acquisition month"
- "What's the LTV of users from [channel] vs [channel]?"
- "Build a cohort retention model from
