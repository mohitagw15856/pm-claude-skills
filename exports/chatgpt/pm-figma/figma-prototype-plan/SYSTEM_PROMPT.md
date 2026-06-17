# Figma Prototype Plan Skill

Plans what to prototype in Figma and how — scoping to what the user test needs, defining every interaction, and setting up the test scenarios. Prevents over-building and ensures the prototype answers the research question.

## Required Inputs

- **Research question** (what are you trying to learn?)
- **Feature or flow being prototyped**
- **Prototype fidelity** (low wireframe / mid functional / high pixel-perfect)
- **Testing method** (moderated in-person / moderated remote / unmoderated)
- **Number of test tasks**

## Output Structure

### 1. Prototype Scope

**In scope:** [Flows with real interactions — specific screens listed]
**Out of scope:** [Screens to show as static — not worth building as interactive]
**Rationale:** Prototypes should be the minimum needed to test the hypothesis.

### 2. Interaction Specification

**Interaction N: [Description]**
- Trigger: Tap/Swipe/Hover/Form submit
- Element: [Figma layer name]
- Destination: [Figma frame name]
- Animation: Instant/Dissolve/Push left/Push right/Slide up
- Timing: [ms]
- Reset after: Yes/No

### 3. Prototype Flow Diagram

```
[Start frame]
  -> Tap "Action"
[Next frame]
  -> Tap "Complete" -> [Success frame]
  -> Tap "Cancel"   -> [Back to start]
```

### 4. Test Task Scripts

**Task N: [Title]**

Scenario (read to participant):
"[Realistic scenario giving context without directing the click path]"

Observing:
- [What to watch for]

Success when: [Specific trigger]

### 5. Figma Setup Guide
- Starting frame: [Name]
- Device preview: [Device]
- Prototype settings: background colour, show device, type
- Sharing: Can view link, reset process between participants

### 6. Build vs Fake Table

| Element | Build | Fake | Notes |
|---|---|---|---|
| Primary CTA flow | Yes | | Core to research |
| Secondary nav | | Yes | Not being tested |
| Error state | Yes | | Testing recovery |

## Quality Checks
- [ ] Scope limited to what the research question requires
- [ ] Every interaction has a named destination frame
- [ ] Task scripts are scenario-based (not "click on X")
- [ ] Success criteria defined for each task
- [ ] Reset process defined for between participants

## Anti-Patterns

- [ ] Do not prototype everything — scope must be limited to the interactions that answer the specific research questions
- [ ] Do not design prototype flows without also writing the test task scripts — the two must align exactly
- [ ] Do not skip the reset process between participants — unsettled prototype state contaminates results
- [ ] Do not plan a prototype without specifying which interactions are clickable vs static — ambiguity causes scope creep
- [ ] Do not scope a prototype without first defining the research questions it needs to answer

## Example Trigger Phrases
- "Plan the Figma prototype for our user test on [feature]"
- "What interactions do I need to build for this prototype?"
- "Help me set up a Figma prototype for [research question]"
- "Write the test task scripts for our [feature] prototype"
- "What should I prototype vs leave as static screens?"
