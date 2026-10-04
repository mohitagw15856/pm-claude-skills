---
name: model-prompt-pack
description: "Use when asked to write prompts for image-to-3D or text-to-3D tools, generate 3D models of a topic's parts, plan the assets for a 3D explorer, or build a labelled parts list with sources. Produces prompts for image-to-3D tools, one per object, plus a parts list for labelling in which every label names a trusted source, and states that generated geometry is illustrative, not authoritative. Second step of explorer-pipeline."
version: 1.0.0
---

# Model Prompt Pack

Image-to-3D tools can turn a clean reference image into a usable mesh in minutes, but they invent detail: an extra valve, a wrongly placed bone, a plausible part that does not exist. For an explorer that teaches, the geometry can be approximate; the labels cannot be wrong. This skill writes one prompt per object for generating reference images and meshes, and a parts list in which every label is tied to a named trusted source.

## The accuracy rule

1. **Every label needs a named trusted source**: a textbook with edition, a standards body, a peer-reviewed paper, a museum or manufacturer reference, or an educational body's published material. A URL alone is not a source unless it identifies the publisher.
2. **Generated geometry is illustrative, not authoritative.** Every output that shows the model says so, and the viewer displays the statement.
3. **No source, no label.** A part the user cannot source is either dropped or shown as "unlabelled".

## Required Inputs

Ask for these if not provided:
- **Topic and object(s)**: one assembly, or several separate objects
- **Level of detail**: which parts a learner must identify, from the interface brief if there is one
- **Trusted sources available** to the user, or the curriculum or standard to follow
- **The 3D tool**, if chosen (for example an image-to-3D service, or an open model such as TRELLIS or Hunyuan3D), and any polygon or file-size limits
- **Style**: realistic, stylised or diagrammatic

## Output Structure

### 1. Asset plan
Decide, and say why: one mesh per part (generate each part separately, then assemble; best for exploded views and clicking) or one mesh split afterwards (generate the whole, then separate parts in a 3D editor). Most explorers need one mesh per selectable part.

### 2. Prompt cards, one per object
```
Object: [part name]                     Mesh name in GLB: [kebab_or_PascalName]
Reference image prompt:
  "[part], isolated, centred, three-quarter view, neutral light grey background, soft even
   studio lighting, [style], clear silhouette, no text, no labels, no shadow on background"
Negative prompt: text, watermark, multiple objects, cropped, motion blur, extra parts
Image-to-3D settings: single object; target about [n] triangles; PBR texture [size]; GLB output
Fit check: compare the generated mesh against [named source figure] for shape and position
```

### 3. Parts list for labelling
| Mesh name | Label | One-line description (learner level) | Source (publisher, title, edition or date, page or figure) | Confidence (high, medium) |

The mesh names in this table must match the names in the GLB exactly; explorer-viewer-builder reads them.

### 4. Assembly and export notes
Scale (one unit equals one centimetre, or state otherwise), origin at the assembly's centre, each part as a separately named node, total GLB size target (under 15 MB for the web), and Draco or meshopt compression if the viewer supports it.

### 5. Illustrative statement
The exact sentence for the viewer, for example: "This 3D model is illustrative. Shapes and proportions are approximate; labels follow [source]."

## Quality Checks

- [ ] There is exactly one prompt card per object or part to be generated
- [ ] Every label in the parts list names a trusted source with publisher and title
- [ ] No label appears without a source; unsourced parts are dropped or marked unlabelled
- [ ] Mesh names in the parts list match the names the prompt cards assign
- [ ] Every prompt card includes a fit check against a named source figure
- [ ] The illustrative statement is included and names the source used for labels
- [ ] Export notes state scale, origin and a file-size target

## Anti-Patterns

- **Trusting the mesh.** Generators add plausible detail; check each part against the source figure.
- **Wikipedia as the only source.** Use it to find the underlying reference, then cite that.
- **Prompting for the labelled diagram.** Text in generated images is unreliable and copies textbook layouts; generate clean objects and label in the viewer.
- **One giant mesh.** Without separate parts there is nothing to click or explode.

## Example Trigger Phrases

- "Write image-to-3D prompts for the parts of the human heart, with a sourced parts list."
- "Plan the 3D assets for a jet engine explorer."
- "Give me a prompt per part for generating a plant cell in 3D."
- "I need labelled 3D models for a volcano cross-section. Sources must be cited."
