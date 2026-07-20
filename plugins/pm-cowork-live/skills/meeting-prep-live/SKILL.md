---
name: meeting-prep-live
description: "Prepare the user for a REAL upcoming meeting by pulling the actual Calendar event, its attendees, the linked Drive docs, and the last email/Slack thread — then producing a brief. Use when asked to prep me for my next meeting, get me ready for the 2pm, or what do I need for the sync with X in Cowork. Reads the event via the Google Calendar connector, gathers the attached and related material via Drive/Gmail, and produces a one-page meeting-brief artifact with objective, context, open threads, and the questions to ask."
---

# Meeting Prep (Live)

Walking into a meeting cold costs the first ten minutes. In Claude Cowork this skill assembles the brief from the user's *real* calendar and files — the event, who's in the room, what's attached, and where the last conversation left off — so they arrive with the context already in hand.

## What This Skill Produces

- **The meeting-brief artifact** — objective, attendees with why-they-matter, the relevant context pulled from real docs/threads, open decisions, and a short list of questions to drive
- **A pre-read pack** — links to the actual Drive docs and the last thread, so nothing needs re-finding mid-meeting
- **The one thing to decide** — the single outcome that makes the meeting worth holding

## Required Inputs

Ask for these if not provided:
- **Which meeting** — the next one, a named event, or a time ("my 2pm")
- **The user's role in it** — chairing, presenting, or attending — the brief's angle follows
- **Depth** — a 30-second glance or a full pre-read

## Framework: What a Brief Must Answer

1. **Why are we meeting** — the objective in one line; if it can't be stated, the meeting is the problem.
2. **Who's here and why** — each attendee's stake and likely position.
3. **Where we left off** — the last decision/blocker from the real thread, not memory.
4. **What must be decided** — the outcome; everything else is discussion.
5. **What the user should ask** — 3–5 questions that move it forward.

## Execution (Cowork)

1. **Find the event** — via the Google Calendar connector, resolve the meeting (next, named, or by time). Read title, description, attendees, and any attached links.
2. **Gather context** — open the attached Drive docs; via Gmail/Slack connectors, pull the most recent thread with those attendees on this topic. Read, don't guess.
3. **Synthesise** — fill the five questions above from what was actually found; mark anything you *couldn't* find as a gap rather than inventing it.
4. **Emit the artifact** — the one-page brief with live links to the sources.
5. **Offer the next action** — e.g. "draft an agenda from this?" — but don't take it unasked.

Guardrails: cite the real source for every claim; never fabricate an attendee position or a decision that isn't in the material; if a connector is unauthorised, produce the brief from what's available and name the gap.

## Output Format

A **Meeting Brief** artifact:

### [Meeting title] · [time] · [chair/present/attend]
**Objective:** one line · **Decision needed:** the one outcome

### Attendees
| Person | Stake / likely position |
|---|---|

### Context (from the real thread & docs)
- key point — *source: [doc/thread link]*

### Open threads / blockers
- …

### Questions to ask
1. …

### Pre-read
- [doc/thread links]

## Quality Checks
- [ ] Every context point cites a real Calendar/Drive/Gmail/Slack source
- [ ] Attendee positions are drawn from material, not invented
- [ ] The single decision-needed is stated
- [ ] Gaps (couldn't find X) are named, not papered over
- [ ] Links resolve to the actual documents

## Anti-Patterns
- **Inventing attendee views** to fill the table — mark unknowns.
- **A brief with no decision** — then question whether the meeting should happen.
- **Summarising a doc you didn't open** — read the real file or flag it missing.
- **Auto-creating an agenda or sending anything** without being asked.

## Example Trigger Phrases
- "Prep me for my next meeting in Cowork."
- "Get me ready for the 2pm with the design team."
- "What do I need for the sync with Acme tomorrow?"
- "Pull the context for my 1:1 and give me questions to ask."
