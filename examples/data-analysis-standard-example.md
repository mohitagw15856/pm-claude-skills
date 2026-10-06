# Example: data-analysis-standard

## What this skill does

Structures a product data analysis: the question, the method, the root cause with confidence level, and the recommended action, so a metric investigation ends in a decision rather than a chart dump.

## How to trigger it

### Example 1: a conversion drop investigation

**You say:**
> "Signup conversion fell from 8.4% to 6.9% over two weeks. Changes in the window: new consent banner shipped, a TikTok campaign started, and iOS traffic grew from 31% to 44%. Structure the analysis."

**Claude produces (excerpt):**

# Analysis: signup conversion drop, 8.4% → 6.9%

**Question:** is the drop a product regression, a traffic-mix shift, or both?

**Decomposition:**

| Cut | Before | After | Reads as |
|---|---|---|---|
| Conversion, iOS | 6.1% | 5.9% | stable |
| Conversion, desktop | 9.4% | 9.3% | stable |
| iOS share of traffic | 31% | 44% | the mover |

**Root cause (confidence: high):** mix shift. Within-platform conversion is flat; the TikTok campaign is buying iOS traffic that converts at ~6%, pulling the blend down. The consent banner shows no step-level drop (consent-accept rate 93% both weeks).

**Recommended action:** judge the campaign on iOS CAC payback, not blended conversion; set platform-segmented conversion as the default dashboard view so the next mix shift does not page anyone.

**What would change this conclusion:** a step-level drop between consent and form-submit on any single platform.

### Example 2: explaining a spike to stakeholders

**You say:**
> "Weekly actives jumped 22% last week and the exec team is excited. I suspect it's the [partner] integration launch importing dormant accounts. Write the honest analysis."

**Claude produces (excerpt):**

**Question:** is the 22% WAU jump new engagement or an import artefact?

**Method:** split actives by action depth. Imported accounts count as active on first sync even with zero human actions.

**Finding (confidence: medium, pending one query):** 78% of the increase comes from accounts whose only event is the initial sync. Human-action WAU rose 4.6%, in line with the prior 8 weeks.

**Recommended framing for the exec update:** real growth 4.6%; the rest is a counting artefact to fix by excluding sync-only sessions from WAU. Flagging it now costs a headline; discovering it next quarter costs credibility.

## Tips for best results

- Bring the metric, the window, and everything that changed in it; attribution is elimination.
- Ask for confidence levels; an analysis without one overstates itself.
- State upfront what decision hangs on the answer, so the analysis stops when that decision is safe.

## Related skills

- `cohort-analysis` when the question is behaviour over time rather than one movement
- `metrics-framework` to define metrics that resist this kind of artefact in the first place
