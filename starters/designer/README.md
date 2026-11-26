# Designer starter (PM Skills)

You own the experience, from flows to handoff. This repository is a ready-made workspace: the skills a designer reaches for first, installed the same way on every laptop, checked in CI.

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
| [`figma-design-review`](https://mohitagw15856.github.io/pm-claude-skills/skill/figma-design-review.html) | Runs a structured PM design review against product requirements |
| [`design-critique`](https://mohitagw15856.github.io/pm-claude-skills/skill/design-critique.html) | Give structured, constructive feedback on any design using UX frameworks |
| [`design-system-generate`](https://mohitagw15856.github.io/pm-claude-skills/skill/design-system-generate.html) | Generate a complete, accessibility-checked design system from scratch — colour ramps, type scale, spacing, elevation, and exports for CSS, Tailwind, design tokens, Figma, VS Code and PowerPoint |
| [`design-system-audit`](https://mohitagw15856.github.io/pm-claude-skills/skill/design-system-audit.html) | Audit a design system for consistency, coverage, and quality |
| [`accessibility-audit`](https://mohitagw15856.github.io/pm-claude-skills/skill/accessibility-audit.html) | Generate a WCAG 2.2 accessibility audit checklist and remediation suggestions for any UI or design |
| [`design-handoff-brief`](https://mohitagw15856.github.io/pm-claude-skills/skill/design-handoff-brief.html) | Transform feature briefs into structured design briefs that give designers the context they need before opening Figma |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

**End-to-end recipe:** `/design-review` runs design-critique > accessibility-audit > design-system-audit > design-handoff-brief as one chain (`npx pm-claude-skills chain design-review --input notes.md`).

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
