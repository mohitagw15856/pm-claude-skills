---
name: product-health-analysis
description: Interpret product metrics against goals and surface actionable signals
tool_integration: Google Analytics, Mixpanel
---
# Product Health Dashboard Skill

## Purpose
Transform raw metrics data into a clear health narrative — what's working, what's not, and what needs immediate attention.

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

## Output Format

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
