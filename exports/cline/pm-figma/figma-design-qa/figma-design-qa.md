# Figma Design QA Skill

Runs a systematic pre-handoff QA check on a Figma design — catching issues that cause engineering back-and-forth before they become expensive.

## Required Inputs

Ask the user for these if not provided:
- **Feature or screen being QA-d** (describe what has been designed)
- **Platform** (iOS / Android / Web)
- **Design system** (custom / Material / HIG / None)
- **Handoff tool** (Figma Inspect / Zeplin / Storybook / Direct link)
- **QA depth** (quick 15 min / standard 30 min / thorough 60 min)

## Output Structure

QA Report: [Feature] | [Date] | [Platform]
**Overall status:** Ready / Minor fixes needed / Not ready

### Section 1: File Hygiene
- All layers named semantically (no "Rectangle 12")
- No unused/hidden layers in final frames
- Components from library (not detached copies)
- All text uses text styles (not manual font settings)
- All colours use styles or variables (not hex overrides)
- Frames named to match screen map
- No leftover prototype wires to wrong frames

### Section 2: Component Usage
- All buttons use library component
- All inputs use library component
- All icons from approved icon library
- No custom components that should be in library
- Variants used correctly (right size, state, type)

### Section 3: Content and Copy
- No placeholder text (Lorem ipsum) in final designs
- All copy reviewed and approved
- Realistic content used (not "User Name")
- Long text edge cases tested
- Error messages are human-readable
- Empty states have copy and CTA

### Section 4: States and Coverage
- Default, Loading, Empty, Error, Success states
- Interactive elements have hover/active (web)
- Disabled states designed where applicable

### Section 5: Accessibility
- All text meets WCAG AA contrast (4.5:1 body, 3:1 large)
- UI components meet 3:1 contrast against background
- Touch targets minimum 44x44pt iOS / 48x48dp Android
- Focus states for keyboard/switch navigation (web)
- Information not conveyed by colour alone
- Icons have text labels or accessible names annotated

### Section 6: Handoff Readiness
- Dev annotations on non-obvious interactions
- Spacing uses Auto Layout (not absolute positioning)
- Images/assets exported at correct resolutions
- Design matches approved requirements
- Link to prototype included

### Issues Found
For each fail:
**[Issue] — Blocking / Fix before handoff / Fix in next iteration**
- What: [Specific layer/screen/element]
- Fix: [Exact action needed]
- Owner: [Designer/PM/Both]

### Handoff Decision
Status, signed off by, date.

## Quality Checks
- [ ] All 6 sections completed
- [ ] Every fail has a specific description and fix action
- [ ] Blocking issues separated from minor ones
- [ ] Handoff decision is explicit

## Anti-Patterns

- [ ] Do not produce a partial QA — every checklist category must be evaluated, not just the ones that are obviously problematic
- [ ] Do not leave the handoff decision ambiguous — the output must explicitly state pass, pass with conditions, or fail
- [ ] Do not skip accessibility checks — colour contrast, tap target size, and screen reader labels are required, not optional
- [ ] Do not report issues without specifying which screen or component they appear on
- [ ] Do not approve a design if any component is detached from the library without a documented reason

## Example Trigger Phrases
- "QA this Figma design before handoff"
- "Run a pre-handoff check on [feature] design"
- "Is this Figma design ready for engineering?"
- "Do a design QA on [screen/feature]"
- "What needs fixing before we hand this off?"
