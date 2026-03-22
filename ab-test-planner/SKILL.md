---
name: ab-test-planner
description: Designs statistically rigorous A/B tests for product features, UI changes, onboarding flows, and pricing experiments. Use when asked to set up an experiment, run an A/B test, calculate sample size, or interpret test results. Triggers on "A/B test", "experiment", "split test", "statistical significance", "sample size".
---

# A/B Test Planner Skill

Design experiments that produce trustworthy results — not just directional signals. Every test output includes hypothesis, success metrics, sample size, duration, and a results interpretation guide.

## Experiment Design Checklist

Before running any test, confirm:
- [ ] Clear hypothesis with predicted direction
- [ ] Single primary metric (plus up to 2 guardrail metrics)
- [ ] Minimum detectable effect (MDE) defined
- [ ] Sample size calculated
- [ ] Test duration estimated
- [ ] Segment isolated (no overlap with other running tests)
- [ ] Rollback plan defined

## Hypothesis Template

> "We believe that [change] will cause [primary metric] to [increase/decrease] by [X%] for [user segment], because [rationale based on data or insight]."

Never run a test without a directional hypothesis. "Let's just see what happens" is not a hypothesis.

## Sample Size Calculator Logic

Use this formula (provide the output, not the formula, to the user):

- **Baseline conversion rate:** Current rate of primary metric
- **MDE:** Smallest change worth detecting (recommend 10–20% relative lift for most features)
- **Statistical power:** 80% (standard)
- **Significance level:** 95% (p < 0.05)

For common scenarios, provide pre-calculated estimates:

| Baseline Rate | MDE (Relative) | Required Sample per Variant |
|---|---|---|
| 5% | 20% | ~19,000 |
| 10% | 15% | ~14,000 |
| 20% | 10% | ~15,000 |
| 40% | 10% | ~9,500 |
| 60% | 5% | ~42,000 |

Always warn: "These are estimates. Use a tool like Evan Miller's calculator or Statsig for precision."

## Test Duration Guidance

Minimum: 2 full weeks (to capture weekly seasonality)
Maximum: 4 weeks (novelty effect distorts results beyond this)

`Duration = Required sample ÷ (Daily traffic × % exposed)`

Flag if traffic is too low to reach significance in under 8 weeks — recommend a different approach (e.g., holdout test, qualitative research).

## Output Format

### A/B Test Plan — [Test Name] — [Date]

**Hypothesis:**
> [Filled hypothesis template]

**Variants:**
- Control (A): [Current experience]
- Treatment (B): [Changed experience — be specific]

**Primary Metric:** [Metric name + how measured]
**Guardrail Metrics:** [Metrics that must not degrade]

**Target Segment:** [Who sees the test — % of traffic, user type]
**Traffic Split:** [50/50 recommended unless ramp-up needed]

**Sample Size Required:** ~[N] users per variant
**Estimated Duration:** [X] weeks (based on [Y] daily eligible users)
**Significance Threshold:** 95% confidence, 80% power

**Exclusions:** [Any user segments to exclude and why]

**Rollback Trigger:** If [guardrail metric] degrades by [X%], stop the test immediately.

**Results Interpretation Guide:**
- ✅ Ship if: Treatment shows [X%]+ lift on primary metric at 95% confidence AND guardrail metrics are stable
- 🔄 Iterate if: Direction is positive but not significant — consider extending or redesigning
- ❌ Reject if: No lift or negative direction at significance
- ⚠️ Inconclusive: Do not ship. Do not call it a win.

---

## Guidelines

- Always recommend against peeking at results before the test reaches planned sample size — explain p-hacking risk
- If user wants to test multiple variants, explain the multiple comparisons problem and recommend a Bonferroni correction or a Bayesian approach
- If traffic is very low (<1,000 users/day), recommend qualitative alternatives: moderated testing, 5-second tests, or user interviews
- Never approve a test with no guardrail metrics — always protect revenue, retention, or core engagement
