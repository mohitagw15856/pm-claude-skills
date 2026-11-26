# Week 7: Judgement about AI products

## Learning outcomes

- Frame an AI feature with the same rigour as any product decision: problem, data, evaluation and failure modes.
- Run an ethics and risk review and turn it into concrete mitigations.
- Recognise flattering agreement in AI output and get the model to argue against you.
- Decide which actions an AI agent may take alone and which need a person's approval.

## Skills used

- `ai-product-canvas`: AI product framing.
- `ai-ethics-review`: fairness, transparency, privacy, safety and accountability review.
- `sycophancy-challenger`: stress-tests a plan the user is attached to.
- `approval-policy-designer`: what an agent may do alone, and what needs sign-off.

## Case material

The Larder founders now want an AI assistant that plans a household's week, fills the basket and books a delivery slot automatically.

## In-class exercise (60 minutes)

1. **Canvas (15 min).** Run `ai-product-canvas` for the assistant. Name the one failure that would cost a household money.
2. **Push-back (15 min).** Paste the founders' pitch for the assistant into the model and ask "is this a good idea?". Then run `sycophancy-challenger` on the same pitch. Compare the two answers with the week 1 outputs you kept.
3. **Risk and approvals (30 min).** Run `ai-ethics-review`, then `approval-policy-designer` for the assistant's actions (add item, swap brand, book slot, pay). Decide, as a group, which actions need the household's approval every time.

## Graded assignment A7: AI product risk review (10%)

An AI risk review of the assistant with a short approval policy and a go, no-go or go-with-conditions recommendation.

**Week-specific criteria (0 to 4 each):**

| Criterion | What a 4 looks like |
|---|---|
| Concrete harms | Harms are specific to Larder's households (an unwanted order, a missed allergy, spending without consent), each with a mitigation and an owner. |
| Approval lines | Every money-moving or irreversible action needs approval; the policy says what happens when the household does not respond. |
| Independent judgement | The recommendation disagrees with the founders on at least one point, for a stated reason. |

## Instructor note

Step 2 works best if the founders' pitch is enthusiastic and slightly flawed. The plain question usually gets a warm yes; the challenger usually finds the flaw. Ask students which answer they would rather have heard before spending the money.
