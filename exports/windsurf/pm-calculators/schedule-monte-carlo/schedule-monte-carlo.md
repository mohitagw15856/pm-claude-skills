---
trigger: model_decision
description: "Project completion as a distribution, not a date — Monte Carlo over the task graph. Use when a plan's finish date came from summing 'likely' estimates (it's wrong, mathematically), when leadership needs a commit date, or when you need to know which tasks actually control the timeline. Produces P10/P50/P90 completion, per-task criticality (how often each task sits on the critical path), and a real .xlsx — via the bundled zero-dependency simulator, deterministic with a seed."
---

# Schedule Monte Carlo

Summing the "likely" estimates systematically understates the finish: parallel branches mean the *slowest* path wins each roll, and that maximum is always worse than the middle. This skill runs the actual simulation — thousands of schedule rolls over the dependency graph — and reports the date the way it behaves: as percentiles.

## Required Inputs

- **The task list with three-point estimates** — per task: optimistic / likely / pessimistic (any consistent unit) and dependencies. Honest pessimistics are the whole game: "what if the API vendor ghosts us for two weeks" belongs in that number.
- Simulation count and seed (optional; defaults 5,000 and a fixed seed — results are reproducible).

## Output Format

1. **The headline gap** — deterministic finish (sum-of-likelies) vs P50 vs P90, side by side. The deterministic-to-P50 gap is the lie the old plan told; show it first.
2. **The commitment guidance** — promise P50 internally, P90 externally; the space between is the honesty budget. Name the dates.
3. **Criticality table** — per task, the share of simulations where it sat on the critical path. The top 2-3 are where management attention belongs; a task at 0.9 criticality with a wide estimate range is the schedule.
4. **Model limits** — no resource contention or calendar effects; real schedules are worse, so these are optimistic floors.

## Programmatic Helper

Ships `scripts/schedule_sim.py` — **zero dependencies**, cycle-detecting, deterministic:

```bash
python3 scripts/schedule_sim.py run schedule.xlsx --tasks tasks.json --sims 5000
# tasks.json: [{"name":"design","optimistic":3,"likely":5,"pessimistic":10,"depends":[]}, …]
```

Prints `deterministic=21.0 P10=22.3 P50=27.0 P90=32.3 · top critical: design, integrate…` and writes the summary + criticality sheets. Requires a code-execution environment.

## Quality Checks

- [ ] The simulation ran (output quoted); percentiles were never eyeballed
- [ ] The deterministic-vs-P50 gap is stated explicitly and first — it is the finding most rooms need
- [ ] Criticality is reported per task and drives the "watch these" recommendation
- [ ] Pessimistic estimates were interrogated: if every task's pessimistic is likely×1.2, say the inputs are optimistic theatre and the output inherits it
- [ ] Internal-vs-external commitment dates are both named

## Anti-Patterns

- [ ] Do not present P50 as "the date" — the median loses half the time, by definition
- [ ] Do not let uniform ±20% estimates pass silently — real uncertainty is lumpy, and flat inputs mean nobody thought about failure modes
- [ ] Do not hide the deterministic number — showing plan-math next to real-math is how the method earns adoption
- [ ] Do not add hidden buffers on top of P90 — the whole point is replacing padding with arithmetic
- [ ] Do not simulate a 200-task plan at task granularity — roll up to workstreams; precision theatre at that scale is its own lie
