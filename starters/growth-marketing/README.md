# Growth / Marketing starter (PM Skills)

You own acquisition, activation, and retention loops. This repository is a ready-made workspace: the skills a growth / marketing reaches for first, installed the same way on every laptop, checked in CI.

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
| [`marketing-funnel-plan`](https://mohitagw15856.github.io/pm-claude-skills/skill/marketing-funnel-plan.html) | Plan a full-funnel marketing strategy from awareness to retention |
| [`growth-experiment-backlog`](https://mohitagw15856.github.io/pm-claude-skills/skill/growth-experiment-backlog.html) | Build and prioritise a growth experiment backlog |
| [`retention-loop-design`](https://mohitagw15856.github.io/pm-claude-skills/skill/retention-loop-design.html) | Design retention and engagement loops that bring users back |
| [`lifecycle-crm-plan`](https://mohitagw15856.github.io/pm-claude-skills/skill/lifecycle-crm-plan.html) | Design lifecycle marketing / CRM journeys across the customer lifecycle |
| [`paid-acquisition-plan`](https://mohitagw15856.github.io/pm-claude-skills/skill/paid-acquisition-plan.html) | Plan a paid acquisition / performance marketing program with unit economics that work |
| [`messaging-framework`](https://mohitagw15856.github.io/pm-claude-skills/skill/messaging-framework.html) | Build a messaging framework (message house) that the whole company can use consistently |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/grow-a-product` runs marketing-funnel-plan > growth-experiment-backlog > retention-loop-design > lifecycle-crm-plan as one chain (`npx pm-claude-skills chain grow-a-product --input notes.md`).

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
