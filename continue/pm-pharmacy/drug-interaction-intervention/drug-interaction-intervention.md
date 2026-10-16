---
name: "Document a pharmacist's clinical intervention — the interact"
description: "Document a pharmacist's clinical intervention — the interaction or error spotted, what was done, what the prescriber decided, and the outcome — so the record shows the catch and the care that followed. Use when asked to document a clinical intervention, record a prescriber call about an interaction, log a near-miss, or build an intervention record for audit or remuneration. Produces the intervention record with severity and evidence, the prescriber-call script, the outcome and follow-up, and the aggregate reporting fields. A documentation framework for a licensed pharmacist; every interaction and severity judgement must be verified against current references."
---

# Clinical Intervention Record

The catch is the easy part. What gets lost is the record: what was found, what evidence supported it, what the prescriber was told, what they decided, and what happened to the patient afterwards. Without that chain the intervention is invisible to audit, to remuneration, and to the next pharmacist who sees the same patient.

## What This Skill Produces

- **The intervention record** — what was found, the class of problem, and the evidence relied on
- **Severity and likelihood** — assessed and stated, so a reviewer can see why this warranted a call
- **The prescriber-call script** — the thirty-second version that gets a decision rather than a callback
- **The outcome** — what the prescriber decided, including when they decided to continue unchanged
- **Patient follow-up** — what to monitor and who is doing it
- **Aggregate fields** — the data points that make interventions countable for audit and remuneration

## Required Inputs

Ask for these if not provided:
- **What you found** — the interaction, contraindication, dose issue, duplication, or allergy conflict
- **The medicines and the patient context** — doses, timing, indication, renal and hepatic function, age, and other therapy
- **Your evidence** — the reference consulted and what it says, including the severity rating it assigns
- **The prescriber** — who they are and how they are best reached
- **The outcome, once known** — what was decided and whether the patient was affected

## Framework: Evidence, Severity, Specific Ask

1. **Check a current reference before you call.** Confident recall is where interaction errors come from. Name the source in the record.
2. **Assess severity and likelihood separately.** A theoretically severe interaction with negligible likelihood is a different call from a moderate one that is near-certain in this patient.
3. **Establish patient-specific relevance.** Renal function, age, concurrent therapy and indication determine whether a listed interaction matters here. Generic warnings get dismissed.
4. **Lead the call with the ask.** 'I am calling about Mrs Shah's warfarin and the new fluconazole — I would suggest an INR check within three days' gets a decision. A recital of the interaction gets a callback.
5. **Record the decision, whatever it is.** 'Prescriber elected to continue, monitoring arranged' is a complete and legitimate outcome and protects everyone.
6. **Close the loop.** An intervention without follow-up is half an intervention.

## Output Format

### Intervention: [patient] · [date] · [pharmacist]

**Found:** [the problem, stated specifically] · **Class:** [interaction / contraindication / dose / duplication / allergy / other]

**Medicines involved:** [drug A + drug B, doses, start dates]

**Patient-specific relevance:** [renal/hepatic function, age, indication, concurrent therapy — why this matters for this patient rather than in general]

**Evidence:** [reference consulted, what it states, severity rating assigned] · **Checked:** [date/time]

**Assessment:** severity [high/moderate/low] · likelihood [high/moderate/low] · **basis:** [one line]

**Prescriber contact:** [who, how, when] · **Said:** [the thirty-second ask]

**Outcome:** ☐ Changed to [what] ☐ Dose adjusted ☐ Monitoring arranged ☐ Continued unchanged — [prescriber's stated reason] ☐ Unable to contact — [what was done instead]

**Follow-up:** [what is monitored · by whom · when] · **Patient informed:** [what they were told]

> A documentation framework for a licensed pharmacist. It makes no clinical determination. Every interaction, severity rating, and monitoring interval must be verified against current validated references for the individual patient; do not rely on this structure, or on recall, for the clinical content.

## Quality Checks
- [ ] A current reference was consulted and is named with the date checked
- [ ] Severity and likelihood are assessed separately
- [ ] Patient-specific relevance is stated, not just the generic interaction
- [ ] The prescriber call led with a specific proposed action
- [ ] The outcome is recorded even when nothing changed
- [ ] Follow-up monitoring has a named owner and a date
- [ ] The patient was informed where appropriate, and that is recorded

## Anti-Patterns
- **Calling from memory.** The single most common source of a wrong severity claim.
- **Reporting the interaction without the ask.** Prescribers act on proposals, not on alerts.
- **Ignoring patient-specific relevance.** Undifferentiated warnings train prescribers to dismiss you.
- **Not recording 'continued unchanged'.** It looks like the call never happened, and it is the outcome most likely to be reviewed later.
- **No follow-up owner.** Monitoring assigned to nobody is monitoring that does not occur.
- **Logging only the dramatic catches.** Aggregate data is what funds and defends the service.

## Example Trigger Phrases
- "Document the interaction I just called the GP about"
- "Record a clinical intervention for audit"
- "How do I write up a near-miss?"
- "Script for calling a prescriber about a warfarin interaction"
- "The prescriber decided to continue anyway — how do I document that?"
