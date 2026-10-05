---
name: vendor-contract-checklist
description: "Review a vendor/SaaS contract against a practical checklist before you sign. Use when asked to review a vendor contract, check a SaaS/MSA/subscription agreement, flag risky terms, or prepare negotiation points before signing. Produces a structured review — key terms extracted, a risk-flagged checklist (commercial, legal, security, exit), questions to ask, and prioritised negotiation points. Not legal advice."
---

# Vendor Contract Checklist Skill

Most bad vendor deals are lost in the terms nobody read: auto-renewal, price escalators, weak SLAs, no exit,
vague data rights. This skill reviews a contract against a practical checklist, extracts the terms that actually
bite, flags the risks, and turns them into specific questions and negotiation points — so you sign with your
eyes open.

> **Note:** this is a practical review aid, **not legal advice**. For material commitments, high spend, or
> anything regulated, have it reviewed by qualified counsel. Flag, don't rule on, legal questions.

## Working from a brief

Given a contract (or a description of one), **produce the full review anyway** — extract what's present, and for
standard terms that are missing or unstated, flag them as gaps to confirm rather than assuming they're fine.
Never withhold the review for an incomplete document; mark what couldn't be assessed.

## Required Inputs

Ask for these only if they aren't already provided (else mark as "not found — confirm"):

- **The contract** — the agreement text (MSA, order form, SaaS terms, DPA), or its key terms.
- **The deal** — what you're buying, the spend, and the term length.
- **What matters to you** — must-haves (uptime, data residency, exit), and any internal/legal/security requirements.

## Output Format

### Vendor Contract Review: [vendor]

**1. Key terms at a glance** — extracted: parties, term & renewal, total cost & escalators, payment terms, SLA, liability cap, termination, data/IP, governing law.

**2. Risk-flagged checklist** — by area, each marked ✅ ok / ⚠️ review / ❌ problem / ❓ not found:

| Area | Item | Status | Note |
|---|---|---|---|
| Commercial | auto-renewal & notice period | ⚠️ | 60-day notice, auto-renews 12 mo — calendar it |
| Commercial | price increase cap | ❓ | not capped — negotiate a cap |
| Legal | liability cap vs. fees | ⚠️ | capped at 3 months' fees — low for the risk |
| Security/data | data deletion & portability on exit | ❌ | not addressed — add |
| SLA | uptime + remedy (credits) | ⚠️ | 99.5%, credits only — check fit |
| Exit | termination for convenience | ❓ | not present — request |

**3. Questions to ask the vendor** — the specific clarifications before signing.

**4. Negotiation points** — prioritised, with a suggested ask for each (what "good" looks like): the few terms worth pushing on, and the rationale.

**5. Sign-off note** — what's fine, what needs negotiation, and what to send to legal.

## Quality Checks

- [ ] Auto-renewal, notice period, and price-escalation terms are surfaced explicitly (the usual traps)
- [ ] SLA is assessed with its remedy, not just the uptime number
- [ ] Data handling on exit (deletion, portability) and liability cap vs. spend are checked
- [ ] Missing standard protections are flagged as gaps, not assumed present
- [ ] Negotiation points are prioritised with a concrete suggested ask each
- [ ] It flags legal questions for counsel rather than ruling on them

## Anti-Patterns

- [ ] Do not skim only the order form — the MSA/terms is where the risk lives
- [ ] Do not ignore auto-renewal and notice windows — they quietly lock you in
- [ ] Do not accept an SLA without checking the remedy (credits ≠ reliability)
- [ ] Do not present this as legal advice — flag material/legal items for counsel
- [ ] Do not produce a flat list — prioritise what's actually worth negotiating

## Based On

Procurement and vendor-risk practice — key-term extraction, risk-flagged review across commercial/legal/security/exit, and prioritised negotiation.

## Example Trigger Phrases

- "Review a vendor contract."
- "Check a SaaS/MSA/subscription agreement."
- "Prepare negotiation points before signing."
