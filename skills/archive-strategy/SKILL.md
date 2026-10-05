---
name: archive-strategy
description: "Design the archive layer that keeps current workspaces lean without losing history — what moves, when, to where, findable-by-search, with the project-close ritual that makes archiving automatic instead of aspirational. Use when asked set up an archiving system, our workspace is drowning in old projects, when should things get archived, or make history findable without cluttering today. Produces the archive triggers, the destination structure, the findability rules, and the close-out ritual."
---

# Archive Strategy Skill

Workspaces drown not in bad files but in *finished* ones — closed projects, past years, shipped versions — all cluttering the space where current work lives, because "archive" was never defined as an action with a trigger. A working archive strategy answers four questions structurally: *when* does something move (triggers, not judgment calls), *where* (a parallel dated structure, not a junk room), *how is it found* (search + a skeleton index, not browsing), and *who moves it* (the close-out ritual, so archiving happens at natural endings instead of never).

## What This Skill Produces

- **The triggers** — the events that move material to archive automatically: project close, year end, version supersession, person departure
- **The destination structure** — `_archive/[year]/[original-path]` mirroring, so provenance survives the move
- **The findability layer** — search-first retrieval + the one-page archive index for the things search misses
- **The close-out ritual** — the 20-minute end-of-project checklist where archiving actually happens

## Required Inputs

Ask for these if not provided:
- **The workspace(s)** — drive, project tool, wiki, or all three; each gets the same triggers, platform-appropriate mechanics
- **The natural endings** — what "closed" looks like here (shipped, signed-off, renewed, year-end); triggers attach to real events the team already recognizes
- **The retrieval reality** — how often archived material actually gets fetched, and by whom; findability effort scales to real demand, not imagined
- **Retention constraints** — anything with keep-periods or destruction dates ([document-retention-map](../document-retention-map/SKILL.md) rules ride along into the archive)

## Framework: The Strategy Rules

1. **Triggers beat judgment:** "archive when the project closes / the year ends / v2 ships / the person leaves" — event-attached rules fire; "archive old stuff sometime" never does. Every trigger names its event and its mover.
2. **Mirror the path, date the layer:** `_archive/2026/Clients/Acme/` preserves where things lived — provenance is half of future findability, and flat archive dumps ("old-files/") destroy it. The move is a cut-paste of whole folders, never a reorganization-during-archiving (that's how archiving stalls).
3. **Search-first, index-light:** archives are retrieved by search (names per [filename-convention](../filename-convention/SKILL.md) make this work), plus one skeleton index per year — ten lines: what major things this year's archive holds. Elaborate archive taxonomies serve nobody; the index serves the search-resistant cases.
4. **Active workspaces show only the living:** the payoff metric is the current workspace's size — if this year's project list fits one screen, the strategy is working. Archive isn't storage policy; it's *attention* policy for the space where work happens.
5. **The ritual is where it becomes real:** project close-out = 20 minutes: final artifacts named per convention → folder moved to the archive mirror → the year-index line written → links in living docs updated. Attached to the existing close process (the retro, the invoice, the handoff), owned by the project's closer — rituals attached to nothing fire like triggers attached to nothing.

## Output Format

# Archive Strategy: [workspace]

## The Triggers
| Event | What moves | Who moves it |
|---|---|---|

## The Destination
[`_archive/[year]/[mirrored-path]` · whole-folder moves · retention/destruction notes riding along]

## Findability
[Search-first note · the year-index skeleton (ten lines) · where the index lives]

## The Close-Out Ritual (20 min, attached to [the existing close event])
[Name-final → move → index-line → fix-links — with the owner role named]

## Quality Checks

- [ ] Every trigger names a real event and a mover
- [ ] The archive mirrors original paths under a year layer
- [ ] Retrieval is search + skeleton index — no archive taxonomy project
- [ ] The ritual is attached to an existing close process with an owner
- [ ] The current workspace visibly shrank — the strategy's actual success metric

## Anti-Patterns

- [ ] Do not archive by mood — triggerless archiving is a euphemism for never
- [ ] Do not flatten paths into a dump — provenance is findability
- [ ] Do not reorganize while archiving — the move is a move; improving history is a separate (usually skippable) project
- [ ] Do not build archive taxonomy — search plus ten index lines outperforms it at 5% of the cost
- [ ] Do not let archives exempt themselves from retention rules — destruction dates ride along with the files

## Example Trigger Phrases

- "Set up an archiving system."
- "Our workspace is drowning in old projects."
- "Make history findable without cluttering today."
