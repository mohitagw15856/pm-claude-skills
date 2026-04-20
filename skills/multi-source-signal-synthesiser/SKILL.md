---
name: multi-source-signal-synthesiser
description: "Synthesise user signals from multiple research sources into a unified insight brief, reconciling conflicting feedback. Use when asked to make sense of data from multiple sources, synthesise user research, reconcile conflicting feedback, or when the user says 'what are users really telling us' or 'make sense of all this user data'. Produces ranked insights with confidence ratings, divergent signal analysis, and research gap identification."
---

# Multi-Source Signal Synthesiser

Reconcile user signals from multiple sources — interviews, support tickets, NPS, app reviews, sales calls — into a unified, weighted insight brief that surfaces the underlying need rather than the surface-level request.

## Required Inputs

Ask the user for these if not provided:
- **Signal sources** (interviews, support tickets, NPS verbatims, app reviews, sales calls, analytics — any combination)
- **Time period** covered by the data
- **Product area or feature** the signals relate to (if scoped)

## Source Weighting (default — adapt to context)

| Source | Weight | Rationale |
|--------|--------|-----------|
| Direct research (interviews, usability tests) | 5 | Highest-fidelity, structured |
| Support tickets (unprompted pain signals) | 4 | Real pain, unfiltered |
| NPS verbatims | 3 | Broad but shallow |
| App store reviews | 2 | Public, self-selected |
| Sales call summaries | 2 | Filtered through sales lens |
| Anecdote or single report | 1 | Low confidence alone |

## Process

1. Tag each signal by source and apply weight
2. Look for **convergence**: same underlying need appearing across 3+ sources
3. Look for **divergence**: contradictory signals suggesting user segmentation
4. Distinguish surface request from underlying need (e.g. "faster export" may mean "I don't trust the data will be there when I need it")
5. Produce ranked insights by weighted frequency
6. **Validate**: Confirm each insight has evidence from at least 2 source types. Flag any insight resting on a single source as low-confidence.

## Output Structure

### User Signal Synthesis — [Date / Period]
**Sources included:** [list with count per source]
**Total signals processed:** [n]

#### Insight 1: [Underlying need, not feature request]
- **Confidence:** High / Medium / Low (based on source diversity and weight)
- **Evidence:** [Signals from each source supporting this]
- **Conflicting signals:** [Any contradicting evidence and how to interpret it]
- **Product implication:** [Specific next step, not generic]

[Repeat for top 3-5 insights]

#### Divergent Signals (Possible Segmentation)
[Where user groups appear to have genuinely different needs — specify which segments]

#### What the Data Does NOT Tell Us
[Gaps that require further research before acting]

## Quality Checks

- [ ] Every insight references at least 2 distinct source types
- [ ] Surface requests are translated to underlying needs (not just echoed)
- [ ] Divergent signals identify the specific user segments, not just "some users disagree"
- [ ] Confidence ratings are consistent with source diversity and weighting
