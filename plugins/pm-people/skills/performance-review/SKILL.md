---
name: performance-review
description: "Write structured, balanced performance reviews from bullet-point inputs. Use when asked to write a performance review, self-assessment, peer review, 360 feedback, or manager evaluation. Produces a complete, fair, professionally written review covering achievements, areas for growth, and development goals."
---

# Performance Review Skill

This skill turns rough notes, bullet points, or bullet-point memories into a complete, professionally written performance review. Output is ready to submit or use as a strong first draft.

## Required Inputs

Ask the user for these if not provided:
- **Review type** (Self-assessment / Manager review / Peer/360 / Upward feedback)
- **Review period** (e.g. H1 2025, Q2 2025, Annual)
- **Name of person being reviewed** (or "myself" for self-assessment)
- **Role / level**
- **Key achievements or notable work** (rough notes are fine)
- **Areas where they struggled or could improve** (be honest — reviews without growth areas aren't credible)
- **Key projects or deliverables from the period**
- **Company values or competencies to assess against** (optional — if provided, structure the review around them)
- **Overall rating/recommendation** (if the form requires one)

## Output Structure

---

# Performance Review: [Name]
**Role:** [Title / Level]
**Review period:** [Period]
**Review type:** [Manager / Self / Peer / Upward]
**Reviewed by:** [If known]

---

## Overall Summary

[3–5 sentences. High-level characterisation of the period. Acknowledge standout contributions. Be specific — use project names and outcomes, not vague praise. For self-assessments, this should reflect honestly on the period without underselling or overselling.]

---

## Achievements & Impact

[3–5 achievements, each structured as:]

**[Achievement title — specific and concrete]**
[2–4 sentences. What was the context? What did [name] do specifically? What was the measurable or observable outcome? Avoid generic praise — every sentence should be something only this person could have done.]

---

## Strengths Demonstrated

[3–4 bullet points. Each bullet = one strength, with one concrete example from the review period. No abstract traits without evidence.]

- **[Strength]:** [Example — specific project or behaviour that demonstrated this]

---

## Areas for Growth

[2–3 areas. Be direct and constructive — not vague. Frame as "opportunity to develop" not "failure." Each should include:]

**[Area name]**
- **Observed pattern:** [What was noticed — be specific, not personal]
- **Why it matters:** [Impact on team, output, or career progression]
- **Suggested development:** [One concrete action — e.g. "Take on [X] responsibility next half" or "Shadow [role] on [process]"]

---

## Development Goals for Next Period

[2–3 goals. Format each as:]

**Goal [N]:** [Clear, outcome-oriented goal]
- **Why:** [Connection to growth areas or career aspirations]
- **How to measure:** [What "done" looks like]
- **Support needed:** [Resources, training, or manager input required]

---

## Competency Ratings (if framework provided)

| Competency | Rating | Evidence |
|---|---|---|
| [Competency from company framework] | [Exceeds / Meets / Developing / Below] | [One-sentence example] |

---

## Closing Recommendation

[2–3 sentences. For manager reviews: overall assessment and any promotion/compensation recommendation. For self-assessments: what you're asking for or committing to. For peer reviews: one sentence on what it's like to work with this person.]

---

## Writing Rules

- Never use vague phrases: "strong communicator," "team player," "hardworking" — always back with evidence
- Growth areas must be honest — reviewers who only write positives lose credibility and help no one
- Use third person for manager/peer reviews, first person for self-assessments
- Avoid jargon — "drove alignment" and "leveraged synergies" are meaningless. Use plain language.
- If the user gives sparse notes, ask for one concrete example per achievement before writing

## Quality Checks

- [ ] Every achievement includes a specific outcome (not just activity)
- [ ] Strengths have concrete examples from the review period
- [ ] Growth areas are honest and constructive (not softened to meaninglessness)
- [ ] Development goals are measurable
- [ ] No vague phrases without evidence
- [ ] Tone is professional and fair throughout

## Example Trigger Phrases

- "Write a performance review for [name] based on these notes: [paste notes]"
- "Help me write my self-assessment for [period]"
- "Draft a peer review for my colleague who did [description]"
- "Turn these bullet points into a full performance review: [paste bullets]"
