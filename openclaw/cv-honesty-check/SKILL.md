---
name: cv-honesty-check
description: "Check a CV for claims that would not survive an interview, a reference or a background check: inflated titles, unprovable numbers, team results claimed as personal, date fudges and skills with no evidence. Use when asked to check my CV is accurate, will my CV hold up in an interview, is this claim too much, or as the last step before sending a CV. Produces a claim-by-claim risk table with the likely interview question, a safer truthful wording for each risky line, and a list of facts to verify before sending."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cv-honesty-check.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# CV Honesty Check

The most common reason a strong CV fails late is a line that does not hold up: a title the reference does not confirm, a number the candidate cannot explain, a project that was really the team's. This skill reads the CV the way a sceptical interviewer and a background checker would, and offers a truthful wording for every risky line.

Part of the pm-cv bundle. Run it before `cv-docx-export`.

## What This Skill Produces

- **A claim table**: each factual claim, its risk, and the question an interviewer would ask
- **Safer wording** for each risky line, true and still strong
- **A verify list**: dates, titles and figures to check against records before sending

## Required Inputs

Ask for these if not provided:
- **The CV**
- **The person's own notes** on any claim they are unsure of (for example which numbers are estimates)

## Framework

For every factual claim, check:
1. **Title**: would HR records and a reference confirm it exactly? "Acting" or "interim" is fine if stated.
2. **Number**: where does it come from? Could the person explain how it was measured in one minute?
3. **Ownership**: "led" versus "contributed to". Did the person decide, or support?
4. **Dates**: month and year match records? No overlaps hidden, no gaps stretched over.
5. **Skills**: is each one used somewhere on the CV?
6. **Qualifications**: awarded, or in progress? Labelled correctly?

Risk levels:
- **High**: would likely fail a reference or background check (title, dates, qualification)
- **Medium**: would struggle under a follow-up question (number, ownership)
- **Low**: vague but harmless

## Output Format

### Honesty check: [name]
**1. Claim table** | Line | Claim | Risk | Likely question | Safer wording |
**2. Verify before sending** | Fact | Check against |
**3. Summary**: count of high, medium and low risks, and whether it is ready to send

## Quality Checks
- [ ] Every title, date range, number and qualification is in the table
- [ ] Every high or medium risk has a safer wording
- [ ] Safer wordings are true and still specific
- [ ] The summary says plainly whether the CV is ready

## Anti-Patterns
- **Helping a claim sound more defensible without making it true.** The goal is accuracy.
- **Stripping the CV of confidence.** "Led" is fine when the person led.
- **Ignoring dates.** Date fudges are among the most often checked items.
- **Moralising.** Point out the risk and give the wording. Keep it practical.

## Example Trigger Phrases
- "Check my CV holds up before I send it."
- "Is it OK to say I led this project? I was second in charge."
- "Which lines on my CV would an interviewer challenge?"
- "帮我检查简历里有没有夸大的地方。"
