# Example: explorer-viewer-builder

## What this skill does

Builds a single-file Three.js viewer for a GLB model with orbit controls, clickable labelled parts, an exploded view and a quiz mode.

## How to trigger it

### Example 1: filling in the template

**You say:**
> "Build the viewer for heart.glb using this parts list. Title 'Inside the heart'. Host on GitHub Pages."

**Claude produces (excerpt):**

```js
const CONFIG = {
  title: 'Inside the heart',
  model: new URLSearchParams(location.search).get('model') || 'heart.glb',
  parts: [
    { mesh: 'LeftVentricle', label: 'Left ventricle',
      description: 'Pumps oxygenated blood to the body through the aorta; its wall is the thickest.',
      source: 'OpenStax, Anatomy and Physiology 2e, section 19.1' },
    { mesh: 'Aorta', label: 'Aorta',
      description: 'Carries oxygenated blood from the left ventricle to the body.',
      source: 'OpenStax, Anatomy and Physiology 2e, section 19.1' },
    // ...10 more
  ],
};
```

| Mesh name in parts list | Found in GLB? | Action |
|---|---|---|
| LeftVentricle | yes | none |
| BicuspidValve | no (GLB has `Mitral_Valve`) | rename the node in the GLB, or change the parts list |
| PulmonaryArtery | yes | none |

---

### Example 2: running the test checklist

**You say:**
> "Check it works before I send it to the class."

**Claude produces:**

```
Model appears ..................................... pass
Each listed part highlights and shows its source .. pass (12 of 12)
Drag rotates without selecting .................... pass
Exploded view out and back ........................ pass
Quiz: right answer scored, wrong answer shows part  pass
390 px wide, no horizontal scroll ................. pass
Dark mode readable ................................ pass
Console errors .................................... none
GLB size .......................................... 11.2 MB (under 15 MB)
```

## Tips for best results

- Run the mesh-name check first; one mismatched name makes a part unclickable.
- Serve the folder locally while testing; browsers block GLB files opened from disk.
- Keep the illustrative statement on the page; it is part of the accuracy rule.

## Related skills

- `model-prompt-pack`: produces the parts list this viewer reads.
- `explorer-pipeline`: the full topic-to-explorer process.
