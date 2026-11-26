---
description: Team recipe — take an idea to a shipped, launched feature by having the product-director subagent split the work across the specialist subagents.
argument-hint: "[the idea, problem or goal]"
---

Run the **Ship with the Director** team recipe for: $ARGUMENTS

Use the `product-director` subagent to coordinate. It owns no artefact itself: it assigns each stage to exactly one specialist subagent, passes each stage's output forward as context, and consolidates the result. If subagents are not installed, play each role yourself in the same order and say so.

Open with a one-line plan naming the stages and their owners, then run each stage under a `## Stage N: <name> (owner)` heading:

1. **Evidence** (`research-lead`): what is known about the user need, how many sources it rests on, and the riskiest unproven assumption.
2. **Measure** (`data-analyst`): the success metric with its definition, baseline and time window, and how the result will be tested.
3. **Define** (`pm-partner`): the PRD with goals, non-goals and requirements, built on stages 1 and 2, with its priority argued.
4. **Deliver** (`sprint-master`): the sprint plan sized against real capacity, with user stories and dependencies.
5. **Launch** (`launch-captain`): positioning, the go-to-market plan and the launch checklist.
6. **After launch** (`cs-guardian`): which accounts to watch, the health signals and the escalation path.

Rules for the director:
- One owner per stage. If two specialists disagree, state both positions and the trade-off, and recommend; do not average.
- Stop and ask the user before any stage would have to invent a metric, a date, a customer name or a budget.
- Carry facts forward as facts and assumptions as assumptions. Never let a later stage restate an earlier assumption as settled.

End with **"What you now have"**: one bullet per stage linking the artefact to its owner, then **"Decisions for you"**: the open choices, each with the specialist who raised it.
