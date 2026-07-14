---
name: "Decode an itemized medical bill or EOB into plain English an"
description: "Decode an itemized medical bill or EOB into plain English and find the charges worth disputing. Use when someone asks 'why is my medical bill so high', 'decode my hospital bill', 'what is this EOB saying', or 'can I negotiate this bill'. Produces a line-by-line decode, duplicate and unbundling flags, balance-billing red flags, and ready-to-read scripts for requesting an itemized bill, financial assistance, and a negotiation call."
---

# Medical Bill Decoder Skill

Medical bills are written in code — literally — and errors are common enough that reading yours
carefully pays real money. This skill translates each line, flags the charges that look wrong,
and hands over the exact words to say on the phone.

## What This Skill Produces

- A line-by-line decode of charges into plain English
- Ranked red flags: duplicates, unbundling, balance billing, implausible charges
- Three scripts: request an itemized bill, ask about financial assistance, negotiate the balance
- A prioritized action list — what to dispute first and with whom

## Required Inputs

Ask for these only if they aren't already provided:

- **The bill and/or EOB text** — pasted or transcribed. If it's only a summary bill, say so and lead with the itemized-bill request script; decode what's visible.
- **Insurance status** — insured (in/out of network, if known), uninsured, or unsure.
- **Context** — what the visit was for, and whether the facility was chosen in an emergency.

## Framework: Severity Scale

Rate every finding:

- 🔴 **Can cost you real money** — duplicate charges, unbundling (one procedure billed as several component codes), balance billing for out-of-network care at an in-network facility or in an emergency, charges for care that didn't happen, bill vs. EOB mismatch, being billed more than the EOB's "patient responsibility."
- 🟡 **Unusual — push back** — vague lines ("supplies," "facility fee") with big numbers, level-of-service upcoding signals (highest-tier visit code for a simple visit), charges wildly above typical.
- 🟢 **Standard** — copays, deductible application, and normal-looking line items; say so.

Decode codes by framing, not lookup tables: explain what a CPT/HCPCS or revenue code *type* means from its context on the bill, and mark any code you can't confidently interpret as `[to confirm — ask billing what this covers]`. Never fabricate a code-to-price standard. Always compare bill against EOB when both exist — the gap between them is where the money is.

## Output Format

### Medical Bill Decode: [provider / date of service]

**1. The verdict** — total billed, what looks legitimate, what's disputable, and a realistic target number.

**2. Line-by-line decode**

| Line / code | What it appears to be | Amount | Assessment | Severity |
|---|---|---|---|---|

**3. 🚩 Red flags, ranked** — each with the specific line quoted, why it's suspect, and who to raise it with (billing dept, insurer, or both).

**4. Your scripts** — three short, word-for-word scripts: (a) request the fully itemized bill with codes, (b) ask about financial assistance / charity care and prompt-pay discounts, (c) the negotiation call — open with disputes, then ask for a reduction and a payment plan; get everything in writing.

**5. Action order** — numbered next steps, deadlines noted (don't let it go to collections while disputing — say to request a hold).

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Every flagged charge points to a specific line on the bill, quoted or numbered
- [ ] Bill and EOB are cross-checked when both are provided; mismatches are the top flags
- [ ] Uninterpretable codes are marked `[to confirm]`, never guessed into a diagnosis
- [ ] All three scripts are word-for-word usable, not summaries of what to say
- [ ] Balance-billing flags note that protections depend on jurisdiction and plan type
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent charges, codes, or prices that aren't in the document
- [ ] Do not soften a red flag to seem balanced — a likely duplicate is a likely duplicate
- [ ] Do not present jurisdiction-dependent billing protections as universal
- [ ] Do not diagnose or second-guess the medical care itself — decode the billing only
- [ ] Do not promise outcomes ("they'll waive this") — frame scripts as asks with good odds

## Based On

Patient billing-advocacy practice — itemized-bill auditing, EOB reconciliation, negotiation scripting.
