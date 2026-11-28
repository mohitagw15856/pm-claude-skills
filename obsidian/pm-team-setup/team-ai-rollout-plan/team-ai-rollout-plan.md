---
aliases: ["Team AI Rollout Plan"]
tags: [pm-skills, skill]
skill: team-ai-rollout-plan
description: "Plan how a team adopts shared AI skills over 30 days: what to standardise first, who owns the shared context and skills, how people are onboarded, the rules for what the assistant may and may not do, and how to tell whether it is working. Use when asked to roll out AI to my team, get the team using the same skills, plan our AI adoption, standardise how we use Claude or ChatGPT, or my team all use AI differently. Produces a week-by-week plan with owners, a starter set of skills matched to the team's real work, usage rules, an onboarding checklist and a review at day 30."
---

# Team AI Rollout Plan Skill

Teams rarely fail to adopt AI; they adopt it eight different ways. One person has a careful setup, another pastes customer data into a chat window, and the documents that come out look nothing alike. A rollout is the work of agreeing a small common core: the same context, the same few skills for the documents the team writes most, and rules everyone can remember. This skill plans that core for the first month. To build the shared context itself, use `team-context-interview`.

## What This Skill Produces

- **A 30-day plan**, week by week, with one owner per item
- **A starter set**: the five to eight skills that match the documents the team already produces
- **Usage rules** short enough to fit on one screen
- **An onboarding checklist** for each team member
- **A day-30 review**: what to look at and what to decide

## Required Inputs

Ask for these if not provided:
- **The team**: size, roles, and which assistants and plans they have access to
- **The documents they write most often** and which cause the most rework
- **What is already in use**: personal prompts, shared templates, any earlier attempt
- **Company rules**: approved tools, data that must not be shared, who has to sign off
- **Who will own this.** Without a named owner the plan is a wish

Do not promise time saved or quality gained. If the user wants a target, help them choose something they can observe (for example, the number of review rounds on a PRD) and measure it before the rollout starts.

## Framework: A Small Common Core

1. **Week 1: agree the core.** Run the context interview and write the shared context file. Pick the starter skills from the team's own most-written documents, not from what looks impressive. Write the usage rules. Take the baseline for whatever will be measured.
2. **Week 2: two people first.** A pair uses the setup on real work for a week and keeps a list of where the output was wrong or off-style. Fix the context and the skills from that list.
3. **Week 3: everyone.** One working session: install, run a skill on something due this week, and show what to do when the output is wrong. Each person completes the onboarding checklist.
4. **Week 4: settle.** Collect what people changed locally and fold the good changes back into the shared version. Agree how updates are proposed and who approves them.
5. **Day 30: review.** Compare with the baseline, list what is and is not being used, and decide what to add, drop or fix.

**Usage rules** to settle in week 1:
- What data may be given to the assistant, and what may not.
- A person reads everything before it is sent or filed. The assistant drafts; it does not publish.
- Numbers, dates, names and quotes come from a source, never from the assistant's memory.
- Where the shared files live and who may change them.
- What to do when the output is wrong: fix the shared file, do not just fix the document.

## Output Format

# AI Rollout Plan: [team] · starts [date]

**Owner:** [name] · **Measured by:** [the observable, with its baseline]

## Starter Set
| Document the team writes | Skill | Why first |
|--------------------------|-------|-----------|

## 30 Days
| Week | What happens | Owner | Done when |
|------|--------------|-------|-----------|

## Usage Rules
1. [rule]

## Onboarding Checklist (per person)
- [ ] [item]

## Day-30 Review
| Look at | Source | Decision it informs |
|---------|--------|---------------------|

## Risks
| Risk | Early sign | Response |
|------|-----------|----------|

## Quality Checks

- [ ] Every item has exactly one named owner
- [ ] The starter set maps to documents the team already writes
- [ ] The usage rules cover data, human review and sourced facts
- [ ] A baseline is taken before the rollout, or the plan says none exists
- [ ] No saving or improvement is promised
- [ ] The plan says how the shared files get updated after day 30

## Anti-Patterns

- [ ] Do not start with everyone at once
- [ ] Do not install fifty skills; a team uses the handful that match its work
- [ ] Do not leave data rules until after something has been pasted
- [ ] Do not measure success by how much the assistant is used
- [ ] Do not let each person keep a private fork of the shared context

## Example Trigger Phrases

- "Roll out AI skills to my team."
- "My team all use AI differently. Help me standardise."
- "Plan our first month of using shared skills."
- "What rules should we set for using AI on the team?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/team-ai-rollout-plan.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.1.0 | skill: team-ai-rollout-plan | source: skills/team-ai-rollout-plan/SKILL.md | sha256: b6220006b657999ee031844f4db0e3f17d4dd218d97ece5d7362276e46f85007 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
