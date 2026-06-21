# Sprint Velocity Analysis

Analyze sprint velocity data to produce an honest engineering team health report. The goal is not to generate optimistic-looking charts — it is to surface delivery patterns, identify dysfunction early, and give the team and their manager actionable recommendations. Look for: velocity trends (improving, declining, flat, erratic), story point calibration consistency, carry-over patterns that indicate chronic over-commitment, and capacity-related signals. Produce text-based trend visualizations, a health diagnosis, and specific improvement recommendations with measurable targets.

## Required Inputs

Ask for these if not already provided:
- **Sprint history** — for each sprint: sprint name/number, committed story points, completed story points, and number of items carried over to next sprint; ideally 6–8 sprints minimum
- **Team size and any changes** — current team size and any additions or departures during the data window
- **Known disruptions** — holidays, company all-hands, on-call incidents, or other events that affected specific sprints
- **Cycle time data (optional)** — if available, p50 and p90 cycle time per sprint (time from start to done)
- **Definition of Done** — what "completed" means for this team (merged to main? deployed to prod? accepted by PO?)

If cycle time data is not provided, omit that section and note it as a recommended data source to add.

## Output Format

---

# Sprint Velocity Analysis: [Team Name]

**Analysis period:** Sprint [N] through Sprint [N+7] ([Date range])
**Team size:** [X engineers] ([note any changes during period])
**Report date:** [Date]
**Data source:** [Where this data came from — Jira, Linear, spreadsheet, etc.]

---

## Velocity Trend

### Raw Data

| Sprint | Committed | Completed | Completion Rate | Carried Over | Notes |
|--------|-----------|-----------|----------------|--------------|-------|
| [Sprint N] | [X pts] | [X pts] | [X%] | [X pts / X items] | [disruption or context] |
| [Sprint N+1] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+2] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+3] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+4] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+5] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+6] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| [Sprint N+7] | [X pts] | [X pts] | [X%] | [X pts / X items] | |
| **Average** | **[X pts]** | **[X pts]** | **[X%]** | **[X pts]** | |

### Velocity Chart (Completed Points per Sprint)

```
Points
  60 |
  55 |          ●
  50 |    ●           ●
  45 | ●        ●          ●
  40 |               ●          ●
  35 |
  30 |
     +--+--+--+--+--+--+--+--
      N N+1 N+2 N+3 N+4 N+5 N+6 N+7
      Sprint

  ● = Completed points   — = Average ([X pts])
```

Generate this chart using ASCII characters based on the actual data provided. Scale the Y-axis to the data range. Plot completed (not committed) points. Mark the average as a dashed line.

### Trend Diagnosis

| Metric | Value | Interpretation |
|--------|-------|----------------|
| Average velocity | [X pts/sprint] | [Baseline for planning] |
| Velocity std deviation | [±X pts] | [Low < 15% of avg = stable; High > 25% = erratic] |
| Trend direction | [Improving / Flat / Declining / Erratic] | [3-sprint trailing average vs. 3-sprint leading average] |
| Average completion rate | [X%] | [Healthy: 80–95%; < 75% = chronic over-commitment] |
| Carry-over rate | [X% of committed points carried over per sprint] | [Healthy: < 15%; > 25% = systemic issue] |
| Sprints with completion rate < 75% | [X of 8 sprints] | [> 3 of 8 = structural problem, not noise] |

---

## Story Point Calibration

Story points are only useful if they are applied consistently. Look for these calibration signals in the data:

| Signal | Observed | Interpretation |
|--------|----------|----------------|
| High variance in velocity despite stable team size | [Yes / No] | Suggests inconsistent estimation — same effort scored differently week to week |
| Consistent over-commitment (committed >> completed) | [Yes / No — by avg X pts per sprint] | Team is sandbagging estimates or ignoring historical capacity |
| Consistent under-commitment (completed >> committed by > 20%) | [Yes / No] | Team is over-padding estimates or pulling in unplanned work frequently |
| Frequent large items (> 13 pts) in carry-over | [Yes / No] | Items are too large to estimate reliably — need better decomposition |
| Velocity cliff after team change | [Yes / No — Sprint N+X] | Team did not re-baseline capacity after composition changed |

