---
name: collections-email
description: "Write a polite-but-firm payment-reminder / collections email sequence for overdue invoices. Use when asked to write a collections email, a payment reminder, a dunning sequence, or to chase an overdue invoice. Produces a staged sequence — gentle pre-due nudge through escalating overdue reminders to a final notice — that stays professional, keeps the relationship intact, and makes paying easy. Not legal advice."
---

# Collections Email Skill

Chasing payment is uncomfortable, so it's often done too late or too harshly. The effective approach is a
**staged sequence** that starts friendly and firms up on a schedule — always professional, always making it
trivially easy to pay. This skill writes that sequence so you get paid without burning the relationship.

> **Note:** this is a communication aid, **not legal or debt-collection advice**. Late-payment interest,
> statutory rights, and regulated debt-collection rules vary by jurisdiction — confirm any interest/late fees
> and escalation (collections agency, legal) with an accountant/lawyer before acting on them.

## Working from a brief

Given "chase a client whose $5,000 invoice is 2 weeks overdue", **write the full sequence anyway** — infer a
sensible cadence and tone progression, marking specifics *(insert invoice #, amount, dates, payment link)*.
Don't state late-fee/interest amounts as enforceable — flag them to confirm. Never threaten beyond what's lawful/intended.

## Required Inputs

Ask for these only if they aren't already provided (else mark to insert):

- **The invoice** — number, amount, original due date, and how overdue it is.
- **The relationship** — client name, contact, and whether they're a valued ongoing client or a one-off.
- **Terms** — your payment terms and any agreed late-fee/interest (flag to confirm enforceability).
- **Payment method** — exactly how they can pay (link, bank details), to remove friction.

## Output Format

### Collections Sequence: [invoice]

A staged set of emails, each short, professional, and with a clear pay-now path:

1. **Pre-due reminder (optional, ~3–5 days before)** — friendly heads-up the invoice is due soon.
2. **Due-date / just-overdue (day 0–3)** — assume an oversight; warm nudge, restate amount + due date + how to pay.
3. **Overdue reminder (~7–14 days)** — firmer, still polite; note it's now overdue, ask for a payment date or to flag an issue.
4. **Second overdue (~21–30 days)** — clear and direct; reference the terms, request immediate payment or a call, mention any agreed late fee *(confirm)*.
5. **Final notice (~30–45 days)** — formal; state the next step if unpaid (pause work, escalate per terms) — factual, not threatening.

For each: a subject line, a short body, and the **payment details/link** repeated. Tone firms up across the sequence but never becomes abusive.

Add **notes**: insert real invoice details; confirm any interest/late fee and escalation are lawful and intended.

## Quality Checks

- [ ] The sequence escalates in firmness over a sensible cadence (gentle → formal final notice)
- [ ] Every email restates the amount, invoice number, and an easy way to pay
- [ ] Early emails assume good faith (oversight), not bad intent
- [ ] The final notice states a concrete, factual next step — not an empty or unlawful threat
- [ ] Tone stays professional throughout — firm, never abusive
- [ ] Late-fee/interest and escalation are flagged to confirm, not asserted as enforceable

## Anti-Patterns

- [ ] Do not open with hostility — most late payments are oversight; start friendly
- [ ] Do not make it hard to pay — repeat the payment link/details in every message
- [ ] Do not threaten legal action or fees you can't or won't enforce — keep it factual and lawful
- [ ] Do not wait until 60 days to send the first chase — a pre-due/just-due nudge gets paid fastest
- [ ] Do not present this as legal advice — flag interest/escalation for professional confirmation

## Based On

Accounts-receivable practice — staged dunning sequences that escalate professionally, remove payment friction, and preserve the client relationship.
