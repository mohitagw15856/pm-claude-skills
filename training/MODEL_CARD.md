---
license: mit
base_model: Qwen/Qwen2.5-7B-Instruct
tags: [lora, skills, product-management, professional-work, pm-claude-skills]
---
# pm-skills-7b (LoRA)

The first open model distilled from a skills library: a LoRA over Qwen2.5-7B-Instruct trained on 646 pairs derived from the 750 skills of [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) — teaching **skill routing** (which professional discipline a task needs, and why) and **structural discipline** (the output skeleton + self-verification bar that skill enforces).

**What it is:** a fast local router and structure-setter for professional tasks.
**What it is not:** a replacement for running the actual skills with a frontier model — 646 pairs teach the shape of judgment, not its depth. Stated plainly so nobody has to discover it.

Training pipeline, dataset generator, and config: [`training/`](https://github.com/mohitagw15856/pm-claude-skills/tree/main/training) in the source repo. Dataset also on the [HF dataset](https://huggingface.co/datasets/mohit15856/pm-skills).
