---
name: llm-cost-latency-budget
description: "Model the cost and latency of an LLM feature before it ships and surprises the bill. Use when asked to estimate LLM API costs, set a latency/token budget, decide which model tier to use, or bring down the cost of an AI feature. Produces a cost & latency budget — token math per request, monthly cost projection, model tiering, caching/streaming levers, p95 latency targets, and a guardrail/alert plan."
---

# LLM Cost & Latency Budget Skill

LLM features have a unit cost and a tail latency that demos hide and production exposes. This skill does
the token math up front — what one request costs, what a million cost, where the p95 latency comes from —
and lays out the levers (model tiering, caching, prompt trimming) so cost and speed are designed, not discovered.

## Required Inputs

Ask for these only if they aren't already provided:

- **The request shape** — typical system prompt, user input, retrieved context, and output sizes (in rough tokens).
- **Volume** — requests/day now and at target scale; peak concurrency.
- **Models in play** — candidate model(s) and their per-token input/output prices.
- **Targets** — acceptable cost per request (or per user/month) and the latency users will tolerate (p50 / p95).

## Output Format

### Cost & Latency Budget: [feature]

**1. Per-request token math** — a table estimating tokens in/out per call, and the resulting cost at each candidate model's price.

| Component | Tokens | $ in | $ out |
|---|---|---|---|
| System prompt | | | |
| Retrieved context | | | |
| User input | | | |
| Output | | | |
| **Per request** | | **$x** | |

**2. Monthly projection** — per-request cost × volume, at current and target scale; the headline number leadership will ask for.

**3. Model tiering** — route easy requests to a cheaper/faster model and only escalate hard ones (cascade); show the blended cost. Often the single biggest saving.

**4. Latency** — where the p95 comes from (model TTFT + output length + retrieval + network), the target, and how **streaming** changes *perceived* latency even when total time is unchanged.

**5. Cost levers** — ranked by impact: prompt/context trimming, caching (prompt cache + response cache for repeats), shorter outputs (max_tokens), batching, tiering, and "do you need the model at all for this path."

**6. Guardrails** — per-user / per-day rate limits, a max-tokens cap, a spend alert threshold, and a kill switch — so a bug or abuse can't produce a surprise invoice.

## Quality Checks

- [ ] Token estimates are itemised (system + context + input + output), not a single guessed number
- [ ] The monthly cost is projected at **target** scale, not just today's volume
- [ ] Model tiering / cascade is considered before accepting the flagship-model cost everywhere
- [ ] p95 (not just average) latency is targeted, and streaming is considered for perceived speed
- [ ] Caching is evaluated for repeated prompts/contexts
- [ ] A spend alert + rate limit + kill switch are specified to cap the downside

## Anti-Patterns

- [ ] Do not budget on average latency — users feel the p95, and the tail is where AI features feel broken
- [ ] Do not default every call to the most capable model — most requests don't need it; tiering often cuts cost by more than half
- [ ] Do not forget output tokens cost more than input — verbose responses are often the hidden cost driver
- [ ] Do not ship without a spend cap and alert — an unbounded LLM feature is an unbounded bill
- [ ] Do not optimise cost before measuring it — itemise the real token usage first, then pull the biggest lever

## Based On

LLM production cost/latency practice — token accounting, model cascades/tiering, prompt & response caching, and tail-latency budgeting.

## Example Trigger Phrases

- "Estimate LLM API costs."
- "Set a latency/token budget."
- "Decide which model tier to use."
- "Bring down the cost of an AI feature."
