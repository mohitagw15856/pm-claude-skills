---
trigger: model_decision
description: "Transform a prioritised initiative list into a compelling strategic roadmap narrative. Use when asked to write a roadmap narrative, explain the product roadmap to non-technical stakeholders, connect roadmap items to company goals, or produce an exec-shareable roadmap story. Produces a themed narrative with strategic context, quarter progression arc, an executive summary, and a 'what's not on the roadmap' section."
---

# Roadmap Narrative Skill

Convert a ranked list of product initiatives into a clear, strategic narrative that connects individual items to company goals and communicates a coherent product direction.

## Working from a brief

You will often get a short brief (a few themes, an audience) without a full initiative list or OKRs. **Always deliver the complete narrative anyway** — do not stop to ask questions and do not leave bracketed placeholders like `[Theme Name]`. Where detail is missing, infer specific, realistic themes, initiatives, and metrics from the brief and the domain, and mark any inferred fact or number as *(assumed — confirm)*. Fill every section with concrete content, not template brackets.

## Inputs (infer any not provided — label assumptions)

- **Prioritised initiative list** (with rough timelines or quarters)
- **Company OKRs or strategic priorities** (to connect roadmap to company goals)
- **Audience** (all-hands, board, investors, sales team — changes tone and depth)
- **Items explicitly NOT on the roadmap** (optional but strengthens credibility)

## Process
1. Review the prioritised initiative list and company OKRs provided
2. Identify 2-3 strategic themes that group the initiatives naturally
3. For each theme, articulate: the problem it addresses, the customer it serves, the metric it moves
4. Write a quarter-level narrative that shows progression — how does H1 set up H2?
5. Draft an executive summary (3-4 sentences max) that non-technical stakeholders can repeat
6. **Validate** — Confirm every initiative maps to a theme. If an initiative is orphaned, either create a theme or flag it as a narrative gap to address

## Output Structure

### Product Roadmap: [Quarter/Half/Year]
**Strategic Context:** [1 paragraph: market moment, key challenge, our response]

#### Theme 1: [Theme Name]
- Strategic rationale
- Initiatives included
- Primary metric impacted
- Dependencies

[Repeat for each theme]

**What's Not on the Roadmap (and Why):**
[2-3 items with rationale — shows strategic discipline, not just prioritisation]

**Executive Summary (shareable):**
[3-4 sentences that could be shared in an all-hands or board update]

## Tone Guidelines
- Write for a CFO, not an engineer
- Lead with customer outcomes, not features
- Be honest about what's NOT on the roadmap and why

## Quality Checks

- [ ] Every initiative in the input maps to a strategic theme
- [ ] The executive summary can stand alone and be repeated correctly after one reading
- [ ] Progression narrative shows causal links between quarters (not just chronological listing)
- [ ] "What's not on the roadmap" section includes at least 2 items with clear rationale
- [ ] Language throughout is free of engineering jargon — tested by asking: "could a CFO repeat this?"

## Anti-Patterns

- [ ] Do not produce a list of features with dates and call it a narrative — every initiative must connect to a strategic theme
- [ ] Do not omit the "what's not on the roadmap" section — without it, the narrative lacks strategic discipline
- [ ] Do not write progression as a chronological list — show causal links between quarters (Q1 enables Q2 because…)
- [ ] Do not write the executive summary last and treat it as a summary — write it as the version stakeholders will repeat
- [ ] Do not let orphaned initiatives appear without a theme — either create a theme or flag the gap explicitly
