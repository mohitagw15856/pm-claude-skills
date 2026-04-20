---
name: ambiguity-resolver
description: "Structure vague opportunities and unclear briefs into actionable one-page problem statements. Use when asked to clarify a vague brief, frame an undefined problem, make sense of an unclear opportunity, or when the user says 'we need to figure out what to do about X' or 'I've been asked to look into Y'. Produces a structured problem brief with reframed questions, scoped boundaries, and a minimum viable research plan."
---

# Ambiguity Resolver Skill

Turn vague briefs and half-formed opportunities into structured, actionable problem statements — so you can reply with clarity instead of asking for three more meetings.

## Required Inputs

Ask the user for these if not provided:
- **The vague brief or opportunity description** (even a single sentence is enough)
- **Who asked for this** (stakeholder context shapes the framing)
- **Known constraints** (timeline, budget, team size — if any are known)

## Three-Stage Process

### Stage 1: Reframe
- Restate the vague input as 3-5 explicit questions that need answering
- Identify the unstated assumptions hidden in the brief
- Surface the real decision this feeds into (what will someone do differently once this is resolved?)

### Stage 2: Scope
- Define what is explicitly IN scope
- Define what is explicitly OUT of scope (equally important)
- Identify the deadline pressure: is this urgent/important, important/not urgent, or unclear?
- Name who owns the final decision and who needs to be consulted

### Stage 3: Action
- Define the minimum viable research: 2-3 activities maximum that would give enough signal to move forward with confidence
- Time estimate for each activity
- What each activity would tell you (and what it wouldn't)
- Proposed check-in point: when to regroup before committing to more

**Validate** — Confirm every reframed question maps to at least one research activity. Verify scope boundaries are specific enough to say "no" to something concrete.

## Output Structure

### Problem Brief: [Opportunity Area]

**Restated as questions:**
1. [Question 1]
2. [Question 2]
3. [Question 3]

**Unstated assumptions we should surface:**
- [Assumption 1]
- [Assumption 2]

**In scope:** [Clear boundary]
**Out of scope:** [Clear boundary]
**Decision owner:** [Name/role]
**Timeline:** [Real deadline if known, or "unclear — recommend setting one"]

**Minimum viable research:**
| Activity | Time required | What it tells us | What it won't tell us |
|----------|--------------|------------------|-----------------------|
| [activity] | [time] | [insight] | [limitation] |

**Proposed check-in:** After [activity], regroup to decide whether to proceed or pivot.

## Example (Partial)

Input: *"We need to figure out what to do about our enterprise customers."*

**Restated as questions:**
1. Are enterprise customers churning, underperforming on expansion, or both?
2. Is this a product gap, a support/service gap, or a pricing/packaging issue?
3. What does "do something" look like — a new initiative, a policy change, or a resource shift?

**In scope:** Enterprise accounts ($50K+ ARR) showing declining health scores in the last two quarters
**Out of scope:** SMB segment, new enterprise acquisition strategy

## Quality Checks

- [ ] Every reframed question is specific enough to research (not "how do we improve things?")
- [ ] Scope boundaries name something concrete that is excluded
- [ ] Research activities are achievable within the stated timeline
- [ ] Decision owner is identified (not "leadership" — a specific person or role)
