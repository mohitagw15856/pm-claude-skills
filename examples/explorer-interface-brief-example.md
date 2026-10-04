# Example: explorer-interface-brief

## What this skill does

Turns a topic into a UI design brief for a 3D explorer and an image-model prompt for a mock of the screen.

## How to trigger it

### Example 1: the human heart for GCSE students

**You say:**
> "Design the interface for a 3D explorer of the human heart for GCSE biology students, used on school Chromebooks and phones."

**Claude produces (excerpt):**

**Purpose:** Year 10 and 11 students rotate and take apart a heart to learn its chambers,
valves and vessels, then test themselves.

**Learning outcomes**
1. Name the four chambers and the four main vessels.
2. Locate the tricuspid, bicuspid and semilunar valves.
3. Explain the route of blood through the heart in order.

| Token | Light | Dark | Use | Contrast with ink |
|---|---|---|---|---|
| bg | #F7F4EE | #16191D | stage | 14.4:1 / 15.4:1 |
| panel | #FFFFFF | #1F2328 | side panel | 15.8:1 / 13.8:1 |
| accent | #3D7A6A | #7CC4AE | selected button | white text 5.0:1 / dark text 8.7:1 |
| highlight | #F2B44B | #F2B44B | selected part glow, focus ring | not used for text |

**Interactions:** drag to rotate; tap a part or choose it from the list; "Exploded view"
separates chambers and vessels; "Quiz mode" asks "Click the left ventricle" and scores.

---

### Example 2: the mock prompt

**Claude produces:**

```
UI mock-up, laptop screen, 16:10 aspect, of an interactive 3D explorer for the human heart.
Left: a stylised anatomical heart on a warm cream stage, three-quarter view, soft studio light.
Right: a white side panel with a title "Left ventricle", two lines of body text, a small
"Source: OpenStax Anatomy and Physiology 2e, section 19.1" line, and a list of 12 part names.
Top of panel: three pill buttons "Exploded view", "Quiz mode", "Reset". Flat design, sage green
and warm cream with a single amber highlight, generous spacing, light sans-serif typography,
no device frame, no watermark, legible placeholder text.
Negative: cluttered UI, tiny text, neon colours, gore, photorealistic blood, watermark.
```

Phone variant: portrait 9:19.5, model in the top 55%, panel as a bottom sheet.

## Tips for best results

- Give the real audience and device; the layout and type sizes follow from them.
- Ask for the dark-mode variant early so the palette is designed for both.
- Use the mock in a review before generating any 3D assets.

## Related skills

- `model-prompt-pack`: the parts and sourced labels the brief implies.
- `explorer-pipeline`: run all three stages for one topic.
