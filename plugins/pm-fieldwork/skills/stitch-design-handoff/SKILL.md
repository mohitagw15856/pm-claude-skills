---
name: stitch-design-handoff
description: "Turn a PRD or feature brief into prompts and a screen plan for an AI design generator such as Google Stitch, so the first generated screens match the product intent. Use when asked to write a Stitch prompt, turn this PRD into screens, prompt an AI design tool, design this flow with AI, or my generated designs look generic. Produces a screen inventory, one prompt per screen with content, states and constraints, a shared style brief, and a review checklist for what comes back."
---

# Stitch Design Handoff Skill

AI design generators return generic screens when they are given a feature name and return useful ones when they are given content, states and constraints. The gap between a PRD and a good generation prompt is mostly unwritten decisions: which screens exist, what real text sits on them, what happens when the list is empty. This skill makes those decisions explicit and writes them as prompts. It works for Google Stitch and for other text-to-interface tools. For a brief aimed at a human designer in Figma, use `figma-design-brief`.

## What This Skill Produces

- **A screen inventory**: every screen and its states, derived from the user flow
- **One prompt per screen**, with purpose, real content, components, states and constraints
- **A shared style brief** to paste first, so the screens belong to one product
- **A review checklist** for the generated output, including what generators commonly get wrong
- **An open-decisions list**: product questions the PRD left unanswered, which no prompt can fix

## Required Inputs

Ask for these if not provided:
- **The PRD or brief**, or at least the user, the job and the main flow
- **Platform and size**: mobile, tablet or desktop web
- **Existing brand constraints**: colours, type, component library, or a screenshot of the current product
- **Real content**: actual labels, sample data, error messages. If none exists, write plausible sample content and label it as sample
- **The tool** being used, since input limits and features differ. If the user is unsure what the tool supports, tell them to check its current documentation and do not assert features from memory

## Framework: From Brief to Prompts

1. **Walk the flow.** List each step the user takes and the screen that serves it. Add the screens PRDs forget: first run, empty, loading, error, success, permission request.
2. **Decide the content.** For every screen, write the headline, the primary action label and the data shown. A generator given "a dashboard" invents filler; given three named metrics it draws those.
3. **Name the states.** For each screen, list which states need their own generation and which are variants.
4. **Write the style brief once.** Platform, density, tone, colour roles (not just hex values), type scale, corner and spacing rhythm, and one reference the user supplied. Keep it short enough to prefix every prompt.
5. **Write each prompt in a fixed order.** Purpose, user and moment, layout from top to bottom, exact content, states, constraints (accessibility, one primary action, touch target size).
6. **Plan the iteration.** Generate the highest-risk screen first. Change one thing per regeneration so the cause of an improvement is known.
7. **Review against intent.** Check the output against the PRD, not against whether it looks finished.

## Output Format

# Design Handoff: [feature] for [tool]

## Screen Inventory
| # | Screen | Purpose | States to generate |
|---|--------|---------|--------------------|

## Style Brief (paste before each prompt)
```
[platform · density · tone · colour roles · type · spacing · reference]
```

## Prompts
### Screen 1: [name]
```
Purpose:
User and moment:
Layout, top to bottom:
Exact content:
States:
Constraints:
```

## Review Checklist for What Comes Back
- [ ] One clear primary action per screen
- [ ] Real content appears as written; no invented metrics or filler text
- [ ] Empty, loading and error states exist
- [ ] Text contrast and touch target sizes hold
- [ ] Screens share spacing, type and components

## Open Decisions
[Questions for the product owner that the PRD does not answer]

## Quality Checks

- [ ] Every step of the flow maps to a screen, and forgotten states are listed
- [ ] Each prompt contains exact content, not a description of content
- [ ] Sample content is labelled as sample
- [ ] The style brief is short and reused, not rewritten per screen
- [ ] No tool feature is asserted without the user confirming it

## Anti-Patterns

- [ ] Do not prompt with a feature name alone
- [ ] Do not ask for the whole app in one prompt
- [ ] Do not let the generator invent the product's numbers or copy
- [ ] Do not treat a polished render as a validated design
- [ ] Do not regenerate with several changes at once

## Example Trigger Phrases

- "Turn this PRD into prompts for Stitch."
- "My AI-generated screens look generic. Fix my prompt."
- "Plan the screens for this flow and write the design prompts."
- "Write a style brief I can reuse across screen prompts."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/stitch-design-handoff.html
