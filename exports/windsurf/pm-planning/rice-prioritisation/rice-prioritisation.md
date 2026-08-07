---
trigger: model_decision
description: "Scores and ranks product initiatives using the RICE framework. Use when asked to prioritise features, rank a backlog using RICE, score initiatives for quarterly planning, or apply an objective framework to a list of competing ideas. Produces a ranked RICE table with scores, quick wins and moonshot flags, dependency notes, and a recommended sequencing order."
---

# RICE Prioritisation Skill

Apply consistent, criteria-based RICE scoring to a list of features or initiatives to produce an objective prioritisation ranking.

## Reads from / Writes to the Brain

If a [`professional-brain`](../professional-brain/SKILL.md) (`brain/`) exists, ground in it instead of re-asking for what you already know:

- **Read first:** `knowledge/strategy.md` (so the ranking serves the direction), the items as `entities/`, and impact `hypotheses/`. Run `python3 ../professional-brain/scripts/brain_query.py ./brain "<initiative theme>"` and carry each fact's provenance tag through — an impact estimate is usually a `[hunch]`, not `[data]`.
- **📥 Propose to the Brain:** after producing, propose recording the ranking decision to `decisions/` and the reach/impact estimates as `hypotheses/` tagged by evidence strength. Show them, get a yes, then write with `../professional-brain/scripts/brain_write.py … --commit` (append-only, dry-run by default).

## Required Inputs

Ask the user for these if not provided:
- **List of initiatives or features to score** (names and brief descriptions)
- **Reach estimates** (users affected per quarter — from analytics if available)
- **Impact estimates** (use the standard scale below)
- **Effort estimates** (person-months — from engineering if available)
- **Quarter or planning period**

## RICE Definitions (adapt to your context)
- **Reach:** Number of users affected per quarter (use actual DAU/MAU data where available)
- **Impact:** Effect on your primary metric — use scale: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal
- **Confidence:** How certain are we about R and I estimates? 100%=high, 80%=medium, 50%=low
- **Effort:** Person-months required across all functions

## RICE Formula
RICE Score = (Reach × Impact × Confidence) / Effort

## Programmatic Helper

This skill ships with a stdlib-only Python script that calculates and ranks RICE scores so the maths is consistent and the quick-win / moonshot flags are applied by rule, not by feel. Feed it the initiatives once R, I, C, and E are gathered.

```bash
# From a JSON file (confidence accepts 0.8 or 80)
python3 scripts/rice_calculator.py initiatives.json

# Or from a CSV with header: name,reach,impact,confidence,effort
python3 scripts/rice_calculator.py initiatives.csv --format csv

# Or piped in
echo '[{"name":"Onboarding","reach":5000,"impact":2,"confidence":0.8,"effort":3}]' \
  | python3 scripts/rice_calculator.py -
```

It outputs a ranked table with computed RICE scores and auto-flags **quick-win** (strong score, low relative effort), **moonshot** (high impact, high effort), and **low-confidence** (≤50%) items. Use the computed ranking as the starting point, then apply the validation step below — never accept a surprising top rank without checking the estimates behind it.

## Deeper Materials

- **`references/estimate-calibration.md`** — how to anchor each of the four estimates (reach sources, the impact scale with reserve-it-for examples, evidence-based confidence, cross-functional effort) and the cross-checks to run on the finished ranking. Apply it when challenging the user's inputs.
- **`templates/scoring-worksheet.md`** — a fill-in worksheet whose evidence columns force each score to name its source. Offer it when a team wants to score together rather than have the ranking generated.

## Where this sits — scoring on the spine

