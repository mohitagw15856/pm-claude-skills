# Customer Success starter (PM Skills)

You own retention, renewals, and escalations. This repository is a ready-made workspace: the skills a customer success reaches for first, installed the same way on every laptop, checked in CI.

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
| [`cs-health-scorecard`](https://mohitagw15856.github.io/pm-claude-skills/skill/cs-health-scorecard.html) | Build a customer health scorecard for a specific account |
| [`churn-analysis`](https://mohitagw15856.github.io/pm-claude-skills/skill/churn-analysis.html) | Produce a structured churn analysis that separates avoidable from unavoidable churn |
| [`cs-escalation-brief`](https://mohitagw15856.github.io/pm-claude-skills/skill/cs-escalation-brief.html) | Write a structured escalation brief for an at-risk customer account |
| [`renewal-playbook`](https://mohitagw15856.github.io/pm-claude-skills/skill/renewal-playbook.html) | Build a structured renewal playbook for a customer account |
| [`qbr-deck`](https://mohitagw15856.github.io/pm-claude-skills/skill/qbr-deck.html) | Build a Quarterly Business Review (QBR) deck structure and narrative for a customer account |
| [`account-plan`](https://mohitagw15856.github.io/pm-claude-skills/skill/account-plan.html) | Build a structured account plan for any key customer or target account |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/rescue-an-account` runs cs-health-scorecard > churn-analysis > cs-escalation-brief > renewal-playbook as one chain (`npx pm-claude-skills chain rescue-an-account --input notes.md`).
**Subagent:** `cs-guardian` is installed with the Claude Code set; delegate to it from any session.

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
