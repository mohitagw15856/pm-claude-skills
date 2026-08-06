---
name: ai-context-primer
description: "Build the context an AI needs to do a task well — the background, constraints, examples, and format it can't guess — so you get a great result on the first try instead of a generic one you have to keep correcting. Use when asked why does AI give me generic answers, how do I give AI better context, my AI results are mediocre, or how do I get it right the first time. Produces the specific context this task needs (who/what/constraints/examples/format), a reusable primer you can paste ahead of the request, the difference between a starved prompt and a well-briefed one, and what to leave out — turning vague back-and-forth into a strong first result."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ai-context-primer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# AI-Context Primer

Generic AI answers are almost always a context problem, not a model problem — you asked for something the AI had no way to tailor, so it gave you the average of everything. The fix is priming: giving it the background, constraints, examples, and format it can't guess before you make the request. This builds that primer for your task, so the first result is close, not a starting point you spend five rounds correcting.

## What This Skill Produces

- **The context this task actually needs** — the who (audience, you), the what (goal, background), the constraints (must/must-not), the examples (what good looks like), and the format (structure, length, tone)
- **A reusable primer block** — a clean paste-ahead of your request that briefs the AI properly, not a one-off
- **The gap it fills** — what the AI was missing that made earlier answers generic, made explicit
- **What to leave out** — the noise that dilutes rather than helps, so the primer stays sharp
- **Starved vs briefed, shown** — a quick before/after so you feel the difference context makes
- **A primer habit** — how to make briefing-before-asking your default for tasks that matter

## Required Inputs

Ask for these if not provided:
- **The task** — what you want the AI to do
- **The background it can't guess** — your situation, audience, goal, prior context
- **What good looks like** — an example, a reference, or the standard you're holding it to
- **Constraints** — must-haves, must-avoids, length, tone, format
- **What went generic before** — if you've tried, what was off (points at the missing context)

## Framework: Brief It Like It Knows Nothing About You

1. **Name what the AI can't know.** It has no access to your situation, audience, standards, or prior work — list what it'd need to tailor the answer, because that's exactly what's missing.
2. **Assemble the five pieces.** Who (audience + you), what (goal + background), constraints (must/must-not), examples (what good looks like), format (structure/length/tone) — the reliable spine of good context.
3. **Show, don't just tell.** An example of the output you want, or a reference you like, teaches the AI more than a paragraph of description — include one where the task is fuzzy.
4. **Cut the noise.** More context isn't better — irrelevant detail dilutes the signal. Keep what changes the output, drop what doesn't.
5. **Make it reusable.** Package it as a primer block you can paste ahead of similar requests, not something you rebuild each time.

## Output Format

### Context primer: [the task]

**Who:** [audience + relevant about you].
**What:** [goal + the background it can't guess].
**Constraints:** [must-haves · must-avoids · length/tone].
**Example of good:** [a sample or reference — where the task is fuzzy].
**Format:** [structure / length / tone you want].

**Paste-ahead primer:**
> [the assembled block, ready to put before your request]

**Why earlier answers were generic:** [the missing piece this fills].
**Leave out:** [the noise that would dilute it].

## Quality Checks
- [ ] Identifies what the AI genuinely can't know for this task
- [ ] Assembles who / what / constraints / example / format
- [ ] Includes an example of "good" where the task is fuzzy
- [ ] Cuts irrelevant detail that dilutes the signal
- [ ] Packages a reusable primer, not a one-off

## Anti-Patterns
- **Blaming the model** for what's really missing context.
- **A wall of irrelevant background** that dilutes the ask.
- **Telling without showing** — no example of what good looks like.
- **Rebuilding context** from scratch every time.
- **Omitting the format** and being surprised by the shape.

## Example Trigger Phrases
- "Why does AI keep giving me generic, mediocre answers?"
- "How do I give AI enough context to get it right the first time?"
- "My AI results are bland — what am I not telling it?"
- "Help me brief the AI properly for this task."
- "Build me a context block I can paste before my requests."
