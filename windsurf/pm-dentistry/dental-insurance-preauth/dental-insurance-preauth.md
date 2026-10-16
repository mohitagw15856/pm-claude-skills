---
trigger: model_decision
description: "Write a dental pre-authorisation request or claim narrative that gets approved the first time — the diagnosis, the documented failure of lesser treatment, and the attachments a reviewer needs, assembled in the order they assess them. Use when asked to write a pre-auth, submit a predetermination, appeal a denied dental claim, or write a narrative for a crown, implant, or perio case. Produces the narrative, the supporting-evidence checklist, the attachment list, and an appeal letter if the claim was already denied. Administrative support only; clinical justification must come from the treating clinician's own findings."
---

# Dental Pre-Authorisation & Claim Narrative

Most dental denials are not clinical disagreements — they are missing sentences. The reviewer needs the diagnosis, evidence that something less invasive was considered or tried, and images that show what you are describing. This assembles all three in the order the reviewer works through them, and writes the appeal when the first submission failed anyway.

## What This Skill Produces

- **The clinical narrative** — diagnosis, history, and why this treatment rather than a lesser one, in a reviewer's vocabulary
- **The evidence checklist** — radiographs, photos, charting, and dates the plan will expect for this procedure class
- **The lesser-treatment paragraph** — what was tried or considered and why it is not adequate, which is the sentence most denials hinge on
- **The attachment list** — what to send, labelled so the reviewer can match each image to the claim
- **An appeal letter** — if already denied, rebutting the stated reason specifically rather than resubmitting the same file
- **A denial-risk read** — what in this submission is most likely to draw a request for more information

## Required Inputs

Ask for these if not provided:
- **The procedure and tooth** — what is being requested, with codes if you use them
- **The diagnosis and findings** — clinical and radiographic, with dates
- **The history** — previous treatment on that tooth, prior failures, how long the problem has been present
- **What lesser treatment was tried or ruled out** — and the clinical reason it is not adequate
- **The plan and any denial** — the carrier, the plan terms if known, and the exact denial reason if this is an appeal

## Framework: Diagnosis, Failure of the Alternative, Evidence

1. **Name the diagnosis, not the request.** Reviewers approve conditions, not procedures. Lead with what is wrong.
2. **Establish chronicity and progression.** Dates matter — a finding documented across two visits is far stronger than one described today.
3. **Kill the lesser alternative explicitly.** The reviewer's default is that something cheaper would do. Say what it is and why it will fail here, in one specific sentence.
4. **Match evidence to claim.** Every assertion in the narrative should have an image or chart entry that shows it, labelled so the reviewer does not hunt.
5. **Write to the plan's language.** If the policy uses a specific term for the criterion, use that term.
6. **On appeal, rebut the stated reason only.** Resubmitting the original narrative with more adjectives is why second denials happen.

## Output Format

### Pre-authorisation: [procedure] · [tooth] · [patient] · [carrier]

**Diagnosis:** [condition, tooth, with supporting findings]

**History:** [when the problem was first documented, prior treatment on this tooth and dates, progression observed]

**Clinical findings:** [probing depths, mobility, caries extent, fracture, periapical findings — whatever the procedure class turns on]

**Radiographic findings:** [what the images show, referenced to the attached files by name]

**Why this treatment:** [the indication, in the plan's criteria language]

**Why lesser treatment is not adequate:** [the specific alternative — restoration rather than crown, scaling rather than surgery — and the clinical reason it fails here]

**Attachments:** [file name — what it shows — date taken], one line each

**Denial risk:** [the weakest link a reviewer would probe, and what strengthens it]

---
**If appealing** — Denial reason stated: [quote it]. Response: [the specific rebuttal, with the evidence that addresses that reason]. Additional evidence enclosed: [list].

> Administrative drafting only. The diagnosis, findings, and clinical justification must be the treating clinician's own; never assert a finding that is not in the chart. Plan criteria, codes, and appeal deadlines vary by carrier and jurisdiction — verify before submitting.

## Quality Checks
- [ ] Opens with the diagnosis rather than the procedure requested
- [ ] Chronicity is established with dates from the chart
- [ ] The lesser alternative is named and specifically ruled out
- [ ] Every claim in the narrative maps to a labelled attachment
- [ ] On appeal, the stated denial reason is quoted and answered directly
- [ ] No finding is asserted that does not appear in the record

## Anti-Patterns
- **Requesting a procedure instead of presenting a condition.** Reviewers approve diagnoses.
- **Omitting why the cheaper option will not work.** This single missing sentence causes a large share of denials.
- **Unlabelled attachments.** A reviewer who cannot match the image to the assertion denies for insufficient documentation.
- **Adjectives instead of measurements.** 'Severely broken down' loses to 'less than 2 mm of sound coronal structure remaining'.
- **Appealing by resubmitting.** If the reason is not addressed, the second answer matches the first.
- **Asserting findings not in the chart.** This turns an administrative problem into a serious one.

## Example Trigger Phrases
- "Write a pre-auth narrative for a crown on #30"
- "Our claim was denied — help me appeal it"
- "What does the insurer need to approve this implant?"
- "Write a predetermination for periodontal surgery"
- "Why do our crown claims keep getting denied?"
