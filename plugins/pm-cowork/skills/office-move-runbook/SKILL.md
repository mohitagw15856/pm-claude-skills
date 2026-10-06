---
name: office-move-runbook
description: "Run an office move or reconfiguration without losing a week of work — the dependency-ordered plan (internet lead times rule everything), the workstream owners, the comms that keep the team functional through the chaos, and the day-one-that-works checklist. Use when asked plan our office move, we're moving floors/buildings in six weeks, who owns what in the move, or make day one at the new office not a disaster. Produces the workstream map with owners, the dependency timeline, the team comms plan, and the day-one readiness gate."
---

# Office Move Runbook Skill

Office moves are [relocation-planner](../relocation-planner/SKILL.md) logic at company scale, with the same killer: dependencies, not effort. The internet circuit has the longest lead time of anything in the move (ordered late, the beautiful new office is a wifi-less shell); access badges, furniture, and IT cutover all chain behind decisions someone deferred. The runbook maps the workstreams (space, IT, logistics, people), names an owner per stream (a move "owned by everyone" is owned by the mover with the clipboard), walks the timeline backwards from move day, and gates day one on the readiness checklist — because the team's first morning in the new space decides the move's reputation forever.

## What This Skill Produces

- **The workstream map** — space/fit-out, IT/connectivity, physical logistics, people/comms — each with its named owner
- **The dependency timeline** — backwards from move day, longest-lead items first, with the order-by dates
- **The comms plan** — what the team hears when: the why, the practical (desks, commutes, parking), the day-one guide
- **The day-one gate** — the readiness checklist that must pass *before* the team arrives: network up, access working, desks findable, coffee existing

## Required Inputs

Ask for these if not provided:
- **The move's shape** — floors within a building, cross-town, or consolidation; headcount; the date's hardness (lease-end dates are hard; aspiration dates flex)
- **The lead-time reality** — internet circuit quotes (get them *today* — this answer routinely moves the whole timeline), furniture delivery, building access processes
- **The team's work pattern** — what can't stop (the support team's phones, the Friday deploy); the move schedules around the immovable, or moves it consciously
- **The decision-makers** — who picks the layout, approves the spend, owns the vendor calls; deferred decisions are the move's silent schedule-killers

## Framework: The Runbook Rules

1. **The circuit orders first:** internet/network provisioning has lead times measured in weeks-to-months — it gets ordered before the layout is final, before the furniture, before almost anything (a hotspot-powered office is the move failure everyone remembers). Every other IT dependency (wifi hardware, phones, printers, access control) chains behind it on the timeline.
2. **Streams have owners, the move has one:** four workstreams, four named owners, one move-lead who runs the weekly cross-stream check ([status-report-pipeline](../status-report-pipeline/SKILL.md) format: state, deltas, asks) — the blocking items surface in that meeting or they surface on move day.
3. **The timeline runs backwards, decisions get dates:** move day → the week-before (IT cutover rehearsal, packing) → the month-before (furniture, access, signage) → the start (circuit, layout decisions, lease terms). Every *decision* gets a decide-by date on the same timeline, because "we haven't picked the desk layout" blocks four downstream orders while looking like harmless deliberation.
4. **Comms front-run the questions:** three beats — the why-and-when (early, honest about tradeoffs), the practicals (commute/parking/desk policy — the questions people actually have, answered before the rumor mill does), and the day-one guide (where do I sit, how do I badge in, who do I ask — the [handbook-page](../handbook-page/SKILL.md) for the new space, shipped the week before). Anxious silence fills itself; the comms plan fills it first.
5. **Day one is gated, not hoped:** the readiness checklist runs the *business day before*: network live and tested at real desks · badges work (tested with a real non-admin badge) · desks/monitors assigned and findable · the day-one guide posted · coffee and bathrooms functional (unserious-sounding, reputation-deciding). Fail the gate → the honest call (a WFH day one beats a broken day one) — pre-agreed as an option so it's a decision, not a scramble.

## Output Format

# Office Move Runbook: [from → to] — move day: [date] · move-lead: [name]

## Workstreams
| Stream | Owner | The critical items |
|---|---|---|

## The Dependency Timeline (backwards)
[Move day ← week-before ← month-before ← now · the circuit order date starred · every decision with its decide-by date]

## Comms Plan
[Beat 1: why/when · Beat 2: the practicals FAQ · Beat 3: the day-one guide — each with its ship date]

## The Day-One Gate (runs [date])
[Network tested at desks · badge tested (non-admin) · desks findable · guide posted · facilities functional → pass / the pre-agreed WFH fallback]

## Quality Checks

- [ ] The internet circuit was quoted/ordered before layout perfectionism
- [ ] Every stream has an owner and the move has one lead
- [ ] Decisions carry decide-by dates on the timeline
- [ ] The comms beats front-run the predictable questions
- [ ] The gate runs the day before, with the fallback pre-agreed

## Anti-Patterns

- [ ] Do not finalize layouts while the circuit goes unordered — aesthetics can slip; provisioning can't
- [ ] Do not run the move by committee — streams have owners or the clipboard owns everything
- [ ] Do not let decisions float undated — deferred choices are the invisible critical path
- [ ] Do not go quiet with the team — silence gets filled by the parking-rumor economy
- [ ] Do not hope day one works — gate it, and let the fallback be a plan instead of an apology

## Example Trigger Phrases

- "Plan our office move."
- "We're moving floors/buildings in six weeks."
- "Who owns what in the move?"
- "Make day one at the new office not a disaster."
