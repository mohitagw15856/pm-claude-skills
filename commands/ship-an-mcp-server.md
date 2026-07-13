---
description: Workflow recipe — make your product agent-usable by chaining 4 skills, spec to pricing.
argument-hint: "[the product and its API/capabilities, plus what agents will be asked to do]"
---

Run the **Ship an MCP Server** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next. Open with a one-line plan of the 4 stages, then ask once for any essential missing inputs (the product's top user jobs, the existing API surface, the riskiest actions, current pricing model). Don't re-ask between stages.

Run each stage under a clear `## Stage N — <name>` heading:

1. **Spec the server** — apply the `mcp-server-spec` skill: a task-shaped toolset (3-10 tools, never an API mirror), auth model, gated actions, the never-exposed list, and the agent test plan.
2. **Audit readiness** — apply the `agent-readiness-audit` skill across all six surfaces (discovery, docs, API/auth, errors, onboarding, guardrails), quoting the failing artifacts; feed the spec from stage 1 so the audit checks against what will actually ship.
3. **Fix the pricing** — apply the `agent-era-pricing` skill: the value metric that survives non-human users, tier fences with named gaming vectors, and cannibalisation math on representative cohorts — informed by which tools stage 1 exposed and what usage they'll drive.
4. **Design the oversight** — apply the `human-in-the-loop-design` skill to every gated action from stage 1: action tiers, the approval budget, escalation rules, and the audit trail.

Close with a **one-page rollout summary**: the toolset, the top 3 readiness fixes, the pricing decision, and the approval policy — the packet an eng lead and a pricing owner could execute from.
