---
name: event-safety-plan
description: "Produce the event safety documentation that satisfies a venue or licensing authority and actually works on the day — the risk assessment, crowd and capacity plan, emergency procedures, and the roles that must be filled. Use when asked to write an event risk assessment, safety plan, event management plan, or emergency procedure, or when a venue or authority has requested safety documentation. Produces the risk assessment, the crowd and capacity position, emergency and evacuation procedures, the medical and welfare plan, and the roles-and-competence schedule. Not a substitute for competent safety advice, which many events legally require."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/event-safety-plan.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Event Safety Plan

Safety documentation gets written twice: once to satisfy the venue's paperwork request, and once — rarely — so that it would actually help if something happened. This writes the second kind. Hazards specific to this event rather than a generic list, controls that are assigned to a named person, and emergency procedures short enough to be followed by someone frightened.

## What This Skill Produces

- **A risk assessment** — hazards specific to this event, with controls, owners, and residual risk
- **Crowd and capacity** — the capacity figure, its basis, and how flow and density are managed
- **Emergency procedures** — evacuation, medical, fire, weather, and the stop-the-event decision
- **Medical and welfare provision** — what level, on what basis, and where it is positioned
- **Roles and competence** — who holds each safety role and what qualifies them
- **The communications plan** — how the message reaches staff, suppliers, and attendees when something goes wrong

## Required Inputs

Ask for these if not provided:
- **The event** — type, date, venue, expected and maximum attendance, indoor or outdoor, timings
- **The audience** — age profile, whether alcohol is served, mobility and accessibility needs, whether children attend
- **The activities** — anything raising risk: temporary structures, pyrotechnics, vehicles, water, height, cooking, crowds standing
- **The venue's own arrangements** — existing evacuation plan, capacity certificate, house safety staff, and what they require from you
- **The regulatory position** — licensing conditions, local authority requirements, and any statutory duty that applies to you

## Framework: Specific Hazards, Named Owners, Procedures People Can Follow

1. **Assess this event, not events in general.** A downloaded template with 'slips, trips and falls' is evidence of nothing. The hazards that matter come from these activities, this venue, this audience.
2. **Every control gets a named owner and a check time.** A control nobody owns is a sentence in a document.
3. **Establish capacity and its basis.** Not a number you were told — the basis: exit capacity, floor area, or the venue's certificate. Then decide how you count people.
4. **Write the emergency procedure for a frightened person.** Short, numbered, plain. Who calls, what they say, where people go, who confirms it is clear.
5. **Define the stop-the-event trigger and decider in advance.** Weather, crowd density, an incident — one named person, decided before the day.
6. **Match medical provision to a stated basis.** Attendance, audience profile, alcohol, and activity, with the reasoning recorded.
7. **Brief it.** An unbriefed plan protects nobody; record who was briefed and when.

## Output Format

### Event safety plan: [event] · [date] · [venue] · v[n]

**Event:** [type, date, times, indoor/outdoor] · **Attendance:** expected [n], maximum [n] · **Audience:** [profile, alcohol, children, accessibility needs]

**Capacity:** [figure] · **Basis:** [exit capacity / floor area / venue certificate] · **Counting method:** [how numbers are tracked] · **Action at capacity:** [what happens]

**Risk assessment**
| Hazard | Who is at risk | Control | Owner | Checked at | Residual |
|---|---|---|---|---|---|

**Emergency procedures**
- **Evacuation:** trigger [what] → [who announces, wording] → routes [where] → assembly [where] → roll call [who] → all-clear [who]
- **Medical:** [who is called, where they are, how they are reached, access route for an ambulance]
- **Fire:** [detection, alarm, who is responsible, equipment location]
- **Adverse weather:** [thresholds — wind speed, rain, heat — and the action at each]
- **Stop the event:** trigger [what] · decider [named person] · how it is communicated

**Medical & welfare:** provision [level] · **basis:** [attendance, profile, activity] · location [where] · welfare [water, quiet space, lost persons, vulnerable attendees]

**Roles & competence**
| Role | Name | Competence/qualification | Contact |
|---|---|---|---|

**Communications:** staff [method] · suppliers [method] · attendees [method] · **failure fallback:** [what if radios fail]

**Briefed:** [who, when] · **Documents shared with:** [venue, authority, suppliers]

> Not a substitute for competent safety advice. Many events are subject to statutory duties, licensing conditions, and capacity limits, and some require a qualified safety adviser, structural sign-off, or a specific medical provision standard. Confirm requirements with the venue and the relevant authority, and obtain professional advice where the event involves crowds, temporary structures, or licensed activity.

## Quality Checks
- [ ] Hazards are specific to this event's activities, venue and audience
- [ ] Every control has a named owner and a time it is checked
- [ ] The capacity figure states its basis and how people are counted
- [ ] Emergency procedures are short, numbered, and name who does what
- [ ] The stop-the-event trigger and decider are agreed in advance
- [ ] Medical provision states the basis it was decided on
- [ ] The plan has been briefed and the briefing recorded

## Anti-Patterns
- **A downloaded generic risk assessment.** Satisfies a filing requirement and nothing else.
- **Controls with no owner.** Nobody checks them, and the document says they were checked.
- **A capacity number with no basis.** Indefensible to a licensing officer and dangerous on the day.
- **Emergency procedures written in prose.** Nobody reads a paragraph during an evacuation.
- **No pre-agreed stop trigger.** The decision then gets made late, by whoever feels able to.
- **Medical provision by guesswork.** It needs a stated basis.
- **Writing the plan and not briefing it.** The most common failure, and the most complete one.

## Example Trigger Phrases
- "Write a risk assessment for our outdoor event"
- "The venue is asking for an event safety plan"
- "What emergency procedures do we need for a 500-person conference?"
- "How do I work out how much medical cover we need?"
- "Write an evacuation procedure for our event"
