---
name: churn-analysis
description: "Produce a structured churn analysis that separates avoidable from unavoidable churn. Use when investigating why customers are leaving, identifying at-risk segments, calculating net revenue retention, or building a retention intervention plan. Produces a churn report with rate calculations, categorised reasons by avoidability, segment breakdown, timing analysis, early warning signals, and prioritised interventions ranked by estimated impact."
---

# Churn Analysis Skill

Produce a structured churn analysis that goes beyond the headline rate — identifying why customers leave, which segments are most at risk, and what interventions will have the highest impact on retention.

## Required Inputs

Ask for these if not already provided:
- **Time period** being analysed (e.g. Q1, last 12 months)
- **Total customers at start of period** and **customers churned**
- **ARR or revenue lost** to churn
- **Churn reasons data** — exit survey results, CSM notes, support data, or sales loss reasons
- **Customer segments** — by tier, industry, cohort, or product line
- **Current retention rate** if known
- **Any recent changes** — pricing, product, support model — that may have affected churn

## Churn Categories

Always classify churn before analysing it:

| Category | Definition |
|---|---|
| **Voluntary — avoidable** | Customer left due to a problem we could have addressed (product gaps, poor onboarding, relationship failures) |
| **Voluntary — unavoidable** | Customer left for reasons outside our control (budget cuts, acquisition, company shutdown) |
| **Involuntary** | Payment failure, contract non-renewal by mistake, admin error |

The interventions for each category are different. Conflating them leads to wrong conclusions.

## Output Format

---

# Churn Analysis: [Product / Segment / Company]
**Period:** [Start date] — [End date]
**Prepared by:** [Name] | **Date:** [Date]

---

## Headline Numbers

| Metric | Value |
|---|---|
| Customers at start of period | [N] |
| Customers churned | [N] |
| **Customer churn rate** | **[X]%** |
| ARR at start of period | £/$/€[X] |
| ARR lost to churn | £/$/€[X] |
| **Revenue churn rate (gross)** | **[X]%** |
| ARR from expansions (same period) | £/$/€[X] |
| **Net revenue retention (NRR)** | **[X]%** |

**Benchmark context:**
- Customer churn rate: [X]% vs. industry benchmark [Y]% — [above / below / in line]
- NRR: [X]% — [What this means: above 100% = expansion offsets churn; below 100% = shrinking base]

---

## Churn Breakdown by Category

| Category | Customers | % of churn | ARR lost |
|---|---|---|---|
| Voluntary — avoidable | [N] | [X]% | £/$/€[X] |
| Voluntary — unavoidable | [N] | [X]% | £/$/€[X] |
| Involuntary | [N] | [X]% | £/$/€[X] |
| **Total** | **[N]** | **100%** | **£/$/€[X]** |

**Avoidable churn as % of total churn:** [X]% — this is the number we can actually influence.

---

## Churn Reasons — Avoidable Churn Only

Rank by frequency. Include ARR weight where data allows.

| Reason | Count | % of avoidable churn | ARR lost | Representative quote |
|---|---|---|---|---|
| [Reason 1 — e.g. "Product missing key feature"] | [N] | [X]% | £/$/€[X] | "[Quote]" |
| [Reason 2] | [N] | [X]% | £/$/€[X] | "[Quote]" |
| [Reason 3] | [N] | [X]% | £/$/€[X] | "[Quote]" |
| [Reason 4] | [N] | [X]% | £/$/€[X] | "[Quote]" |
| Other | [N] | [X]% | £/$/€[X] | — |

**Theme synthesis:** [2–3 sentences grouping the top reasons into 2–3 themes. E.g. "The top three reasons cluster around two themes: product gaps in [area] (affecting X% of avoidable churn) and onboarding failures where customers never achieved value (Y%)."]

---

## Churn by Segment

Identify which segments over- or under-index for churn.

### By Tier

