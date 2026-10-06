# Example: writing-great-skills

## What this skill does

Authors a high-quality Agent Skill (SKILL.md): sharp frontmatter description with trigger phrases, a clear output contract, quality checks and anti-patterns, returned as a complete SkillCheck-passing file plus a short rationale.

## How to trigger it

### Example 1: a new skill from a one-line idea

**You say:**
> "Write a skill that turns a messy meeting transcript into a decision log: what was decided, by whom, and what was explicitly deferred."

**Claude produces (excerpt):**

```markdown
---
name: decision-log-extractor
description: "Extract a decision log from a meeting transcript: each decision
with its owner, the stated rationale, and what was explicitly deferred or
left unresolved. Use when asked to pull decisions from a meeting, write up
what was decided, create a decision log, or check what a meeting actually
settled. Produces a decision table with owners and rationale, a deferred
list with revisit dates, and an unresolved list flagged for follow-up."
---

# Decision Log Extractor Skill

## Output Structure

### Decision Log: [meeting], [date]

| # | Decision | Owner | Rationale (as stated) |
|---|---|---|---|

**Deferred (explicitly):** [item, revisit when]
**Raised but unresolved:** [item; no decision was made; flag, do not invent one]

## Anti-Patterns
- Promoting a strong opinion in the transcript to a "decision" nobody confirmed
- Assigning owners by guessing from who spoke most
```

**Why this works:**
- The description front-loads four realistic trigger phrasings, so routing matches how people actually ask.
- The output contract separates decided / deferred / unresolved; the third category is the one every meeting write-up fakes.
- The sharpest anti-pattern guards the real failure: inventing decisions from assertive statements.

### Example 2: reviewing a weak existing skill

**You say:**
> "Review this SKILL.md [pasted: description reads 'Helps with reports.', body is one paragraph of encouragement]."

**Claude produces (excerpt):**

**Findings, worst first:**
1. **Description cannot trigger:** "Helps with reports" matches nothing a user types. Rewritten with the task, three trigger phrasings, and the deliverable.
2. **No output contract:** the body never says what gets produced, so two runs produce two shapes. Added an Output Structure with named sections.
3. **Encouragement is not instruction:** "be thorough and clear" removed; replaced with the two checks a reviewer could actually fail it on.

### Example 2 verdict: rewrite, not patch; the frontmatter and body both fail the gate.

## Tips for best results

- Bring a real example of the input the skill will receive; the output contract is designed against it.
- Say where the skill will live; library conventions (naming, language, lint gates) shape the file.
- Ask for the anti-patterns section to name the likely failure, not generic vices.

## Related skills

- `skill-security-auditor` to audit a skill you did not write before installing it
- `prd-template` when the thing being specified is a product feature, not an agent behaviour
