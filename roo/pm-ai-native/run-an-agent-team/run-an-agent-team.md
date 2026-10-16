# Run an Agent Team

Complex tasks overwhelm a single AI agent — the context gets muddy, quality drops, and it does everything serially. A small team of specialized agents, each with a focused role and clean context, can tackle it in parallel and check each other's work. This designs that team for your task: the roles, how they coordinate and hand off, what context each needs (and what to isolate), and the guardrails — turning "one agent doing everything" into a coordinated effort.

## What This Skill Produces

- **The task decomposition** — the task broken into distinct agent roles, each with a focused responsibility (researcher, drafter, critic, integrator, etc.)
- **A coordination pattern** — whether agents run in parallel or sequence, how their outputs combine, and where the hand-offs are
- **Context design** — what each agent needs to know, and (crucially) what to keep *isolated* so one agent's context doesn't muddy another's (the key to why teams beat one agent)
- **A review/quality step** — a separate agent or pass to critique and integrate, so quality is checked, not assumed
- **Guardrails** — how to keep the team on track (clear objectives, defined outputs, a human checkpoint) and avoid runaway loops or drift
- **A right-sized recommendation** — including when a single agent is genuinely better (not everything needs a team)

## Required Inputs

Ask for these if not provided:
- **The task** — the complex thing you want a team to tackle
- **Your setup** — the AI tool/framework you're using (Claude Code sub-agents, an agent framework, or manual multi-chat)
- **The subtasks** — the natural pieces, if you can see them
- **Quality bar & stakes** — how much the output matters (drives the review rigor)
- **Constraints** — cost, time, and how much human oversight you want

## Framework: Decompose, Isolate, Coordinate, Review

1. **Check it needs a team.** Not every task does — if it's simple or highly sequential with shared context, one agent is better. Use a team when parts are genuinely parallel or benefit from distinct, isolated perspectives.
2. **Decompose into roles.** Break the task into focused responsibilities, each an agent — a researcher, a builder, a critic, an integrator — so each has one clear job.
3. **Isolate context deliberately.** The power of a team is clean, separate context per agent — decide what each needs and what to keep apart, so perspectives stay distinct and context stays sharp.
4. **Choose the coordination pattern.** Parallel (independent then combine), sequential (hand-offs), or a mix — and define exactly how outputs pass between agents and merge.
5. **Add a review pass.** A separate critic/integrator step catches errors and combines the work — don't trust unreviewed parallel output.
6. **Guardrail it.** Clear objectives, defined output formats, iteration limits, and a human checkpoint keep the team from drifting or looping.

## Output Format

### Agent team: task [x] · setup [y]

**Needs a team?** [yes — parts are parallel/benefit from isolation / no — one agent is better because Z].
**Roles**
| Agent | Responsibility | Context it needs / isolate |
|---|---|---|
| [researcher] | | |
| [builder] | | |
| [critic] | | |
| [integrator] | | |

**Coordination:** [parallel / sequential / mix] — outputs combine by [how].
**Review pass:** [critic/integrator checks & merges].
**Guardrails:** clear objectives · defined outputs · iteration limit · human checkpoint.

## Quality Checks
- [ ] Checks whether a team is actually warranted (vs one agent)
- [ ] Decomposes into focused agent roles
- [ ] Deliberately designs isolated vs shared context (the key advantage)
- [ ] Defines the coordination pattern and how outputs combine
- [ ] Includes a review/integration pass
- [ ] Adds guardrails against drift and runaway loops

## Anti-Patterns
- **Using a team** for a task one agent handles better.
- **Agents with muddy, shared context** (loses the whole advantage).
- **No review pass** — trusting unchecked parallel output.
- **Vague roles** that overlap and conflict.
- **Missing guardrails** — runaway loops or drift with no human checkpoint.

## Example Trigger Phrases
- "How do I use multiple AI agents to build this?"
- "Set up an agent team to research and write this report."
- "Orchestrate several agents for this complex task."
- "Should this be one agent or a team, and how do I structure it?"
- "Design a parallel agent workflow for this."
