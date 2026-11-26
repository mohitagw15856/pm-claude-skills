# Choosing Success Metrics for a PRD

The success-metrics table is the most-fudged section of every PRD. This guide is the calibration to apply when filling it in.

## The four-part test

A PRD-worthy metric passes all four:

1. **It moves if and only if the feature works.** "Monthly active users" fails for a settings redesign — too many other causes. Pick the metric closest to the behaviour the feature changes.
2. **It has a baseline.** A target without a current value is unfalsifiable. If the baseline isn't instrumented yet, the PRD's phase 1 includes instrumenting it.
3. **It has a deadline.** "Improve activation" is a hope; "activation 28% → 35% within 60 days of GA" is a claim someone can check.
4. **Someone will actually look.** Name where it will be reviewed (launch review, weekly metrics meeting). A metric nobody reads is decoration.

## The standard set

Most feature PRDs need exactly three rows plus a guardrail:

| Slot | Question it answers | Example |
|---|---|---|
| **Adoption** | Are the target users using it? | % of support agents using unified inbox weekly |
| **Outcome** | Did it change the behaviour that justified building it? | avg. response time 4h → 1h |
| **Business** | Did the outcome show up in something the company counts? | support CSAT 3.8 → 4.5 |
| **Guardrail** | What must not get worse? | escalation rate does not increase |

If you can't draw the causal arrow adoption → outcome → business in one sentence each, the metrics are decorative.

## Common traps

- **Vanity denominator** — "40% of users who opened the feature completed it" hides that 2% opened it. Report both stages or the full funnel.
- **Percentage without base rate** — "+35% productivity" from what measurement? State the instrument, not just the number.
- **Team-output metrics as success** — "ship by Q3" and "migrate 100% of traffic" are plan milestones, not success metrics. They belong in Rollout.
- **Averages hiding tails** — response time *averages* improve while the worst 10% get worse. For anything latency- or time-shaped, set the target on p90/p95.
- **Too many metrics** — six primary metrics means none is primary. Three plus a guardrail; move the rest to an appendix dashboard.
- **No counterfactual plan** — if the metric moves, how do you know the feature did it? Note the method: A/B test, staged rollout comparison, or (weakest, say so) before/after with seasonality noted.

## Baselines when there's no data

When the feature is new and no baseline exists:
- Use the nearest proxy behaviour ("today users do this via export + spreadsheet — 300 exports/week is the demand baseline").
- Or state the target as an absolute with a review date ("500 weekly uses by day 60, else we revisit").
- Never write "N/A — new feature". Demand for the job the feature does always has a measurable trace somewhere.
