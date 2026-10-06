---
name: roi-estimator
description: "Estimate the ROI, payback, and NPV of an investment, project, or purchase. Use when asked to calculate ROI, build a business case, justify a purchase/initiative, work out payback period, or compare options by return. Produces a computed ROI summary (net benefit, ROI %, payback, simple NPV) with the assumptions made explicit and a sensitivity note, so a business case is defensible."
---

# ROI Estimator Skill

Every "should we spend on this?" decision needs a defensible number. This skill estimates the return —
ROI %, payback period, and a simple NPV that accounts for the time value of money — from costs and
expected benefits, with the assumptions stated and a sensitivity check, so a business case survives the
first sceptical question instead of collapsing.

## Required Inputs

Ask for these only if they aren't already provided:

- **Costs** — upfront cost, and any ongoing/recurring cost (per period).
- **Benefits** — the expected gain per period (revenue uplift, cost saved, time saved × loaded rate). Quantify; if it's an estimate, say so.
- **Time horizon** — over how many periods to evaluate (e.g. 3 years).
- **Discount rate** — for NPV (default ~10%); state it.

## Output Format

### ROI: [investment]

**1. The numbers** (via the helper):

| Metric | Value |
|---|---|
| Total cost (over horizon) | |
| Total benefit (over horizon) | |
| Net benefit | |
| **ROI %** | |
| **Payback period** | |
| Simple NPV (@ discount rate) | |

**2. The verdict** — worth it / marginal / no, in one line, and against what bar (e.g. beats the discount-rate hurdle, payback within tolerance).

**3. Assumptions** — list them explicitly. The benefit is usually the soft number — flag it, and give a **conservative / expected / optimistic** range rather than a single point.

**4. Sensitivity** — the one assumption the conclusion hinges on, and at what value the decision flips.

## Programmatic Helper

`scripts/roi.py` (stdlib only) computes ROI, payback, and NPV:

```bash
# in.json: {"upfront_cost":50000,"recurring_cost":2000,"benefit_per_period":18000,"periods":36,"discount_rate_annual":0.1,"period":"month"}
python3 scripts/roi.py in.json
python3 scripts/roi.py in.json --json
```

## Quality Checks

- [ ] Costs include recurring/ongoing, not just upfront
- [ ] NPV is computed (time value of money), not just raw ROI
- [ ] Benefits are given as a range (conservative/expected/optimistic), not a single optimistic point
- [ ] Every assumption is listed explicitly
- [ ] A sensitivity note names the assumption the verdict hinges on and its flip point

## Anti-Patterns

- [ ] Do not ignore ongoing costs — a low upfront, high-recurring option can lose to a pricier one-time buy
- [ ] Do not present a single benefit number as fact — it's the softest input; give a range and flag it
- [ ] Do not skip discounting for multi-year cases — $1 in year 3 isn't $1 today
- [ ] Do not bury the assumptions — a business case is only as credible as its stated inputs
- [ ] Do not omit payback — a great 5-year ROI with a 4-year payback may still be too slow to fund

## Based On

Business-case / capital-budgeting practice — ROI, payback period, NPV, and assumption sensitivity.

## Example Trigger Phrases

- "Calculate ROI."
- "Build a business case."
- "Justify a purchase/initiative."
- "Work out payback period."
- "Compare options by return."
