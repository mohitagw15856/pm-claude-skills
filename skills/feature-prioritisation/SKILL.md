---
name: feature-prioritisation
description: "Apply prioritisation frameworks (RICE, MoSCoW, Kano, ICE, Opportunity Scoring) to rank features and backlog items. Use when asked to prioritise features, rank a backlog, decide what to build next, or evaluate tradeoffs between competing ideas. Produces a scored, ranked feature list with framework-specific tables, recommended build order, deprioritised items, and assumptions made."
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

## Quality Checks

- [ ] Every item is scored against the same goal or metric (not different goals per item)
- [ ] Deprioritised items are explicitly listed with reasons (not just absent from the ranked list)
- [ ] Assumptions used in scoring are documented
- [ ] Stakeholder politics or personal preferences are separated from framework score
- [ ] Prioritisation is anchored to a specific scope (sprint / quarter / launch)
