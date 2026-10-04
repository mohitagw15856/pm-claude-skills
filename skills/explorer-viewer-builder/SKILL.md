---
name: explorer-viewer-builder
description: "Use when asked to build a 3D viewer for a GLB model, make an interactive explorer with clickable labelled parts, add an exploded view or quiz to a 3D model, or turn a parts list into a web page. Produces a single-file Three.js viewer that loads GLB models, with orbit controls, clickable labelled parts, an exploded view toggle and a quiz mode, built from the tested template in references/viewer-template.html. Third step of explorer-pipeline."
version: 1.0.0
---

# Explorer Viewer Builder

The last step of a 3D explorer is a page anyone can open: no install, no build step, works on a phone. This skill produces a single HTML file from the tested template in `references/viewer-template.html`: Three.js from a CDN, a GLB loader, orbit controls, clickable parts with sourced labels, an exploded view and a quiz mode, filled in with the parts list and palette from the earlier steps.

## Required Inputs

Ask for these if not provided:
- **The GLB file** (path or URL), or confirmation to start with the template's demo assembly
- **The parts list**: mesh name, label, description and source for each part (from model-prompt-pack)
- **Palette and layout values** (from explorer-interface-brief), or accept the template defaults
- **Title** and the illustrative statement
- **Hosting**: GitHub Pages, a static host, or opening the file locally (GLB files need a local server; browsers block `file://` loading)

## Output Structure

### 1. The viewer file
A complete `index.html` based on the template, with:
- **CONFIG** filled in: `title`, `model`, and `parts` (one entry per mesh name, each with `label`, `description` and `source`)
- **Palette** applied to the CSS custom properties, with a dark-mode block
- **The illustrative statement** in the panel footer
- unchanged core behaviour from the template: orbit controls with damping; click (or tap) to select, ignoring drags; selection through the parts list for keyboard users; exploded view that moves each part away from the model's centre in its parent's space; quiz mode that asks for a random part, scores answers and highlights the right part after a miss; reset view; a demo fallback and a console warning if the model fails to load; a list of the model's mesh names when none match the parts list

### 2. Mesh-name check
A table matching the parts list against the mesh names the viewer reports (open the page with the model and read the panel, or the console):
| Mesh name in parts list | Found in GLB? | Action |

### 3. Run and publish instructions
- Local: `npx serve .` (or `python3 -m http.server`) in the folder, then open the printed address
- GitHub Pages: commit `index.html` and the `.glb`, enable Pages for the branch, and note the file-size limits
- Performance: keep the GLB under 15 MB; compress textures; test on a mid-range phone

### 4. Test checklist
Binary checks to run in a browser: the model appears; each part in the list highlights and shows its label and source; dragging rotates without selecting; exploded view separates every labelled part and reverses; quiz mode scores a right and a wrong answer; the page has no horizontal scroll at 390 px wide; dark mode is readable; the console shows no errors.

## Quality Checks

- [ ] The output is a single HTML file with no build step
- [ ] Every entry in CONFIG.parts has a label, a description and a source
- [ ] Every parts-list mesh name is checked against the GLB, with mismatches listed
- [ ] Parts can be selected from the keyboard through the parts list
- [ ] Exploded view and quiz mode both work and can be turned off
- [ ] The illustrative statement is visible on the page
- [ ] The page works at 390 px width and in dark mode with no console errors
- [ ] Three.js is loaded from a pinned version, not "latest"

## Anti-Patterns

- **Opening the HTML by double-clicking with a local GLB.** Browsers block it; use a local server.
- **Labels without sources.** The viewer shows the source line for a reason; never leave it blank.
- **Selecting on pointer down.** Every rotation then selects a part; select on a click without movement.
- **Unpinned CDN versions.** A Three.js update can break the page overnight.

## Example Trigger Phrases

- "Build a viewer for heart.glb with clickable labelled parts and a quiz."
- "Turn this parts list into a single-file Three.js explorer."
- "Add an exploded view and quiz mode to my 3D model page."
- "Make a GLB viewer that works on phones, no build step."
