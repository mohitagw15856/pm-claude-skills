---
name: dental-referral-letter
description: "Write a dental referral letter a specialist can act on without ringing you back — the question you are actually asking, the findings and images that support it, and what you have already tried. Use when asked to write a referral to an endodontist, oral surgeon, periodontist or orthodontist, refer a patient to a specialist, or when a referral was returned for more information. Produces the referral letter, the attachment list, the urgency marker, and the patient-facing explanation. Communication support only; the clinical assessment and the decision to refer are the referring clinician's."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/dental-referral-letter.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Dental Referral Letter

A referral that says 'please assess and treat as you see fit' wastes a specialist's appointment and the patient's day. The specialist needs one thing above all: the question you want answered. This writes the letter around that question, attaches the evidence that lets them answer it, and tells the patient what is about to happen to them.

## What This Skill Produces

- **The referral letter** — reason, question, findings, and what has already been attempted
- **The specific question** — the single sentence that distinguishes a useful referral from a handoff
- **The attachment list** — radiographs, photographs, charting, labelled and dated
- **The urgency marker** — routine, soon, or urgent, with the finding that justifies it
- **What you have already done** — treatment attempted, medications given, and the response
- **The patient-facing explanation** — what the referral is for, what will likely happen, and what it does not mean

## Required Inputs

Ask for these if not provided:
- **The patient and the tooth or area** — plus relevant medical history, medications, and allergies
- **Your findings** — clinical and radiographic, with dates
- **The question** — what you want the specialist to determine or do
- **What you have already tried** — treatment, medication, and the outcome
- **Urgency and constraints** — pain level, infection, and any patient constraints such as anxiety or access needs

## Framework: Ask a Question, Not a Favour

1. **State the question in the first line.** 'Is #14 restorable?' or 'Please assess for surgical extraction given proximity to the IAN canal.' Everything after this supports it.
2. **Give the findings that bear on that question only.** A complete chart dump buries the point; the specialist will request what else they need.
3. **Say what you tried.** A specialist who does not know you already attempted a pulpotomy may repeat it.
4. **Mark urgency honestly.** Everything urgent means nothing is. Reserve it for infection, trauma, and pain that is not controlled.
5. **Attach and label.** Named, dated files that match what the letter describes.
6. **Prepare the patient.** Tell them what the referral is for and what it does not mean — most patients hear 'referral' as 'something is seriously wrong'.

## Output Format

### Referral: [specialty] · [patient] · [tooth/area] · [date]

**To:** [specialist] · **From:** [clinician, practice, contact]
**Urgency:** ☐ Routine ☐ Soon ☐ Urgent — [the finding that justifies it]

**Question:** [the one thing you want answered or done]

**Patient:** [name, DOB] · **Medical history:** [relevant conditions, medications, allergies, anticoagulants]

**Presenting complaint:** [in the patient's words, with duration]

**Findings:** [clinical] · [radiographic, referenced to attachments]

**Already attempted:** [treatment, medication, dates, and the response]

**Attachments:** [file name — what it shows — date], one per line

**Patient notes:** [anxiety, access needs, language, availability]

---
**For the patient:** [plain-language explanation of what the referral is for, what will probably happen at the appointment, and what it does not mean]

> Drafting support only. The clinical assessment, the decision to refer, and the urgency judgement are the referring clinician's. Do not state findings that are not in the record. Referral pathways and specialist scope vary by jurisdiction.

## Quality Checks
- [ ] The question appears in the first line and is answerable
- [ ] Urgency is marked and justified by a named finding
- [ ] Prior treatment attempts and their outcomes are recorded
- [ ] Every attachment is labelled with what it shows and when it was taken
- [ ] Relevant medical history — especially anticoagulants and bisphosphonates — is included
- [ ] The patient has a plain-language explanation of what happens next

## Anti-Patterns
- **'Please assess and treat.'** The specialist cannot prioritise, prepare, or bill against a non-question.
- **Marking everything urgent.** It stops working immediately and permanently.
- **Omitting what you already tried.** Leads to repeated treatment and a confused patient.
- **Sending images without labels or dates.** A returned referral costs the patient weeks.
- **Leaving out anticoagulants or bisphosphonates.** A surgical referral without these is a safety problem, not an admin one.
- **Not telling the patient why.** They will fill the silence with the worst explanation available.

## Example Trigger Phrases
- "Write a referral to an endodontist for #14"
- "Refer this patient to oral surgery for an impacted third molar"
- "Our referral was returned asking for more information — what was missing?"
- "How urgent should I mark this referral?"
- "Write a perio referral with the charting attached"
