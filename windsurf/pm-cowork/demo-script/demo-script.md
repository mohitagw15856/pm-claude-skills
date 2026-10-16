---
trigger: model_decision
description: "Script a product demo that lands — the audience's-workflow storyline (their day, not your feature list), the golden path rehearsed with fallbacks, the wow moment placed early, and the demo-death contingencies (the backup video, the reset state, the narration bridge). Use when asked script our product demo, demo this to a customer/exec, our demos meander through features, or the demo broke live last time. Produces the demo storyline, the click-path script with fallbacks, the wow placement, and the contingency kit."
---

# Demo Script Skill

Feature-tour demos die politely: "here's the dashboard, here's settings, here's our AI" — a museum walk through someone else's house. The demo that lands is a *story about the audience's day*: their actual workflow, with its familiar pain, walked through the product — pain first (recruit the [deck-narrative-arc](../deck-narrative-arc/SKILL.md) tension), the wow moment inside the first three minutes (attention is front-loaded; demos that save the best for last perform it to phones), and every click scripted on a rehearsed golden path with the contingency kit standing by — because live demos break, and the difference between a stumble and a disaster is whether the recovery was pre-built.

## What This Skill Produces

- **The storyline** — the audience-persona's task, start to done, with the pain named before the product answers it
- **The click-path script** — every step: the click, the talk-track line, the thing to point at
- **The wow placement** — the moment chosen for *this* audience, landed by minute three
- **The contingency kit** — the reset state, the backup recording, the narration bridges for every known fragility

## Required Inputs

Ask for these if not provided:
- **The audience and their workflow** — who's watching (the user? their boss? an exec who'll never touch it?) and the task they actually do; the demo walks *their* Tuesday, and exec audiences get outcomes-dense, click-light versions
- **The wow candidate** — the moment that reliably drops jaws for this audience type (the migration that takes seconds, the answer that used to take a day) — chosen deliberately, not discovered mid-demo
- **The product's fragilities, honestly** — what's slow, what's flaky, what needs data seeded; the kit is built from the real list
- **The demo environment** — live product, staging, or sandbox; and whether the data in it tells the story (demo data is a script character — "Acme Corp, 47 orders" beats "Test test 123")

## Framework: The Script Rules

1. **Their workflow is the plot:** the demo opens in the audience's world — "it's Monday, the report's due, and the data's in four systems" — and every feature appears *as the answer to a step in that story*. Features that don't serve the storyline don't appear (the counterintuitive discipline: the best demos show less).
2. **Pain before relief, wow by minute three:** thirty seconds on the familiar pain (nods are the goal), then the product enters — and the chosen wow lands early, because the first three minutes get 100% attention and it buys the next fifteen. Build-up demos are performing their finale to an audience that left.
3. **Script the clicks and the words together:** each step is click + line + pointer ("click Import — 'and this is the part that used to take your team a day' — watch the counter"). The talk-track carries the meaning; silent clicking makes the audience do the interpreting, and they interpret slower than you click.
4. **Demo data is cast, not filler:** named, realistic, sized to impress honestly ("your actual order volume") — and *reset-able in one step*, because the second demo of the day inherits the first one's mess without a reset ritual.
5. **The contingency kit is the professional's tell:** the known fragilities each get a bridge ("while this loads — the thing to know is…" — narration absorbs up to ~10 seconds of anything), the backup recording sits one tab away (switched to with composure: "let me show you this on the recording — same flow"), and the reset state is verified *before* the meeting, not after the break. Demos break; audiences forgive breaks handled calmly and remember panics forever.

## Output Format

# Demo Script: [product] → [audience persona] — [T] min

## The Storyline
[Their task, start → done · the pain, named · where each shown capability answers a step]

## The Click Path
| # | Click/action | Talk-track line | Point at |
|---|---|---|---|
[The wow marked ★ at its minute · the skippable-if-short section marked]

## The Contingency Kit
[Fragility → bridge line · the backup recording's tab · the one-step reset · the pre-meeting verification checklist]

## Quality Checks

- [ ] The demo opens in the audience's workflow, not the product's navigation
- [ ] The wow lands by minute three
- [ ] Every click has its talk-track line — no silent stretches
- [ ] Demo data is realistic, named, and one-step resettable
- [ ] Every known fragility has a rehearsed bridge and the backup is loaded

## Anti-Patterns

- [ ] Do not tour features — the storyline earns each capability its scene or it stays home
- [ ] Do not save the wow for the finale — front-loaded attention is the demo's only guaranteed asset
- [ ] Do not demo on unseeded data — "Test test 123" breaks the story's spell mid-sentence
- [ ] Do not improvise around breakage — the bridge lines exist because live composure is a rehearsal product
- [ ] Do not show the exec the click-depth — altitude-match the version to the audience or lose them at Settings
