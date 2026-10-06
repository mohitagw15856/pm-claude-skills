---
name: eval-rubric-designer
description: "Design a scoring rubric and LLM-as-judge prompt to evaluate the quality of an AI feature's output. Use when asked to create an eval rubric, define quality dimensions, build an LLM judge, or decide how to measure whether AI output is good. Produces a rubric with weighted dimensions and concrete 1–5 anchors, a ready-to-run judge prompt, a labelling guide, and notes on judge reliability."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/eval-rubric-designer.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# Eval Rubric Designer Skill

You can't improve what you can't score. The hard part of evaluating AI output isn't running the judge — it's
defining dimensions that are **specific, observable, and independent**, with anchors concrete enough that two
people (or two judge runs) agree. This skill turns "is the output good?" into a rubric and a judge prompt you
can run today.

## Working from a brief

Given just "I need to eval my summariser", **produce the full rubric anyway** — infer the task, the output
type, and the dimensions that matter for it, and label inferred choices. Never hand back a list of dimension
names with no anchors; the anchors are where the rubric earns its keep.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The task** — what the AI is supposed to produce, and for whom.
- **A sample output (or two)** — ideally one good and one weak, to calibrate anchors.
- **What "good" means here** — the quality bar and any non-negotiables (e.g. must be grounded, must follow format).
- **How it'll be scored** — human review, LLM-as-judge, or both; and whether you need a single score or per-dimension.

## Output Format

### Eval Rubric: [task]

**1. Dimensions** — 3–6 independent dimensions, each with a one-line definition and a weight. Default set,
tailored to the task: **structure**, **completeness**, **correctness/grounding**, **usefulness**, **safety/tone**.

**2. Anchors** — for each dimension, concrete descriptions at **1, 3, and 5** (what a poor / acceptable /
excellent answer looks like *for this task*). Anchors must be observable, not "feels good".

| Dimension (weight) | 1 — poor | 3 — acceptable | 5 — excellent |
|---|---|---|---|
| Grounding (×2) | invents facts not in the source | mostly grounded, minor drift | every claim traceable to the source |

**3. Judge prompt** — a ready-to-run LLM-as-judge prompt in a fenced block: the task description, the rubric,
an instruction to score each dimension 1–5, and a **strict JSON output contract** (`{"dimension":N,...}`) so
scores parse reliably. Include a one-line "return only JSON" reinforcement.

**4. Labelling guide** — short rules for tie-breaks and common edge cases, so repeat runs stay consistent.

**5. Judge reliability notes** — known biases (length, position, self-preference), and how to mitigate: a
cheaper judge for scale vs. a stronger judge for the rubric, sampling N runs, and spot-checking judge scores
against a few human labels before trusting the leaderboard.

## Quality Checks

- [ ] Dimensions are independent — a single flaw doesn't tank three of them at once
- [ ] Every dimension has concrete 1/3/5 anchors specific to this task, not generic adjectives
- [ ] The judge prompt has a strict, parseable output contract (JSON), with a retry/repair note
- [ ] Weights reflect what actually matters for the task (grounding usually > prose polish)
- [ ] The rubric is calibrated against at least one good and one weak sample
- [ ] Judge biases are named with a concrete mitigation, not just listed

## Anti-Patterns

- [ ] Do not ship dimension names without anchors — names alone don't make scores reproducible
- [ ] Do not let one quality issue load onto multiple dimensions — keep them orthogonal
- [ ] Do not trust an LLM judge blind — calibrate against a handful of human labels first
- [ ] Do not use a vague "overall quality 1–10" — it hides which part is broken
- [ ] Do not ignore the negative case — a rubric must distinguish "wrong" from "thin", not just "great" from "okay"

## Based On

LLM-as-judge evaluation practice — orthogonal weighted dimensions, anchored scales, structured judge prompts, and judge-bias mitigation.

## Example Trigger Phrases

- "Create an eval rubric."
- "Define quality dimensions."
- "Build an LLM judge."
- "Decide how to measure whether AI output is good."
