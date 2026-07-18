---
name: medical-records-request
description: "Request your medical records and actually get them — what to ask for, the request letter that can't be shuffled aside, the timelines and fee rules to cite (jurisdiction-flagged), and the escalation path for stonewalls. Use when asked how do I get my medical records, write a records request, my doctor's office won't send my records, or what records should I collect. Produces the itemized request letter, the delivery and format choices decoded, the follow-up ladder, and the personal health-file structure for keeping them."
---

# Medical Records Request Skill

Your medical records are, in most places, yours by right — and yet getting them can feel like a heist: unanswered faxes, "we only send to other doctors," fees that materialize, imaging reports sent without the images. The gap is almost never law; it's process friction that a specific, itemized, deadline-aware written request cuts straight through. This skill writes that request, decodes the format choices that matter (images vs. reports, portal vs. complete file), and ladders the follow-up for offices that need reminding.

## What This Skill Produces

- **The itemized request letter** — specific records, date ranges, format, delivery, ready to send
- **The what-to-ask-for decode** — the difference between the portal view, the "designated record set," imaging *images* vs. reports, and pathology materials — matched to the user's purpose
- **The follow-up ladder** — polite check → written reminder citing timelines → complaint paths, with dates
- **The personal health-file structure** — how to keep what arrives so the next request is smaller

## Required Inputs

Ask for these if not provided:
- **The purpose** — second opinion, new doctor, moving, personal archive, dispute — it determines *which* records and *what format* (a consultant needs images; a new PCP needs the summary and problem list)
- **The providers involved** — each holds its own records; hospital systems and imaging centers are separate requests from the physician's office
- **The jurisdiction, loosely** — access rights, response timelines, and permissible fees vary by country/state; the letter cites rights generically with a verify-locally flag, and the user can look up specifics
- **Any deadline** — an appointment date turns the request urgent and belongs in the letter

## Framework: The Friction-Cutting Rules

1. **Itemize or receive a summary:** "my records" gets you a visit summary; the letter names each item — clinic notes [date range], lab results, imaging *reports and images on disc/transfer*, pathology reports (and slides if a consult needs them), medication list, referral letters. Specificity is the whole trick.
2. **Put it in writing, address it to the records custodian:** verbal requests evaporate; the letter creates the clock. Ask the office which channel (portal message, form, fax — yes, still fax) *counts* as their official intake, then use it and keep proof of the date.
3. **You, not just your doctors:** records offices sometimes claim patient copies aren't available or only provider-to-provider transfer exists — in most jurisdictions patients have direct access rights; the letter's rights sentence (kept generic, flagged verify-locally) exists for exactly this deflection.
4. **Fees and timelines have rules:** most jurisdictions cap copying fees and set response windows. The letter asks for the fee schedule up front and notes the request date; the follow-up ladder cites the elapsed time, not outrage.
5. **The purpose sets the format:** consults need source materials (images, slides); continuity needs the summary set; archives want the complete designated record set once, then incremental updates. Over-requesting has a real cost — a 900-page complete file for a routine handoff buries the signal.

## Output Format

# Records Request: [providers] — purpose: [purpose]

## The Letter
[Ready to send: patient identifiers · itemized records with date ranges · format and delivery choices · the generic access-rights sentence (verify-locally flagged) · fee-schedule request · the deadline if real · date and signature line]

## What You're Asking For, Decoded
| Item | Why this format | Common pitfall |
|---|---|---|

## The Follow-Up Ladder
Day 0: send via official intake, keep proof · Day ~10: polite status call, note the name · Day ~20: written reminder citing elapsed time and the request date · Beyond the local window: the complaint paths (records custodian's supervisor, the practice manager, and the applicable regulator — named as types, jurisdiction-flagged)

## The Health File
[Structure for what arrives: by provider then date · the running summary page · what to hand the next new doctor — so this request is the last big one]

> Access rights, timelines, and fee caps are jurisdiction-specific and change — verify the local specifics before citing exact numbers; this skill's letters cite rights generically for exactly that reason.

## Quality Checks

- [ ] The letter itemizes records with date ranges — no bare "all my records" unless the purpose is a true archive
- [ ] Imaging images vs. reports is explicitly chosen per the purpose
- [ ] The rights sentence stays generic with the verify-locally flag — no invented statute citations
- [ ] The ladder runs on dates and elapsed time, not temperature
- [ ] Each provider/facility gets its own request — one letter to the hospital doesn't fetch the imaging center's files

## Anti-Patterns

- [ ] Do not cite specific statutes, fee caps, or day-counts as fact — jurisdictions differ; generic rights + verify-locally is the honest letter
- [ ] Do not accept "we only send provider-to-provider" silently — the direct-access sentence exists for this
- [ ] Do not over-request — format follows purpose; the complete file is for archives, not handoffs
- [ ] Do not escalate before the clock has actually run — the ladder's power is its reasonableness
- [ ] Do not interpret the records' medical content — organize the paper; the medicine belongs to clinicians
