---
name: accessible-travel-planner
description: "Plan a trip that actually works with a disability or access need — confirm real accessibility (not just 'accessible' labels), book the assistance in advance, plan for equipment and medication, and build in the contingencies for when access breaks down. Use when someone says 'plan an accessible trip', 'travelling with a wheelchair/disability', 'book assistance for my flight', or 'will this hotel actually work for me'. Produces an access-verified itinerary, an assistance-booking checklist, an equipment/medication plan, and contingency scripts. Verify specifics with providers."
---

# Accessible Travel Planner Skill

Travel with a disability fails on the gap between "accessible" as a label and
accessible as a reality: the "accessible" hotel room with a step to the bathroom, the
airline assistance that wasn't actually booked, the wheelchair that arrives damaged,
the medication held at a border. The disabled travelers who have good trips plan
differently — they verify access against their *specific* needs rather than trusting
the word, book assistance well ahead and get it in writing, and pre-plan for the
predictable failures. This skill runs that planning. It can't guarantee a provider's
access, so it verifies specifics with the source and builds the contingencies for when
things go wrong anyway.

## What This Skill Produces

- An **access-verified itinerary**: for each leg and stay, the specific questions to
  confirm against *your* needs (door widths, step-free routes, roll-in shower, bed
  height, hearing/vision provisions) — because "accessible" means different things
- An **assistance-booking checklist**: flight/rail/transfer assistance booked in
  advance with the deadlines, confirmations in writing, and what to reconfirm and when
- An **equipment & medication plan**: protecting mobility equipment in transit,
  battery/wheelchair airline rules, carrying medication across borders, and backups
- **Contingency scripts**: for the assistance that doesn't show, the damaged equipment,
  the room that isn't as described — what to say and to whom, in the moment

## Required Inputs

Ask for (if not already provided):
- The trip (where, when, how — flying/rail/road) and the specific access needs
  (mobility aid used, transfer ability, sensory needs, medical equipment, fatigue/
  pacing, service animal)
- The bookings made or being considered (airline, hotels, transfers) so they can be
  access-checked
- Equipment and medication involved, and any documentation the user has (medical
  letters, equipment specs)
- Risk tolerance and support: solo or with a companion, and how much buffer they want

## Framework

1. **Verify access against YOUR needs, not the label.** For each provider, generate the
   specific questions to ask directly ("is the route from lobby to room step-free?",
   "exact bathroom door width?", "is it a roll-in shower or a tub?", "bed height?") and
   get answers in writing. A photo request beats a promise. "Accessible" unconfirmed is
   a coin flip.
2. **Book assistance early and in writing.** Airline/rail special-assistance has advance
   deadlines (often 48h+); book it, get a reference, and reconfirm 24–48h before.
   Transfers and equipment (aisle chairs, hoists) are separate bookings. The written
   confirmation is what you hold up when it's not on the system.
3. **Protect equipment and medication.** Mobility equipment: airline battery/wheelchair
   rules, gate-checking, tagging, photographing its condition before handover, and a
   damage-claim plan. Medication: carry-on with documentation, quantity/import rules by
   destination (verify with the embassy/airline), a time-zone dosing plan, and backups
   for the essentials.
4. **Plan the fatigue and the pacing.** Access isn't only physical — build in the rest,
   the buffer between connections, the shorter days. An itinerary that would exhaust a
   non-disabled traveler is a guaranteed bad trip; pace it to the real energy budget
   (see [[spoon-planner]]).
5. **Pre-write the contingencies.** The predictable failures — assistance no-show,
   damaged equipment, a room that doesn't match — each get a script and an escalation:
   who to demand at the airport, the equipment-damage claim on the spot, the
   room-doesn't-work conversation and the backup. Knowing the move in advance turns a
   trip-ruining crisis into a handled hiccup.

## Output Format

```
## Access-verify these (get answers in writing/photos)
| Leg / stay | The specific questions for YOUR needs |

## Assistance bookings
| Service | Book by | Reference | Reconfirm at |

## Equipment & medication
[Mobility-aid transit protection + damage plan · airline battery/chair rules ·
medication documentation, import rules (verify), dosing across time zones, backups]

## Pacing
[Buffers, rest days, realistic daily load — to your energy budget]

## When it goes wrong (scripts)
[Assistance no-show · damaged equipment (claim on the spot) · room not as described]

⚠ Confirm every access and rule detail with the specific provider/airline/authority —
this plans and prompts, it can't certify a venue's access.
```

## Quality Checks

- [ ] Access is verified with specific questions against the user's needs, in writing —
      never trusting the "accessible" label
- [ ] Assistance bookings have advance deadlines, references, and a reconfirm step
- [ ] Equipment protection (with a damage plan) and medication/import rules are covered
- [ ] Pacing/fatigue is planned, not just physical access
- [ ] Contingency scripts exist for the predictable failures

## Anti-Patterns

- [ ] Do not trust "accessible" without verifying the specifics that matter to this
      traveler
- [ ] Do not assert airline/border/medication rules as fact — they vary and change;
      route to the provider/embassy to confirm
- [ ] Do not plan a punishing pace — access includes energy, not just ramps
- [ ] Do not skip the written confirmations — they're the leverage when assistance
      "isn't on the system"
- [ ] Do not omit the contingencies — the failures are predictable, so the responses
      should be pre-made

## Related

[[spoon-planner]] and [[flare-day-planner]] for the energy/health layer;
[[venue-access-check]] for checking a single place; [[relocation-planner]] for moving
rather than visiting; [[travel-itinerary|group-trip-negotiator]] for the group version.
