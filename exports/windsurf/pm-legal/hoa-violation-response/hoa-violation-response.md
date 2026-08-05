---
trigger: model_decision
description: "Respond to an HOA or condo-association violation notice or fine — decide whether to comply, cure, or dispute, and do it on the record. Use when asked to respond to an HOA violation, my HOA fined me, is this HOA rule enforceable, or fight an HOA notice. Produces a read on whether the citation likely holds (against the governing documents and consistent enforcement), a comply-vs-dispute recommendation, a measured response/appeal letter, the evidence and record-keeping to keep, and escalation options — flagging that HOA rules and rights are governed by your documents and local law. Not legal advice."
---

# HOA Violation Response

An HOA notice can feel like an order you must obey — but associations have to follow their own governing documents and enforce rules consistently, and you usually have a right to respond or appeal. This helps you check whether the citation actually holds, decide whether to cure it or dispute it, and respond on the record — without turning a fixable notice into a war or an escalating fine.

## What This Skill Produces

- **A does-it-hold read** — whether the alleged violation is actually in the governing documents (CC&Rs/bylaws/rules) and whether it's being enforced consistently
- **A comply / cure / dispute recommendation** — often the cheapest path is to fix a genuine minor issue; dispute when the rule doesn't apply or enforcement is selective
- **A response/appeal letter** — measured, citing the relevant rule (or its absence), requesting the hearing/appeal you're entitled to
- **Evidence & records** — photos, the governing docs, the notice, and dated communications
- **Escalation options** — the association's appeal/hearing process, mediation, and when a lawyer is warranted
- **A governance flag** — your rights come from the governing docs + local law; not legal advice

## Required Inputs

Ask for these if not provided:
- **The notice** — what you're cited for, any fine, and the deadline
- **The rule** — does the governing document actually prohibit it (if you have the docs)
- **The facts** — is the allegation accurate; is the rule enforced against others
- **What you want** — comply quietly, dispute the fine, or challenge the rule
- **Location** — HOA law varies by jurisdiction

## Framework: Check It, Then Comply Or Contest

1. **Verify it's a real rule.** Confirm the cited conduct is actually prohibited by the governing documents — associations sometimes cite rules that don't exist or don't apply.
2. **Check for selective enforcement.** If neighbors do the same thing unpunished, inconsistent enforcement is a strong dispute angle.
3. **Weigh comply vs. dispute.** For a genuine minor violation, curing it quickly is often cheaper than a fight; dispute when the rule doesn't apply, the facts are wrong, or enforcement is selective.
4. **Respond on the record.** A calm written response/appeal that cites the rule (or its absence) and requests your hearing preserves your rights and often resolves it.
5. **Keep evidence and escalate properly.** Photos, the docs, and dated communications; then use the appeal/hearing process, mediation, and — for large fines or liens — a lawyer.

## Output Format

### HOA response: cited for [x] · fine [amount] · deadline [date]

**Does it hold?** in governing docs? [yes/no/unclear] · enforced consistently? [yes/no] → [likely holds / disputable].
**Recommendation:** [comply/cure — cheapest] · or [dispute — because rule doesn't apply / facts wrong / selective enforcement].
**Response letter**
> [Reference the notice · cite the rule or its absence · state the facts · request the hearing/appeal you're entitled to · keep it measured].
**Keep:** governing docs · the notice · photos · dated communications.
**Escalate:** [association appeal/hearing → mediation → lawyer for large fines/liens].

> Not legal advice. Your rights come from the governing documents and local HOA law — review them and consult a lawyer for significant fines or liens.

## Quality Checks
- [ ] Checks the alleged violation against the governing documents
- [ ] Considers selective/inconsistent enforcement
- [ ] Gives a clear comply-vs-dispute recommendation with reasoning
- [ ] Provides a measured, on-the-record response/appeal letter
- [ ] Lists evidence to keep and the escalation path
- [ ] Flags governance/local-law dependence / not legal advice

## Anti-Patterns
- **Assuming the HOA is automatically right** (or automatically wrong).
- **Ignoring the notice** and letting fines compound.
- **An angry, personal response** instead of citing the rules.
- **Not checking the governing documents.**
- **Escalating to a lawyer** over a trivial, easily-cured issue.

## Example Trigger Phrases
- "My HOA sent me a violation notice and a fine — how do I respond?"
- "Is this HOA rule even enforceable?"
- "They're fining me for something my neighbors do too."
- "Help me write an appeal to my homeowners association."
- "Can my condo association actually make me do this?"