| Tier | Churn rate | vs. Overall | Notes |
|---|---|---|---|
| Enterprise | [X]% | +/-[X]pp | |
| Mid-Market | [X]% | +/-[X]pp | |
| SMB | [X]% | +/-[X]pp | |

### By Cohort (Acquisition Year)

| Cohort | Churn rate | Notes |
|---|---|---|
| [Year 1] | [X]% | |
| [Year 2] | [X]% | |
| [Year 3] | [X]% | |

### By Industry / Use Case (if data available)

| Segment | Churn rate | Notes |
|---|---|---|
| [Segment 1] | [X]% | |
| [Segment 2] | [X]% | |

**Key pattern:** [Which segment has the highest churn rate and what likely explains it]

---

## Timing Analysis

- **Average contract length before churn:** [X months]
- **Highest-risk moment:** [e.g. "Month 3 — when trial value has worn off but full adoption hasn't happened"]
- **Churn timing distribution:**

| When churn occurred | % of churned accounts |
|---|---|
| 0–3 months | [X]% |
| 3–6 months | [X]% |
| 6–12 months | [X]% |
| 12+ months | [X]% |

---

## Early Warning Signals

Based on the churned accounts, identify the signals that preceded churn (and could have triggered earlier intervention):

| Signal | Lead time before churn | How to detect |
|---|---|---|
| [Signal 1 — e.g. "DAU/MAU dropped below 15%"] | [~X weeks] | [Usage dashboard / alert] |
| [Signal 2 — e.g. "No QBR in 90+ days"] | [~X weeks] | [CRM flag] |
| [Signal 3 — e.g. "Champion left the account"] | [~X weeks] | [LinkedIn alert / CSM tracking] |
| [Signal 4] | [~X weeks] | [Detection method] |

---

## Intervention Recommendations

Ranked by estimated impact × feasibility.

| Intervention | Addresses | Est. churn reduction | Effort | Owner |
|---|---|---|---|---|
| [Intervention 1 — e.g. "Improve onboarding for [segment] with dedicated 30-day check-in"] | [Reason 1] | [X accounts / £X ARR] | Low / Med / High | [Team] |
| [Intervention 2] | [Reason 2] | [X accounts / £X ARR] | Low / Med / High | [Team] |
| [Intervention 3] | [Reason 3] | [X accounts / £X ARR] | Low / Med / High | [Team] |

**Priority call:** [Which one intervention, if implemented this quarter, would have the biggest impact and why]

---

## What We Don't Know (Data Gaps)

- [Data gap 1 — e.g. "Exit survey response rate is only 30% — the reasons data may not be representative"]
- [Data gap 2 — e.g. "No product usage data for SMB tier — can't confirm usage signal correlation"]
- [Data gap 3]

---

## Anti-Patterns

- [ ] Do not mix avoidable and unavoidable churn in intervention plans — recommending product fixes for customers who churned due to company shutdown wastes resources
- [ ] Do not calculate churn rate using end-of-period customer count as the denominator — this understates churn; always divide churned customers by the starting cohort
- [ ] Do not rely solely on exit survey data for churn reasons — response rates are typically low and self-selection biases the sample toward customers who are engaged enough to complete a survey
- [ ] Do not recommend interventions without linking them to a specific churn reason — interventions disconnected from root causes will not move retention
- [ ] Do not report only gross revenue churn — without net revenue retention (NRR), a healthy-looking retention number can hide a shrinking revenue base

## Quality Checks

- [ ] Churn rate is correctly calculated (churned ÷ starting cohort, not end-of-period total)
- [ ] Avoidable and unavoidable churn are separated — interventions target avoidable churn only
- [ ] Churn reasons are customer-reported, not internally assumed
- [ ] Segment analysis identifies which segments over-index — not just averages
- [ ] Early warning signals are specific and detectable, not generic ("low engagement")
- [ ] Interventions link directly to the top churn reasons — no recommendations without a root cause match
