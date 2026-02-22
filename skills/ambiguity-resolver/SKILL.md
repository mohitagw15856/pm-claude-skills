---
name: ambiguity-resolver
description: Structures vague opportunities and unclear briefs into actionable 
one-page problem statements. Use when user has a vague brief, undefined problem, 
unclear opportunity, or says "we need to figure out what to do about X", "can 
you help me make sense of this", or "I've been asked to look into Y".
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: discovery
  tags: [discovery, strategy, problem-framing, ambiguity]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Ambiguity Resolver Skill

## Purpose
Turn vague briefs and half-formed opportunities into structured, actionable 
problem statements — so you can reply with clarity instead of asking for three 
more meetings.

## Three-Stage Process

### Stage 1: Reframe
- Restate the vague input as 3-5 explicit questions that need answering
- Identify the unstated assumptions hidden in the brief
- Surface the real decision this feeds into (what will someone do differently 
  once this is resolved?)

### Stage 2: Scope
- Define what is explicitly IN scope
- Define what is explicitly OUT of scope (equally important)
- Identify the deadline pressure: is this urgent/important, important/not urgent,
  or unclear?
- Name who owns the final decision and who needs to be consulted

### Stage 3: Action
- Define the minimum viable research: 2-3 activities maximum that would give 
  enough signal to move forward with confidence
- Time estimate for each activity
- What each activity would tell you (and what it wouldn't)
- Proposed check-in point: when to regroup before committing to more

## Output Format

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
| Activity | Time required | What it tells us |
|----------|--------------|------------------|
| [activity] | [time] | [insight] |

**Proposed check-in:** After [activity], regroup to decide whether to proceed 
or pivot.
