---
name: design-system-generate
description: "Generate a complete, accessibility-checked design system from scratch — colour ramps, type scale, spacing, elevation, and exports for CSS, Tailwind, design tokens, Figma, VS Code and PowerPoint. Use when asked to create a design system, pick a colour palette, build a starter theme, produce design tokens for a new product, or apply an existing brand colour to a full system. For auditing a system that already exists use design-system-audit; for extracting one from a live site use brand-guidelines."
---

# Design System Generate Skill

There is a skill for auditing a design system that exists and a skill for
extracting one from a brand that exists. This one is for the case in between:
**there is no system, and something ships on Thursday.**

The output is not a mood board. It is a set of files an engineer can commit,
with a contrast audit attached to them.

## Required Inputs

Ask for these if not provided:

- **A name or seed** — anything; the product name works. The same seed always
  produces the same system, so this is how a design becomes reproducible.
- **A brand colour**, if one is non-negotiable (`#E4002B` and so on). If there
  isn't one yet, say so and let it choose.
- **Light, dark, or both** — default to both.
- **A feeling**, loosely: editorial, brutalist, glassy, terminal, or playful.
  If the user describes it in their own words, map it to the nearest.
- **Where it has to land** — CSS variables, Tailwind, design tokens, Figma, a
  VS Code theme, a deck theme, Storybook. Default to CSS + tokens.

## Programmatic Helper

This skill is a thin wrapper around a deterministic generator. Do not invent hex
values — run it.

```bash
# Look at one first
npx --yes notugly <seed> --vibe editorial

# Lock a brand colour that is not up for discussion
npx --yes notugly <seed> --brand "#e4002b"

# Write the files
npx --yes notugly export <seed> --brand "#e4002b" --out ./design
npx --yes notugly slides <seed> --out ./deck        # .thmx for PowerPoint/Keynote
npx --yes notugly storybook <seed> --out ./stories

# Prove the claim rather than making it
npx --yes notugly audit <seed> --brand "#e4002b"
npx --yes notugly vision <seed>                     # colour-blind collisions
npx --yes notugly print <seed>                      # what survives CMYK
```

`export` writes ten files: CSS custom properties, a Tailwind config, W3C design
tokens, React and Svelte snippets, a demo page, a loadable Figma plugin, and a
VS Code theme. **Runtime cost is zero** — it is all static text, so there is no
package to install and nothing to break at 3am.

Zero dependencies and **no model call**, so it is free to run and gives the same
answer every time.

## The Method

1. **Start from the constraint, not the palette.** If there is a mandated brand
   colour, pass it to `--brand` and build everything else around it. Generating
   a lovely system and then discovering it cannot accommodate the company red is
   the most common way this work gets thrown away.

2. **Let the text colour be derived, never chosen.** The generator picks each
   text colour *from* its background so that no combination can fail. If you
   find yourself hand-picking a hex for body copy, you have left the system.

3. **Check it against the three things nobody checks.** Colour-blind collisions
   (`vision`), the CMYK gamut if anything will be printed (`print`), and the
   chart accents if it will ever be a deck (`slides` warns when two chart series
   are indistinguishable).

4. **Ship the audit with the tokens.** A design system without a contrast report
   is a claim. Paste the `audit` output into the handoff.

5. **Say what was decided and why.** Record the seed and the flags. `npx notugly
   <seed> --vibe <vibe>` reproduces the whole thing exactly, which means the
   design is a one-line command rather than a folder somebody has to keep.

## Output Structure

---

# Design System: [Product Name]

**Seed:** `[seed]` · **Vibe:** [vibe] · **Brand locked:** [hex or "no"]
**Reproduce:** `npx notugly [seed] --vibe [vibe] [--brand #hex]`

## Palette

| Role | Colour | Hex | Name | On background | Verdict |
|---|---|---|---|---|---|
| Background | ▪ | `#ffffff` | Paper | — | — |
| Body text | ▪ | `#020404` | Soot | 20.55:1 | AAA |
| Brand | ▪ | `#004054` | Navy | 11.28:1 | AAA |

*Every ratio above is computed, not estimated.*

## Type

**Headings:** [family] · **Body:** [family] · **Scale:** [ratio] ([name])
[The size ladder, in px.]

## Spacing, radius, elevation

[The 4px grid, the radius set, and the five elevation levels.]

## What was checked

- [ ] Every text pairing clears WCAG AA — *weakest: X:1*
- [ ] No two colours merge under any simulated colour vision deficiency
- [ ] Every colour is inside the CMYK gamut *(if printing)*
- [ ] All six chart accents are distinguishable *(if there will be decks)*

## Files produced

[The list from `export`, with byte counts, and the runtime cost line.]

## Open decisions for a human

[Anything the generator cannot decide: illustration style, photography
direction, motion beyond the presets, iconography.]

---

## Quality Checks

- **Did you run it, or describe it?** Every hex in the output must come from the
  tool. A plausible palette written by hand is exactly what this skill exists to
  replace.
- **Is the seed recorded?** Without it the design is not reproducible and the
  next person starts over.
- **Did the brand colour survive?** If the user gave one, `--brand` must be in
  the reproduce command.
- **Is the audit attached?** Not "it meets AA" — the actual ratios.
- **Are the open decisions listed?** A generator cannot choose an illustration
  style. Pretending otherwise is how these documents lose credibility.

## Anti-Patterns

- **Inventing hex values.** The whole point is that these are computed.
- **Claiming AA without a number.** "Accessible" is a marketing word; "4.52:1"
  is a fact.
- **Generating a system when one already exists.** If the product has a design
  system, use [[design-system-audit]]. If it has a brand but no system, use
  [[brand-guidelines]] to extract first, then pass the result in via `--brand`.
- **Shipping the light theme only.** Dark mode is where elevation and contrast
  break, and it is cheaper to check now than to retrofit.
- **Treating the vibe as the deliverable.** The vibe is a starting point. The
  deliverable is the token file and the audit.

## Example Trigger Phrases

- "We need a design system by Thursday"
- "Pick a colour palette for [product]"
- "Build a starter theme around our brand red"
- "Generate design tokens for the new app"
- "Give me a Tailwind config that passes accessibility"
- "Make a deck theme that matches our product"
