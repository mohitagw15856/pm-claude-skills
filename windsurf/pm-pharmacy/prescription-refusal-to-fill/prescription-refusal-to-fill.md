---
trigger: model_decision
description: "Handle a prescription you are not going to dispense — the professional judgement recorded, the patient conversation, the prescriber contact, and the continuity of care that stops a refusal becoming abandonment. Use when asked how to refuse to fill a prescription, decline to dispense, handle a suspected forgery or early refill, or document a corresponding-responsibility decision. Produces the decision record, the conversation script, the prescriber contact, the continuity step, and the escalation path. Legal obligations vary by jurisdiction; verify yours."
---

# Declining to Dispense

Refusing to dispense is one of the few things a pharmacist does that is simultaneously a clinical act, a legal act, and a deeply personal moment for the patient standing at the counter. Done badly it is an accusation delivered in public. This separates the judgement from the delivery: what you decided and why, how you say it without humiliating anyone, and what you do next so the patient is not simply abandoned.

## What This Skill Produces

- **The decision record** — the basis for declining, stated as professional judgement rather than suspicion
- **The patient conversation** — wording that declines without accusing, in a setting that preserves privacy
- **The prescriber contact** — what to ask and what to record from the answer
- **The continuity-of-care step** — what happens to the patient next, which is the part most often skipped
- **The escalation path** — when this becomes a safeguarding, regulatory, or law-enforcement matter rather than a professional one
- **The internal record** — what the team needs so the next shift is not blindsided

## Required Inputs

Ask for these if not provided:
- **The prescription and the concern** — what was presented and what specifically prompted the decision
- **What you checked** — prescriber verification, dispensing history, monitoring programme if available, and what each showed
- **The patient interaction so far** — what they said, and whether they have been told anything yet
- **The clinical picture** — legitimate therapeutic need, whether abrupt discontinuation carries risk, and any known dependency
- **Your obligations** — your jurisdiction's rules on refusal, referral, transfer, and reporting, which vary substantially

## Framework: Judgement, Privacy, Continuity

1. **Separate the concern from the conclusion.** 'The quantity is inconsistent with the last dispensing' is a finding. 'This patient is drug-seeking' is a conclusion you probably cannot support and should not record.
2. **Verify before you decline.** A call to the prescriber resolves a large share of these, and an unverified refusal is the one that becomes a complaint.
3. **Move the conversation somewhere private.** A refusal delivered within earshot of a queue is a dignity failure regardless of whether the decision was right.
4. **Decline in the first person, without accusation.** 'I am not able to dispense this today' owns the decision. 'You are not allowed' assigns blame.
5. **Do not create a clinical cliff.** Where abrupt discontinuation carries real risk, that risk is part of your decision and your referral, not an afterthought.
6. **Give them somewhere to go.** Prescriber, another pharmacy, urgent care — a refusal with no next step is abandonment.
7. **Escalate on the right axis.** Safeguarding, regulatory reporting, and law enforcement are separate paths with separate thresholds; know which one you are on.

## Output Format

### Decision not to dispense: [date] · [pharmacist]

**Presented:** [medicine, quantity, prescriber, date on the prescription]

**Concern:** [the specific finding — stated as an observation, not a characterisation of the patient]

**Checks performed:** prescriber verification [outcome] · dispensing history [what it showed] · monitoring programme [checked Y/N, outcome] · prescription authenticity [what was examined]

**Clinical considerations:** [legitimate therapeutic need · risk of abrupt discontinuation · known dependency or pain condition]

**Decision:** not dispensed · **Basis:** [professional judgement, one sentence, defensible on the record]

**Patient conversation:** held [in private / at counter] · said: [wording used] · patient response: [recorded factually]

**Continuity of care:** [prescriber contacted / patient referred to X / prescription returned or retained per local rules / urgent care advised]

**Escalation:** ☐ None ☐ Safeguarding ☐ Regulator ☐ Law enforcement — [basis and to whom]

**Team note:** [what the next shift needs to know]

> A professional-conduct and documentation framework only. The decision to dispense or decline, and every legal obligation attached to it — including whether a prescription may be retained, what must be reported, and to whom — are governed by your jurisdiction's law and your regulator's standards. Verify those before acting; they differ sharply between jurisdictions.

## Quality Checks
- [ ] The concern is recorded as an observation, not as a characterisation of the patient
- [ ] Verification with the prescriber was attempted before declining, where possible
- [ ] The conversation happened somewhere the patient could not be overheard
- [ ] The wording owns the decision rather than accusing the patient
- [ ] Risk from abrupt discontinuation was considered and is recorded
- [ ] The patient was given a specific next step
- [ ] Escalation, if any, went down the correct path with a stated basis

## Anti-Patterns
- **Declining in front of a queue.** Even a correct decision becomes a complaint and a humiliation.
- **Recording a suspicion as a fact.** 'Appeared to be seeking' is unsupportable and will be read back to you.
- **Refusing without verifying.** The prescriber call resolves many of these and protects the rest.
- **Ignoring discontinuation risk.** Some refusals create a genuine clinical emergency; that has to be part of the decision.
- **No next step.** A patient sent away with nothing is the version of this that causes harm.
- **Confusing the escalation paths.** Reporting to the wrong body, or to none, both cause problems.
- **Not telling the team.** The next shift dispenses it and the whole judgement is undone.

## Example Trigger Phrases
- "How do I refuse to fill this prescription properly?"
- "I think this prescription is forged — what do I do?"
- "Patient is asking for an early refill on a controlled drug"
- "How do I document a decision not to dispense?"
- "What do I say to the patient when I decline?"
