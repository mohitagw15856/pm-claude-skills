---
name: autopilot-charter
description: "Decide which of your recurring rituals to put on autopilot — and which to keep manual. Use when asked what to automate, how to set up recurring AI runs, which reports or briefings could run on a schedule, or to design an automation charter for a team. Produces a ritual inventory with automate/assist/keep-manual calls, guardrails per ritual, and a rollout order."
---

# Autopilot Charter Skill

Inventory the reports, briefings, and reviews you produce on a rhythm, and decide — deliberately — which ones an AI should run on a schedule, which it should only draft, and which stay human.

## What This Skill Produces

- A **ritual inventory**: every recurring artifact, its cadence, audience, and inputs
- An **automate / assist / keep-manual** call per ritual, with the reason
- **Guardrails** for each automated ritual (review gate, failure behaviour, escalation)
- A **rollout order** — which ritual to automate first and why

## Required Inputs

Ask for (if not already provided):
- **The recurring outputs** the user or team produces (weekly updates, monthly reviews, monitors, digests)
- **Who consumes each one** and what they do with it
- **Where the inputs live** (git, analytics, CRM, inbox, notes) and whether an agent can reach them
- **Tolerance for error** per artifact — what happens if a run is wrong or missing?

## Classification Framework

Score each ritual on four questions, then classify:

| Question | Points toward automating |
|---|---|
| **Inputs reachable?** Can an agent read the sources without a human fetching them? | Yes |
| **Structure stable?** Does the output look the same every cycle? | Yes |
| **Cost of a bad run?** Would a wrong or stale edition mislead a decision? | Low cost |
| **Delta-shaped?** Is the value "what changed since last time" rather than fresh judgement? | Yes |

- **Automate** — all four favourable. Schedule it end-to-end; the human sees the result, not the work.
- **Assist** — structure is stable but judgement or unreachable inputs remain. Schedule a *draft*; a human finishes it.
- **Keep manual** — high cost of error, or the ritual's value *is* the human thinking (performance feedback, strategy). Do not automate; record why so nobody re-litigates it.

## Guardrails (required for every "Automate")

For each automated ritual, define:
- **Review gate** — does an edition ship unreviewed, or land as a draft for approval? Default to draft for anything audience-facing.
- **Failure behaviour** — if a run fails or a source is unreachable, does it skip, retry, or alert? A silent gap is worse than an error message.
- **Staleness marker** — every edition states when it ran and which sources it read.
- **Kill criteria** — what result (two wrong editions? a complaint from the audience?) takes it off autopilot.

## Output Format

### Automation Charter: [Team / Person]

| Ritual | Cadence | Audience | Call | Why |
|---|---|---|---|---|
| [artifact] | [weekly/monthly] | [who] | Automate / Assist / Manual | [one line] |

**Guardrails for automated rituals:**

**[Ritual]** — Review gate: [ship / draft-for-approval]. On failure: [skip+alert / retry]. Staleness marker: [where it appears]. Kill criteria: [condition].

**Rollout order:** Start with [ritual] because [lowest risk / most time saved]. Then [next]. Revisit this charter after [period].

**Next step per ritual:** use `schedule-recipe` to wire each "Automate" onto a runner, and `delta-briefing` to make recurring briefs report only what changed.

## Quality Checks

- [ ] Every ritual has an explicit call — including the ones kept manual, with the reason stated
- [ ] No ritual is marked Automate with unreachable inputs ("somehow reads the dashboard" is Assist at best)
- [ ] Every Automate has all four guardrails, including kill criteria
- [ ] The rollout starts with a low-blast-radius ritual, not the board update
- [ ] The charter names who owns each automated ritual — autopilot still has a pilot

## Anti-Patterns

- [ ] Do not classify everything as Automate — a charter with no keep-manual entries wasn't a decision
- [ ] Do not automate a ritual whose consumers haven't been told it's now machine-drafted
- [ ] Do not skip failure behaviour — a monitor that silently stops running is worse than no monitor
- [ ] Do not automate judgement-bearing artifacts (performance feedback, strategy calls) no matter how reachable the inputs
- [ ] Do not set a schedule tighter than the inputs actually change — a daily brief on weekly data is noise

## Example Trigger Phrases

- "What to automate?"
- "How to set up recurring AI runs?"
- "Which reports?"
- "Design an automation charter for a team."
