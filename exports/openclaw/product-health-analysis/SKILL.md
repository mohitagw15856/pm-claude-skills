---
name: product-health-analysis
description: "Interpret product metrics against goals and surface actionable signals. Use when asked to analyse product health, review key metrics, investigate a performance issue, produce a health report, or assess product-market fit signals. Produces a structured health report with RAG status, trend analysis, root cause hypotheses, and prioritised actions."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/product-health-analysis.html
metadata:
  {
    "openclaw": { "emoji": "📊" }
  }
---

# Product Health Analysis Skill

Transform raw metrics data into a clear health narrative — what's working, what's not, and what needs immediate attention.

## Required Inputs

Ask the user for these if not provided:
- **Metrics data** (current values for key metrics — even rough numbers work)
- **Targets or benchmarks** (OKR targets, historical baselines, or industry benchmarks)
- **Period** (week / month / quarter being analysed)
- **Product area or segment** (are we looking at the whole product or a specific feature?)

## Metrics Framework
Analyse across four layers:
1. **Acquisition** — new users, source quality, CAC trends
2. **Activation** — time to first value, onboarding completion rates
3. **Engagement** — DAU/MAU, feature adoption, session depth
4. **Retention** — D1/D7/D30 retention, churn rate, resurrection rate

## Process
1. For each metric, compare: current period vs. previous period, current vs. target
2. Flag anything more than 10% off target as requiring investigation
3. Look for correlations — does a drop in activation explain a retention dip 2 weeks later?
4. Write a plain-English health summary (no jargon) suitable for sharing with non-data stakeholders
5. Recommend top 3 areas for immediate investigation with suggested diagnostic steps
6. **Validate** — Confirm every flagged metric has a plausible root cause hypothesis, not just a raw number, and every recommended action has a specific owner or team

## Output Structure

### Product Health Report — [Period]
**Overall Health:** 🟢 On Track / 🟡 Watch / 🔴 Action Required

| Metric | Current | Target | vs. Last Period | Status |
|--------|---------|--------|-----------------|--------|
| [metric] | [value] | [target] | [+/-%] | [🟢/🟡/🔴] |

**Key Observations:**
[3-5 bullet observations written in plain English]

**Areas Requiring Investigation:**
1. [Metric + hypothesis + suggested diagnostic]
2. [Metric + hypothesis + suggested diagnostic]
3. [Metric + hypothesis + suggested diagnostic]

**Recommended Actions:**
[Specific next steps with owners and timelines]

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Target & trend discipline | Metrics shown as bare snapshots; no targets or period-over-period comparison | Most metrics have targets and trends, but some RAG statuses don't follow from the numbers or targets are accepted uncritically | Every metric has target, trend, and a status that follows from both — and at least one target is itself challenged if it's no longer meaningful |
| Root cause depth | Movements listed without explanation ("activation dropped 27pts") | Flagged metrics have hypotheses, but they're generic ("onboarding friction") with no diagnostic to confirm them | Every flagged metric has a specific, falsifiable hypothesis plus a named diagnostic step, and at least one cross-metric correlation (e.g. activation → retention lag) is drawn |
| Segment honesty | Only blended aggregates reported; opposing segment trends invisible | Some segment cuts shown, but the headline observations still lean on averages that hide divergence | Every material aggregate is decomposed where segments diverge, and the divergence itself is surfaced as a finding, not a footnote |
| Verdict & actionability | No overall rating, or a rating asserted without evidence; actions missing or ownerless | Overall RAG present and roughly justified; actions exist but some lack owners, dates, or a link to a flagged metric | Overall rating argued from specific evidence (including against the good news), and every action has a named owner, a date, and traces to an investigation or observation |

## Quality Checks

- [ ] Every metric includes both a target and a trend (not just a snapshot)
- [ ] At least one correlation is drawn between metrics (e.g., activation → retention)
- [ ] Every flagged metric has a root cause hypothesis, not just "it dropped"
- [ ] Observations are written for a non-technical stakeholder (no raw query language or data jargon)
- [ ] Overall health rating is justified with specific evidence

## Anti-Patterns

- [ ] Do not report a single aggregate metric without segment breakdowns — averages hide opposing trends
- [ ] Do not flag a metric as healthy just because it is above the target — check if the target itself is meaningful
- [ ] Do not list metric movements without root cause hypotheses — observations without explanations are not analysis
- [ ] Do not mix product health metrics with business KPIs without explaining the relationship between them
- [ ] Do not omit recommended actions — a health report that only describes problems without prioritised next steps is incomplete
