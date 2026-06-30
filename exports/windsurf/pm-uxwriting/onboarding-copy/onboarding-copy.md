---
trigger: model_decision
description: "Write in-product onboarding copy that gets users to value fast. Use when asked to write onboarding copy, a welcome flow, product tour/tooltips, setup steps, or activation messaging. Produces the copy for an onboarding flow — welcome, the guided steps/tooltips toward the first win, progress and empty-to-active nudges, and a success moment — focused on the activation outcome, not a feature tour."
---

# Onboarding Copy Skill

The best onboarding doesn't tour features — it walks the user to their **first real win** (the "aha" where the
product's value clicks). This skill writes the copy for that path: a welcome that sets the outcome, tooltips
that guide the few steps that matter, and a success moment that confirms it worked — concise, encouraging, and
skippable.

## Working from a brief

Given "onboarding for a habit-tracking app", **write the flow copy anyway** — infer the activation moment (the
first win), the minimal steps to reach it, and the voice, labelling assumptions. Focus the copy on the outcome,
not a feature list. Never hand back a question instead of copy.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The product & first win** — what it does, and the "aha" moment that means a user is activated.
- **The path to it** — the minimal steps a new user takes to reach that first win.
- **Format** — modals, tooltips/coachmarks, a checklist, inline hints, or empty-state prompts.
- **Voice & constraints** — tone, length limits, and whether steps are skippable (they should be).

## Output Format

### Onboarding Copy: [product]

- **Welcome** — a short opener that states the **outcome** ("Let's set up your first X") — value, not features.
- **Guided steps** — for each step toward the first win: a tooltip/coachmark with a tight instruction, *why it matters* (one phrase), and the action label. Keep it to the few steps that matter; let users skip.
- **Progress & nudges** — checklist item labels, progress encouragement, and empty-state prompts that pull users to the next action.
- **First-win moment** — the success message when they hit activation — celebrate it specifically, then point to the natural next step.
- **Re-engagement** — a line or two for users who dropped off mid-setup (gentle, value-reminding).

Keep every piece concise, encouraging, and outcome-focused; note where copy must fit a tight space.

## Quality Checks

- [ ] The flow drives toward one clear activation outcome, not a feature tour
- [ ] Each step is concise and says why it matters, not just what to click
- [ ] Steps are skippable / non-blocking — onboarding guides, it doesn't trap
- [ ] There's an explicit first-win success moment that's specific, not generic
- [ ] Tone is encouraging and matches the product voice
- [ ] Empty-state and drop-off nudges move users to the next action

## Anti-Patterns

- [ ] Do not tour every feature — guide to the first win; the rest can be discovered
- [ ] Do not write blocking, un-skippable walls of modals — let users get to the product
- [ ] Do not explain what's obvious ("This is the menu") — spend words where there's real friction
- [ ] Do not forget the success moment — activation should feel rewarded
- [ ] Do not be generically chirpy — encouragement should be specific to what they just did

## Based On

Product onboarding & activation practice — outcome-led welcome, guided path to the first win, progress nudges, and a celebrated activation moment.
