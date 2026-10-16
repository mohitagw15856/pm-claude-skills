---
trigger: model_decision
description: "Draft answers to a vendor security questionnaire (SIG, CAIQ, or a custom sheet) from your real controls — fast, consistent, and honest about gaps. Use when asked to fill out a security questionnaire, answer a SIG/CAIQ, respond to a customer's security review, or complete a vendor risk assessment. Produces drafted answers grounded in your stated controls, a gap list of questions you can't truthfully answer yet, and reusable answer snippets for next time — never fabricated compliance."
---

# Security Questionnaire Autofill

A single enterprise deal can arrive with a 300-question security questionnaire, and answering it by hand is a week no one has. This drafts the answers from your actual security posture, keeps the wording consistent across questions, and — critically — refuses to invent a control you don't have. What it can't answer truthfully, it flags, so you close the real gap instead of papering over it.

> Answers must reflect reality. A fabricated "yes" on a security questionnaire is a misrepresentation that can void a contract — this skill flags gaps, it does not invent controls.

## What This Skill Produces

- **Drafted answers** — one per question, grounded in your stated controls, in consistent language
- **The gap list** — questions you can't currently answer "yes" to, with what closing them would take
- **Reusable snippets** — a growing answer library so the next questionnaire is faster
- **Evidence pointers** — which policy/doc backs each answer (so reviewers can verify)

## Required Inputs

Ask for these if not provided:
- **The questionnaire** — the questions (SIG, CAIQ, or custom), pasted or attached
- **Your controls** — your security posture: policies, certifications (SOC 2, ISO 27001), encryption, access control, MFA, backups, incident process — whatever's real
- **Your posture doc / prior answers** — if you have a security whitepaper or past questionnaire, feed it for consistency
- **Honesty stance** — confirm: flag gaps rather than best-case them (default: yes)

## Framework: Answer From Truth

1. **Map question → control.** Each question is answered from a real control or marked a gap. No control, no "yes."
2. **Consistent voice.** The same control answered the same way every time it's asked (questionnaires repeat).
3. **Evidence-anchored.** Every substantive answer names the policy/doc/cert that proves it.
4. **Gaps are findings, not failures.** A flagged gap is an action item; a fabricated answer is a liability.
5. **Scope honestly.** "Yes, for production; not yet for the sandbox" beats a misleading blanket yes.

## Output Format

### Security Questionnaire — [customer] · [framework]
**Summary:** [N answered · G gaps · C need a human decision]

### Answers
| # | Question | Answer | Evidence | Confidence |
|---|---|---|---|---|
| 1 | … | Yes — [detail] | [policy/cert] | High |
| 2 | … | **GAP** — not in place; would require [x] | — | — |

### Gaps to close (ranked)
- [control] — effort to close, and whether it blocks this deal

### Snippets saved for reuse
- [control] → [reusable answer text]

## Quality Checks
- [ ] Every "yes" traces to a real, named control — none inferred or invented
- [ ] Gaps are flagged explicitly, not softened into misleading answers
- [ ] Repeated questions get consistent answers
- [ ] Scope is honest where a control is partial
- [ ] Anything requiring a business/legal decision is escalated, not guessed

## Anti-Patterns
- **Fabricating a "yes"** to speed the deal — the single thing this skill must never do.
- **Inconsistent answers** to the same control across the sheet — reviewers notice.
- **Vague answers with no evidence** — "we take security seriously" fails a review.
- **Hiding a partial scope** behind a blanket claim.

## Example Trigger Phrases
- "Fill out this security questionnaire from our controls."
- "Answer this SIG/CAIQ for a customer security review."
- "Respond to the vendor risk assessment — flag anything we can't truthfully claim."
- "Draft answers to this security review and list our gaps."
