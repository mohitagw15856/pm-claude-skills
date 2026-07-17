---
name: the-procurement-gauntlet
description: "Simulate enterprise procurement and security review of your product before your first big deal meets it for real — the questionnaire, the gaps, the deal-slowing findings. Use when asked to prep for enterprise procurement, simulate a security review, why do enterprise deals stall, or get ready for vendor assessment. Produces the reviewer's findings memo (security, legal, compliance, vendor-risk), the stall-risk ranking, and a debrief with the artifacts to prepare before the real gauntlet."
---

# The Procurement Gauntlet Skill

The first enterprise deal doesn't die in the demo — it dies eleven weeks later in a vendor-risk spreadsheet. This skill runs the gauntlet early: security questionnaire, legal redlines, compliance checks, and procurement's favorite question ("what happens to our data when you die?") — producing the findings memo their team would write, so yours can prepare the artifacts before the clock is running on a real deal.

## What This Skill Produces

- **The findings memo** — security / legal / compliance / vendor-viability, graded as an enterprise reviewer grades
- **The stall-risk ranking** — which findings add weeks, which add clauses, which kill
- **The debrief** — the artifact checklist to build now, ordered by deals-unblocked-per-effort

## Required Inputs

Ask for these if not provided:
- **The product's honest posture:** hosting/architecture, auth (SSO?), data handled (PII? whose?), certifications held or in progress, backup/DR reality, team size
- **The paper on hand** — security page, DPA template, terms, subprocessor list, insurance
- **The target buyer** — regulated industry? company size? geography (data-residency expectations)?
- **The skeletons** — the honest gaps; the simulation is only as useful as this disclosure

## Framework: The Four Desks

1. **Security desk:** SSO/SAML (its absence is the #1 mid-market deal-stall), encryption at rest/in transit, access controls and audit logs, pen-test recency, incident-response plan, subprocessor inventory. Certifications are graded as they actually work: attestation reports open doors; "in progress" opens *conversations* with a date attached.
2. **Legal desk:** liability caps vs their paper, data-processing terms, breach-notification windows (they'll want faster than yours says), IP/indemnity, and the audit-rights clause your template doesn't have.
3. **Compliance desk:** data residency, retention/deletion on request, regulated-data handling if applicable — answered by the buyer's industry, not in the abstract.
4. **Vendor-risk desk:** the mortality questions — company viability, escrow/continuity, "what happens to our data if you shut down," insurance certificates, references at similar scale.
**Grading:** ✅ pass · 🟡 pass-with-clause (adds negotiation) · 🟠 stall (adds weeks + an artifact) · 🔴 gate (deal waits until fixed).

## Output Format

# Vendor Assessment: [product] — simulated for [buyer type]

> Simulation — a plausible enterprise review, not a prediction or legal advice.

## Findings
| # | Desk | Finding | Grade | What it does to the deal |
|---|---|---|---|---|

## The Stall Forecast
[Realistic procurement timeline for this posture: n–n weeks, driven by findings #…]

## Debrief — out of character
| Artifact to build | Unblocks | Effort | Order |
|---|---|---|---|
[Typically: SSO, the security one-pager, subprocessor list, DPA template, IR plan summary, continuity statement]
**The honest positioning line for sales:** [how to state current posture without overclaiming — overclaiming discovered in review kills deals harder than gaps do]

## Quality Checks

- [ ] Every finding traces to the disclosed posture — gaps disclosed get graded, gaps invented don't exist
- [ ] Grades carry deal consequences, not abstract severity
- [ ] The artifact list is ordered by deals-unblocked-per-effort
- [ ] Certifications-in-progress are treated as dated conversations, not passes or failures
- [ ] The positioning line lets sales tell the truth survivably

## Anti-Patterns

- [ ] Do not grade against a Fortune-50 bar for an SMB product — calibrate to the stated buyer
- [ ] Do not treat certification as binary salvation — many deals close on posture + roadmap + honesty
- [ ] Do not let the simulation recommend overclaiming — review teams verify, and discovered overclaims are 🔴
- [ ] Do not omit the mortality questions — vendor-viability stalls surprise founders most
- [ ] Do not stay in character in the debrief
