---
name: model-card
description: "Document a deployed ML/AI model so others can use it responsibly. Use when asked to write a model card, document a model's intended use and limitations, or prepare an AI model for review/launch. Produces a complete model card — intended use, training data, evaluation metrics across slices, limitations, ethical considerations, and a deployment checklist."
---

# Model Card Skill

A model card is the README for a model: what it does, what it was trained and evaluated on, where
it works, and — most importantly — where it doesn't. It turns an opaque artifact into something a
reviewer, a downstream team, or a regulator can actually assess. Write it *before* launch, not after.

## Required Inputs

Ask for these only if they aren't already provided:

- **Model name & version**, owner team, and date.
- **What it does** — task type (classification, generation, ranking, extraction…) and the decision it informs.
- **Intended use & users** — the supported use cases, and explicitly the out-of-scope ones.
- **Training data** — sources, size, time range, and known gaps (link a [`dataset-datasheet`](../dataset-datasheet/SKILL.md) if one exists).
- **Evaluation** — datasets, metrics, and results, ideally **broken down by subgroup/slice**.
- **Known limitations & risks** — failure modes, bias findings, safety concerns.

## Output Format

### Model Card: [name] v[version]
**Owner:** [team] · **Date:** [date] · **Status:** [in review / production / deprecated]

**1. Overview** — one paragraph: what the model does, the decision it serves, and who uses it.

**2. Intended Use**
- **In scope:** the use cases this model is validated for.
- **Out of scope / do not use for:** explicit prohibited or unvalidated uses (this section prevents the most harm).
- **Users:** who is expected to operate or consume it.

**3. Training Data** — sources, size, time window, labelling method, and known coverage gaps.

**4. Evaluation**
- **Metrics:** the primary metric(s) and why they were chosen for this task.
- **Overall results:** headline numbers vs. a stated baseline.
- **Sliced results:** a table of the key metric across important subgroups (geography, language, device, demographic where appropriate) — surface where performance drops, don't hide it behind an average.

| Slice | N | Metric | vs. overall |
|---|---|---|---|

**5. Limitations & Failure Modes** — concrete situations where it underperforms or should not be trusted.

**6. Ethical Considerations & Bias** — fairness findings, sensitive-attribute handling, and mitigations applied.

**7. Deployment & Monitoring** — serving constraints (latency/cost), the drift/quality signals you'll watch, and the rollback trigger.

## Quality Checks

- [ ] "Out of scope / do not use for" is filled in with specifics — not left blank
- [ ] Evaluation is reported **by slice**, not just one global average that hides subgroup harm
- [ ] Every metric states the baseline it's measured against
- [ ] Limitations describe real, concrete failure situations (not "the model may be imperfect")
- [ ] A monitoring signal and an explicit rollback trigger are named

## Anti-Patterns

- [ ] Do not report a single aggregate metric and call evaluation done — averages mask the slices where a model fails worst
- [ ] Do not leave "intended use" open-ended — an undefined boundary is an invitation to misuse
- [ ] Do not omit known biases because they're uncomfortable — an undocumented risk is a worse liability than a documented one
- [ ] Do not present accuracy without the class balance / base rate — 95% accuracy on a 95/5 split is meaningless
- [ ] Do not ship without a monitoring plan — a model card without a rollback trigger is a snapshot, not a contract

## Based On

Model Cards for Model Reporting (Mitchell et al., 2019) and the model-documentation practice used in responsible-AI reviews.

## Example Trigger Phrases

- "Write a model card."
- "Document a model's intended use and limitations."
- "Prepare an AI model for review/launch."
