# Team Setup: delivery playbook

How to run a done-for-you Team Setup if a team says yes. It exists so the offer is repeatable and so the work is honest about what it delivers. The public page is [team-setup.md](team-setup.md). Nothing here sets a price.

## Before saying yes

A setup is worth doing when all four are true:

- The team has three or more people who write similar documents.
- They already use an AI assistant at work, or have approval to.
- One person will own the shared files after the setup. Without an owner, decline or delay.
- They can share two or three real documents they consider good.

## 1. Discovery call (45 minutes)

Aim: understand the work, not sell the setup.

| Ask | Listen for |
|---|---|
| Which documents does the team write every week? | The three or four that matter. These become the starter set |
| Which of them cause the most rework? | Where a tailored skill pays back first |
| Show me one you think is good, and one that was not | The unwritten rules |
| Which assistants and plans do people have? | What can be installed, and where |
| What may not be given to an AI tool here? | Data rules, before anything is shared |
| Who would own this after I leave? | A name. If there is none, stop here |

Send a written summary the same day, with what you understood and what you need from them.

## 2. Scope

Write the scope before starting. A normal setup is:

- One shared context file, built with [`team-context-interview`](../skills/team-context-interview/SKILL.md).
- Three to five skills tailored from the team's own templates with [`template-to-skill`](../skills/template-to-skill/SKILL.md).
- A team skill list (`.pm-skills.json`) and an onboarding checklist, started with `npx pm-claude-skills team init`.
- One working session with the whole team.
- A written 30-day plan, from [`team-ai-rollout-plan`](../skills/team-ai-rollout-plan/SKILL.md).

Say what is not included: ongoing support, training on the assistant itself, anything involving customer personal data.

## 3. Build

1. Run the context interview with the lead. Mark every gap as an open question; do not fill one with a guess.
2. Tailor the skills from the template plus the good examples. Remove real customer names and figures from anything that goes into a skill file.
3. Try each skill on a real past request and compare with the document the team actually wrote. Fix the skill, not the output.
4. Run `npx pm-claude-skills team check` until it passes.

## 4. Working session (60 to 90 minutes)

1. Everyone installs: `npx pm-claude-skills sync`.
2. Each person runs one skill on something due this week.
3. Collect what was wrong or off-style, live, and fix the shared files in front of them.
4. Agree the rules: what data may be shared, a person reads everything before it is sent, facts come from a source.
5. Agree who edits the shared files and how a change is proposed.

## 5. Done means

- [ ] `team check` passes on the team's repository or shared folder.
- [ ] The context file has a named owner and a review date.
- [ ] Every person has run at least one skill on real work.
- [ ] The team has seen one shared file fixed and the result improve.
- [ ] The 30-day plan is written, with one owner per item.
- [ ] A day-30 review is in the calendar.

## 6. Day 30

Ask what is used, what is not, and what people changed locally. Fold the good local changes into the shared version. Take whatever was measured at the start and compare; if nothing was measured, say so and do not claim a result.

## What to keep from each setup

- Which documents teams ask for first. That is the demand signal for new skills.
- Which unwritten rules keep recurring. They belong in the general skills.
- What went wrong. Add it to this playbook.

Never reuse one team's context, examples or tailored skills for another team.
