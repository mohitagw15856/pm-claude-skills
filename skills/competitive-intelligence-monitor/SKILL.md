---
name: competitive-intelligence-monitor
description: "Monitor competitor signals and surface strategic implications for your roadmap. Use when asked to monitor competitors, track the competitive landscape, produce a competitive briefing, or understand what has changed in the market this week or month. Produces a structured intelligence brief with high/medium/low priority signals, roadmap implications, and a strategic landscape summary."
---

# Competitive Intelligence Monitor Skill

Turn scattered competitor updates into structured weekly intelligence — not just "what they did" but "what changed since last week and what it means for us."

## Required Inputs

Ask the user for these if not provided:
- **Competitors to monitor** (list of company names)
- **Your current roadmap or strategic priorities** (to assess relevance of signals)
- **Previous brief or last run summary** (for diff mode — what's new vs. last time)
- **Time period** (this week, this month)

## Signal Categories to Monitor
- **Product signals:** New features, removals, UX changes, beta programmes
- **Pricing signals:** Changes to tiers, free limits, enterprise terms
- **Hiring signals:** Job postings revealing strategic bets
- **Partnership signals:** Integrations, acquisitions, ecosystem moves
- **Messaging signals:** Changes in positioning, audience, value proposition

## Process

### First Run (Full Report)
1. For each competitor provided, scan all five signal categories
2. Categorise each signal found
3. Assess: reactive (responding to market) or proactive (setting direction)?
4. Rate threat level: High / Medium / Low / Watch
5. Connect each signal to a specific item on the provided roadmap
6. Recommend response: Accelerate / Deprioritise / Monitor / Investigate
7. **Validate** — Every High signal must have a specific recommended action and owner. "Monitor" is only acceptable for Low and Watch ratings.

### Subsequent Runs (Diff Only)
1. Compare current signals against previous run summary
2. Output ONLY what is new or changed since last run
3. Flag if a previously Low signal has escalated to High
4. Keep output under 300 words — brevity is the point

## Output Structure

### Competitive Intelligence Brief — [Date]
**New Since Last Run:** [n signals]

#### 🔴 High Priority
**[Competitor]:** [Signal] → [Implication] → [Recommended action + owner]

#### 🟡 Watch
**[Competitor]:** [Signal] → [Why it matters now]

#### ✅ No Change
[Competitors with no new signals this week]

**This Week's Strategic Summary:**
[2 sentences max — what is the overall competitive landscape doing?]

## Quality Checks

- [ ] Every High-priority signal has a specific response action and owner
- [ ] Signals are categorised (not just listed as "they did X")
- [ ] Roadmap connections are specific (not "generally relevant")
- [ ] Diff mode output is under 300 words
- [ ] Strategic summary describes the landscape trend, not just repeats individual signals
