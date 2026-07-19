---
name: knowledge-gardening
description: "Keep a team knowledge base alive — the gardener role and its weekly half-hour, the rot signals (stale pages, orphans, duplicates) and their fixes, the capture funnels that feed the garden, and the pruning that keeps search useful. Use when asked our wiki is a graveyard, who maintains the knowledge base, set up knowledge management that lasts, or people can't find anything anymore. Produces the gardener rotation, the weekly tending routine, the rot triage, and the capture funnels."
---

# Knowledge Gardening Skill

Knowledge bases don't die of bad writing — they die of no gardener: pages rot silently, duplicates sprout (because the original wasn't findable), orphans accumulate, and within two years search returns three contradictory versions of everything, teaching everyone to ask humans again. The fix isn't a heroic cleanup (that's the [shared-drive-cleanup](../shared-drive-cleanup/SKILL.md) move, needed once) — it's *gardening*: a named rotating role, a weekly half-hour routine, rot signals with standard fixes, and capture funnels that turn the team's answered-questions and decisions into pages while they're fresh.

## What This Skill Produces

- **The gardener role** — rotating (monthly), scoped (a half-hour weekly), with the routine written
- **The weekly tending routine** — the four moves: triage new, fix flagged, prune one, merge duplicates
- **The rot triage** — the signals (stale-flag, orphan, duplicate, contradicting) and each one's standard fix
- **The capture funnels** — the answered-twice rule, decision-log links, and the offboarding harvest

## Required Inputs

Ask for these if not provided:
- **The garden's state** — page count, the known-rotten zones, whether the [doc-versioning-discipline](../doc-versioning-discipline/SKILL.md) headers exist (they're the gardening substrate; absent, installing them on the top-50 pages is week one)
- **The team's ask-patterns** — where questions get asked and answered (channels, office hours) — the funnels tap the existing flows
- **The rotation pool** — who can garden (everyone senior enough to judge staleness; rotation spreads both the load and the familiarity)
- **The platform's tools** — labels, backlinks, analytics (zero-traffic page lists are pruning gold) — the routine uses what exists

## Framework: The Gardening Rules

1. **A named gardener or nobody:** the role rotates monthly (spreads knowledge of the garden itself), costs 30 minutes weekly (scoped small enough to actually happen), and is *visible* — the rotation calendar public, the weekly note posted ("gardened: merged the two onboarding pages, flagged 3 stale"). Everyone's-responsibility is the graveyard's origin story.
2. **The weekly four moves:** (a) triage anything new since last week into the structure ([folder-structure-designer](../folder-structure-designer/SKILL.md) logic for wikis), (b) fix or route the flagged (the ⚠ review-overdue pages — 5-minute owner pings), (c) prune one: archive a zero-traffic or superseded page properly, (d) merge one duplicate pair if found. Four small moves weekly beat quarterly heroics arithmetically and psychologically.
3. **Rot signals get standard fixes:** stale-flagged → owner ping with the 5-minute review ask · orphan (no owner) → adopt, reassign, or archive · duplicates → merge to the better, pointer from the other · contradicting pages → the [version-chaos-untangler](../version-chaos-untangler/SKILL.md) move at wiki scale (one canonical, one pointer, same day found).
4. **Funnels feed the garden:** the answered-twice rule (from [faq-builder](../faq-builder/SKILL.md)) routes repeat answers into pages · decisions land as links from the decision log · [session-handoff](../session-handoff/SKILL.md) and offboarding notes get harvested for the pages they imply ([spreadsheet-handover](../spreadsheet-handover/SKILL.md) and its cousins). A garden without funnels is maintained-but-shrinking.
5. **Search health is the KPI:** the garden is working when the team's reflexive move is search-first and the search's first hit is right — measured loosely by the re-ask rate the gardener notices in channels. Rising re-asks = findability rot (naming, duplicates, structure) — a gardening signal, not a training-the-users problem.

## Output Format

# Knowledge Garden: [space] — gardener: [rotation]

## The Role
[Rotation calendar · the 30-minute scope · the visible weekly note format]

## The Weekly Routine
[Triage new → fix flagged → prune one → merge one · with the platform's tools named]

## Rot Triage
| Signal | Standard fix |
|---|---|

## The Funnels
[Answered-twice → pages · decision-log links · handoff/offboarding harvests — each with its trigger]

## Quality Checks

- [ ] The gardener is named, rotating, and publicly scheduled
- [ ] The routine fits 30 minutes with its four moves
- [ ] Every rot signal has a standard fix requiring no committee
- [ ] At least two funnels tap existing flows
- [ ] Search-first behavior is being watched as the health metric

## Anti-Patterns

- [ ] Do not assign the garden to everyone — that's the graveyard's founding charter
- [ ] Do not garden in quarterly heroics — weekly small beats quarterly epic, and actually happens
- [ ] Do not let contradicting pages coexist overnight — canonical-plus-pointer, same day found
- [ ] Do not maintain without funnels — a weeded garden with no planting is a shrinking one
- [ ] Do not solve findability rot with user training — the garden adapts to the askers, not the reverse
