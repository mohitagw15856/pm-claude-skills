---
name: "Interview the user with sharp, one-at-a-time questions to tu"
description: "Interview the user with sharp, one-at-a-time questions to turn a vague request into a tight, complete brief any other skill can run on. Use when a request is fuzzy, under-specified, or 'help me think this through', or before running a skill that needs inputs the user hasn't given. Produces a structured brief (goal, audience, constraints, success criteria) and hands off to the right skill — by interrogating, not guessing."
---

# Brief Builder Skill

Most weak AI output comes from a weak brief — the model guessed at context instead of getting it. This skill
flips that: it **interviews** the user with focused questions, *one or two at a time*, following up where
answers are thin, until it has enough to produce excellent work. Then it writes the brief and hands off. The
whole value is asking the right questions in the right order — not producing on the first vague sentence.

## How to run this skill (the interrogation loop)

1. **Read what they gave you** and identify the *task type* (a launch? a doc? a decision? a piece of copy?).
2. **Ask the smallest set of high-leverage questions first**, ONE or TWO at a time — never a 20-question wall. Lead with the questions whose answers most change the output.
3. **Follow up** when an answer is vague ("everyone" → "who specifically?"; "soon" → "what date?"). Dig until it's concrete.
4. **Offer defaults**: when the user doesn't know, propose a sensible default and let them confirm ("I'll assume B2B SaaS founders unless you say otherwise").
5. **Stop when you have enough** — don't over-interview. Then summarize the brief and confirm before producing.

### The question backbone (adapt to the task)

- **Goal** — what does success look like? What decision or action should this drive?
- **Audience** — who is this for, specifically? What do they already know / believe?
- **Context** — what exists already? What's the backstory, the constraint, the deadline?
- **Scope & format** — how long, what format, where will it live?
- **Voice & guardrails** — tone, must-says, can't-says, examples to match.
- **Success criteria** — how will they judge if the output is good?

## Output Format

### 1. The questions (interactive)
Ask them conversationally, batched 1–2 at a time, easiest path first. (Do not dump the whole list at once.)

### 2. The brief (once enough is gathered)

**Brief: [task]**
- **Goal:** …
- **Audience:** …
- **Context / inputs:** …
- **Scope & format:** …
- **Voice & guardrails:** …
- **Success criteria:** …
- **Open assumptions:** anything still defaulted, flagged for confirmation.

### 3. Handoff
Name the skill (or skills) this brief should now feed (e.g. "→ run `prd-template`" or "→ `landing-page-copy`"), and offer to proceed.

## Quality Checks

- [ ] Questions are asked a few at a time, highest-leverage first — not a giant wall
- [ ] Vague answers are followed up until concrete (named audience, real dates, specifics)
- [ ] Sensible defaults are offered when the user is unsure, and labeled as assumptions
- [ ] The interview stops once there's enough — it doesn't over-interrogate
- [ ] The final brief is complete enough that another skill could produce great output from it alone
- [ ] It ends by handing off to the right skill(s)

## Anti-Patterns

- [ ] Do not produce the deliverable yourself from a vague prompt — the job is to build the brief first
- [ ] Do not dump 15 questions at once — pace them, lead with what matters most
- [ ] Do not accept vague answers — "more sales", "everyone", "soon" all need a follow-up
- [ ] Do not interrogate forever — once you can write a strong brief, stop and summarize
- [ ] Do not silently assume — when you default, say so and let the user correct it

## Based On

Creative/agency briefing practice and structured-elicitation interviewing (decision-tree questioning, progressive disclosure, confirm-before-produce).
