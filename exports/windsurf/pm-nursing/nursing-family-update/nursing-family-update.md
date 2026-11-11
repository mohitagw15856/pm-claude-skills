---
trigger: model_decision
description: "Prepare a plain-language update for a patient's family or carer: what has happened, how the patient is now, what happens next, and what the family can do, checked against consent and what the nurse is allowed to share. Use when asked how do I update this family, write a family update, explain this to the relatives, prepare for a difficult phone call with a daughter, or put this in plain language for the family. Produces a consent check, a spoken script, a short written version, likely questions with honest answers, and what to hand to the doctor. Distinct from patient-communication, which writes to the patient."
---

# Nursing Family Update

Families remember two things from an update: whether they were told the truth and whether anyone said what happens next. Nurses often have five minutes and a corridor. This skill prepares an update in plain words that stays inside what the nurse may share, and it separates what the nurse can say from what must come from the doctor.

## What This Skill Produces

- A consent and confidentiality check before anything is shared
- A spoken script of about ninety seconds in plain language
- A short written version for a message or a note, if the organisation permits written updates
- Likely questions with honest answers, including "I do not know, and here is who does"
- A list of matters to refer to the medical team

## Required Inputs

Ask for these if not provided:

- Who is asking, their relationship, and whether the patient has agreed to share information with them
- Whether the patient has capacity, and who the documented decision-maker is if not
- What has happened since the family last heard, in clinical terms
- The current plan and what is uncertain
- How the family is likely to take it, and any language, hearing or literacy needs
- Channel: in person, phone, or written

## Framework: Permission, Headline, Detail, Next

1. **Check permission.** No consent recorded and the patient has capacity: ask the patient first. Say this plainly to the family if needed.
2. **Headline first.** One sentence on how the patient is now.
3. **What happened**, in everyday words. Replace or explain every clinical term.
4. **What happens next**, with times where known, and what would change the plan.
5. **What they can do**: visiting, bringing items, who to call, what to tell staff.
6. **Stay in scope.** Diagnosis, prognosis and treatment decisions belong to the doctor. Offer to arrange that conversation.
7. **Uncertainty is information.** Say what is not yet known and when it will be.
8. **Check understanding** by asking them to say back what they will tell the rest of the family.

## Output Format

### Family update: [relationship], [channel]

**Before you speak:** consent [recorded / ask patient first / decision-maker is ...]. Share: [what is in scope]. Do not share: [what is not].

**Script (about 90 seconds)**
> [Headline.]
> [What happened, plain words.]
> [What happens next and when.]
> [What you can do.]
> [Invitation to ask questions.]

**Written version (if permitted):** [three to five sentences]

**Likely questions**
| Question | Honest answer | Refer to |
|---|---|---|

**Ask the doctor to cover:** [list]

**Assumptions and gaps**
- [What was assumed about consent or the plan]
- [What the family will ask that nobody has an answer to yet]

## Quality Checks

- [ ] Consent or decision-maker status is stated before any content
- [ ] No unexplained clinical term remains in the script
- [ ] The update says what happens next and when
- [ ] Prognosis and treatment decisions are referred, not answered
- [ ] Uncertainty is stated, not smoothed over
- [ ] Nothing reassures beyond what the facts support

## Anti-Patterns

- **Do not share information without checking consent.**
- **Do not say "she is fine" or "nothing to worry about"** unless that is what the record shows.
- **Do not give a prognosis.** Arrange the conversation with the doctor.
- **Do not bury the headline** under a history of the admission.
- **Do not promise times** the ward cannot keep.

## Example Trigger Phrases

- "His daughter phones every evening. Help me update her after today's fall."
- "Put this post-op update into plain language for the family."
- "The family is angry about the delay. What can I say and what must the doctor say?"
- "Write a short message for the next of kin about the transfer to rehab."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/nursing-family-update.html

<!-- pm-claude-skills v84.0.0 | skill: nursing-family-update | source: skills/nursing-family-update/SKILL.md | sha256: 3cc0992ee87a7e755df6ef75d0f41b7b3bb1873d157418cef3d89d7e61ca924e | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
