---
aliases: ["Nursing Care Plan"]
tags: [pm-skills, skill]
skill: nursing-care-plan
description: "Draft a nursing care plan from an assessment: prioritised problems, a measurable goal for each, the nursing interventions with their rationale, and how and when each goal is evaluated. Use when asked to write a care plan, turn this assessment into a plan of care, write nursing goals, student care plan help, or update a care plan after a change. Produces a problem list in priority order, a goal, interventions and evaluation criteria for each problem, and a review date. Distinct from respite-care-plan, which is for family carers."
---

# Nursing Care Plan

A care plan fails when its goals cannot be measured ("improve mobility") or its interventions are a list of everything a nurse might ever do. This skill builds a short plan in which each problem has one goal, a few interventions that follow from it, and a date on which someone checks whether it worked. It supports documentation and learning. Clinical decisions stay with the registered nurse and the care team.

## What This Skill Produces

- A problem list in priority order with the reasoning for the order
- For each problem: the evidence from the assessment, one measurable goal, interventions with rationale, and evaluation criteria
- The patient's own goals and preferences, recorded in their words where supplied
- A review schedule and the triggers for an earlier review

## Required Inputs

Ask for these if not provided:

- Care setting and the format required (local template, or a nursing-process layout)
- Assessment findings: observations, pain, mobility, nutrition, skin, continence, cognition, mood, social situation
- Diagnoses and treatments ordered by the medical team
- Risk assessments already completed (falls, pressure injury, nutrition) and their scores
- What the patient says matters to them, and any family or carer involvement
- Whether this is for practice or for a student assignment (a student plan may need a named framework and references, which the student must supply or verify)

## Framework: Assess, Prioritise, Plan, Evaluate

1. **State each problem as a need plus its cause plus the evidence.** "Risk of pressure injury related to reduced mobility, shown by a risk score in the high band and redness over the sacrum."
2. **Prioritise.** Airway, breathing and circulation first; then safety risks; then pain and comfort; then function, nutrition and psychosocial needs. Say when the patient's own priority differs and include it.
3. **One goal per problem**, written so a colleague could tell whether it was met: what will be observed, in whom, by when.
4. **Interventions follow from the goal.** Three to five, each specific (what, how often, who) with a one-line rationale. Mark which need a medical or therapy order.
5. **Evaluation.** The measure, the date, and what happens if the goal is not met.
6. **Review.** A date, plus triggers: a change in condition, a new risk score, a fall, a transfer.

## Output Format

### Care plan: [patient identifier], [setting], [date]

**What matters to the patient:** [their words, or "not recorded"]

| Priority | Problem (need, cause, evidence) |
|---|---|
| 1 | [problem] |

**Problem 1: [short name]**
- **Evidence:** [assessment findings]
- **Goal:** [measurable outcome] by [date or time]
- **Interventions:**
  1. [action, frequency, who]. Rationale: [why]
  2. [action]. Rationale: [why] *(needs order from: [team], if applicable)*
- **Evaluation:** [measure] on [date]. If not met: [next step]

**Review:** [date]. Review earlier if [triggers].

**Assumptions and gaps**
- [Findings assumed or not supplied]
- [The assessment that would most change this plan]

*Draft for the registered nurse to check against the record and local policy.*

## Quality Checks

- [ ] Every problem cites evidence from the assessment supplied
- [ ] Every goal names an observable measure and a date
- [ ] Interventions are specific about frequency and who acts
- [ ] Items needing an order from another profession are marked
- [ ] The patient's stated priorities appear
- [ ] A review date and early-review triggers are present

## Anti-Patterns

- **Do not write goals that cannot be checked**, such as "improve wellbeing".
- **Do not list every possible intervention.** A plan nobody can deliver is not a plan.
- **Do not prescribe.** Medicines, doses and treatments come from the prescriber's orders.
- **Do not invent assessment findings** to complete a section.
- **Do not copy a plan forward unchanged** after a review; state what changed.

## Example Trigger Phrases

- "Write a care plan for a patient two days after a hip replacement from this assessment."
- "Turn these risk scores into nursing goals I can measure."
- "My care plan goals are too vague. Fix them."
- "Update this care plan after the patient fell last night."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/nursing-care-plan.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.0.0 | skill: nursing-care-plan | source: skills/nursing-care-plan/SKILL.md | sha256: e3db0dc5f37d043fea8d300df81f26a0cff2faa8f99ef7680f4b8533f42fbefb | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
