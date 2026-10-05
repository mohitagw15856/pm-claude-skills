---
name: meeting-cost-meter
description: "Price meetings in money and focus — the attendee-hours × loaded-rate math, the recurring multiplier that turns a weekly 30-minutes into a real annual number, and the cost-vs-outcome read that decides what the price buys. Use when asked what does this meeting cost, price our meeting culture, is this recurring meeting worth it, or make the case for fewer attendees. Produces the cost computation with stated assumptions, the recurring annualization, the cost-per-outcome read, and the reduction levers ranked."
---

# Meeting Cost Meter Skill

Meetings are the only five-figure purchases made without a price tag: a weekly hour with nine people at a blended $120/hour loaded rate is ~$56,000 a year — a number nobody approved because nobody computed it. The meter computes it (attendee-hours × honest loaded rates × the recurring multiplier), then asks the only question the number exists for: *what does this price buy, and is there a cheaper supplier* — fewer people, shorter slot, lower frequency, or a document. The output is leverage for change, not gotcha theater: the point is better purchases, not shame.

## What This Skill Produces

- **The price** — per instance and annualized, with the rate assumptions stated (loaded, not salary-only, and labeled as estimates)
- **The context-switch surcharge** — the honest note that the calendar cost exceeds the clock cost (fragmentation prices separately — see [context-switch-budget](../context-switch-budget/SKILL.md))
- **The cost-per-outcome read** — what the meeting produces, priced per decision/artifact
- **The reduction levers, ranked** — attendees, length, frequency, format — each with its recomputed price

## Required Inputs

Ask for these if not provided:
- **The meeting's shape** — attendees (count and rough seniority mix), length, frequency
- **The rate basis** — real loaded rates if known, or the placeholder bands (stated as placeholders: loaded cost ≈ 1.3–1.6× salary; senior-heavy rooms price differently than mixed ones)
- **The outcomes** — what this meeting demonstrably produces (decisions per month, the artifact, the alignment that prevented X); the meter prices *against* something or it's just a big number
- **The political intent** — pruning a calendar? Making a case to a boss? Auditing a culture? The output's framing follows the use

## Framework: The Meter Rules

1. **Loaded rates, labeled honest:** salary ÷ 2000 undercounts by 30–60% (benefits, overhead) — the meter uses loaded bands and *states them as assumptions*, because a cost argument built on precise-looking fake numbers dies at the first challenge. Ranges beat points.
2. **The recurring multiplier is the reveal:** per-instance costs feel small; ×48 weeks is where the number gets attention. Every recurring meeting gets annualized — "this standing sync is a $56k/year line item" is the sentence that changes calendars.
3. **Price against the outcomes:** decisions-per-quarter, the artifact produced, the coordination that visibly prevented rework — cost ÷ outcomes gives cost-per-decision, and a $4,600 monthly review producing zero decisions for three months prices its own verdict. Meetings with unpriceable-but-real outcomes (trust, cohesion) get that stated honestly, not zeroed — the meter informs judgment, it doesn't replace it.
4. **Levers in leverage order:** attendee count first (the only lever that's linear and painless — two optional attendees off a weekly hour = ~$12k/year back), then length (60→25 min is usually free), then frequency (weekly→biweekly halves), then format (the async conversion, via [async-instead](../async-instead/SKILL.md)). Each lever ships with its recomputed price so the proposal is arithmetic, not opinion.
5. **The meter serves proposals, not prosecutions:** the output frames as "here's what we're paying and three cheaper options" — cost-shaming a meeting its owner loves entrenches it; showing the owner what $30k of savings buys elsewhere converts them.

## Output Format

# Meeting Price: [meeting]

## The Computation
[Attendees × length × loaded band = per instance · × frequency = annual · assumptions stated as ranges]

## Cost Per Outcome
[The outcomes claimed/observed · price per decision/artifact · the unpriceable-but-real noted honestly]

## The Levers (recomputed)
| Lever | Change | New annual price | Saved |
|---|---|---|---|

## The Proposal Frame
[The one-paragraph case: current price → recommended lever(s) → what the savings buy]

## Quality Checks

- [ ] Rates are loaded, banded, and labeled as assumptions
- [ ] Recurring meetings show the annualized number
- [ ] The cost is priced against stated outcomes, with unpriceables acknowledged
- [ ] Every lever carries its recomputed price
- [ ] The framing proposes, not prosecutes

## Anti-Patterns

- [ ] Do not price with salary-only rates — undercounting discredits the whole meter
- [ ] Do not present per-instance costs for recurring meetings — the multiplier is the truth
- [ ] Do not zero the unpriceable outcomes — cohesion is real; the meter flags, judgment weighs
- [ ] Do not lead with the biggest number as an accusation — converted owners cut meetings; shamed owners defend them
- [ ] Do not stop at the price — the meter's product is the cheaper-supplier proposal, priced

## Example Trigger Phrases

- "What does this meeting cost?"
- "Price our meeting culture."
- "Is this recurring meeting worth it?"
- "Make the case for fewer attendees."
