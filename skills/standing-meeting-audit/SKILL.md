---
name: standing-meeting-audit
description: "Audit the recurring meetings a team has accreted — each standing slot tested against its original purpose, current attendance reality, and outcomes, with keep/shrink/merge/kill verdicts and the two-week cancellation experiment that settles arguments. Use when asked audit our recurring meetings, our calendar is all standing syncs, which meetings should die, or reset the team's meeting load. Produces the inventory with per-meeting verdicts, the experiment protocol, the merge map, and the re-accretion guard."
---

# Standing Meeting Audit Skill

Standing meetings are organizational scar tissue: each was created for a reason, the reason healed, the meeting remained. Nobody audits them because each is individually defensible-ish and collectively they're the calendar. The audit tests each slot against three questions — does the original purpose still exist, does the attendance reflect it, what has it produced lately — renders verdicts (keep / shrink / merge / kill / experiment), and deploys the un-arguable tool: *cancel it for two weeks and see what breaks.* Almost nothing breaks, and what breaks reveals the meeting's true minimal form.

## What This Skill Produces

- **The inventory** — every recurring meeting: origin purpose, current attendance, recent outcomes, annualized cost (via [meeting-cost-meter](../meeting-cost-meter/SKILL.md))
- **The verdicts** — keep / shrink (length, cast, or frequency) / merge / kill / two-week-experiment, with reasons
- **The experiment protocol** — how the pause runs, what "broke" means, and the decision rule at the end
- **The re-accretion guard** — expiry dates on new standing meetings, and the quarterly re-audit

## Required Inputs

Ask for these if not provided:
- **The calendar's recurring population** — the standing meetings with their casts, lengths, frequencies; the audit needs the census, not the impressions
- **Per meeting, the archaeology** — why it was created (ask the oldest attendee), what it decided/produced last month (check the notes — absent notes are themselves a finding)
- **The dependencies** — which meetings feed others (the prep meeting for the review meeting is a chain; verdicts consider chains whole)
- **The authority** — who can actually kill what; auditing meetings the auditor can't touch produces resentment reports, not calendars

## Framework: The Audit Rules

1. **Origin vs. present tense:** every standing meeting was born for a purpose — the audit asks whether that purpose still exists in present tense ("the launch coordination sync" for a launch that shipped in March). Purpose-expired meetings are the easy kills, and there are always more than expected.
2. **Attendance is testimony:** chronic optional-izing, half the room multitasking, the same three people talking while nine watch — attendance reality testifies about value more honestly than any survey. A nine-person meeting that's actually a three-person conversation gets shrunk to the conversation.
3. **Outcomes or ritual:** last month's notes show decisions and actions, or they show weather. Meetings producing only status updates get the [async-instead](../async-instead/SKILL.md) conversion test — status moves in documents; discussion needs rooms. No notes at all = the meeting itself doesn't believe it produces anything worth recording.
4. **The two-week experiment beats debate:** contested verdicts get the pause — cancelled two cycles, with a visible parking lot for what would have been raised. Outcome A: nothing broke → kill confirmed. Outcome B: two things broke → the meeting returns as those two things (shorter, smaller). The experiment converts opinion wars into evidence, and its reversibility is why owners accept it.
5. **Guard the re-accretion:** every new standing meeting gets an expiry (12 weeks default) — renewal requires the three-question test again; and the audit itself recurs quarterly at 30 minutes, because scar tissue regrows. The guard is what makes this an immune system instead of a purge.

## Output Format

# Standing Meeting Audit: [team] — [N] recurring slots, ~$[annual total]

## The Inventory & Verdicts
| Meeting | Origin purpose (still live?) | Attendance reality | Recent outcomes | Annual cost | Verdict |
|---|---|---|---|---|---|

## The Experiments
[Contested meetings → the two-cycle pause · the parking lot location · the decision rule at cycle end]

## The Merge Map
[Overlapping slots → the combined form · chains resolved whole]

## The Guard
[Expiry-by-default on new standings · the quarterly 30-minute re-audit, owned by (role)]

## Quality Checks

- [ ] Every recurring slot is in the inventory with cost annualized
- [ ] Origin purposes were checked in present tense, not assumed alive
- [ ] Verdicts cite attendance and outcome evidence, not vibes
- [ ] Contested kills route through the experiment, not the argument
- [ ] The expiry default and re-audit cadence are installed

## Anti-Patterns

- [ ] Do not audit by survey — people defend meetings they multitask through; behavior testifies, opinions perform
- [ ] Do not kill by decree what an experiment can kill by evidence — reversibility is the political unlock
- [ ] Do not shrink everything politely instead of killing anything — ten 25-minute zombies still eat the calendar
- [ ] Do not ignore the chains — killing the prep meeting while keeping the review it feeds breaks both
- [ ] Do not audit once — without the expiry guard, the calendar regrows to baseline in two quarters

## Example Trigger Phrases

- "Audit our recurring meetings."
- "Our calendar is all standing syncs."
- "Which meetings should die?"
- "Reset the team's meeting load."