Third in the product-decision spine: **`/assumption-mapper` → `/prd-template` →
`rice-prioritisation` → `/roadmap-narrative`**. It receives **the success metric** from
each initiative's PRD — RICE's *Impact* is the estimated move on *that* baselined number,
not a fresh guess — and hands `/roadmap-narrative` **the ranked initiatives with their
scores** to group into themes. The four RICE terms are defined once in
[`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md); *Confidence*
there is the honesty valve, and this skill lives or dies on using it.

## The loop

RICE fails when estimates are invented to produce a desired ranking. The loop's job is
to keep every score honest; Phase 2 is where that happens.

1. **Gather the four estimates per initiative.** Reach (real count per period), Impact
   (magnitude on the PRD's success metric), Confidence (0–1), Effort (person-months).
   Pull Impact from the upstream PRD's metric where it exists.
   **Done when:** every initiative has all four, and each carries a provenance tag on
   its source.
2. **Interrogate confidence — the anti-gaming phase.** For each estimate, confidence
   must reflect *evidence*, not enthusiasm: a bold impact with no data gets a low
   confidence, and the score self-corrects. Challenge weak inputs and name what data
   would raise them (the disclosed [estimate-calibration](references/estimate-calibration.md)
   reference is the how).
   **Done when:** no [hunch] estimate wears a high confidence, and the person who owns
   the estimate would defend each number out loud.
3. **Score, rank, and stress the top.** Compute RICE, rank, flag *quick wins* (high
   score, low effort) and *moonshots* (high impact, high effort), note dependencies.
   Then the cross-check: if the top item surprises the team, an estimate is probably
   inflated — RICE is a tool, not a verdict.
   **Done when:** the ranking is computed and the top result has survived one honest
   "does this feel right, and if not, which estimate is lying?"
4. **Hand off.** Pass the ranked table (with scores and dependencies) to
   `/roadmap-narrative` so it groups by theme rather than re-deriving priorities.
   **Done when:** `/roadmap-narrative` could theme these without re-scoring.

## Output Structure

### RICE Prioritisation: [Backlog/Quarter]
| Initiative | Reach | Impact | Confidence | Effort | RICE Score | Notes |
|------------|-------|--------|------------|--------|------------|-------|
| [name] | [n] | [score] | [%] | [months] | [score] | [flags] |

#### Recommended Sequence
[Top 5 initiatives with rationale]

#### Quick Wins (high score, low effort)
[Items to pick up alongside bigger bets]

#### Data Gaps to Address
[What information would most improve scoring accuracy]

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Estimate credibility | Round-number guesses at 100% confidence; effort estimated by PM alone | Reach grounded in analytics but confidence uniform across items regardless of evidence | Each estimate names its source; anything without data sits at 50% confidence; effort comes from engineering, and the doc says so |
| Impact discrimination | Everything scored 2–3 — the scale produces no signal | Some spread across the scale but anchors undefined, so scores aren't comparable | Full scale used with a stated anchor for each level; "massive" reserved for genuinely rare items |
| Ranking interrogation | Raw sorted output accepted as the verdict | Quick wins and moonshots flagged, but surprising ranks and dependencies unexamined | Surprising top ranks investigated with the inflated estimate found or defended; dependencies noted where they change sequencing |
| Actionable sequencing | A scored table with no recommendation | Table plus a top-5 list, but no rationale or data-gap follow-ups | Recommended sequence with per-item rationale, quick wins slotted alongside bigger bets, and named data gaps that would sharpen the next pass |

## Quality Checks

- [ ] Every initiative has all four RICE components estimated (even roughly)
- [ ] Confidence is 50% for anything without data backing (not 100% as a default)
- [ ] Quick wins and moonshots are explicitly called out
- [ ] Dependencies that affect sequencing are noted
- [ ] Any surprising ranking is investigated before accepting it

## Anti-Patterns

- [ ] Do not default to 100% confidence on estimates that lack supporting data — this inflates scores and misleads planning
- [ ] Do not treat RICE scores as a final decision — a ranking that surprises the team must be investigated before it is accepted
- [ ] Do not omit effort estimates from engineering — PM-only effort estimates are frequently optimistic and skew results
- [ ] Do not forget to note dependencies that would change the sequencing even if RICE scores suggest otherwise
- [ ] Do not score every initiative at the same impact level — if everything is "high impact," the framework produces no useful signal
