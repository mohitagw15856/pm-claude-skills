---
trigger: model_decision
description: "Pull the action items and decisions out of meeting notes or a transcript — each with an owner, a due date, and enough context to become a ticket — plus the open questions. Use when asked to extract action items, turn these notes into tasks, who owns what from this meeting, or pull the to-dos from this transcript. Produces the ticket-ready action list (owner + due + context), the decisions made, the open questions with no owner yet, and a flag for any 'someone should…' that never got assigned."
---

# Meeting Action Extractor

Half of what's decided in meetings evaporates because no one wrote down who owns it and by when. This reads the notes or transcript and pulls out the *commitments* — separating a real action ("Priya will send the spec by Friday") from a wish ("we should really look at that") — attaches an owner and a due date, and flags the orphan tasks nobody actually took, so they don't quietly die.

## What This Skill Produces

- **Ticket-ready actions** — each with owner, due date, and one line of context so it can go straight into a tracker
- **Decisions made** — what was actually decided (vs. discussed), for the record
- **Open questions** — unresolved items with no owner yet
- **Orphan flags** — the "someone should…" tasks that were raised but never assigned, surfaced so you can assign or drop them

## Required Inputs

Ask for these if not provided:
- **The source** — meeting notes or transcript (paste it)
- **The attendees** — names/roles, so owners resolve correctly (a "Priya will…" maps to a real person)
- **Default due window** — if dates weren't stated (e.g. "assume next Friday unless said"), or leave as [TBD]
- **Where these go** — Jira/Linear/a list — tunes the format (this reads notes; it doesn't create tickets)

## Framework: Commitments, Not Chatter

1. **Action vs. wish.** A real action has an implied owner and a verb someone agreed to do; "we should" with no taker is an orphan, not an action.
2. **Owner or orphan.** Every action gets a named owner or is flagged unassigned — never silently ownerless.
3. **Due date or [TBD].** Attach the stated deadline, apply the default window, or mark [TBD] — don't invent a date.
4. **Decision ≠ discussion.** Record what was decided distinctly from what was merely talked about.
5. **Context to be a ticket.** One line of "why/what" so the action is actionable without replaying the meeting.
6. **Never fabricate.** If who-owns-what isn't in the source, flag it — don't guess an owner.

## Output Format

### Actions — [meeting] · [date]
| # | Action | Owner | Due | Context |
|---|---|---|---|---|
| 1 | Send the API spec | Priya | Fri | for the mobile team's estimate |

### Decisions
- [what was decided]

### Open questions (no owner yet)
- [question] — needs: [who should own deciding]

### ⚠ Orphans — raised, never assigned
- "[someone should…]" — assign to whom, or drop?

## Quality Checks
- [ ] Real actions are separated from wishes/chatter
- [ ] Every action has a named owner or is flagged as an orphan
- [ ] Due dates are stated, defaulted-with-note, or marked [TBD] — never invented
- [ ] Decisions are recorded separately from discussion
- [ ] Each action has enough context to become a ticket on its own
- [ ] No owner or date is fabricated from thin air

## Anti-Patterns
- **Turning every sentence into a task** — chatter isn't a commitment.
- **Ownerless actions** — a to-do with no name is a to-don't.
- **Inventing owners or due dates** not in the source.
- **Merging decisions and discussion** so the record is muddy.
- **Dropping the orphans silently** — the "someone should" items need a decision.

## Example Trigger Phrases
- "Extract the action items from these meeting notes with owners and dates."
- "Turn this transcript into tickets — who owns what by when?"
- "Pull the decisions and to-dos out of our sync."
- "What did we commit to in this meeting, and who's on the hook?"
