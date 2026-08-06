---
aliases: ["Generate, Then Execute"]
tags: [pm-skills, skill]
skill: generate-then-execute
description: "Separate raw idea-generation from judgment so creativity isn't strangled by your inner critic — diverge with zero evaluation, then switch to hard critique. Use when asked to brainstorm properly, help me come up with ideas without shutting them down, I keep censoring my own ideas, or separate creating from editing. Produces a pure generation pass (quantity, no judging, no hedging, wild allowed), a clean break, then a separate ruthless critique pass that scores and prunes — because doing both at once produces neither."
---

# Generate, Then Execute

Trying to create and judge at the same time is why people stare at blank pages — every idea gets killed before it's finished. This enforces the split the best thinkers use: first a pure divergent pass where evaluation is *banned* and volume/weirdness is the goal, then a clean switch to a ruthless critic that scores, prunes, and keeps only what's strong. Two modes, never mixed.

## What This Skill Produces

- **A generation pass** — many ideas, fast, with no evaluation, ranking, or "but that won't work" allowed; wild and half-formed ideas welcome
- **A hard break** — an explicit switch of mode, so judgment doesn't leak backward into generation
- **A critique pass** — a separate, adversarial read that scores each idea, finds the traps, and prunes hard
- **The survivors** — the few ideas that made it through both, with why they held

## Required Inputs

Ask for these if not provided:
- **The prompt** — what you're generating ideas for
- **Roughly how many** — a target volume for the generation pass (more than feels comfortable)
- **The judging criteria** — what "good" means, applied only in the critique pass
- **Constraints** — real ones (for the critic), not imagined ones (which the generator ignores)

## Framework: Two Modes, Never At Once

1. **Generate with zero judgment.** In this pass, evaluation, sorting, and hedging are forbidden. Chase quantity and range; let bad and weird ideas exist — they seed good ones.
2. **Go past the comfortable stopping point.** The first ideas are obvious; keep generating well past where it feels done.
3. **Make a clean break.** Explicitly end generation before any judging — mixing them is the whole problem.
4. **Switch to ruthless critic.** Now evaluate hard: score against the real criteria, find the failure modes, and cut without sentiment.
5. **Keep only the strong.** Surface the survivors and *why* — and note if a "bad" generated idea sparked a good one.

## Output Format

### Prompt: [what we're ideating on]

**⚡ Generation (no judging)**
[Many ideas, listed fast — wild ones included, none evaluated.]

**— switching modes —**

**🔪 Critique (ruthless)**
| Idea | Score | The trap / why it fails or holds |
|---|---|---|

**Survivors:** [the few worth pursuing + why].

## Quality Checks
- [ ] The generation pass contains NO evaluation or hedging
- [ ] Volume/range is high; it pushes past the obvious ideas
- [ ] There's a clean, explicit break between the two modes
- [ ] The critique pass is genuinely hard, not gentle
- [ ] Survivors are justified against the real criteria

## Anti-Patterns
- **Judging while generating** — "here's an idea, though it probably won't work."
- **Too few ideas** in the generation pass.
- **A soft critique** that keeps everything.
- **Letting real constraints** shut down the generation pass (save them for the critic).

## Example Trigger Phrases
- "Help me brainstorm without shutting my own ideas down."
- "I keep editing while I create and get nothing done — separate the two."
- "Do a proper divergent brainstorm, then tear it apart."
- "Generate a ton of options for this, then judge them."
- "Give me quantity first, quality second."

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
