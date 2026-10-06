---
name: support-macro
description: "Write reusable support macros / canned responses that sound human, not robotic. Use when asked to write a support macro, a canned response, a saved reply, or a template for a common customer ticket. Produces a macro — an empathetic opener, the clear answer/steps, placeholders for personalisation, and a warm close — plus variants (resolved / need-more-info / escalating), tuned to keep it human."
---

# Support Macro Skill

Macros make support fast — but bad ones make it feel like a wall of copy-paste, which customers hate.
A good macro is a *scaffold*: empathetic opener, the actual answer in clear steps, obvious personalisation
slots, and a human close — fast for the agent, warm for the customer. This skill writes that, with the
variants a single situation usually needs.

## Required Inputs

Ask for these only if they aren't already provided:

- **The scenario** — the common ticket this macro answers (password reset, refund request, bug report, how-to).
- **The resolution** — the actual answer or steps.
- **Brand voice** — formal, friendly, playful (defaults to warm-professional).
- **Constraints** — anything that must be said (policy, legal, security) or links to include.

## Output Format

### Macro: [scenario]

**Primary macro:**
> **Opener** — acknowledge the person + their issue specifically ("Sorry the export failed — let's get that sorted."). Not "Dear valued customer."
> **Answer** — the resolution in clear, numbered steps where it's a process. One idea per line.
> **Personalisation slots** — clearly marked `[first name]`, `[order #]`, `[specific detail]` the agent fills.
> **Close** — a warm, human sign-off + an open door ("If that doesn't do it, just reply here and I'll dig in.").

**Variants** (same scenario, different outcomes):
- **Resolved** — the answer above, confident it's fixed.
- **Need more info** — what you need from them and why, framed helpfully (not interrogation).
- **Escalating / known issue** — honest acknowledgement, what happens next, and a realistic timeframe.

**Notes:** keep placeholders obvious so agents always personalise; flag the one line that must stay (policy/legal); keep it scannable on mobile.

## Quality Checks

- [ ] Opens by acknowledging the person and their specific issue
- [ ] The answer is clear and step-by-step where it's a process
- [ ] Personalisation slots are clearly marked so agents fill them every time
- [ ] Includes the variants the scenario needs (resolved / more-info / escalating)
- [ ] Sounds like a person — contractions, warmth — not a corporate template

## Anti-Patterns

- [ ] Do not write "Dear valued customer" / robotic openers — acknowledge the actual person and problem
- [ ] Do not make it un-personalisable — a macro with no slots gets sent cold and feels like spam
- [ ] Do not bury the answer in apology — empathise briefly, then solve
- [ ] Do not over-promise on escalations — give an honest, realistic timeframe
- [ ] Do not write one macro for a scenario with multiple outcomes — give the resolved/more-info/escalating variants

## Based On

Support-experience practice — empathetic, scannable, personalised canned responses (Zendesk/Intercom macro conventions).

## Example Trigger Phrases

- "Write a support macro."
- "Write a canned response for refund requests."
- "Write a saved reply that doesn't sound robotic."
- "Template our answer to this common ticket."
