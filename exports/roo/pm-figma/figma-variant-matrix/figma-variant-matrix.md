# Figma Variant Matrix Skill

Defines all variants, properties, and states a component needs before building it in Figma — preventing missing variants discovered after the component is already used across 40 screens.

## Required Inputs

- **Component name** (Button, Card, Input, Badge, Navigation item, etc.)
- **Component purpose** (what does it do, where is it used?)
- **Platform** (iOS / Android / Web / Multi-platform)
- **Design system context** (standalone / part of existing system)

## Output Structure

### 1. Component Overview
Name, category (Interactive/Display/Layout/Form/Navigation/Feedback), used in contexts.

### 2. Variant Properties

| Property | Values | Notes |
|---|---|---|
| Type | Primary, Secondary, Tertiary, Destructive | |
| Size | Large, Medium, Small | |
| State | Default, Hover, Active, Disabled, Loading | |
| Icon | None, Leading, Trailing, Only | |

Total combinations: [N]. Flag if over 50 — consider splitting into multiple components.

### 3. State Definitions

For each state, list only what changes from Default:
- Default: [Full visual spec]
- Hover (web): [Delta from default]
- Active/Pressed: [Delta]
- Disabled: [Delta — use layer-level properties, not opacity on whole component]
- Loading: [What replaces label, interactive during loading?]
- Error (forms): [Border colour, helper text, icon changes]

### 4. Anatomy Breakdown

| Layer name | Purpose | Required? | Notes |
|---|---|---|---|
| container | Background and bounds | Yes | |
| label | Text | Conditional | Hide when icon-only |
| icon-leading | Leading icon slot | No | |

### 5. Token Mapping

| Property | Token | Fallback |
|---|---|---|
| Background default | color.brand.primary | #hex |
| Border radius | radius.medium | 8px |

### 6. Build Order
1. Default state, most common variant
2. Convert to component, add properties
3. Size variants
4. State variants
5. Type variants
6. Icon slot variants last

## Quality Checks
- [ ] All interactive states defined
- [ ] Total variant count calculated, flagged if over 50
- [ ] Every layer named semantically
- [ ] Token mapping covers all visual properties
- [ ] Disabled state uses layer-level properties not opacity

## Anti-Patterns

- [ ] Do not create a variant matrix with properties that overlap or conflict — each property must be independently variable
- [ ] Do not use opacity for disabled states — disabled states must use layer-level properties, not opacity
- [ ] Do not enumerate every mathematical combination if many are invalid — document only valid, buildable combinations
- [ ] Do not define variants without considering responsive behaviour — specify which properties change across screen sizes
- [ ] Do not produce a matrix without Figma implementation guidance — variant naming conventions must follow Figma's property system

## Example Trigger Phrases
- "Define the variants for a [component] in Figma"
- "What states does my [component] need?"
- "Help me plan the variant matrix for [component]"
- "Set up the Figma properties for a [button/card/input]"
- "What are all the combinations I need for my [component]?"
