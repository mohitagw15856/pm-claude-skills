---
name: evt-dvt-pvt-gate-review
description: "Run an NPI phase-gate review for EVT, DVT, or PVT — exit criteria per phase, open-issue triage, yield readout, waiver discipline, and a go/no-go call. Use when asked to run a gate review, decide EVT exit or DVT entry, review build results, assess whether to proceed to the next build, or triage open issues before a phase gate. Produces a gate review document with criteria scoring, waiver register, yield analysis, and a defensible go/conditional-go/no-go recommendation."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/evt-dvt-pvt-gate-review.html
metadata:
  {
    "openclaw": { "emoji": "🔧" }
  }
---

# EVT/DVT/PVT Gate Review Skill

Phase gates exist because hardware mistakes compound: an issue waved through EVT costs 10× at DVT and 100× in the field. This skill runs the gate the way a strong NPI lead does — score against written exit criteria, triage every open issue as blocker or waiver, read yield with its denominator, and make a recommendation someone can be held to.

## What This Skill Produces

- A scored exit-criteria checklist for the phase under review
- An open-issue triage table (blocker / waiver / defer) with rationale
- A yield readout by test station with failure Pareto
- A waiver register with class, owner, expiry, and containment
- A go / conditional-go / no-go recommendation with the conditions written down

## Required Inputs

Ask for these if not provided; run the review on partial data but mark unverifiable criteria `[no data — cannot score]`, never assumed-pass:

- **Which gate** — EVT, DVT, or PVT exit (or entry to the next phase)
- **Build results** — units built, units passing, failures by test station or symptom
- **Open issue list** — bugs/defects with severity and status
- **Exit criteria** if the program has them; otherwise use the reference set below and say so
- **Schedule pressure** — the real next-build date, so the recommendation is honest about trade-offs

## Gate Framework

**Reference exit criteria** (adapt to the program's own if provided):

| Criterion | EVT exit | DVT exit | PVT exit |
|---|---|---|---|
| Proves | Design works (works-like) | Design is reliable & certifiable (looks-like/works-like) | Factory can build it at rate |
| Tooling | Proto/soft tooling OK | Off near-final tooling | Production tooling, production line |
| Functional yield | ≥ ~80% with failures understood | ≥ ~90% | ≥ ~95%, stable across line runs |
| Reliability | Key risks tested (thermal, drop samples) | Full reliability suite passed (drop, tumble, thermal cycle, HALT as applicable) | ORT started; Cpk ≥ 1.33 on critical dimensions |
| Certs | Pre-scan risks identified | EMC/safety pre-scans passed | Cert filings submitted/granted |
| Cost | BOM within ~10% of target | BOM within ~5%, cost-downs planned | COGS at target with yield burdened in |
| Open issues | No unresolved blockers | No blockers; waivers classed & expiring | Only Class C waivers, all with limit samples |

**Issue triage.** Every open issue gets exactly one bucket: **Blocker** (fails a criterion, fix before gate), **Waiver requested** (pass the gate with the defect, under discipline below), **Defer** (not a gate criterion — but say why).

**Waiver discipline.** Class A — safety/regulatory/data-loss: never waivable. Class B — functional/reliability: waivable only with named owner, expiry date (a specific build or date at which it's fixed or the program stops), and containment for affected units. Class C — cosmetic: waivable against an approved limit sample.

## Output Format

### Gate review: [product] — [EVT/DVT/PVT] exit

1. **Recommendation** — Go / Conditional go (conditions listed, each with owner + date) / No-go (earliest re-review)
2. **Exit criteria scorecard** — criterion, target, actual, pass/fail/`[no data]`
3. **Yield readout** — units in, units out, first-pass yield per test station, top-5 failure Pareto
4. **Open-issue triage** — table: issue, severity, bucket, rationale
5. **Waiver register** — waiver, class, owner, expiry, containment
6. **Risks carried forward** — what the next phase inherits

## Quality Checks

- [ ] Every criterion is scored pass/fail/no-data — no blanks, no assumed passes
- [ ] Yield is reported with denominator, build population, and per-station breakdown
- [ ] Every waiver has a class, a named owner, an expiry, and containment
- [ ] The recommendation names its conditions explicitly — "conditional go" without conditions is a go
- [ ] Failure Pareto covers the top failure modes, not just an aggregate number

## Anti-Patterns

- [ ] Do not report yield without the denominator and test-station breakdown — "92% yield" on 12 hand-carried units is not data
- [ ] Do not let a waiver pass a gate without an owner and expiry date — expiry-less waivers become the product
- [ ] Do not waive Class A (safety/regulatory) issues under any schedule pressure
- [ ] Do not average yield across builds with different configurations
- [ ] Do not let "conditional go" be a euphemism for go — unconditioned conditionals are the oldest gate trick
- [ ] Do not score a criterion pass because no data contradicts it — no data is a fail-to-verify

## Example Trigger Phrases

- "Run a gate review."
- "Decide EVT exit or DVT entry."
- "Review build results."
- "Assess whether to proceed to the next build."
- "Triage open issues before a phase gate."
