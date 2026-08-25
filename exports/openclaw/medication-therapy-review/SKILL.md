---
name: medication-therapy-review
description: "Structure a pharmacist's medication therapy review so it finds the problems worth escalating and documents them in a form a prescriber will act on. Use when asked to conduct a medication review, run an MTM or MUR, deprescribing review, or polypharmacy assessment, or to prepare a review for a patient on many medicines. Produces the medication list reconciled, the drug-therapy-problem list classified and prioritised, the patient-goal alignment, the prescriber recommendations with rationale, and the follow-up plan. A documentation and reasoning framework for a licensed pharmacist; it makes no clinical determination and recommends no specific drug or dose."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/medication-therapy-review.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Medication Therapy Review

A medication review that lists twelve drugs and concludes 'continue as prescribed' helped nobody. The value is in the problems found — the duplicate therapy, the drug with no active indication, the one the patient stopped taking three months ago and never mentioned — and in writing them up so a busy prescriber can act in under a minute. This structures the hunt and the write-up.

## What This Skill Produces

- **A reconciled medication list** — prescribed, over-the-counter, herbal, and what the patient is actually taking, which is rarely the same list
- **A classified drug-therapy-problem list** — indication without therapy, therapy without indication, wrong drug, dose too high or low, adverse reaction, adherence
- **Prioritisation** — by potential for harm, not by ease of fixing
- **Prescriber-facing recommendations** — each with the finding, the rationale, and a specific proposed action
- **Patient-goal alignment** — what the patient actually wants from their medicines, which frequently differs from the guideline
- **The follow-up plan** — what to monitor, who does it, and when

## Required Inputs

Ask for these if not provided:
- **The medication list** — prescribed, OTC, herbal and supplements, with doses and start dates
- **What the patient actually takes** — including doses skipped, halved, or stopped, and why
- **The clinical context** — active conditions, relevant lab values, renal and hepatic function, allergies, recent hospitalisations
- **The patient's goals and constraints** — cost, swallowing difficulty, dosing burden, side effects they will not tolerate
- **Who prescribes what** — multiple prescribers are where duplication and gaps hide

## Framework: Reconcile, Classify, Prioritise by Harm

1. **Reconcile before assessing.** Compare the record against what the patient describes taking. Every review that skips this assesses a fiction.
2. **Ask what they have stopped.** Patients under-report discontinuation, and a stopped medicine explains more findings than any lab value.
3. **Classify every problem into a type.** Indication without therapy · therapy without indication · ineffective drug · dose too low · adverse reaction · dose too high · adherence. Naming the category is what makes the list actionable.
4. **Look hardest at the seams.** Multiple prescribers, recent discharge, and specialist additions are where duplication, interaction, and orphaned therapy accumulate.
5. **Prioritise by harm potential.** The anticoagulant interaction outranks the vitamin nobody needs.
6. **Write each recommendation as one action.** A prescriber acts on 'consider stopping X because Y'; they do not act on a paragraph of context.

## Deeper Material

- **[`references/worked-example.md`](references/worked-example.md)** — eleven medicines, three prescribers, and a post-fall referral where four of six problems live in the gap between the record and what the patient actually takes. Read it when the shape of a good output is unclear, or to calibrate how specific the entries should be.

## Output Format

### Medication review: [patient] · [date] · [pharmacist]

**Reconciliation:** [n] on record · [n] actually taking · **discrepancies:** [list, with what the patient reports]

**Drug therapy problems**
| # | Problem | Type | Medicines involved | Potential harm | Recommendation |
|---|---|---|---|---|---|
| 1 | [finding] | [category] | [drugs] | [high/med/low + why] | [one specific proposed action] |

**Patient goals:** [what they said they want — fewer tablets, no drowsiness, lower cost] · **Conflicts with current regimen:** [where]

**Recommendations to prescriber** — highest harm first
1. **[Finding].** Rationale: [why, referencing the specific clinical context]. Proposed: [the action]. 

**Monitoring & follow-up:** [what to check · who · when]

**Discussed with patient:** [what was explained, what they agreed to, what they declined]

> A structured reasoning and documentation framework for a licensed pharmacist. It does not diagnose, does not determine appropriateness for an individual patient, and recommends no specific drug, dose, or change. All recommendations require the prescriber's clinical judgement, and interaction and dosing decisions must be checked against current, validated references and local scope-of-practice rules.

## Quality Checks
- [ ] The list was reconciled against what the patient reports taking, not just the record
- [ ] Discontinued and self-adjusted medicines were actively asked about
- [ ] Every problem is classified into a named type
- [ ] Prioritisation is by potential harm, not by how easy the fix is
- [ ] Each recommendation states finding, rationale and one specific proposed action
- [ ] The patient's own goals are recorded and conflicts named
- [ ] Nothing asserts a clinical determination reserved to the prescriber

## Anti-Patterns
- **Reviewing the record instead of the patient.** The gap between the two is the whole finding.
- **Listing without classifying.** An unclassified list is a summary, not a review.
- **Leading with the easy wins.** A prescriber who reads three trivial items first stops reading.
- **Recommendations without rationale.** 'Stop amlodipine' with no reason will be ignored, correctly.
- **Ignoring what the patient wants.** A regimen the patient will not take is not a better regimen.
- **Asserting an interaction from memory.** Check a current reference every time; this is exactly where confident errors do harm.

## Example Trigger Phrases
- "Structure a medication review for a patient on eleven medicines"
- "Help me write up an MTM for the prescriber"
- "Run a polypharmacy assessment"
- "How do I document a deprescribing recommendation?"
- "Prepare a medication use review for this patient"
