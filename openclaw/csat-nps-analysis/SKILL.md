---
name: csat-nps-analysis
description: "Analyse CSAT / NPS / CES survey results and turn the score into actions. Use when asked to analyse NPS, CSAT, or CES data, compute an NPS score, interpret survey verbatims, or build a voice-of-customer readout. Produces a readout — the computed score, the trend & benchmark, themed analysis of the comments (what drives promoters vs. detractors), and prioritised actions. Includes a stdlib NPS/CSAT calculator."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/csat-nps-analysis.html
metadata:
  {
    "openclaw": { "emoji": "🎧" }
  }
---

# CSAT / NPS Analysis Skill

A satisfaction score on its own is a vanity number — the value is in *why* it's that number and *what to
do*. This skill computes the score correctly (NPS is %promoters − %detractors, not an average), reads the
verbatims for the themes driving promoters and detractors, and turns it into a prioritised action list —
so a survey becomes a roadmap, not a slide.

## Required Inputs

Ask for these only if they aren't already provided:

- **The metric & data** — NPS (0–10 ratings), CSAT (e.g. 1–5 or % satisfied), or CES; the response counts/distribution.
- **The verbatims** — open-text comments (the gold; paste what you have).
- **Context** — segment, time period, and the prior score for trend.

## Output Format

### [CSAT / NPS / CES] Readout: [segment, period]

**1. The score** — computed (use the helper for NPS/CSAT): the headline number, the **distribution** (promoters/passives/detractors for NPS), the **trend** vs. last period, and the **benchmark** (industry/your target). State the formula — NPS is a net of percentages, not an average.

**2. What's driving it** — theme the verbatims:
- **Promoters love:** the 2–3 recurring reasons people rate high (protect/amplify these).
- **Detractors hurt by:** the 2–3 recurring pains (these are your fix list).
- **Passives need:** what would move them up.
Quote a representative comment per theme.

**3. Segments** — where the score is notably worse/better (plan, tenure, channel), if the data allows — the average hides this.

**4. Actions** — prioritised: the highest-frequency × highest-impact detractor themes first, each with an owner and the metric it should move. A score with no actions is wasted.

## Programmatic Helper

`scripts/nps.py` (stdlib only) computes NPS / CSAT from the rating distribution:

```bash
# NPS from 0-10 counts (11 numbers, ratings 0..10):
python3 scripts/nps.py nps 12 5 8 ... 
# CSAT % satisfied (ratings 4-5 on a 1-5 scale):
python3 scripts/nps.py csat 2 3 10 40 55
python3 scripts/nps.py nps "...counts..." --json
```

## Quality Checks

- [ ] NPS is computed as %promoters − %detractors (not an average of scores)
- [ ] The distribution and trend vs. last period are shown, plus a benchmark/target
- [ ] Verbatims are themed into promoter/detractor drivers, with a representative quote each
- [ ] Segment differences are surfaced where the data allows (the average lies)
- [ ] Ends with prioritised, owned actions tied to the biggest detractor themes

## Anti-Patterns

- [ ] Do not average NPS ratings — it's a net of percentages; averaging gives a meaningless number
- [ ] Do not report the score without the why — the verbatims are where the action is
- [ ] Do not ignore passives — they're the cheapest group to convert into promoters
- [ ] Do not stop at the score — an analysis with no prioritised action changes nothing
- [ ] Do not trust a tiny sample — flag low n; a 12-response NPS swing is noise, not a trend

## Based On

Voice-of-customer practice — correct NPS/CSAT/CES computation, verbatim theming, and action prioritisation.

## Example Trigger Phrases

- "Analyse NPS."
- "Compute an NPS score."
- "Interpret survey verbatims."
- "Build a voice-of-customer readout."
