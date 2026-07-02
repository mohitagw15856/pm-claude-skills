---
license: mit
configs:
  - config_name: routing
    data_files: routing.jsonl
    default: true
  - config_name: sft-seeds
    data_files: sft-seeds.jsonl
  - config_name: samples
    data_files: samples.jsonl
task_categories:
  - text-generation
language:
  - en
tags:
  - instruction-tuning
  - professional-writing
  - product-management
  - business
  - agent-skills
  - distillation
pretty_name: PM Skills — professional judgment as training data
size_categories:
  - 1K<n<10K
---

# PM Skills instruct — professional judgment as training data

Instruction-tuning data distilled from **[pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills)** — 426 open-source `SKILL.md` files that codify how senior professionals produce PRDs, postmortems, exec updates, launch plans, churn analyses, and 25 professions' worth of real work artifacts. Regenerated deterministically from the repo's canonical sources on every release; the version tag here matches the repo's release tag.

## What's inside

| File | Rows | Contents |
|---|---|---|
| `routing.jsonl` | ~1,500 | Chat-format triplets teaching **skill routing** (realistic task phrasing → skill name), derived mechanically from each skill's trigger clauses |
| `sft-seeds.jsonl` | ~110 | `{system: full skill body, user: curated eval input, assistant: null}` — seeds for teacher-model completion generation (assistant intentionally empty; see the recipe) |
| `samples.jsonl` | ~22 | Complete SFT triplets from the repo's published, human-reviewed sample outputs (each row's `source` field discloses the producing model) |

## Intended use

Fine-tune small models (3B-class) into local professional copilots, or use `routing.jsonl` alone to train/evaluate skill-routing. The two-stage distillation recipe (teacher completions over the seeds → filter with the repo's public eval rubric → SFT) is documented in the [repo's dataset README](https://github.com/mohitagw15856/pm-claude-skills/tree/main/dataset). The same repo publishes **SkillBench**, a professional-work benchmark you can evaluate the result against.

## Provenance & limitations

All content derives from the MIT-licensed skill library — no scraped web data, no user data. `sft-seeds.jsonl` contains **no model outputs**. English-only for now (a localization pipeline is in progress upstream). Task phrasings in `routing.jsonl` are mechanically derived, so they inherit the trigger vocabulary of the source skills — augment with paraphrases for robustness.

## Citation

```
PM Skills instruct dataset, distilled from pm-claude-skills
https://github.com/mohitagw15856/pm-claude-skills
```
