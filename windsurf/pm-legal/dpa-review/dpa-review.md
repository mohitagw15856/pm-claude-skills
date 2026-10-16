---
trigger: model_decision
description: "Read a Data Processing Agreement before you sign it — sub-processors, transfer mechanism, breach-notice window, deletion, audit rights — in plain language with 🔴🟡🟢 risk. Use when asked to review a DPA, check a data processing agreement, is this DPA safe to sign, or what am I agreeing to on data. Produces the plain-English summary, the risk-ranked findings, the missing-clause checklist, and the questions to send back before signature."
---

# DPA Review

Every SaaS contract now drags a Data Processing Agreement behind it, and most get signed unread — which is how you inherit a vendor's sub-processors, a 30-day breach-notice window, and no deletion guarantee. This reads the DPA the way a privacy counsel skims it: what data is processed, who else touches it, where it goes, what happens on a breach, and what's *missing* — ranked by how much it can hurt.

> Not legal advice. Flags issues for review; have privacy counsel sign off on a material agreement.

## What This Skill Produces

- **The plain-English summary** — what this DPA actually commits each side to
- **Risk-ranked findings** — 🔴 sign-blockers, 🟡 negotiate, 🟢 standard — each with the clause and why it matters
- **The missing-clause checklist** — the protections a good DPA has that this one lacks
- **The redline questions** — what to send back to the vendor before signing

## Required Inputs

Ask for these if not provided:
- **The DPA text** — the document, or its key clauses pasted
- **Your role** — are you the controller (your data) or the processor (you're the vendor)? The risks flip
- **The data** — what personal/sensitive data is involved, and any regime that applies (GDPR, CCPA, HIPAA)
- **Deal context** — how critical the vendor is; leverage shapes what's worth fighting

## Framework: What a DPA Must Get Right

1. **Scope & roles** — controller vs processor, and the processing purpose; a mismatch here voids the rest.
2. **Sub-processors** — who else gets the data, notice of new ones, and a right to object.
3. **International transfers** — the mechanism (SCCs, adequacy, DPF) for data leaving its region.
4. **Security & breach** — the standard, and the breach-notification window (72 hours is the GDPR bar; "reasonable" is a red flag).
5. **Deletion & return** — what happens to your data at termination, and by when.
6. **Audit & liability** — your right to verify, and whether liability is capped below the data risk.

## Output Format

### DPA Review — [vendor] · you are the [controller/processor]
**Verdict:** Safe to sign / Negotiate first / Do not sign — one line why

### Risk-ranked findings
| Risk | Clause | What it says | Why it matters |
|---|---|---|---|
| 🔴 | … | … | … |

### Missing protections
- [clause a good DPA has that this lacks]

### Send back before signing
1. [redline question / requested change]

## Quality Checks
- [ ] Controller/processor role identified — findings framed from your side
- [ ] Sub-processor, transfer, breach-window, and deletion terms each assessed (or flagged absent)
- [ ] The breach-notification window is stated in hours/days, not left as "reasonable"
- [ ] Every 🔴 names the exact clause and the concrete exposure
- [ ] Missing-clause list distinguishes "unusual gap" from "standard omission"
- [ ] Flagged for counsel review on anything material

## Anti-Patterns
- **Summarising without ranking** — a wall of clauses helps no one; rank by damage.
- **Ignoring who you are** — a processor and a controller face opposite risks in the same document.
- **Treating "reasonable security" as fine** — undefined standards are the finding.
- **Inventing a clause number** or requirement not in the text — quote what's there.

## Example Trigger Phrases
- "Review this DPA before we sign the vendor contract."
- "Is this data processing agreement safe to sign?"
- "What am I agreeing to on data in this DPA?"
- "Check this DPA — we're the controller, it's a GDPR deal."
