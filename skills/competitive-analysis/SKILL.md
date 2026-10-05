---
name: competitive-analysis
description: "Analyze competitors and create competitive landscape documentation with feature matrices, positioning maps, and strategic recommendations. Use when asked to analyze competitors, create competitive analysis, compare features with competitors, build a competitive landscape, track competitive positioning, or prepare sales battlecard inputs. Produces structured competitor profiles, feature comparison matrix, win/loss analysis, and prioritised strategic recommendations. For a one-off teardown of a single rival use competitor-teardown; for a recurring market briefing use competitive-intelligence-monitor."
version: 1.0.0
---

# Competitive Analysis Skill

Create structured competitive analyses for product decision-making.

## Reads from / Writes to the Brain

If a [`professional-brain`](../professional-brain/SKILL.md) (`brain/`) exists, ground in it instead of re-asking for what you already know:

- **Read first:** `knowledge/` (market + positioning) and competitor `entities/`. Run `python3 ../professional-brain/scripts/brain_query.py ./brain "<competitor or market>"` and carry each fact's provenance tag through — a competitor claim from a press release is `[external]`, not `[data]`.
- **📥 Propose to the Brain:** after producing, propose recording new competitor facts to `knowledge/` (`[external]`) and creating/updating competitor `entities/`. Show them, get a yes, then write with `../professional-brain/scripts/brain_write.py … --commit` (append-only, dry-run by default).

## Required Inputs

Ask the user for these if not provided:
- **Your product or company** (what you're comparing against)
- **Competitors to analyze** (or ask to identify the top 3-5)
- **Analysis focus** (full landscape / feature comparison / pricing / positioning / win-loss)
- **Audience** (product team / leadership / sales / board)

## Process

1. Gather competitor information from provided inputs and available context
2. Build profiles for each competitor
3. Create feature comparison matrix on dimensions that matter to the user's customers
4. Analyze pricing and positioning
5. Identify win/loss patterns and strategic implications
6. **Validate** — Confirm all claims reference a specific source or are flagged as assumptions. Verify feature comparisons note quality differences, not just presence/absence.

## Output Structure

### 1. Executive Summary
- **Market Position**: Where we stand relative to competitors
- **Key Findings**: Top 3-5 insights
- **Strategic Implications**: What this means for the roadmap

### 2. Competitor Profiles

For each competitor:
- **Company Overview**: Size, funding, market position
- **Target Customer**: Who they serve
- **Value Proposition**: Core positioning
- **Strengths / Weaknesses**: What they do well and where they fall short
- **Recent Activity**: Major updates, funding, announcements

### 3. Feature Comparison Matrix

| Feature | Us | Competitor A | Competitor B | Competitor C |
|---------|-----|--------------|--------------|--------------|
| [Feature] | ✅ Full | ⚠️ Limited | ❌ None | ✅ Full |

Legend: ✅ Full (production-ready) · ⚠️ Limited/Beta · ❌ None

Include notes on quality and implementation differences where significant.

### 4. Pricing Comparison

| Plan | Us | Competitor A | Competitor B |
|------|-----|--------------|--------------|
| Free/Trial | [price] | [price] | [price] |
| Pro | [price] | [price] | [price] |
| Enterprise | [price] | [price] | [price] |

### 5. Market Positioning Map

Position competitors on two key dimensions relevant to the market:
- Y-Axis: [e.g., Enterprise vs. SMB]
- X-Axis: [e.g., Simple vs. Comprehensive]

**Whitespace Opportunities**: [Underserved segments]

### 6. Win/Loss Analysis

**Why We Win:**
- Better at: [specific capabilities]
- Customers who value: [what matters to them]

**Why We Lose:**
- When customers need: [specific requirements]
- Their advantage: [what tips the decision]

### 7. Strategic Recommendations

**Immediate Actions (0-3 months):**
1. [Action] — [Rationale]

**Medium-term (3-12 months):**
1. [Action] — [Rationale]

## Anti-Patterns

- [ ] Do not present competitor feature claims as facts without citing a source or flagging them as assumptions — outdated or incorrect feature data misleads sales and product decisions
- [ ] Do not build a competitive analysis that only covers features — pricing, messaging, go-to-market motion, and who they hire for are equally strategic signals
- [ ] Do not treat all buyers as identical — the same product may win against Competitor A in the enterprise segment and lose in SMB; segment-specific win/loss matters
- [ ] Do not soften weaknesses and threats in the SWOT to avoid internal discomfort — an honest SWOT is only useful if the negatives are real

## Deeper Materials

This skill ships with support files — use them when they are available:

- **`references/feature-matrix-honesty.md`** — Feature Matrices That Don't Lie. Apply it while producing the output; it carries the calibration and judgment calls the method summary above compresses.
- **`templates/landscape-doc.md`** — a fill-in version of the deliverable with the quality gates inline. Offer it when the user wants to work the document themselves rather than have it generated.

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Source hygiene | Competitor claims stated as fact with no provenance; stale data presented as current | Major claims sourced, but assumptions unflagged and mixed in with verified facts | Every claim carries a source tag or explicit assumption flag; an assumption register tells the reader what to re-verify |
| Depth beyond the feature checklist | A feature matrix and nothing else | Features plus pricing, but no positioning, GTM motion, or recent-moves analysis | Features, pricing, positioning map, and win/loss all present — with quality-difference notes where checkmark parity would mislead |
| Segment-aware win/loss | One generic strengths/weaknesses list averaged across all buyers | Win/loss present but undifferentiated by segment or based on internal opinion, not customer evidence | Win/loss split by segment with customer-voiced reasons and deal counts; contradicting segments (win SMB, lose enterprise) shown side by side |
| Actionability of recommendations | Generic advice ("monitor competitors", "improve differentiation") | Directionally useful actions but untethered from the findings or missing timeframes | Specific actions with timeframe and rationale, each traceable to a numbered finding — including explicit non-actions |

## Quality Checks

- [ ] All competitor claims cite a source or are flagged as assumptions
- [ ] Feature comparison notes quality differences, not just feature presence
- [ ] Strategic recommendations are specific actions, not generic advice
- [ ] Win/loss analysis reflects customer perspective, not internal assumptions
- [ ] Different customer segments are considered (not all buyers value the same things)

## Example Trigger Phrases

- "Analyze competitors."
- "Create competitive analysis."
- "Compare features with competitors."
- "Build a competitive landscape."
- "Track competitive positioning."
