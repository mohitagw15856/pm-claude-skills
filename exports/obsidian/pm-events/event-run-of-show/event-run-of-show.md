---
aliases: ["Event Run of Show"]
tags: [pm-skills, skill]
skill: event-run-of-show
description: "Build the minute-by-minute run of show that lets an event run without the planner being asked anything — every cue, who owns it, what happens if it slips, and the version each supplier actually needs. Use when asked to write a run of show, event schedule, show flow, or production schedule, or to prepare the day-of timeline for a conference, wedding, launch, or gala. Produces the master timeline with owners and cues, the load-in and load-out schedule, the supplier-specific extracts, the contingency triggers, and the on-the-day contact sheet."
---

# Event Run of Show

On the day, the planner becomes a bottleneck the moment anyone has to ask a question. The run of show exists to make the answers findable without you: every cue timed, every cue owned by a named person, and the recovery written for the three things most likely to slip. It is also the document nobody reads in full — so it ships in extracts, one per supplier.

## What This Skill Produces

- **The master timeline** — cue by cue, with clock time, duration, owner, and the trigger that starts it
- **Load-in and load-out schedule** — sequenced by dependency, which is where most overruns are actually born
- **Supplier extracts** — the same timeline filtered to what each supplier needs, because nobody reads 14 pages
- **Contingency triggers** — the three or four most likely slips, with the decision rule and who makes the call
- **The contact sheet** — every supplier's on-the-day person and number, not the account manager
- **The cut list** — what gets dropped, in order, if the schedule runs long

## Required Inputs

Ask for these if not provided:
- **The event** — type, date, venue, headcount, and the format
- **The fixed points** — what cannot move: doors, speeches, a broadcast slot, a licence end time, sunset
- **The suppliers** — who is involved, when they need access, and how long they need
- **The venue constraints** — access times, noise curfew, lift capacity, licence hours, security requirements
- **Who decides on the day** — the single person who makes the call when something slips

## Framework: Fixed Points, Dependencies, Then Everything Else

1. **Place the immovable points first.** Doors, the broadcast window, the ceremony, the curfew. Everything else is scheduled around them, not the reverse.
2. **Build load-in backwards from the first fixed point.** Rig before lighting focus, focus before sound check, sound check before doors. Sequencing by dependency, not by supplier convenience.
3. **Give every cue an owner and a trigger.** Not 'music starts' but 'DJ starts walk-in music on Sarah's cue from the back of house'. A cue with no named owner does not happen.
4. **Build in float where it is cheap.** Ten minutes before a fixed point is worth an hour anywhere else.
5. **Write the contingencies before the day.** Speaker late, rain, AV failure, over-running speeches — decision rule and decider, agreed in advance.
6. **Publish extracts.** Each supplier gets their own rows plus the fixed points. The full document is for the core team only.
7. **Name one decider.** Two people empowered to make calls on the day is worse than none.

## Output Format

### Run of show: [event] · [date] · [venue] · v[n]

**Fixed points:** [time — what] · [time — what] · **Curfew:** [time] · **Decider on the day:** [name, number]

**Load-in**
| Time | Activity | Supplier | Owner | Depends on | Done |
|---|---|---|---|---|---|

**Show**
| Time | Dur | Cue | Trigger | Owner | Notes |
|---|---|---|---|---|---|
| [18:30] | [30m] | Doors, walk-in music | [Venue confirms room clear] | [name] | |

**Load-out**
| Time | Activity | Supplier | Owner | Depends on |
|---|---|---|---|---|

**Contingencies**
| If this happens | Trigger point | We do this | Decider |
|---|---|---|---|
| [speaker late] | [5 min before slot] | [swap to next segment] | [name] |

**Cut list** — if running long, drop in this order: 1. [item] 2. [item] 3. [item]

**Contacts** — [role · name · mobile], on-the-day people only

**Supplier extracts issued:** [supplier — rows — sent date]

> Venue licensing, capacity, curfew and safety requirements are set by the venue and local authority — confirm them directly rather than relying on a schedule. Where an event involves crowd safety, temporary structures, or licensed activity, competent safety advice is required.

## Quality Checks
- [ ] Fixed and immovable points are placed before anything else
- [ ] Load-in is sequenced by dependency, not by supplier preference
- [ ] Every cue has a named owner and an explicit trigger
- [ ] Float exists immediately before each fixed point
- [ ] Contingencies name the decision rule and the decider in advance
- [ ] Supplier extracts have been issued, not just the master document
- [ ] Exactly one person is empowered to make calls on the day

## Anti-Patterns
- **Cues with no owner.** 'The music starts' describes a hope.
- **Scheduling load-in by supplier convenience.** Produces four vans and one lift at 8am.
- **Sending 14 pages to every supplier.** Nobody reads it, so nobody follows it.
- **No float before fixed points.** One small slip cascades into the ceremony.
- **Inventing contingencies on the day.** The worst decisions are made under time pressure by whoever is nearest.
- **Two deciders.** Guarantees a stalled decision at the moment one is needed.
- **Account-manager numbers on the contact sheet.** They are not at the venue on a Saturday.

## Example Trigger Phrases
- "Write a run of show for a 200-person launch event"
- "Build the day-of timeline for this conference"
- "What order should load-in happen in?"
- "Write contingency plans for our outdoor event"
- "Create a production schedule for the gala"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
