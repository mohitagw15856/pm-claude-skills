---
name: spreadsheet-handover
description: "Hand over a spreadsheet so it survives its author leaving — the README tab that decodes the sheet's logic, the update runbook with sources and cadence, the fragility warnings, and the walkthrough that transfers the judgment. Use when asked document this spreadsheet before I leave, hand over the model to the team, make this sheet survivable without me, or we inherited a workbook nobody understands. Produces the README tab content, the update runbook, the known-fragilities list, and the handover walkthrough agenda."
---

# Spreadsheet Handover Skill

Every team runs on a few sheets that live in one person's head — the model only Priya can update, the tracker with rules nobody wrote down. When that person leaves, the sheet becomes an artifact: used, feared, slowly wrong. The handover fixes it while the head is still available: a README tab (what this sheet does, how it flows, what the tabs are), an update runbook (sources, steps, cadence — executable by a stranger), the fragility confession (what breaks and how you'd know), and a walkthrough where the successor *drives* one real update while the author watches.

## What This Skill Produces

- **The README tab** — purpose, data flow, tab map, owner history — living in the workbook where successors will actually look
- **The update runbook** — the recurring update as numbered steps: sources (with access notes), paste-points, checks, the it-worked signal
- **The fragility confession** — the known landmines: the hardcodes, the order-sensitive steps, the "never sort tab 3" rules
- **The walkthrough plan** — successor-drives-author-watches, on a real update cycle, gaps patched into the runbook live

## Required Inputs

Ask for these if not provided:
- **The workbook and its job** — what decisions it feeds, who consumes its outputs, the update rhythm
- **The author's time** — still here for a month (full handover) vs. leaving Friday (triage: runbook + fragilities first, README from the successor's questions)
- **The successor(s)** — named; a handover to "the team" is a handover to no one — and their sheet fluency (the runbook's assumed-knowledge level follows)
- **The undocumented rules** — the author's habits that ARE the process ("I always eyeball row 12 against the invoice") — extracted by asking "what do you check before you trust it?"

## Framework: The Handover Rules

1. **The README lives in the sheet:** first tab, named `_README` — purpose (two sentences), the data flow in one diagram-ish list (sources → tabs → outputs), the tab map (each tab's one-line job), and the owner line (who, since when, who before). External docs drift and get lost; the tab travels with the file.
2. **The runbook is written to be executed, not read:** numbered steps at do-this grain ("Export the CSV from [system] → paste values-only into `_data` A2 — *values-only or the formats break*"), each source with its access path, and the end-state check ("total in F2 should match the system dashboard ±rounding"). The test: a competent stranger completes the update without messaging anyone.
3. **Fragilities get confessed, not fixed-in-passing:** the handover documents the sheet *as it is* — the hardcoded override in June, the sort that breaks the lookups, the tab held together by hope. Fixing while documenting mixes two risky activities; the confession list becomes the successor's [spreadsheet-audit](../spreadsheet-audit/SKILL.md) agenda for later.
4. **The walkthrough transfers the judgment:** one real update cycle, successor's hands on the keyboard, author narrating only when asked — every hesitation is a runbook gap, patched immediately. The judgment checks ("does this number smell right?") get extracted here, because they never make it into text unprompted.
5. **The sheet gets an owner, not a committee:** the handover ends with the successor's name in the README's owner line and the update calendared under their name. Sheets owned by everyone are updated by no one until the quarter it mattered.

## Output Format

# Handover: [workbook] — [author] → [successor]

## The `_README` Tab (content)
[Purpose · flow: sources → tabs → outputs · tab map · owner line]

## The Update Runbook
[Numbered, do-this-grain steps · source access notes · the end-state checks · time it should take]

## Fragility Confession
[Each landmine: what, where, how-you'd-know, the never-do · flagged as the future audit agenda]

## The Walkthrough
[Scheduled on the next real cycle · successor drives · gap-patching live · the judgment questions to ask the author]

## Quality Checks

- [ ] The README is a tab in the workbook, not a doc beside it
- [ ] The runbook passes the competent-stranger test
- [ ] Fragilities are confessed as-is, not silently fixed mid-handover
- [ ] The walkthrough has the successor driving on real data
- [ ] One named owner ends the process, calendared

## Anti-Patterns

- [ ] Do not document the sheet as it should be — the successor inherits the sheet as it is
- [ ] Do not hand over by author-demo — watching transfers nothing; driving transfers the job
- [ ] Do not write the runbook at concept grain — "update the data" is where handovers die
- [ ] Do not leave the judgment checks tacit — "what do you check before trusting it" is the best question in the room
- [ ] Do not hand to a committee — no name in the owner line, no handover happened

## Example Trigger Phrases

- "Document this spreadsheet before I leave."
- "Hand over the model to the team."
- "Make this sheet survivable without me."
- "We inherited a workbook nobody understands."
