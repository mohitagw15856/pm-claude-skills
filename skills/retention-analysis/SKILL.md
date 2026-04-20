---
name: retention-analysis
description: "Structure a retention analysis, churn investigation, or engagement deep-dive for any product team. Use when asked to analyse user retention, investigate churn, measure DAU/MAU, or build a retention improvement plan. Produces a retention snapshot with root cause hypotheses, aha-moment correlation, and prioritised interventions."
---

# Retention Analysis Skill

Diagnose why users leave, identify what keeps them, and recommend specific, testable interventions — not vague "improve onboarding" suggestions.

## Retention Fundamentals

**The retention curve has two components:**
1. **Steepness of initial drop** (D1–D7) — onboarding problem
2. **Long-term floor level** — product-market fit indicator

A product with PMF has a retention curve that flattens. If it trends to zero, you have a PMF problem, not an onboarding problem. Name this distinction explicitly.

---

## Retention Metrics Definitions

| Metric | Formula | What It Tells You |
|---|---|---|
| D1 Retention | Users who return on day 2 ÷ new users day 1 | Quality of first experience |
| D7 Retention | Users active on day 8 ÷ users who joined 7 days ago | Early habit formation |
| D30 Retention | Users active on day 31 ÷ users who joined 30 days ago | Product-market fit signal |
| DAU/MAU Ratio | Daily active users ÷ monthly active users | Stickiness (>20% good, >50% excellent) |
| Churn Rate | Users lost in period ÷ users at start of period | Monthly or annual |
| Net Revenue Retention | MRR at end of period ÷ MRR at start (same cohort) | Revenue health including expansion |

---

## Retention Investigation Framework

### Step 1: Segment the problem
Don't analyse "retention" — analyse retention for specific cohorts:
- New vs returning users
- Paid vs free
- Acquisition channel (organic vs paid vs referral)
- Onboarding path completed vs not
- Feature usage (power users vs lurkers)

### Step 2: Find the inflection points
Where does the drop happen? D1? D7? Month 3?
- D1 drop → First session experience
- D7 drop → Habit loop not formed
- D30 drop → Value not delivered at depth
- Month 3+ drop → Boredom, competition, or lifecycle event

### Step 3: Identify the "aha moment" correlation
Which early behaviour predicts long-term retention?
- Run correlation: users who did [X] in first 7 days vs 30-day retention
- Common patterns: connected an integration, invited a teammate, completed a core action N times

### Step 4: Qualify the churn
Interview churned users — never skip this. Survey data alone is insufficient.
- "What was the trigger that led you to cancel/stop?"
- "What were you trying to accomplish that you couldn't?"
- "What would need to change for you to come back?"

---

## Output Format

### Retention Analysis — [Product/Segment] — [Date]

**Question:** [Specific retention question being answered]
**Period Analysed:** [Date range]
**Segment:** [Which users]

---

**Current Retention Snapshot:**

| Metric | Current | Industry Benchmark | Status |
|---|---|---|---|
| D1 Retention | [X%] | 25–40% | 🔴/🟡/🟢 |
| D7 Retention | [X%] | 10–25% | 🔴/🟡/🟢 |
| D30 Retention | [X%] | 5–15% | 🔴/🟡/🟢 |
| DAU/MAU | [X%] | 10–20% typical | 🔴/🟡/🟢 |

**Retention Curve Shape:** [Flattening / Still declining / Trending to zero]
**PMF Signal:** [Strong / Weak / Absent — based on curve shape]

---

**Root Cause Hypotheses:**

| Hypothesis | Evidence | Confidence | Test |
|---|---|---|---|
| [Cause] | [Data point] | H/M/L | [How to validate] |

**"Aha Moment" Correlation:**
Users who [specific action] in first [N] days retain at [X%] vs [Y%] for those who don't.

---

**Recommended Interventions:**

| Intervention | Target Drop | Expected Lift | Effort | Priority |
|---|---|---|---|---|
| [Specific change] | D1 / D7 / D30 | [X%] | S/M/L | 1/2/3 |

**Monitoring Plan:**
- Metric to track: [X]
- Review cadence: [Weekly / Monthly]
- Alert threshold: [If X drops below Y, investigate immediately]

---

## Required Inputs

Ask the user for these if not provided:
- **Product and business model** (SaaS / consumer app / marketplace / other)
- **Current retention metrics** (D1, D7, D30 if available)
- **Segment to analyse** (all users / paid / free / a specific cohort)
- **Key question to answer** (why is retention dropping? what drives retention?)
- **Available data** (analytics events, churn surveys, interview notes)

## Quality Checks

- [ ] Retention curve shape is diagnosed (flattening vs trending to zero = PMF vs onboarding)
- [ ] Cohorts are segmented before analysis (not all users lumped together)
- [ ] "Aha moment" correlation is identified or flagged as unknown
- [ ] Interventions are specific (not "improve onboarding")
- [ ] Churned user interviews are recommended (not just data analysis)
- [ ] Monitoring plan includes an alert threshold

## Guidelines

- Never recommend "improve onboarding" without specifying *what* to change and *why*
- Benchmark against industry — consumer apps, SaaS, and marketplaces have very different retention norms
- If DAU/MAU is below 5%, that's a PMF conversation, not a retention tactics conversation
- Always recommend talking to churned users — no amount of data replaces understanding the *reason*
