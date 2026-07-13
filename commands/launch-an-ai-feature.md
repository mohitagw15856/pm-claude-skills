---
description: Workflow recipe — take an AI/LLM feature from a probabilistic-aware PRD to a launch-ready model card by chaining 5 skills.
argument-hint: "[the AI feature idea]"
---

Run the **Launch an AI Feature** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next — that shared context is the whole point. Open with a one-line plan of the 5 stages, then ask once for any essential missing inputs (the user problem, the stakes / cost of a wrong answer, the data available). Don't re-ask between stages.

Run each stage under a clear `## Stage N — <name>` heading:

1. **Spec it** — apply the `ai-feature-prd` skill to turn the idea into a PRD built for a probabilistic system: the UX of uncertainty, guardrails, fallback behaviour, and an explicit quality bar tied to the stakes.
2. **Design the system** — apply the `rag-design-doc` skill (or note if an agent is the better fit — see `agent-spec`) to design retrieval/generation: chunking, retrieval, reranking, grounded answers, and the failure-mode table.
3. **Plan evaluation** — apply the `ai-eval-plan` skill to define datasets, rubrics, baselines, the explicit ship threshold, and the regression gate.
4. **Budget cost & latency** — apply the `llm-cost-latency-budget` skill for per-request token math, model tiering, caching, p95 targets, and spend guardrails.
5. **Document it** — apply the `model-card` skill to produce a launch-ready card: intended use, sliced evaluation, limitations, and a rollback trigger.

Do not invent metrics, costs, or eval results — note assumptions instead. After the last stage, end with a 5-bullet **"What you now have"** recap linking each artifact to the stage that produced it.
