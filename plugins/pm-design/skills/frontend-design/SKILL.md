---
name: frontend-design
description: "Produce frontend UI that actually looks designed — a working spacing/type system, deliberate color use, real states, and restraint — instead of the generic AI-generated interface. Use when asked to build or restyle a UI, landing page, dashboard, or component, when output 'works but looks like a prototype', or to establish the visual system for a new app. Produces working HTML/CSS (or framework components) built on an explicit token system, with hover/focus/empty/loading states included. For critiquing an existing design use design-critique; for auditing a design system use design-system-audit."
---

# Frontend Design Skill

AI-generated UI has a recognisable smell: default blues, five different paddings, everything the same visual weight, no states. This skill produces interfaces that look *decided* — by making the decisions explicit as a token system, then spending contrast deliberately instead of everywhere.

## What This Skill Produces

- **Working UI code** (single-file HTML/CSS or framework components) built on an explicit token block
- The **token system**: type scale, spacing scale, color roles, radius/shadow levels — small and consistent
- The **states**: hover, focus-visible, active, disabled, empty, loading, error — designed, not defaulted

## Required Inputs

Ask for (if not already provided):
- **What's being built** and its emotional register (dense pro tool? calm consumer? playful?)
- **Brand constraints** if any (colors, fonts, an existing product to match) — else the skill picks a deliberate palette and says so
- **The framework target** (vanilla/React/Vue/Tailwind) — vanilla single-file is the default demo form

## The System (build this first, then the UI)

1. **Type scale, one ratio.** Pick a base (16px) and a ratio (1.25 for product UI, 1.333 for marketing); derive 5-6 sizes max. Two font families ceiling (one is usually right); weight does hierarchy work before size does.
2. **Spacing on a single scale.** 4-or-8px base: `4/8/12/16/24/32/48/64`. Every margin/padding/gap comes FROM the scale — the #1 tell of undesigned UI is seventeen distinct paddings. Related things sit closer than unrelated things (proximity is free information design).
3. **Color as roles, not decoration.** Define roles: `bg / surface / border / text / text-muted / accent / danger / success`. ONE accent, spent where attention belongs — the primary action, the active state, the number that matters. The 90% of a designed UI is neutrals; if everything is colorful, nothing is. Check text contrast (4.5:1 body, 3:1 large) as you pick, not after.
4. **Depth and shape, one voice.** 2-3 shadow levels, 2 radius values — used consistently by element class (inputs share a radius; cards share a shadow). Mixed radii on sibling elements reads as accident, because it is.
5. **Motion with restraint.** 120-200ms ease-out on hover/expand; `prefers-reduced-motion` respected; nothing bounces in a pro tool.

## The Craft Moves (what separates designed from default)

- **Hierarchy by subtraction** — make everything quieter, then raise ONLY what matters: the page should answer "look here first" without arrows
- **Real content shapes** — design with a long name, a zero, a 47-item list; lorem-ipsum layouts break on contact with reality
- **The states are the interface** — empty states teach ("no reports yet — create your first"), loading states hold layout (skeletons, not spinners-in-a-void), focus-visible is styled (keyboard users see where they are), errors say what to DO
- **Alignment is invisible until broken** — one grid, edges that line up, numbers right-aligned in tables
- **Density matches the job** — dashboards earn compactness; marketing earns whitespace; mixing registers is the "prototype feel"

## Output Format

1. **The token block first** (CSS custom properties / theme object) with one line on each decision ("accent used 3 places only")
2. **The working code**, componentised sensibly, states included inline
3. **A design-decisions note** (5-8 lines): register chosen, where the accent is spent, what was deliberately left quiet

## Quality Checks

- [ ] Every spacing value in the code exists on the declared scale — zero ad-hoc paddings
- [ ] One accent color, findable in ≤3 uses; body text contrast ≥4.5:1
- [ ] Hover, focus-visible, disabled, empty, and loading states all present and styled
- [ ] The "look here first" test passes — hierarchy is felt without instruction
- [ ] Tested mentally against real content: the long name, the zero state, the overflow

## Anti-Patterns

- [ ] Do not decorate before systematising — tokens first, UI second, or consistency is luck
- [ ] Do not spend the accent everywhere — a UI where everything is highlighted has no hierarchy, just noise
- [ ] Do not ship default focus rings removed with nothing in their place — that's not minimal, it's broken
- [ ] Do not design only the happy state — empty/loading/error are where users actually judge the product
- [ ] Do not mix density registers — a marketing hero above a data grid needs a deliberate seam, not a collision
