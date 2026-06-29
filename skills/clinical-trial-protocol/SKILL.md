---
name: clinical-trial-protocol
description: "Draft a clinical trial protocol synopsis with the elements regulators and IRBs expect. Use when asked to write a clinical trial protocol, a study protocol synopsis, a trial design, or to structure endpoints/eligibility/statistics for an interventional study. Produces a structured protocol synopsis — objectives, design, population with eligibility, interventions, endpoints, statistics, and safety/ethics — for expert review. (For non-clinical/UX research, use research-protocol.)"
---

# Clinical Trial Protocol Skill

A clinical trial protocol stands or falls on a few linked decisions: a clear objective, a design that can answer
it, endpoints that measure it, eligibility that defines who's studied, and a statistical plan that can detect the
effect. This skill drafts a protocol synopsis that makes those decisions explicit and internally consistent, in
the structure IRBs/ethics committees and regulators expect. (For a general academic or UX study, use
[`research-protocol`](../research-protocol/SKILL.md).)

> **Safety & compliance note:** this is a drafting aid for **expert review**, not regulatory, medical, or
> statistical sign-off. Real trials require qualified investigators, a statistician, and IRB/ethics and
> regulatory approval (e.g. GCP, ICH, local law). Do not invent efficacy/safety data; mark assumptions for the
> study team to set.

## Working from a brief

Given "a phase II trial of drug X for condition Y", **produce the full synopsis anyway** — infer a defensible
design, endpoints, and eligibility appropriate to the phase and condition, and clearly label every inferred
choice as a draft assumption for the study team and statistician to confirm. Never fabricate prior data or
effect sizes; state them as placeholders to be set.

## Required Inputs

Ask for these only if they aren't already provided (else infer and label as draft):

- **Intervention & condition** — what's being studied, in whom, and the phase.
- **Objective / question** — the primary question the trial must answer.
- **Comparator** — placebo, standard of care, or active control; and blinding.
- **Outcome of interest** — how benefit (and harm) will be measured.
- **Constraints** — known population, setting, and any regulatory context.

## Output Format

### Clinical Trial Protocol Synopsis: [title]

- **1. Background & rationale** — the problem, prior evidence (mark placeholders), and why this trial.
- **2. Objectives** — primary and secondary, each as a precise, testable statement.
- **3. Design** — phase, type (RCT, etc.), allocation/randomisation, blinding, arms, and duration.
- **4. Population** — setting, and explicit **inclusion** and **exclusion** criteria.
- **5. Interventions** — the intervention and comparator: dose/regimen, administration, and concomitant rules.
- **6. Endpoints** — **primary endpoint** (one, tied to the primary objective), secondary endpoints, and how/when each is measured.
- **7. Statistical considerations** — analysis populations, the primary analysis, and a sample-size basis (with assumptions flagged for the statistician).
- **8. Safety** — adverse-event definitions, monitoring/reporting, stopping rules, and any DSMB.
- **9. Ethics & conduct** — informed consent, IRB/ethics approval, data integrity, and GCP adherence.

Close with **assumptions to confirm** and a reminder that a qualified investigator and statistician must own the final protocol.

## Quality Checks

- [ ] The primary objective, primary endpoint, and primary analysis are aligned and consistent
- [ ] There is exactly one primary endpoint, clearly measurable and time-anchored
- [ ] Inclusion/exclusion criteria are explicit and operationally checkable
- [ ] Sample-size basis is stated with its assumptions flagged for the statistician
- [ ] Safety monitoring, reporting, and stopping rules are present
- [ ] Ethics/consent/IRB and GCP elements are included; no efficacy/safety data is invented

## Anti-Patterns

- [ ] Do not invent prior efficacy/safety data or effect sizes — mark them as placeholders to be set
- [ ] Do not list multiple "primary" endpoints — pick one and demote the rest to secondary
- [ ] Do not let objective, endpoint, and analysis drift apart — they must answer the same question
- [ ] Do not present this as regulatory/statistical sign-off — it's a draft for expert review
- [ ] Do not omit safety monitoring and stopping rules — a protocol without them isn't approvable

## Based On

Clinical research practice — objective-endpoint-analysis alignment, explicit eligibility, sample-size justification, and ICH-GCP safety/ethics structure.
