---
name: climate-risk-assessment
description: "Assess physical and transition climate risk for a site, product, or portfolio with scenario-based structure. Use when asked to run a climate risk assessment, evaluate physical or transition risk, prepare TCFD/ESRS-style climate risk analysis, or assess how climate scenarios affect an asset or business. Produces a hazard-exposure-vulnerability matrix across 2030/2040/2050 horizons and labelled scenarios, with financial-impact ranges, confidence levels, and adaptation options."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/climate-risk-assessment.html
metadata:
  {
    "openclaw": { "emoji": "🌍" }
  }
---

# Climate Risk Assessment Skill

Climate risk work goes wrong by being either vague ("weather may worsen") or falsely precise ("flood losses of $4.7M in 2043"). This skill structures an assessment as hazard × exposure × vulnerability, across explicit time horizons and named scenarios, with impact expressed as ranges plus a confidence label. It supports decision-making; it is not an engineering or actuarial study.

## What This Skill Produces

- A risk register for the asset(s): hazard × exposure × vulnerability, scored per horizon and scenario
- Physical risks (acute + chronic) and transition risks (policy, market, technology, reputation) treated separately
- Financial-impact ranges with an explicit confidence level per estimate
- Adaptation and mitigation options with rough cost/benefit direction
- A stated-assumptions register so the assessment can be challenged and updated

## Required Inputs

Ask for these if not provided; with a thin brief, proceed using labelled assumptions (e.g. "assumed coastal location — confirm") rather than refusing:

- **Subject** — the site(s), product, or portfolio, with location(s) and asset life / planning horizon
- **Exposure basics** — what is physically and economically at stake: asset value, revenue dependence, supply chain nodes, workforce
- **Known sensitivities** — past climate-related disruptions, insurance history, single points of failure
- **Transition context** — sector, carbon intensity, regulatory exposure, customer decarbonization pressure
- **Financial scale** — revenue or asset value bands, so impact ranges land in the right order of magnitude

## Assessment Framework

**1. Structure every risk as hazard × exposure × vulnerability.** A hazard (e.g. riverine flood) only becomes a risk when exposure (asset in the floodplain) meets vulnerability (no defenses, 6-week recovery). Score each component, not just the headline.

**2. Use three horizons: 2030 / 2040 / 2050.** Near-term physical risk is mostly locked in regardless of scenario; scenario divergence dominates from ~2040. Say which effect drives each rating.

**3. Label scenarios and use them consistently:**

| Label | Character | Physical risk | Transition risk |
|---|---|---|---|
| Orderly | Early, coordinated policy (~1.5–2°C) | Lower long-term | Front-loaded but predictable |
| Disorderly | Late, abrupt policy (~<2°C, delayed) | Moderate | Sharp, repricing shocks in 2030s |
| Hothouse | Weak policy (~3°C+) | High and compounding | Low policy risk, high physical + liability |

Assess at least orderly and hothouse — they bracket the outcome space. Note that transition and physical risk peak in *different* scenarios; a single-scenario view always understates one of them.

**4. Express impact as a range with confidence.** Use order-of-magnitude bands tied to the subject's financial scale (e.g. "1–5% of site revenue per event"), and tag each estimate High / Medium / Low confidence with the reason (data quality, model dependence, deep uncertainty).

**5. Identify adaptation options per material risk.** Categories: harden (physical protection), diversify (sites, suppliers), transfer (insurance, contracts), retreat (relocate, exit), and accept (with monitoring trigger). Note rough cost direction and by when a decision is needed.

## Output Format

### Climate risk assessment: [subject]

**1. Scope and assumptions** — subject, horizons, scenarios used, and every assumption made from a thin brief, labelled.

**2. Physical risk register** — table: hazard | type (acute/chronic) | exposure | vulnerability | rating per horizon × scenario | confidence.

**3. Transition risk register** — same structure across policy, market, technology, and reputation risks (include transition *opportunities* where real).

**4. Financial impact summary** — the top 5 risks with impact ranges, confidence, and which scenario/horizon drives each.

**5. Adaptation options** — per material risk: option, category, cost direction, decision-by date.

**6. Monitoring triggers** — observable signals (regulation drafts, insurance repricing, hazard events) that should force a reassessment.

Include this line in the artifact: *"Verify scenario selection, disclosure use, and any figures intended for reporting against the applicable standard/regulation (e.g. ESRS E1, TCFD/ISSB) with your compliance team; use engineering-grade studies before capital decisions."*

## Quality Checks

- [ ] Every risk decomposes into hazard, exposure, and vulnerability — no monolithic "climate risk" entries
- [ ] All three horizons and at least two labelled scenarios are covered, and the driver of each rating is stated
- [ ] Every financial estimate is a range with a confidence label and a reason for that confidence
- [ ] Transition and physical risks are assessed separately and both appear in the top-risks summary
- [ ] Each material risk has at least one adaptation option with a decision-by date
- [ ] Assumptions and monitoring triggers are explicit enough for a future reassessment

## Anti-Patterns

- [ ] Do not give point estimates for long-horizon losses — ranges with confidence, always
- [ ] Do not assess only one scenario — a single pathway hides either transition or physical risk
- [ ] Do not conflate hazard with risk — a flood map is not a loss estimate until exposure and vulnerability are in
- [ ] Do not let 2050 risks crowd out 2030 decisions — state what must be decided this planning cycle
- [ ] Do not present this as an engineering, actuarial, or compliance-grade study — it structures judgment, it does not replace specialist analysis

## Based On

TCFD/ISSB and ESRS E1 climate-risk practice (physical/transition split, scenario analysis, hazard–exposure–vulnerability structure).

## Example Trigger Phrases

- "Run a climate risk assessment."
- "Evaluate physical."
- "Prepare TCFD/ESRS-style climate risk analysis."
- "Assess how climate scenarios affect an asset."
