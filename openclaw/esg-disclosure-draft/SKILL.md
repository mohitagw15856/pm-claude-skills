---
name: esg-disclosure-draft
description: "Draft an honest, audit-ready ESG disclosure section in a CSRD/ESRS-flavored structure, adaptable to other frameworks. Use when asked to write a sustainability report section, draft an ESRS or CSRD disclosure, prepare an ESG section for an annual report, or turn raw sustainability data into disclosure text. Produces a disclosure draft with double-materiality framing, metric-methodology-limitation triplets, based forward statements, and explicit data-gap handling."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/esg-disclosure-draft.html
metadata:
  {
    "openclaw": { "emoji": "🌍" }
  }
---

# ESG Disclosure Draft Skill

Disclosure text fails in two ways: it overclaims (greenwash, assurance findings) or it hides gaps (omission, restatement risk). This skill drafts a section that survives both an assurer and a skeptical reader — every metric travels with its methodology and limitation, and missing data is disclosed, not disappeared. It drafts; it does not give legal or compliance advice.

## What This Skill Produces

- A disclosure section draft with double-materiality framing (impact + financial)
- A metric table where every figure carries methodology and known limitations
- Forward-looking statements each anchored to a stated basis
- An explicit "data not yet available" treatment with a collection plan
- A pre-submission review checklist for the compliance team

## Required Inputs

Ask for these if not provided; from a thin brief, draft with labelled assumptions and mark every invented placeholder value as `[to confirm]` rather than refusing:

- **Topic and framework** — which sustainability matter (e.g. climate, workforce, circularity) and target framework (ESRS by default; adapt on request)
- **Materiality result** — why this topic is material: impact materiality, financial materiality, or both, and for whom
- **Metrics and data** — the figures, their units, reporting period, and how each was produced
- **Targets and transition plans** — existing commitments, baselines, and progress
- **Known gaps** — what the organization cannot yet measure or report
- **Audience and length** — annual report section, standalone report, or regulator response

## Drafting Framework

**1. Double-materiality framing.** Open the section by stating *why this matters* on both axes: the organization's impact on people/environment (impact materiality) and the topic's effect on the organization's finances (financial materiality). If only one axis is material, say which and why the other was assessed as not material.

**2. Metric–methodology–limitation triplets.** Never publish a bare number. Each metric gets three parts:

| Part | Rule |
|---|---|
| Metric | Figure, unit, period, boundary |
| Methodology | How it was produced: measured, calculated (which factors/model), estimated, or proxy — and any change vs prior year |
| Limitation | What the number does not cover, its uncertainty, and known weaknesses |

**3. Forward statements with basis.** Every target or projection names its basis: baseline year, scenario or assumption set, dependencies (e.g. grid decarbonization, supplier action), and whether it is a commitment or an ambition. No basis available → downgrade the language to intent and say the basis is being developed.

**4. Honest gap handling.** For each required datapoint that is missing: state that it is not yet reported, why, what interim proxy (if any) is used and its weakness, and when it will be reported. A disclosed gap is defensible; an omitted one is a finding.

**5. Plain-language discipline.** Prefer "reduced scope 1 emissions 8% against a 2023 baseline" over "continued our climate leadership journey". Strip adjectives that a metric doesn't support.

## Output Format

### Disclosure draft: [topic] — [framework]

**1. Materiality statement** — impact and financial materiality conclusions, assessment method in one sentence, stakeholders affected.

**2. Policies, actions, and resources** — what the organization does about this topic, stated as verifiable facts (dates, coverage, owners), not aspirations.

**3. Metrics** — the triplet table (metric / methodology / limitation), plus prior-year comparatives and restatement notes where methodology changed.

**4. Targets and forward statements** — each with baseline, timeframe, basis, and dependencies. Distinguish commitments from ambitions.

**5. Data gaps and roadmap** — what is not reported yet, why, interim proxies, and the collection timeline.

**6. Compliance review checklist** — the specific datapoints and claims the compliance team must verify before publication.

Include this line in the artifact: *"This is a working draft. Verify required datapoints, phase-in reliefs, and wording against the applicable standard and regulation (e.g. ESRS, local transposition) with your compliance team and legal counsel before publication."*

## Quality Checks

- [ ] Both materiality axes are addressed — asserted, or explicitly assessed as not material
- [ ] Every metric has all three triplet parts; none appears as a bare number
- [ ] Every forward statement names its basis and dependencies
- [ ] Every known gap is disclosed with a reason and a timeline, not omitted
- [ ] Methodology changes vs prior year are flagged with restatement notes
- [ ] No claim in the prose exceeds what the metric table supports
- [ ] Placeholder values from a thin brief are marked `[to confirm]`

## Anti-Patterns

- [ ] Do not omit a required datapoint silently — disclose the gap and the plan to close it
- [ ] Do not write aspiration as fact — "we aim to" and "we have" are different disclosures
- [ ] Do not publish a target without baseline year, scope, and basis
- [ ] Do not bury a methodology change that flatters the trend — flag it and restate or explain
- [ ] Do not use unanchored superlatives ("industry-leading", "best-in-class") in disclosure text
- [ ] Do not present this draft as compliance-cleared — the applicable standard and legal review govern

## Based On

CSRD/ESRS disclosure architecture (double materiality, policies–actions–metrics–targets structure, phase-in and gap disclosure practice), adaptable to ISSB/GRI-style reports.

## Example Trigger Phrases

- "Write a sustainability report section."
- "Draft an ESRS or CSRD disclosure."
- "Prepare an ESG section for an annual report."
- "Turn raw sustainability data into disclosure text."
