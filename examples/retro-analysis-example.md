# Example: retro-analysis

## What this skill does

Turns sprint delivery data into a retrospective brief: completion numbers, what the data suggests, Start/Stop/Continue prompts grounded in this sprint, and one testable experiment for the next one.

## How to trigger it

### Example 1: a retro brief from sprint stats

**You say:**
> "Retro brief for sprint 34: planned 21 tickets, completed 14, carried over 7. Unplanned work: 6 tickets (support escalations), about 25% of capacity. Velocity 38 points vs 45 average. Standups kept running long."

**Claude produces (excerpt):**

### Sprint 34 Retrospective Brief

**By the Numbers:**
- Planned: 21 | Completed: 14 | Carry-over: 7 | Completion rate: 67%
- Unplanned work: 6 tickets (~25% of capacity)
- Velocity: 38 points vs 45 average

**What the Data Suggests:**
- The team effectively planned at 100% capacity while reality delivered 75%; the 7 carry-overs are arithmetic, not underperformance.
- Six support escalations in one sprint is a pattern, not noise; two sprints ago it was 5.
- Velocity dip tracks the unplanned share almost exactly; the team is not slower, it is interrupted.

**Discussion Prompts:**
- Start: reserving a fixed interrupt budget (5 points?) and a named interrupt-handler rotation.
- Stop: planning to the average-velocity number while absorbing 25% interrupts; one has to give.
- Continue: the escalations were all resolved within SLA; whatever triage is doing, keep it.

**Suggested Experiment for Next Sprint:**
One named interrupt-handler; everyone else protected. Success metric: completion rate ≥ 85% of planned tickets with SLA held.

### Example 2: when the numbers look fine but the sprint felt bad

**You say:**
> "Sprint 35: 19 of 20 done, velocity on average, but the team said it was the worst sprint in months. Reviews sat 2 days average, and 4 tickets bounced back from QA twice."

**Claude produces (excerpt):**

**What the Data Suggests:**
- Completion hides queue pain: 2-day review latency means work was done early and sat; the sprint "finished" in its last 48 hours.
- Four double-bounces from QA is rework masquerading as throughput; those tickets were counted once and built three times.

**Discussion Prompts:**
- Start: a review SLA (24h) with a visible queue age board.
- Stop: counting a QA bounce-back as the same ticket; name rework so it shows up in the numbers that felt fine.

**Experiment:** track "first-pass QA rate" next sprint; success is surfacing the number, not hitting a target yet.

## Tips for best results

- Paste the raw counts: planned, done, carried, unplanned, velocity vs average; the brief is only as honest as these.
- Add one line of how the sprint felt; the gap between feel and numbers is where the retro lives.
- Insist on one experiment with a success metric; retros that output lists change nothing.

## Related skills

- `sprint-planning` to apply the retro's capacity lesson to the next plan
- `incident-postmortem` when one event, not a pattern, wrecked the sprint
