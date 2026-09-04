---
aliases: ["Care-Home Contract Decoder"]
tags: [pm-skills, skill]
skill: care-home-contract-decoder
description: "Decode a care-home contract before a parent moves in — the fee-escalation clause with no cap, the needs-can-no-longer-be-met eviction trigger, the guarantor line that quietly makes you personally liable, and the after-death charges nobody mentions on the tour. Use when asked to review a care-home or nursing-home contract, what does this admission agreement mean, can they raise the fees, or can they make my parent leave. Produces a clause-by-clause decode ranked by financial and eviction risk, the questions to put in writing before signing, and the negotiate-or-verify list. Pairs with long-term-care-options for choosing the home; this is for the contract. Not legal advice."
---

# Care-Home Contract Decoder

The tour shows the garden; the contract holds the eviction clause. Care-home agreements are signed under time pressure — a hospital discharge deadline, a bed that will not be held — by families who have just made an emotional decision and are in no state to price an indexation formula. The costly clauses are always the same handful: fees that escalate on an uncapped formula, the *needs can no longer be met* trigger that functions as eviction-at-discretion, the guarantor signature that converts a child's helpfulness into personal liability, and the charges that continue after a death. This decodes the actual document, ranks what it finds by harm, and turns each finding into a written question — because the answers you get in writing before signing are the only ones that exist later.

## What This Skill Produces

- **A clause-by-clause decode** — each provision classified: fee mechanics, eviction/discharge, liability, or after-death, ranked by exposure
- **The fee-escalation maths** — the increase clause modelled forward three years at its own formula, so the year-three number is on the table now
- **The eviction map** — every route by which the resident can be made to leave, and what notice, process, and appeal each provides
- **The guarantor decode** — what the third-party signature actually undertakes, and the difference between paying-from-their-funds and personally-liable
- **Written questions before signing** — each finding converted into a question whose answer belongs in the contract or an email
- **The negotiate-or-verify list** — what homes routinely amend, and what must be checked against local regulation rather than accepted from the document

## Required Inputs

Ask for these if not provided:
- **The contract** — pasted in full or in its fee, termination, and liability sections; a home that will not provide it before move-in day is itself a finding
- **The funding position** — self-funded, state/insurance-supported, or mixed; and whether funds will deplete to a threshold during the stay, since that boundary is where several traps live
- **The resident's situation** — care needs now and their likely direction, which is exactly what the needs-clause will be tested against
- **Who is signing what** — the resident, an attorney/deputy, or a family member, and in which capacity
- **The country** — care-home regulation, fee rules, and eviction protections vary sharply; the decode flags every point that needs local verification

## Framework: Fees, Exit, Liability, Afterwards

1. **Model the escalation clause, don't read it.** *Fees reviewed annually* means nothing until computed: index plus what percent, at whose discretion, capped or not, and does a change in care needs reprice outside the annual cycle? The decode runs the formula three years forward and puts that number beside the headline weekly rate.
2. **Find the funding cliff.** If savings will deplete to the state-support threshold, what does the contract say happens — same room, a move, a top-up demanded from family, or notice? The clause that governs the cliff matters more than the rate card, and families rarely read it until they are on the cliff.
3. **Read "needs can no longer be met" as the eviction clause it is.** Who assesses, against what standard, with what notice, and what appeal? An unbounded version means the home decides when your parent leaves. The written question: *what specific changes in need have led to residents being asked to leave in the past two years?*
4. **Decode the guarantor line before anyone helpful signs it.** *Responsible party* can mean administers-their-money or personally-owes-the-shortfall — radically different undertakings dressed in the same phrase. Nobody signs personal liability by accident once it is named; the decode names it.
5. **Price the door in both directions.** Deposits and their return conditions, notice you must give, trial-period terms — and the after-death clause: how many days of fees continue after death, and what room-clearance charges apply? Families discover this one in the worst week; the decode surfaces it in the best one.
6. **Anchor extras to the inclusive list.** What the weekly fee includes versus the chargeable-extras schedule (laundry, escorts to appointments, supplies) — homes differ enormously, and the gap is a second, quieter escalation channel.

## Output Format

### Care contract decode: [home] · [funding position] · [date]

**Headline vs modelled:** weekly fee [amount] → at the contract's own escalation formula: year 2 [amount] · year 3 [amount] · **uncapped: [yes/no]**

**Clause decode**
| Clause | Class | What it says | Exposure |
|---|---|---|---|
| [provision] | fees / eviction / liability / after-death | [plain reading] | high / medium / low |

**The eviction map:** [every exit route the contract creates — trigger, assessor, notice, appeal — and the unbounded ones flagged]

**The funding cliff:** [what the contract says happens at depletion · top-up demands · verify-locally flags]

**Guarantor decode:** [what the signature undertakes, in one sentence · who should and should not sign it]

**Questions to put in writing before signing**
1. [question] — answer belongs in: [contract amendment / email kept]

**Negotiate-or-verify:** [clauses homes routinely amend] · [claims to check against local regulation, not accept from the document]

> Not legal advice. Care-home contracts sit under heavy and very local regulation — fee rules, eviction protections, and funding thresholds differ by country and region, and several contract terms may be unenforceable where you are. For significant sums or any dispute, a lawyer or the local care regulator is the right reader. Choosing the home is a different job: see long-term-care-options.

## Quality Checks
- [ ] The escalation formula is computed forward, not paraphrased
- [ ] Every route to eviction/discharge appears in one map with notice and appeal noted
- [ ] The guarantor analysis distinguishes administering funds from personal liability
- [ ] The funding-cliff clause is found, or its absence is flagged as a question
- [ ] After-death charges are surfaced explicitly
- [ ] Every finding converts into a written question, and the local-verification flags are present

## Anti-Patterns
- **Reviewing the rate card and calling it the contract.** The rate is the one number they show you; the formula is the one that matters.
- **Letting a family member sign as guarantor unexamined** — helpfulness converted into liability by a signature block.
- **Reading the needs clause as clinical language** rather than as the exit clause it operationally is.
- **Accepting verbal reassurances** — "we'd never do that" belongs in writing or belongs nowhere.
- **Decoding with hostility.** Most homes are decent; the contract still deserves adult scrutiny, and good homes answer these questions readily.
- **Treating this as legal advice** — it arms the questions; enforceability is local and professional.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
