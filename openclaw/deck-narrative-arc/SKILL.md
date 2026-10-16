---
name: deck-narrative-arc
description: "Give a deck a spine the room can follow — the situation-complication-resolution arc, the tension that makes the recommendation feel necessary, the transitions that carry the thread between slides, and the arc-check that catches sag. Use when asked make this deck flow, my presentation feels like disconnected slides, structure the story of this pitch/readout, or the room got lost in the middle. Produces the arc mapping, the tension line, the transition script, and the sag diagnosis."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/deck-narrative-arc.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Deck Narrative Arc Skill

A deck can pass every slide-level test — clean headlines, honest charts — and still lose the room, because rooms follow *stories*, not sequences. The oldest working arc: **situation** (the world as the audience knows it — brief, they live there) → **complication** (the tension: what changed, what threatens, what's newly possible — this is where attention gets recruited) → **resolution** (the recommendation, arriving as the *answer to the tension* rather than as an announcement). Decks that sag in the middle usually have no complication — nothing at stake — so the resolution lands as opinion instead of necessity.

## What This Skill Produces

- **The arc mapping** — the deck's slides assigned to situation / complication / resolution, with the imbalances flagged
- **The tension line** — the complication stated in one sentence; the thing the whole deck resolves
- **The transition script** — the spoken sentence between each slide that carries the thread ("so if that's the leak — what's causing it?")
- **The sag diagnosis** — where the room will drift, and the fix (usually: tension arrived too late or dissolved too early)

## Required Inputs

Ask for these if not provided:
- **The deck (or its outline)** — arcs are checked against the actual sequence ([deck-outline-first](../deck-outline-first/SKILL.md) headlines are the ideal input)
- **The audience's starting state** — what they already believe and know; the situation section's length is set by *their* familiarity, and re-explaining their own world is the classic opening sag
- **The genuine tension** — what's actually at stake (the risk, the closing window, the competitor's move, the cost of drift); decks without real stakes should say so honestly and be informational, not dramatic
- **The exec-timing constraint** — answer-first audiences ([exec-vs-working-deck](../exec-vs-working-deck/SKILL.md)) still get an arc — it's compressed: the tension arrives in the first two minutes, not built across ten

## Framework: The Arc Rules

1. **Situation earns two slides, maximum:** the audience lives in the situation — one or two slides establish the shared frame ("we all know retention is the year's priority") and move. Openings that tour the audience's own world train them to check their phones by slide four.
2. **The complication is the deck's engine:** one sentence of genuine tension — "but month-two churn doubled, and it's concentrated in exactly the segment we're betting on" — introduced early, kept alive until resolved. The test: after the complication slide, would the room *object to stopping the meeting*? If stopping feels fine, there's no tension yet.
3. **The resolution answers the tension, visibly:** the recommendation arrives phrased against the complication ("the onboarding rebuild closes the month-two leak") — the same proposal, unanchored to the tension, reads as one option among many; anchored, it reads as the necessary move. This is why arc precedes advocacy.
4. **Transitions carry the thread out loud:** the sentence between slides — "so if the leak is month two — what's driving it?" — is scripted ([presenter-notes](../presenter-notes/SKILL.md) holds them), because slide-to-slide is where rooms fall off. Silent transitions ("next slide…") drop the thread the arc spun.
5. **Diagnose sag structurally:** the drift points map to arc failures — early sag = situation too long · middle sag = complication resolved too early or never sharpened · end sag = resolution without an ask ([proposal-skeleton](../proposal-skeleton/SKILL.md): the ask closes). The fix is re-sequencing, not more energy in delivery.

## Output Format

# Narrative Arc: [deck]

## The Arc Mapping
| Slides | Arc role | Balance check |
|---|---|---|
[Situation (≤2) · Complication · Resolution+Ask — the flags where imbalanced]

## The Tension Line
[The complication in one sentence · where it lands in the deck · the stopping-the-meeting test result]

## Transition Script
[Between each slide pair: the spoken thread sentence]

## Sag Diagnosis
[Predicted drift points · the structural cause · the re-sequencing fix]

## Quality Checks

- [ ] Situation occupies ≤2 slides for a familiar audience
- [ ] The tension is one sentence, genuine, and arrives early
- [ ] The recommendation is phrased as the tension's answer
- [ ] Every slide-pair has a scripted transition sentence
- [ ] Sag points were diagnosed structurally, not blamed on delivery

## Anti-Patterns

- [ ] Do not tour the audience's own world — the situation is a handshake, not a chapter
- [ ] Do not manufacture fake tension — a room that smells drama-cosplay discounts the real stakes too
- [ ] Do not resolve the tension in the middle and keep presenting — post-resolution slides are encores nobody requested
- [ ] Do not deliver the recommendation unanchored — the same words, tied to the tension, double their force
- [ ] Do not fix structural sag with delivery energy — enthusiasm over a missing complication is mime work

## Example Trigger Phrases

- "Make this deck flow."
- "My presentation feels like disconnected slides."
- "Structure the story of this pitch/readout."