**Calibration verdict:** [Well-calibrated / Needs recalibration / Severely uncalibrated — one sentence explanation tied to the signals above]

**If recalibration is needed:** [Specific recommendation — e.g., "Run a calibration session using the last 20 completed items, re-score them as a team, and use the resulting relative sizes to anchor future estimates."]

---

## Carry-Over Pattern Analysis

Carry-over is the most reliable leading indicator of commitment reliability problems.

| Sprint | Carried-Over Items | Common Themes in Carry-Over |
|--------|-------------------|----------------------------|
| [Sprint N] | [X items / X pts] | [Technical debt, dependency blocked, scoped wrong, etc.] |
| [Sprint N+1] | [X items / X pts] | [Theme] |
| [Sprint N+2] | [X items / X pts] | [Theme] |

**Carry-over root causes identified:**
- [Root cause 1: e.g., "5 of 12 carry-overs were blocked on a third-party API integration — external dependency, not estimation failure"]
- [Root cause 2: e.g., "4 of 12 carry-overs were items estimated at 8+ points that were later found to be 2–3x larger than expected"]
- [Root cause 3: e.g., "3 of 12 carry-overs were interruptions from on-call incidents consuming unplanned capacity"]

---

## Capacity Utilization

| Sprint | Team Size | Available Capacity (pts) | Committed | Utilization % | Disruptions |
|--------|-----------|--------------------------|-----------|--------------|-------------|
| [Sprint N] | [X engineers] | [X pts] | [X pts] | [X%] | [Holiday / incident / none] |
| [Sprint N+1] | [X engineers] | [X pts] | [X pts] | [X%] | |

**Capacity calculation used:** [X engineers × Y pts/person/sprint = Z pts available. Adjust: if team capacity changed during the window, note which sprints used which team size.]

**Average utilization:** [X%]
**Utilization interpretation:** [< 70% = team is under-loaded or over-padding | 70–90% = healthy range | > 90% = no slack for unplanned work — fragile]

---

## Health Diagnosis

| Dimension | Score | Evidence | Priority |
|-----------|-------|----------|----------|
| Delivery predictability | [Green / Yellow / Red] | [Average completion rate X%, std dev Y pts] | [High / Med / Low] |
| Commitment accuracy | [Green / Yellow / Red] | [Team over-commits by avg X pts/sprint] | |
| Estimation consistency | [Green / Yellow / Red] | [Velocity std dev ±X pts, calibration verdict] | |
| Carry-over hygiene | [Green / Yellow / Red] | [X% carry-over rate, root causes] | |
| Capacity management | [Green / Yellow / Red] | [Avg utilization X%, disruption handling] | |
| Trend direction | [Green / Yellow / Red] | [Trailing 3-sprint avg vs. leading 3-sprint avg] | |

**Scoring guide:** Green = operating within healthy range; Yellow = marginal — watch closely or single-sprint anomaly; Red = chronic issue requiring active intervention.

**Overall health:** [Green / Yellow / Red] — [One sentence summary: "The team delivers consistently at X pts/sprint but chronic over-commitment is eroding morale and creating a misleading picture for stakeholders."]

---

## Blocker Frequency Analysis

If blocker data was provided, complete this section. If not, note it as a recommended tracking addition.

| Blocker Category | Frequency (last 8 sprints) | Avg Days Blocked | Impact (pts delayed) |
|-----------------|--------------------------|------------------|---------------------|
| External dependency | [X occurrences] | [X days] | [X pts] |
| Technical debt / rework | [X occurrences] | [X days] | [X pts] |
| Unclear requirements | [X occurrences] | [X days] | [X pts] |
| On-call interruptions | [X occurrences] | [X days] | [X pts] |
| Environment / tooling | [X occurrences] | [X days] | [X pts] |

**Top blocker to address:** [Name the single highest-impact blocker category and what addressing it would mean for velocity.]

---

## Improvement Recommendations

Provide 3 specific recommendations ordered by expected impact. Each recommendation must include a measurable success target and implementation steps.

### Recommendation 1: [Title]

