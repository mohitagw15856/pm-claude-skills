# AI/ML Engineer starter (PM Skills)

You're shipping an AI/LLM feature responsibly. This repository is a ready-made workspace: the skills a ai/ml engineer reaches for first, installed the same way on every laptop, checked in CI.

## Start

```bash
npx pm-claude-skills sync          # installs the set in .pm-skills.json for Claude Code and Cursor
npx pm-claude-skills lock          # pins the exact skill contents; commit pm-skills.lock
npx pm-claude-skills doctor        # confirms what is installed and what is stale
```

Then open the project in your agent and describe the task; the skill is picked by its description.

## What is in the loadout

| Skill | Does |
|---|---|
| [`ai-feature-prd`](https://mohitagw15856.github.io/pm-claude-skills/skill/ai-feature-prd.html) | Write a PRD for an AI-powered feature, covering the things normal PRDs miss |
| [`rag-design-doc`](https://mohitagw15856.github.io/pm-claude-skills/skill/rag-design-doc.html) | Design a Retrieval-Augmented Generation system end to end |
| [`agent-spec`](https://mohitagw15856.github.io/pm-claude-skills/skill/agent-spec.html) | Specify an autonomous or tool-using AI agent before building it |
| [`ai-eval-plan`](https://mohitagw15856.github.io/pm-claude-skills/skill/ai-eval-plan.html) | Design an evaluation plan for an LLM or AI feature before shipping it |
| [`llm-cost-latency-budget`](https://mohitagw15856.github.io/pm-claude-skills/skill/llm-cost-latency-budget.html) | Model the cost and latency of an LLM feature before it ships and surprises the bill |
| [`model-card`](https://mohitagw15856.github.io/pm-claude-skills/skill/model-card.html) | Document a deployed ML/AI model so others can use it responsibly |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/launch-an-ai-feature` runs ai-feature-prd > rag-design-doc > ai-eval-plan > llm-cost-latency-budget > model-card as one chain (`npx pm-claude-skills chain launch-an-ai-feature --input notes.md`).

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
