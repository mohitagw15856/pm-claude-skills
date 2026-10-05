---
name: shared-drive-cleanup
description: "Clean up a shared drive nobody owns — the ownership-first move, the top-down audit that finds the 80% (stale projects, duplicates, ex-employee folders), the archive-don't-delete discipline for shared property, and the norms that prevent regrowth. Use when asked our shared drive is a disaster, clean up the team drive, who owns all these folders, or people are scared to delete anything. Produces the audit map, the archive plan with the fear-killing rule, the ownership assignments, and the going-forward norms."
---

# Shared Drive Cleanup Skill

Shared drives rot for one structural reason: shared ownership is no ownership. Nobody deletes (it might be someone's), nobody files (whose rule?), and the drive becomes archaeology — ex-employees' folders, three "Marketing" directories, project debris from 2022. The cleanup starts with ownership (one named steward, or nothing sticks), proceeds top-down (folder-level verdicts, never file-by-file), and replaces deletion fear with the archive rule: *nothing is destroyed; everything doubtful moves to a dated archive that nobody has ever actually needed to reopen — but could.*

## What This Skill Produces

- **The audit map** — top-level folders × last-modified × apparent owner × verdict (keep / archive / merge)
- **The archive plan** — `_archive/2026/` moves, the fear-killing everything-is-recoverable rule, the announcement
- **The ownership layer** — steward named per surviving top-level folder; unowned folders can't survive the audit
- **The norms** — the placement rules + naming convention + quarterly review that prevent the regrowth

## Required Inputs

Ask for these if not provided:
- **The drive's shape** — top-level listing with last-modified dates (the audit works at this altitude; no file inventories)
- **The political reality** — whose folders are whose, any sensitive territories (Legal's corner, the exec folder), and whether a steward mandate exists or must be manufactured
- **The team's fear level** — has deletion ever caused an incident? The archive rule's prominence scales with the scar tissue
- **Platform** — Drive/SharePoint/Dropbox — permissions and versioning mechanics differ; the plan uses the real ones

## Framework: The Cleanup Rules

1. **Ownership precedes organization:** appoint the steward (or become it) before touching anything — cleanups without an owner regress within a quarter. Every top-level folder that survives gets a named steward too; "the team's" folders go to the audit's merge-or-archive pile.
2. **Audit top-down, verdict at folder level:** last-modified > 12 months + no named owner → archive candidate, whole. Duplicated concepts (three Marketings) → one survivor, others merged-then-archived. File-by-file review is how cleanups die; folders are the unit.
3. **Archive, never delete — and say so loudly:** everything doubtful moves to `_archive/[year]/[original-name]` — visible, searchable, restorable. The announcement leads with this rule because fear is the blocker: "nothing is being deleted; everything is one search away" converts objectors into shruggers. (Actual deletion happens years later, per the [document-retention-map](../document-retention-map/SKILL.md), by the steward, quietly.)
4. **Ex-employee folders get a protocol, not a taboo:** steward + the person's former manager skim for the live material (extract to owned homes), then the folder archives whole. The taboo version — untouchable ghost folders — is how drives become graveyards.
5. **Regrowth prevention is norms plus cadence:** the surviving structure gets placement rules ([folder-structure-designer](../folder-structure-designer/SKILL.md)), the naming line ([filename-convention](../filename-convention/SKILL.md)), and a quarterly 30-minute steward review. A cleanup without the cadence is a before photo.

## Output Format

# Drive Cleanup: [drive] — steward: [name]

## The Audit Map
| Top-level folder | Last modified | Owner | Verdict |
|---|---|---|---|

## The Archive Move
[`_archive/2026/` plan · the announcement draft, leading with nothing-is-deleted · the restore-on-request promise]

## Ownership Layer
[Surviving folders × stewards · the ex-employee protocol runs on: (list)]

## Going Forward
[Placement rules posted · naming line · quarterly steward review, calendared]

## Quality Checks

- [ ] A steward exists before any move happens
- [ ] Verdicts were made at folder level — no file-by-file audit
- [ ] The announcement leads with the archive-not-delete rule
- [ ] Every surviving top-level folder has a named steward
- [ ] The quarterly review is calendared — cleanup without cadence is a photo

## Anti-Patterns

- [ ] Do not clean without a mandate — unowned cleanups get reverted by the first objector
- [ ] Do not review file-by-file — the audit dies at folder 40 of 4,000
- [ ] Do not delete in round one — archive buys the same tidiness without the fear war
- [ ] Do not leave ghost folders as memorials — the protocol extracts and archives them respectfully
- [ ] Do not skip the announcement — silent cleanups read as data loss and generate the incident the fear predicted

## Example Trigger Phrases

- "Our shared drive is a disaster."
- "Clean up the team drive."
- "Who owns all these folders?"
