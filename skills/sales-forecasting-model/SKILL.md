---
name: sales-forecasting-model
description: "Build a structured sales forecast framework for any business or team. Use when asked to build a sales forecast, create a revenue model, project pipeline, or build a bottom-up forecast. Produces a forecast methodology, pipeline model, scenario analysis, and assumption log."
---

# Sales Forecasting Model Skill

Produces a structured sales forecast framework — from pipeline conversion modelling to scenario analysis. Built for revenue and sales leaders who need a defensible forecast, not a spreadsheet guess.

## Required Inputs

Ask the user for these if not provided:
- **Business type** (SaaS / Transactional / Services / Marketplace)
- **Forecast period** (monthly / quarterly / annual)
- **Sales motion** (inbound / outbound / channel / PLG / mixed)
- **Current pipeline data** (number of deals, stages, values — rough is fine)
- **Historical conversion rates** (if available — otherwise model will flag as assumption)
- **Average deal size and sales cycle length**

## Output Structure

---

# Sales Forecast: [Team / Business] — [Period]

**Forecast type:** [Bottom-up pipeline / Top-down quota / Capacity-based / Hybrid]
**Period:** [Month / Quarter / Year]
**Created:** [Date]
**Forecast owner:** [Name]

---

## 1. Forecast Methodology

**Chosen approach:** [Bottom-up / Top-down / Hybrid] — and why for this context.

Bottom-up (recommended when pipeline data exists):
> Start from real deals in the pipeline. Apply stage-by-stage conversion rates. Sum to a revenue number.

Top-down (useful for planning, not for calling a number):
> Start from market or quota. Work backwards to activity targets.

---

## 2. Pipeline Stage Model

Define the sales stages and the expected conversion rate between each:

| Stage | Description | % of deals that advance | Avg time in stage |
|---|---|---|---|
| Prospect | Identified, not contacted | — | — |
| Qualified | Discovery done, confirmed fit | [X%] | [N days] |
| Proposal | Proposal sent | [X%] | [N days] |
| Negotiation | Commercial terms being agreed | [X%] | [N days] |
| Closed Won | Contract signed | [X%] | — |

**Overall pipeline conversion rate:** [X%] (Qualified → Closed Won)
**Average sales cycle:** [N days from Qualified to Close]

---

## 3. Current Pipeline Snapshot

| Stage | Number of deals | Total value | Expected close (weighted) |
|---|---|---|---|
| Qualified | [N] | £[X] | £[X × conversion %] |
| Proposal | [N] | £[X] | £[X × conversion %] |
| Negotiation | [N] | £[X] | £[X × conversion %] |
| **Total** | | **£[X]** | **£[weighted total]** |

**Coverage ratio:** [Weighted pipeline ÷ target = X×]
*Rule of thumb: 3× pipeline coverage is needed for confident forecast; 2× is tight; below 1.5× is at risk.*

---

## 4. Scenario Analysis

| Scenario | Assumption | Revenue | Probability |
|---|---|---|---|
| Upside | All Negotiation + top 50% of Proposal close | £[X] | [%] |
| Base | Weighted pipeline conversion at historical rates | £[X] | [%] |
| Downside | Conversion rates drop 20% from historical | £[X] | [%] |

**Committed forecast:** £[X] — [The number the forecast owner is willing to call. Between base and downside.]

---

## 5. Key Assumptions Log

Every forecast is a set of assumptions. Name them explicitly so they can be updated:

| Assumption | Value | Confidence | Source | Last updated |
|---|---|---|---|---|
| Avg deal size | £[X] | High/Med/Low | [Last N deals] | [Date] |
| Sales cycle | [N days] | | | |
| Close rate from Proposal | [X%] | | | |
| Seasonal factor | [e.g. Q4 +20%] | | | |
| Churn/contraction | [X% of ARR at risk] | | | |

---

## 6. Activity-Based Sanity Check

Work backwards from the forecast to check if the required activity is achievable:

To hit £[target]:
- Deals needed to close: [N] (target ÷ avg deal size)
- Qualified pipeline needed (at current conversion): [N deals or £value]
- Discovery calls needed per week to build that pipeline: [N]
- Outreach needed per week (at [X%] meeting rate): [N]

**Does the team have capacity to generate this?** [Yes / No — flag if not]

---

## Quality Checks

- [ ] Forecast methodology is stated (not just a number)
- [ ] Stage conversion rates are based on historical data or flagged as assumptions
- [ ] Coverage ratio is calculated
- [ ] Three scenarios are modelled (not just one number)
- [ ] Assumption log is explicit and dated
- [ ] Activity sanity check confirms the forecast is achievable with current capacity

## Example Trigger Phrases

- "Build a sales forecast for [period]"
- "Create a pipeline model for [team/business]"
- "Help me build a bottom-up revenue forecast"
- "What is our forecast for Q[N] based on current pipeline?"
