# Example: support-staffing-model

## What this skill does

Computes how many support agents a queue actually needs using Erlang C rather than tickets-per-agent folklore: staffing across load scenarios with shrinkage, occupancy and wait numbers, and a real .xlsx via a bundled zero-dependency script.

## How to trigger it

### Example 1: defending a headcount ask

**You say:**
> "We get about 420 chats a day over a 10-hour window, average handle time 8 minutes, SLA is 80% answered within 60 seconds. Shrinkage around 30%. Finance says 6 agents is plenty because '70 tickets per agent per day'. What does the maths say?"

**Claude produces (excerpt):**

Running the bundled Erlang C calculator (42 chats/hour, AHT 8 min, SLA 80/60, shrinkage 30%):

**The staffing table:**

| Load | Chats/hr | Agents on-queue | Rostered (after 30% shrinkage) | Service level | Avg wait | Occupancy |
|---|---|---|---|---|---|---|
| 0.8× | 34 | 7 | 10 | 86% | 21s | 65% |
| 1× | 42 | 8 | 12 | 83% | 28s | 70% |
| 1.25× | 53 | 10 | 15 | 81% | 33s | 71% |
| 1.5× | 63 | 11 | 16 | 80% | 38s | 76% |

**The folklore contrast:** "70 tickets per agent" prices the day at 6 agents. At 6 on-queue, occupancy is 93% and the SLA collapses to roughly 31% within 60 seconds; queues are nonlinear near saturation, which is exactly what per-agent arithmetic cannot see. The real answer at expected load is **8 on-queue, 12 rostered**.

**The occupancy warning:** nothing in the 1× row exceeds 90%, so this roster is sustainable. The 6-agent plan is not; it may survive a quiet week and will burn the team on any normal one.

**Model limits, stated:** M/M/c assumes smooth Poisson arrivals; real chat traffic is burstier (lunchtime peaks, outage spikes), so treat these as floors, not ceilings.

### Example 2: checking whether an SLA is even possible

**You say:**
> "Same queue, but leadership wants 90% in 30 seconds without hiring. Possible with 12 rostered?"

**Claude produces (excerpt):**

**Re-run at SLA 90/30:** 12 rostered gives 8 on-queue, which achieves **71% in 30 seconds**, not 90%. Hitting 90/30 needs 10 on-queue, which is **15 rostered** at your shrinkage.

**The honest options:** hire 3, cut shrinkage from 30% to ~20% (worth about 1.5 agents), or keep 80/60. What is not an option is declaring 90/30 with this roster; the arithmetic does not bend.

## Tips for best results

- Give arrivals, handle time, SLA target and shrinkage; shrinkage is the number everyone forgets and it is a third of the answer.
- Ask for the load scenarios; staffing to the average guarantees failing the peaks.
- Watch the occupancy column, not just the SLA column; one measures the customers, the other the humans.

## Related skills

- `cs-health-scorecard` for measuring the team's outcomes once it is staffed
- `runway-planner` when the staffing cost feeds a budget conversation
