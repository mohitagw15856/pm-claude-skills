---
aliases: ["Fundraising FAQ"]
tags: [pm-skills, skill]
skill: fundraising-faq
description: "Pressure-test a fundraise by anticipating the hard investor questions and arming the founder with crisp answers. Use when asked to prep for investor Q&A, anticipate due-diligence questions, handle pushback on a raise, or build a fundraising FAQ. Produces the toughest questions an investor will ask — grouped by theme — each with the strongest honest answer and the trap to avoid."
---

# Fundraising FAQ Skill

Founders lose rounds in Q&A, not on the deck. This skill surfaces the questions a sharp investor *will* ask, then drafts the answer that holds up — honest, specific, and confident.

## Working from a brief

Given a short company description, **generate the full Q&A anyway** — infer the likely concerns from the stage, market, and model. Mark any assumed metric *(assumed — replace)*. Never leave placeholders; show a strong model answer the founder can adapt.

## Required Inputs

Ask for (if not already provided):
- **What the company does**, stage, and how much they're raising
- **Known soft spots** (weak metric, crowded market, regulatory risk, single big customer)
- **Traction and team** facts the answers can stand on

## Output Format

Group questions by theme. For each question give: **Q**, the **strongest honest answer** (2–4 sentences, specific), and **⚠️ the trap** (the weak/defensive answer to avoid).

**1. Market & why-now**
- How big is this *really*? Why hasn't it been done? Why now?

**2. Traction & metrics**
- Is the growth real or a one-off? What's churn / retention / payback? What happens if your top customer leaves?

**3. Moat & competition**
- Why can't [incumbent] just do this? What stops a fast follower? What's your unfair advantage?

**4. Business model & unit economics**
- Do the unit economics work at scale? What's CAC, LTV, gross margin? When are you default-alive?

**5. Team & execution**
- Why *this* team? What's the biggest risk to execution? What have you learned that others haven't?

**6. The raise**
- Why this amount? What does it buy? What milestones get you to the next round? What's your valuation rationale?

End with:
- **The 3 questions you're most afraid of** — name them, and give the answer that turns each into a strength.
- **Red flags to never say** — defensive tells ("we have no competitors", "we just need marketing", "the market is so big we only need 1%").

## Quality Checks

- [ ] Answers are specific and honest, not spin
- [ ] Each weak spot the founder named has a prepared, non-defensive answer
- [ ] The "afraid of" section confronts the real risks, not easy ones
- [ ] No placeholder metrics left un-flagged

## Anti-Patterns

- Dodging the hard question instead of answering it
- "No competitors" and "we only need 1% of the market"
- Over-long answers that sound rehearsed and evasive
- Pretending a real risk doesn't exist instead of framing how you'll manage it

## Example Trigger Phrases

- "Prep for investor Q&A."
- "Handle pushback on a raise."
- "Build a fundraising FAQ."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/fundraising-faq.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.0.0 | skill: fundraising-faq | source: skills/fundraising-faq/SKILL.md | sha256: 76a2f93ef34099053c2cc7bde9ac4f86b3b529d8cd4015b6265dab18730302d5 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
