---
name: context-engineering-review
description: "Review what an LLM feature or agent actually puts in its context window — and find what's bloating, missing, or fighting itself. Use when asked to review a system prompt and context assembly, cut token usage without losing quality, debug an agent that ignores instructions, or audit how retrieval results, history, and tool definitions are packed into the window. Produces a context inventory with a keep/cut/restructure verdict per component, ordering and caching fixes, and a token budget. For wording-level prompt tuning use prompt-optimizer."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/context-engineering-review.html
metadata:
  {
    "openclaw": { "emoji": "🦾" }
  }
---

# Context Engineering Review Skill

Most agent failures aren't model failures — they're context failures: instructions buried under retrieval dumps, stale history contradicting fresh facts, twelve tool definitions the task never needed. This skill audits the *assembled window*, not just the prompt text.

## What This Skill Produces

- A **context inventory**: every component in the window, its size, and who put it there
- A **keep / cut / restructure verdict** per component, with the reasoning
- **Ordering and cache-alignment fixes** (stable prefix first, volatile content last)
- A **token budget** per component with an enforcement point

## Required Inputs

Ask for (if not already provided):
- **A real assembled context** — an actual logged request (system prompt + messages + tools), not the template. If only the template exists, review that but flag that dynamic bloat is invisible
- **The failure or goal** — ignoring instructions? too expensive? inconsistent? slow?
- **What varies per request** (retrieval, history, user data) vs. what is static
- **The model and its context limit**, and current typical request size

## Review Method

**1. Inventory.** List every component in window order: system prompt sections, tool definitions, retrieved documents, conversation history, few-shot examples, injected state. For each: token count (estimate if unlogged), static vs. dynamic, and owner.

**2. Interrogate each component:**
- **Earning its tokens?** Would removing it change outputs on real traffic? The honest test is ablation, not intuition.
- **Right form?** Raw dumps (full HTML, whole files, unabridged history) almost always beat down to summaries, excerpts, or references the agent can expand via a tool.
- **Right position?** Instructions that must win go in the system prompt; volatile data goes late; nothing critical hides in the middle of a long window.
- **Fighting anything?** Contradictions between sections (persona says terse, examples are verbose; old history asserts what retrieval now refutes) are the classic "ignores instructions" root cause.

**3. Check the structural patterns:**
- **Cache alignment** — a byte-stable prefix (system prompt, tools) with per-request content after it; anything dynamic *inside* the prefix (timestamps, user names) breaks caching every request.
- **Tool sprawl** — tools the task can't need this turn dilute selection accuracy; load narrow toolsets per task or defer rarely-used schemas.
- **History policy** — unbounded transcripts are the top silent cost driver; define truncation/summarisation and what must survive it.
- **Retrieval discipline** — cap chunks by relevance score, not by k; label each chunk's source so the model can weigh it.

**4. Budget.** Assign each component a token ceiling that sums comfortably under the limit at p95, and name where it's enforced (the assembly code, not hope).

## Output Format

### Context Engineering Review: [feature/agent]

**Reviewed:** [a real request from date / the template]. **Current size:** [n] tokens typical, [n] p95, limit [n].

| # | Component | Tokens | Static? | Verdict | Fix |
|---|---|---|---|---|---|
| 1 | [system: persona] | | ✓ | Keep | — |
| 2 | [12 tool defs] | | ✓ | Restructure | [narrow per task] |
| 3 | [retrieval, k=20] | | dyn | Cut to k≤8 by score | |

**Conflicts found:** [each contradiction and which side should win]

**Ordering / caching:** [the reordered layout; what moves out of the stable prefix]

**Token budget:** [component → ceiling; enforcement point]. Projected size: [n] (−[x]%).

**Verify:** re-run [the eval suite / golden cases] after changes — cuts must be validated, not assumed safe (see `prompt-regression-suite`).

## Quality Checks

- [ ] The review used at least one real assembled request, or explicitly flags it could not
- [ ] Every verdict has a reason tied to the stated failure/goal, not generic advice
- [ ] Cache-breaking dynamic content in the stable prefix is called out with its cost
- [ ] The token budget sums under the model limit at p95 including output headroom
- [ ] Recommended cuts come with a validation step before they ship

## Anti-Patterns

- [ ] Do not review the prompt template and call it a context review — the bloat lives in the dynamic parts
- [ ] Do not recommend "shorten everything" — cutting the wrong 200 tokens costs more than keeping 2,000 idle ones
- [ ] Do not leave contradictions in place because each section "is fine alone" — the window is read as one document
- [ ] Do not treat more retrieval as more grounding — irrelevant chunks actively mislead
- [ ] Do not propose structure the assembly code can't enforce — a budget without an enforcement point is a wish

## Example Trigger Phrases

- "Review a system prompt and context assembly."
- "Cut token usage without losing quality."
- "Debug an agent that ignores instructions."
- "Audit how retrieval results."
