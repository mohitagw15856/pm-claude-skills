---
trigger: model_decision
description: "Generate structured developer handoff annotations for a Figma screen or component. Use when asked to write Figma annotations, create dev handoff notes, document a Figma design for developers, or write specs for a screen. Produces a complete annotation set covering interactions, states, spacing, accessibility, and edge cases."
---

# Figma Annotation Guide Skill

Produces a complete set of developer handoff annotations for a Figma screen or component — the notes that turn a visual design into a buildable spec.

## Required Inputs

- **Screen or component description** (describe or summarise what was designed)
- **Platform** (iOS / Android / Web / React Native)
- **Interaction type** (static / interactive / animated / form)
- **Developer audience** (mobile / frontend / full-stack)

## Output Structure

### 1. Screen/Component Overview
Name, purpose, entry points, exit points.

### 2. Interaction Annotations

**[Element name]**
- Default state: [Visual description]
- On tap/click: [Exact action — API call, state change, navigation]
- Loading state: [Description]
- Success state: [What happens after]
- Error state: [What error looks like and user options]
- Disabled condition: [When and why]

### 3. State Inventory

| Element | States Required |
|---|---|
| [Element] | Default, Hover, Active, Disabled, Loading, Error, Empty |

Flag missing designs: "Warning: Error state not designed — needed before build"

### 4. Spacing and Layout Notes
Fixed vs fluid elements, scroll behaviour, breakpoints, safe areas.

### 5. Content and Copy Rules
Character limits, dynamic vs static content, truncation rules, empty states.

### 6. Accessibility Annotations
Touch targets, screen reader labels, focus order, colour contrast, motion preferences.

### 7. Edge Cases and Developer Questions
- [ ] [Unresolved question for developer to flag]

## Quality Checks
- [ ] Every interactive element has all states defined
- [ ] State inventory flags missing designs
- [ ] Accessibility covers touch targets and screen reader labels
- [ ] Empty states specified
- [ ] Edge cases listed as actionable questions

## Anti-Patterns

- [ ] Do not annotate only the happy path — error states, loading states, and empty states must all be documented
- [ ] Do not use vague spacing descriptions like "some padding" — specify exact pixel values or token names
- [ ] Do not skip accessibility annotations — focus order, ARIA labels, and colour contrast ratios must be included
- [ ] Do not leave interaction behaviour undescribed — every interactive element needs a documented response
- [ ] Do not produce annotations without edge cases — developers need to know what happens at boundaries

## Example Trigger Phrases
- "Write dev annotations for this Figma screen"
- "Create developer handoff notes for [screen/component]"
- "Document this design for the engineering team"
- "Write the Figma spec for [feature]"
- "What should I annotate before handing off this design?"
