# The product-decision spine — shared vocabulary & handoffs

Reference consulted by the four skills that turn a fuzzy idea into a sequenced plan:
[`assumption-mapper`](../../skills/assumption-mapper/SKILL.md) →
[`prd-template`](../../skills/prd-template/SKILL.md) →
[`rice-prioritisation`](../../skills/rice-prioritisation/SKILL.md) →
[`roadmap-narrative`](../../skills/roadmap-narrative/SKILL.md).

This is the single source of the shared terms and the handoff artifacts between them.
Consult it; do not restate it inside each skill. When any of the four uses a term
below, it means exactly this and nothing looser.

## The spine

Each skill takes one named artifact from upstream and hands one to downstream. The
handoff is the interface — the only thing that crosses between skills, the way a
function signature is the only thing that crosses between callers.

```
idea/brief ──▶ assumption-mapper ──▶ [validated riskiest assumption] ──▶ prd-template
prd-template ──▶ [the PRD, with its success metric] ──▶ rice-prioritisation
rice-prioritisation ──▶ [ranked initiatives, with scores] ──▶ roadmap-narrative
```

A skill run out of sequence still works standalone, but when the upstream artifact
exists, **read it instead of re-asking** — re-deriving what an upstream skill already
established is the spine's version of asking a question the codebase already answers.

## Shared vocabulary

- **Problem statement** — one sentence: *who* has *what* problem, *when*, and the
  cost of it going unsolved. Not a solution. Everything downstream ladders to this.
- **Hypothesis** — a belief about impact, stated so reality can disagree with it:
  "if we ship X, [metric] moves by [amount] because [mechanism]." A hypothesis with
  no falsifiable number is a wish.
- **Assumption** — something the plan needs to be true but hasn't confirmed. Rated on
  two axes only: **how load-bearing** (does the plan collapse if it's false?) and
  **how confident** (how sure are we it's true?). The riskiest assumption is
  high-load-bearing × low-confidence. That is `assumption-mapper`'s whole target.
- **Success metric** — the one number that tells you the problem got solved, with its
  current baseline and the move that counts as success. A PRD without a baseline has
  no success metric, only a hope. Carried verbatim into RICE's *Impact* and the
  roadmap's *why*.
- **RICE terms** — *Reach* (accounts/users affected per period, a real count),
  *Impact* (per-affected magnitude on the success metric), *Confidence* (0–1, how much
  the estimate is `[data]` vs `[hunch]`), *Effort* (person-months). Confidence is the
  honesty valve: a bold impact estimate with no evidence gets a low confidence, and
  the score self-corrects.
- **Theme** — the strategic grouping a set of initiatives ladders up to. The unit the
  roadmap narrates in; individual RICE rows are its evidence, not its substance.
- **Provenance tag** — every fact carries `[data]` (measured), `[hunch]` (believed),
  or `[assumption]` (needed-but-unconfirmed). Tags travel across the whole spine
  unchanged: a `[hunch]` impact in the PRD stays a `[hunch]` in RICE's confidence and
  in the roadmap's claims. Laundering a hunch into data anywhere on the spine is the
  cardinal sin.

## The honesty rule the whole spine enforces

No number invented to look rigorous. A guessed reach is labeled a guess; a
confidence reflects real evidence, not the desired ranking; a success metric with no
baseline is named as un-baselined rather than dressed up. The spine's value is that
its outputs survive being questioned — and invented precision is the one thing that
fails that test instantly.
