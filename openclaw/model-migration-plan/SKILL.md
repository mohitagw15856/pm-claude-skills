---
name: model-migration-plan
description: "Plan the migration of an LLM feature from one model to another without breaking production. Use when a model is being deprecated, a newer model looks better or cheaper, or when asked how to upgrade models safely, run shadow traffic, or set rollback criteria for a model change. Produces a phased migration plan with eval gates, shadow/canary stages, prompt-adaptation notes, and rollback triggers. For choosing which model in the first place use model-selection-advisor."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/model-migration-plan.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Model Migration Plan Skill

A model swap changes every output of your feature at once. This skill plans the migration like the risky deploy it is: eval first, shadow second, canary third — with numbers, not vibes, deciding each promotion.

## What This Skill Produces

- A **phased migration plan** (eval → shadow → canary → full) with promotion criteria per phase
- **Prompt adaptation notes** — what typically shifts between models and what to re-tune
- **Rollback triggers** and the mechanics of rolling back fast
- A **cost/latency delta forecast** for the new model

## Required Inputs

Ask for (if not already provided):
- **Current and target model** (and why: deprecation, quality, cost, latency)
- **The feature's traffic and blast radius** — requests/day, who sees the output, what a bad output costs
- **Existing evals** — a regression suite (see `prompt-regression-suite`) or at minimum golden examples; if none exist, phase 0 is building one
- **The deadline**, if the migration is forced by a deprecation date

## Migration Phases

**Phase 0 — Baseline.** Freeze a regression suite against the *current* model. Without a baseline, "the new model is fine" is unfalsifiable. Record current cost, latency (p50/p95), and quality scores.

**Phase 1 — Offline eval.** Run the suite against the target model with the prompt as-is, then with adapted prompts. Promotion criteria: pass rate ≥ baseline, no canary failures, cost/latency within budget. Expect to iterate here — most "model regressions" are prompt-fit issues.

**Phase 2 — Shadow.** Mirror a sample of real traffic to the new model; log, never serve. Compare distributions: refusal rate, output length, format-violation rate, judge scores on a sample. Duration: long enough to cover weekly traffic patterns.

**Phase 3 — Canary.** Serve the new model to [1-5]% of traffic behind a flag, tagged in analytics. Watch the same metrics plus user-visible signals (regenerate rate, thumbs-down, support tickets). Widen in steps; each step has the same promotion criteria.

**Phase 4 — Full cutover + cleanup.** 100% traffic, old model kept warm behind the flag for [period], then removed. Update model pins everywhere (including the eval judge if it referenced the old model), and re-baseline the regression suite on the new model.

## Prompt Adaptation Notes

Between model generations, re-check: instruction-following strictness (newer models often follow the letter, exposing sloppy prompts), format compliance (JSON/markdown habits differ), verbosity defaults, refusal boundaries, tool-calling style, and system-prompt sensitivity. Adapt the prompt per model rather than writing to the lowest common denominator — keep per-model prompt versions if both run simultaneously.

## Rollback

- **Triggers (numbers, set in advance):** canary quality below baseline by [X], refusal/format-violation rate above [Y], p95 latency above [Z], or any safety incident.
- **Mechanics:** the model is a config flag, not a code deploy — rollback is a flag flip taking effect in [minutes]. State who can flip it and how it's tested *before* the canary starts.

## Output Format

### Model Migration Plan: [feature] — [current model] → [target model]

**Why now:** [driver + deadline]. **Blast radius:** [traffic, audience, cost of a bad output].

| Phase | Gate to pass | Duration | Owner |
|---|---|---|---|
| 0 Baseline | suite frozen; cost/latency recorded | | |
| 1 Offline eval | [criteria] | | |
| 2 Shadow | [criteria] | | |
| 3 Canary [x]% → [y]% | [criteria] | | |
| 4 Cutover + cleanup | [criteria] | | |

**Prompt adaptations found/expected:** [list]

**Rollback:** triggers [numbers]; mechanism [flag]; owner [who].

**Cost/latency forecast:** [current] → [projected], at [traffic].

## Quality Checks

- [ ] Every phase promotion criterion is a number against the recorded baseline
- [ ] Shadow phase compares distributions, not anecdotes ("outputs look good" is not a gate)
- [ ] Rollback is a config flip with a named owner, tested before canary
- [ ] The plan re-baselines the regression suite after cutover — the new model becomes the new normal
- [ ] Deprecation deadlines leave slack for at least one failed phase-1 iteration

## Anti-Patterns

- [ ] Do not skip shadow because offline evals passed — real traffic finds what golden sets miss
- [ ] Do not migrate the feature and the prompt redesign in one change — you won't know which moved the metrics
- [ ] Do not compare models with an unpinned judge, or a judge that is the target model grading itself
- [ ] Do not leave the old model path in code indefinitely "just in case" — set the removal date in the plan
- [ ] Do not treat a cheaper model as free savings without re-checking quality at the tails, not just the mean

## Example Trigger Phrases

- "How to upgrade models safely?"
- "Run shadow traffic."
- "Set rollback criteria for a model change."
