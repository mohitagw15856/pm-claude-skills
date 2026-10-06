---
name: agent-design-review
description: "Review an LLM agent design and find where it will be unreliable, expensive, or unsafe. Use when asked to review an agent architecture, critique a multi-step/tool-using agent, debug an agent that loops or goes off-task, or harden an agent before launch. Produces a structured review — task fit, control flow, tools, memory/context, failure handling, cost, and safety — with prioritised findings and fixes."
---

# Agent Design Review Skill

Most agents don't fail because the model is weak — they fail because the *design* lets them loop, call the
wrong tool, lose the thread across steps, or burn tokens with no stopping rule. This skill reviews an agent's
architecture against the decisions that actually determine reliability, and ranks the fixes — so "it works in
the demo but not in prod" becomes a specific list of changes. (Writing a new agent spec? Use
[`agent-spec`](../agent-spec/SKILL.md).)

## Working from a brief

Given a sketch ("a research agent that searches, reads, and writes a report"), **deliver the full review
anyway** — infer the likely control flow and tools, label the inference, and flag what to confirm. Never
withhold the review for missing detail.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **What the agent does** — its goal, and what a successful run produces.
- **Control flow** — single prompt, plan-then-execute, ReAct loop, or multi-agent; and the stopping condition.
- **Tools & actions** — what it can call, and which actions have side effects (write, send, pay).
- **Memory & context** — what state carries across steps, and how context is kept in budget.
- **Constraints** — latency, cost per run, and the trust boundary (untrusted input? real-world actions?).

## Output Format

### Agent Review: [agent]

**1. Summary** — will this be reliable in production? The top 3 risks and the single change that helps most.

**2. Findings by dimension** — for each, what's sound and what's fragile:

| Dimension | Finding | Severity | Fix |
|---|---|---|---|
| Control flow | no max-steps / no progress check → loops | High | step budget + "am I making progress?" check + halt |
| Tool use | overlapping tools confuse selection | Med | fewer, sharply-described tools; allowlist |
| Context | full history re-sent each step → cost + drift | High | summarise/scope memory per step |
| Failure handling | one tool error aborts the run | Med | retry/backoff + graceful degradation |
| Safety | acts without confirmation on writes | High | human/confirm gate on side-effecting actions |

**3. Reliability checklist** — termination guarantee (it always stops), error recovery, idempotency of
side-effecting actions, and determinism where it matters.

**4. Cost & latency** — where tokens/steps are spent and how to cut them (cheaper model for sub-steps, caching, fewer round-trips) without losing quality. Pair with [`llm-cost-latency-budget`](../llm-cost-latency-budget/SKILL.md).

**5. Safety** — untrusted input/tool output handled as data not instructions, least-privilege tools, and
confirmation gates on high-impact actions. Pair with [`llm-guardrails-spec`](../llm-guardrails-spec/SKILL.md).

**6. Prioritised fix plan** — ordered by impact-to-effort.

## Quality Checks

- [ ] The agent has a guaranteed stopping condition (step/budget cap + progress check) — no unbounded loops
- [ ] Side-effecting actions are idempotent or gated by a confirmation
- [ ] Tools are few and sharply described so selection is unambiguous; access is least-privilege
- [ ] Context strategy keeps the window in budget across steps (no naive full-history resend)
- [ ] Tool errors are recovered, not fatal — retry/backoff and graceful degradation
- [ ] Findings are severity-ranked and the fix plan is ordered by impact

## Anti-Patterns

- [ ] Do not approve an agent with no termination guarantee — "it usually stops" is an outage waiting to happen
- [ ] Do not let it take irreversible actions without a confirmation gate
- [ ] Do not give it many overlapping tools — selection accuracy drops as the toolset grows
- [ ] Do not resend the whole history every step — cost and drift both climb
- [ ] Do not treat tool/retrieved output as trusted instructions — it's the injection surface

## Based On

LLM agent design practice — bounded control flow, least-privilege tool use, context management, error recovery, and safety gating.

## Example Trigger Phrases

- "Review an agent architecture."
- "Critique a multi-step/tool-using agent."
- "Debug an agent that loops."
- "Harden an agent before launch."
