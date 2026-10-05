---
name: agm-in-a-box
description: "Run a club, PTA, or association AGM that finishes on time and holds up later — the notice and agenda done right, a quorum plan, minutes that capture decisions not conversations, elections without awkwardness, and the follow-up that makes decisions real. Use when a volunteer says 'I have to run the AGM', 'what goes in the agenda', 'nobody comes to our meetings', or 'our elections are a mess'. Produces the notice, agenda, chair's script, minutes template, and quorum rescue plan."
---

# AGM In A Box Skill

Every club and association has one meeting a year that legally/constitutionally
matters, and it's usually run by a volunteer who inherited a folder and a
sense of dread. A good AGM is mostly preparation: notice sent the right way at
the right time, an agenda where decisions are visible in advance, a chair's
script so the running of it isn't improvised, and minutes that record what was
*decided* — because in three years, when someone asks "when did we agree to
that?", the minutes are all that exists. This skill produces the whole box,
tuned to the organization's own constitution — which it asks for rather than
guessing.

## What This Skill Produces

- The **notice pack**: announcement text with date/venue/deadlines, proxy/
  nomination forms if used, timed to the constitution's notice period
- The **agenda**, decision-forward: what's being decided, reports as reading
  not speeches, election slots, AOB rules
- The **chair's script**: opening, quorum check, how to take each item, how
  to run a vote, handling the member with a grievance, closing
- **Minutes template** + the follow-up list format (decision → owner → date)
- A **quorum rescue plan**: getting people to actually come, and what the
  constitution says happens if they don't

## Required Inputs

Ask for (if not already provided):
- The organization and its constitution/rules — pasted if possible; the
  notice period, quorum number, and election rules live there, and this
  skill works from *their* rules, flagging "check your constitution" where
  not provided
- What must be decided this year: elections (which posts), rule changes,
  budget/subs, anything contentious
- Attendance reality: how many usually come vs the quorum
- The awkward stuff, honestly: contested posts, a grievance-holder, last
  year's chaos

## Framework

1. **Work backwards from the constitution.** Notice period sets the send
   date; quorum sets the turnout target; election rules set the nomination
   process. Where the user hasn't provided the document: use common defaults
   *labelled as defaults to verify*, never as their rules.
2. **Make the agenda decision-forward.** Members show up when something is
   decided, not reported. Reports circulated in advance and "taken as read"
   with questions only; decisions named as motions in the agenda ("Motion:
   raise subs to £X") so nobody's ambushed; AOB items requested in advance
   with a chair's discretion line.
3. **Script the chair.** Verbatim openings for each segment, the vote
   procedure (propose, second, discuss with time-box, vote, record the
   count), and the two hard moments: the long-talker ("thank you — I'll take
   two more speakers, then vote") and the grievance ("that deserves proper
   time — I'm ruling it to a committee meeting on [date], recorded in
   minutes").
4. **Minutes record decisions, not dialogue.** Per item: motion text ·
   proposed/seconded · vote result with counts · action + owner + date.
   Nobody's speech is summarized; three years from now the counts matter and
   the speeches don't.
5. **Rescue quorum before the day.** Personal asks beat posters (the
   three-line "we need YOU there Thursday" message, sent by name) · pair the
   AGM with something people want (social, guest speaker, awards) · proxy
   forms where allowed. And the honest branch: what the constitution says if
   quorum fails — usually a reconvene rule; find it now, not at 7:40pm.

## Output Format

```
## Timeline (backwards from AGM date)
[Notice by · nominations by · reports circulated · reminders]

## Notice pack
[The announcement + forms, ready to send]

## Agenda (decision-forward)
[Numbered, with motions stated in full]

## Chair's script
[Segment-by-segment, with the two hard-moment lines]

## Minutes template + follow-up list
[Decision-record format · action/owner/date table]

## Quorum plan
[Named-ask message · the pairing · the failure branch per constitution]
```

## Quality Checks

- [ ] Every rule-dependent element (notice, quorum, elections) is anchored to
      their constitution or explicitly flagged as a default-to-verify
- [ ] Motions appear in full in the agenda — no decision happens that wasn't
      announced
- [ ] The chair's script covers the long-talker and the grievance
- [ ] Minutes template records counts and owners, not speeches
- [ ] The quorum plan includes the personal-ask message, not just posters

## Anti-Patterns

- [ ] Do not assert legal/charity/company requirements by jurisdiction —
      constitution first, verify-flags second, invented law never
- [ ] Do not build a speech-schedule agenda — reports are reading, meetings
      are for deciding
- [ ] Do not script the chair to shut people down — time-boxes and routing,
      not suppression
- [ ] Do not treat AOB as an open mic; rules for it exist in the agenda

## Related

[[committee-handover-pack]] for after the elections; [[volunteer-treasurer-basics]]
for the finance report's author; [[meeting-notes]] for ordinary meetings that
don't need the box.

## Example Trigger Phrases

- "I have to run the AGM."
- "What goes in the agenda?"
- "Our elections are a mess."
