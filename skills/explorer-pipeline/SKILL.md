---
name: explorer-pipeline
description: "Use when asked to make an interactive 3D explorer of a topic from start to finish, go from a topic to a clickable 3D learning page, or run the whole 3D explorer process. Produces a staged run of explorer-interface-brief, model-prompt-pack and explorer-viewer-builder in order for one topic, with the hand-offs between them, and a build checklist that tracks every asset, source and test until the explorer ships."
version: 1.0.0
---

# Explorer Pipeline

Topic in, interactive 3D explorer out. The three skills in this bundle each do one job: the interface brief decides what the learner sees and does, the model prompt pack produces the parts and their sourced labels, and the viewer builder turns both into a page. This skill runs them in order for one topic, carries each step's output into the next, and keeps a build checklist so nothing ships unsourced or untested.

## Required Inputs

Ask for these once, at the start, and reuse them in every stage:
- **Topic** and the object or system to explore
- **Audience and learning goal**
- **Devices** the explorer must work on
- **Trusted sources** the user has, or the curriculum or standard to follow
- **The image-to-3D tool** the user will use, or "not chosen yet"
- **Hosting** for the finished page

## Output Structure

### 1. Run plan
A table of the three stages with their inputs, outputs and the person responsible for any manual step (generating images and meshes happens outside the chat):
| Stage | Skill | Input | Output | Manual step |

### 2. Stage outputs
Run each stage in full, in order, with a short hand-off note between them:
1. **explorer-interface-brief**: the design brief and the image-model prompt for the mock. Hand-off: the implied parts list, palette and layout values.
2. **model-prompt-pack**: the prompt cards, the sourced parts list and the illustrative statement. Hand-off: mesh names, labels, descriptions and sources in the exact shape CONFIG.parts needs.
3. **explorer-viewer-builder**: the single-file viewer filled in from both hand-offs, with the demo assembly until the user's GLB exists.

Pause after stage 2 if the user must generate meshes first, and say exactly what to bring back (the GLB file and the mesh names it contains).

### 3. Build checklist
A checklist to keep until launch, grouped by stage:

```markdown
#### Design
- [ ] Learning outcomes agreed with [teacher, client or reviewer]
- [ ] Interface mock generated and reviewed
#### Assets
- [ ] One reference image per part, checked against its source figure
- [ ] One mesh per part, named exactly as in the parts list
- [ ] GLB assembled, scaled, under 15 MB
#### Content
- [ ] Every label has a named trusted source
- [ ] Descriptions reviewed by a subject expert
- [ ] Illustrative statement visible on the page
#### Build and test
- [ ] Mesh-name check passes (no missing or extra names)
- [ ] Tested on desktop, a phone at 390 px width, and in dark mode
- [ ] Keyboard path to every part works
- [ ] No console errors
#### Publish
- [ ] Hosted at [URL]; link checked from a phone on mobile data
```

### 4. Status summary
At the end of each session: what is done, what is blocked (and on whom), and the next action.

## Quality Checks

- [ ] All three stages are run in order, each with its full output
- [ ] Each hand-off passes the exact values the next stage needs
- [ ] The parts list from stage 2 is the one used in stage 3's CONFIG
- [ ] The pipeline pauses for manual mesh generation and says what to bring back
- [ ] The build checklist covers design, assets, content, testing and publishing
- [ ] No label reaches the viewer without a named source

## Anti-Patterns

- **Starting with the 3D model.** Without the brief, the parts list and the page disagree.
- **Losing the sources between stages.** Sources travel with labels into the viewer, every time.
- **Declaring it done before the mesh-name check.** Mismatched names mean unclickable parts.
- **Skipping the subject-expert review.** Sourced labels can still be misread; a reviewer catches it.

## Example Trigger Phrases

- "Make a 3D explorer of the human heart for Year 10 students, start to finish."
- "Topic in, 3D explorer out: jet engines for an aviation museum."
- "Run the whole 3D explorer pipeline for a plant cell."
- "I want an interactive 3D page about volcanoes. Take me through it."
