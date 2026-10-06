---
name: model-selection-advisor
description: "Choose the right LLM for a task by trading off quality, cost, latency, and constraints. Use when asked which model to use, whether to upgrade/downgrade a model, how to cut LLM costs without hurting quality, or to justify a model choice. Produces a recommendation with the decision criteria, a per-option comparison, a routing strategy (cheap-by-default, escalate when needed), and how to validate the choice with an eval."
---

# Model Selection Advisor Skill

The right model is rarely "the biggest one" or "the cheapest one" — it's the smallest model that clears the
task's quality bar within its latency and cost budget, with a path to escalate the hard cases. This skill makes
that trade-off explicit and defensible, and ties it to an eval so the choice is measured, not vibes.

## Working from a brief

Given "what model should I use for summarising support tickets?", **deliver a concrete recommendation anyway**
— infer the task's difficulty, volume, and latency sensitivity, label the assumptions, and recommend. Never
hand back "it depends" with no pick; give a default and the condition under which you'd change it.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The task** — what the model does, and an example input/output. How hard is it (extraction vs. reasoning vs. open-ended)?
- **Quality bar** — what "good enough" means, and the cost of a wrong answer.
- **Volume & latency** — requests/day and how fast a response must come back (interactive vs. batch).
- **Constraints** — budget, context-length needs, tool use, privacy/region, and whether outputs must be reproducible.

## Output Format

### Model Recommendation: [task]

**1. Decision criteria** — the 3–5 factors that actually decide it here, ranked (e.g. reasoning depth > latency > cost), with why.

**2. Option comparison** — the realistic candidates scored against the criteria. Keep it provider-agnostic in
method; name a default family (e.g. the Claude family — a small/fast tier, a balanced tier, a frontier tier)
and reason by **tier**, not a single hardcoded model, so the advice survives model releases.

| Option (tier) | Quality on this task | Latency | Relative cost | Fit |
|---|---|---|---|---|
| Small/fast | clears bar for easy cases | low | $ | default for the bulk |
| Balanced | clears bar for most cases | med | $$ | when small misses |
| Frontier | clears the hardest cases | higher | $$$ | escalation / eval judge |

**3. Recommendation** — the default model/tier, in one sentence, with the single reason.

**4. Routing strategy** — cheap-by-default with escalation: run the small tier first, detect low-confidence or
hard cases (length, ambiguity, a validator/judge failing), and escalate those to a stronger tier. This usually
beats picking one model for everything on both cost and quality.

**5. Validation** — how to confirm the choice: a small eval set scored per tier (pair with
[`eval-rubric-designer`](../eval-rubric-designer/SKILL.md) and [`ai-eval-plan`](../ai-eval-plan/SKILL.md)),
and a cost/latency estimate at real volume (pair with [`llm-cost-latency-budget`](../llm-cost-latency-budget/SKILL.md)).

## Quality Checks

- [ ] The recommendation names a default model/tier and the condition that would change it
- [ ] Reasoning is by tier (small/balanced/frontier), not a single hardcoded model that dates quickly
- [ ] A routing/escalation strategy is considered, not just a single fixed choice
- [ ] The choice is tied to a measurable quality bar and an eval to verify it
- [ ] Cost and latency are estimated at real volume, not per single call
- [ ] Constraints (context length, privacy/region, reproducibility, tool use) are checked against the pick

## Anti-Patterns

- [ ] Do not default to the biggest model "to be safe" — pay only for the capability the task needs
- [ ] Do not pick on price alone — a cheap model that fails the bar costs more in rework and trust
- [ ] Do not recommend without an eval to confirm the quality bar is actually met
- [ ] Do not hardcode a single model name as the answer — reason by tier and let the eval pick the current best in it
- [ ] Do not ignore the long tail — design for the hard cases via escalation, not by oversizing everything

## Based On

Model-selection practice — quality/cost/latency trade-offs, tiered routing with escalation, and eval-driven validation.

## Example Trigger Phrases

- "Which model to use?"
- "How to cut LLM costs without hurting quality?"
- "Justify a model choice."
