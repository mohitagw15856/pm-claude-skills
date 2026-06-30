---
trigger: model_decision
description: "Design and prioritize a regression test suite so changes don't break what worked. Use when asked to plan regression testing, build a regression suite, decide what to re-test after a change, or trim a bloated regression pack. Produces a risk-based regression plan — what to re-test and why, prioritised tiers (smoke → full), automation candidates, and a run strategy per release — so coverage matches risk and the suite stays fast."
---

# Regression Test Plan Skill

Regression testing protects what already works — but re-running everything every time is slow and wasteful, and
testing too little ships breakage. The answer is **risk-based**: re-test what changed, what it touches, and what
hurts most if it breaks. This skill builds that prioritised plan and a run strategy, so coverage tracks risk and
the suite doesn't balloon.

## Working from a brief

Given "we're shipping a checkout change, what should we regression-test?", **produce the plan anyway** — infer
the impacted areas and a sensible prioritisation, labelling assumptions. Tie scope to change-impact and risk.
Never hand back a question instead of a plan.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label):

- **The change** — what's being released/modified, and what it touches (and integrates with).
- **Critical paths** — the flows that must never break (revenue, auth, data integrity).
- **Existing coverage** — current regression cases/automation, if any, and how long a full run takes.
- **Constraints** — time/resources per release, and manual vs. automated capacity.

## Output Format

### Regression Plan: [release/change]

**1. Impact analysis** — what changed, the areas directly and indirectly affected, and the high-risk zones (shared components, recent bugs, complex logic).

**2. Prioritised scope** — what to re-test, in tiers:

| Tier | When to run | Scope | Why |
|---|---|---|---|
| Smoke / sanity | every build | critical paths only (login, checkout, save) | fast fail |
| Targeted | this change | the changed area + its direct dependencies | change-impact |
| Full regression | major release / risky change | broad core coverage | safety net |

**3. What to skip (and the risk)** — explicitly de-scope low-risk, unchanged areas, and name the residual risk.

**4. Automation candidates** — which cases are stable, high-value, and repetitive enough to automate first (and which to keep manual).

**5. Run strategy** — when each tier runs (per-commit / per-release), order (critical first), and the entry/exit criteria for sign-off.

## Quality Checks

- [ ] Scope is driven by change-impact and risk, not "run everything" or "run the same list every time"
- [ ] Critical paths are always covered (a fast smoke tier)
- [ ] De-scoped areas are explicit, with the residual risk named
- [ ] Automation candidates are prioritised by stability and value
- [ ] A run strategy ties each tier to when it runs and the sign-off criteria
- [ ] The suite stays proportionate to the time/risk — not bloated

## Anti-Patterns

- [ ] Do not "re-run everything" by default — it's slow and trains teams to skip it
- [ ] Do not test only the changed file — cover its dependencies and shared components
- [ ] Do not silently drop coverage — when you de-scope, state the risk
- [ ] Do not automate flaky or rarely-run cases first — start with stable, high-value ones
- [ ] Do not let the suite grow unbounded — prune and tier it as the product changes

## Based On

Risk-based regression practice — change-impact analysis, tiered smoke/targeted/full suites, automation prioritisation, and release-fit run strategy.
