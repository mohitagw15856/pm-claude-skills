# Figma Design Review Skill

Runs a structured PM design review — checking that a design meets product requirements, covers all user flows, and is ready for engineering. This is a requirements-and-outcomes review, not an aesthetic critique.

## Required Inputs

- **Design description or screen summary**
- **Original requirements** (PRD snippet, ticket, or acceptance criteria)
- **User flow being designed**
- **Review stage** (concept / mid-fidelity / pre-handoff final)

## Output Structure

### 1. Review Header
Feature, review stage, reviewed by, date.
**Overall status:** Approved / Approved with changes / Needs revision

### 2. Requirements Coverage Check

| Requirement | Covered? | Notes |
|---|---|---|
| [Requirement from PRD] | Yes/No/Partial | [Specific observation] |

Missing coverage summary: [Requirements not addressed — must resolve before approval]

### 3. User Flow Completeness

| Flow step | Designed? | Issues |
|---|---|---|
| [Step] | Yes/No/Partial | [Issue] |
| Error state | Yes/No | |
| Empty state | Yes/No | |
| Loading state | Yes/No | |

### 4. PM Concerns

**[Concern] — Blocking / Should fix / Nice to fix**
- What: [Specific observation]
- Why it matters: [Business or user impact — not aesthetic preference]
- Suggested resolution: [What PM wants to see]

### 5. Open Questions

| Question | Owner | Needed by |
|---|---|---|
| [Question] | Designer/Eng/PM | [Date] |

### 6. Approval Decision
Approved / Approved with changes (list) / Needs revision (focus area + next review date)

## Quality Checks
- [ ] Every requirement assessed
- [ ] All flow states checked (error, empty, loading)
- [ ] Concerns are outcome-focused not aesthetic
- [ ] Open questions have owners
- [ ] Approval status is explicit

## Anti-Patterns

- [ ] Do not review a design without a list of requirements to check against — always ask for the PRD, design brief, or acceptance criteria first
- [ ] Do not give a vague approval status — the decision must be explicitly "approved", "approved with conditions", or "not approved"
- [ ] Do not conflate requirements gaps with UX concerns — track them separately so engineers and designers can act independently
- [ ] Do not raise concerns without suggesting what information is needed to resolve them
- [ ] Do not skip open questions — unresolved assumptions at review time become bugs after engineering handoff

## Example Trigger Phrases
- "Review this Figma design against the requirements"
- "Do a PM design review for [feature]"
- "Check if this design meets the product spec"
- "Is this design ready to hand off to engineering?"
- "What is missing from this design before we can build it?"
