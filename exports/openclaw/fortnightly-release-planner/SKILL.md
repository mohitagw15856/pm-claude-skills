---
name: fortnightly-release-planner
description: "Use when asked to plan releases for a side project or small open-source repo, turn a backlog into a release schedule, ship smaller and more often, or write a ROADMAP.md. Turns a backlog into small themed two-week releases and produces ROADMAP.md, a theme and scope for each release with what is deliberately left out, and a changelog template. For a stakeholder roadmap narrative inside a company, use roadmap-narrative."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/fortnightly-release-planner.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Fortnightly Release Planner

Side projects stall when the next release is "when it is done": the scope grows, nothing ships, and users assume the project is abandoned. Small releases every two weeks, each with one theme, keep momentum and give users a reason to come back. This skill turns a backlog into a sequence of themed fortnightly releases that fit the time the maintainer actually has.

## Required Inputs

Ask for these if not provided:
- **The backlog**: issues, ideas and bugs, in any form
- **Hours available per fortnight**, honestly
- **Current version** and versioning scheme (semantic versioning or dates)
- **Users' top complaints or requests**, if known
- **Fixed dates**: a conference talk, a dependency deprecation, a launch post

## Output Structure

### 1. Sized backlog
A table of every item with a size in hours and a value score:
| Item | Type (bug, feature, docs, chore) | Size (hours) | User value (1 to 3) | Depends on |

Items over half the fortnight's hours are split before planning, and the split is shown.

### 2. Release plan
For each release, in order:

```markdown
### v[x.y.0]: [Theme in three to six words]   (target: [date])
**Why this theme now:** [one sentence linked to a user need or fixed date]
**In:** [items, with sizes; total within 80% of the fortnight's hours]
**Out (on purpose):** [items that fit the theme but wait, and why]
**Done means:** [two or three observable results]
```

Plan four to six releases. Leave 20% of each fortnight unplanned for bugs and review.

### 3. ROADMAP.md
A ready-to-commit file with: a two-sentence statement of where the project is heading, the next three releases (theme, target date, three headline items each), a "Later" list without dates, and a "Not planned" list with one-line reasons.

### 4. Changelog template
A `CHANGELOG.md` section to copy for each release, following Keep a Changelog headings:
```markdown
## [x.y.0] - YYYY-MM-DD
**Theme:** ...
### Added
### Changed
### Fixed
### Removed
```

### 5. Release-day checklist
Six to eight binary steps for shipping a release in under 30 minutes (tag, notes, publish, announce).

## Quality Checks

- [ ] Every release has a single theme of three to six words
- [ ] Planned hours per release are at most 80% of the hours available
- [ ] No item larger than half a fortnight remains unsplit
- [ ] Every release lists what was left out on purpose
- [ ] Fixed dates from the inputs are honoured in the plan
- [ ] ROADMAP.md has a "Not planned" list with reasons
- [ ] The changelog template uses the Added, Changed, Fixed and Removed headings

## Anti-Patterns

- **The kitchen-sink release.** A release with six unrelated features has no story and slips.
- **Planning at 100% of capacity.** Bugs and reviews always arrive; plan to 80%.
- **Dates on everything.** "Later" items with dates become broken promises.
- **Skipping the changelog.** Users judge a project's health by its recent releases.

## Example Trigger Phrases

- "Turn my backlog into a release plan, I have about 6 hours a fortnight."
- "Write a ROADMAP.md for my side project."
- "Help me ship smaller releases more often."
- "Plan the next few releases of my open-source library with themes."
