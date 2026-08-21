---
aliases: ["Fleet Maintenance Programme"]
tags: [pm-skills, skill]
skill: fleet-maintenance-programme
description: "Design a preventive maintenance programme that keeps vehicles legal and out of the workshop at the wrong moment — intervals set by duty cycle, the inspection items that actually cause roadside failures, and the defect-reporting loop that closes. Use when asked to build a fleet maintenance schedule, set PM intervals, reduce breakdowns or roadside violations, or design a vehicle inspection programme. Produces the interval schedule by duty cycle, the inspection checklists by level, the defect-reporting and rectification loop, the parts and downtime planning, and the compliance record structure."
---

# Fleet Maintenance Programme

Fleet maintenance fails in two directions: too little and vehicles fail at the roadside, too much and they are in the workshop instead of earning. The programme that works sets intervals by how each vehicle is actually used rather than by a single fleet-wide number, inspects the things that genuinely cause failures, and — the part most programmes get wrong — guarantees that a driver-reported defect reliably becomes a repair.

## What This Skill Produces

- **An interval schedule by duty cycle** — because a local multi-drop vehicle and a trunking unit wear differently
- **Inspection checklists by level** — daily walkaround, periodic safety inspection, and full service, each with a defined scope
- **The defect-reporting loop** — from driver report to rectification to sign-off, with the escalation for anything safety-critical
- **Parts and downtime planning** — what is stocked, and when vehicles come off the road with least revenue impact
- **The compliance record structure** — what is retained, for how long, and in a form an inspector can follow
- **The failure-analysis loop** — recurring defects fed back into intervals and specification

## Required Inputs

Ask for these if not provided:
- **The fleet** — vehicle types, ages, mileages, and how each is actually used
- **The duty cycles** — trunking, multi-drop, off-road, refrigerated, and their loading
- **Current position** — existing intervals, breakdown history, and any roadside or inspection findings
- **The workshop** — in-house or contracted, capacity, and lead times for parts
- **Your regulatory framework** — the inspection frequency, record retention, and roadworthiness duties that apply where you operate

## Framework: Intervals by Duty Cycle, Inspections by Failure Data, Defects That Close

1. **Set intervals by duty cycle, not by fleet average.** Multi-drop brakes and clutches wear on a different clock from trunking. A single fleet-wide interval over-services half the fleet and under-services the rest.
2. **Use time and distance, whichever comes first.** A low-mileage vehicle still corrodes, and a time-based backstop catches it.
3. **Build the inspection list from your own failure data.** Roadside findings and breakdown causes tell you what to inspect far better than a generic checklist.
4. **Make the driver walkaround meaningful.** A nil-defect report every day from every driver is evidence the process is not working, not evidence the fleet is perfect.
5. **Close the defect loop explicitly.** Report → assessed → rectified or deferred with justification → signed off. Every step named and owned. Safety-critical defects take the vehicle off the road, and that authority sits with a named role.
6. **Plan downtime against revenue.** Schedule inspections when the vehicle would be least productive, not when the workshop is quiet.
7. **Feed failures back.** A component failing repeatedly is an interval or specification problem, not a maintenance one.

## Output Format

### Maintenance programme: [fleet] · [effective date] · v[n]

**Fleet profile**
| Vehicle group | Count | Duty cycle | Annual distance | Inspection interval | Service interval |
|---|---|---|---|---|---|
**Interval basis:** [time or distance, whichever first] · **Derived from:** [duty cycle, manufacturer schedule, regulatory minimum, own failure data]

**Inspection levels**
- **Daily walkaround** (driver): [items] · reported via [method] · nil-defect rate monitored: [target and what an implausible rate triggers]
- **Periodic safety inspection** (competent person, every [interval]): [scope] · [documented on what form]
- **Full service** (every [interval]): [scope]

**Defect loop**
| Step | Owner | Timescale | Record |
|---|---|---|---|
| Driver reports | Driver | Immediately | [system] |
| Assessed | [role] | [time] | Severity assigned |
| Safety-critical → vehicle off road | [named role with authority] | Immediate | Prohibition record |
| Rectified or deferred | Workshop | [time] | Deferral needs written justification |
| Signed off | [role] | | Closed record |

**Downtime plan:** [when each group comes off the road, and the revenue logic]
**Parts:** stocked [list] · lead-time risks [items]

**Records:** [what is kept · retention period · where · who can produce it on request]

**Failure analysis:** reviewed [frequency] · recurring defects → [interval or specification change]

> Inspection frequency, competence requirements, record retention and roadworthiness duties are set by regulation and vary by jurisdiction and vehicle class. Verify against the current applicable rules and your operating licence conditions; manufacturer schedules are a minimum, not a compliance position.

## Quality Checks
- [ ] Intervals differ by duty cycle rather than one fleet-wide number
- [ ] Both time and distance triggers are used
- [ ] The inspection list is informed by the fleet's own failure and roadside data
- [ ] Nil-defect reporting rates are monitored for implausibility
- [ ] Every step of the defect loop has a named owner and a timescale
- [ ] Authority to take a vehicle off the road sits with a named role
- [ ] Deferred defects require written justification
- [ ] Recurring failures feed back into intervals or specification

## Anti-Patterns
- **One interval for the whole fleet.** Simultaneously wasteful and unsafe.
- **Distance-only triggers.** Low-mileage vehicles corrode and go uninspected.
- **A generic checklist.** Ignores what is actually failing on your vehicles.
- **Celebrating a 100% nil-defect rate.** It means drivers are not really looking.
- **A defect loop with no sign-off.** Reports vanish and the record shows compliance.
- **Deferring defects without written justification.** The finding that turns an audit serious.
- **Scheduling maintenance for workshop convenience.** Takes vehicles off the road on their best days.

## Example Trigger Phrases
- "Design a preventive maintenance schedule for our fleet"
- "How often should we inspect our vehicles?"
- "We keep failing roadside inspections — what should we change?"
- "Our drivers report nil defects every day — is that a problem?"
- "Build a defect reporting process for our fleet"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
