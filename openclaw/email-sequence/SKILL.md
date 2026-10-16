---
name: email-sequence
description: "Write a multi-email nurture/onboarding/launch sequence with a goal per email. Use when asked to write an email sequence, a welcome/onboarding series, a nurture drip, a launch sequence, or a re-engagement series. Produces the sequence map (trigger, timing, goal per email) plus the full copy for each email — subject, body, and one CTA — designed to move the reader one step at a time."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/email-sequence.html
metadata:
  {
    "openclaw": { "emoji": "✍️" }
  }
---

# Email Sequence Skill

A good sequence isn't a newsletter on a timer — each email has one job and earns the next open. This
skill maps the sequence (what triggers it, the cadence, the single goal of each email) and writes the
copy, so a welcome series activates, a nurture drip builds trust toward a sale, and a launch sequence
converts — without burning the list. (For the lifecycle *strategy/segmentation*, pair with
[`lifecycle-crm-plan`](../lifecycle-crm-plan/SKILL.md); this writes the emails.)

## Required Inputs

Ask for these only if they aren't already provided:

- **Sequence type & goal** — welcome/onboarding (→ activation), nurture (→ a sale), launch (→ buy by date), re-engagement (→ return). What's the end action?
- **Audience & where they entered** — what they just did (signed up, downloaded, went cold) sets the opening.
- **The offer/product** and the core value to reinforce.
- **Length & cadence** — how many emails, over what window (or let the skill recommend).
- **Proof / assets** — testimonials, case studies, resources to deploy along the way.

## Output Format

### Email Sequence: [type] — goal: [end action]

**1. Sequence map** — the spine:

| # | Trigger / timing | Goal of this email | Angle |
|---|---|---|---|
| 1 | t+0 (on signup) | welcome + set the one expectation | warm |
| 2 | t+2d | deliver a quick win | value |
| 3 | t+4d | handle the top objection | proof |
| 4 | t+6d | make the ask | CTA |

**2. The emails** — for each, the full copy: **subject** (+ a preview-text line), a short **body** with one idea, and **one CTA**. Each email earns the next: end with a hook forward where it helps.

**3. Rules** — the exit condition (e.g. stop the nurture once they convert), a frequency/suppression note, and the one metric per email to judge it by (not just opens).

## Quality Checks

- [ ] Each email has a single, explicit goal and one CTA — not a roundup
- [ ] The cadence and triggers are behaviour-aware (and stop when the goal is met)
- [ ] Early emails give value before asking; the ask is earned
- [ ] Subjects are specific; preview text complements (doesn't repeat) the subject
- [ ] An exit/suppression rule prevents emailing people who already converted

## Anti-Patterns

- [ ] Do not write a newsletter — each email needs one job, not five updates
- [ ] Do not ask in every email — give value first; pushing too early kills the sequence
- [ ] Do not forget the exit condition — emailing converted users "buy now" erodes trust
- [ ] Do not stuff multiple CTAs — one action per email or none gets taken
- [ ] Do not judge by opens alone — tie each email to the step it's meant to drive

## Based On

Lifecycle email practice — one-goal-per-email sequences, value-before-ask, behaviour-triggered cadence with exits.

## Example Trigger Phrases

- "Write an email sequence."
- "Write a welcome series for new users."
- "Write a nurture drip."
- "Write a re-engagement series."
