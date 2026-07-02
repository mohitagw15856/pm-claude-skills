---
trigger: model_decision
description: "Autopsy a slide deck from photos or screenshots of its slides — the narrative arc, the numbers, and what each slide is hiding. Use when given slide images (a competitor's pitch, a conference talk, your own deck before a big meeting) and asked what the deck argues, whether it holds up, or how to counter or improve it. Produces a slide-by-slide read, the reconstructed argument chain, weak links, and the questions the deck is engineered to avoid. Requires image input."
---

# Deck Autopsy Skill

A deck is an argument wearing design. This skill reads slide images the way a sceptical partner does — reconstructing the claim chain, checking the numbers against each other across slides, and naming the questions the deck is built to keep the room from asking.

## What This Skill Produces

- A **slide-by-slide read**: each slide's claim, its evidence, and what the design emphasises or buries
- The **reconstructed argument chain** — the deck's whole case as explicit premises → conclusion, with the weak links marked
- A **cross-slide consistency check** on the numbers
- **The avoided questions** — what a hostile reader asks that the deck never answers, and (if it's your deck) how to fix that before they do

## Required Inputs

- **The slide images**, in order if possible. If none attached, ask — this skill autopsies real slides, not deck ideas.
- **Whose deck and why** (ask if missing): analysing a competitor/pitch, or hardening your own before the meeting — the output's stance flips accordingly.

## Autopsy Method

1. **Read each slide twice.** Once for the claim (usually the headline), once for the support (the chart, the numbers, the logos). A slide whose headline isn't proven by its own body gets flagged on the spot.
2. **Read the design as rhetoric.** Truncated y-axes, cherry-picked date ranges, percentages without denominators, log scales unannounced, "representative" logos — chart crimes are claims about weakness. Note them per slide.
3. **Reconstruct the chain.** The deck's argument as numbered premises leading to its ask. Every deck has one; most hide a step. The hidden step is the weakest link.
4. **Cross-examine the numbers.** Do the figures agree *across* slides (TAM vs revenue math, growth rate vs the chart, headcount vs burn)? Cross-slide inconsistency is the highest-value finding an autopsy produces.
5. **List the avoided questions.** Given the claims made, what would a sceptic ask next that no slide answers? Absence is evidence of the sore spot.
6. **Anchor everything.** Every finding cites its slide number. Unreadable content is flagged, never guessed.

## Output Format

### Deck autopsy: [deck] — [n] slides examined

**The deck's argument, reconstructed:**
1. [premise — slide #]
2. [premise — slide #]
∴ [the ask/conclusion — slide #]
**Weakest link:** [which step, why]

**Slide-by-slide:**
**[#n]** — Claims: [headline]. Support: [what's actually shown]. Design notes: [emphasis/burial/chart crimes]. Verdict: holds / overreaches / unproven.

**Numbers cross-check:**
| Figure | Slide(s) | Consistent? | Note |
|---|---|---|---|

**Questions this deck is built to avoid:**
1. [question] — [what triggers it, which slide dances around it]

**[If it's your deck] Hardening list:** [the 3-5 fixes, in order of how likely each hole is to be found in the room]

## Quality Checks

- [ ] Every finding cites a slide number; illegible content is flagged, not guessed
- [ ] Each slide's headline was checked against its own body, not just read
- [ ] Chart integrity was examined (axes, ranges, denominators), not just chart content
- [ ] Numbers were cross-checked *between* slides, not only within them
- [ ] The avoided-questions list follows from the deck's own claims, not generic due-diligence boilerplate

## Anti-Patterns

- [ ] Do not autopsy from a deck's reputation or your memory of the company — only from the slides provided
- [ ] Do not proceed without slide images — for text notes about a future deck, use board-deck-narrative or investor-pitch-deck instead
- [ ] Do not treat beautiful design as evidence of a strong argument — the correlation runs the other way often enough
- [ ] Do not list ten nitpicks and skip the structural weakness — one broken chain link outweighs every font choice
- [ ] Do not soften findings on your own deck — the room won't