**Problem it addresses:** [Which health dimension is Red or Yellow, and what the data shows]

**What to do:**
1. [Specific action step — concrete enough that a tech lead can assign it]
2. [Next step]
3. [Next step]

**Who owns it:** [Tech lead / Engineering manager / Whole team]
**When to start:** [This sprint / Next sprint / Within 2 weeks]

**Measurable target:** [e.g., "Carry-over rate drops below 15% within 3 sprints" or "Completion rate above 80% for 4 consecutive sprints"]

**How to know it's working:** [Leading indicator to watch before the outcome metric improves — e.g., "Carry-over items decreasing sprint-over-sprint even before the target is hit"]

---

### Recommendation 2: [Title]

**Problem it addresses:** [Health dimension and evidence]

**What to do:**
1. [Step]
2. [Step]
3. [Step]

**Who owns it:** [Role]
**When to start:** [Timing]

**Measurable target:** [Specific metric and timeframe]

**How to know it's working:** [Leading indicator]

---

### Recommendation 3: [Title]

**Problem it addresses:** [Health dimension and evidence]

**What to do:**
1. [Step]
2. [Step]

**Who owns it:** [Role]
**When to start:** [Timing]

**Measurable target:** [Specific metric and timeframe]

**How to know it's working:** [Leading indicator]

---

## Next-Sprint Capacity Forecast

**Next sprint:** [Sprint N+8]
**Known team size:** [X engineers]
**Known capacity reducers:** [PTO: X days total, on-call rotation: ~Y pts of unplanned capacity, etc.]

| Factor | Impact |
|--------|--------|
| Base capacity (historical average) | [X pts] |
| PTO / planned absences | −[X pts] |
| On-call overhead (estimate) | −[X pts] |
| Carry-over from Sprint [N+7] | +[X pts committed capacity already spoken for] |
| **Recommended commitment ceiling** | **[X pts]** |

**Confidence:** [High — stable team and known capacity | Medium — some uncertainty in disruption level | Low — team composition uncertain]

**Recommendation for planning:** [One sentence — e.g., "Plan to Sprint [N+8] ceiling of X pts. Given the carry-over items, prioritize completing those before pulling in new scope."]

---

## Cycle Time Distribution (if data provided)

| Sprint | p50 Cycle Time | p90 Cycle Time | Items Completed |
|--------|---------------|---------------|-----------------|
| [Sprint N] | [X days] | [X days] | [X items] |
| [Average] | [X days] | [X days] | |

**Cycle time interpretation:** [p90 > 2× p50 indicates a long-tail of stuck items that deserve investigation. p50 increasing over time indicates slowing throughput independent of story point changes.]

If cycle time data was not provided: *Cycle time data was not included in this analysis. Recommend adding p50 and p90 cycle time per sprint to your tracking to detect throughput issues that story points alone cannot reveal.*

---

## Quality Checks

- [ ] Velocity chart is generated from the actual data provided — not a generic placeholder chart
- [ ] Trend diagnosis states a direction (Improving / Flat / Declining / Erratic) with a quantitative basis (trailing vs. leading average)
- [ ] Carry-over root causes are specific categories with counts — not a generic observation that carry-over exists
- [ ] Each of the 3 recommendations includes a named owner, a start date, and a measurable target with a timeframe
- [ ] Next-sprint capacity forecast uses historical average as the baseline and deducts specific known reducers
- [ ] Health diagnosis table uses Red/Yellow/Green with evidence cited in the Evidence column — no unsupported scores
- [ ] If metrics are missing (cycle time, blocker log), the report explicitly calls them out as recommended additions

## Anti-Patterns

- [ ] Do not generate the velocity chart from placeholder data — it must reflect the actual sprint data provided
- [ ] Do not diagnose trend direction without computing trailing vs leading averages — "it looks like it's declining" is not a diagnosis
- [ ] Do not list carry-over as a generic observation — identify root cause categories with counts for the analysis to be actionable
- [ ] Do not produce recommendations without a named owner, a start date, and a measurable target
- [ ] Do not score health dimensions without citing evidence in the Evidence column — unsupported Red/Yellow/Green scores are not credible
