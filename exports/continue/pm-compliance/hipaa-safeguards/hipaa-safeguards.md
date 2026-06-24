---
name: "Map HIPAA Security Rule safeguards and run a risk analysis f"
description: "Map HIPAA Security Rule safeguards and run a risk analysis for systems handling PHI. Use when asked to become HIPAA-compliant, assess HIPAA safeguards, prepare for handling PHI/ePHI, or scope a BAA. Produces a HIPAA assessment — the administrative/physical/technical safeguards with required-vs-addressable status, a risk analysis, BAA scope, and a prioritised remediation plan."
---

# HIPAA Safeguards Skill

HIPAA's Security Rule is a list of safeguards for electronic protected health information (ePHI), split
into administrative, physical, and technical — some **required**, some **addressable** (you must do them
*or* document why an equivalent is reasonable). This skill maps your controls to that list, runs the
risk analysis HIPAA mandates, and flags where you're exposed — so handling PHI is defensible, not hopeful.

## Required Inputs

Ask for these only if they aren't already provided:

- **Your role** — covered entity, or business associate (a vendor handling PHI for one). Both owe Security Rule safeguards.
- **The ePHI flow** — where PHI is created, received, stored, transmitted, and who can access it.
- **Current safeguards** — what's in place for access control, encryption, audit logging, backups, training.
- **Business associates** — third parties touching PHI (each needs a BAA).

## Output Format

### HIPAA Assessment: [entity] ([covered entity / business associate])

**1. ePHI inventory & flow** — where PHI lives and moves; the systems in scope.

**2. Safeguards** — a table per category; status `met` / `partial` / `gap`, and required vs. addressable:

| Category | Safeguard | Req/Addr | Status | Notes |
|---|---|---|---|---|
| Technical | Encryption of ePHI at rest & in transit | Addressable | partial | TLS yes; disk encryption pending |
| Administrative | Security risk analysis | Required | gap | Not yet performed |
| Physical | Facility access controls | Required | met | |

**3. Risk analysis** — the required (§164.308(a)(1)) assessment: threats to ePHI, likelihood × impact, and the residual risk after controls. This is the control auditors check first and the one most often missing.

**4. BAA scope** — which business associates need a Business Associate Agreement, and what each must guarantee.

**5. Remediation** — prioritised gaps (required-and-gap first), owners, dates. For addressable items not implemented, the documented justification + alternative.

## Programmatic Helper

`scripts/hipaa_checklist.py` (stdlib only) scores safeguard coverage and surfaces unmet **required**
safeguards (the ones with no "addressable" escape hatch):

```bash
# safeguards.json: [{"category":"Technical","safeguard":"...","required":true,"status":"met|partial|gap"}, ...]
python3 scripts/hipaa_checklist.py safeguards.json
python3 scripts/hipaa_checklist.py safeguards.json --json
```

## Quality Checks

- [ ] A documented security risk analysis exists (or is the top remediation item) — it's required and foundational
- [ ] Each safeguard is marked required vs. addressable, and addressable-not-done items have a written justification + alternative
- [ ] Encryption of ePHI in transit and at rest is assessed explicitly
- [ ] Every business associate has (or is flagged as needing) a BAA
- [ ] Audit logging / access review for PHI access is covered

## Anti-Patterns

- [ ] Do not treat "addressable" as "optional" — you must implement it or document why an equivalent is reasonable; silence is a violation
- [ ] Do not skip the risk analysis — it's explicitly required and the most-cited gap in OCR enforcement
- [ ] Do not handle PHI through a vendor without a BAA — that alone is a breach
- [ ] Do not present this as legal certification — flag that compliance counsel / a security assessor must validate, especially the risk analysis
- [ ] Do not conflate HIPAA with SOC 2 or GDPR — overlapping controls, different legal requirements; map each separately

## Based On

HIPAA Security Rule (45 CFR §164.308–312) — administrative, physical, and technical safeguards + required risk analysis.
