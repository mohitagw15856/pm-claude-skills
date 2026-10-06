---
name: agenda-or-cancel
description: "Enforce the simplest meeting rule that works — no agenda, no meeting — with the three-line agenda format (purpose, decisions sought, pre-reads), the 24-hour rule, and the graceful cancel scripts. Use when asked write an agenda for this meeting, should this meeting happen, our meetings have no agendas, or cancel this meeting politely. Produces the three-line agenda, the happen-or-cancel verdict, the cancel/convert scripts, and the team norm rollout."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agenda-or-cancel.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Agenda Or Cancel Skill

The agenda isn't paperwork — it's the meeting's existence test. A meeting whose organizer can't write three lines (what this is for, what we'll decide, what to read first) is a meeting that hasn't earned its attendee-hours, and the kindest outcome is its cancellation or conversion to a message. This skill writes the agenda when one can be written, renders the cancel verdict when it can't, and scripts the graceful exits — because "no agenda, no meeting" only works as a norm when declining is socially cheap.

## What This Skill Produces

- **The three-line agenda** — purpose (one sentence), decisions/outcomes sought (listed), pre-reads with time cost
- **The verdict** — happen / shorten / convert-to-async / cancel — from the agenda-writing attempt itself
- **The scripts** — the polite cancel, the convert-to-message, and the decline-without-agenda lines
- **The norm rollout** — how a team installs the rule without a compliance war

## Required Inputs

Ask for these if not provided:
- **The meeting's claimed purpose** — what the organizer thinks it's for; the agenda attempt tests whether that survives writing down
- **The attendee list and length** — the cost side (people × time), which the purpose must justify
- **What a good outcome looks like** — a decision? alignment? information moved? If the outcome is "information moved," the convert-to-async branch is already winning
- **The recurring-or-oneoff status** — recurring meetings route to [standing-meeting-audit](../standing-meeting-audit/SKILL.md) for the deeper treatment

## Framework: The Test Rules

1. **The agenda is three lines or the meeting is fiction:** *Purpose:* why we're gathering, one sentence. *Outcomes:* the decisions or artifacts this meeting produces (verbs, not topics). *Pre-reads:* what to read and how long it takes. If line two can't list a decision or artifact, the meeting is a broadcast — and broadcasts are messages.
2. **The 24-hour rule:** agenda ships with (or ≥24h before) the invite — attendees who can't prepare attend as audience, and audiences don't decide. Meetings that can't produce an agenda a day out aren't urgent; they're unformed.
3. **The verdict follows the attempt:** agenda writes cleanly → happen (at the length the outcomes justify — most three-line agendas fit 25 minutes). Outcomes are all information-transfer → convert to a message/doc. Purpose exists but no decisions this week → shorten or skip this instance. Nothing survives writing down → cancel, with the script.
4. **Declining needs a cheap script:** "Happy to join — could you share the agenda first so I can prep?" does the enforcement politely; the norm survives only if asking is routine, not confrontational. Organizer-side cancel: "Cancelling — the two items resolved async / aren't ready for decisions yet. Reconvening when [trigger]."
5. **Roll out as a gift, not a law:** the team adopts "agenda-or-cancel" by the leader modeling it on their *own* meetings first (cancelling one publicly is worth ten policy emails), the three-line format pinned where invites happen, and the decline script blessed explicitly so juniors can use it upward.

## Output Format

# Agenda Test: [meeting]

## The Three Lines
**Purpose:** … **Outcomes:** [decisions/artifacts, verbs] **Pre-reads:** [links + minutes]

## The Verdict
[Happen ([N] min) / shorten / convert / cancel — with the reasoning from the attempt]

## Scripts (as needed)
[The cancel · the convert-to-message · the agenda-first decline]

## Rollout (for teams installing the norm)
[Leader models on own meetings · format pinned · decline script blessed downward and upward]

## Quality Checks

- [ ] The outcomes line contains decisions or artifacts, not topic nouns
- [ ] Pre-reads carry their time cost
- [ ] The verdict came from the writing attempt, not from meeting-hating priors
- [ ] Every script is usable by the most junior attendee
- [ ] Recurring meetings were routed to the audit instead of one-off verdicts

## Anti-Patterns

- [ ] Do not write topic agendas — "discuss roadmap" is a location, not a purpose
- [ ] Do not accept "we'll figure it out live" — that's the agenda test failing in real time, at full attendance
- [ ] Do not use the rule as a weapon — the verdict includes "happen"; meeting-zero is not the goal, meeting-earned is
- [ ] Do not ship the agenda at meeting-start — unprepped deciders are attendees
- [ ] Do not install the norm by decree — the leader's own cancelled meeting is the announcement

## Example Trigger Phrases

- "Write an agenda for this meeting."
- "Should this meeting happen?"
- "Our meetings have no agendas."
- "Cancel this meeting politely."
