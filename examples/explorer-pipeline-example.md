# Example: explorer-pipeline

## What this skill does

Runs the interface brief, the model prompt pack and the viewer builder in order for one topic, and keeps a build checklist until the explorer ships.

## How to trigger it

### Example 1: a jet engine for a museum

**You say:**
> "Make a 3D explorer of a turbofan jet engine for an aviation museum's touch screen. Visitors are families. Sources: the museum's own exhibit text and the manufacturer's public cutaway diagram."

**Claude produces (excerpt):**

| Stage | Skill | Input | Output | Manual step |
|---|---|---|---|---|
| 1 | explorer-interface-brief | topic, families, touch screen | brief, mock prompt | generate and review the mock |
| 2 | model-prompt-pack | parts implied by stage 1 | 9 prompt cards, sourced parts list | generate 9 meshes, assemble GLB |
| 3 | explorer-viewer-builder | GLB, parts list, palette | index.html | test on the kiosk |

Hand-off from stage 1 to 2: parts are fan, low-pressure compressor, high-pressure compressor,
combustion chamber, high-pressure turbine, low-pressure turbine, nozzle, nacelle, bypass duct.
Touch targets at least 48 px; text at least 20 px for a kiosk viewed at arm's length.

Paused after stage 2: please bring back `turbofan.glb` with nine nodes named exactly as in the
parts list (Fan, LPCompressor, HPCompressor, Combustor, HPTurbine, LPTurbine, Nozzle, Nacelle,
BypassDuct).

---

### Example 2: the status summary next session

**You say:**
> "Here's the GLB. Where are we?"

**Claude produces:**

```
Done:     brief approved; mock reviewed; 9 meshes generated; GLB 9.8 MB
          viewer built; mesh-name check 9 of 9
Blocked:  descriptions need the curator's review (on: museum education team)
Next:     kiosk test at 1920x1080 touch; then publish to the museum's static host
Checklist: 13 of 17 done
```

## Tips for best results

- Give the sources at the start; they travel with every label through all three stages.
- Expect a pause while meshes are generated; the pipeline says exactly what to bring back.
- Keep the build checklist in the project folder and tick it as you go.

## Related skills

- `explorer-interface-brief`, `model-prompt-pack`, `explorer-viewer-builder`: the three stages, usable on their own.
