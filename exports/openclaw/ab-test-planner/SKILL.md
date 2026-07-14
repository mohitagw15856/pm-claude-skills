---
name: ab-test-planner
description: "Design statistically rigorous A/B tests for product features, UI changes, onboarding flows, and pricing experiments. Use when asked to set up an experiment, design an A/B test, calculate sample size, or interpret test results. Produces a complete test plan with hypothesis, variant definitions, sample size, duration estimate, guardrail metrics, and a results interpretation guide."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ab-test-planner.html
metadata:
  {
    "openclaw": { "emoji": "🚚" }
  }
---

# A/B Test Planner Skill

Design experiments that produce trustworthy results — not just directional signals. Every test output includes hypothesis, success metrics, sample size, duration, and a results interpretation guide.

## Required Inputs

Ask the user for these if not provided:
- **What is being tested** (feature, UI change, copy, pricing, onboarding step)
- **Hypothesis** (or ask to help formulate one)
- **Primary metric** (conversion rate, click-through, completion rate, etc.)
- **Baseline rate** and **minimum detectable effect** (MDE)
- **Daily eligible users** (to calculate duration)

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

## Anti-Patterns

- [ ] Do not run a test without a directional hypothesis — "let's see what happens" produces uninterpretable results
- [ ] Do not declare a winner before reaching the pre-planned sample size — peeking at results inflates false positive rates
- [ ] Do not test multiple independent changes in a single variant — you won't know which change caused the result
- [ ] Do not use engagement metrics (clicks, time-on-page) as the primary metric when the goal is revenue or retention — proxy metrics mislead
- [ ] Do not ignore guardrail metrics — a conversion lift that causes a support ticket spike is not a win

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Statistical rigour | No sample size, or a number with no stated baseline/MDE behind it | Sample size present but MDE is guessed or copied from the lookup table without checking the actual baseline; power/significance unstated | Sample size derived from the stated baseline and MDE at 80% power / 95% confidence, duration checked against real daily traffic and the 2–4 week window, and the low-traffic escape hatch invoked if it doesn't fit |
| Hypothesis discipline | "Let's see what happens" — no direction, no magnitude, or multiple changes bundled into one variant | Directional hypothesis but missing magnitude, segment, or the evidence-based *because*; variant purity not confirmed | Full template filled (change, metric, direction, magnitude, segment, rationale citing data), and the treatment isolates exactly one change with excluded ideas named as follow-up tests |
| Guardrails & rollback | No guardrail metrics, or a rollback line with no threshold | Guardrails named but denominators/definitions ambiguous; rollback trigger vague ("if things look bad") | 1–2 guardrails protecting revenue or core engagement with pre-agreed definitions, concrete rollback thresholds, and the peeking-vs-harm-monitoring distinction handled explicitly |
| Decision readiness | No interpretation guide; results will be argued about after the fact | Ship/iterate/reject listed but thresholds fuzzy; inconclusive outcome missing or treated as a soft win | All four outcomes (ship / iterate / reject / inconclusive) mapped to pre-committed thresholds, including what an inconclusive result costs and what each outcome changes next |

## Quality Checks

- [ ] Hypothesis is directional (predicts a specific direction and magnitude, not "let's see")
- [ ] Primary metric is singular (guardrail metrics are secondary)
- [ ] Sample size is calculated from actual MDE and baseline (not guessed)
- [ ] Test duration accounts for weekly seasonality (minimum 2 weeks)
- [ ] Guardrail metrics are defined (at least one to protect revenue or core engagement)
- [ ] Rollback trigger is specified with a concrete threshold
