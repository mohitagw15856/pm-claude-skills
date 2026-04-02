---
name: competitor-teardown
description: "Produce a structured competitive analysis for any product or market. Use when asked for a competitor analysis, competitive teardown, market comparison, SWOT, or positioning map. Generates a structured teardown with positioning map, feature comparison, messaging gaps, and strategic recommendations."
---

# Competitor Teardown Skill

This skill produces a complete competitive analysis document — structured for use in strategy decks, investor materials, sales enablement, or product planning sessions.

## Required Inputs

Ask the user for these if not provided:
- **Your product** (name + one-line description)
- **Competitors to analyse** (list 2–5 names; if not provided, ask)
- **Analysis depth** (quick overview / detailed teardown)
- **Primary use case for this analysis** (e.g. sales enablement, investor deck, internal strategy, product planning)

## Output Structure

### 1. Competitive Landscape Overview

One paragraph summarising the market dynamic: who the key players are, how the market is segmented, and where the white space sits. Keep this under 150 words — it's the exec summary.

### 2. Positioning Map

Describe a 2x2 positioning map in text form (since you can't render images):

- Define the two axes relevant to this market (e.g. "Ease of Use vs. Depth of Features" or "Price vs. Enterprise Readiness")
- Place each competitor in one quadrant with a one-sentence rationale
- Place the user's product and highlight the strategic implication

### 3. Feature Comparison Table

| Feature / Capability | [Your Product] | [Competitor A] | [Competitor B] | [Competitor C] |
|---|---|---|---|---|
| [Feature] | ✅ / ❌ / 🟡 Partial | | | |

Use ✅ (has it), ❌ (doesn't have it), 🟡 (partial/limited). Add a "Strategic Notes" column for features where the difference is a significant selling point or risk.

Include 10–15 rows. If user hasn't provided feature details, note which cells need to be verified.

### 4. Messaging Analysis

For each competitor, analyse their public-facing messaging (website headline, tagline, primary value prop):

**[Competitor Name]**
- **Their primary claim:** [what they say they do]
- **Target audience signal:** [who they seem to be targeting based on language/imagery]
- **Emotional hook:** [fear / aspiration / authority / speed / simplicity]
- **Gap or weakness in their messaging:** [what they don't address that your product could own]

### 5. SWOT Summary

Produce a clean SWOT for the user's product in the context of this competitive landscape:

- **Strengths:** [2–3 genuine differentiators]
- **Weaknesses:** [2–3 honest gaps or vulnerabilities]
- **Opportunities:** [2–3 market gaps or competitor weaknesses to exploit]
- **Threats:** [2–3 competitor moves or market shifts to watch]

### 6. Strategic Recommendations

3–5 actionable recommendations based on the analysis. Frame each as: **"Given [observation], [your product] should [action] to [outcome]."**

## Quality Checks

- [ ] Axes on positioning map are meaningful and specific to this market
- [ ] Feature table includes strategic notes on key differentiators
- [ ] Messaging analysis covers all named competitors
- [ ] SWOT is honest — Weaknesses and Threats should not be softened
- [ ] Recommendations are specific and actionable, not generic strategy advice

## Example Trigger Phrases

- "Do a competitor analysis of [Product] vs [Competitor A] and [Competitor B]"
- "Tear down [Competitor]'s positioning"
- "Give me a competitive landscape for [market]"
- "Build a SWOT for our product against [competitor]"
