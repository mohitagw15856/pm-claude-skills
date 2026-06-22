---
aliases: ["A/B Test Readout"]
tags: [pm-skills, skill]
skill: ab-test-readout
description: "Analyse a finished A/B test and write the readout — the result, whether it's statistically and practically significant, what it means, and the ship/no-ship call. Use when asked to analyse experiment results, write an A/B test readout, interpret test data, or decide whether to ship a variant. Produces a clear verdict with the lift and confidence, segment cuts, the risks (peeking, novelty, sample), and a recommendation. Distinct from planning a test — this reads results."
---

# A/B Test Readout Skill

The hard part of an experiment is the readout: not "B won" but "is this real, is it big enough to matter, and should we ship?" This skill turns results into an honest decision — and flags the ways A/B results lie.

## Working from a brief

Given results (even partial), **write the full readout anyway**. If significance isn't provided, reason about it from the numbers and flag what's needed to confirm. Mark assumed figures. Never declare a winner without addressing significance and sample.

## Required Inputs

Ask for (if not already provided):
- **The hypothesis** and the **primary metric**
- **Results** — control vs variant: conversions/rate, sample size per arm, duration
- **Guardrail metrics** (revenue, retention, latency, complaints) that mustn't regress
- **Pre-registered decision rule** (what would count as a win) if one exists

## Output Format

### 1. Verdict (one line)
*Ship / Don't ship / Inconclusive — keep running* — with the headline number.

### 2. The result

| Metric | Control | Variant | Relative lift | Significant? |
|---|---|---|---|---|
| Primary | | | | p / CI |
| Guardrail(s) | | | | |

State **statistical** significance (p-value / confidence interval) *and* **practical** significance (is the lift big enough to matter given the cost?).

### 3. Did it really win?
Address the ways A/B tests mislead:
- **Sample / power** — was the test adequately powered, or under-sampled?
- **Peeking** — was the call made early, inflating false positives?
- **Novelty / primacy** — could the effect fade?
- **Segments** — does the win hold across key segments, or is it driven by one?

### 4. Segment cuts
Where the effect is strong vs flat vs negative (new vs returning, platform, geography).

### 5. Recommendation & next step
Ship / iterate / re-run, plus what to monitor post-launch or what the follow-up test should isolate.

## Quality Checks

- [ ] Distinguishes statistical from practical significance
- [ ] Checks guardrail metrics, not just the primary
- [ ] Flags peeking, power, novelty, and segment-driven wins
- [ ] Recommendation follows from the evidence, with a monitoring/next-test step
- [ ] Doesn't declare a winner on an underpowered or peeked result

## Anti-Patterns

- "B won by 8%!" with no significance or sample size
- Calling a result early (peeking) and shipping
- Ignoring a guardrail regression because the primary went up
- A statistically significant but practically meaningless lift treated as a win

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
