---
name: product-health-analysis
description: "Interpret product metrics against goals and surface actionable signals. Use when asked to analyse product health, review key metrics, investigate a performance issue, produce a health report, or assess product-market fit signals. Produces a structured health report with RAG status, trend analysis, root cause hypotheses, and prioritised actions."
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

## Quality Checks

- [ ] Every metric includes both a target and a trend (not just a snapshot)
- [ ] At least one correlation is drawn between metrics (e.g., activation → retention)
- [ ] Every flagged metric has a root cause hypothesis, not just "it dropped"
- [ ] Observations are written for a non-technical stakeholder (no raw query language or data jargon)
- [ ] Overall health rating is justified with specific evidence
