---
name: ai-eval-plan
description: "Design an evaluation plan for an LLM or AI feature before shipping it. Use when asked how to evaluate a prompt/model/agent, set up an eval harness, define quality metrics for an AI feature, or build a regression gate. Produces an eval plan — task definition, datasets, metrics & rubrics, baselines, automated + human evals, a pass bar, and a regression gate."
---

# AI Eval Plan Skill

You can't improve an AI feature you can't measure, and "it looks good in the demo" is not measurement.
This skill produces an evaluation plan that turns a fuzzy quality goal into a repeatable, gated test —
so a prompt change that quietly makes outputs worse can't ship.

## Required Inputs

Ask for these only if they aren't already provided:

- **The feature & task** — what the model does and what "good output" means to a user.
- **Failure modes that matter** — what bad looks like (hallucination, wrong format, unsafe, off-tone, too slow).
- **Available data** — any real examples, logs, or labelled cases; or note there are none yet.
- **Who judges quality** — automated checks, an LLM judge, human raters, or a mix.
- **The decision this gates** — ship/no-ship, model selection, or prompt iteration.

## Output Format

### Eval Plan: [feature]

**1. What we're measuring** — the task, and a one-line definition of a good vs. bad response.

**2. Eval dataset**
- **Cases:** how many, where they come from (real logs > synthetic), and how they're split (smoke set vs. full set).
- **Coverage:** the slices/scenarios that must be represented (edge cases, adversarial, each major input type).
- **Golden answers / references:** present or not, and how they were created.

**3. Metrics & rubric**
- **Per-dimension scores** — define each dimension (e.g. correctness, grounding, format, safety, tone) on an explicit 1–5 rubric with anchor descriptions, not vibes.
- **Automated checks** — deterministic assertions first (valid JSON, contains required fields, no PII, latency budget).
- **LLM-as-judge** — the judge prompt, the rubric it applies, and how you guard against its bias (calibrate against human labels on a sample).
- **Human eval** — when it's required (safety, subjective quality) and the rater instructions.

**4. Baselines** — what each candidate is compared against (current prompt, previous model, a plain-prompt control).

**5. The bar** — the explicit threshold to ship (e.g. "≥4.2 avg correctness, 0 safety failures, p95 < 3s") and what happens if it's missed.

**6. Regression gate** — how this runs in CI on every change, and the score-drop threshold that blocks a merge.

## Quality Checks

- [ ] Each metric has an explicit rubric with anchors — not just a name
- [ ] Deterministic/automated checks are used wherever possible before reaching for an LLM judge
- [ ] The LLM judge is calibrated against human labels on at least a sample
- [ ] The eval set includes adversarial and edge cases, not just happy-path examples
- [ ] There is a single, explicit numeric bar for the ship decision
- [ ] The plan specifies how it runs as a regression gate, not just a one-time check

## Anti-Patterns

- [ ] Do not rely on a single overall score — a feature can pass on average while failing every safety case
- [ ] Do not trust an LLM judge you haven't calibrated against humans — it has its own blind spots and biases
- [ ] Do not eval only on happy-path inputs — the failures live in the edges and the adversarial cases
- [ ] Do not let the eval set leak into the prompt/few-shot examples — that's training on the test set
- [ ] Do not define the pass bar after seeing the scores — set the threshold before you run, or it means nothing

## Based On

LLM evaluation practice — task-grounded rubrics, LLM-as-judge with human calibration, and regression-gated CI evals.

## Example Trigger Phrases

- "How to evaluate a prompt/model/agent?"
- "Set up an eval harness."
- "Define quality metrics for an AI feature."
- "Build a regression gate."
