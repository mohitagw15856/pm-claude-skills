---
name: chart-choice
description: "Pick the chart the data and the point actually need — the question-to-chart mapping (comparison, trend, composition, distribution, relationship), the honesty rules (axes, baselines, dual-axis traps), and the one-chart-one-point discipline. Use when asked what chart should I use, make this data visual, why does this chart feel misleading, or fix this graph for the deck. Produces the chart verdict with its reasoning, the honesty checklist applied, and the labeling that lets the chart travel without its author."
---

# Chart Choice Skill

Chart choice is a sentence-completion exercise: the chart exists to make *one stated point* legible in three seconds, and the point's grammar picks the form — comparing things (bars), change over time (lines), parts of a whole (stacked/100% bars — pie only under five slices), distribution (histogram), relationship (scatter). Most bad charts are either the wrong form for the point, or the right form dressed dishonestly: truncated bar axes, dual axes engineered for drama, 3D anything. The skill picks the form, then runs the honesty pass.

## What This Skill Produces

- **The chart verdict** — the form, chosen from the point's grammar, with the reasoning stated
- **The honesty pass** — axes, baselines, sorting, and the dual-axis/3D vetoes applied
- **The labeling spec** — title-as-the-point, direct series labels, the source line — so the chart survives being screenshot out of context
- **The alternative** — when the honest answer is "this wants a table, not a chart"

## Required Inputs

Ask for these if not provided:
- **The point, as a sentence:** "show the data" isn't chartable; "East region drove the Q2 recovery" is — the sentence picks the chart, and extracting it is half the skill
- **The data's shape** — categories × measures × time; how many series (five lines are a chart; twelve are spaghetti — the shape forces choices)
- **The venue** — a live deck (bolder, fewer labels), a doc (denser is fine), a dashboard (self-serve labeling); and whether it will be screenshot-forwarded (assume yes)

## Framework: The Choice and Honesty Rules

1. **The grammar mapping:** *compare items* → horizontal bars, sorted by value (not alphabet) · *trend* → line, one-to-five series · *composition* → stacked bar (100% when shares matter more than totals; pie only ≤5 slices and only when "half" or "quarter" is the point) · *distribution* → histogram · *relationship* → scatter. When the point contains two of these, that's two charts.
2. **Bar axes start at zero — line axes may not:** bars encode value as length, so truncation lies structurally; lines encode change as slope, so a zoomed line axis is legitimate *when labeled*. This asymmetry resolves most axis arguments.
3. **The dual-axis veto (nearly always):** two measures on two axes lets the author *choose* the visual correlation by scaling — the honest alternatives are two stacked panels or an indexed chart (both series = 100 at start). Exceptions are rare and carry labels.
4. **Sort for the point, declutter to the point:** categorical bars sorted descending unless order is inherent (months) · gridlines light, legend replaced by direct end-of-line labels when few series, decimals only to meaningful precision · 3D never — depth encodes nothing and distorts everything.
5. **The title is the point, not the topic:** "Revenue by region" is a topic; "East drove the Q2 recovery" is the point — titled so, with the source-and-date line at the foot, the chart survives forwarding without its author. The final test: a stranger sees it for three seconds — do they say your sentence back?

## Output Format

# Chart: [the point, as the sentence]

## The Verdict
[Form + the grammar reasoning · series count check · the two-charts split if the point was compound]

## The Honesty Pass
[Axis baselines (bar-zero / line-labeled) · dual-axis check → panels/indexed if triggered · sort order · the 3D/decoration vetoes]

## The Labeling Spec
[Title = the sentence · direct labels vs legend · precision · source + as-of line]

## The Three-Second Test
[What a stranger reads off it cold — and the fix if that isn't the point]

## Quality Checks

- [ ] The point exists as a sentence before the form was chosen
- [ ] Bar charts baseline at zero; zoomed line axes carry their label
- [ ] No dual axes without the stated rare-exception justification
- [ ] The title states the point; the source line exists
- [ ] Charts with 6+ series were split, aggregated, or turned into a table

## Anti-Patterns

- [ ] Do not chart a topic — no point-sentence, no chart; a table shows data that hasn't decided its point
- [ ] Do not truncate bar axes for drama — that's lying in geometry
- [ ] Do not engineer dual-axis correlations — panels or indexing tell it straight
- [ ] Do not pie past five slices — comparison by angle fails exactly when slices multiply
- [ ] Do not decorate — every ink drop that isn't data competes with the three seconds the chart gets

## Example Trigger Phrases

- "What chart should I use?"
- "Make this data visual."
- "Why does this chart feel misleading?"
- "Fix this graph for the deck."
