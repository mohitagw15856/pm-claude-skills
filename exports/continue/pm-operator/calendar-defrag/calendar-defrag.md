---
name: "Defragment a work calendar through a tool-using agent — find"
description: "Defragment a work calendar through a tool-using agent — find the meeting debt, propose the consolidation, and (approval-gated) execute the moves. Use when asked to defrag my calendar, get me focus time, audit my meetings, or fix my week. Produces the calendar audit (cost per meeting, fragmentation map), a defrag proposal with focus blocks, and an approval-gated execution plan."
---

# Calendar Defrag Skill

Calendars fragment the way disks did: nothing big fits anywhere, and every week costs more than it returns. This skill audits the week like a capacity planner (what each meeting costs, what the fragments waste), proposes the defrag, and — only with approval — executes the moves through an agent with calendar access.

## What This Skill Produces

- **The audit** — every recurring meeting priced (hours × attendees), fragmentation map of the week, the largest contiguous focus block currently possible
- **The defrag proposal** — meetings to shorten / merge / make async / decline-with-note, moves that consolidate fragments into 2h+ focus blocks
- **The execution plan** — exact calendar operations, shown before any are made

## Required Inputs

Ask for these if not provided:
- **Calendar scope** — which week(s), work hours, timezone
- **The user's real priorities** — defrag serves deep work on *something*; name it
- **Untouchables** — meetings that are politically or contractually fixed
- **Meeting-owner etiquette** — may the agent propose times to others, or only move solo/owned events?

## Framework

1. **Price everything:** duration × attendees = cost; recurring cost × 26 = the six-month bill. Print it — the bill changes minds that advice can't.
2. **The fragment rule:** a gap under 45 minutes is lost time; count the week's fragment waste in hours.
3. **The defrag moves, in preference order:** delete (with a note) → make async (doc + comments) → halve the duration → merge with an adjacent ritual → move to the edge of the day.
4. **Focus blocks are placed first** — 2h+ blocks at the user's stated peak hours; meetings pack around them, not vice versa.
5. **Respect other people's calendars:** moves affecting others become *proposals* (draft messages), never unilateral moves.

## Output Format

# Calendar Defrag: week of [date]
**The bill:** [n] meeting-hours (× attendees = [n] person-hours) · fragments waste [n]h · largest focus block today: [n]min
| Meeting | Cost | Verdict | Move |
|---|---|---|---|
**After defrag:** [n] focus blocks ([hours]), [n]h returned per week.

## Quality Checks
- [ ] Every recurring meeting carries its six-month price
- [ ] Every removal has a draft note to the organizer — silent declines burn trust
- [ ] Focus blocks land on stated peak hours, not leftovers
- [ ] Moves touching other people are proposals with drafts, not actions

## Anti-Patterns
- [ ] Do not judge meetings by name — a "sync" can be load-bearing; price and ask what it decides
- [ ] Do not create focus blocks and leave them unlabeled — an empty slot gets colonized in a day
- [ ] Do not defrag someone into back-to-back meetings to serve the user — fragmentation exported is not fragmentation solved
- [ ] Do not touch the untouchables list, even when they're obviously the problem — name it, don't move it

## Execution

For agents with calendar access (Google/Microsoft APIs or UI). Without tools, the audit + proposal is the deliverable. Rules per [SKILLSPEC.md §5](../../SKILLSPEC.md).

### Preconditions
- The defrag proposal has been produced and **explicitly approved by a human**, line-item vetoes honored.
- Calendar access authenticated; the week(s) in scope named; the untouchables list confirmed.
- The execution plan (exact create/move/shorten/decline operations) displayed and confirmed.

### Allowed actions
- Create the approved focus blocks (named, with decline-meetings visibility set as approved).
- Move or shorten **only** events the user owns, per the approved plan.
- Decline events on the approved list, attaching the approved note.
- Save (never send) the drafted proposals for meetings owned by others.
- Nothing else: **no deleting events outright, no touching other calendars, no auto-accepting, no changes outside the approved week(s).**

### Verification
- Re-read the week: focus blocks exist at approved times; moved events at new times; declined events show the note; nothing outside the plan changed.
- Report the before/after fragment-waste numbers.

### Rollback
- Every move is recorded (event, old time, new time) — undo restores old times and removes created blocks.
- Stop and ask a human if: an event was modified by someone else after approval, a move conflicts with a new event, or any API action fails.
