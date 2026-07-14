---
name: ai-feature-prd
description: "Write a PRD for an AI-powered feature, covering the things normal PRDs miss. Use when asked to spec an AI/LLM feature, write a PRD for a feature that uses a model, or plan an AI capability (assistant, summarizer, generator, classifier). Produces an AI feature PRD — problem & UX of uncertainty, model approach, eval criteria, guardrails, fallback behaviour, the data flywheel, and cost/latency budget."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ai-feature-prd.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# AI Feature PRD Skill

AI features break the normal PRD because the system is probabilistic: it will be wrong sometimes, and
the product must be designed around that, not in denial of it. This skill extends a standard PRD with
the AI-specific sections that decide whether the feature is trustworthy — the UX of uncertainty, the
eval bar, guardrails, and what happens when the model is wrong.

## Required Inputs

Ask for these only if they aren't already provided:

- **The user problem** and why an AI/probabilistic approach fits it (vs. deterministic rules).
- **What "good" looks like** to the user, and the cost of a wrong answer (low-stakes vs. high-stakes).
- **Inputs available** — context/data the model can use; privacy constraints.
- **Trust level needed** — can the user verify the output, or must it be near-perfect?

## Output Format

### AI Feature PRD: [feature]

**1. Problem & why AI** — the user problem, and why a model (not rules) is the right tool. If rules would do, say so.

**2. Experience** — the core flow, and crucially the **UX of uncertainty**: how confidence is shown, how the user verifies/edits, and how errors are made cheap to recover from. AI features live or die here.

**3. Model approach** — prompt / fine-tune / RAG / agent (link [`rag-design-doc`](../rag-design-doc/SKILL.md) or [`agent-spec`](../agent-spec/SKILL.md)), the model tier, and why.

**4. Quality bar & evaluation** — the metrics and the explicit ship threshold; reference an [`ai-eval-plan`](../ai-eval-plan/SKILL.md). State the acceptable error rate given the stakes.

**5. Guardrails & safety** — what the feature must never do, input/output filtering, and handling of harmful/PII/out-of-scope inputs.

**6. Fallback behaviour** — what happens when the model is unsure, wrong, slow, or down: graceful degradation, "I'm not sure" states, human handoff. **No silent confident errors.**

**7. Data flywheel** — how usage (and the 👍/👎 / edits) feed back into evaluation and improvement, with the privacy boundary.

**8. Cost & latency** — the per-request budget and p95 target; reference an [`llm-cost-latency-budget`](../llm-cost-latency-budget/SKILL.md).

**9. Rollout** — staged exposure (internal → %→ GA), the guardrail metrics watched, and the rollback trigger.

## Quality Checks

- [ ] The PRD designs for the model being wrong — there's an explicit fallback, not just the happy path
- [ ] The UX shows uncertainty and lets the user verify/correct cheaply
- [ ] There's an explicit quality bar tied to the stakes (a medical answer and a tweet draft are not the same bar)
- [ ] Guardrails name what the feature must never do
- [ ] A data flywheel is defined with its privacy boundary
- [ ] Cost and p95 latency budgets are stated, not left to "we'll see"

## Anti-Patterns

- [ ] Do not design only the happy path — a probabilistic feature without a fallback is a feature that fails loudly in production
- [ ] Do not hide uncertainty behind a confident UI — overclaimed confidence is how AI features lose user trust permanently
- [ ] Do not use AI where deterministic rules are better, cheaper, and more reliable — "AI" is not the goal
- [ ] Do not set one quality bar for all stakes — calibrate the acceptable error rate to the cost of being wrong
- [ ] Do not ship without a rollback trigger and guardrail metrics — a probabilistic system needs a kill switch

## Based On

Standard PRD practice (see [`prd-template`](../prd-template/SKILL.md)) extended for probabilistic systems — uncertainty UX, eval gates, guardrails, and graceful fallback.
