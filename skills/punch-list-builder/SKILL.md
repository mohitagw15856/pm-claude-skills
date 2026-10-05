---
name: punch-list-builder
description: "Turn walkthrough notes, photos, or voice-memo transcripts into a proper construction punch list with location, trade, and spec reference per item. Use when asked to build a punch list, clean up walkthrough notes, organise a deficiency list, prep for substantial completion, or track punch items to closeout. Produces a numbered punch list grouped by location with severity tiers, responsible subcontractor, back-charge candidates, and closeout/retainage linkage."
---

# Punch List Builder Skill

"Fix paint in hallway" closes nothing. A punch item that closes reads: *Level 2, Corridor 2C, north wall — drywall finish fails Level 4 requirement per spec 09 29 00; responsible: [drywall sub]; verify: repaint entire wall section, re-inspect under raking light.* This skill converts messy walkthrough notes into that — a numbered, trade-assigned, spec-referenced punch list an owner's rep can sign off against and a super can actually run subs from.

## What This Skill Produces

- A **numbered punch list** grouped by location (building → level → room), one deficiency per item
- Per item: **location, trade, responsible subcontractor, spec/drawing reference, severity tier, acceptance criterion**
- A **back-charge candidate flag** on damage-by-others and repeat-failure items
- **Trade-by-trade rollup** for distributing scoped lists to each sub
- **Closeout linkage** — items tied to substantial completion, retainage release, or warranty

## Required Inputs

Ask for what's missing; from raw notes alone, build the list and tag inferred fields `[verify]`:

- **Walkthrough notes** — however rough: bullets, transcript, photo captions
- **Location scheme** — building/level/room numbering used on the drawings (so items are findable)
- **Sub list by trade** (who to assign items to) — if absent, assign by trade and mark sub `[assign]`
- **Spec sections / finish schedule** available for referencing (optional but sharply raises defensibility)
- **Project stage** — pre-punch, substantial completion punch, or final/warranty walk — it sets the severity bar

## Severity & Assignment Framework

**Tier every item:**

| Tier | Definition | Consequence |
|---|---|---|
| **A — Blocks completion** | Life-safety, code, non-functional systems, missing inspections | Blocks substantial completion / certificate of occupancy |
| **B — Blocks acceptance** | Doesn't meet contract documents — wrong product, failed finish tolerance, incomplete scope | Blocks final payment / retainage for that trade |
| **C — Cosmetic** | Touch-up, adjustment, cleaning within spec tolerance | Track to zero, but don't hold the project on it |

Never let a Tier A hide inside a room's list of C's — pull Tier A items to the top summary.

**Assign one responsible party per item.** "GC to coordinate" is not an assignee. Where trades overlap (e.g. scratched frame — painter or the trade who scratched it?), assign the most likely party and flag the dispute.

**Back-charge screening.** Flag as back-charge candidates: damage to completed work by another trade, rework of previously-accepted work, and items a sub was already directed to fix once. Note the evidence needed (photo, prior notice date) — a back-charge without paper is a gift.

**Closeout linkage.** Mark which items gate substantial completion (Tier A), which gate retainage release per trade (Tier B), and which convert to warranty items if the owner accepts occupancy first.

## Output Format

### Punch List: [Project] — [Walk date, stage, attendees]

**1. Summary** — item counts by tier and by trade; the Tier A list in full.
**2. Punch items by location** — table per area:

| # | Location | Description of deficiency | Spec/Dwg ref | Trade | Responsible sub | Tier | Back-charge? | Acceptance criterion | Status |
|---|---|---|---|---|---|---|---|---|---|

**3. Trade rollups** — per-sub extract with item numbers and due date field.
**4. Back-charge candidates** — item #, basis, evidence held/needed.
**5. Closeout linkage** — items gating substantial completion; items gating retainage by trade; warranty conversions.

## Quality Checks

- [ ] Every item names a findable location using the project's numbering — no "hallway near the thing"
- [ ] One deficiency per item — compound notes are split so each can close independently
- [ ] Each item has exactly one responsible party (or a flagged dispute), never "various" or left blank
- [ ] Spec or drawing reference present where documents were provided; `[verify]` where inferred
- [ ] Every item has an acceptance criterion — what "done" looks like at re-inspection
- [ ] Tier A items surfaced in the summary, not buried in room lists

## Anti-Patterns

- [ ] Do not write subjective items ("looks bad") — describe the deficiency against a spec, tolerance, or the approved mockup
- [ ] Do not bundle five defects into one line — bundled items never fully close
- [ ] Do not assign items to "GC" as a default — the punch list is how work reaches the sub who owes it
- [ ] Do not treat the punch list as append-forever — new-found items after the walk go on a dated supplement, not silently inserted
- [ ] Do not flag a back-charge without naming the evidence — an unsupported back-charge poisons the sub relationship for nothing

## Example Trigger Phrases

- "Build a punch list."
- "Clean up walkthrough notes."
- "Organise a deficiency list."
- "Prep for substantial completion."
- "Track punch items to closeout."
