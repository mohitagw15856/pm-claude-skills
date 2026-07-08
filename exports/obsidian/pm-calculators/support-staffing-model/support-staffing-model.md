---
aliases: ["Support Staffing Model"]
tags: [pm-skills, skill]
skill: support-staffing-model
description: "How many support agents does the queue actually need — Erlang C, computed, not 'tickets per agent' folklore. Use when staffing a support/CS team, defending headcount, or checking whether an SLA is mathematically possible with the current roster. Produces agent counts across load scenarios (with shrinkage), occupancy and average-wait numbers, and a real .xlsx — via the bundled zero-dependency script."
---

# Support Staffing Model

Queues are counterintuitive: at high occupancy, one extra contact per hour explodes wait times, and "tickets ÷ tickets-per-agent" staffing walks teams straight into the cliff. Erlang C is the century-old math call centers run on; this skill runs it for you, honestly labelled.

## Required Inputs

- **Contacts per hour** (peak hour, not daily average — queues die at peaks) and **average handle time** in minutes.
- **The SLA** — "X% answered within Y seconds/minutes". If none exists, propose one before staffing to it.
- **Shrinkage** — the fraction of paid time agents aren't available (meetings, breaks, training). Teams that skip this understaff by 30-40%; default 0.3.

## Output Format

1. **The staffing table** — for load scenarios (0.8×, 1×, 1.25×, 1.5×): agents on-queue, rostered headcount after shrinkage, achieved service level, average speed of answer, occupancy.
2. **The occupancy warning** — anywhere occupancy exceeds ~90%, say plainly: the SLA may hold while the team burns out; staff for the humans.
3. **The folklore contrast** — the naive tickets-per-agent number next to the Erlang answer, so the reader sees what the old method was hiding.
4. **Model limits, stated** — M/M/c assumes Poisson arrivals; real queues are burstier, so these are floors.

## Programmatic Helper

This skill ships `scripts/erlang_staffing.py` — **zero dependencies**; run it rather than approximating:

```bash
python3 scripts/erlang_staffing.py plan staffing.xlsx --arrivals 120 --aht 6 --sla 0.8 --answer-in 60 --shrinkage 0.3
```

Prints the base case (`base 15 on-queue / 22 rostered · SL 81% · ASA 38s · occ 80%`) and writes an `.xlsx` with editable assumption cells and the scenario table. Requires a code-execution environment.

## Quality Checks

- [ ] Numbers come from the script's Erlang C computation, quoted — never estimated in prose
- [ ] Shrinkage is applied and its value stated; a 0% shrinkage plan is flagged as fiction
- [ ] Occupancy appears next to every scenario, with the >90% burnout warning where it triggers
- [ ] Peak-hour arrivals were used, or the answer says "daily average used — peaks will breach"
- [ ] The M/M/c floor-not-ceiling caveat is present

## Anti-Patterns

- [ ] Do not staff to average load — the queue's whole cruelty lives in the peaks
- [ ] Do not present on-queue count as headcount — shrinkage is the difference between a model and a roster
- [ ] Do not chase 99% SLAs without showing the cost curve — the last few points of service level are where budgets go to die
- [ ] Do not ignore occupancy because the SLA passes — attrition is a lagging indicator of this exact number
- [ ] Do not use this for email/async queues with day-long SLAs without saying the model degrades — Erlang C is built for live channels

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
