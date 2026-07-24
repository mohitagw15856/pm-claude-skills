---
name: "Run a self-audit of a food establishment before the health i"
description: "Run a self-audit of a food establishment before the health inspector arrives, focused on the violations that actually close kitchens. Use when asked to prep for a health inspection, do a food-safety self-audit, avoid critical violations, or get ready for the health department. Produces a prioritized checklist organized by risk (critical/priority vs. non-critical), the temperature and hygiene fundamentals, a fix list with owners, and how to handle the inspector on the day."
---

# Health Inspection Prep Skill

Inspectors don't fail you on dust — they fail you on the handful of **priority violations** that make people sick: temperature abuse, cross-contamination, bare-hand contact, handwashing, and pest activity. This skill runs the self-audit the way an inspector scores it, so the critical stuff is fixed before they walk in.

## Working from a brief

Given the establishment type, **produce the full self-audit** — prioritize by public-health risk, not by what's easiest to see. Base it on standard food-code categories; note that local codes vary and the operator should confirm specifics.

## Required Inputs

Ask for (if not provided, else infer and label):
- **Type of establishment** (full-service, quick-service, bar, food truck, commissary) and menu risk (raw proteins, sushi, etc.)
- **Known problem areas** or a prior inspection's violations
- **When** the inspection window is / how much time to prep

## Output Format

### Critical / priority items (fix first)
The violations that shut kitchens — each with the standard and a pass/fail check:
- **Temperature:** cold holding ≤ 41°F, hot holding ≥ 135°F, cooking temps, cooling (135→70°F in 2h, 70→41°F in 4h), thermometer calibrated.
- **Cross-contamination:** raw-above-ready storage order, separate boards/utensils, sanitizer concentration.
- **Hygiene:** handwash sinks stocked & accessible, no bare-hand contact with ready-to-eat food, sick-employee policy.
- **Pests:** no activity/harborage, entry points sealed.

### Non-critical (address, won't close you)
Facility, labeling, storage, cleaning cadence.

### Fix list

| Item | Risk | Fix | Owner | By when |
|---|---|---|---|---|

### On the day
How to receive the inspector: cooperate, don't argue, know where the logs and permits are, correct-on-the-spot where possible, and how to respond to a violation professionally.

## Quality Checks

- [ ] Critical/priority items are separated from cosmetic ones and listed first
- [ ] Temperature holding, cooling, and cross-contamination are all covered with specific thresholds
- [ ] Handwashing and no-bare-hand-contact are explicitly checked
- [ ] Every found gap has a fix, an owner, and a deadline
- [ ] A note that local food codes vary and specifics should be confirmed

## Anti-Patterns

- Deep-cleaning visible surfaces while ignoring cold-holding temps
- Treating all violations as equal (a critical temp violation ≠ a scuffed floor)
- No thermometer calibration or temperature logs
- Blocking or arguing with the inspector on the day
- Prepping once instead of building the habits that pass every time
