---
name: car-lease-decoder
description: "Decode a car lease offer — the money factor converted to APR, the cap-cost math, mileage and disposition traps, and what to negotiate. Use when asked to decode my car lease, is this lease deal good, what's a money factor, or review this lease before I sign. Produces the real-numbers decode (money factor → APR, total lease cost), the trap list with dollar exposure, and the negotiation points dealers expect to concede."
---

# Car Lease Decoder Skill

Leases are quoted in a dialect designed to prevent comparison: money factors instead of interest rates, cap costs instead of prices, payments instead of totals. This skill translates everything into the two numbers that matter — the *effective APR* and the *total cost of the lease* — then walks the traps that live in the back pages.

> **Not quite this?** Use `used-car-decoder` when you are buying a used car from a listing rather than leasing.

## What This Skill Produces

- **The translation** — money factor × 2400 = the APR they didn't say; cap cost vs MSRP vs negotiated price
- **Total lease cost** — payments + drive-off + fees + likely end charges, one number
- **The trap list** — mileage math, disposition fee, wear-and-tear standards, early-exit exposure, each priced
- **Negotiation points** — what's routinely movable, with the asks

## Required Inputs

Ask for these only if not provided:
- **The offer sheet** — payment, term, miles/year, drive-off; ideally: money factor, residual %, cap cost, fees
- **The car** — model and MSRP (residuals and negotiability vary)
- **Your driving reality** — honest annual miles; the mileage trap is priced per your number
- **The alternative** — buying the same car, if they want the comparison (chain to `car-tco`)

## Framework

1. **Money factor first:** MF × 2400 = APR. Quote it back to the dealer as a rate. A "0.00325 money factor" is 7.8% — a number the customer can compare to their credit union. Also ask what MF the captive lender *published* — marked-up MF is dealer profit and negotiable.
2. **The lease equation, shown:** depreciation (cap cost − residual) + rent charge ((cap + residual) × MF) + taxes/fees. Every offer decodes into this; anything that doesn't reconcile is a question.
3. **Cap cost is the price** — negotiate it exactly like a purchase price before ever discussing payment. "What payment do you want?" is the trap question; the decode answers with cap cost.
4. **The mileage math, personalized:** (your real miles − allowance) × per-mile charge × term. At 15k real vs 10k leased and $0.25/mile, that's $3,750 hiding behind a cheaper payment.
5. **The end-of-lease gauntlet:** disposition fee, wear standards ("excessive" defined by whom?), and the early-exit table — decode each with its dollar exposure and the one protective ask (e.g., waived disposition if leasing again).

## Output Format

### Lease Decode: [car] — [term]/[miles]
**The two numbers:** effective APR **[n.n]%** · total lease cost **$[n]** ([payments] + [drive-off] + [fees] + [projected end charges])

**The equation, reconciled** [depreciation + rent charge + fees vs their payment math — matches / gap of $n asks why]
**Trap table** | Trap | The line | Your exposure | The ask |
**Negotiation points** — cap cost, MF markup, mileage tier, disposition — each with wording
**Lease vs buy pointer:** [one honest paragraph; full math via `car-tco`]

End verbatim: *"This is a plain-language reading, not financial advice — lease structures and taxes vary by jurisdiction; confirm anything load-bearing before signing."*

## Quality Checks

- [ ] The money factor is converted to APR and the markup question is raised
- [ ] Total lease cost is computed, not just the payment
- [ ] Mileage exposure uses the user's real miles
- [ ] Every trap carries a dollar exposure and a protective ask
- [ ] The disclaimer appears verbatim

## Anti-Patterns

- [ ] Do not evaluate the payment — payments are the costume; APR and total cost are the deal
- [ ] Do not accept the money factor as a mystical constant — it's a rate with a markup
- [ ] Do not use the leased mileage in the math — use the driven mileage
- [ ] Do not ignore the end-of-lease pages — that's where the cheap payment gets paid back
- [ ] Do not declare lease vs buy universally — it depends on miles, years, and taxes; point to the calculator
