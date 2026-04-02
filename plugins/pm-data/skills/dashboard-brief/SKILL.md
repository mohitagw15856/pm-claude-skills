---
name: dashboard-brief
description: "Convert a business question into a complete dashboard specification. Use when asked to design a dashboard, create a dashboard spec or brief, plan a BI report, or define what charts and metrics a dashboard should include. Produces a structured spec with metrics, dimensions, chart types, filters, and layout guidance."
---

# Dashboard Brief Skill

This skill converts a business question or monitoring need into a complete, implementation-ready dashboard specification. The output gives a data engineer or BI developer everything they need to build without a follow-up meeting.

## Required Inputs

Ask the user for these if not provided:
- **The business question this dashboard should answer** (e.g. "How is our activation funnel performing this week?")
- **Primary audience** (exec / product team / operations / customer success / engineering)
- **Refresh cadence** (real-time / hourly / daily / weekly)
- **Data sources available** (e.g. Postgres, BigQuery, Mixpanel, Salesforce, Jira)
- **BI tool being used** (Looker / Metabase / Tableau / Power BI / Grafana / Custom / Unknown)

## Output Structure

---

# Dashboard Brief: [Dashboard Name]

**Business Question:** [The question this dashboard answers — verbatim from inputs or refined]
**Audience:** [Who uses this]
**Refresh Rate:** [Real-time / Hourly / Daily / Weekly]
**Data Sources:** [List]
**BI Tool:** [Tool or Unknown]

---

## Section 1: Key Metrics (KPI Cards)

List the headline numbers that should appear at the top of the dashboard as KPI cards.

| Metric | Definition | Data Source | Comparison |
|---|---|---|---|
| [Metric name] | [How it's calculated] | [Table/source] | [vs. last week / vs. target / MoM] |

Aim for 3–6 KPI cards. More than 6 is noise.

---

## Section 2: Charts & Visualisations

For each chart, specify:

### Chart [N]: [Chart Title]

- **Chart type:** [Line / Bar / Stacked bar / Pie / Funnel / Heatmap / Table / Scatter]
- **Why this chart type:** [One sentence — why this type suits this data]
- **X-axis / Rows:** [Dimension — e.g. Date, User segment, Product]
- **Y-axis / Values:** [Metric — e.g. Count of active users, Revenue]
- **Breakdown/colour:** [Optional secondary dimension — e.g. by Plan tier, by Channel]
- **Data source:** [Table or source]
- **Filters:** [Any default filters applied — e.g. "Exclude internal test accounts"]
- **Key insight to surface:** [What pattern or signal this chart should help the viewer spot]

---

## Section 3: Filters & Controls

Global filters available to dashboard viewers:

| Filter | Type | Default | Options |
|---|---|---|---|
| Date range | Date picker | Last 30 days | Custom |
| [Segment filter] | Dropdown | All | [List relevant values] |
| [Other filter] | Multi-select | All | [List relevant values] |

---

## Section 4: Layout Recommendation

Describe the dashboard layout in plain terms:

```
[ROW 1 — KPI Cards]: [Metric 1] | [Metric 2] | [Metric 3] | [Metric 4]
[ROW 2 — Primary chart, full width]: [Chart name]
[ROW 3 — Two charts side by side]: [Chart A] | [Chart B]
[ROW 4 — Supporting table, full width]: [Table name]
```

---

## Section 5: Data Requirements

List any data transformations, joins, or derived fields needed:

| Derived Field | Logic | Source Tables |
|---|---|---|
| [Field name] | [How it's calculated] | [Tables involved] |

Flag any fields that may not exist in current data infrastructure.

---

## Section 6: Access & Ownership

- **Dashboard owner:** [Leave for user to fill]
- **Who can edit:** [Leave for user to fill]
- **Who can view:** [Leave for user to fill]
- **Review cadence:** [When should this dashboard be reviewed for relevance?]

---

## Quality Checks

- [ ] Every chart has a stated "key insight to surface" — not just "show the data"
- [ ] KPI cards are 3–6 (not more)
- [ ] Chart types are justified
- [ ] Layout follows visual hierarchy (summary → detail)
- [ ] Data requirements section flags any missing fields
- [ ] Filters are practical and don't require IT to configure

## Example Trigger Phrases

- "Design a dashboard to track [business process]"
- "Give me a spec for a [team] performance dashboard"
- "What should go on a [topic] dashboard?"
- "Write a dashboard brief for our [metric] monitoring"
