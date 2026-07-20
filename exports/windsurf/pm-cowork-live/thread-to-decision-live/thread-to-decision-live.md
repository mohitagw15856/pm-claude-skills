---
trigger: model_decision
description: "Turn a REAL Slack thread (or channel) into a logged decision — read it, extract what was decided, who owns what, and record it in Notion — not a template for writing decisions. Use when asked to capture the decision from this thread, log what we agreed, turn this Slack discussion into a decision record, or close this out in Cowork. Reads the thread via the Slack connector, distils the decision / owners / next steps / open questions, and produces a decision-record artifact written to a Notion database (with the source thread linked)."
---

# Thread to Decision (Live)

Decisions made in chat evaporate — three weeks later no one remembers what was agreed or who owns it. In Claude Cowork this skill reads the *real* thread, pins down the decision and its owners, and writes a durable record into Notion, with the source linked, so the agreement survives the scroll.

## What This Skill Produces

- **The decision record** — the decision, the rationale, who decided, owners, next steps with dates, and open questions
- **A Notion entry** — the record written to the user's decision-log database (or an artifact if no DB is set)
- **The confirmation loop** — anything ambiguous flagged back to the user before it's logged as settled

## Required Inputs

Ask for these if not provided:
- **The thread/channel** — a Slack link or the channel + rough time
- **Where to log it** — the Notion decision-log database (or produce an artifact to paste)
- **The stakes** — reversible-and-cheap vs one-way-door — depth of the record follows

## Framework: What a Decision Record Needs

1. **The decision** — stated as a choice made, not a discussion had.
2. **The rationale** — the why, and the main alternative rejected.
3. **Owners & next steps** — who does what by when; a decision with no owner isn't one.
4. **Open questions** — what's still unresolved, so it isn't mistaken for settled.
5. **Provenance** — a link to the source thread and the date.

## Execution (Cowork)

1. **Read the thread** — via the Slack connector, pull the full thread/channel window. Read every message; don't summarise from the first and last.
2. **Distil** — separate the *decision* from the debate. Identify who actually decided, the rationale, the owners named, and what stayed open.
3. **Confirm the ambiguous** — if the thread never clearly lands, say so and ask; never manufacture a decision that wasn't made.
4. **Write to Notion** — via the Notion connector, create an entry in the decision-log database with the fields above and the Slack permalink. If no DB is configured, emit the record as an artifact.
5. **Report** — link the new Notion entry and list any open questions still needing an owner.

Guardrails: don't invent a decision, an owner, or a date not present in the thread; distinguish "decided" from "leaning"; write only to the specified database; if a connector is unauthorised, produce the record inline and say what couldn't be written.

## Output Format

A **Decision Record**:

### Decision
> the choice made — one line

**Decided by:** … · **Date:** … · **Reversibility:** one-way / two-way

### Rationale
- why; main alternative rejected and why

### Owners & next steps
| Owner | Action | By |
|---|---|---|

### Open questions
- … (needs an owner)

### Source
- Slack thread: [link] · Logged to: [Notion entry]

## Quality Checks
- [ ] The decision is stated as a choice, not a discussion summary
- [ ] Every owner/date comes from the thread, not invented
- [ ] "Decided" is distinguished from "still leaning / open"
- [ ] The source thread is linked and the record was written to the named destination
- [ ] Open questions are listed rather than smoothed over

## Anti-Patterns
- **Manufacturing a decision** the thread never reached — flag it as unresolved.
- **Assigning owners** no one agreed to.
- **Logging to the wrong place** — write only to the specified DB.
- **A summary of the chat** instead of a decision record.

## Example Trigger Phrases
- "Capture the decision from this Slack thread and log it in Notion."
- "Turn this discussion into a decision record."
- "What did we actually agree here? Write it to the decision log."
- "Close this thread out with owners and next steps in Cowork."
