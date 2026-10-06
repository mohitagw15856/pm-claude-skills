---
name: migration-day-runbook
description: "Move a team's files to a new platform without losing work or a week — the pre-migration freeze, the verified copy, the permissions remap, the cutover announcement, and the old-system read-only afterlife. Use when asked we're moving from Dropbox to Drive, migrate our files to SharePoint, plan the file migration day, or how do we switch platforms safely. Produces the migration runbook: freeze window, copy-and-verify steps, permissions mapping, the cutover comms, and the rollback line."
---

# Migration Day Runbook Skill

File migrations fail at the edges, not the middle: work edited during the copy window (lost or forked), permissions that mapped wrong (the intern sees the comp sheet; Legal sees nothing), links across the company now pointing at a dead platform, and an old system left writable so half the team never leaves. The runbook handles the edges: a short announced freeze, copy *with verification* (counts and spot-checks, not vibes), a permissions remap done as its own workstream, cutover comms with the three answers everyone needs, and the old platform flipped read-only — the single move that makes migrations stick.

## What This Skill Produces

- **The runbook** — phased: prepare → freeze → copy → verify → permissions → cutover → afterlife, each with owner and duration
- **The verification plan** — counts by folder, spot-restores, and the biggest-risk samples checked by hand
- **The permissions remap** — old-model groups/shares → new-model equivalents, with the deny-by-default posture for mismatches
- **The comms set** — the advance notice, the freeze reminder, and the cutover announcement with its three answers

## Required Inputs

Ask for these if not provided:
- **From → to, and the size** — platforms, volume (GB and file count), and any known exotica (huge files, weird formats, apps writing into the old drive)
- **The sharing surface** — external shares, published links, and integrations pointing at the old platform; each is a breakage waiting for its line in the runbook
- **The freeze tolerance** — can the team stop editing for a day? A weekend? Never (then the delta-sync approach, stated)?
- **The permission model gap** — how sharing works old vs. new; the remap is where migrations quietly leak confidential files

## Framework: The Edge Rules

1. **Freeze short, announce twice:** the copy happens inside a declared no-edits window (evening/weekend for most teams) — announced a week out and the day before. Edits during the copy are the classic loss; the freeze is cheaper than the fork-hunt.
2. **Verify by count and by sample:** post-copy: file counts per top-level folder old-vs-new, total size within tolerance, and hand-checks of the highest-stakes folders (Legal, Finance, the current projects). A migration is "done" when verification says so, not when the progress bar does.
3. **Permissions are a workstream, not a checkbox:** inventory the old platform's shares (especially external ones), map to the new model, and where the models don't align, **fail closed** — over-restricting gets a complaint ticket; over-sharing gets an incident. External shares get re-issued deliberately, not bulk-recreated.
4. **The cutover announcement answers exactly three questions:** where do I go now (the link) · what happened to my stuff (same structure, here's the map) · what do I do if something's missing (the named person, the SLA). Everything else is noise; these three prevent the help-desk flood.
5. **The old platform goes read-only, immediately:** the afterlife rule — readable for the transition period (comfort + the missing-file safety net), writable never (or half the team quietly stays). A read-only banner pointing at the new home does more for adoption than any training session. Decommission date set now, calendar-reminded, executed after the retention check ([document-retention-map](../document-retention-map/SKILL.md)).

## Output Format

# Migration Runbook: [old] → [new], [date]

## Phases
| Phase | When | Owner | Duration |
|---|---|---|---|
[Prepare (inventory, permissions map, comms 1) · Freeze · Copy · Verify · Permissions · Cutover (comms 3) · Afterlife (read-only flip)]

## Verification Plan
[Counts per top folder · size tolerance · the hand-check list (highest-stakes folders) · the pass/fail line]

## Permissions Remap
[Old shares inventory → new equivalents · fail-closed mismatches · external shares re-issued deliberately]

## Comms
[T-7 notice · T-1 freeze reminder · cutover announcement: the three answers + the missing-file contact]

## Rollback Line
[The condition that aborts (verification fails, permissions can't map) · rollback = unfreeze the old, reschedule — cheap because the old is untouched until read-only]

## Quality Checks

- [ ] The copy happens inside an announced freeze
- [ ] Verification is counts + samples with a pass/fail line, before cutover comms
- [ ] Permission mismatches fail closed, external shares handled by hand
- [ ] The announcement answers exactly the three questions with a named missing-file contact
- [ ] The old platform is read-only from cutover, with a decommission date set

## Anti-Patterns

- [ ] Do not copy a live drive — the freeze is one evening; the fork-hunt is one month
- [ ] Do not trust the progress bar as verification — counts and samples or it didn't happen
- [ ] Do not bulk-recreate external shares — each one re-issued is each one re-decided
- [ ] Do not leave the old platform writable "during transition" — that's two sources of truth, i.e., zero
- [ ] Do not skip the rollback line — a migration that can't abort will be pushed through broken

## Example Trigger Phrases

- "We're moving from Dropbox to Drive."
- "Migrate our files to SharePoint."
- "Plan the file migration day."
- "How do we switch platforms safely?"
