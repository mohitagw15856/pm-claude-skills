# Figma Design Brief Skill

Converts a product requirement or feature request into a structured design brief — everything a designer needs to open Figma and start building confidently.

## Required Inputs

- **Feature or requirement** (paste PRD snippet, ticket, or describe the feature)
- **User goal** (what is the user trying to accomplish?)
- **Platform** (iOS / Android / Web / Responsive / All)
- **Existing components available** (optional)
- **Timeline** (when does design need to be ready?)

## Output Structure

### 1. Brief Header
Feature, PM, Designer, Platform, Design due, Dev handoff dates.

### 2. What We Are Designing and Why
- **The goal:** [One sentence — user problem being solved]
- **Context:** [2-3 sentences. Why now? What triggers this?]
- **Success looks like:** [Specific observable outcome]

### 3. User Flows to Design

**Flow N: [Flow name]**
- Entry point: [Where user starts]
- Steps: [Numbered key steps]
- Exit point: [Where flow ends]
- Edge cases: [empty state, error state, loading state]

### 4. Screens Required

| Screen | New / Update | Notes |
|---|---|---|
| [Screen] | New | [Key requirement] |

### 5. Components Needed

| Component | In library? | Action |
|---|---|---|
| [Component] | Yes/No/Needs variant | Use/Create/Extend |

### 6. Constraints and Requirements
- Must haves: [Non-negotiable constraints]
- Must avoid: [Design patterns to not use]
- Accessibility: [WCAG level, touch target sizes]

### 7. Open Questions
- [ ] [Question — with owner]

## Quality Checks
- [ ] Goal is outcome-focused (not "design the feature")
- [ ] All flows include edge cases
- [ ] Components table identifies create vs reuse
- [ ] Constraints include accessibility requirements
- [ ] Open questions have owners

## Anti-Patterns

- [ ] Do not write a design brief that describes the solution — the brief must describe the problem and constraints, not the design answer
- [ ] Do not skip the success criteria — designers need to know what "done" looks like before starting
- [ ] Do not omit existing components to reuse — briefs that ignore the design system lead to inconsistent implementations
- [ ] Do not leave open questions unresolved — escalate them before design work starts, not during it
- [ ] Do not confuse requirements with design instructions — the brief defines what, not how

## Example Trigger Phrases
- "Write a design brief for [feature]"
- "Turn this PRD into a Figma design brief"
- "Brief the designer on what to build for [requirement]"
- "Create a design spec for [feature] for Figma"
- "What does the designer need to know to design [feature]?"
