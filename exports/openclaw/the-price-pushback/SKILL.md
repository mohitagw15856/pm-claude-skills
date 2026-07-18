---
name: the-price-pushback
description: "Simulate the client who grinds on your price — the budget theater, the competitor quote, the scope squeeze — against your actual offer, with a debrief on where you caved and what holding would have sounded like. Use when asked simulate a client negotiating my rate, practice price pushback, they said I'm too expensive, or stress-test my pricing conversation. Produces the negotiation transcript with the client's private playbook notes, the deal outcome, and a debrief on every concession with its stronger alternative."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-price-pushback.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Price Pushback Skill

Every freelancer loses the same negotiation for years before noticing it's the same negotiation: the sharp intake of breath, the mysterious budget ceiling, the competitor who's "half your price," the request to "just trim the number, same scope." This skill plays the client running that playbook against your real offer — each move labeled in their private notes — then debriefs every point where you softened, with the exact words that would have held. The goal isn't winning every deal; it's never again negotiating against yourself.

## What This Skill Produces

- **The transcript** — the pricing conversation, 10–16 exchanges, with the client's private note naming each move as they run it
- **The outcome** — deal / no-deal / deal-at-what-terms, and what the client's notes say they'd *actually* have paid
- **The debrief** — every concession moment, the pressure move that caused it, and the hold that was available

## Required Inputs

Ask for these if not provided:
- **The offer as quoted** — price, scope, terms; a package structure if one exists (see [pricing-your-services](../pricing-your-services/SKILL.md))
- **The floor** — the number below which the work loses money, and whether the user knows it (not knowing it is finding #1)
- **The client shape** — enterprise procurement, small-business owner, startup founder — different playbooks, simulated differently
- **The history** — past discounts given (they set precedent the client will cite), how much the user wants/needs this deal (desperation leaks; the simulation models the leak)

## Framework: The Client's Playbook

| Move | What it sounds like | What it actually is |
|---|---|---|
| **The Flinch** | "Wow. That's… a lot." + silence | Theater; tests whether you'll negotiate against yourself unprompted |
| **The Phantom Budget** | "We only have $X allocated" | A number chosen after hearing yours; rarely load-bearing |
| **The Competitor Quote** | "Someone quoted half that" | Sometimes real, never comparable — scope is the reply, not price |
| **The Scope Squeeze** | "Same deliverables, sharper price?" | The ask to donate margin; the counter is price-per-scope, always |
| **The Future Carrot** | "Lots more work after this one" | Paying for volume that hasn't been ordered; discounts follow commitments, not promises |
| **The Deadline Squeeze** | "Need your best number by 5pm" | Urgency manufactured to prevent exactly the thinking you're doing now |

**Negotiation mechanics to honor:** the first person to re-cut their own number loses the frame · silence after stating price is a move, not a malfunction — the simulation holds it uncomfortably long · every concession without an exchange resets the client's target · "let me re-scope to meet that budget" preserves rate while moving price — it's the master response and the simulation rewards it · walking away from below-floor work is a win condition, and one run should end there.

## Output Format

# Price Pushback: [offer — client shape]

> Simulation — a plausible adversarial reading, not a prediction.

## Transcript
[The negotiation, grounded in the supplied offer. *Client's note:* after each move, naming the play and reading your response — "flinch worked, they offered 10% unprompted."]

## The Outcome
[Terms reached or walk-away · the client's notes on what they'd actually have paid · what precedent this outcome sets for the next negotiation with them]

## Debrief — out of character
| Moment you softened | The move that caused it | The hold (exact words) |
|---|---|---|
[Plus: the re-scope response drafted for this offer · the floor restated with its arithmetic · the silence drill — what 10 seconds of it costs vs. buys]

## Quality Checks

- [ ] Every client move comes from the playbook and is named in their notes
- [ ] The silence-after-price moment appears and is held realistically
- [ ] Every concession in the transcript gets a debrief row with exact replacement words
- [ ] The re-scope-not-re-price response is drafted for this specific offer
- [ ] At least one honorable walk-away is shown or debriefed as the right call

## Anti-Patterns

- [ ] Do not make the client a cartoon — most pushback is professional buyers doing their job; the playbook is normal, which is why it must be recognized
- [ ] Do not let the simulation reward caving — a deal below floor is scored as a loss, whatever the transcript's mood
- [ ] Do not coach deception — holds are about scope, value, and arithmetic, never fake competing offers or invented costs
- [ ] Do not skip the precedent line — this negotiation prices the next three
- [ ] Do not stay in character in the debrief
