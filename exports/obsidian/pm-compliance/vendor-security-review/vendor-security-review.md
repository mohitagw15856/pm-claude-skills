---
aliases: ["Vendor Security Review"]
tags: [pm-skills, skill]
skill: vendor-security-review
description: "Run a third-party / vendor security review and assign a risk tier with required controls. Use when asked to assess a vendor's security, run a third-party risk assessment, complete a security questionnaire about a vendor, or decide what due diligence a new tool needs. Produces a vendor risk assessment — a data/access-driven risk tier, the questionnaire focus, required evidence (SOC 2, pen test, DPA), residual risk, and an approve/conditional/reject recommendation."
---

# Vendor Security Review Skill

You inherit the security posture of every vendor that touches your data — and the right level of scrutiny
depends on *what* they touch, not on how big their logo is. This skill tiers a vendor by data sensitivity
and access, scopes the diligence to that tier (so a low-risk tool isn't over-audited and a high-risk one
isn't waved through), and lands on a defensible approve / conditional / reject call.

## Required Inputs

Ask for these only if they aren't already provided:

- **What the vendor does** and the data they'll access (none / internal / customer PII / sensitive / regulated).
- **Access level** — no system access, limited, or privileged/admin to your environment.
- **Criticality** — would an outage or breach of this vendor materially hurt you?
- **Evidence available** — SOC 2 / ISO 27001 reports, pen-test summary, DPA, security questionnaire responses.

## Output Format

### Vendor Security Review: [vendor] — [service]

**1. Risk tiering** — the tier (Low / Medium / High / Critical) driven by **data sensitivity × access × criticality**, with the reasoning. The tier sets how much diligence is warranted.

**2. Diligence scope** — what to require at this tier: e.g. Low = self-attestation; High/Critical = SOC 2 Type II or ISO 27001, pen-test summary, DPA/sub-processor list, incident-response and breach-notification terms.

**3. Findings** — a table of assessed areas and status:

| Area | Expectation | Finding | Risk |
|---|---|---|---|
| Encryption | At rest + in transit | TLS + AES-256 | 🟢 |
| Compliance | SOC 2 Type II | Type I only | 🟡 |
| Sub-processors | Disclosed + DPA | Not disclosed | 🔴 |

**4. Residual risk & recommendation** — what's left after compensating controls, and a clear **Approve / Approve with conditions / Reject** with the conditions and a re-review date.

## Programmatic Helper

`scripts/vendor_risk.py` (stdlib only) computes the risk tier and the baseline required evidence from
the vendor's data/access/criticality profile, so tiering is consistent across reviewers:

```bash
# vendor.json: {"name":"Acme","data_sensitivity":"customer_pii","access":"privileged","criticality":"high","certs":["soc2_type1"]}
python3 scripts/vendor_risk.py vendor.json
python3 scripts/vendor_risk.py vendor.json --json
```

## Quality Checks

- [ ] The risk tier is driven by data sensitivity × access × criticality — not vendor size or reputation
- [ ] Diligence depth matches the tier (no rubber-stamping high-risk; no over-auditing low-risk)
- [ ] High/Critical vendors are required to provide independent evidence (SOC 2 Type II / ISO 27001 / pen test), not self-attestation
- [ ] A DPA + sub-processor disclosure is required where the vendor handles personal data
- [ ] The recommendation is explicit (approve / conditional / reject) with conditions and a re-review date

## Anti-Patterns

- [ ] Do not size diligence by the vendor's brand — a small vendor with privileged access to PII outranks a famous one with none
- [ ] Do not accept a SOC 2 Type I as equivalent to Type II — Type I is a point-in-time design check, not operating effectiveness
- [ ] Do not skip the sub-processor question — your data may flow to fourth parties you never assessed
- [ ] Do not approve high-risk vendors on a promise — require evidence and bind it in the contract (DPA, breach notice SLA)
- [ ] Do not treat the review as one-and-done — set a re-review cadence tied to the tier

## Based On

Third-party / vendor risk management practice — data-and-access-driven tiering, evidence-based diligence, and contractual risk transfer.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
