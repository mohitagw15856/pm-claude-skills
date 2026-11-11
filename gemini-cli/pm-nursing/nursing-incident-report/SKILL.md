---
name: nursing-incident-report
description: "Write a factual clinical incident report for a nurse: what happened in time order, what was observed, the immediate actions, who was told and when, with opinion and blame kept out. Use when asked to write an incident report, report a fall, document a medication error, write up a near miss, or word this incident form. Produces the incident narrative, a timeline, the immediate actions and notifications, the fields most forms ask for, and a separate list of contributing factors for the reviewer. Distinct from incident-postmortem, which is for software outages."
---

# Nursing Incident Report

An incident report is read later by people who were not there: a manager, a patient safety team, sometimes a regulator or a court. Reports go wrong when they speculate, assign blame, or leave out the times. This skill writes what was seen, done and said, in order, and keeps analysis in a separate section. It helps with wording. It does not replace the organisation's reporting system or duty-of-candour process.

## What This Skill Produces

- A factual narrative in the first person and past tense
- A timeline with times as recorded, and "approximately" where the time is estimated
- Immediate actions taken and the patient's condition afterwards
- Notifications: who was told, when, and what they advised
- A separate, clearly labelled list of possible contributing factors for the reviewer
- The fields most incident forms require, ready to paste

## Required Inputs

Ask for these if not provided. Never guess a time, a dose or a name.

- Type of incident: fall, medication, pressure injury, equipment, aggression, near miss, other
- Date, time and exact location
- Who was involved (roles, not names, unless the form requires names) and who witnessed it
- What the reporter saw and did, in order
- The patient's condition before and after, including observations taken
- Who was informed: nurse in charge, doctor, patient, family, and the times
- Anything already done to prevent a repeat on the shift

## Framework: Facts First, Analysis Apart

1. **Write only what was seen, heard or done.** "I found the patient sitting on the floor beside the bed" and not "the patient fell out of bed".
2. **Quote where it matters.** The patient's own words go in quotation marks.
3. **Time everything.** Use the 24-hour clock and say when a time is estimated.
4. **State harm objectively.** Injuries observed, observations taken, treatment given. Use the organisation's harm grading if supplied.
5. **Record notifications and candour.** Who was told and when, including the patient and family.
6. **Separate contributing factors.** Staffing, equipment, environment, communication, task design. List them as observations for the reviewer, not conclusions.
7. **Leave out** blame, apology wording that admits liability beyond policy, and guesses about cause.

## Output Format

### Incident report draft

**Type:** [type] | **Date and time:** [dd/mm/yyyy, hh:mm] | **Location:** [ward, bay, bed]
**Reported by:** [role] | **Witnesses:** [roles or none]

**What happened**
[Factual narrative, first person, past tense, in time order.]

**Timeline**
| Time | Event |
|---|---|

**Patient's condition and immediate actions**
- Before: [as known]
- After: [observations, injuries seen, treatment given]
- Actions: [what was done]

**Notifications**
| Who | Time | Response |
|---|---|---|

**For the reviewer: possible contributing factors (not conclusions)**
- [factor]

**Assumptions and gaps**
- [Times or details that were estimated or not supplied]
- [Information the reviewer will need that is missing]

*Check against the clinical record before submitting through the official system.*

## Quality Checks

- [ ] Every sentence in the narrative is something the reporter saw, heard or did
- [ ] Times are present, and estimates are labelled
- [ ] Harm is described by observation, not adjective
- [ ] Notifications include the patient or family where policy requires it
- [ ] Contributing factors sit in their own labelled section
- [ ] No names appear unless the form requires them

## Anti-Patterns

- **Do not assign blame** to a colleague, the patient or yourself.
- **Do not speculate about cause** in the narrative.
- **Do not write "patient found on floor, no injury"** without the checks that support it.
- **Do not alter times** to make the sequence tidier.
- **Do not treat this draft as the report.** It is filed through the official system by the person who was there.

## Example Trigger Phrases

- "Help me write up a fall I found at 03:10. Here is what happened."
- "I gave a dose late. Word the incident form factually."
- "Write a near-miss report: wrong patient label caught before giving."
- "Take the blame language out of this incident report."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/nursing-incident-report.html

<!-- pm-claude-skills v84.0.0 | skill: nursing-incident-report | source: skills/nursing-incident-report/SKILL.md | sha256: c8a4000d7f8473fe53dc5cd2109a0b8df3ca5024dc0b627f7ce6df87ed525cf1 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
