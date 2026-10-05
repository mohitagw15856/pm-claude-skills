---
name: the-open-house
description: "Simulate the open house and the listing agent's read of you — the questions that profile your budget and urgency, the staging that hides what inspection finds, and the offer-pressure choreography, run before you fall in love with anything. Use when asked what is the listing agent thinking, practice viewing a house, what should I not say at an open house, or simulate the offer pressure. Produces the walkthrough transcript with the agent's private profile of you, the what-the-staging-hides checklist, and a debrief on information discipline — what to ask, what to never volunteer."
---

# The Open House Skill

The open house runs in both directions: you're evaluating the house, and the listing agent — who works for the *seller* — is evaluating you. Every friendly question ("been looking long?", "would you need to sell first?", "what's your range?") feeds a profile: budget ceiling, urgency, attachment, negotiating sophistication. Meanwhile the house itself is presenting its best self, staged to move eyes away from exactly what inspections find. This skill runs the visit: the agent's profile of you building line by line, the house's misdirections cataloged, and a debrief on the only discipline that matters — *gather everything, volunteer nothing.*

> **Not quite this?** Use `open-house-plan` when you are the seller's agent planning the event itself.

## What This Skill Produces

- **The walkthrough transcript** — the friendly interrogation, with the agent's private profile note after each of your answers
- **The staging decode** — what the presentation choices in *this* listing typically redirect attention from
- **The offer-pressure act** — "we're expecting multiple offers" and its cousins, played on you
- **The debrief** — every over-share with its neutral replacement, plus the ask-list you should have run

## Required Inputs

Ask for these if not provided:
- **The situation** — actual budget and pre-approval status, current-home status (need to sell first?), timeline pressure, and how much you already love this house (the simulation prices your tells honestly)
- **The listing** — the house as advertised: price, days on market, the photos' emphasis, any disclosed history (days-on-market changes the whole power balance and the agent's script)
- **Your read so far** — what charmed you at the listing stage; charm is where the decode starts

## Framework: The Two Evaluations

1. **Their profile of you assembles from small talk:** "what's your range?" (ceiling captured — every counter now knows it) · "need to sell first?" (contingency weakness noted) · "how soon are you hoping to move?" (urgency priced) · "isn't this kitchen amazing?" (attachment test — enthusiasm is negotiation currency, spent in front of the seller's agent). The trained answers are warm and empty: "we're flexible," "depends on the house," "it's a nice kitchen — what's the roof's age?"
2. **Everything you say reaches the seller:** the listing agent's *job* is relaying buyer intelligence — the simulation shows a gushed comment surfacing later inside a firm counter-offer. The rule installed: talk to your own agent in the car, not in the kitchen.
3. **Staging decodes by redirection:** fresh paint in one room (what did it cover?) · rugs placed oddly (floors) · music and candles (sound and smell — traffic? damp?) · furniture scaled small (room size) · every light on at noon (natural light) · "cozy" (small), "charming" (old), "motivated seller" (leverage — for you). Each observed choice gets its check-instead item, feeding the [inspection-report-decoder](../inspection-report-decoder/SKILL.md) later.
4. **The ask-list flips the visit:** age of roof/HVAC/water heater · days on market and price history · "why are they selling?" (the answer's *shape* is the information) · what's excluded · offer deadlines actually in writing? — questions cost nothing at an open house and are conspicuously absent from most visits; the simulation shows the agent recalibrating their profile of a buyer who asks them.
5. **Offer pressure is choreography until verified:** "multiple offers expected," "another showing at 4," "offers reviewed Monday" — sometimes true, always deployed; the counter is process, not speed ("we'll decide on our timeline; our agent will confirm the offer situation in writing"). The debrief names which pressure lines in the run were verifiable and which were fog.

## Output Format

# Open House: [listing — price, days on market]

> Simulation — a plausible adversarial reading, not a prediction.

## The Walkthrough
[Transcript. *Agent's profile note:* after each exchange — what got captured: "budget ceiling ~X · needs to sell · emotionally attached to the yard"]

## The Staging Decode
| Presentation choice | Typically redirects from | Check instead |
|---|---|---|

## The Pressure Act
[The urgency lines, played · which were verifiable · the process-answer holding]

## Debrief — out of character
| You said | What it cost | The neutral version |
|---|---|---|
[Plus: the ask-list you should have run · the talk-in-the-car rule · the agent-works-for-the-seller reminder, once, plainly]

## Quality Checks

- [ ] Every profile note names the captured variable (ceiling, urgency, attachment, contingency)
- [ ] The staging decode ties each choice to a specific check-instead action
- [ ] The pressure act distinguishes verifiable claims from choreography
- [ ] Debrief replacements stay warm — information discipline, not rudeness
- [ ] The whose-agent-is-this fact appears exactly once, plainly

## Anti-Patterns

- [ ] Do not make the agent sinister — they're doing their job for their client; the lesson is whose client you aren't
- [ ] Do not coach coldness — warm and unrevealing is the skill; hostile buyers get worse deals too
- [ ] Do not let enthusiasm pass unpriced — the simulation's job is showing what the gush costs later
- [ ] Do not treat staging as fraud — it's presentation; the decode is diligence, not accusation
- [ ] Do not stay in character in the debrief

## Example Trigger Phrases

- "What is the listing agent thinking?"
- "Practice viewing a house."
- "What should I not say at an open house?"
- "Simulate the offer pressure."
