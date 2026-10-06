---
name: slide-density-rules
description: "Fix slides that are documents in landscape mode — the one-point-per-slide rule, the projection-vs-reading fork that decides density, the text diet (headlines and evidence, prose to notes), and the glance test. Use when asked my slides are too busy, how much text per slide, fix this wall-of-bullets deck, or make this readable from the back of the room. Produces the density diagnosis, the per-slide fixes (split, strip, or move-to-notes), the projection/document fork decision, and the glance-test results."
---

# Slide Density Rules Skill

The wall-of-bullets slide fails twice simultaneously: the audience reads instead of listening (reading speed beats talking speed, so they finish and disengage while the presenter catches up), and nothing on it is retained because everything competed. The fix starts with a fork most decks never take: is this *projected* (accompanying a live talk — then slides are billboards: one point, big, glanceable) or *read* (sent as a document — then it's a doc wearing slide clothes, and density is fine but it should be built as a [outline-before-prose](../outline-before-prose/SKILL.md) memo-deck on purpose)? Hybrid decks that try both do both badly; the rules below are the fork, then the diet.

## What This Skill Produces

- **The fork decision** — projected / reading-deck / both-needed (= two artifacts, honestly)
- **The density diagnosis** — per slide: points-per-slide count, the glance-test verdict
- **The fixes** — split (two points → two slides), strip (prose → the speaker's mouth), demote (detail → notes/appendix)
- **The glance test results** — three seconds per slide: what survives, what was noise

## Required Inputs

Ask for these if not provided:
- **The deck and its delivery mode** — presented live, sent cold, or presented-then-circulated (the fork's honest answer is often "two artifacts": the billboard deck and the leave-behind — cheaper than one artifact failing twice)
- **The room's physics** — screen size, room depth, video-call thumbnails; the back-row test is literal
- **What the presenter will say** — the strip pass moves prose from slides to the spoken track, which requires knowing there is one ([presenter-notes](../presenter-notes/SKILL.md) receives what the slides shed)

## Framework: The Density Rules

1. **The fork first:** projected slides are visual aids for a *voice* — one point each, headline + its evidence, readable in three seconds. Reading decks are documents — full sentences, self-sufficient, denser by design (the consulting-style "slidedoc," built deliberately). The diagnosis names which one this deck is trying to be, and the both-needed verdict spawns two artifacts rather than one compromise.
2. **One point per slide (projected):** the [deck-outline-first](../deck-outline-first/SKILL.md) headline claim + the single piece of evidence that carries it. Slides serving two points get split — slides are free, attention is not. The 40-slide deck that's really 40 glances beats the 12-slide deck of 12 walls.
3. **The text diet:** bullets that are spoken-prose transcripts get stripped to keywords or deleted (the presenter says them; the slide needn't) · caveats and methodology demote to notes/appendix (present-on-demand) · anything the back row can't read at the real room's distance is decoration, not communication — font floor ~24pt projected, and the floor is a physics fact, not a style opinion.
4. **The glance test is the gate:** three seconds per slide — what does a viewer take away? If the answer isn't the slide's one point, the noise (logos, gridlines, the third chart) goes. [chart-choice](../chart-choice/SKILL.md) three-second discipline, applied deck-wide.
5. **Density moves, never vanishes:** the stripped material isn't lost — prose goes to presenter notes, detail to the appendix ("happy to go deeper — slide 24"), the full analysis to the leave-behind doc. The diet redistributes; a deck that deleted its substance projects confidence and answers nothing in Q&A.

## Output Format

# Density Pass: [deck] — mode: [projected / reading / two-artifact]

## The Fork Decision
[The mode with its reasoning · if both-needed: the two-artifact plan]

## The Diagnosis & Fixes
| Slide | Points on it | Glance verdict | Fix |
|---|---|---|---|
[Split / strip-to-spoken / demote-to-notes / appendix]

## The Redistribution
[What moved where: notes ← prose · appendix ← detail · leave-behind ← the full version]

## Quality Checks

- [ ] The fork was decided before any slide was edited
- [ ] Every projected slide carries exactly one point
- [ ] The back-row/thumbnail physics were applied to real fonts
- [ ] Every strip has a destination — nothing substantive vanished
- [ ] The glance test ran per slide with the noise removed

## Anti-Patterns

- [ ] Do not serve two modes with one deck — the hybrid fails as billboard and as document simultaneously
- [ ] Do not read your slides — if the slide says it fully, the presenter is redundant; if the presenter says it fully, the slide can shrink
- [ ] Do not delete substance to look clean — demote it; Q&A will come asking
- [ ] Do not respect the 10-slide superstition over the one-point rule — more glanceable slides beat fewer walls
- [ ] Do not shrink fonts to fit more — the font floor is the room's physics voting

## Example Trigger Phrases

- "My slides are too busy."
- "How much text per slide?"
- "Fix this wall-of-bullets deck."
- "Make this readable from the back of the room."
