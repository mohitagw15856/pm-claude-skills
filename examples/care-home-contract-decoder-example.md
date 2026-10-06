# Example: care-home-contract-decoder

## What this skill does

Decodes a care-home contract before a parent moves in: the fee-escalation clause modelled three years forward, every exit route the contract creates (including the "needs can no longer be met" eviction trigger), the guarantor line's real undertaking, after-death charges, and the questions to put in writing. Not legal advice.

## How to trigger it

### Example 1: the contract behind the lovely tour

**You say:**
> "Review this admission agreement for my mother [pasted]: £1,350/week, 'fees reviewed annually in line with costs', guarantor section for me to sign as 'responsible party', clause 14 says they can end the placement if 'the resident's needs can no longer be met', deposit £5,400, and fees continue 14 days after death. She's self-funding with about £190k."

**Claude produces (excerpt):**

### Care contract decode: [home] · self-funding (~£190k) · [date]

**Headline vs modelled:** £1,350/week → "in line with costs", uncapped and at the home's discretion: at a representative 7%/year, year 2 **£1,445** · year 3 **£1,546** · **uncapped: yes** 🔴. At the modelled rate her £190k funds roughly 2.5 years, not the 2.7 the headline suggests; the uncapped clause is the contract's most expensive sentence.

**Clause decode (excerpt)**

| Clause | Class | What it says | Exposure |
|---|---|---|---|
| Annual review "in line with costs" | fees | home decides, no index, no cap | high |
| Clause 14 "needs can no longer be met" | eviction | home assesses, standard undefined, 28 days' notice, no appeal stated | high |
| "Responsible party" signature | liability | wording makes the signer personally liable for shortfalls, not merely an administrator | high |
| 14 days' fees after death + room clearance | after-death | ~£2,700 + clearance charges | medium |

**The eviction map:** clause 14 is the only exit route the home controls, and as written it is unbounded: no named assessor, no standard, no appeal. The written question that matters: *"What specific changes in need have led to residents being asked to leave in the past two years?"* The answer, in writing, tells you what the clause means in practice.

**The funding cliff:** the contract is silent on what happens when savings reach the state-support threshold; silence usually resolves against the family (a move, or a top-up demand). Get the policy in writing now, while you are a prospective customer rather than a dependent one.

**Guarantor decode:** as drafted, your signature undertakes personal liability for fee shortfalls. Do not sign it as written; offer the administrator-of-her-funds version instead, which homes routinely accept.

**Questions to put in writing before signing:** escalation history for the last 3 years; the funding-cliff policy; clause 14 track record; whether the deposit is protected and its return conditions.

> Not legal advice. Care-home contracts sit under heavy and very local regulation; several of these terms may be unenforceable where you are. For sums like these, a solicitor's hour is cheap insurance.

### Example 2: comparing two contracts, not two tours

**You say:**
> "Second home is £1,480/week, £130 more. But its contract caps increases at CPI+2% and the eviction clause requires an independent assessment. Worth it?"

**Claude produces (excerpt):**

**Modelled over 3 years, the 'more expensive' home is cheaper where it counts:** CPI+2% (say ~5%) on £1,480 reaches £1,632 by year 3, while home one's discretionary 7% on £1,350 reaches £1,546; close in money, but home two's number is a ceiling you can hold them to and home one's is a floor they can leave. Add the bounded eviction clause and the contracts are not comparable products: one is a price with rights, the other a price with permissions. The tour sells the lounge; the contract is the product.

> Not legal advice; confirm the escalation and eviction terms with a solicitor before signing.

## Tips for best results

- Paste the whole agreement including schedules; the extras list and after-death terms hide outside the main body.
- State the funding position (self-funding, savings level); the cliff analysis depends on it.
- Put every flagged question in writing before signing; answers given on tours do not survive disputes.

## Related skills

- `funeral-pricing-decoder` for the adjacent conversation no one wants to have twice
- `disability-insurance-decoder` for the policy that may be paying these fees
