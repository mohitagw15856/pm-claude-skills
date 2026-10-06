---
name: the-org-simulator
description: "Stress-test a proposed org change before announcing it — simulate who gains, who loses, who blocks, where friction erupts in the first 90 days, and run the memo leak test: how does this land when it leaks before you announce it? Use when planning a reorg, changing reporting lines, merging or splitting teams, moving a function, or 'how will this org change land?'. Produces a winners/losers map, a friction forecast, the leak-test read, and a sequenced announcement plan."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-org-simulator.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Org Simulator Skill

Org changes are designed on the box-and-line level and experienced on the
who-do-I-report-to-now level. The gap between those two is where reorgs fail:
the map made sense, but the two best engineers quit, the middle managers went
quiet, and the memo leaked on Tuesday before the Thursday announcement. This
skill simulates the experienced version before the announced version exists —
seat by seat for the key people, faction by faction for the rest, plus the
one test almost nobody runs: reading the memo as the person it demotes, on a
screenshot, out of context.

## What This Skill Produces

- A **winners / losers / undecided map** — by named seat for key people, by
  group for the rest: what each actually loses or gains (scope, status,
  access, headcount, identity), not what the memo says they gain
- A **friction forecast**: the 5–8 specific breakpoints of the first 90 days,
  each with likelihood, blast radius, and the cheap preventative
- The **leak test**: the announcement read as a screenshot by its least
  charitable reader, plus what the corridor version of it will say by Friday
- A **sequenced rollout plan**: who hears it in which order, from whom, with
  the one question each conversation must answer

## Required Inputs

Ask for (if not already provided):
- The change: current structure → proposed structure, and the honest *why*
  (the memo-why and the real-why, if different — the simulation needs both)
- The key seats affected: names/roles, current scope, and what's known of
  their ambitions and frustrations
- History that shapes reception: previous reorgs and how they went, standing
  rivalries, recent departures
- Timing and constraints: what's fixed, what's still movable, who already knows

## Process

1. **Simulate seats, not boxes.** For each key person: scope Δ, status Δ
   (title, audience, room access), boss Δ, identity Δ ("am I still the
   platform person?"). Losses count double — people fight losses harder than
   they chase gains. Mark each seat: champion / accepter / quiet-resister /
   flight-risk, with the *because*.
2. **Find the undecideds.** The middle managers and senior ICs who could go
   either way decide reorg outcomes; list who they'll ask about it in the
   first 24 hours — those people, not the memo, are the actual communication
   channel.
3. **Forecast friction concretely.** Not "there may be resistance" but "the
   two platform leads now share one headcount pool and will collide at
   Q3 planning". For each: likelihood, blast radius, the cheap preventative
   available *before* announcement (a scope clarification, a title fix, a
   pre-conversation).
4. **Run the leak test.** Rewrite the draft announcement's message as
   received by its least charitable reader from a screenshot with no
   context, no Q&A, no follow-up meeting. If the leaked version is fatal,
   the announcement isn't ready. Then write the corridor version — the one
   sentence people will actually repeat — and check it's survivable.
5. **Sequence the rollout.** Order: losers first, privately, from someone
   they trust (hearing it in the all-hands is how flight-risks convert) →
   undecideds' influencers → champions armed with the honest FAQ → everyone.
   Each conversation gets the one question it must answer for that hearer.
   Pressure-test the final plan against [[machiavelli-counsel]]'s friends-of-
   the-old-order column if politics run deep.

## Output Format

```
## The change in one line (memo-why · real-why)

## Seat map
| Seat | Scope Δ | Status Δ | Reads as | Champion/Accepter/Resister/Flight-risk | Because |

## The undecided middle
[Who they are · who they'll ask in the first 24h]

## Friction forecast — first 90 days
| # | Breakpoint (specific) | Likelihood | Blast radius | Cheap preventative |

## Leak test
[The screenshot read, least charitable voice · the corridor sentence ·
verdict: survivable / fix before announcing]

## Rollout sequence
| Order | Who | From whom | The one question this conversation must answer |
```

## Quality Checks

- [ ] Every key seat's read includes a *because* grounded in scope/status/
      identity — no one is labelled a resister without a stated loss
- [ ] At least one friction item the user hadn't foreseen (probe the shared-
      resource collisions and the title deltas — that's where they hide)
- [ ] The leak test uses the least charitable reading, not the intended one,
      and issues a verdict
- [ ] Losers hear it first and privately in the rollout, or the plan argues
      explicitly why not
- [ ] The simulation stays a planning tool: predictions are labelled as
      predictions about *reactions*, not verdicts on people

## Anti-Patterns

- [ ] Do not simulate boxes ("Team A reports to B") — simulate Tuesday
      morning for the person whose title just got shorter
- [ ] Do not let the memo-why hide the real-why from the simulation; people
      react to the real-why they infer, not the memo-why they're given
- [ ] Do not use the seat map as a loyalty dossier — it plans communication,
      not retaliation; decline that turn if asked
- [ ] Do not skip the leak test because "it won't leak" — the test costs ten
      minutes and reorg memos leak at a rate that rounds to always
- [ ] Do not end without the preventatives — a friction forecast with no
      cheap fixes is just organized dread

## Related

[[machiavelli-counsel]] for the power analysis under this; [[change-management-plan]]
for the full formal program; [[stakeholder-influence-mapper]] for the influence
graph the rollout sequence rides on.

## Example Trigger Phrases

- "Plan a reorg."
- "Split teams."
- "Move a function."
- "How will this org change land?"
