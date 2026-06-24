---
trigger: model_decision
description: "Assess GDPR compliance and build the core records (ROPA, lawful basis, DSAR, DPIA triggers). Use when asked to get GDPR-compliant, build a Record of Processing Activities, decide a lawful basis, handle data-subject requests, or check whether a DPIA is needed. Produces a GDPR assessment — a ROPA, lawful-basis mapping per activity, DSAR workflow, DPIA-trigger screen, and a prioritised gap list."
---

# GDPR Compliance Skill

GDPR compliance is mostly bookkeeping you can defend: knowing every place you process personal data,
why you're allowed to, how long you keep it, and how a person can get it out or deleted. This skill
builds that record (the ROPA), pins a lawful basis to each activity, and flags the high-risk processing
that legally requires a DPIA — turning "are we GDPR-compliant?" into a documented, auditable answer.

## Required Inputs

Ask for these only if they aren't already provided:

- **Processing activities** — what personal data you collect, why, and where it flows (this is the spine; everything hangs off it).
- **Role** — controller (you decide the why/how) or processor (you act on a controller's instructions); your obligations differ.
- **Data subjects & data types** — whose data, and whether any is special-category (health, biometrics, etc.) or about children.
- **Transfers** — any processing or storage outside the EEA (triggers transfer-mechanism requirements).

## Output Format

### GDPR Assessment: [company] ([controller/processor])

**1. ROPA** — the Record of Processing Activities (Art. 30); one row per activity:

| Activity | Purpose | Data categories | Subjects | Lawful basis | Recipients | Retention | Transfers |
|---|---|---|---|---|---|---|---|

**2. Lawful basis** — the chosen Art. 6 basis per activity (consent / contract / legal obligation / vital interests / public task / legitimate interests) and why. For special-category data, the additional Art. 9 condition. Don't default everything to "consent" — it's often the weakest, hardest-to-maintain basis.

**3. DSAR workflow** — how you handle access/erasure/portability/objection requests: intake, identity check, the **one-month** deadline, and how data is located and exported/deleted.

**4. DPIA screen** — flag activities that legally require a Data Protection Impact Assessment (large-scale special-category processing, systematic monitoring, profiling with legal effects).

**5. Gaps** — prioritised: missing lawful basis, no retention period, undocumented transfers, no DSAR process.

## Programmatic Helper

`scripts/ropa_check.py` (stdlib only) validates a ROPA and scores completeness so gaps are found
mechanically:

```bash
# ropa.json: [{"activity":"...","purpose":"...","lawful_basis":"contract","retention":"3y","recipients":["..."],"special_category":false,"large_scale":true}, ...]
python3 scripts/ropa_check.py ropa.json
python3 scripts/ropa_check.py ropa.json --json
```

It flags activities missing a lawful basis, purpose, or retention, and marks those that trigger a DPIA.

## Quality Checks

- [ ] Every processing activity has a documented lawful basis and a retention period
- [ ] "Consent" isn't used as a lazy default where contract or legitimate interests genuinely apply
- [ ] Special-category data has its additional Art. 9 condition identified
- [ ] DPIA-triggering activities are flagged, not buried
- [ ] Cross-border transfers name a valid mechanism (adequacy, SCCs, etc.)
- [ ] The DSAR workflow names the one-month statutory deadline

## Anti-Patterns

- [ ] Do not default every activity to "consent" — it's revocable and high-maintenance; use the basis that actually fits
- [ ] Do not skip the ROPA — without the record of what you process, every other GDPR obligation is unanchored
- [ ] Do not store data with no retention period — "forever" is not a lawful retention policy
- [ ] Do not treat a DPIA as optional for high-risk processing — it's a legal requirement, not best practice
- [ ] Do not give legal advice as settled law — flag where a DPO or counsel must confirm (esp. lawful basis and transfers)

## Based On

EU GDPR — Art. 6 (lawful basis), Art. 9 (special category), Art. 30 (ROPA), Art. 35 (DPIA), data-subject rights.
