---
name: interview-prep
description: "Prepare for a specific interview at a specific company, not just 'an interview'. Use when asked to prep for an interview, prepare answers for a role, practice for a specific company's interview, or get ready for a behavioural/case/PM round. Produces a tailored prep pack — likely questions for this role & round, STAR-structured answers from your background, your stories mapped to their competencies, questions to ask, and the gaps to shore up."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/interview-prep.html
metadata:
  {
    "openclaw": { "emoji": "🔎" }
  }
---

# Interview Prep Skill

Generic interview prep ("tell me about a weakness") is nearly useless — interviews are won by being ready
for *this* company's *this* round. This skill builds a tailored prep pack: the questions you're actually
likely to get, STAR-structured answers drawn from your real experience, your best stories mapped to the
role's competencies, and the gaps to address before you walk in.

## Required Inputs

Ask for these only if they aren't already provided:

- **Role & company** (and the job description if you have it — pair with [`jd-decoder`](../jd-decoder/SKILL.md) / [`company-brief`](../company-brief/SKILL.md)).
- **Round type** — recruiter screen, behavioural, case/product sense, technical/analytical, execution, or panel/final.
- **Your background** — CV or a summary of your experience and your strongest stories.
- **Known concerns** — anything you're worried they'll probe (a gap, a pivot, a short tenure).

## Output Format

### Interview Prep: [role] at [company] — [round]

**1. What this round tests** — the 3–5 competencies this specific round screens for, and how they'll likely probe each.

**2. Likely questions** — the realistic questions for *this* role/round (behavioural, case, or technical as fits), ordered by likelihood — not a generic list.

**3. Your answers (STAR)** — for the top behavioural questions, draft answers from the candidate's real background using **Situation · Task · Action · Result** — concise, quantified, first-person. For case/product questions, give a structured approach + a worked example.

**4. Story bank** — your 4–6 strongest stories, each mapped to the competencies they cover, so you can flex one story across several questions.

**5. Questions to ask them** — sharp, role-specific questions (lean on company-brief) that show you've done the work.

**6. Gaps & landmines** — the weak spots (a tenure gap, a missing skill, a pivot) and how to address each honestly and confidently if it comes up.

## Quality Checks

- [ ] Questions are tailored to the specific role and round, ordered by likelihood — not generic
- [ ] STAR answers use the candidate's real experience and quantify the result
- [ ] A reusable story bank maps stories to competencies (so prep scales across questions)
- [ ] Questions-to-ask are company-specific, not boilerplate
- [ ] Known gaps/landmines have an honest, confident handling plan

## Anti-Patterns

- [ ] Do not produce a generic question list — prep is only useful when it's for this round at this company
- [ ] Do not write fabricated achievements into STAR answers — build from the candidate's real stories
- [ ] Do not over-script — answers should be structured talking points, not memorised paragraphs that sound robotic
- [ ] Do not dodge the candidate's weak spots — rehearse an honest, confident response instead of hoping it won't come up
- [ ] Do not ignore the round type — a behavioural prep and a case prep are different documents

## Based On

Structured interview preparation — STAR/behavioural method, competency-mapped story banks, role-and-round tailoring.
