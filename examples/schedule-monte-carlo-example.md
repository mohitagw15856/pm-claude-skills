# Example: schedule-monte-carlo

## What this skill does

Simulates a project's finish as a distribution over the task graph: P10/P50/P90 completion, the gap versus the sum-of-likelies date, and per-task criticality showing which tasks actually control the timeline.

## How to trigger it

### Example 1: an honest commit date

**You say:**
> "Our migration plan: 8 tasks with optimistic/likely/pessimistic days: design 3/5/9, auth 4/6/14, data export 5/8/20, import 4/6/12, validation 3/4/8, cutover 1/2/4, docs 2/3/5, training 2/3/6. Some run in parallel [graph given]. Leadership wants a date."

**Claude produces (excerpt):**

Running the bundled simulator (seeded, 10,000 runs over the task graph):

**The headline gap:**
- Deterministic (sum of likelies on the critical path): **22 days**
- **P50: 27 days | P90: 34 days**
- The 5-day deterministic-to-P50 gap is the lie the old plan told; adding "likely" estimates systematically understates, because delays add and savings do not.

**The commitment guidance:** promise **27 days internally, 34 externally**; the 7 days between is the honesty budget, spend it on the unknowns below.

**Criticality table:**
| Task | Criticality |
|---|---|
| data export | 0.91 |
| auth | 0.62 |
| import | 0.44 |

Data export sits on the critical path in 91% of simulations *and* has the widest range (5 to 20 days): that task *is* the schedule. A one-day improvement there moves P50 nearly a day; a day saved on docs moves nothing.

**Model limits:** no resource contention or calendar effects; real schedules are worse, so treat these as optimistic floors.

### Example 2: defending the date under pressure

**You say:**
> "Leadership wants the 22-day date in the plan anyway. What do I show them?"

**Claude produces (excerpt):**

**Show the survival line:** the simulation gives 22 days a **19% chance**. Committing to it is committing to a 4-in-5 chance of a public slip.

**The reframe that usually lands:** offer the choice as dates-with-odds: "22 days at 19%, 27 at 50%, 34 at 90%. Which probability do you want your name on?" The argument stops being optimism versus pessimism and becomes a risk appetite decision, which is genuinely theirs to make.

**And one lever, not just odds:** de-risking data export (the 0.91-criticality task) with a 2-day spike this week is the only action that moves every number.

## Tips for best results

- Give three-point estimates per task and the dependency graph; the distribution comes from both.
- Ask for criticality, not just dates; it tells you where attention moves the schedule.
- Commit P50 inside, P90 outside, and say so openly; the gap is policy, not padding.

## Related skills

- `ship-or-slip` for a quick read on one at-risk date rather than a full simulation
- `sprint-planning` to plan the near-term window the simulation says is critical
