---
name: civil-service-application
description: "Write a UK Civil Service or NHS application: behaviour statements in the Success Profiles format, a personal statement mapped to the essential criteria, and a CV in the form these schemes expect. Use when asked to write my civil service application, answer Success Profiles behaviours, write a 250-word behaviour example, write my NHS supporting information, or apply on Civil Service Jobs or NHS Jobs. Produces each behaviour statement within the word limit using a situation, task, action, result structure, a criteria-mapped personal statement, and a check against the advert's essential criteria."
version: 1.0.0
---

# Civil Service and NHS Application

UK public-sector applications are scored, not skimmed. Civil Service roles use Success Profiles: behaviour examples marked against a published scale, usually within a 250-word limit. NHS roles score the supporting information against the person specification's essential and desirable criteria. This skill writes to the scoring.

Part of the pm-cv bundle.

## What This Skill Produces

- **Behaviour statements**, one per behaviour asked for, within the word limit
- **A personal statement** or NHS supporting information mapped to each criterion
- **A criteria check**: every essential criterion and where it is evidenced
- **A CV**, if the advert asks for one, in the plain form these schemes expect

## Required Inputs

Ask for these if not provided:
- **The advert**: the behaviours, essential and desirable criteria, and word limits
- **The grade** (for example HEO, SEO, Grade 7) or the NHS band
- **The person's examples**, ideally from `career-inventory`

## Framework: Behaviour Statements

Use situation, task, action, result, with most of the words on action:
- **Situation and task**: two or three sentences
- **Action**: what *I* did, in steps, showing the indicators for the grade
- **Result**: the outcome, with a number where the person has one, and what was learnt

Rules:
- Use the behaviour's published indicators for the grade as a checklist. Show three or four of them clearly.
- Stay within the word limit. Count it and state the count.
- One example per behaviour; reuse an example only if the advert allows it.
- Write "I", not "we".

## Framework: NHS Supporting Information

- Go through the person specification in order. One short paragraph per essential criterion, then the desirable ones.
- Use the criterion's wording as a sub-heading so the shortlister can tick it off.
- State registrations and qualifications exactly as held.

## Output Format

### Application: [role], [department or trust], [grade or band]
**1. Behaviour statements**: each with the behaviour, the statement, and the word count
**2. Personal statement or supporting information**
**3. Criteria check** | Criterion | Essential or desirable | Where evidenced |
**4. CV**, if required

## Quality Checks
- [ ] Every behaviour statement is within its word limit, with the count shown
- [ ] Action is the longest part of each statement
- [ ] Every essential criterion is evidenced
- [ ] Each statement is written in the first person singular
- [ ] Examples are the person's own; nothing is invented

## Anti-Patterns
- **Going over the word limit.** Text beyond it may not be read.
- **"We did".** Scorers can only credit what the applicant did.
- **Describing the situation at length.** It scores nothing.
- **Skipping desirable criteria** when the field is competitive.

## Example Trigger Phrases
- "Write my Success Profiles behaviour for Delivering at Pace, 250 words, SEO level."
- "Help me with my civil service personal statement."
- "Write my NHS supporting information for this Band 7 post."
- "Check my application against the essential criteria."
