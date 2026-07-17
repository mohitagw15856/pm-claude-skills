---
name: relocation-planner
description: "Plan a move — across town or across a border — as a dependency-ordered project: the lease/housing chain, address-change cascade, utilities cutover, movers, and the go-bag for the gap days. Use when asked help me plan my move, relocation checklist, I'm moving in six weeks what do I do, or moving to another country logistics. Produces the dependency-ordered timeline, the address-change cascade list, the cutover schedule for both homes, and the moving-day run sheet."
---

# Relocation Planner Skill

Moves fail on dependencies, not effort: the lease that had to be signed before the movers could be booked, the internet install with a three-week lead time discovered at T-2 days, the driver's license that needed the lease as proof of address which needed the job letter. This skill treats the move as the dependency graph it is — longest lead times surface first — and plans the unglamorous middle: two homes' worth of utilities, a cascade of address changes, and the gap days when your life is in boxes.

## What This Skill Produces

- **The dependency-ordered timeline** — worked backwards from move date, longest-lead items first
- **The address-change cascade** — government, financial, subscriptions, people — in the order that unblocks the rest
- **The dual-home cutover schedule** — what turns off where and when, with the overlap paid for on purpose
- **The moving-day run sheet + go-bag list** — the day as a script, and the bag that means boxes can be late without crisis

## Required Inputs

Ask for these if not provided:
- **From → to** (same city / domestic / international — the graph changes shape) and **move date** (fixed or flexible)
- **Housing status both ends** — owned/leased, secured or still hunting; an unsecured destination is the critical path, full stop
- **Household inventory scale** — studio vs 4-bedroom vs "sell everything"; pets, plants, vehicles, kids' schools
- **For international:** visa/work-permit status — it gates everything and belongs to a lawyer, not this checklist

## Framework: The Dependency Rules

1. **Walk the graph backwards:** movers need a date, the date needs the lease, the lease may need employment proof — find the longest chain and start it today.
2. **Lead-time items are landmines:** internet installs, visa appointments, school enrollment windows, vehicle registration slots — book at T-max, not when convenient.
3. **Pay for overlap:** 2–7 days of double occupancy converts the move from a cliff into a ramp; cleaning, repairs, and the forgotten drawer all need the old keys.
4. **The cascade has an order:** government ID/registration first (it's proof for the rest), then financial (banks, employer payroll), then the subscription long tail (mail forwarding catches strays for months).
5. **The go-bag is the insurance policy:** documents, medications, chargers, days of clothes, kids'/pets' essentials — packed as if the truck will be a week late, because sometimes it is.

## Output Format

# Relocation Plan: [from] → [to], [date]

## Critical Path
[The longest dependency chain, as a sentence: X blocks Y blocks Z — start X now.]

## Timeline (backwards from move day)
**T-8 weeks:** … **T-4:** … **T-2:** … **T-1 week:** … 

## Address-Change Cascade
1. Government/ID (proof for the rest) → 2. Financial/payroll → 3. Everything else + mail forwarding

## Cutover Schedule
| Service | Old home off | New home on | Overlap? |
|---|---|---|---|

## Moving Day Run Sheet + Go-Bag
[Hour-by-hour script · the bag contents]

> International moves: visa, tax residency, and import rules are jurisdiction-specific and change — verify with official sources or professionals; this plan sequences the logistics around them.

## Quality Checks

- [ ] Critical path named explicitly, and it starts now
- [ ] Every lead-time item booked at maximum lead, not at convenience
- [ ] Overlap days budgeted deliberately (or their absence acknowledged as accepted risk)
- [ ] Cascade ordered by what-proves-what, mail forwarding included
- [ ] Go-bag assumes the truck is late

## Anti-Patterns

- [ ] Do not sort by category (all utilities together) — sort by deadline and dependency
- [ ] Do not let packing dominate the plan — packing is effort, not risk; dependencies are risk
- [ ] Do not schedule the internet install after arrival — it has the longest consumer lead time of anything in the move
- [ ] Do not treat an unsecured destination home as one item on the list — it IS the list until resolved
- [ ] Do not give visa or tax-residency advice — sequence around it and route it to professionals
