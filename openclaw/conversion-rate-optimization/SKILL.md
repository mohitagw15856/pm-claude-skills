---
name: conversion-rate-optimization
description: "Audit a landing page or funnel step and produce a prioritised CRO test plan. Use when asked to improve conversion rate, audit a landing/signup/checkout page, reduce funnel drop-off, or plan A/B tests for a page. Produces a CRO plan — a heuristic conversion audit, the diagnosed friction, prioritised test hypotheses (ICE), test designs with sample-size math, and the measurement guardrails."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/conversion-rate-optimization.html
metadata:
  {
    "openclaw": { "emoji": "📈" }
  }
---

# Conversion Rate Optimization Skill

CRO is not "make the button green" — it's systematically removing the friction and doubt between a
visitor and the action. This skill audits a page against conversion heuristics, diagnoses the biggest
blockers, and turns them into prioritised, properly-powered tests — so you change conversion on purpose,
with evidence, not by redesign-by-opinion.

## Required Inputs

Ask for these only if they aren't already provided:

- **The page/step & its one goal** — the single action it should drive (signup, purchase, demo).
- **Current performance** — conversion rate and traffic volume (volume decides whether A/B testing is even viable).
- **The audience & their intent** — where they come from and how warm they are.
- **Known data** — analytics, session recordings, or survey signals on where people drop or hesitate.

## Output Format

### CRO Plan: [page/step]

**1. Conversion audit** — score the page against the core heuristics, each with the specific issue found:
- **Clarity** — is the value proposition and next action instantly obvious?
- **Relevance** — does it match the source/ad/intent that brought them?
- **Motivation** — are benefits and proof (social proof, results) present at the decision point?
- **Friction** — form length, steps, load speed, cognitive load.
- **Anxiety** — trust signals, risk reversal (guarantee, "no card needed"), privacy.
- **Distraction** — competing CTAs and links pulling away from the one goal.

**2. Diagnosis** — the top 2–3 conversion blockers, ranked by likely impact (grounded in the data, not taste).

**3. Test backlog** — each blocker as a hypothesis, scored (ICE):

| Hypothesis ("If we ___, conversion will ___ because ___") | Heuristic | Impact | Confidence | Ease | ICE |
|---|---|---|---|---|---|

**4. Test designs (top 2–3)** — the variant, primary metric + guardrails (e.g. don't lift signups while tanking paid conversion), and the **sample size & duration** needed to detect the expected lift. If traffic is too low for A/B significance, say so and recommend sequential/qualitative methods instead.

**5. Measurement** — how it's tracked, the significance threshold set **before** running, and the decision rule (ship / iterate / revert).

## Quality Checks

- [ ] The audit cites a specific issue per heuristic, not a generic checklist tick
- [ ] Test ideas are hypotheses tied to a diagnosed blocker, prioritised by ICE
- [ ] Each test states the sample size/duration to detect the expected lift
- [ ] Low-traffic reality is acknowledged — A/B testing is only recommended when volume supports it
- [ ] Guardrail metrics prevent a local conversion win that harms downstream value

## Anti-Patterns

- [ ] Do not test trivial cosmetics (button colour) before fixing clarity, friction, and anxiety — the big levers
- [ ] Do not A/B test on traffic too low to ever reach significance — use qualitative research or sequential changes instead
- [ ] Do not optimise the step in isolation — a signup lift that lowers paid conversion is a loss; watch the downstream metric
- [ ] Do not call a test on day two because it looks good — set the threshold and sample size before you start
- [ ] Do not redesign by opinion — every change should trace to a diagnosed blocker and a hypothesis

## Based On

Conversion-optimization heuristics (clarity / relevance / motivation / friction / anxiety / distraction — LIFT-style) and properly-powered A/B testing.

## Example Trigger Phrases

- "Improve conversion rate."
- "Audit a landing/signup/checkout page."
- "Reduce funnel drop-off."
- "Plan A/B tests for a page."
