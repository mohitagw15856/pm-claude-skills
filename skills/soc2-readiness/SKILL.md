---
name: soc2-readiness
description: "Assess SOC 2 readiness across the Trust Services Criteria and produce a gap remediation plan. Use when asked to prepare for a SOC 2 audit, run a SOC 2 readiness/gap assessment, scope controls, or get audit-ready. Produces a readiness report — scope & criteria, a control-by-control status, a weighted readiness score, prioritised gaps with owners, and the evidence each control needs."
---

# SOC 2 Readiness Skill

A SOC 2 audit fails on two things: missing controls and missing *evidence* of controls you actually
run. This skill scopes the engagement to the right Trust Services Criteria, assesses each control's
status honestly, scores readiness deterministically (so "we're basically ready" becomes a number), and
turns the gaps into a prioritised, owned remediation plan with the evidence each control must produce.

## Required Inputs

Ask for these only if they aren't already provided:

- **Report type & period** — SOC 2 Type I (point in time) or Type II (a window, usually 3–12 months).
- **In-scope criteria** — Security (always), plus any of Availability, Confidentiality, Processing Integrity, Privacy. Don't include criteria you can't evidence.
- **Systems in scope** — the product/infra boundary the report covers.
- **Current control state** — what's implemented, partially implemented, or missing (be honest; auditors test, they don't take your word).

## Output Format

### SOC 2 Readiness: [company] — [Type I/II], [period]

**1. Scope** — the systems, the in-scope criteria, and explicitly what's out of scope.

**2. Control status** — a table grouped by criterion; status is `met` / `partial` / `gap`.

| Criterion | Control | Status | Evidence it needs | Owner |
|---|---|---|---|---|
| Security (CC6) | Access reviews quarterly | partial | Signed access-review records | IT |

**3. Readiness score** — overall and per-criterion %, from the helper script (so it's consistent, not vibes). State the bar: a readiness assessment isn't a pass, but <~85% means you're not audit-ready.

**4. Prioritised gaps** — ranked by risk × effort: what to fix first, the owner, and the target date.

**5. Evidence plan** — for a Type II especially: what evidence must be *collected continuously over the period* (you can't backfill a quarter of access reviews the week before the audit).

## Programmatic Helper

`scripts/soc2_score.py` (stdlib only) scores readiness from a control list so the number is
calculated, not estimated:

```bash
# controls.json: [{"criterion":"Security","control":"...","status":"met|partial|gap","weight":1}, ...]
python3 scripts/soc2_score.py controls.json
python3 scripts/soc2_score.py controls.json --json   # machine-readable, for chaining
```

It returns per-criterion and overall readiness (met=1.0, partial=0.5, gap=0) and lists the gaps.

## Quality Checks

- [ ] Only criteria the org can actually evidence are in scope (don't add Privacy to look thorough)
- [ ] Every control names the specific evidence an auditor would request
- [ ] The readiness score is computed from the control list, not asserted
- [ ] For Type II, the plan distinguishes "implement the control" from "accumulate evidence over the period"
- [ ] Gaps are prioritised by risk and have an owner and date — not a flat list

## Anti-Patterns

- [ ] Do not confuse a readiness assessment with a passed audit — readiness is self-assessed; the report comes from a licensed CPA firm
- [ ] Do not claim a control is "met" without the evidence to prove it — auditors test operating effectiveness, not intentions
- [ ] Do not over-scope criteria — every criterion you add is more controls to evidence; include only what's true and needed
- [ ] Do not leave gaps unowned or undated — an unowned gap is a gap that's still open at audit time
- [ ] Do not try to backfill Type II evidence — controls must demonstrably operate across the whole period

## Based On

AICPA SOC 2 Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy).
