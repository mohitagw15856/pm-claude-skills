# Example: rice-impact-matrix

## What this skill does

Scores initiatives on RICE and strategic alignment together, places each in a Now/Next/Later/Drop quadrant, and recommends sequencing, so the loud-but-misaligned items stop jumping the queue.

## How to trigger it

### Example 1: a quarter's portfolio call

**You say:**
> "Priority matrix for Q2. Strategy this year: win mid-market. Initiatives: 1) SSO (RICE inputs: 60 accounts, impact 3, conf 80%, 2pm), 2) TikTok-style feed (reach 5k, impact 1, conf 50%, 3pm), 3) onboarding templates (reach 900, impact 2, conf 80%, 1pm), 4) legacy importer rewrite (reach 150, impact 1, conf 100%, 2pm)."

**Claude produces (excerpt):**

### Priority Matrix: Q2

| Initiative | RICE | Strategic Alignment | Quadrant | Recommendation |
|---|---|---|---|---|
| Onboarding templates | 1,440 | High (mid-market self-serve) | **Now** | build first; fastest payback |
| SSO | 72* | High (mid-market blocker) | **Now** | build despite modest RICE; see note |
| Feed | 833 | Low (consumer pattern, wrong segment) | **Later** | high score, off-strategy; revisit only with mid-market evidence |
| Importer rewrite | 75 | Medium (retention hygiene) | **Next** | queue behind the two Now items |

*SSO's RICE understates it: reach counts accounts, not users, and 60 mid-market accounts gate ~£[X] pipeline. This is why the matrix has two axes.

**Sequencing:** templates (1pm) ships while SSO (2pm) builds; feed is the explicit no this quarter, recorded so it stops being re-litigated monthly.

### Example 2: defending the matrix under pressure

**You say:**
> "The CEO saw a competitor demo the feed feature and wants it moved to Now. Re-run honestly."

**Claude produces (excerpt):**

**What changed in the inputs:** nothing measurable. A competitor shipping it alters neither our reach, impact, confidence, effort, nor this year's mid-market strategy.

**What could legitimately move it:** evidence that mid-market buyers ask for it (win/loss mentions, discovery notes). Current count in the last 20 deal notes: 0.

**Options presented:**
1. Hold Later, add a competitive watch-item with a trigger (two mid-market losses citing it → re-score).
2. If the strategy itself is changing toward engagement breadth, say so explicitly; then alignment flips to High and the matrix honestly reorders.

**The matrix's job here:** make the CEO choose between evidence and strategy change, rather than reordering by headline.

## Tips for best results

- State the strategy in one sentence first; alignment scores need something to align to.
- Bring real RICE inputs; the matrix flags where a score misleads (account-reach vs user-reach).
- Record the Drop/Later decisions with their triggers; the matrix's value is ending re-litigation.

## Related skills

- `rice-prioritisation` for the pure-RICE pass when strategy is not contested
- `okr-builder` to write the quarter's goals the Now column should serve
