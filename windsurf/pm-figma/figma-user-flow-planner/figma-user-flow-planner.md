---
trigger: model_decision
description: "Plan user flows and screen states for a Figma design before any designing starts. Use when asked to plan a user flow, map out screens for a feature, define screen states, plan a Figma file structure, or work out what needs to be designed before opening Figma. Produces a complete flow map with all screens, states, entry/exit points, and a suggested Figma page structure."
---

# Figma User Flow Planner Skill

Plans what needs to be designed before a pixel is touched — mapping all screens, states, entry points, and edge cases so designers do not discover missing states mid-build.

## Required Inputs

- **Feature or task being designed**
- **User type** (who performs this flow?)
- **Platform** (iOS / Android / Web / Multi-platform)
- **Starting point** (where does the user begin?)
- **Known edge cases** (optional)

## Output Structure

### 1. Flow Overview
Feature, user, goal, entry points, success exit, failure exits.

### 2. Screen Map

| # | Screen name | Type | Triggered by | Notes |
|---|---|---|---|---|
| 1 | [Screen] | New/Modal/Drawer/Toast | [What triggers] | [Considerations] |

Screen types to cover: entry, happy path, loading, success, error (network/validation/permission), empty, first-time/onboarding, edge cases.

### 3. State Matrix

**[Screen name]**

| State | Trigger | Visual change | Action available |
|---|---|---|---|
| Default | Page load | [Description] | [What user can do] |
| Loading | User taps action | Skeleton/spinner | None |
| Error | API failure | Error message | Retry/Go back |
| Empty | No data | Empty state | [CTA] |

### 4. Decision Points

**Decision: [Name]**
- If yes: [Screen N]
- If no: [Screen X]

### 5. Suggested Figma File Structure

```
Feature name/
- Cover
- Flow Map
- Happy Path
- Error States
- Empty States
- Edge Cases
- Handoff
```

### 6. What Not to Design Yet
[Explicit out-of-scope items — prevents scope creep]

## Quality Checks
- [ ] All three state types covered: loading, error, empty
- [ ] All decision points mapped with both branches
- [ ] Entry points include all realistic user paths
- [ ] Out-of-scope section is explicit
- [ ] Figma file structure matches screen map

## Anti-Patterns

- [ ] Do not plan only the happy path — all error states, empty states, and edge cases must be mapped before designing starts
- [ ] Do not produce a flow map that doesn't match the Figma file structure — the page structure must reflect the flow map
- [ ] Do not define screens without specifying all required states — a screen without its variants is an incomplete design scope
- [ ] Do not start designing before entry and exit points are fully documented — unclear boundaries cause scope creep
- [ ] Do not plan user flows without tying each step back to a user goal — every screen must justify its existence

## Example Trigger Phrases
- "Plan the user flow for [feature] in Figma"
- "What screens do I need to design for [feature]?"
- "Map out the states for [feature] before we start designing"
- "Help me structure my Figma file for [feature]"
- "What do we need to design before handing this to the developer?"
