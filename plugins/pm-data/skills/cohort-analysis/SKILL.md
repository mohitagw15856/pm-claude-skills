---
name: cohort-analysis
description: "Structure a cohort analysis for retention, LTV, or behavioural patterns. Use when asked to run a cohort analysis, analyse retention by cohort, segment users by behaviour over time, or calculate lifetime value by acquisition period. Produces a complete cohort analysis framework with methodology, cohort definitions, retention curves, and prioritised interventions."
---

# Cohort Analysis Skill

This skill produces a structured cohort analysis covering retention curves, LTV estimation, behavioural segmentation, and actionable interventions. Output is ready to present to product leadership or share with growth and data teams.

## Required Inputs

Ask the user for these if not provided:
- **Analysis goal** (retention improvement / LTV modelling / behavioural segmentation / churn prediction)
- **Product or feature being analysed**
- **Cohort definition** — what groups users? (acquisition month, signup channel, plan tier, feature adoption)
- **Observation window** — how many periods to track? (e.g. 12 months, 8 weeks)
- **Key metric** — what are you measuring per cohort? (retention rate, revenue, engagement score, feature usage)
- **Available data** — what tables/metrics are available? (paste schema or describe)
- **Baseline** — any existing retention benchmarks or goals?

## Output Structure

---

# Cohort Analysis: [Product / Feature]

**Analysis type:** [Retention / LTV / Behavioural / Churn]
**Cohort definition:** [Acquisition month / Signup channel / Plan tier / Feature adoption date]
**Observation window:** [X months / weeks]
**Primary metric:** [Metric name]
**Date prepared:** [Date]

---

## 1. Cohort Definitions

| Cohort | Period | Size | Description |
|---|---|---|---|
| [Cohort 1] | [Jan 2025] | [N users] | [e.g. Users who signed up in Jan 2025 via organic] |
| [Cohort 2] | [Feb 2025] | [N users] | [...] |

**Cohort logic:**
- Cohort entry event: [First sign-up / First purchase / Feature activation]
- Cohort exit criteria: [Churned / Downgraded / No activity for 30 days]
- Exclusions: [Trial users / Internal test accounts / Users with < X days of data]

---

## 2. Retention Curve

**How to read:** Each cell shows what % of the cohort performed the key metric in period N.

| Cohort | Period 0 | Period 1 | Period 2 | Period 3 | Period 6 | Period 12 |
|---|---|---|---|---|---|---|
| Jan 2025 | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| Feb 2025 | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| [Trend] | — | [↑/↓ vs prior] | [...] | [...] | [...] | [...] |

**Retention plateau:** [At what period does retention flatten? What % does it flatten at?]

**Key observations:**
- [e.g. Period 1 → Period 2 drop is the largest — average X% churn in first 30 days]
- [e.g. Cohorts acquired via [channel] retain X% better at Period 6]
- [e.g. Retention has improved from X% → Y% at Period 3 comparing oldest to newest cohort]

---

## 3. LTV Projection (if applicable)

**ARPU per period:** [£/$/€ X per active user per month]
**Retention curve used:** [Which cohort or blended average]

| Period | Retained % | Revenue per user | Cumulative LTV |
|---|---|---|---|
| Month 1 | [X%] | [£X] | [£X] |
| Month 3 | [X%] | [£X] | [£X] |
| Month 6 | [X%] | [£X] | [£X] |
| Month 12 | [X%] | [£X] | [£X] |

**Blended LTV:** [£X at 12 months — based on blended retention across cohorts]

**LTV by segment:**
| Segment | LTV (12M) | vs Baseline |
|---|---|---|
| [Organic] | [£X] | [+X%] |
| [Paid] | [£X] | [-X%] |
| [Enterprise] | [£X] | [+X%] |

---

## 4. Behavioural Segmentation

Group cohorts by behaviour patterns, not just acquisition date:

| Segment | Definition | Size | Retention (P6) | LTV (12M) |
|---|---|---|---|---|
| **Power users** | [Used core feature ≥ 3x/week in first 30 days] | [X%] | [X%] | [£X] |
| **Casual users** | [Used 1–2x/week in first 30 days] | [X%] | [X%] | [£X] |
| **Dormant** | [Logged in but did not use core feature] | [X%] | [X%] | [£X] |
| **Never activated** | [Signed up but never completed onboarding] | [X%] | [X%] | [£X] |

**Activation threshold insight:** [What action — taken within the first X days — most strongly predicts retention? This is the "aha moment" to optimise for.]

