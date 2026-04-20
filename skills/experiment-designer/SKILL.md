---
name: experiment-designer
description: "Design statistically rigorous A/B tests and interpret experiment results. Use when asked to design an experiment, run an A/B test, calculate sample size, interpret test results, or assess whether an experiment was successful. Produces a complete experiment design with hypothesis, sample size, run time, success criteria, and risk flags — or a results interpretation with ship/iterate/kill recommendation."
---

# Experiment Designer Skill

Produce rigorous experiment designs from product hypotheses, and interpret results with statistical and practical significance — so you can defend every decision to a sceptical engineering lead or data scientist.

## Required Inputs

Ask the user for these if not provided:
**For experiment design:**
- Hypothesis (what change, what metric, what expected movement)
- Current baseline metric value
- Minimum detectable effect (MDE) — the smallest lift worth caring about
- Available daily sample size

**For results interpretation:**
- Control and variant results (raw numbers or percentages)
- P-value or confidence interval
- Run duration (days)
- Any anomalies observed during the test

## Two-Phase Process

### Phase 1: Experiment Design
1. Restate hypothesis as: "If we [change], we expect [metric] to [move by X%] because [reason]"
2. Define control and variant clearly
3. Select primary metric (one only) and secondary guardrail metrics (2-3 max)
4. Calculate required sample size from MDE and baseline
5. Estimate run time in days
6. Set pre-defined success criteria before the test runs — no moving goalposts
7. Flag design risks: novelty effects, seasonal confounds, multiple testing issues, network effects, sample ratio mismatch

### Phase 2: Results Interpretation
1. Assess statistical significance (p < 0.05 threshold)
2. Assess practical significance: was the lift meaningful for the business, not just real?
3. Interpret confidence intervals
4. Investigate confounding factors
5. Recommend: Ship / Iterate / Kill / Run follow-up test
6. **Validate** — Confirm the test ran for the full planned duration. Flag if it was stopped early (peeking problem). Confirm sample ratio mismatch did not occur.

## Output Structure

**[Design or Results header based on phase]**

*Hypothesis:* "If we [change], we expect [metric] to [move by X%] because [reason]"

*Primary metric:* [One metric only]
*Guardrail metrics:* [2-3 max]
*Required sample size:* [n per variant]
*Estimated run time:* [days]
*Pre-defined success threshold:* [specific number]
*Design risk flags:* [any concerns]

**Results (Phase 2 only):**
*Statistical significance:* [p-value and conclusion]
*Practical significance:* [lift size vs. business threshold]
*Recommendation:* Ship / Iterate / Kill / Follow-up — [rationale]

## Quality Checks

- [ ] Hypothesis specifies the change, the metric, the direction, and the reason
- [ ] Primary metric is singular — guardrail metrics are secondary
- [ ] Success criteria are defined before the test launches (not after seeing results)
- [ ] Test was not stopped early (or flagged clearly if it was)
- [ ] Practical significance assessed separately from statistical significance
- [ ] Sample ratio mismatch is checked in results interpretation
