# Example: churn-analysis

## What this skill does

Produces a structured churn report: rates and net revenue retention, reasons categorised by avoidability, segment and timing breakdowns, and interventions ranked by estimated impact.

## How to trigger it

### Example 1: a quarterly churn investigation

**You say:**
> "Analyse our Q3 churn: started with 820 customers, lost 49. ARR started at £4.1m, lost £310k, expansions added £180k. Exit reasons: 18 'too expensive', 11 went to [competitor], 9 shut down, 6 'missing integrations', 5 unknown."

**Claude produces (excerpt):**

# Churn Analysis: Q3

## Headline Numbers

| Metric | Value |
|---|---|
| Customers churned | 49 of 820 |
| **Customer churn rate** | **6.0% quarterly** |
| ARR lost to churn | £310k |
| **Revenue churn rate (gross)** | **7.6%** |
| **Net revenue retention (NRR)** | **96.8%** |

**Benchmark context:** NRR below 100% means the base is shrinking without new logos; mid-market SaaS healthy range is 100 to 110%.

## Churn Breakdown by Category

| Category | Customers | % of churn | Avoidable? |
|---|---|---|---|
| Price objection | 18 | 37% | Partly: 12 never used the two features that justify the tier |
| Lost to competitor | 11 | 22% | Mostly: 8 cited the missing [integration name] |
| Business closed | 9 | 18% | No |
| Missing integrations | 6 | 12% | Yes |
| Unknown | 5 | 10% | Unknowable until exit interviews run |

**Top intervention:** the integration gap appears in two categories (14 accounts, ~£95k ARR); it outranks any pricing change.

### Example 2: finding the early warning signal

**You say:**
> "Same data; what should have warned us? Churned accounts averaged 2.1 logins/month in their last quarter vs 9.4 for retained."

**Claude produces (excerpt):**

**Early warning signal:** login frequency under 4/month for a full quarter preceded 39 of 49 churns (80%). Flag at the second consecutive low month; by the third, the renewal conversation is already lost.

**Watchlist produced:** 61 current accounts match the pattern today, £412k ARR. Recommended: CSM outreach sequenced by renewal date, nearest first.

## Tips for best results

- Give counts and ARR at the start of the period, churned amounts, and expansion revenue; NRR needs all three.
- Paste exit reasons verbatim; categorising them is the skill's job.
- Include a usage metric for churned vs retained accounts to get the early-warning cut.

## Related skills

- `retention-analysis` for cohort-shaped "who stays" questions rather than "why they left"
- `cs-health-scorecard` to score one at-risk account rather than analyse the base
