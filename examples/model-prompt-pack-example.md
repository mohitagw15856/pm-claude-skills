# Example: model-prompt-pack

## What this skill does

Writes one image-to-3D prompt per object and a parts list in which every label names a trusted source, with geometry described as illustrative.

## How to trigger it

### Example 1: heart parts with sources

**You say:**
> "Write image-to-3D prompts for the parts of the heart students need for GCSE, with a sourced parts list. Our textbook is the school's AQA GCSE Biology book; OpenStax is fine too."

**Claude produces (excerpt):**

Asset plan: one mesh per part, generated separately and assembled, so exploded view and
clicking work. 12 parts.

```
Object: left ventricle                  Mesh name in GLB: LeftVentricle
Reference image prompt:
  "left ventricle of a human heart as a separate anatomical part, isolated, centred,
   three-quarter view, neutral light grey background, soft even studio lighting, clean
   stylised medical illustration, matte muscle-red surface, clear silhouette, no text"
Negative prompt: text, labels, watermark, multiple objects, blood, cropped
Image-to-3D settings: single object; about 20,000 triangles; 1024 px PBR texture; GLB
Fit check: compare thickness of the wall with the heart anatomy figure in OpenStax A&P 2e, section 19.1
```

| Mesh name | Label | Description (GCSE level) | Source | Confidence |
|---|---|---|---|---|
| LeftVentricle | Left ventricle | Pumps oxygenated blood to the body through the aorta; its wall is the thickest. | OpenStax, Anatomy and Physiology 2e, section 19.1 Heart Anatomy | high |
| Aorta | Aorta | Carries oxygenated blood from the left ventricle to the body. | as above | high |
| BicuspidValve | Bicuspid (mitral) valve | Stops blood flowing back from the left ventricle into the left atrium. | as above | high |

Illustrative statement: "This 3D model is illustrative. Shapes and proportions are
approximate; labels follow OpenStax Anatomy and Physiology 2e."

---

### Example 2: refusing an unsourced label

**You say:**
> "Add the 'moderator band' too."

**Claude produces:**

> The moderator band is beyond GCSE and your textbook does not cover it. I have added it to the
> parts list as unlabelled until you choose a source; OpenStax does not name it in section
> 19.1. If you want it, a university anatomy text would be the right reference.

## Tips for best results

- Say which textbook or standard the learners use; labels should match their course.
- Keep mesh names exactly as listed; the viewer matches them character for character.
- Check every generated mesh against its source figure before assembling.

## Related skills

- `explorer-interface-brief`: decide which parts learners need before writing prompts.
- `explorer-viewer-builder`: load the GLB and parts list into a page.
