---
name: career-inventory
description: "Interview someone about their working life and turn the answers into a master CV inventory: every role, project and achievement with real numbers, before any CV is tailored. Use when asked to build my master CV, get my experience down properly, I don't know what to put on my CV, or as the first step before a tailored CV. Produces a structured inventory of roles, achievements in a fixed shape with evidence and numbers, skills with proof, and a list of gaps to fill. Never invents a number."
version: 1.0.0
---

# Career Inventory

Most weak CVs are weak at the input, not the writing. People remember duties, not results, and they undersell the numbers they do know. This skill interviews the person, one role at a time, and builds a master inventory that every tailored CV is cut from.

First step of the pm-cv bundle. `company-tailored-cv` and the format skills read its output.

## What This Skill Produces

- **A master inventory**: every role with dates, scope and the achievements inside it
- **Achievements in one shape**: what changed, how much, by what action, with what evidence
- **Skills with proof**: each skill tied to a place it was used, not a bare keyword list
- **A gaps list**: the numbers and facts the person could find out but has not yet
- **A saved file** (`career-inventory.md`) so the interview never has to be repeated

## Required Inputs

Ask for these if not provided:
- **What exists already**: an old CV, a LinkedIn export, or nothing
- **The roles to cover**: start with the last ten years unless the person says otherwise
- **Whether it is for a change of direction**, which changes what is worth probing

## Framework: The Interview

Work one role at a time, newest first. For each role ask, in this order:

1. **Scope**: team size, budget, users, revenue or volume you were responsible for
2. **The before**: what was broken, slow, missing or risky when you arrived
3. **What you did**: the decisions and actions that were yours, not the team's
4. **The after**: what changed, and how anyone could tell
5. **The number**: if there is one. If not, ask for the nearest honest proxy (time saved, count, percentage, rank, before and after)
6. **The evidence**: a document, a dashboard, a quote, an award, a reference

Probing rules:
- Ask "how do you know?" once per claimed result. It turns adjectives into evidence.
- Accept "I don't know the number". Record it in the gaps list with where to find it.
- Separate "I" from "we". Both are allowed on a CV; the person must know which is which.
- One achievement per answer. Split compound answers.

Achievement shape:
**[Result, with number] by [action you took], [context or constraint].** Evidence: [source].

## Output Format

### Career inventory: [name], updated [date]

**Role: [title], [organisation], [start] to [end]**
- Scope: [team, budget, users, volume]
- Achievements:
  1. [achievement in the shape above] · Evidence: [source] · Confidence: confirmed / estimated / to find
- Skills used here: [skill, with the achievement number it proves]

(repeat per role)

**Skills index**: | Skill | Proven in | Strongest example |

**Gaps to fill**: | Fact needed | Role | Where to find it |

**Next step**: "Run `company-tailored-cv` with this inventory and the job you are applying for."

## Quality Checks
- [ ] Every achievement has an action the person personally took
- [ ] Every number is marked confirmed, estimated or to find
- [ ] No number appears that the person did not give
- [ ] Each skill in the index points to at least one achievement
- [ ] The gaps list exists, even if short

## Anti-Patterns
- **Inventing or rounding up numbers.** An estimate is labelled as an estimate. A missing number goes in the gaps list.
- **Recording duties.** "Responsible for reporting" is a job description, not an achievement. Ask what changed.
- **Interviewing all roles at once.** One role at a time gets detail; a wall of questions gets summaries.
- **Tailoring too early.** The inventory is complete and neutral. Tailoring happens later, per job.
- **Flattery.** Accurate is more useful than impressive. An interviewer will test every line.

## Example Trigger Phrases
- "Help me get all my experience down before I write a CV."
- "I never know what to put on my CV. Interview me."
- "Build my master CV from my old one and LinkedIn."
- "I am changing careers. What have I actually achieved?"
