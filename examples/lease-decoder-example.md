# Example: lease-decoder

## What this skill does

Decodes a residential lease into plain English: a clause-by-clause table with severity ratings, ranked red flags with realistic worst cases, break-clause and deposit maths, questions to ask before signing, and what is actually negotiable.

## How to trigger it

### Example 1: "what am I signing?"

**You say:**
> "Decode this lease before I sign tomorrow [pasted 12-page agreement: 12-month term at £1,450/month, §9 auto-renewal with 90-day notice, §14 tenant pays all repairs under £250, §18 deposit return requires professional cleaning receipts]."

**Claude produces (excerpt):**

### Lease Decode: [address]

**1. The one-paragraph verdict:** Negotiate first. The rent and term are standard, but three clauses shift real money onto you: an auto-renewal that silence converts into a full new year, a repair clause that makes you the maintenance budget, and deposit conditions written so they are easy to fail. All three are commonly amended when asked.

**2. Clause-by-clause decode (excerpt)**

| Clause (§) | What it says | What it means for you | Severity |
|---|---|---|---|
| §9 | renews for 12 months unless 90 days' written notice | miss one date in month 9 and you owe another year | 🔴 |
| §14 | tenant covers repairs under £250 | boiler service, leaking tap, every call-out: yours | 🔴 |
| §18 | deposit returned on professional cleaning receipts | a condition you must buy your way through | 🔴 |
| §11 | entry with 24h notice for inspection | standard where you are, reasonable scope | 🟢 |

**3. 🚩 Red flags, ranked**
1. §9 auto-renewal: worst case is being bound for a further 12 months (£17,400) for missing a notice window. Fix: ask for month-to-month rollover after the fixed term.
2. §14 repair shifting: realistic cost £300-600/year. Fix: cap at one call-out or strike it.

**4. Exit & deposit maths:** leaving at month 8 costs rent until re-let plus the £150 re-letting fee, realistically £1,600-3,050. Deposit return has 4 stated conditions; two are subjective ("to landlord's satisfaction"); photograph everything at move-in.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: "can my landlord really do this?"

**You say:**
> "My lease says the landlord can enter 'as needed without notice'. Is that normal?"

**Claude produces (excerpt):**

**Severity: 🟡 unusual, push back.** Standard leases give 24-48 hours' notice except emergencies. A no-notice entry right is often unenforceable; ask a local tenant organisation, since enforceability varies by jurisdiction. Whatever the law says, request the amendment in writing: "entry on 24 hours' notice except genuine emergency" is a change most landlords accept without argument, and refusing it tells you something too.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Paste the full lease, not a summary; traps live in the clauses nobody retypes.
- Say the jurisdiction (city/state or country); what is standard, and what is unenforceable, varies.
- Mention your realistic exit scenario; the break maths is computed against it.

## Related skills

- `closing-disclosure-decoder` for the buying-a-home equivalent of this decode
- `benefits-decoder` for the same treatment applied to an employment benefits package
