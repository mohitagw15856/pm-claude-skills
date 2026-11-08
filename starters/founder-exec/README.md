# Founder / Exec starter (PM Skills)

You set direction and answer to a board. This repository is a ready-made workspace: the skills a founder / exec reaches for first, installed the same way on every laptop, checked in CI.

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
| [`strategy-memo`](https://mohitagw15856.github.io/pm-claude-skills/skill/strategy-memo.html) | Write a strategy memo that commits to a bet and says what you won't do |
| [`decision-memo`](https://mohitagw15856.github.io/pm-claude-skills/skill/decision-memo.html) | Write a crisp decision memo that drives a clear decision, not a discussion |
| [`board-pre-read`](https://mohitagw15856.github.io/pm-claude-skills/skill/board-pre-read.html) | Write a board pre-read that's sent before the meeting so the meeting is about decisions, not status |
| [`capital-allocation`](https://mohitagw15856.github.io/pm-claude-skills/skill/capital-allocation.html) | Allocate a finite budget or headcount across competing initiatives by return and strategic fit |
| [`investor-update`](https://mohitagw15856.github.io/pm-claude-skills/skill/investor-update.html) | Write a structured monthly or quarterly investor update |
| [`go-to-market`](https://mohitagw15856.github.io/pm-claude-skills/skill/go-to-market.html) | Create go-to-market assets for any product or feature |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/grow-a-product` runs marketing-funnel-plan > growth-experiment-backlog > retention-loop-design > lifecycle-crm-plan as one chain (`npx pm-claude-skills chain grow-a-product --input notes.md`).
**Subagent:** `launch-captain` is installed with the Claude Code set; delegate to it from any session.

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
