---
name: inversion-thinking
description: "Solve a problem backwards — ask how to guarantee the worst outcome, then avoid all of it. Use when asked to help me not fail at, what could go wrong with, how do I avoid messing up, or think about this in reverse. Produces the inverted question (how to guarantee failure), the specific ways you'd cause the disaster, and then the plan that is simply the avoidance of each — often clearer and more actionable than trying to plan success directly, because failure modes are more concrete than success factors."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/inversion-thinking.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Inversion Thinking

It's often easier to see how something fails than how it succeeds. So instead of "how do I make this work?", this asks "how would I *guarantee* it fails?" — then hands you a plan that's just the systematic avoidance of every failure you listed. The disaster is specific; success is vague. Inverting turns a fuzzy goal into a concrete checklist of what not to do.

## What This Skill Produces

- **The inverted question** — "how would I guarantee the worst outcome here?"
- **The failure recipe** — the specific actions and conditions that would cause the disaster
- **The avoidance plan** — each failure mode flipped into a concrete "don't / do instead"
- **The highest-leverage avoidances** — the few failure modes that matter most to prevent

## Required Inputs

Ask for these if not provided:
- **The goal or project** — what you're trying to succeed at
- **What "failure" looks like** — the outcome you want to avoid
- **Where you are** — early planning, or fixing something wobbling
- **Known risks** — anything already worrying you

## Framework: Guarantee The Disaster, Then Don't

1. **Flip the question.** Replace "how do I succeed?" with "how would I make absolutely sure this fails?" — the brain answers the negative more concretely.
2. **Write the failure recipe in detail.** List the specific behaviors, decisions, and conditions that would reliably cause the bad outcome. Be vivid and honest.
3. **Invert each into a rule.** Every failure mode becomes a "don't do X / do Y instead" — that's your plan, and it's already actionable.
4. **Rank by leverage.** Some failure modes are catastrophic and likely; prioritize avoiding those over minor ones.
5. **Notice the ones you're already doing.** Inversion often reveals a failure you're currently walking into — flag it.

## Output Format

### Goal: [what success means] — inverted

**To guarantee failure, I would:** [the specific failure recipe].

**So the plan is to avoid each**
| Failure mode | Avoid it by |
|---|---|

**Highest-leverage avoidances:** [the few that matter most].
**Already doing?** [any failure mode you're currently walking into].

## Quality Checks
- [ ] The question is genuinely inverted (how to fail, not how to succeed)
- [ ] The failure recipe is specific and honest, not vague
- [ ] Each failure mode is flipped into a concrete action
- [ ] The highest-leverage avoidances are identified
- [ ] It flags any failure the person is currently causing

## Anti-Patterns
- **Just listing success factors** — that's not inversion.
- **Vague failures** ("don't be lazy") instead of specific ones.
- **Flipping to platitudes** instead of concrete actions.
- **Treating all failure modes as equal** priority.

## Example Trigger Phrases
- "Help me make sure this project doesn't fail."
- "What could go wrong with my launch, and how do I avoid it?"
- "Think about my fitness goal in reverse — how would I guarantee I quit?"
- "How do I avoid screwing up this presentation?"
- "Invert this problem for me."
