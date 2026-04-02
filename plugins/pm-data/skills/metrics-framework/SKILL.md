---
name: metrics-framework
description: "Build a metrics framework for any product, team, or business. Use when asked for a metrics tree, KPI framework, North Star metric, AARRR funnel, HEART framework, or OKR metrics. Produces a structured metrics hierarchy from North Star down to leading indicators, with measurement guidance."
---

# Metrics Framework Skill

This skill builds a complete metrics framework tailored to a product or business. It connects the North Star metric to actionable leading indicators, making it clear which metrics to track, which to optimise, and how they relate to each other.

## Required Inputs

Ask the user for these if not provided:
- **Product or business description** (one paragraph is enough)
- **Business model** (SaaS / Marketplace / E-commerce / Consumer app / B2B / Other)
- **Stage** (Pre-PMF / Growth / Scale / Mature)
- **Framework preference** (if they have one): North Star + Metric Tree / AARRR / HEART / OKRs / Custom
- **Primary goal this quarter** (e.g. grow activation, reduce churn, increase revenue)

If no framework preference is given, recommend the best fit based on stage and business model.

## Output Structure

### 1. Framework Recommendation (if not specified)

Explain in 2–3 sentences why you're recommending this framework for their context.

---

### 2. North Star Metric

**[Metric Name]:** [Definition — exactly what is measured and how]

**Why this is the right North Star for this business:**
[2–3 sentences. It should reflect customer value delivered, not just revenue or activity. Explain what behaviour it captures and why maximising it correlates with long-term business health.]

**How to measure it:** [Formula or data source]
**Current baseline:** [Leave as [ADD BASELINE] for user to fill]
**Target:** [Leave as [ADD TARGET] for user to fill]

---

### 3. Metric Tree

Show how supporting metrics roll up to the North Star. Format as a hierarchy:

```
[North Star Metric]
├── [Driver 1: e.g. Acquisition]
│   ├── [L2 metric: e.g. Organic signups / week]
│   └── [L2 metric: e.g. Paid CAC by channel]
├── [Driver 2: e.g. Activation]
│   ├── [L2 metric: e.g. % users completing onboarding within 7 days]
│   └── [L2 metric: e.g. Time to first value action]
└── [Driver 3: e.g. Retention]
    ├── [L2 metric: e.g. Day 30 retention rate]
    └── [L2 metric: e.g. Feature adoption depth]
```

For each L2 metric, provide:
- **Definition:** [What exactly is measured]
- **Why it matters:** [How it connects to the North Star]
- **Leading or lagging?** [Leading = predictive / Lagging = outcome]
- **How to measure:** [Data source or calculation]

---

### 4. Counter-Metrics

[2–3 metrics to watch that prevent optimising the North Star in ways that damage the business. E.g. "If we optimise for signups, we need to watch spam account rate. If we optimise for engagement, we need to watch support ticket volume."]

---

### 5. Dashboard Recommendation

Suggest a 3-tier dashboard structure:
- **Exec view (weekly):** [3–5 metrics — outcomes only]
- **Team view (daily):** [7–10 metrics — leading indicators + outputs]
- **Diagnostic view (on demand):** [Metrics to drill into when something looks wrong]

---

### 6. Metric Health Check Questions

[5 questions the team should ask in their weekly metrics review to turn numbers into insights. e.g. "Is our activation rate improving while retention stays flat? That suggests onboarding quality issue, not a product-market fit problem."]

---

## Quality Checks

- [ ] North Star reflects customer value, not just business activity
- [ ] Metric tree has 3–4 distinct drivers (not all one category)
- [ ] Each L2 metric is classified as leading or lagging
- [ ] Counter-metrics are included to prevent perverse incentives
- [ ] Dashboard tiers are tailored to the product stage
- [ ] All metric definitions are unambiguous (formula or clear description)

## Example Trigger Phrases

- "Build a metrics framework for [product]"
- "What should our North Star metric be?"
- "Create a KPI tree for [business]"
- "Give me an AARRR breakdown for [product]"
- "What metrics should our [team type] team track?"
