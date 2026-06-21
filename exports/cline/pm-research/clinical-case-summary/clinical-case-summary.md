# Clinical Case Summary Skill

Produces structured clinical case summaries for educational, documentation, and handover purposes.

WARNING: For documentation and educational purposes only. All clinical content must be reviewed by a qualified healthcare professional. This is not clinical advice.

## Required Inputs
- **Purpose** (case presentation / handover / case report / educational / MDT summary)
- **Patient details** (anonymised — age, sex, relevant background)
- **Presenting complaint and history**
- **Examination findings**
- **Investigations and results**
- **Diagnosis or differential diagnoses**
- **Management and treatment**
- **Outcome** (if known)
- **Format preference** (SBAR / SOAP / Standard clinical / Narrative)

---

## Format A: SBAR (Handover / Referral)

**S — Situation**
[Patient identifier anonymised, location, reason for contact in one sentence]

**B — Background**
- Age / sex / relevant past medical history
- Current admission details
- Relevant medications and allergies
- Brief relevant social history

**A — Assessment**
- Current clinical status
- Vital signs if relevant
- Key examination findings
- Working diagnosis or differential
- Recent investigations and results

**R — Recommendation**
- What you need from the recipient
- Urgency level
- Immediate actions already taken
- Questions or concerns

---

## Format B: SOAP Note

**S — Subjective**
[Presenting complaint in patient words. Symptom history: onset, duration, character, severity, associated symptoms, relieving/aggravating factors]

**O — Objective**
- Vital signs: [BP, HR, RR, Temp, O2 sats]
- Examination: [Systematic findings]
- Investigations: [Results with reference ranges]

**A — Assessment**
- Primary diagnosis: [With brief rationale]
- Differential diagnoses: [Ranked with reasoning]

**P — Plan**
- Immediate management
- Investigations ordered
- Treatments initiated with dose, route, frequency
- Referrals
- Safety netting: what to watch for, when to escalate
- Follow-up plan

## Quality Checks
- [ ] Patient details fully anonymised
- [ ] Allergies and medications included in handover formats
- [ ] Safety netting included in SOAP plan
- [ ] Disclaimer included

## Anti-Patterns

- [ ] Do not include any identifiable patient information — full names, dates of birth, NHS or MRN numbers, or specific addresses must be anonymised or replaced with generic identifiers
- [ ] Do not omit the clinical disclaimer — this output is for documentation and educational purposes only and must not be presented as clinical advice
- [ ] Do not confuse the SBAR Recommendation with a treatment plan — R is what you need from the recipient, not a full management plan
- [ ] Do not list differential diagnoses without noting the reasoning for ranking — an unranked list of differentials is not clinically useful

## Example Trigger Phrases
- "Write a clinical handover using SBAR for this patient"
- "Summarise this case in SOAP format"
- "Write a case report for [clinical scenario]"
- "Prepare an MDT summary for this patient"
