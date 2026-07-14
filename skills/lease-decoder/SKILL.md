---
name: lease-decoder
description: "Decode a residential lease into plain English and rank the clauses that can hurt you. Use when someone asks 'what am I signing', 'decode my lease', 'is this rental agreement normal', or 'can my landlord really do this'. Produces a clause-by-clause decode table, ranked red flags, break-clause and deposit math, questions to ask before signing, and what's actually negotiable."
---

# Lease Decoder Skill

A lease is written by the landlord's side, for the landlord's side. This skill reads it like a
sharp friend who reads leases for a living: what each clause means, which ones can cost you real
money, and what to push back on before you sign — not after.

## What This Skill Produces

- A clause-by-clause decode table in plain English
- Red flags ranked by severity, with the money math spelled out (break penalties, auto-renewal, deposit conditions)
- Questions to ask the landlord before signing
- A short list of what's actually negotiable

## Required Inputs

Ask for these only if they aren't already provided:

- **The lease text** — pasted in, photos transcribed, or partial. Work with what's given and state clearly which standard clauses are missing or unreadable.
- **Rent, deposit, and term** if not in the text.
- **Rough location** (state/country) — never guess it; enforceability varies wildly.
- Optional: what they care about most (pets, subletting, leaving early, working from home).

## Framework: Severity Scale

Rate every finding on this scale, ordered by real-world cost:

- 🔴 **Can cost you real money** — auto-renewal into a full new term, break penalties beyond re-rental costs, repair/maintenance burden shifted to the tenant, deposit-return conditions written to fail (e.g. "professional cleaning" receipts), fee stacking, liability waivers.
- 🟡 **Unusual — push back** — entry with short/no notice, blanket guest restrictions, mandatory landlord's insurer, unilateral rule changes, vague "damage beyond wear and tear."
- 🟢 **Standard boilerplate** — say so plainly, so the reader knows what to skip worrying about.

Walk the lease specifically for: **auto-renewal traps** (notice window; what silence commits you to), **repair burden-shifting**, **entry rights** (notice period, reasons), **break clause math** (compute the actual dollar exit cost), **deposit-return conditions** (list every stated condition). Where a clause is commonly unenforceable (e.g. waiving habitability), flag it as: *"often unenforceable — ask a local tenant org; enforceability varies by jurisdiction."* Never declare a clause void as universal fact.

## Output Format

### Lease Decode: [address or "your lease"]

**1. The one-paragraph verdict** — sign / negotiate first / walk, and why.

**2. Clause-by-clause decode**

| Clause (§) | What it says | What it means for you | Severity |
|---|---|---|---|

**3. 🚩 Red flags, ranked** — worst first, each with: the quoted line, the realistic worst case in dollars or hassle, and the fix to ask for.

**4. Exit & deposit math** — what leaving early actually costs, and every condition attached to getting the deposit back.

**5. Questions to ask before signing** — 3–6, ordered by leverage.

**6. What's negotiable** — the clauses landlords routinely amend when asked.

End the artifact with, verbatim: *"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Quality Checks

- [ ] Every red flag quotes the actual lease language — section number or verbatim text
- [ ] Break-clause and deposit math is computed in real numbers, not described vaguely
- [ ] Jurisdiction-dependent points are flagged as such, with the tenant-org referral line
- [ ] Missing or unreadable sections are named explicitly, not papered over
- [ ] Genuinely standard clauses are marked 🟢 so the reader isn't scared of boilerplate
- [ ] The disclaimer line appears verbatim in the artifact

## Anti-Patterns

- [ ] Do not invent clauses that aren't in the document — decode only what's there
- [ ] Do not soften a red flag to seem balanced — if it can cost real money, say so bluntly
- [ ] Do not present jurisdiction-dependent rules as universal — flag and refer out
- [ ] Do not mark everything 🔴 — an all-alarm decode is as useless as none
- [ ] Do not give litigation strategy or "this is illegal" verdicts — that's a lawyer's call

## Based On

Tenant-side lease review practice — clause triage, exit-cost math, deposit-condition auditing.
