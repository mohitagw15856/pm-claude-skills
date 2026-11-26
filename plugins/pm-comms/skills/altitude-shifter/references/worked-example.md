# Worked Example — Altitude Shifter

## The brief

The underlying truth: Vantor's payments migration is 3 weeks late because the vendor's sandbox didn't match production behavior; the team found it in testing (good catch), the launch moves from Oct 1 → Oct 22, one enterprise customer (Beltline) was promised Oct 1 in writing, and $40k of Q4 revenue shifts to Q1. Nobody was negligent; the vendor's docs were wrong.

## The output

# Payments Migration Delay, at Four Altitudes

## 🏛 Board
Payments migration moves Oct 1 → Oct 22. Our testing caught a vendor sandbox/production mismatch before customer impact — the delay is the safeguard working. Cost: ~$40k of Q4 revenue recognized in Q1 instead; no churn expected, one contractual commitment (Beltline) being renegotiated with an offer. Decision needed: approve the revised date and the $8k service credit for Beltline this week.

## ⚙️ Engineering
New launch date: **Oct 22** — the extra three weeks are for re-validating every vendor call against *production*, not sandbox; assume the sandbox lies. What is NOT changing: scope, the cutover runbook, the rollback plan, code freeze Oct 15. New this week: a production-parity checklist per endpoint (owner: Ana, in the migration doc), and Beltline's account is first in the phased cutover — their date commitment is why the freeze cannot slip again. If parity testing surfaces anything after Oct 8, escalate same-day; the 22nd has no buffer behind it.

## 👤 Customer (Beltline)
We're moving your payments upgrade to October 22. During final testing, our team found a case where the new system behaved differently than expected, and we won't switch your payments over until it's fixed — boring and safe is the only way we ship things that touch your money. Your current setup keeps working exactly as-is until then, you don't need to do anything, and we're applying a service credit to this month's invoice. Your CSM will confirm the new date this week.

## 🌱 New hire
Context you're missing: we're mid-migration from LegacyPay to Corepay (started in June — cheaper, and LegacyPay sunsets their API next year). We planned Oct 1; during testing the team found Corepay's *sandbox* approves certain refund flows their *production* rejects — vendor docs were wrong, our tests caught it (this is why the team is oddly proud of a delay). New date Oct 22. "Beltline" = our largest enterprise customer, who had Oct 1 in their contract, hence the careful comms. The $40k figure you'll hear = Q4 revenue that shifts to Q1, not lost. The migration doc is pinned in #payments-migration; Ana owns the parity checklist.

## Delta Table

| Altitude | Cut | Added | Reframed |
|---|---|---|---|
| Board | Endpoint/runbook detail | The decision (date + credit) and the Q4→Q1 framing | Delay → "safeguard working"; honest, since testing did catch it |
| Engineering | Revenue framing | Freeze date, parity checklist, escalation trigger, no-buffer warning | Vendor blame → "assume the sandbox lies" (actionable paranoia) |
| Customer | Vendor's name, internal dates, $40k | The nothing-you-need-to-do line + credit | Mismatch → "we won't move your money until it's boring" |
| New hire | Nothing | ALL history: why migrating, who Beltline is, why pride, where docs live | Jargon expanded; the mood explained, not just the facts |

## Leakage Check
Caught and fixed: an early board draft said "vendor documentation failure" (blame leaking up — replaced with the safeguard framing, which is also truer); the customer version originally named Corepay (internal detail leaking down); the engineering version now carries the same $40k-adjacent urgency the board sees, via the "no buffer behind the 22nd" line rather than revenue talk.

## Why it's shaped this way

- **All four versions are simultaneously true** — different load-bearing facts, zero contradictions; the delta table makes every cut inspectable.
- **The board version leads with the decision** and contains the risk — softening bad news uphill is the banned move.
- **The customer version has zero internal jargon** and passes the forward test — a Beltline ops manager could paste it to their CFO.
- **The new-hire version is the LONGEST** — per the anti-patterns, it's the version with more context, not a summary.
- **The leakage check names real catches** — blame moving up, vendor names moving down; the section exists because these leaks are the default, not the exception.
