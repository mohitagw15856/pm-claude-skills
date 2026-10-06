---
name: meeting-prep-pack
description: "Arrive at a meeting armed in fifteen minutes — the prep pack: what this meeting decides, your position with its reasons, the other attendees' likely stances, the questions to ask, and the outcome you're steering toward. Use when asked prep me for this meeting, what should I know before this call, I have 15 minutes before a big meeting, or help me not wing it. Produces the one-page prep pack with position, stances, questions, and the walk-away-with list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/meeting-prep-pack.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Meeting Prep Pack Skill

Most meetings are won before they start — by the one attendee who knows what the meeting actually decides, holds a position with reasons, and has guessed the room's stances. Everyone else is winging it, which is why the prepared voice steers. The prep pack is fifteen minutes of structure: the real decision at stake (often not the stated agenda), your position and its evidence, the per-attendee read (who wants what, who blocks, who decides), the two questions worth asking, and the concrete walk-away-with list that defines success before the room defines it for you.

> **Not quite this?** Use `meeting-prep-live` when you want it to read the real calendar event and linked documents through a connector.

## What This Skill Produces

- **The stakes read** — what this meeting actually decides, and what the stated agenda hides
- **Your position card** — the stance, its three strongest reasons, and the concession you can afford
- **The room map** — per attendee: likely stance, what they care about, the decider marked
- **The questions and the walk-away list** — the two questions that advance your position, and what leaving-with-success concretely means

## Required Inputs

Ask for these if not provided:
- **The meeting's context** — the invite, agenda, any pre-reads, and the backstory the user carries ("this is the third attempt to settle X")
- **The user's honest position** — what they want out of it, what they'd concede, and where they're genuinely unsure (unsure is a fine position; the pack prepares questions instead of stances there)
- **The cast** — who's attending, their roles, and any known views; the room map is built from what the user knows, labeled as reads-not-facts
- **The user's role in the room** — decider, advocate, expert witness, or spectator (a spectator's prep is lighter, and knowing you're one is itself useful prep)

## Framework: The Fifteen-Minute Rules

1. **Find the real decision:** agendas say "discuss Q3 plan"; meetings decide things — resourcing, priority, whose approach wins. The pack names the actual decision at stake, because arguments aimed at the stated topic miss the real one. If genuinely nothing gets decided, that's the [agenda-or-cancel](../agenda-or-cancel/SKILL.md) conversation instead.
2. **Position with reasons, concession pre-chosen:** the stance in one sentence, its three best reasons ranked (lead with the strongest — meetings rarely grant time for the fourth), and the pre-decided concession — because concessions chosen live under pressure are always too large ([the-price-pushback](../the-price-pushback/SKILL.md) logic, applied to conference rooms).
3. **Map the room in one line each:** attendee → likely stance → what they actually care about (the currency their agreement is bought in) → and mark the decider, because persuading the room while losing the decider is a common way to win applause and lose the decision.
4. **Questions are moves:** two prepared questions that either surface information you need ("what would it take for ops to support this?") or advance the position by making others state theirs ("what's the cost of deciding this next month instead?"). Prepared questions outperform prepared speeches in almost every room.
5. **Define walk-away-with before walking in:** the concrete success ("decision recorded with date," "the pilot approved," "objection X surfaced and answered") — plus its fallback ("if no decision: agreement on the deciding criteria and a date"). Rooms drift; the list is the rudder, and the fallback prevents leaving with warm vagueness.

## Output Format

# Prep Pack: [meeting] — [time] · your role: [decider/advocate/witness/spectator]

## The Real Decision
[What's actually at stake, vs. the stated agenda]

## Your Position
[The stance · three reasons, ranked · the affordable concession · the genuinely-unsure zones → questions]

## The Room
| Attendee | Likely stance (read) | Their currency | Decider? |
|---|---|---|---|

## Your Two Questions
[1 · 2 — each with what it's designed to produce]

## Walk Away With
[The success, concretely · the fallback if the room drifts]

## Quality Checks

- [ ] The real decision is named, distinct from the agenda where they differ
- [ ] Reasons are ranked and the concession is pre-chosen
- [ ] Room reads are labeled as reads; the decider is marked
- [ ] Both questions have a purpose stated
- [ ] The walk-away list is concrete, with a fallback

## Anti-Patterns

- [ ] Do not prep the stated topic when the real decision differs — that's rehearsing for the wrong play
- [ ] Do not enter without a concession chosen — pressure prices concessions badly
- [ ] Do not treat room reads as facts — they're hypotheses the meeting tests
- [ ] Do not prepare speeches over questions — rooms resist being told and enjoy answering
- [ ] Do not leave success undefined — undefined success becomes "it went fine," which means nothing happened

## Example Trigger Phrases

- "Prep me for this meeting."
- "What should I know before this call?"
- "I have 15 minutes before a big meeting."
- "Help me not wing it."
