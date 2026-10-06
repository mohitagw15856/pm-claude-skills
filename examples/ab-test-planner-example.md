# Example: ab-test-planner

## What this skill does

Designs a statistically rigorous A/B test: hypothesis, variants, sample size, duration, guardrail metrics and a results interpretation guide, so you know before launch what "ship it" will look like.

## How to trigger it

### Example 1: a checkout button test

**You say:**
> "Design an A/B test for changing our checkout button from 'Buy now' to 'Get started free'. We get about 4,000 eligible visitors a day and checkout conversion is 3.2%."

**Claude produces (excerpt):**

### A/B Test Plan: Checkout CTA copy, [date]

**Hypothesis:**
> If we change the checkout CTA from "Buy now" to "Get started free", conversion will rise because the copy lowers perceived commitment. We expect a relative lift of at least 10%.

**Variants:**
- Control (A): "Buy now" button, current blue style
- Treatment (B): "Get started free", same style, copy change only

**Primary Metric:** checkout conversion (orders / checkout page sessions)
**Guardrail Metrics:** refund rate, average order value, 7-day repeat visits

**Sample Size Required:** ~14,500 users per variant (3.2% baseline, 10% relative lift, 95% confidence, 80% power)
**Estimated Duration:** about 8 days at 4,000 eligible visitors/day on a 50/50 split
**Rollback Trigger:** stop immediately if refund rate degrades by 15%.

### Example 2: interpreting a finished test

**You say:**
> "Our onboarding test ran 3 weeks: control 18.1% activation (n=9,800), treatment 19.0% (n=9,750). Ship it?"

**Claude produces (excerpt):**

**Results read:** a 0.9pt absolute lift (5% relative) on these sample sizes is not significant at 95% confidence (p ≈ 0.11).

- 🔄 Iterate: direction is positive but not significant. Options: extend 2 more weeks to reach the required ~21,000 per variant, or redesign for a bigger swing.
- ⚠️ Do not call it a win and ship on this evidence alone.

## Tips for best results

- Give the baseline rate and daily eligible traffic: sample size and duration come straight from them.
- Name the smallest lift you would act on; testing for "any improvement" produces undersized tests.
- List what must not get worse, so guardrails are in the plan before launch.

## Related skills

- `feature-prioritisation` to decide whether this test is worth running before designing it
- `retention-analysis` when the question is long-term behaviour rather than a single conversion step
