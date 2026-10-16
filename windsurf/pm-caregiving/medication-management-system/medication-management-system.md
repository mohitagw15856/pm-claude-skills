---
trigger: model_decision
description: "Set up a system to manage medications safely — for yourself or someone you care for — so doses aren't missed, doubled, or dangerously combined. Use when asked help me manage medications, keep track of my parent's pills, set up a medication system, or I keep forgetting my meds. Produces an organized medication list (what, dose, when, why), a routine and reminder setup that fits the person, a refill-tracking method so nothing runs out, safety checks (interactions and duplications to raise with a pharmacist), and an emergency-ready summary — because medication errors are common and dangerous, and a system prevents most of them. Not medical advice."
---

# Medication-Management System

Managing multiple medications — especially for an older adult — is a common source of dangerous errors: missed doses, accidental double-doses, running out, or risky combinations. A simple system prevents most of them. This builds one: a clear medication list, a routine that fits the person, refill tracking, and safety prompts to raise with a pharmacist — so the meds are taken right, on time, and without dangerous surprises. It's organization, not medical advice.

## What This Skill Produces

- **An organized medication list** — every medication with its dose, schedule (when), and purpose (why), in one clear place
- **A routine & reminder setup** — a system that fits the person (a pill organizer, phone alarms, tied to daily habits, or a caregiver check) so doses aren't missed or doubled
- **Refill tracking** — a method to know when each medication is running low and reorder before it runs out
- **Safety flags to raise** — potential interactions, duplications, or confusing look-alike pills to ask a pharmacist/doctor about (not to self-diagnose)
- **An emergency-ready summary** — a current, accessible list (meds, doses, allergies) for appointments, the ER, or an emergency
- **A boundary** — this organizes and prompts; a pharmacist/doctor makes the medical calls

## Required Inputs

Ask for these if not provided:
- **Who** — yourself or someone you care for, and their situation (memory, dexterity, vision)
- **The medications** — the list (or a request to help build it) with doses and timing
- **The problem** — missed doses, confusion, running out, or setting it up fresh
- **Who administers** — self-managed, or a caregiver involved
- **Tools** — pill organizer, app, paper, or a suggestion

## Framework: List, Routine, Refills, Safety

1. **Build the master list.** Every medication with dose, timing, and purpose in one clear place — the foundation for everything and essential in an emergency.
2. **Fit the routine to the person.** Choose reminders and a system that match their abilities and habits — a weekly pill organizer, alarms tied to meals, or a caregiver check — whatever they'll actually use.
3. **Prevent misses and doubles.** A structure where it's obvious whether a dose was taken (organizer compartments, a log) prevents both missed and accidental double doses.
4. **Track refills.** A simple way to spot low supplies and reorder in advance so nothing runs out — a common, avoidable crisis.
5. **Flag safety questions.** Note possible interactions, duplicate medications, and confusing pills to *raise with the pharmacist/doctor* — the skill prompts the question, it doesn't answer it medically.
6. **Keep an emergency copy.** A current list accessible for appointments, hospital visits, and emergencies.

## Output Format

### Medication system: for [person] · situation [x]

**Master list**
| Medication | Dose | When | Why |
|---|---|---|---|

**Routine & reminders:** [organizer / alarms / habit-tied / caregiver check — fit to the person].
**Prevent misses & doubles:** [a structure where taken-or-not is obvious].
**Refill tracking:** [how to spot low + reorder early].
**Raise with the pharmacist:** [possible interactions / duplications / confusing pills — ask, don't self-diagnose].
**Emergency copy:** [current list — meds, doses, allergies — kept accessible].

> Organization and reminders — not medical advice. A pharmacist or doctor should review interactions, doses, and changes.

## Quality Checks
- [ ] Builds a clear list with dose, timing, and purpose
- [ ] Reminder system is fitted to the person's abilities/habits
- [ ] Structure prevents both missed and doubled doses
- [ ] Includes refill tracking so nothing runs out
- [ ] Flags safety questions to raise with a pharmacist (not self-diagnose)
- [ ] Keeps an emergency-accessible copy; states not medical advice

## Anti-Patterns
- **A reminder system** the person can't actually use.
- **No way to tell** if a dose was taken (double-dose risk).
- **Ignoring refills** until something runs out.
- **Self-diagnosing interactions** instead of asking a pharmacist.
- **No emergency-accessible list.**

## Example Trigger Phrases
- "Help me set up a system to manage my mom's medications."
- "I keep forgetting to take my meds — help me build a routine."
- "My dad's on eight pills and I'm scared of a mistake. Organize it."
- "How do I track refills so nothing runs out?"
- "Set up a safe medication system for someone with memory issues."
