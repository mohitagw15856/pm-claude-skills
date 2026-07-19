---
name: token-cost
description: "Measure before optimizing — estimate token counts locally with stated heuristics, price them at your model's rates, and quantify before/after savings, because token optimization without measurement is vibes. Use when asked how many tokens is this, what does this context cost per call, is this optimization worth it, or compare these two versions' cost. Produces the estimate with both heuristics shown, the cost math at your prices across your call volume, and the before/after comparison that decides whether an optimization earned its complexity."
---

# Token Cost Skill

Every token optimization should start and end with the same question: *how many, at what price, how often?* — and most skip all three. This skill is the measurement layer: local token estimates (two stated heuristics, averaged, no tokenizer dependencies), cost math at *your* model's prices (supplied, never baked in — prices change faster than repos), and the before/after comparison that turns "this feels smaller" into "saves 4,200 tokens, $1.26 per hundred calls." The honest core: a 40% saving on something sent once is a rounding error; 8% on something sent every call is real money — the `--calls` flag is the whole insight.

## What This Skill Produces

- **The estimate** — chars/4 and words×4/3, both shown, averaged, with the ±15% honesty label
- **The cost math** — per call and across the stated call volume, at supplied prices
- **The comparison** — before vs. after any optimization: tokens saved, percent, dollars at volume
- **The verdict frame** — worth-it / not-worth-it, decided by volume × savings vs. the optimization's own complexity

## Required Inputs

Ask for these if not provided:
- **The content** — file or text to measure; for comparisons, both versions
- **The prices** — the model's $/M input (and output if relevant) — from the user's provider page, today's, because baked-in prices are stale prices
- **The volume** — how many calls this content rides along on (a system prompt rides *every* call; a one-shot report rides one) — the multiplier that decides everything

## Programmatic Helper

```bash
python3 scripts/token_cost.py --file context.md --price-in 3 --calls 200
python3 scripts/token_cost.py --file original.json --compare crushed.json --price-in 3 --calls 200
```

Deterministic, stdlib-only. Two heuristics (≈4 chars/token, ≈0.75 words/token) averaged and labeled as estimates — real tokenizers vary by model and content type, and the script says so on every run rather than cosplaying as one.

## Framework: The Measurement Rules

1. **Volume is the multiplier that matters:** cost = tokens × price × calls — and *calls* is the term intuition drops. System prompts, standing context, and per-turn tool schemas ride every call; optimizing them compounds. One-shot content barely matters however big it is. Every measurement states its volume assumption.
2. **Measure both sides of an optimization:** the crushed version's savings *minus* what the optimization itself costs (a crush header, an index that must also be loaded, engineering time) — comparisons that only count the win are marketing.
3. **Estimates are estimates, loudly:** the ±15% label is permanent; decisions that need exact counts (billing disputes, hard context limits) need the provider's tokenizer, and the skill says so instead of faking precision. For is-this-worth-it decisions, ±15% is plenty.
4. **Price the journey's stages separately:** input tokens (usually cheap, high volume), output tokens (usually 3–5× the price — why output discipline like [token-diet](../token-diet/SKILL.md) pays disproportionately), and cached-input rates where the provider offers them (stable prefixes can cost ~10% of fresh input — measurement should know which bucket content falls in).
5. **The worth-it verdict is a sentence, not a spreadsheet:** "saves $0.31 per hundred calls; the crush step is one pipe — worth it" or "saves 60 tokens once; skip." Every measurement ends in one, because the point of measuring was deciding.

## Output Format

# Token Cost: [content] — at $[X]/M × [N] calls

[Script output: both heuristics, the estimate, the cost lines]

[Comparison mode: the before/after with savings at volume]

**The verdict:** [worth-it / not-worth-it, in one sentence with the reasoning]
*Estimates ±15%; prices supplied by you, dated today; exact counts need the provider's tokenizer.*

## Quality Checks

- [ ] Both heuristics shown, average labeled as an estimate
- [ ] Prices came from the user, never from memory
- [ ] The call-volume assumption is explicit in every cost figure
- [ ] Comparisons subtract the optimization's own cost
- [ ] The measurement ends in a worth-it sentence

## Anti-Patterns

- [ ] Do not recite model prices from memory — they change; ask for today's
- [ ] Do not present heuristic counts as tokenizer truth — the ±15% label is load-bearing
- [ ] Do not optimize unmeasured — "feels smaller" has shipped many complexity-positive savings
- [ ] Do not ignore volume — the same 500 tokens is negligible once and structural at every-call
- [ ] Do not end without the verdict — a measurement that doesn't decide anything measured nothing
