---
name: filename-convention
description: "Set a filename convention that sorts, searches, and survives — date-first ISO format, the descriptor grammar, version suffixes that end the FINAL-final2 era, and the rollout that gets a team actually using it. Use when asked set up file naming rules, our filenames are chaos, what should we call our files, or fix the v2-final-FINAL problem. Produces the convention with its grammar, examples for the team's real file types, the version rule, and the one-line cheat sheet."
---

# Filename Convention Skill

`Report_final_v2_FINAL_johns-edits(2).docx` is a filesystem crying for grammar. A working convention is small — date first in ISO form so files sort themselves, a few descriptor slots in fixed order, a version rule that bans "final" — and it's *enforced by usefulness*: names that sort chronologically and surface in search within seconds pay their own adoption. The convention fits on one line; everything longer goes unused.

## What This Skill Produces

- **The grammar** — the slot order (`YYYY-MM-DD_project_doctype_descriptor_v2`) tuned to the team's real files
- **Worked examples** — the team's actual recent files, renamed per the grammar
- **The version rule** — `v1, v2, v3` + `-draft`/`-approved` states; "final" banned by decree with the reason
- **The one-line cheat sheet** — the whole convention, postable in the folder guide

## Required Inputs

Ask for these if not provided:
- **The file population** — what the team actually produces (contracts, decks, exports, meeting docs); the grammar's slots come from what needs distinguishing
- **The sort need** — chronological (date-first) vs. entity-first (`acme_2026-07-19_...` when browsing-by-client dominates); the retrieval pattern picks the lead slot
- **Cloud-doc reality** — Google Docs/Notion pages need the convention too (titles are names); versioned-by-platform files relax the version suffix
- **The current chaos sample** — a dozen real filenames; the before/after table is the convention's best salesman

## Framework: The Grammar Rules

1. **ISO date first (usually):** `2026-07-19` sorts correctly forever, is unambiguous across cultures, and makes every folder self-chronologizing. The one legitimate exception: entity-first when browsing-by-entity is the dominant retrieval — pick per the team's seek pattern, once.
2. **Fixed slot order, hyphen/underscore discipline:** `date_project_doctype_descriptor_version` — underscores between slots, hyphens within them (`acme-renewal`). Fixed order means the eye parses filenames like a table; mixed order means reading every name in full.
3. **The version rule ends the FINAL era:** integers only (`v1`, `v2`), state tags where useful (`v3-approved`), and "final" is banned *because it's a prophecy, not a state* — v4-final-final2 is the ban's justification, printed on the cheat sheet. Platform-versioned files (cloud docs) drop the suffix entirely; duplicating the platform's version history in names is noise.
4. **Descriptors are for humans, dates are for machines:** the descriptor slot answers "which one is this" in two-to-four words (`board-pack`, `signed-copy`, `eu-pricing`) — jargon the team shares is fine; codes only the author knows are not.
5. **Rollout by usefulness, not mandate:** rename the twenty most-touched files as the demonstration, post the one-liner, and apply the convention to everything *new* — old files get renamed when touched (the drain rule from [folder-structure-designer](../folder-structure-designer/SKILL.md)). Mass-renaming breaks links; opportunistic renaming doesn't.

## Output Format

# Filename Convention: [team]

## The One-Liner (post this)
`YYYY-MM-DD_project_doctype_descriptor_vN` — underscores between slots, hyphens inside, ISO dates, integers for versions, "final" is banned.

## Before / After
| Now | Under the convention |
|---|---|
[The team's real dozen, renamed]

## Edge Rules
[Cloud docs: title = name, no version suffix · exports/receipts: date+source+period · the entity-first variant if chosen, with its why]

## Quality Checks

- [ ] The lead slot matches the team's dominant retrieval pattern
- [ ] Slot order is fixed and separator discipline is stated
- [ ] "final" is banned with its printed justification
- [ ] Examples use the team's real files, not invented ones
- [ ] Rollout is new-files-plus-drain, never mass rename

## Anti-Patterns

- [ ] Do not allow DD-MM vs MM-DD ambiguity — ISO or chaos, there is no third option
- [ ] Do not encode what the folder already says — `Clients/Acme/acme-acme-contract` wastes a slot
- [ ] Do not permit "final" even once — it's the gateway drug to FINAL-final2
- [ ] Do not design slots for files the team doesn't produce — grammar bloat kills adoption
- [ ] Do not mass-rename history — links break; the drain rule gets there without the breakage

## Example Trigger Phrases

- "Set up file naming rules."
- "Our filenames are chaos."
- "What should we call our files?"
- "Fix the v2-final-FINAL problem."
