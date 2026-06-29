# Discharge Summary Skill

The discharge summary is the handoff that the next clinician (and the patient) actually relies on: why they were
admitted, what happened, what changed, and what to do next. This skill structures the stay into a complete,
scannable summary so nothing critical — a new medication, a pending result, a follow-up — falls through the gap.

> **Clinical-safety note:** this is a documentation-formatting aid, **not medical advice**. It organises
> information a qualified clinician provides; the treating clinician must review and verify every detail
> (especially the medication list and follow-up) before it is finalised. Do not invent diagnoses, medications,
> doses, or results.

## Working from a brief

Given the admission notes and course, **produce the full summary anyway** — organise what's provided into every
standard section. Where a section's detail wasn't given, mark it clearly (e.g. "Pending results: none reported")
rather than inventing it. Never fabricate medications, doses, or diagnoses.

## Required Inputs

Ask for these only if they aren't already provided (else mark as not documented):

- **Admission** — reason for admission, date, and presenting problem.
- **Hospital course** — what happened during the stay: diagnoses, key events, procedures, consults, results.
- **Discharge medications** — the reconciled med list (new, changed, stopped, continued).
- **Discharge status & disposition** — condition at discharge and where they're going (home, facility).
- **Follow-up** — appointments, pending results, and return/escalation precautions.

## Output Format

### Discharge Summary

- **Patient & dates** — identifiers as provided; admission and discharge dates.
- **Admission diagnosis / reason for admission.**
- **Discharge diagnoses** — principal and secondary.
- **Hospital course** — a concise narrative of the stay: presentation → workup → treatment → response, by problem.
- **Procedures / significant events** — with dates.
- **Discharge medications** — reconciled list, flagging **new / changed / discontinued** explicitly.
- **Condition at discharge & disposition.**
- **Follow-up plan** — appointments (who/when), pending results to chase, and clear **return precautions** (when to seek care).
- **Patient instructions** — in plain language for the patient/carer.

Close with **fields not documented** and a clinician-review reminder.

## Quality Checks

- [ ] Medication reconciliation is explicit — new / changed / stopped / continued are distinguished
- [ ] Follow-up names who, when, and any pending results to chase — nothing left dangling
- [ ] Clear return/escalation precautions are included for the patient
- [ ] The hospital course is organised by problem, not a raw chronological dump
- [ ] No diagnosis, medication, dose, or result is invented — gaps are marked
- [ ] A patient-facing plain-language instruction set is included alongside the clinical summary

## Anti-Patterns

- [ ] Do not invent medications, doses, diagnoses, or results to complete a section
- [ ] Do not present this as medical advice — it formats clinician-provided information for handoff
- [ ] Do not leave the medication list ambiguous about what changed during the stay
- [ ] Do not omit pending results or follow-up ownership — that's where handoffs fail
- [ ] Do not write patient instructions in clinical jargon the patient can't act on

## Based On

Clinical handoff/documentation practice — structured discharge summaries with medication reconciliation, explicit follow-up, and return precautions.
