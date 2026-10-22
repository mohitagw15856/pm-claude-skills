---
license: apache-2.0
base_model: Qwen/Qwen3-8B
tags: [lora, skills, product-management, professional-work, pm-claude-skills]
---
# PM-8B (LoRA)

A small open model distilled from [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills), a library of 1,302 professional skills. It is a QLoRA adapter over Qwen3-8B, so it runs on a laptop.

**Training data, three kinds:**

- **Routing:** given a task, which professional discipline it needs and why.
- **Structure:** the output skeleton and self-check that discipline enforces.
- **Teacher completions:** a frontier model did real tasks with the matching skill. A judge scored each answer on the SkillBench rubric, and only answers scoring 4/5 or more were kept. Each kept answer is paired with the task alone, so the model learns to do the work without being handed the skill.

**How it was measured:** about 10% of the skills are held out of training entirely. PM-8B and its base model are scored on those skills' tasks by the same judge and rubric as [SkillBench](https://github.com/mohitagw15856/pm-claude-skills/tree/main/skillbench). The "bare" column is the result that matters: it shows the skill's judgment applied without the skill. The results are in `training/pm-8b-results.json` in the source repo.

**What it is not:** a replacement for running the actual skills with a frontier model. Some of the depth stays in the skill files. Report numbers from the held-out run, not impressions.

**Licence and provenance:** the skills are MIT and the base model is Apache-2.0. Teacher completions came from the model named in each row's `meta.teacher`. Check that provider's terms before reusing the dataset to train a competing model.

Pipeline, config and scripts: [`training/`](https://github.com/mohitagw15856/pm-claude-skills/tree/main/training).
