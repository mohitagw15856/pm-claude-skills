---
trigger: model_decision
description: "Win a chargeback dispute — read the reason code, assemble the evidence packet, and write the rebuttal that actually persuades the bank. Use when asked to fight a chargeback, respond to a payment dispute, write a chargeback rebuttal, or contest a customer chargeback. Produces the reason-code decode, the required-evidence checklist for that code, the structured rebuttal letter, and an honest read on whether this one is winnable — so you fight the right disputes and concede the rest. For merchants."
---

# Chargeback Dispute Response

Chargebacks are won or lost on matching the *specific reason code* to the *specific evidence* the card networks accept — not on how unfair it feels. This decodes the code, tells you exactly which proof wins that category (delivery confirmation, an AVS match, the signed terms, prior usage), assembles the rebuttal in the structure banks expect, and — importantly — tells you when a dispute is unwinnable so you don't waste the representment.

> Card-network rules and win rates vary by processor and code. This structures the strongest representment; it can't guarantee the issuer's decision.

## What This Skill Produces

- **The reason-code decode** — what the customer/bank is actually claiming, in plain terms
- **The evidence checklist** — the specific proof that wins *this* code (not a generic pile)
- **The rebuttal letter** — a structured, factual representment matched to the claim
- **The winnability read** — fight, or concede and save the fee — an honest call

## Required Inputs

Ask for these if not provided:
- **The reason code** — the code and category (fraud, product not received, not as described, subscription/cancelled, duplicate)
- **The transaction** — amount, date, product/service, and your records
- **Your evidence** — what you can actually document: delivery/tracking, AVS/CVV match, IP/device, communications, terms accepted, usage logs, refund policy
- **History** — prior chargebacks from this customer, and your processor

## Framework: Match Evidence to the Code

1. **The code dictates the fight.** "Product not received" is won with delivery proof; "fraud" with AVS/CVV/IP + usage; "not as described" with the listing + comms; "subscription cancelled" with the cancellation policy and usage after the claimed date.
2. **Compelling evidence, not a story.** Card networks weigh specific artifacts; emotion and unfairness arguments lose.
3. **Facts, dated, and cross-referenced.** Every claim in the rebuttal points to an attached artifact.
4. **Concede the unwinnable.** True fraud with no AVS match, or no delivery proof, is a lost representment — take the loss, save the time, and address prevention.
5. **Prevent the next one.** Note the pattern (friendly fraud, unclear billing descriptor, no delivery capture) so it stops recurring.

## Output Format

### Chargeback Response — [reason code] · [$amount]
**Claim in plain terms:** … · **Winnability:** Strong / Worth trying / Concede — why

### Evidence checklist (for this code)
| Required proof | Have it? | Attached as |
|---|---|---|

### Rebuttal letter
- Opening: transaction facts (date, amount, what was sold)
- The claim, and the specific evidence that refutes it (each point → an attachment)
- Terms/policy the customer accepted
- Close: concise request to reverse the chargeback

### Prevent recurrence
- [billing descriptor / delivery capture / cancellation clarity / friendly-fraud pattern]

## Quality Checks
- [ ] The evidence checklist is specific to the actual reason code, not generic
- [ ] Every rebuttal claim references a concrete, attached artifact
- [ ] The letter argues facts, not fairness or emotion
- [ ] A winnability call is made — including honest "concede" when evidence is missing
- [ ] A prevention note addresses why this chargeback happened
- [ ] No evidence is described that the merchant doesn't actually have

## Anti-Patterns
- **A generic rebuttal** ignoring what the specific code requires — the top reason merchants lose.
- **Arguing unfairness** instead of submitting the artifacts networks weigh.
- **Fighting an unwinnable dispute** and wasting the fee — know when to concede.
- **Claiming evidence you don't have** — fabricated proof loses and risks worse.
- **No prevention step** — the same chargeback returns next month.

## Example Trigger Phrases
- "Fight this chargeback — reason code is 'product not received'."
- "Write a rebuttal for a payment dispute on a $400 order."
- "Help me contest a customer chargeback and tell me if it's winnable."
- "Respond to this friendly-fraud chargeback with the right evidence."
