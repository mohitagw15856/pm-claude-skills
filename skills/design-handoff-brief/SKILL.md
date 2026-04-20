---
name: design-handoff-brief
description: "Transform feature briefs into structured design briefs that give designers the context they need before opening Figma. Use when asked to write a design brief, create a design handoff, brief a designer on a new feature, or translate a PRD into design requirements. Produces a brief with user goal, emotional context, success criteria, constraints, edge cases, and out-of-scope boundaries."
---

# Design Handoff Brief Skill

Produce a design brief that sets designers up for success — grounding them in user context and constraints before they open Figma, not after they've gone in the wrong direction.

## Required Inputs

Ask the user for these if not provided:
- **Feature brief or PRD** (even rough notes work)
- **Designer's name or team** (for personalisation)
- **Technical constraints** (any engineering limitations already known)
- **Timeline** (when does design need to be done?)

## What Designers Actually Need (and PMs Often Skip)
- The user's goal, not the feature name
- The emotional state of the user at this moment in the journey
- What success looks like — how will we know the design worked?
- Constraints: technical, legal, brand, accessibility
- Edge cases that must be handled
- What we're explicitly NOT solving for

## Process
1. Read the feature brief or PRD provided
2. Extract user goal (reframe from feature language to user outcome language)
3. Identify constraints — technical limitations, brand guidelines, accessibility requirements
4. List edge cases the design must handle
5. Define success criteria the design should be evaluated against
6. Write a "not in scope" section to prevent scope creep in design
7. **Validate** — Confirm every edge case listed is specific enough to design for, and every out-of-scope item is concrete enough to say "no" to

## Output Structure

### Design Brief: [Feature Name]

**User Goal:** (in the user's words, not ours)
"When I [situation], I want to [motivation] so that I can [outcome]."

**Context & Emotional State:**
[Where is the user in their journey? What are they feeling? What just happened?]

**Design Success Criteria:**
- [Criterion 1 — measurable where possible]
- [Criterion 2]
- [Criterion 3]

**Constraints:**
- Technical: [limitations engineering has flagged]
- Brand: [relevant brand guidelines]
- Accessibility: [WCAG level required, any specific requirements]
- Legal/Compliance: [if applicable]

**Edge Cases to Design For:**
- [Edge case 1]
- [Edge case 2]
- [Edge case 3]

**Explicitly Out of Scope:**
- [What we are NOT solving in this design iteration]

**Reference Material:**
- User research: [link]
- Existing patterns: [Figma component library link]
- Competitor examples: [links if relevant]

## Quality Checks

- [ ] User goal is written in user language (not feature/product language)
- [ ] At least one edge case covers an error or failure state
- [ ] Success criteria are measurable or observable (not "looks good")
- [ ] Out-of-scope section names at least one thing that might seem in scope but isn't
- [ ] Technical constraints are specific enough for an engineer to confirm
