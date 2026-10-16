---
name: agent-spec
description: "Specify an autonomous or tool-using AI agent before building it. Use when asked to design an AI agent, define an agent's tools and guardrails, scope what an agent is allowed to do, or write an agent spec/PRD. Produces an agent spec — goal & scope, tools with permissions, the control loop, guardrails & approval gates, memory, escalation/handoff, evaluation, and failure handling."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/agent-spec.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# Agent Spec Skill

An agent is a model plus tools plus a loop — and the danger lives in the tools and the loop, not the
model. This skill specifies an agent so its *authority is explicit*: what it can do, what needs a human
yes, and what happens when it's wrong. Scope and guardrails first; cleverness second.

> **Not quite this?** Use `agent-observability-spec` when the agent is in production and needs tracing and alerting.

## Required Inputs

Ask for these only if they aren't already provided:

- **Job to be done** — the outcome the agent owns, and the boundary of its authority.
- **Tools/actions** — what it can call (read APIs, write actions, code execution), and which are irreversible.
- **Autonomy level** — fully autonomous, propose-then-approve, or co-pilot.
- **Risk surface** — what's the worst thing a wrong action could do (spend money, send a message, delete data)?
- **Success definition & escalation** — how "done" is judged, and when it must hand off to a human.

## Output Format

### Agent Spec: [name]

**1. Goal & scope** — the job in one sentence; explicit non-goals and authority limits.

**2. Tools / actions** — a table; mark each action's reversibility and required permission.

| Tool | Purpose | Reversible? | Gate |
|---|---|---|---|
| search_kb | read context | yes | none |
| send_email | notify | **no** | **human approval** |

**3. Control loop** — plan → act → observe → reflect; the stopping condition; and a hard **max-steps / max-cost budget** so it can't loop forever.

**4. Guardrails & approval gates** — which actions require a human yes (default: anything irreversible, outbound, or spending), input/output validation, and allow/deny lists. Pair irreversible actions with a dry-run preview (see [`action-runner`](../action-runner/SKILL.md)).

**5. Memory & state** — what it remembers within a task vs. across tasks, and where (link a [`professional-brain`](../professional-brain/SKILL.md) for durable memory).

**6. Escalation & handoff** — the triggers that stop the agent and route to a human (low confidence, repeated failure, out-of-scope request, high-risk action).

**7. Evaluation** — task success rate, action correctness, and safety (false-action rate). Define with an [`ai-eval-plan`](../ai-eval-plan/SKILL.md), and test on adversarial/trap tasks.

**8. Failure handling** — timeouts, tool errors, hallucinated tool calls, and the safe default (stop and ask, never guess on a high-risk action).

## Quality Checks

- [ ] Every tool is marked reversible/irreversible, and every irreversible action has a human gate
- [ ] There is a hard max-steps and max-cost budget — the loop cannot run unbounded
- [ ] Escalation triggers are explicit (confidence, repeated failure, out-of-scope, high-risk)
- [ ] The safe default on uncertainty is "stop and ask", not "guess and act"
- [ ] Evaluation includes a safety metric (wrong/unauthorised actions), not just task success
- [ ] Non-goals and authority limits are stated, not implied

## Anti-Patterns

- [ ] Do not give an agent irreversible actions without an approval gate — autonomy and irreversibility together is how agents cause real damage
- [ ] Do not omit a step/cost budget — an agent that can loop is an agent that can rack up cost or thrash forever
- [ ] Do not measure only task success — an agent that completes the task by taking a wrong action has failed
- [ ] Do not let the agent invent tool calls or arguments — validate against the schema and fail safe
- [ ] Do not skip the "what's the worst case" analysis — the risk surface determines how many guardrails you need

## Based On

Tool-using / agentic design practice — bounded control loops, least-privilege tools, human-in-the-loop approval, and safety evaluation.

## Example Trigger Phrases

- "Design an AI agent."
- "Define an agent's tools and guardrails."
- "Scope what an agent is allowed to do."
- "Write an agent spec/PRD."
