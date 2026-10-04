---
name: explorer-interface-brief
description: "Use when asked to design the interface for an interactive 3D explorer, plan a UI for exploring a 3D model of a topic, or write an image-model prompt for a 3D learning app mock-up. Produces, from a topic, the UI design brief (audience, layout, panels, interactions, label style, colour palette, accessibility) and an image-model prompt for the interface mock. First step of explorer-pipeline."
version: 1.0.0
---

# Explorer Interface Brief

A 3D explorer (a heart, a jet engine, a cell, a volcano) succeeds or fails on its interface: where the model sits, how labels read against it, how a learner moves between free exploration and testing themselves. This skill turns a topic into a design brief a builder can follow and an image-model prompt that produces a convincing mock of the screen before any 3D work starts.

## Required Inputs

Ask for these if not provided:
- **Topic** and the specific object or system to explore
- **Audience**: age or level (for example 14-year-old students, first-year medical students, museum visitors)
- **Learning goal**: what the learner should be able to name, explain or do afterwards
- **Devices**: classroom laptops, phones, a museum touch screen
- **Brand or colour constraints**, if any

## Output Structure

### 1. Design brief
- **Purpose**: one sentence: who explores what, to learn what
- **Audience notes**: reading level, prior knowledge, device and setting
- **Learning outcomes**: three to five, each starting with a verb (name, locate, explain)
- **Layout**: the model stage, a side panel (or bottom sheet on phones) with the selected part's label, description and source, a parts list, and a toolbar (exploded view, quiz mode, reset). Give proportions for desktop and phone.
- **Interactions**: rotate, zoom, select (click, tap and keyboard via the parts list), exploded view, quiz mode, reset. State the response to each.
- **Label style**: font, size (at least 16 px body), casing, how labels attach to parts (side panel rather than floating text over geometry), and what a "source" line looks like
- **Colour palette**: background, panel, ink, accent and highlight as hex values, each pair checked for at least 4.5:1 contrast for text; a dark-mode variant
- **Accessibility**: keyboard path to every part, visible focus, reduced motion respected, no information carried by colour alone
- **Content rules**: every label carries a named source; the model is described as illustrative

### 2. Image-model prompt for the interface mock
A single prompt in this structure, ready for an image model:
```
UI mock-up, [device] screen, [width]x[height] aspect, of an interactive 3D explorer for [topic].
Left: [model description] on a [background colour] stage, three-quarter view, soft studio light.
Right: a [panel colour] side panel with a title "[part name]", two lines of body text, a small
"Source: [source]" line, and a list of [n] part names. Top of panel: three pill buttons
"Exploded view", "Quiz mode", "Reset". Flat design, [palette as colour names], generous spacing,
light sans-serif typography, no device frame, no watermark, legible placeholder text.
```
Plus a negative prompt (cluttered UI, tiny text, neon colours, photorealistic hands, watermarks) and two variants: one for phone in portrait, one for dark mode.

### 3. Handover notes
What the next steps need from this brief: the parts list it implies (for model-prompt-pack) and the palette and layout values (for explorer-viewer-builder), as a short table.

## Quality Checks

- [ ] Learning outcomes are three to five and each starts with a verb
- [ ] Every interaction has a keyboard path, including selecting parts
- [ ] Every palette text pair is stated with a contrast of at least 4.5:1
- [ ] Layout is specified for both desktop and phone
- [ ] The image prompt names device, aspect, palette and every panel element
- [ ] The brief requires a named source for every label and calls the model illustrative
- [ ] The handover table lists the parts list and palette values

## Anti-Patterns

- **Labels floating over the model.** They collide and become unreadable when the model rotates; use a side panel.
- **Beautiful but unteachable.** A brief with no learning outcomes produces a toy.
- **Mouse-only selection.** Keyboard and screen-reader users need the parts list.
- **Mocks with unreadable text.** Ask for legible placeholder text, or the mock misleads reviewers.

## Example Trigger Phrases

- "Design the interface for a 3D explorer of the human heart for GCSE students."
- "Write an image prompt for a UI mock of an interactive jet engine viewer."
- "Plan the screens for a museum touch-screen 3D model of a volcano."
- "Brief for a 3D cell explorer app, phone first."
