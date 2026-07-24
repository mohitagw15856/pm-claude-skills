---
trigger: model_decision
description: "Write clear at-home care instructions for a pet owner after a veterinary visit, procedure, or hospitalization. Use when asked to write discharge instructions, go-home notes, post-op care, or medication instructions for a pet owner. Produces plain-language home-care instructions: medications (what/how much/when/how), activity restrictions, what to watch for, warning signs that mean call-now, the recheck plan, and emergency contacts — written so a worried owner can actually follow them."
---

# Client Discharge Notes Skill

Discharge instructions fail when they're written for the chart, not the owner — Latin drug names, no schedule, and "monitor for complications" with no idea what that means. A stressed owner in the parking lot needs to know exactly what to do, what's normal, and when to panic. This skill writes go-home notes an owner can actually follow.

## Working from a brief

Given the visit/procedure and the plan, **write the full discharge notes** — translate everything to plain language, make the medication schedule concrete, and define the warning signs specifically. Note that these are owner-facing instructions; the clinical record is separate.

## Required Inputs

Ask for (if not provided, else infer and label):
- **The patient** and **what was done** (procedure, diagnosis, hospitalization)
- **Medications** prescribed (drug, dose, route, frequency, duration)
- **Restrictions and the recheck plan** (activity, diet, sutures, follow-up timing)

## Output Format

### What we did (in plain terms)
A one-paragraph plain-language summary of the visit/procedure so the owner understands the context.

### Medications

| Medication (what it's for) | How much | When | How to give | Until |
|---|---|---|---|---|

With practical tips (with/without food, how to pill a cat, don't double up if a dose is missed).

### Home care
Activity restriction (specific: "leash walks only, no running or stairs for 10 days"), incision/bandage care, diet, and hygiene — each concrete and time-bound.

### What's normal vs. call us
- **Expected:** mild grogginess, small bruising, reduced appetite for a day.
- **Call the clinic if:** (specific warning signs — not eating >24h, incision redness/discharge/opening, vomiting, lethargy, pain not controlled).
- **Emergency now:** the red-flag signs that mean go to an ER (trouble breathing, collapse, uncontrolled bleeding).

### Recheck & contacts
When to come back (suture removal, recheck), the clinic number and hours, and the after-hours/emergency contact.

## Quality Checks

- [ ] Medications are in plain language with a concrete schedule and how-to-give tips
- [ ] Activity/diet restrictions are specific and time-bound, not vague
- [ ] "Normal vs. call us vs. emergency" is clearly separated with specific signs
- [ ] The recheck plan and an after-hours/emergency contact are included
- [ ] Written at an owner's reading level — no untranslated clinical jargon
- [ ] Missed-dose and practical administration guidance is given

## Anti-Patterns

- Drug names and doses with no schedule or plain-language purpose
- "Monitor for complications" with no definition of what to watch for
- No distinction between normal recovery and an emergency
- Missing the after-hours/emergency contact
- Chart-speak an ordinary owner can't parse
- Activity instructions too vague to follow ("take it easy")
