---
name: spreadsheet-or-database
description: "Decide honestly when a spreadsheet should become a database or app — the five outgrowth signals (concurrent editing, relational strain, permission needs, scale, process-in-comments), what staying costs vs what migrating costs, and the incremental escape paths. Use when asked should this be a database, our spreadsheet is breaking, is it time to move off sheets, or what should replace this monster workbook. Produces the signal assessment on the actual workbook, the stay-vs-move verdict with costs both ways, and the migration path sized to the team."
---

# Spreadsheet Or Database Skill

Every important spreadsheet is either the right tool or a database wearing a costume — and both errors are expensive: migrating a perfectly good sheet to an app nobody needed (months of building, adoption never comes), or riding a sheet years past its limits (the tab named `Sheet1 (Recovered)`, the row someone sorted into the wrong customer, the formula civilization one intern away from collapse). The decision has real signals, and honest cost accounting on *both* sides — because "we should build an app" and "the sheet is fine" are both usually said by whoever pays neither cost.

## What This Skill Produces

- **The signal assessment** — the five outgrowth signals scored against the actual workbook
- **The verdict** — stay / stay-with-hardening / move — with the costs of each stated, not implied
- **The hardening list** (when staying) — the protections that buy years: input isolation, validation, protection, the audit pass
- **The migration path** (when moving) — sized honestly: low-code table tools before custom apps, one workflow at a time before big-bang

## Required Inputs

Ask for these if not provided:
- **The workbook and its job** — what process lives in it, who touches it, how often; "the sheet" is usually three processes sharing a file, and they may deserve different verdicts
- **The pain, specifically** — overwrites? version forks? broken formulas? permission anxiety? The signals need symptoms, and vague dissatisfaction isn't one
- **The team's build-and-maintain reality** — who would create and *keep alive* anything new; a database nobody maintains is a spreadsheet with worse export
- **Scale numbers** — rows, editors, update frequency; the strain signals key off real magnitudes

## Framework: The Five Signals

1. **Concurrent-editing collisions:** multiple simultaneous editors overwriting, sort-scrambles, "who changed this" mysteries — the strongest move signal, because it's structural: sheets share state; databases share *records*.
2. **Relational strain:** the same entity retyped across tabs (customer names in five places, drifting), VLOOKUP chains holding the tabs together — the sheet is imitating foreign keys without their guarantees. Drift-repair time is the measurable cost.
3. **Permission granularity:** "they should see their rows but not the salary column" — sheet permissions are file-grained (tab protection is a workaround, not a wall); needing row/column-level access control is a database feature being mimed.
4. **Scale symptoms:** load-time complaints, tens of thousands of rows, formula recalc pauses — the honest note: modern sheets carry more than folklore says, and this signal alone rarely justifies moving.
5. **Process-in-comments:** status tracked in cell colors, workflow in comment threads, approvals by "I bolded it" — the sheet is hosting a *process*, and process tools (or a database with views) make state explicit. **The verdict math:** 0–1 signals = stay · 2 signals = stay + harden ([spreadsheet-audit](../spreadsheet-audit/SKILL.md) + validation + input isolation) · 3+ = move, incrementally: low-code table tools first (they migrate imports in days, not months), custom builds only when those demonstrably fail, and one workflow at a time — the big-bang replacement of a living sheet is where these projects die.

## Output Format

# Verdict: [workbook] — [stay / harden / move]

## Signal Assessment
| Signal | Evidence here | Score |
|---|---|---|

## The Costs, Both Ways
[Staying: the drift/repair/risk hours · Moving: build + migration + adoption + *permanent maintenance owner* — named or the move is fiction]

## The Path
[Stay: the hardening list · Move: tool class → first workflow to migrate → the sheet's read-only retirement per [migration-day-runbook](../migration-day-runbook/SKILL.md) logic]

## Quality Checks

- [ ] All five signals scored with workbook-specific evidence
- [ ] Both cost columns are filled — neither option rides free
- [ ] A maintenance owner is named for any move verdict
- [ ] Move paths start low-code and single-workflow
- [ ] Multi-process workbooks got per-process verdicts

## Anti-Patterns

- [ ] Do not prescribe an app for a sheet with 0–1 signals — boring tools that work are underrated
- [ ] Do not ride 3+ signals on sunk-cost loyalty — the collapse arrives at the worst moment by design
- [ ] Do not big-bang the migration — one workflow proves the tool; the rest follows evidence
- [ ] Do not move without a named maintainer — an orphaned database is strictly worse than the sheet
- [ ] Do not treat scale alone as the verdict — modern sheets scale further than the folklore; the other four signals carry more

## Example Trigger Phrases

- "Should this be a database?"
- "Our spreadsheet is breaking."
- "Is it time to move off sheets?"
- "What should replace this monster workbook?"
