---
name: "Work out which permits a project actually needs and the orde"
description: "Work out which permits a project actually needs and the order to get them — building/renovation, business licensing, events, signage, home businesses — so you don't build first and discover the permit later. Use when someone says 'do I need a permit for this', 'what permits for my renovation/business/event', 'help me apply for a permit', or 'the council flagged my project'. Produces a permit checklist with the likely permits, their sequence and dependencies, and the official offices to confirm each. Not legal/code advice — it orients and routes to the authority."
---

# Permit Navigator Skill

Permits are where good projects hit a wall: people renovate, then get a stop-work
order; open a business, then find they were operating unlicensed; plan an event, then
learn the road-closure permit needed 90 days' notice. The rules are hyper-local
(city, county, sometimes your specific zone) and this skill will not pretend to know
your jurisdiction's code — its job is to tell you *which kinds of permits a project
like yours usually needs*, the order they go in (some can't start until others are
issued), and exactly which office to call to confirm, so you sequence the paperwork
before the work.

## What This Skill Produces

- A **permit checklist**: the permits a project like this typically needs, each
  marked *likely required / maybe / probably not* — to confirm, not to rely on
- The **sequence and dependencies**: what must be approved before what (zoning before
  building, building before occupancy), so you don't apply out of order
- The **who-to-ask map**: which office/department owns each permit and the question
  to ask them ("does a project like X need Y here?")
- A **timeline reality check**: which permits have long lead times or public-notice
  periods, so the project plan accounts for them instead of being ambushed

## Required Inputs

Ask for (if not already provided):
- The project: what, where (city/region — rules are local), and scale
- Type: building/renovation, opening/running a business, an event, signage, a home
  business, short-term letting, etc.
- Property context: own or rent, residential/commercial, historic district or HOA
  (these add layers), and whether any work has started
- The deadline driving it (an event date, a lease start) so lead times can be flagged

## Framework

1. **Classify the project — it determines the permit family.** Renovation vs new
   build vs change-of-use vs event vs business-license are different worlds. Nail the
   category first; everything else follows from it.
2. **List the likely permits, honestly hedged.** For the category, name the permits
   commonly involved (e.g. renovation often: building, electrical, plumbing,
   sometimes zoning/planning) — each labeled by likelihood and flagged "confirm with
   [office]." Never assert "you need X" as fact about a specific jurisdiction.
3. **Order by dependency.** Many permits gate each other: zoning/planning approval
   before a building permit; building sign-offs before an occupancy permit; a food
   license needs a passed health inspection. Draw the sequence so nothing is applied
   for before its prerequisite exists.
4. **Flag the long poles.** Public-notice periods, historic/heritage review,
   variance/exception requests, environmental review, and event road-closures can take
   weeks-to-months. Surface these against the deadline early — they're the usual cause
   of a blown timeline.
5. **Route to the authority for the real answer.** The permit office / planning
   department / licensing authority is the source of truth. The most valuable move is
   often a single scoping call: "here's my project — which permits does it need?"
   The skill prepares that call and the checklist to bring to it.

## Output Format

```
## The project, classified
[Category · location · scale · anything already started (may need retroactive fixes)]

## Likely permits (confirm each — do not rely on this list)
| Permit | Likelihood | Office that owns it | The question to ask them |

## The order to do them
[Dependency sequence — what gates what]

## Long lead times to plan around
[Notice periods, reviews, inspections — against your deadline]

## Your first call
[The scoping question to the permit office, and what to have ready]

⚠ Local code governs; this orients you and routes you to the authority. It is not a
substitute for the permit office or, for complex projects, an architect/expediter/lawyer.
```

## Quality Checks

- [ ] Every permit is hedged by likelihood and routed to a named office to confirm —
      nothing asserted as certain for the jurisdiction
- [ ] The dependency sequence is explicit (what must precede what)
- [ ] Long-lead / notice-period permits are flagged against the stated deadline
- [ ] Work-already-started is handled (retroactive permits, stop-work risk) if relevant
- [ ] The output ends with a concrete scoping call to the authority

## Anti-Patterns

- [ ] Do not assert a specific jurisdiction's permit requirements or code as fact —
      they're local and change; orient and route to the office
- [ ] Do not give code, structural, or legal advice — flag when an architect,
      engineer, expediter, or lawyer is the right call
- [ ] Do not present the permit list as complete or authoritative — it's a starting
      checklist to confirm
- [ ] Do not skip the sequencing — an out-of-order application is the classic wasted
      month
- [ ] Do not encourage skipping permits or "asking forgiveness" — unpermitted work
      creates real liability and resale problems; say so

## Related

[[trade-quote-builder]] and [[stage-payment-shield]] for the tradespeople doing the
work; [[speak-at-the-council]] if the project needs a hearing; [[report-a-hazard]] for
the other side of local government.
