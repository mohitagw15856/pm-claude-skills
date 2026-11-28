---
name: team-context-interview
description: "Interview a team lead to build the shared context file that makes an AI assistant useful for the whole team: the product, customers, terminology, standards, templates and what the assistant must never do. Use when asked to set up shared context for my team, build our company context file, what should go in our CONTEXT file, interview me about our product so the AI knows it, or get the team working from the same instructions. Produces the interview questions in order, a filled context file from the answers, a list of gaps to chase, and a rule for who updates it and when."
---

# Team Context Interview Skill

An assistant with no context writes for a generic company. Give five people on a team five private sets of notes and it writes for five slightly different companies. The fix is one shared file, owned by a named person, that says what the team builds, for whom, in what words and to what standard. Most teams never write it because nobody knows what belongs in it. This skill runs the interview that produces it. For one person's own working memory, use `build-my-memory-file`; for a quick primer on a single project, use `ai-context-primer`.

## What This Skill Produces

- **An interview script**: questions in an order that gets specifics, with a follow-up for vague answers
- **A context file** in Markdown, written from the answers, short enough to be read on every request
- **A gaps list**: what the lead could not answer and who probably can
- **An ownership rule**: who edits the file, how changes are proposed, and when it is reviewed

## Required Inputs

Ask for these if not provided:
- **Who is being interviewed** and their role
- **The team**: size, functions, and which assistants they use
- **Existing material** to read first: a strategy page, a style guide, PRD and update templates
- **Sensitivity limits**: what must not be written into a file that an AI tool will read

Record what the lead says. Do not fill a gap with a plausible guess: an invented customer segment or metric in the shared file misleads the whole team. Mark unknowns as open questions.

## Framework: The Interview

Ask one section at a time, and ask for an example whenever an answer is abstract.

1. **What we make.** In two sentences, what is the product and what does a customer use it to do? What is it not?
2. **Who it is for.** The segments by name, who buys and who uses, and which segment matters most this year.
3. **The words we use.** Product and feature names, internal terms, terms customers use instead, and words the team avoids. This section saves the most rework.
4. **How we decide.** The current goals and the metrics behind them, with definitions. How priorities are set and who signs off.
5. **How we write.** Document types the team produces, the template for each, tone, length, and a good example of each to copy.
6. **What is true right now.** The roadmap themes, what just shipped, known problems customers raise.
7. **Constraints.** Regulation, security rules, commitments to customers, things legal must review.
8. **What the assistant must never do.** Examples: invent customer names or numbers, promise dates, share one customer's details with another, send anything without a person reading it.
9. **Who knows more.** For each gap, the person to ask.

Then write the file. Keep it under about two pages: an assistant reads it on every request, and a long file crowds out the task. Put stable facts first and fast-changing ones last, each with a "last updated" date.

## Output Format

# Team Context: [team]

**Owner:** [name] · **Last reviewed:** [date] · **Review every:** [interval]

## What We Make
## Who It Is For
## Our Terms
| We say | Not | Meaning |
|--------|-----|---------|

## Goals and Metrics
| Goal | Metric | Definition | Source |
|------|--------|------------|--------|

## How We Write
[Document types, templates, tone, examples]

## Current State (changes often)
[Roadmap themes, recent releases, known issues, each dated]

## Constraints
## The Assistant Must Never
- [rule]

---

## Open Questions
| Gap | Who to ask |
|-----|------------|

## How This File Changes
[Who edits, how to propose a change, review date]

## Quality Checks

- [ ] Every statement in the file came from the interview or supplied material
- [ ] Unknowns are in Open Questions, not guessed
- [ ] The terms table exists and includes words to avoid
- [ ] Each metric has a definition and a source
- [ ] Fast-changing facts carry a date
- [ ] The file has a named owner and a review interval
- [ ] Nothing the lead marked as sensitive was written down

## Anti-Patterns

- [ ] Do not write the file from the company website and call it context
- [ ] Do not let the file grow into a wiki; link out instead
- [ ] Do not record a goal without its number or a metric without its definition
- [ ] Do not include customer personal data or credentials
- [ ] Do not finish without an owner: an unowned context file is wrong within a quarter

## Example Trigger Phrases

- "Set up shared context for my team."
- "Interview me so the AI knows our product."
- "What should go in our company context file?"
- "Get my team working from the same instructions."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/team-context-interview.html
