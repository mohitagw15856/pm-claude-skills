# Product Manager starter (PM Skills)

You own a product area — discovery to launch. This repository is a ready-made workspace: the skills a product manager reaches for first, installed the same way on every laptop, checked in CI.

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
| [`prd-template`](https://mohitagw15856.github.io/pm-claude-skills/skill/prd-template.html) | Create a Product Requirements Document following proven PM template structure |
| [`rice-prioritisation`](https://mohitagw15856.github.io/pm-claude-skills/skill/rice-prioritisation.html) | Scores and ranks product initiatives using the RICE framework |
| [`roadmap-narrative`](https://mohitagw15856.github.io/pm-claude-skills/skill/roadmap-narrative.html) | Transform a prioritised initiative list into a compelling strategic roadmap narrative |
| [`metrics-framework`](https://mohitagw15856.github.io/pm-claude-skills/skill/metrics-framework.html) | Build a metrics framework for any product, team, or business |
| [`user-research-synthesis`](https://mohitagw15856.github.io/pm-claude-skills/skill/user-research-synthesis.html) | Analyze and synthesize user research findings into structured, actionable insights |
| [`executive-update`](https://mohitagw15856.github.io/pm-claude-skills/skill/executive-update.html) | Transform detailed product updates into concise executive briefings |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/ship-a-feature` runs ambiguity-resolver > prd-template > rice-prioritisation > roadmap-narrative > go-to-market as one chain (`npx pm-claude-skills chain ship-a-feature --input notes.md`).
**Subagent:** `pm-partner` is installed with the Claude Code set; delegate to it from any session.

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
