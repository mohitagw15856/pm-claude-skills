---
trigger: model_decision
description: "Create a Product Requirements Document following proven PM template structure. Use when asked to write a PRD, product spec, feature specification, or requirements document for a new feature or product. Produces a complete PRD with problem statement, user stories, functional requirements, technical considerations, and success metrics."
---

# PRD Template Skill

This skill helps create professional Product Requirements Documents following industry best practices.

## Where this sits — the middle of the spine

Second in the product-decision spine: **`/assumption-mapper` → `prd-template` →
`/rice-prioritisation` → `/roadmap-narrative`**. It receives **the riskiest assumption**
from `/assumption-mapper` (if that ran, read its map instead of re-guessing the risks)
and hands `/rice-prioritisation` **the PRD's success metric** — the one baselined number
that becomes RICE's *Impact*. Shared terms (problem statement, hypothesis, success
metric, provenance) live once in
[`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md); use them
exactly.

## The loop

A PRD is written outside-in — problem before solution, always — in four phases. Phase 1
is load-bearing: a PRD built on a fuzzy problem is polished the whole way down and still
wrong.

1. **Lock the problem statement.** One sentence: who has what problem, when, and the
   cost of leaving it. No solution language. Everything below must ladder to this.
   **Done when:** the problem statement stands alone with no feature named in it, and a
   stranger could tell what "solved" means.
2. **Baseline the success metric.** The one number that proves the problem got solved —
   with its *current baseline* and the move that counts as success. Carry any upstream
   `/assumption-mapper` risk here as an Open Question, not a silent bet.
   **Done when:** the metric has a baseline (or is explicitly flagged un-baselined),
   and it measures the problem, not activity.
3. **Draft the sections, each tracing up.** Fill the template (below) so every
   requirement and story traces to the problem statement; drop anything that doesn't.
   Tag facts with provenance — a guessed number is a [hunch], labeled.
   **Done when:** every requirement traces to the problem statement, and every claimed
   fact carries [data]/[hunch]/[assumption].
4. **Hand off.** Surface the success metric and the initiative(s) so
   `/rice-prioritisation` can score Impact from *this* metric, not a re-invented one.
   **Done when:** the PRD names the metric and scope `/rice-prioritisation` would need
   to score it without re-asking.

## Required Inputs

Ask the user for these if not provided:
- **Feature or product name**
- **Problem being solved** (from the user's perspective)
- **Target user** (role, context, what they're trying to accomplish)
- **Success metrics** (how will you know it worked?)
- **Scope** (MVP vs full vision — what's in and out of scope)
- **Key stakeholders** (who needs to review and approve)

## Reads from / Writes to the Brain

If a [`professional-brain`](../professional-brain/SKILL.md) (`brain/`) exists, use it instead of asking for context you already have:

- **Read first:** `context.md` (product, metrics definitions, voice), `knowledge/strategy.md`
  (where the product is going), any related `hypotheses/` and the matching `entities/` feature
  file. Run `python3 ../professional-brain/scripts/brain_query.py ./brain "<feature>"` to pull
  grounded facts, and carry their provenance tags into the PRD (don't present a `[hunch]` as a
  settled requirement).
- **Write after:** save the feature as/into `entities/<feature>.md`, log any scoping decision to
  `decisions/`, and add new assumptions to `hypotheses/`. Tag each with its provenance.

## Deeper Materials

This skill ships with two support files — use them when they're available:

- **`templates/prd-skeleton.md`** — a fill-in PRD skeleton with a "what good looks like" hint per section. Start from it when the user wants a document to complete themselves rather than a generated draft.
- **`references/success-metrics-guide.md`** — calibration for the Success Metrics section: the four-part metric test, the standard adoption/outcome/business/guardrail set, and the common traps. Consult it whenever writing or reviewing the metrics table.

## Template Structure

Every PRD should include these sections in order:

### 1. Overview
- **Problem Statement**: What problem are we solving? (2-3 sentences)
- **Proposed Solution**: High-level description of what we're building (2-3 sentences)
- **Success Metrics**: How we'll measure success (3-5 key metrics)

### 2. Context & Background
- **Why Now**: Why is this the right time?
- **Strategic Alignment**: How does this align with company objectives?
- **User Research Summary**: Key insights from research (if applicable)

### 3. User Stories & Use Cases
Format: "As a [user type], I want to [action] so that [benefit]"
- Include 3-7 primary user stories
- Add acceptance criteria for each

### 4. Requirements
**Functional Requirements:**
- Must-have features (P0)
- Should-have features (P1)
- Nice-to-have features (P2)

**Non-Functional Requirements:**
- Performance expectations
- Security considerations
- Accessibility requirements

### 5. Design & User Experience
- Link to design mocks or wireframes
- Key user flows
- Edge cases and error states

### 6. Technical Considerations
- Architecture implications
- Dependencies on other systems
- Technical risks and mitigations

### 7. Implementation Plan
- **Phase 1 (MVP)**: What goes in first version
- **Phase 2**: What comes next
- **Phase 3**: Future enhancements

### 8. Open Questions
- Decisions that still need to be made
- Stakeholders to consult
- Research needed

### 9. Appendix
- Research links
- Related documents
- Competitive analysis

## Writing Guidelines

**Tone**: Clear, concise, actionable
**Audience**: Engineers, designers, stakeholders
**Length**: Aim for 3-6 pages for features, 8-12 for products

**Best Practices:**
- Use concrete examples over abstractions
- Include "why" not just "what"
- Make requirements testable
- Link to supporting materials
- Update as decisions are made

## What Makes a Good PRD

✅ **Do:**
- Write from the user's perspective
- Include specific success metrics
- Address edge cases
- Link to research and data
- Make trade-offs explicit

❌ **Don't:**
- Write implementation details (that's tech spec)
- Assume everyone has context
- Leave requirements ambiguous
- Skip the "why"
- Forget about accessibility

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| **Problem grounding** | Problem stated from the company's perspective, or asserted with no evidence | User-framed problem, but the supporting data is vague ("users are frustrated") and research isn't cited | Problem is the user's, quantified with current-state data, and Why Now explains what changed; claims trace to cited research |
| **Requirement testability** | Requirements are vague qualities ("fast", "intuitive") a reviewer couldn't verify | Most requirements are concrete, but acceptance criteria are thin and non-functional requirements are boilerplate | Every P0/P1/P2 item and NFR is verifiable (thresholds, percentiles, standards), and each traces to a user story or research finding |
| **Metric rigor** | Success metrics missing, or percentages with no baseline | Baselines and targets present, but metrics only measure adoption — nothing would catch the feature succeeding while the business loses | Every metric has baseline → target, the set covers outcome as well as adoption, and at least one guardrail protects against winning the metric while harming the user |
| **Scope & risk honesty** | MVP and future phases blur together; no open questions listed | Phases are separated, but the reasons for the cut-lines are absent and disagreements are smoothed over | Each phase boundary has a stated reason, out-of-scope asks are recorded with re-entry conditions, and open questions carry an owner, a deadline, and the cost of each answer |

## Quality Checks

- [ ] Problem statement is written from the user's perspective (not the company's)
- [ ] Success metrics are specific and measurable
- [ ] User stories include acceptance criteria
- [ ] Requirements are testable (not vague)
- [ ] Open questions are listed explicitly
- [ ] Implementation plan distinguishes MVP from future phases

## Anti-Patterns

- [ ] Do not write requirements from the company's perspective — every requirement must trace back to a user need
- [ ] Do not include vague requirements like "the system should be fast" — every requirement must be testable
- [ ] Do not conflate MVP with future phases — be explicit about what is and is not in scope for the first release
- [ ] Do not leave success metrics as percentages without baselines — specify the current state and the target
- [ ] Do not skip open questions — unresolved assumptions are risks; surfacing them is the PM's job

## Example PRD Opening

```
# PRD: Multi-Channel Customer Support Dashboard

## Overview

**Problem Statement**: Support teams are currently managing customer inquiries across email, chat, and social media using three separate tools, leading to delayed responses, duplicated work, and inconsistent customer experiences. On average, support agents waste 2.3 hours per day switching between tools and manually tracking conversation history.

**Proposed Solution**: Build a unified dashboard that aggregates customer inquiries from all channels into a single interface, maintains conversation history across channels, and provides intelligent routing based on agent expertise and availability.

**Success Metrics**:
- Reduce average response time from 4 hours to 1 hour
- Decrease tool-switching time by 80% (from 2.3 to <0.5 hours)
- Improve customer satisfaction score from 3.8 to 4.5 (out of 5)
- Increase support agent productivity by 35%

## Context & Background

**Why Now**: Customer satisfaction has declined 15% over the past 6 months, primarily due to slow response times. Our top competitor launched a unified support dashboard last quarter, and we're hearing about it in sales calls. Support team turnover is at 45% annually, with "tool complexity" cited as a top frustration.

**Strategic Alignment**: This aligns with our Q1 company objective to "Improve customer retention by 10%" and our support team's OKR to "Reduce average handle time by 25%."

**User Research Summary**: We conducted interviews with 12 support agents and observed 20 hours of support sessions. Key findings:
- Agents spend 35% of their time finding context from previous interactions
- 65% of escalations are due to lack of conversation history
- Agents rated tool-switching as their #1 daily frustration (9.2/10 pain)
- Current NPS for support experience is -12

## User Stories & Use Cases

**US1: Unified Inbox**
As a support agent, I want to see all customer inquiries in one place so that I don't miss urgent requests and can prioritize effectively.

Acceptance Criteria:
- Inbox shows inquiries from email, chat, and social media
- Inquiries are sorted by priority (urgent, high, normal, low)
- Agent can filter by channel, customer, or status
- Real-time updates when new inquiries arrive

**US2: Cross-Channel Context**
As a support agent, I want to see the full conversation history regardless of channel so that I can provide consistent, informed responses without asking customers to repeat themselves.

Acceptance Criteria:
- Timeline view shows all interactions chronologically
- Each interaction displays channel, timestamp, and content
- Customer profile shows demographics and account information
- Previous issues and resolutions are accessible

[Continue with 5-7 total user stories...]
```
