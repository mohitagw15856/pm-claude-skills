---
name: feature-prioritisation
description: "Apply prioritisation frameworks (RICE, MoSCoW, Kano, ICE, Opportunity Scoring) to rank features and backlog items. Use when asked to prioritise features, rank a backlog, decide what to build next, or evaluate tradeoffs between competing ideas. Produces a scored, ranked feature list with framework-specific tables, recommended build order, deprioritised items, and assumptions made."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/feature-prioritisation.html
metadata:
  {
    "openclaw": { "emoji": "🗺" }
  }
---

# Feature Prioritisation Skill

Apply the right prioritisation framework to any backlog and produce a clear, defensible ranking with rationale — not just a sorted list.

## Required Inputs

Ask the user for these if not provided:
- **List of features or initiatives to prioritise**
- **Goal or metric** being prioritised against (OKR, launch, sprint)
- **Preferred framework** (or recommend based on context below)
- **Team data**: reach estimates, effort estimates, velocity (for RICE)

## Framework Selection Guide

Ask the user which framework they prefer, or recommend based on context:

| Situation | Recommended Framework |
|---|---|
| Need a quick, data-driven score | RICE |
| Stakeholder alignment meeting | MoSCoW |
| Understanding customer delight vs expectations | Kano |
| Early-stage startup, fast decisions | ICE |
| Identifying underserved customer needs | Opportunity Scoring |
| Strategic portfolio decisions | Value vs Effort Matrix |

---

## RICE Scoring

**Formula:** (Reach × Impact × Confidence) ÷ Effort

| Factor | Definition | Scale |
|---|---|---|
| Reach | Users impacted per quarter | Actual number |
| Impact | Effect on goal per user | 0.25 / 0.5 / 1 / 2 / 3 |
| Confidence | How certain are you? | 50% / 80% / 100% |
| Effort | Person-months required | Actual number |

Output table:
| Feature | Reach | Impact | Confidence | Effort | RICE Score | Priority |
|---|---|---|---|---|---|---|

---

## MoSCoW Method

Categorise each feature as:
- **Must Have** — non-negotiable for launch/sprint; product fails without it
- **Should Have** — important but not critical; workarounds exist
- **Could Have** — nice to have; include only if time allows
- **Won't Have (this time)** — explicitly out of scope now; may revisit

Always ask: "Must have for *what*?" — define the scope (launch, sprint, quarter) before categorising.

---

## ICE Scoring (Startup/fast mode)

**Formula:** Impact + Confidence + Ease (each 1–10)

Quick, subjective — good for early decisions before data exists.

---

## Kano Model

Classify features into:
- **Basic (Must-be):** Expected; absence causes dissatisfaction
- **Performance:** More = better satisfaction; linear relationship
- **Excitement (Delighters):** Unexpected; creates delight; absence is neutral
- **Indifferent:** Users don't care either way
- **Reverse:** Some users want it, others don't

Recommend building: all Basic features first → Performance features for key use cases → 1–2 Excitement features per release.

---

## Programmatic Helper

This skill ships with a stdlib-only Python script that computes ranking for the math-based frameworks (RICE, ICE) so feature scoring is consistent across sessions.

```bash
# RICE from JSON
python3 scripts/feature_prioritisation.py initiatives.json --framework rice

# RICE from CSV
python3 scripts/feature_prioritisation.py initiatives.csv --framework rice --format csv

# ICE from JSON
python3 scripts/feature_prioritisation.py features.json --framework ice

# Pipe into it
printf '%s\n' '[{"name":"API refactor","impact":8,"confidence":80,"ease":5}]' \
  | python3 scripts/feature_prioritisation.py --framework ice -
```

Use `--json` to produce machine-readable output for downstream tooling.

---

## Output Format

### Feature Prioritisation — [Product/Team] — [Date]

**Framework Used:** [RICE / MoSCoW / ICE / Kano / Custom]
**Scope:** [Sprint / Quarter / Release]
**Goal being prioritised against:** [Metric or objective]

[Scored table using selected framework]

**Recommended Build Order:**
1. [Feature] — [1-line rationale]
2. [Feature] — [1-line rationale]
3. ...

**Explicitly Deprioritised:**
- [Feature] — Reason: [brief]

**Assumptions Made:**
- [Any estimates or judgements used in scoring]

---

## Guidelines

- Always anchor prioritisation to a specific goal or metric — never prioritise in a vacuum
- Flag when two features have similar scores but very different risk profiles
- If stakeholder politics are influencing prioritisation, name it explicitly and suggest separating the framework score from the final decision
- Recommend revisiting priorities every 2 weeks minimum
- Never produce a single-column ranked list without rationale — explain the top 3 and bottom 3 decisions

## Scoring Rubric (0–40)

Score any output of this skill before handing it over; 32+ is ship-quality.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| Goal anchoring | No stated goal, or items silently scored against different objectives | A goal is named but individual scores don't reference it; off-goal items scored anyway | One explicit metric and scope; every score justified against it; items serving a different goal ejected with instructions to resubmit |
| Scoring integrity | Frameworks mixed in one session, arithmetic wrong, or scales invented mid-table | One framework applied consistently, but confidence defaults high and scale anchors are undefined | Consistent framework, verifiable maths, defined impact anchors, confidence honestly reflecting the evidence behind each estimate |
| Transparency of cuts and assumptions | Cut items simply vanish; no record of estimates or their sources | Deprioritised items listed but without reasons; assumptions partial or unsourced | Every cut carries a reason and revisit trigger; assumptions name their sources (analytics, engineering estimates) so the ranking is re-runnable |
| Judgment beyond the number | A sorted table presented as the decision | Top picks get rationale, but near-ties, risk profiles, and politics go unmentioned | Near-ties broken on risk with reasoning shown; political pressure named with framework score separated from final decision; top and bottom of list both explained |

## Quality Checks

- [ ] Every item is scored against the same goal or metric (not different goals per item)
- [ ] Deprioritised items are explicitly listed with reasons (not just absent from the ranked list)
- [ ] Assumptions used in scoring are documented
- [ ] Stakeholder politics or personal preferences are separated from framework score
- [ ] Prioritisation is anchored to a specific scope (sprint / quarter / launch)

## Anti-Patterns

- [ ] Do not score items against different goals — every item in a prioritisation session must be scored against the same objective
- [ ] Do not omit deprioritised items — explicitly listing what was cut and why is as important as the ranked list
- [ ] Do not let stakeholder politics override framework scores without documenting the override and reason
- [ ] Do not mix RICE, ICE, or MoSCoW scores across frameworks in a single session — pick one framework per prioritisation exercise
- [ ] Do not treat the output as final without documenting the assumptions used in scoring — assumptions change, and the list must be revisitable
