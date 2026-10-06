---
name: tooling-risk-assessment
description: "Assess an injection-mold or production tooling decision before cutting steel — soft vs hard tooling tradeoff, tool life vs forecast, cavitation math, T1 sample timeline, cost of design changes after tooling, and kill criteria. Use when asked whether to kick off tooling, choose soft vs hard tools, size cavities, review a tooling quote, or assess the risk of tooling before the design is frozen. Produces a tooling risk assessment with capacity math, a decision recommendation, and explicit kill criteria."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/tooling-risk-assessment.html
metadata:
  {
    "openclaw": { "emoji": "🔧" }
  }
---

# Tooling Risk Assessment Skill

Cutting steel converts design uncertainty into cash at the worst exchange rate in hardware. This skill assesses a tooling decision the way a seasoned NPI/ME lead does: match tool class to forecast confidence, do the cavitation math against peak demand, put the T1→T2→T3 timeline on the calendar, price the "what if the design changes after tooling" scenario honestly, and write the kill criteria before the money moves.

## What This Skill Produces

- A soft vs hard tooling recommendation per part, with the tradeoff shown
- Cavitation and capacity math against the forecast ramp
- A T1 sample timeline with tuning-loop buffer
- An ECO-after-tooling cost narrative (steel-safe vs weld territory)
- Explicit kill criteria and total capital-at-risk summary

## Required Inputs

Ask for these if not provided; if forecast confidence is unstated, assume it is low and label the assumption:

- **Part list going to tool** — which parts, materials, cosmetic surfaces
- **Forecast** — peak monthly/weekly demand and lifetime volume, with confidence
- **Design maturity** — which build validated this geometry (pre-EVT? post-DVT?)
- **Cycle time estimates** and target resin(s)
- **Tooling quotes** if in hand — cost, cavitation, steel type, lead time
- **Hard dates** — launch window that the T1 timeline must serve

## Tooling Framework

**Tool class tradeoff:**

| | Soft tool (Al / P20 unhardened) | Hard tool (P20/H13 hardened steel) |
|---|---|---|
| Life | ~5k–100k shots | ~500k–1M+ shots |
| Lead time to T1 | ~3–6 weeks | ~8–12 weeks |
| Cost | ~30–50% of hard tool | Full cost |
| Change tolerance | Cheap to modify or scrap | Expensive; welds risk cosmetic surfaces |
| Right when | Design still moving; bridge builds; low lifetime volume | Design frozen post-DVT; high volume |

**Cavitation math** — show the work: parts/week/cavity = (3600 ÷ cycle-time-s) × press-hours/week × yield. Cavities needed = peak weekly demand ÷ parts/week/cavity, rounded up, plus a stated overhead for maintenance downtime. Sanity-check tool life: lifetime volume ÷ cavities vs shots-of-life; flag if a second tool is inevitable and when.

**T1 timeline** — T1 (first shots) at tool lead time; plan 2–3 tuning loops (T1→T2→T3) at ~2–3 weeks each for texture, warp, sink, and dimensional tuning. Cosmetic A-surfaces rarely pass at T1; do not let the schedule assume they will.

**ECO-after-tooling narrative** — classify the plausible changes: **steel-safe** (change removes steel / adds plastic — days, cheap), **weld/re-machine** (adds steel — weeks, risky on cosmetic surfaces), **new insert or new tool** (geometry change beyond repair — re-quote the lead time). State which open design questions land in which class.

## Output Format

### Tooling risk assessment: [product / part set]

1. **Recommendation** — tool class per part, cavitation, when to kick off, capital at risk
2. **Forecast basis** — the numbers used and their confidence `[assumed]` where inferred
3. **Capacity math** — the cavitation calculation shown, tool-life check
4. **Timeline** — kickoff → T1 → T2/T3 loops → parts for [build], vs the hard date
5. **Change-risk narrative** — open design questions mapped to steel-safe / weld / new-tool cost
6. **Kill criteria** — the specific findings (e.g. DVT reliability failure in a tooled part, forecast cut below X, cert failure implicating geometry) that stop or re-scope the tooling spend
7. **Risk register** — remaining risks with owner and trigger date

## Quality Checks

- [ ] Cavitation math is shown, not asserted, and uses peak demand — not average
- [ ] Tool life is checked against lifetime volume per cavity
- [ ] The timeline includes tuning loops, not just T1
- [ ] Every open design question is mapped to an ECO cost class
- [ ] Kill criteria are specific and dated — someone could actually invoke them
- [ ] Capital at risk is totalled, including tools that may be scrapped

## Anti-Patterns

- [ ] Do not size cavitation on average demand — peak week plus downtime overhead or the launch starves
- [ ] Do not cut hard tools on a design that has not survived its reliability testing — that is buying a very expensive opinion
- [ ] Do not let the schedule assume T1 parts are shippable — T1 parts are for tuning
- [ ] Do not treat "the factory says it's fine" as a change-risk analysis — classify each open question yourself
- [ ] Do not present a tooling recommendation without kill criteria — the moment to define "stop" is before the spend
- [ ] Do not hide the second-tool moment — if tool life runs out mid-ramp, say when and price it now

## Example Trigger Phrases

- "Choose soft vs hard tools."
- "Size cavities."
- "Review a tooling quote."
- "Assess the risk of tooling before the design is frozen."
