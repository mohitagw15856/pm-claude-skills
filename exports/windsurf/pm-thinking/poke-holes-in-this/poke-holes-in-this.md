---
trigger: model_decision
description: "Get only the weaknesses in something you made — no praise, no encouragement padding, just the holes and how to fix them. Use when asked to poke holes in this, tell me what's wrong with this, critique this honestly, or don't be nice about it. Produces a focused list of the real problems in your draft, plan, argument, or code — ranked by severity, each with why it's a problem and a concrete fix — deliberately stripping the 'this is great!' padding that AI and polite humans add and you don't need."
---

# Poke Holes In This

When you want to improve something, praise is noise. This is pure critique mode: you paste what you made, and it returns only the problems — ranked, specific, and each with a fix. No "great start!", no compliment sandwich, no softening. It's the honest second read you asked for, doing the one job you asked it to do.

## What This Skill Produces

- **The holes** — the real weaknesses, gaps, errors, and soft spots, specifically
- **Severity ranking** — which problems are serious vs. minor, so you fix the right ones first
- **Why each is a problem** — the concrete consequence, not just "this is weak"
- **A fix for each** — a specific way to address it, not just a complaint
- **Nothing else** — no praise padding, no encouragement filler

## Required Inputs

Ask for these if not provided:
- **The thing** — the draft, plan, argument, design, or code (paste it)
- **What it's for** — purpose and audience (what counts as a hole depends on the goal)
- **How harsh** — brutal, or firm-but-kind
- **Anything off-limits** — parts that are fixed and not up for critique

## Framework: Only The Weaknesses

1. **Skip the praise.** The job is holes; strengths aren't the ask. Go straight to what's wrong.
2. **Be specific.** Point to the actual line, claim, or element — "the argument in paragraph 3 assumes X" beats "it's a bit weak."
3. **Rank by severity.** Separate the problems that matter from nitpicks, so the person fixes the important ones first.
4. **Say the consequence.** For each hole, name what it costs — a reader lost, an objection unanswered, a bug triggered.
5. **Attach a fix.** Every hole comes with a concrete way to close it — critique without a path is just discouragement.

## Output Format

### Poking holes in: [the thing] · for [purpose]

**🔴 Serious**
- [the hole] → why it matters: [consequence] → fix: [specific].

**🟡 Worth fixing**
- [the hole] → [consequence] → [fix].

**🟢 Minor / nitpicks**
- [quick ones].

**The one to fix first:** [highest-leverage hole].

## Quality Checks
- [ ] Contains only weaknesses — no praise padding
- [ ] Each hole is specific (points to the actual part)
- [ ] Problems are ranked by severity
- [ ] Each includes the consequence and a concrete fix
- [ ] Identifies the single highest-priority fix

## Anti-Patterns
- **A compliment sandwich** when only critique was asked for.
- **Vague criticism** with no specific location.
- **Nitpicks ranked equal** to serious problems.
- **Complaints with no fixes.**

## Example Trigger Phrases
- "Poke holes in my essay — don't be nice."
- "Tell me what's wrong with this plan, only the problems."
- "Critique this pitch honestly, no praise."
- "Where does my argument fall apart?"
- "Rip into this draft so I can fix it."
