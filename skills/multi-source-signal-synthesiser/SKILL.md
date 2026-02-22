---
name: multi-source-signal-synthesiser
description: Synthesises user signals from multiple research sources into a 
unified insight brief, reconciling conflicting feedback. Use when user has data 
from multiple sources, needs to "make sense of all this user data", "what are 
users really telling us", "synthesise our research", or has conflicting feedback 
from different channels.
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: discovery
  tags: [user-research, synthesis, discovery, insights]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Multi-Source Signal Synthesiser Skill

## Purpose
Reconcile user signals from multiple sources — interviews, support tickets, NPS, 
app reviews, sales calls — into a unified, weighted insight brief that surfaces 
the underlying need rather than the surface-level request.

## Source Weighting (default — adapt to your context)
- Direct research (interviews, usability tests): weight 5
- Support tickets (unprompted pain signals): weight 4
- NPS verbatims: weight 3
- App store reviews: weight 2
- Sales call summaries (filtered through sales lens): weight 2
- Anecdote or single report: weight 1

## Process
1. Accept inputs from any combination of the source types above
2. Tag each signal by source and apply weight
3. Look for CONVERGENCE: same underlying need appearing across 3+ sources
4. Look for DIVERGENCE: contradictory signals suggesting user segmentation
5. Distinguish surface request from underlying need
   (e.g. "faster export" may mean "I don't trust the data will be there when 
   I need it")
6. Produce ranked insights by weighted frequency

## Output Format

### User Signal Synthesis — [Date / Period]
**Sources included:** [list]
**Total signals processed:** [n]

#### Insight 1: [Underlying need, not feature request]
- **Confidence:** High / Medium / Low (based on source diversity and weight)
- **Evidence:** [Signals from each source supporting this]
- **Conflicting signals:** [Any contradicting evidence and how to interpret it]
- **Product implication:** [Specific, not generic]

[Repeat for top 3-5 insights]

#### Divergent Signals (Possible Segmentation)
[Where user groups appear to have genuinely different needs]

#### What the Data Does NOT Tell Us
[Gaps that require further research before acting]

## OpenClaw Configuration
Connect to: Notion (research docs), support inbox, NPS tool, app review feed.
Schedule: weekly synthesis run, diff output showing new signals only.
