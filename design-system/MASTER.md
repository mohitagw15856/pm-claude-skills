# Design system: master file

The values behind [`DESIGN.md`](../DESIGN.md). Read this before changing any page in `web/`. The single source of the values is `web/styles.css`; this file documents them, and [`scripts/check-design-tokens.mjs`](../scripts/check-design-tokens.mjs) fails if the two disagree.

Last measured: 2026-09-28.

## Colour, radius and shadow tokens

Defined in `:root` (the dark theme, which is the default) and overridden for the light theme in `html[data-theme="light"]`. "same" means the light theme does not override the token.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0d0f14` | `#f7f6f3` | Page background |
| `--panel` | `#161a21` | `#ffffff` | Cards, panels, the top bar |
| `--panel-2` | `#1d222b` | `#f1efe9` | Inputs and nested surfaces |
| `--border` | `#2a313c` | `#e4e0d8` | All borders and dividers |
| `--text` | `#e7ebf0` | `#1b2027` | Body text and headings |
| `--muted` | `#95a0b0` | `#667085` | Secondary text, captions, placeholders |
| `--accent` | `#d97757` | same | The one accent: the primary action, focus rings, the active state |
| `--accent-2` | `#e89b82` | same | Links and accent text on dark surfaces |
| `--accent-grad` | `linear-gradient(135deg, #e0855f 0%, #d9605a 100%)` | same | Fill of the primary button only |
| `--radius` | `14px` | same | Cards and panels |
| `--shadow` | `0 6px 24px rgba(0,0,0,.35)` | same | Raised surfaces |
| `--shadow-accent` | `0 8px 30px rgba(217,119,87,.22)` | same | The primary button |

## Status colours

Not tokens yet. They are raw values in the stylesheet and are listed here so that nobody invents a fourth set.

| Status | Text colour | Where |
|---|---|---|
| Production-ready, evaluated | `#6ee7b7` | `.tier-production`, `.eval-filter` |
| Stable | `#93c5fd` | `.tier-stable` |
| Experimental | `#fcd34d` | `.tier-experimental` |

Each uses the same recipe: the text colour above, a background of the same hue at 12% and a border at 35%.

## Type

- **Family:** the system stack, `-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif`.
- **Weights in use:** 400 (body), 600 (labels, buttons, most emphasis), 700 (headings), 800 (the largest display text only).

**Target scale.** New work uses these eight sizes and nothing between them:

| Step | Size | Use |
|---|---|---|
| xs | 11px | Badges, tags |
| sm | 12px | Captions, chips |
| base-sm | 13px | Dense UI, form controls |
| base | 14px | Body text |
| md | 16px | Lead text, card titles |
| lg | 20px | Section headings |
| xl | 26px | Page headings |
| display | 34px | The one headline on a page |

The stylesheet currently uses 20 sizes, from 10px to 34px, several half a pixel apart. They are left as they are until someone can check each change in a browser.

## Spacing and shape

**Target spacing scale:** 4, 8, 12, 16, 24, 32. The stylesheet currently uses 26 values; the most common are 10px, 8px, 12px and 14px.

**Target radii:**

| Radius | Use |
|---|---|
| 8px | Buttons, inputs, small controls |
| `--radius` (14px) | Cards and panels |
| 999px | Chips, tags and pills only |

The stylesheet currently uses 14 radii, and `--radius` is referenced once.

**Breakpoints:** 760px and 620px. Pages are checked at 390px and 1440px wide.

## Motion

| Element | Trigger | Duration | Easing | Reason |
|---|---|---|---|---|
| Links, buttons, chips, cards | Hover, focus | 120ms to 150ms | default | Confirms the pointer is on something that responds |
| Command results | Opening | 250ms | ease | Shows where the results came from |
| Skill cards, first twelve only | Page load | 380ms, staggered 30ms | ease | Draws the eye down the grid once. Cards after the twelfth do not animate |
| Run flow pipe and output | While a skill is running | 1s to 1.2s, looping | linear, ease-in-out | Shows that work is in progress |
| API key field | The key is needed | 450ms, three times | ease | Points to the one field that blocks the run |
| Text cursor | While output streams | 1s, looping | steps | Shows the stream is live |

Rules for new motion: entering elements use ease-out, most motion stays under 300ms, and every animation is switched off under `prefers-reduced-motion`. The skill card entrance breaks the first two rules and is listed in the open findings in `DESIGN.md`.

## The ratchet

Counted by `node scripts/check-design-tokens.mjs --report` and held in [`baseline.json`](baseline.json). The check fails if a count goes up.

| Measure | Today | Target |
|---|---|---|
| Raw colours outside the token blocks | 22 | 0 |
| Font sizes | 20 | 8 |
| Radii | 14 | 3 |
| Spacing values | 26 | 6 |

## Forbidden

- A second accent colour
- A raw hex value in a new rule
- A font size between two steps of the scale
- Motion with no row in the table above
- Gradient text, glass blur panels and neon glow: none of them belongs to this direction

Library: https://github.com/mohitagw15856/pm-claude-skills
