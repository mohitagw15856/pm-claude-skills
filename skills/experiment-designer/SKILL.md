---
name: experiment-designer
description: Designs A/B tests from hypotheses and interprets experiment results 
with statistical rigour. Use when user says "run an experiment", "design an A/B 
test", "test this feature", "interpret these results", "was this experiment 
successful", or "what sample size do I need".
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: data-and-metrics
  tags: [experimentation, data, analytics, ab-testing]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Experiment Designer Skill

## Purpose
Produce rigorous experiment designs from product hypotheses, and interpret 
results with statistical and practical significance — so you can defend every 
decision to a sceptical engineering lead or data scientist.

## Two-Phase Process

### Phase 1: Experiment Design
**Required inputs:** hypothesis, primary metric, current baseline, minimum 
detectable effect (MDE), available sample size per day.

**Output:**
- Hypothesis restated as: "If we [change], we expect [metric] to [move by X%] 
  because [reason]"
- Control and variant definitions
- Primary metric (one only)
- Secondary guardrail metrics (2-3 max)
- Required sample size (calculated from MDE and baseline)
- Estimated run time in days
- Pre-defined success criteria (before the test runs — no moving goalposts)
- Design risk flags: novelty effects, seasonal confounds, multiple testing issues,
  network effects, sample ratio mismatch risks

### Phase 2: Results Interpretation
**Required inputs:** control results, variant results, p-value or raw numbers, 
run duration, any anomalies observed.

**Output:**
- Statistical significance assessment (p < 0.05 threshold)
- Practical significance: was the lift meaningful for the business, not just real?
- Confidence interval interpretation
- Confounding factors to investigate
- Recommendation: Ship / Iterate / Kill / Run follow-up test
- If "Iterate": specific hypotheses to test next

## Quality Checks
- Never interpret results from an underpowered test without flagging it
- Always distinguish statistical from practical significance
- Flag if test was stopped early (peeking problem)
- Note if sample ratio mismatch occurred
