# Example: user-research-synthesis

## What this skill does

Synthesises mixed research sources (surveys, support tickets, interviews, feedback) into themed insights with prevalence data, a pain-point severity table, prioritised feature requests and recommended next steps.

## How to trigger it

### Example 1: combining a survey with support tickets

**You say:**
> "Synthesise our Q3 research: NPS survey (214 responses with verbatims), 120 support tickets tagged 'reporting', and notes from 4 customer calls. Topic: why mid-size customers rate reporting poorly."

**Claude produces (excerpt):**

# User Research Synthesis: Mid-size Reporting Dissatisfaction

## Research Overview
- **Methodology**: NPS verbatims (214) + ticket analysis (120) + 4 call notes
- **Research Questions**: why do mid-size accounts rate reporting 2+ points below SMB?

## Executive Summary
Reporting dissatisfaction is concentrated in one workflow: exporting data for a board pack. Mid-size customers rebuild our reports in spreadsheets monthly, and every pain point below is a step in that rebuild.

## Key Themes

### Theme 1: The monthly rebuild (strongest signal, all three sources)
Survey: 41 of 68 reporting-related verbatims mention export or "redo in Excel". Tickets: 54 of 120 are export-format issues. Calls: all 4 described a month-end ritual of screenshotting charts.
> "I pay for dashboards and then remake them in PowerPoint every month." (NPS verbatim, score 4)

## Pain Points Summary

| Pain Point | Severity | Frequency | Current Workaround |
|---|---|---|---|
| No scheduled export | High | 54/120 tickets | manual monthly export |
| Charts not copyable | High | 4/4 calls | screenshots |
| Date ranges reset per view | Medium | 19 verbatims | re-set filters each time |

## Feature Requests

### Must-Have
1. **Scheduled board-pack export (PDF/PPT)** - supported by all three sources; directly addresses the rebuild ritual

## Recommendations
1. Prototype the scheduled export with the 4 call participants; they have the ritual, so they can falsify the design fastest.

### Example 2: when sources disagree

**You say:**
> "The survey says people want more chart types but tickets never mention it. How do I read that?"

**Claude produces (excerpt):**

**The disagreement is the insight:** surveys capture aspiration, tickets capture obstruction. "More chart types" appears in 23 verbatims but zero tickets, meaning nobody is blocked by it; the rebuild workflow appears in both, meaning people are blocked and paying a monthly cost. Prioritise what obstructs over what would be nice, and treat survey-only requests as discovery candidates, not commitments.

## Tips for best results

- Give every source you have, labelled; prevalence across sources is what separates themes from anecdotes.
- Include the negative space; say which segments or sources are missing so the synthesis states its blind spots.
- Ask for the pain table sorted by workaround cost; workarounds are where customers spend real time.

## Related skills

- `user-interview-synthesis` when the input is interview transcripts specifically
- `feature-prioritisation` to turn the must-have list into a sequenced plan
