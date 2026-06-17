---
trigger: model_decision
description: "Design a spacing and layout token system for a Figma design system. Use when asked to create a spacing system, define layout tokens, set up a grid system, build a spacing scale, or establish layout foundations for a Figma file. Produces a complete spacing scale, grid definition, component spacing conventions, and Figma implementation guide."
---

# Figma Spacing System Skill

Produces a complete spacing and layout token system — the foundation that makes a design system consistent and developer handoff unambiguous.

## Required Inputs

- **Platform** (iOS / Android / Web / Multi-platform)
- **Base unit** (4px / 8px — default to 8px)
- **Design system name** (for token naming)
- **Component density** (compact / standard / comfortable)
- **Grid requirements** (or "derive from platform standard")

## Output Structure

### 1. Base Unit
[4px or 8px] with rationale. All values must be multiples.

### 2. Spacing Scale

| Token | Value | Use case |
|---|---|---|
| spacing.none | 0px | Removing space intentionally |
| spacing.xs | 4/8px | Icon padding, tight labels |
| spacing.sm | 8/12px | Internal component padding compact |
| spacing.md | 12/16px | Internal component padding standard |
| spacing.lg | 16/24px | Section padding, card internal |
| spacing.xl | 24/32px | Between components |
| spacing.2xl | 32/48px | Section separation |
| spacing.3xl | 48/64px | Page-level breaks |
| spacing.4xl | 64/96px | Hero sections |

### 3. Layout Grid

Mobile (375px): 4 columns, margin [value], gutter [value]
Tablet (768px): 8 columns, margin [value], gutter [value]
Desktop (1440px): 12 columns, margin [value], gutter [value], max content width [value]

### 4. Component Spacing Conventions

| Context | Token | Example |
|---|---|---|
| Button horizontal padding | spacing.md | Left/right |
| Button vertical padding | spacing.sm | Top/bottom |
| Card internal padding | spacing.lg | All sides |
| Input padding | spacing.sm vertical, spacing.md horizontal | |
| Icon gap from label | spacing.xs | |
| Section gap | spacing.xl | |

### 5. Figma Implementation
1. Create SPACING page documenting each token visually
2. Resources > Variables > create Number collection named Spacing
3. Apply variables to Auto Layout padding/gap values
4. Share token names with engineers as-is or via Tokens Studio

### 6. Anti-Patterns to Avoid
- Values not on the scale (13px, 22px) — round to nearest token
- Absolute pixel values in components instead of tokens
- Mixing 4px and 8px base units in the same product

## Quality Checks
- [ ] All token values are multiples of the base unit
- [ ] Scale covers xs through 4xl
- [ ] Grid defined for all relevant breakpoints
- [ ] Component conventions cover common decisions
- [ ] Figma implementation steps included

## Anti-Patterns

- [ ] Do not create a spacing scale with arbitrary values — the scale must follow a consistent mathematical ratio (e.g. 4px base, 8-4-2 system)
- [ ] Do not define spacing tokens without Figma implementation instructions — token names alone are not actionable
- [ ] Do not create a spacing system that doesn't account for component-level spacing conventions — global tokens and component usage must both be documented
- [ ] Do not skip grid definitions — spacing without a grid system is incomplete layout foundation documentation
- [ ] Do not produce a spacing system that ignores responsive behaviour — define how spacing adapts across breakpoints

## Example Trigger Phrases
- "Create a spacing system for our Figma design system"
- "Define our spacing tokens for Figma"
- "Set up a grid and spacing scale for [product]"
- "What spacing values should we use in our design system?"
- "Help me build the layout foundation for our Figma file"
