---
name: de-arbeitszeugnis-decoder
description: "Decode a German employment reference (Arbeitszeugnis): translate the coded phrases into the grade they signal, check the structure and the closing formula, spot omissions and hidden negatives, and draft a correction request. Use when asked was bedeutet mein Arbeitszeugnis, decode my German reference letter, welche Note hat mein Zeugnis, is 'stets zu unserer vollen Zufriedenheit' good, or how do I ask for my Zeugnis to be corrected. Produces a sentence-by-sentence reading with implied grades, an overall grade estimate, a list of missing or damaging elements, suggested replacement wording and a polite correction letter in German. Not legal advice."
---

# Arbeitszeugnis Decoder (Germany)

A German reference must be both truthful and benevolent, so criticism is expressed through a settled code: what is praised, how strongly, in what order, and what is left out. A sentence that reads as praise to an outsider can signal a mediocre grade to a recruiter. This skill reads the reference the way a German HR reader does. It explains conventions; it does not give legal advice, and grading conventions are customary, not statutory.

## What This Skill Produces

- A sentence-by-sentence reading: the phrase, what it signals, the implied school grade from 1 (very good) to 5 (poor)
- An overall grade estimate with the reasoning
- A structure check: are all expected sections present and in the usual order?
- Omissions and phrases that readers treat as warnings
- Replacement wording for the weak points
- A correction request to the employer, in German

## Required Inputs

Ask for these if not provided:

- The full text of the reference, in German
- Whether it is a simple reference (einfaches Zeugnis: role and duration only) or a qualified one (qualifiziertes Zeugnis: performance and conduct)
- Role, seniority and length of service
- How the employment ended and who initiated it
- What grade the employee believes is fair, and any performance reviews supporting it
- Whether an interim reference (Zwischenzeugnis) exists

## Framework

1. **Expected structure.** Heading; introduction with name, role and dates; job description; performance assessment (knowledge, working style, results, for managers also leadership); summary performance grade; conduct towards superiors, colleagues and clients; reason for leaving; closing formula with regret, thanks and good wishes; place, date and signature.
2. **The satisfaction scale** (summary performance sentence):
   - "stets zu unserer vollsten Zufriedenheit": 1
   - "stets zu unserer vollen Zufriedenheit": 2
   - "zu unserer vollen Zufriedenheit": 3
   - "zu unserer Zufriedenheit": 4
   - "im Großen und Ganzen zu unserer Zufriedenheit" or "hat sich bemüht": 5 or worse
3. **Intensifiers carry the grade.** "stets", "jederzeit", "in jeder Hinsicht", "außerordentlich" lift a sentence; their absence lowers it.
4. **Conduct order.** Superiors are normally named first, then colleagues, then clients. A changed order or a missing group is read as a problem with that group.
5. **Omissions speak.** No mention of an obviously central duty, of honesty for a cashier, or of leadership for a manager is a negative signal.
6. **Closing formula.** Regret at the departure, thanks, and wishes for the future signal a good parting. A bare or missing closing lowers the overall impression. Courts have held there is generally no enforceable claim to a closing formula; say so and tell the user to check the current position.
7. **Warning phrases.** Praise for trivial matters, "gesellig", "verstand es, seine Interessen durchzusetzen", passive constructions around results, and double negatives such as "nicht unerheblich".
8. **Formalities.** Company letterhead, issue date close to the last day, signature by a person senior to the employee, no spelling errors, no marks or emphasis.
9. **Correction.** The employee can ask for a correction and, failing that, bring a claim; contractual and collective-agreement cut-off periods can be short. Advise acting promptly and checking the contract.

## Output Format

### Zeugnis reading: [role], [employer]

**Type:** [simple / qualified]. **Overall estimate:** grade [x] ([label]), because [reason].

| Sentence (German) | What it signals | Implied grade |
|---|---|---|

**Structure check**
| Section | Present? | Note |
|---|---|---|

**Problems**
- [omission or warning phrase and why it matters]

**Suggested wording**
| Current | Proposed (grade [x]) |
|---|---|

**Correction request (German)**
> [Polite letter naming the passages, proposing wording, and setting a reasonable date.]

**Assumptions and gaps**
- [Context assumed about role or ending]
- [What supporting evidence would strengthen the request]

*An interpretation of customary reference language, not legal advice. For a dispute, consult a specialist employment lawyer or a union.*

## Quality Checks

- [ ] The summary performance sentence is identified and graded on the scale
- [ ] Conduct sentence order and completeness are checked
- [ ] The closing formula's three elements are checked separately
- [ ] Each problem cites the exact wording
- [ ] Proposed wording stays truthful to the role
- [ ] The correction letter is in German and courteous

## Anti-Patterns

- **Do not read German reference phrases literally.**
- **Do not promise a legal right to a specific grade or closing formula.**
- **Do not propose wording that claims duties the employee never had.**
- **Do not ignore formal defects** such as a wrong date or missing signature.
- **Do not grade from one sentence.** Weigh the whole document.

## Example Trigger Phrases

- "Was bedeutet 'zu unserer vollen Zufriedenheit' in meinem Zeugnis?"
- "Decode this Arbeitszeugnis and tell me what grade it is."
- "There is no closing sentence wishing me well. Is that bad?"
- "Write a letter asking HR to correct my Zeugnis to a grade 2."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/de-arbeitszeugnis-decoder.html

<!-- pm-claude-skills v84.0.0 | skill: de-arbeitszeugnis-decoder | source: skills/de-arbeitszeugnis-decoder/SKILL.md | sha256: 5049162e968ce3c82498572ea122570f36b1f1cc8df7322998bbafe36e57d22f | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
