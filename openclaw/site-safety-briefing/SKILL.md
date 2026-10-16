---
name: site-safety-briefing
description: "Produce a toolbox talk or pre-task safety briefing from the day's planned construction work. Use when asked to write a toolbox talk, prepare a pre-task plan or JHA/JSA briefing, brief a crew on today's hazards, or plan safety for a specific task like a crane pick, excavation, or hot work. Produces a crew-ready briefing with task-specific hazards, controls ordered by the hierarchy of controls, required permits, and explicit stop-work triggers."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/site-safety-briefing.html
metadata:
  {
    "openclaw": { "emoji": "🏗" }
  }
---

# Site Safety Briefing Skill

A toolbox talk that could apply to any site on any day protects nobody. This skill builds the briefing from **today's actual work**: what tasks are running, what they conflict with, what the weather and site conditions add, and — critically — what conditions mean the crew stops and calls the supervisor. Controls are ordered by the hierarchy of controls, because "wear your PPE" is the last line of defence, not a plan.

## What This Skill Produces

- A **crew-ready briefing** (readable aloud in 5–10 minutes) for the day's specific tasks
- A **task-hazard-control table** with controls ordered by the hierarchy of controls
- **Permit and inspection checklist** (hot work, excavation, confined space, lift plans, LOTO, etc.)
- **Simultaneous-operations (SIMOPS) conflicts** between crews working near each other
- Explicit, observable **stop-work triggers** and the emergency basics (muster point, nearest hospital, who calls)

## Required Inputs

Ask for what's missing; from a bare task name, build the briefing from typical hazards and label site-specific items `[confirm on site]`:

- **Today's tasks** — what work, where on site, which crews/trades
- **Site conditions** — weather forecast, ground conditions, live utilities, public interface, stage of construction
- **Adjacent operations** — what else is happening nearby (other trades, deliveries, crane operations)
- **Equipment in use** — lifts, cranes, excavators, powder-actuated tools, temporary power
- **Known site rules** — client/GC permit systems, exclusion zones, prior incidents or near-misses worth referencing

## Hazard & Controls Framework

**Identify hazards per task, not generically.** Sweep these classes for each task: gravity (falls, dropped objects), mechanical/energy (struck-by, caught-between, stored energy, electrical), excavation/ground (collapse, utilities, water), atmosphere (confined space, dust, fumes, hot work), environment (heat/cold, wind — especially for crane picks and panel handling), and human factors (new crew members, fatigue, language barriers).

**Order every control by the hierarchy — and say which level it is:**

| Level | Control | Example |
|---|---|---|
| 1 | **Eliminate** | Prefabricate at ground level instead of working at height |
| 2 | **Substitute** | Mechanical lifting instead of manual handling; low-VOC product |
| 3 | **Engineering** | Guardrails, trench box, ventilation, physical barricades |
| 4 | **Administrative** | Permits, exclusion zones, spotters, rotation, signage |
| 5 | **PPE** | Harness, respirator, cut gloves — the last layer, never the plan |

If a briefing's controls are all level 4–5, flag it: the task plan itself may need rework.

**Stop-work triggers must be observable.** Not "if unsafe" — write conditions a crew member can see: *wind above the crane chart limit; water entering the excavation; utility strike or unexpected line; barricade down in the exclusion zone; anyone in the fall zone during the pick.* State plainly that anyone can stop work without repercussions.

## Output Format

### Pre-Task Safety Briefing — [Date] — [Site/Area]

**1. Today's work** — tasks, crews, locations, in one glance.
**2. Task hazard & control table** — | Task | Hazard | Control (hierarchy level) | Who verifies |
**3. Permits & inspections required today** — permit type, task, who holds it, valid when.
**4. SIMOPS / crew interfaces** — who's working near whom, and the separation rule.
**5. Stop-work triggers** — bulleted, observable, with "stop, make safe, call [supervisor]".
**6. Emergency info** — muster point, first aider, nearest hospital, who calls emergency services.
**7. Sign-on sheet** — name/signature lines; space for crew-raised concerns (record them — that's the point of the talk).

## Quality Checks

- [ ] Every hazard ties to a specific task happening today — no generic filler hazards
- [ ] Every control states its hierarchy level, and PPE is never the only control for a serious hazard
- [ ] Permits listed match the tasks (hot work, excavation >1.2m/4ft, confined space, critical lifts, LOTO)
- [ ] Stop-work triggers are observable conditions, not attitudes
- [ ] SIMOPS conflicts between today's crews are addressed or explicitly ruled out
- [ ] Readable aloud in under 10 minutes — a briefing nobody listens to protects nobody

## Anti-Patterns

- [ ] Do not produce a generic talk that ignores today's task list — reusability is the enemy of relevance
- [ ] Do not jump straight to PPE — walk the hierarchy from elimination down and show the levels skipped
- [ ] Do not write "be careful" or "stay alert" as a control — name the physical or procedural measure
- [ ] Do not omit adjacent-crew hazards — most struck-by events involve someone else's operation
- [ ] Do not fabricate site-specific details (utility locations, wind limits) — mark them `[confirm on site]` for the supervisor to fill in

## Example Trigger Phrases

- "Write a toolbox talk."
- "Prepare a pre-task plan or JHA/JSA briefing."
- "Brief a crew on today's hazards."
- "Plan safety for a specific task like a crane pick."
