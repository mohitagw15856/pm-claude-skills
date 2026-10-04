---
name: career-changer-cv
description: "Write a CV for someone moving into a new field, leading with transferable evidence instead of job titles that do not match. Use when asked to write a CV for a career change, I'm moving from teaching into product, how do I present my experience for a new industry, or my job titles don't fit the jobs I want. Produces a hybrid CV with a targeted summary and a relevant-skills section backed by achievements, a translation table from old-field language to new-field language, and an honest list of gaps with how to close them."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/career-changer-cv.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Career-Changer CV

A career changer's chronological CV tells the screener the wrong story: every title says "not one of us". The fix is not to hide the history. It is to lead with evidence the new field recognises, in its own language, then show the history as context. This skill builds that hybrid CV and is honest about the gaps.

Part of the pm-cv bundle.

## What This Skill Produces

- **A hybrid CV**: summary, relevant skills with proof, then experience
- **A translation table**: what the person did, in old-field language, and the same thing in new-field language
- **A bridge section**: courses, projects or volunteering that show the move is real
- **A gaps list** with how to close each one

## Required Inputs

Ask for these if not provided:
- **The old field and the target role**, ideally with two or three real job ads
- **The person's experience**, ideally a `career-inventory` file
- **Anything already done towards the move**: courses, projects, side work

## Framework

1. **Find the overlap.** Read the target ads. List the five capabilities they ask for most. For each, find real evidence in the person's history.
2. **Translate, do not inflate.** "Planned a term of lessons for 120 students" becomes "planned and delivered a 12-week programme for 120 users". The fact is unchanged; the vocabulary is the new field's.
3. **Order.**
   - Summary: target role, the strongest transferable proof, the bridge
   - Relevant skills: three or four capability headings, each with one or two achievements as proof
   - Experience: chronological, shorter bullets, real titles
   - Bridge: projects, courses, certificates
4. **Gaps.** Name them. Suggest the fastest honest way to close each.

## Output Format

### Career-change CV: [name], [old field] to [target role]
**1. The CV**
**2. Translation table** | What I did (old language) | Same thing (new language) | Source in the CV |
**3. Gaps** | Gap | How to close it | Time needed |
**4. Targeting note**: which kinds of employer are most likely to say yes, and why

## Quality Checks
- [ ] Real job titles are kept; nothing is renamed to look like the new field
- [ ] Every skills heading has achievement evidence under it
- [ ] Translations change vocabulary, not facts
- [ ] Gaps are listed honestly

## Anti-Patterns
- **Renaming past jobs.** A teacher was not a "learning product manager". Screeners check.
- **A pure skills CV with no dates.** It looks like hiding something.
- **Apologising.** The summary states the move as a decision with evidence.
- **Ignoring the gaps.** An interviewer will not.

## Example Trigger Phrases
- "I'm a teacher moving into product management. Write my CV."
- "My job titles don't match the jobs I want. How do I present myself?"
- "Help me write a CV for a career change into data analysis."
- "转行做产品经理，简历怎么写？"
