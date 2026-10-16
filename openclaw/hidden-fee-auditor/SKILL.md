---
name: hidden-fee-auditor
description: "Scan a bill, contract, or quote for junk and hidden fees — the padding buried in the fine print — and get them questioned or removed. Use when asked to check this bill for hidden fees, are these charges legit, what am I actually paying for, or review this quote for junk fees. Produces a line-by-line read flagging suspicious/vague/padded charges, which are commonly negotiable or bogus, the questions to ask and script to dispute them, and an estimate of what you could save — across bills like telecom, hotels, cars, banking, and services."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/hidden-fee-auditor.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Hidden-Fee Auditor

Companies pad bills and quotes with vague line items betting you won't question them — "administrative fee," "resort fee," "processing," "documentation." Most people never read closely enough to push back. This audits the charges line by line, flags what's junk or negotiable, and hands you the exact questions to get them explained, reduced, or removed.

## What This Skill Produces

- **A line-by-line read** — each charge classified: legitimate, vague/questionable, or commonly-junk padding
- **The suspicious ones** — fees that are frequently bogus or negotiable (admin/processing/resort/doc/convenience fees)
- **The questions & dispute script** — what to ask to force an explanation, and how to request removal or a reduction
- **A savings estimate** — roughly what's contestable
- **A pre-commit check** — for a quote/contract, what to challenge *before* you sign

## Required Inputs

Ask for these if not provided:
- **The document** — the bill, quote, or contract (paste the line items/charges)
- **The type** — telecom, hotel, car purchase/rental, bank, utility, event tickets, services
- **Stage** — already billed, or a quote before you commit
- **Context** — what you expected to pay / were quoted
- **Goal** — understand the charges, dispute them, or negotiate before signing

## Framework: Read Every Line, Question The Vague

1. **Itemize and classify.** Go charge by charge — a clear service you agreed to is fine; a vague or unexplained line is a target.
2. **Know the usual suspects.** "Administrative," "processing," "convenience," "resort," "documentation," and "regulatory recovery" fees are often padding or negotiable, not true pass-through costs.
3. **Make them explain it.** "What exactly is this charge for, and is it mandatory or can it be removed?" forces justification — many evaporate under a direct question.
4. **Separate real taxes from fake ones.** Genuine government taxes aren't negotiable; company-invented "fees" dressed up to look official often are.
5. **Challenge before you sign.** On a quote, negotiate or strike junk fees pre-commitment — far easier than after you've paid.

## Output Format

### Fee audit: [bill/quote type] · expected ~[amount]

| Line item | Amount | Read |
|---|---|---|
| [charge] | [x] | ✅ legit / ⚠️ vague — ask / 🚩 commonly junk/negotiable |

**Question these:** [the flagged charges + why].
**Ask / dispute:** "[what is this for — mandatory or removable?]" → request removal/reduction.
**Likely contestable:** ~[estimate].
**Before you sign (if a quote):** [strike/negotiate these first].

## Quality Checks
- [ ] Every charge is classified (legit / questionable / junk)
- [ ] Flags the common padding fees specifically
- [ ] Distinguishes real taxes from invented "fees"
- [ ] Gives concrete questions and a dispute/negotiate script
- [ ] Estimates what's contestable
- [ ] For quotes, advises challenging before signing

## Anti-Patterns
- **Assuming every line is mandatory** and paying without question.
- **Confusing invented fees with real taxes.**
- **Vague "this seems high"** with no specific line flagged.
- **Only auditing after paying** when it's a quote you could still negotiate.
- **Overpromising** that everything is removable.

## Example Trigger Phrases
- "Check my phone bill for hidden fees."
- "The hotel added a resort fee and a bunch of charges — are these legit?"
- "Review this car-purchase quote for junk fees before I sign."
- "What are all these fees on my bill actually for?"
- "My internet bill has charges I don't recognize — what can I dispute?"
