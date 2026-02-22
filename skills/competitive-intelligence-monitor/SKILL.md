---
name: competitive-intelligence-monitor
description: Continuously monitors competitor signals and surfaces strategic 
implications for your roadmap. Use when user asks to "monitor competitors", 
"track competitive landscape", "what are competitors doing this week", 
"competitive briefing", or "what has changed in the market".
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: strategy
  tags: [strategy, competitive-intel, roadmapping]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Competitive Intelligence Monitor Skill

## Purpose
Turn scattered competitor updates into structured weekly intelligence — not just 
"what they did" but "what changed since last week and what it means for us."

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

### Subsequent Runs (Diff Only)
1. Compare current signals against previous run summary
2. Output ONLY what is new or changed since last run
3. Flag if a previously Low signal has escalated to High
4. Keep output under 300 words — brevity is the point

## Output Format

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

## OpenClaw Configuration
Add to YAML frontmatter for scheduled runs:
`schedule: weekly-monday-0800`
Persistent memory stores last run summary for diff comparison.
