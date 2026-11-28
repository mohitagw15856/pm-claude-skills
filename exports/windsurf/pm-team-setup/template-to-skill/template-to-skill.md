---
trigger: model_decision
description: "Turn a company's existing document template, with one or two good filled-in examples, into a skill that produces documents the way that company writes them. Use when asked to turn our template into a skill, make the AI use our PRD format, build a skill from this template, capture how we write status updates, or customise a skill for our company. Produces a complete SKILL.md with the company's sections, rules and wording, a list of the unwritten rules found in the examples, test inputs to try it on, and the questions the template leaves unanswered."
---

# Template to Skill Skill

Every company has a template, and nobody's documents look like it. The real standard lives in the two or three documents everyone agrees are good: how long the summary runs, what counts as a metric, which sections are routinely skipped. A skill built from the blank template reproduces the blank template. A skill built from the template and the good examples together reproduces the house style. This skill does the second. To write a skill from an idea, use `make-me-a-skill`; for the craft of skill writing in general, use `writing-great-skills`.

## What This Skill Produces

- **A SKILL.md** with frontmatter, required inputs, the process, the company's output format, quality checks and anti-patterns
- **The unwritten rules**: conventions seen in the examples that the template does not state
- **Test inputs**: two or three realistic requests to try the skill on, including a thin one
- **Open questions**: where the template and the examples disagree, or neither says

## Required Inputs

Ask for these if not provided:
- **The template**, blank
- **One or two filled-in examples** that the team considers good, and if possible one considered weak
- **Who writes it, who reads it, and what the reader does with it**
- **What usually goes wrong** with these documents today
- **Company terms and rules** that apply: names to use, things never to state, who must approve

Remove or replace confidential details in the examples before they go into a skill file: a skill is shared, and real customer names, figures and people should not be embedded in it. Do not invent a company rule. If the examples do not show how something is handled, ask.

## Framework: Template Plus Evidence

1. **Read the template for structure.** List the sections in order, and for each, what it is meant to contain.
2. **Read the examples for behaviour.** For each section, note what the good examples really do: length, tense, level of detail, tables or prose, how numbers are presented, what is left out.
3. **Write down the gaps.** Where examples depart from the template, the examples usually win. Where the good and weak examples differ, that difference is a quality check.
4. **Define the inputs.** What must the writer supply for the document to be honest? Those become Required Inputs, with the instruction to ask and not to invent.
5. **Write the description for triggering.** Say what it produces, then the phrases a colleague would actually type, in the company's own words for the document.
6. **Write the output format** as the company's template, with a bracketed instruction in each section drawn from the examples.
7. **Turn the unwritten rules into checks.** Each quality check should be something a reviewer could tick: "the summary names the decision needed in its first sentence".
8. **Add the anti-patterns** from what goes wrong today.
9. **Test it.** Run the skill on a real past request and compare with the good example. Fix the skill, not the output.

## Output Format

# Skill: [document name] for [company or team]

## SKILL.md
```markdown
---
name: [lowercase-hyphenated]
description: "[what it produces]. Use when asked [the phrases colleagues use]. Produces [the artefact]."
---

# [Title] Skill

[Why this document exists and what a good one does, in two or three sentences.]

## Required Inputs
## Process
## Output Format
## Quality Checks
## Anti-Patterns
## Example Trigger Phrases
```

## Unwritten Rules Found
| Rule | Seen in | Now in the skill as |
|------|---------|---------------------|

## Test Inputs
1. [a full request]
2. [a thin request, to check it asks instead of inventing]

## Open Questions
[Where the template and examples disagree or are silent]

## Removed for Confidentiality
[What was taken out of the examples]

## Quality Checks

- [ ] The skill's output format follows the company's section order and names
- [ ] Each convention in the skill is traceable to the template or an example
- [ ] Required inputs tell the assistant to ask, not invent
- [ ] Quality checks are specific enough for a reviewer to tick
- [ ] No real customer, person or confidential figure is embedded
- [ ] The skill was tried on at least one real request

## Anti-Patterns

- [ ] Do not build the skill from the blank template alone
- [ ] Do not paste a full confidential example into the skill
- [ ] Do not invent a house rule to fill a gap
- [ ] Do not write quality checks such as "is clear and concise"
- [ ] Do not fix a bad output by hand; fix the skill

## Example Trigger Phrases

- "Turn our PRD template into a skill."
- "Make the AI write status updates the way we do."
- "Build a skill from this template and these two examples."
- "Customise a skill for our company's format."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/template-to-skill.html

<!-- pm-claude-skills v84.1.0 | skill: template-to-skill | source: skills/template-to-skill/SKILL.md | sha256: bb3d77ffcb4ba7e045434fd43c20ce511577592c7070b3851c3d5b053abf8fbe | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
