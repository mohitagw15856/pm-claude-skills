---
trigger: model_decision
description: "Appeal a denied insurance claim — read the real reason for the denial, find the strongest grounds, and draft the appeal with the evidence that answers it. Use when asked to appeal a denied claim, my insurance claim was rejected, the insurer won't pay, or how do I fight a claim denial. Produces a decode of the denial reason, the best grounds to appeal on, a structured appeal letter citing your policy, the evidence checklist, deadlines to watch, and the external-review/ombudsman escalation. Not legal or regulated advice."
---

# Insurance Claim Appeal

A denial is often a first offer, not a verdict. Insurers deny for specific, stated reasons — "not medically necessary," "pre-existing," "outside coverage," "insufficient documentation" — and a large share get overturned on appeal when the claimant answers that exact reason with the right evidence and cites their own policy back. This decodes the denial, picks the strongest grounds, and writes the appeal — while being clear it's a preparation aid, not regulated advice.

## What This Skill Produces

- **The denial decode** — what the stated reason actually means, and what specifically must be rebutted
- **The grounds** — the strongest basis to appeal (coverage misread, documentation gap, coding/error, medical-necessity, procedural mistake by the insurer)
- **The appeal letter** — structured, citing your policy section, the claim/reference numbers, and the evidence that answers the denial
- **The evidence checklist** — records, letters, receipts, or a provider's statement that directly rebut the reason
- **Deadlines & escalation** — the appeal window (often tight), internal vs external review, and the ombudsman/regulator path if the internal appeal fails

## Required Inputs

Ask for these if not provided:
- **The denial** — the exact reason given (quote the letter/EOB if possible) and the claim/reference number
- **The policy** — type (health, auto, home, travel, life) and the coverage/section relevant to the claim
- **The claim** — what you claimed for, amount, and dates
- **What you have** — the denial letter, policy document, receipts/records, any provider notes
- **Timing** — the date of the denial and any appeal deadline stated

## Framework: Answer the Exact Reason

1. **Decode before you argue.** Pin the *specific* denial reason — appeals fail when they argue in general instead of rebutting the stated ground.
2. **Read your policy back to them.** Quote the coverage section that supports payment; many denials rest on a misread or a clause that doesn't apply to your facts.
3. **Match evidence to the reason.** "Not medically necessary" needs a provider's letter; "insufficient documentation" needs the missing records; a coding error needs the corrected code — target the gap, don't carpet-bomb.
4. **Mind the clock.** Appeal windows are often short and strict. Establish the deadline first and file well inside it; note if an external review has its own timer.
5. **Escalate in order.** Internal appeal → independent/external review → ombudsman or regulator. Each step has its own process; keep every letter and reference number.

## Output Format

### Appeal: [policy type] claim [#] · denied [date] for "[reason]"

**What the denial really means:** [plain-English decode] — to overturn it you must show [X].

**Strongest grounds:** [coverage misread / documentation gap / error / medical-necessity / procedural].

**Appeal letter**
> [Claim #, policy section cited, the denial reason addressed head-on, the evidence that answers it, the specific outcome requested — reconsider and pay]

**Evidence to attach:** [the exact records/letters that rebut the stated reason]

**Deadlines:** internal appeal by [date] · external review window [if known].

**If the internal appeal fails:** [independent/external review → ombudsman/regulator → consider professional advice].

**Note:** preparation aid, not legal or regulated financial advice — for high-value or complex denials, consider a licensed adviser.

## Quality Checks
- [ ] The specific denial reason is identified and addressed directly
- [ ] The relevant policy section is cited back to the insurer
- [ ] Evidence is matched to the exact reason, not generic
- [ ] The appeal deadline is established and the letter is timed inside it
- [ ] The external-review/ombudsman escalation is included
- [ ] The "not regulated advice" boundary is stated for complex cases
- [ ] Claim and reference numbers are included

## Anti-Patterns
- **Arguing in general** instead of rebutting the stated denial reason.
- **Ignoring the deadline** — a late appeal is often dead on arrival.
- **Dumping every document** rather than the specific proof that answers the reason.
- **Overstating entitlement** — asserting coverage the policy doesn't support.
- **Stopping at the first no** without using the external-review path.
- **Posing as legal advice** on a high-stakes or disputed denial.

## Example Trigger Phrases
- "My health insurer denied a claim as 'not medically necessary' — help me appeal."
- "Home insurance rejected my water-damage claim. What are my grounds?"
- "Travel insurance won't pay for my cancelled trip — write the appeal."
- "The denial says 'insufficient documentation.' What exactly do I send?"
- "Internal appeal failed — how do I escalate to an ombudsman?"
