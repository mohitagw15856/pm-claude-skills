---
name: context-budget
description: "Plan a session's context window like the budget it is — what loads up front, what gets linked instead, what stays fetch-on-demand, and how to keep the stable prefix cache-friendly so repeated turns cost cents instead of dollars. Use when asked my agent keeps blowing its context, plan what to load into the session, why is every turn so expensive, or design the context for this workflow. Produces the load/link/fetch allocation, the cache-aware prefix layout, the per-turn cost shape, and the eviction rules for when the window fills anyway."
---

# Context Budget Skill

A context window is a budget that gets re-spent every single turn — everything sitting in it rides every call, which is how a session that "only loaded a few files" ends up paying for them forty times. This skill plans the spend before the session: what earns a permanent seat (loaded once, up front, stable), what gets *linked* (a map or index, with the full thing fetch-on-demand), and what never enters at all. The quiet second half is cache-awareness: providers price cached prefix tokens at a fraction of fresh ones, but only if the prefix stays byte-identical — so the layout (stable things first, volatile things last) is itself a cost decision.

## What This Skill Produces

- **The allocation** — every candidate piece of context sorted into load / link / fetch-on-demand / exclude, with reasons
- **The prefix layout** — stable-first ordering that keeps provider caches hitting turn after turn
- **The per-turn cost shape** — what a turn costs at the start, mid-session, and near the window limit (measure with [token-cost](../token-cost/SKILL.md))
- **The eviction rules** — pre-decided: what gets summarized, crushed, or dropped when the window fills, and in what order

## Required Inputs

Ask for these if not provided:
- **The workflow** — what the session does, how many turns it typically runs, what it touches (files, APIs, documents)
- **The candidate context** — everything someone wants loaded: instructions, docs, schemas, examples, history — the raw wishlist the budget disciplines
- **The volatility map** — which pieces change mid-session (edited files, growing history) and which never do (instructions, schemas) — the cache layout keys off this
- **The window and the pricing** — the model's context size, and whether the provider prices cached input differently (most majors do — verify the current terms)

## Framework: The Budgeting Rules

1. **Everything resident rides every turn:** the first question for each candidate is not "is it useful?" but "is it useful *per turn*?" — a 4,000-token style guide consulted once cost 4,000 tokens if fetched on demand, and 4,000 × N turns as a resident. Residency is for what most turns actually use.
2. **Link beats load for reference material:** an index costs ~3% of its territory ([repo-map](../repo-map/SKILL.md) for code, a crushed schema for data, a table of contents for docs) — load the index, fetch the section when a turn needs it. The escape hatch makes it safe; the ratio makes it policy.
3. **Layout is a price decision — stable first, volatile last:** cached-prefix pricing (often ~10% of fresh input) only applies while the prefix stays byte-identical, so anything that changes — timestamps, growing history, edited files — belongs *after* everything that doesn't. One volatile line at position zero un-caches everything below it, every turn.
4. **Crush at the gates:** tool outputs and files pass through [context-crusher](../context-crusher/SKILL.md) *before* entering; output rides [token-diet](../token-diet/SKILL.md) levels where the reader allows. The budget's borders are where compression works — inside, the tokens are already spent.
5. **Evict by plan, not by panic:** decide now what goes first when the window fills — typically: crushed tool outputs (refetchable) → resolved sub-task history (summarized to outcomes via [session-handoff](../session-handoff/SKILL.md)) → stale file snapshots (re-readable) — and never the instructions or the decisions log. Mid-crisis eviction always throws out the wrong thing; that's why the order is written while calm.

## Output Format

# Context Budget: [workflow] — [window size], ~[N] turns expected

## The Allocation
| Piece | Size (~tokens) | Verdict | Why |
|---|---|---|---|
[load / link (with its index) / fetch-on-demand / exclude]

## The Prefix Layout
[Ordered: instructions → schemas/standing refs → the maps/indexes → (volatility line) → working state → history — with the cache note per section]

## Per-Turn Cost Shape
[Turn 1 / mid-session / near-limit — the arithmetic, cache-adjusted where pricing is known]

## Eviction Rules (pre-decided)
[The order, each with its recovery route: "crushed outputs first — refetchable via [command]"]

## Quality Checks

- [ ] Every resident piece justified per-turn, not per-session
- [ ] Reference material is linked via an index with a fetch route, not loaded wholesale
- [ ] The layout puts nothing volatile above anything stable
- [ ] Compression happens at the borders (crusher in, diet out)
- [ ] The eviction order exists before the window fills, with recovery routes

## Anti-Patterns

- [ ] Do not load what a link can carry — residency is the most expensive real estate in the system
- [ ] Do not put a timestamp at the top of a cached prefix — one volatile byte re-prices everything under it
- [ ] Do not treat the window limit as the budget — the budget is per-turn cost × turns; the limit is just the wall
- [ ] Do not evict the decisions log — history compresses, decisions don't; losing them re-litigates the session
- [ ] Do not design for turn one — sessions are priced by their shape over time, and turn one is the cheapest turn there is
