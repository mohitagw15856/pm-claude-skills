# Engineering Lead starter (PM Skills)

You own architecture, delivery, and on-call. This repository is a ready-made workspace: the skills a engineering lead reaches for first, installed the same way on every laptop, checked in CI.

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
| [`technical-spec-template`](https://mohitagw15856.github.io/pm-claude-skills/skill/technical-spec-template.html) | Create structured technical specification documents that bridge product requirements and engineering implementation |
| [`architecture-decision-record`](https://mohitagw15856.github.io/pm-claude-skills/skill/architecture-decision-record.html) | Create an Architecture Decision Record (ADR) for any technical decision |
| [`rfc-writer`](https://mohitagw15856.github.io/pm-claude-skills/skill/rfc-writer.html) | Write an engineering RFC (Request for Comments) for a technical decision, architectural change, or significant implementation approach |
| [`code-review-checklist`](https://mohitagw15856.github.io/pm-claude-skills/skill/code-review-checklist.html) | Generate a tailored code review checklist for any pull request based on the language, type of change, and risk level |
| [`incident-postmortem`](https://mohitagw15856.github.io/pm-claude-skills/skill/incident-postmortem.html) | Write a structured incident postmortem or post-incident review |
| [`runbook-writer`](https://mohitagw15856.github.io/pm-claude-skills/skill/runbook-writer.html) | Write an operational runbook for a service, incident type, or deployment procedure |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/ship-a-feature` runs ambiguity-resolver > prd-template > rice-prioritisation > roadmap-narrative > go-to-market as one chain (`npx pm-claude-skills chain ship-a-feature --input notes.md`).

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
