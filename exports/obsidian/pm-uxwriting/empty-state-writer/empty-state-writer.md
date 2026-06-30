---
aliases: ["Empty State Writer"]
tags: [pm-skills, skill]
skill: empty-state-writer
description: "Write empty-state content that turns a blank screen into a next step. Use when asked to write an empty state, a zero-data / first-run state, a no-results state, or onboarding placeholder content. Produces empty-state copy — a clear headline, a helpful line, and a primary action — for each type (first-use, user-cleared, no-results, error/permission), so a blank screen guides instead of confuses."
---

# Empty State Writer Skill

An empty state is the most-missed onboarding moment: the user arrives and there's nothing there. Done well, it
explains the value, removes confusion, and offers the one action that fills the screen. This skill writes empty
states that teach and activate — not blank voids or generic "No data" labels.

## Working from a brief

Given "the empty state for a projects list", **write it anyway** — infer why the screen is empty, the value of
the feature, and the best first action, labelling assumptions. Cover the distinct empty-state *types* that apply.
Never hand back a question instead of copy.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The screen/feature** — what normally lives here and its value to the user.
- **Why it's empty** — first use, the user cleared/completed everything, a search/filter returned nothing, or no access.
- **The primary action** — what you want them to do (create, connect, invite, import, adjust filters).
- **Voice & constraints** — tone, and any space/illustration limits.

## Output Format

### Empty States: [screen]

Write the relevant types (skip those that don't apply):

- **First use (no data yet)** — headline (the value/outcome), a line on what to do and why it's worth it, and a **primary CTA** (+ optional secondary like "Learn more" / "Import").
- **User-cleared / all done** — a positive, reassuring message (inbox zero, all tasks complete) — celebrate, don't alarm.
- **No search/filter results** — say nothing matched, and offer a way forward (clear filters, broaden, create it).
- **Error / no permission** — what's wrong and the next step (retry, request access, contact admin) — calm and blame-free.

For each: **Headline · Supporting line · Action(s)**, plus a one-line note on the intended tone/illustration.

## Quality Checks

- [ ] First-use state explains the value and offers one clear primary action — not just "No items"
- [ ] The distinct types (first-use, cleared, no-results, error/permission) are handled differently and correctly
- [ ] "All done"/cleared states feel positive, not like something is broken
- [ ] No-results states offer a way forward, not a dead end
- [ ] Copy is concise and matches the product voice
- [ ] Each state has a headline, a helpful line, and an action

## Anti-Patterns

- [ ] Do not ship a bare "No data" / blank screen — it wastes the best activation moment
- [ ] Do not treat every empty state the same — "nothing yet" is opposite to "all caught up"
- [ ] Do not make a cleared/complete state look like an error
- [ ] Do not offer no action on a first-use state — give the one next step
- [ ] Do not over-explain — a headline, a line, and a button, not a paragraph

## Based On

UX writing & onboarding practice — empty states as activation moments, differentiated by type, with value framing and a single clear action.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