---

## 5. Leading Indicators of Churn

List the signals that appear **before** users churn, so teams can intervene:

| Signal | How early does it appear? | Churn correlation | Intervention |
|---|---|---|---|
| [No login for 7 days] | [7 days before churn] | [Strong] | [Re-engagement email sequence] |
| [Support ticket with escalation] | [14 days before churn] | [Moderate] | [CSM outreach within 48 hours] |
| [Feature usage dropped >50% WoW] | [10 days before churn] | [Strong] | [In-app nudge with use-case tutorial] |

---

## 6. Cohort Comparison: What's Changed Over Time

Compare oldest and newest cohorts to assess whether product improvements are showing up in retention:

| Metric | [Oldest cohort — e.g. Jan 2024] | [Newest cohort — e.g. Jan 2025] | Change |
|---|---|---|---|
| Period 1 retention | [X%] | [X%] | [↑/↓ X pp] |
| Period 3 retention | [X%] | [X%] | [↑/↓ X pp] |
| Activation rate | [X%] | [X%] | [↑/↓ X pp] |
| Avg. sessions in first 30 days | [X] | [X] | [↑/↓] |

**Verdict:** [Are more recent cohorts performing better or worse? What shipped in that period that might explain the change?]

---

## 7. Recommendations

Prioritise by impact on retention curve:

| # | Recommendation | Target segment | Expected impact | Effort | Priority |
|---|---|---|---|---|---|
| 1 | [e.g. Redesign onboarding to hit activation milestone in day 1, not day 7] | [Never-activated segment] | [+X pp P1 retention] | [Medium] | P1 |
| 2 | [e.g. Launch re-engagement sequence at day 7 inactivity trigger] | [Dormant segment] | [+X pp P2 retention] | [Low] | P1 |
| 3 | [e.g. Introduce power-user features earlier to accelerate habit formation] | [Casual users] | [+X pp P6 LTV] | [High] | P2 |

---

## 8. SQL Reference (if applicable)

Provide the core cohort query so data teams can replicate or extend the analysis:

```sql
-- Retention cohort query
SELECT
  DATE_TRUNC('month', u.created_at) AS cohort_month,
  DATE_TRUNC('month', e.event_date) AS activity_month,
  DATEDIFF('month', u.created_at, e.event_date) AS period,
  COUNT(DISTINCT e.user_id) AS retained_users,
  COUNT(DISTINCT c.user_id) AS cohort_size,
  ROUND(COUNT(DISTINCT e.user_id) * 100.0 / COUNT(DISTINCT c.user_id), 1) AS retention_rate
FROM users u
JOIN events e ON u.user_id = e.user_id
JOIN (
  SELECT user_id, DATE_TRUNC('month', created_at) AS cohort_month
  FROM users
  WHERE created_at >= '[start_date]'
) c ON u.user_id = c.user_id AND DATE_TRUNC('month', u.created_at) = c.cohort_month
WHERE e.event_type = '[key_retention_event]'
GROUP BY 1, 2, 3
ORDER BY 1, 3;
```

---

## Quality Checks

- [ ] Cohort definition is unambiguous — the same user cannot appear in two cohorts
- [ ] Retention curve shows a clear plateau, or the analysis notes that the window is too short to see one
- [ ] LTV projection uses observed retention, not assumed
- [ ] Behavioural segments are mutually exclusive and exhaustive
- [ ] Recommendations are tied to specific cohort or segment findings — not generic growth advice
- [ ] Leading indicators are observable in production data, not just in theory

## Anti-Patterns

- [ ] Do not allow the same user to appear in multiple cohorts — overlapping cohorts produce retention numbers that cannot be compared or acted upon
- [ ] Do not assume assumed ARPU in LTV projections — use observed revenue per retained user per period, not a blended average that hides segment differences
- [ ] Do not draw conclusions from cohorts too small to be statistically meaningful — flag minimum cohort size thresholds and note when a cohort is too small to trust
- [ ] Do not conflate retention rate with engagement rate — a user who logs in but does not complete the key retention event is not retained by the definition used
- [ ] Do not make recommendations without connecting them to specific cohort or segment findings — generic growth advice that could apply to any product adds no value

## Example Trigger Phrases

- "Run a cohort analysis for our SaaS product"
- "Analyse retention by acquisition month for the last 12 cohorts"
- "What's the LTV of users who came via paid vs organic?"
- "Build a cohort retention model showing period 0 through period 12"
- "Segment users by behaviour and show me which group retains best"
