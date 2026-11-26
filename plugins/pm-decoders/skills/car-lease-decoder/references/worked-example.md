# Worked Example — Car Lease Decoder

A gold-standard run of this skill: a "$389/month!" lease translated into its real APR and total cost, with the mileage trap priced at the driver's actual miles.

## The brief

Theo is looking at a compact SUV lease: $389/month, 36 months, 10,000 miles/year, $2,995 due at signing. Pushed for details, the dealer's worksheet shows: MSRP $34,500; "agreed value" (cap cost) $33,900; residual 57% ($19,665); money factor 0.00325; acquisition fee $695 (in the cap cost); disposition fee $395 at turn-in; excess mileage $0.25/mile; "excess wear" per inspection. Theo's honest commute math says he drives about 14,500 miles a year. The dealer's pitch: "It's only $389 — you'd pay $620 financing this same car."

## The output

### Lease Decode: compact SUV — 36mo/10k

**The two numbers:** effective APR **7.8%** · total lease cost **$20,979** ($389 × 36 = $14,004 payments + $2,995 drive-off + $395 disposition + **$3,375 projected mileage charges** + $210 misc fees)

**The equation, reconciled:** depreciation ($33,900 − $19,665 = $14,235 ÷ 36 = $395.42/mo) + rent charge (($33,900 + $19,665) × 0.00325 = $174.09/mo) = $569.51/mo pre-tax — which doesn't match the quoted $389. **The gap asks why:** the $2,995 drive-off is almost certainly a cap-cost reduction (prepaid depreciation), bringing the payment down to roughly the quoted figure. Translation: the $389 is real, but $83/month of it was paid in advance at signing — the advertised number is the payment *after* you've already paid part of the payment.

**Trap table**

| Trap | The line | Your exposure | The ask |
|---|---|---|---|
| Mileage | 10k allowance vs 14,500 driven | (14,500−10,000) × $0.25 × 3 yrs = **$3,375** | Price the 15k tier now — typically far cheaper prepaid than at $0.25/mile owed at turn-in |
| Money factor markup | 0.00325 (= 7.8% APR) | Unknown until asked | "What's the captive lender's published MF for this program and my tier?" — the delta is dealer profit, and it's negotiable |
| Disposition | $395 at turn-in | $395 | "Waived if I lease or buy from you again?" — commonly yes, in writing |
| Wear standard | "excess wear per inspection" | Open-ended | Ask for the wear standard *document* now, not at turn-in |
| Early exit | Table in back pages | Severe in years 1–2 | Read before signing if any life change is plausible |

**Negotiation points** — (1) Cap cost: "Before payments — I'd like to talk about the agreed value; $33,900 against a $34,500 MSRP is a $600 discount on a car that transacts lower" (negotiate it like a purchase price). (2) MF markup: the published-rate question above. (3) The mileage tier at today's prices. (4) Disposition waiver in writing. The payment is never negotiated directly — it falls out of 1–3.

**Lease vs buy pointer:** the honest comparison isn't $389 vs $620 — it's $20,979 for three years and no equity vs. the finance payments *minus* the equity they build. At 14,500 miles/year, Theo is also exactly the driver mileage-capped leases punish. Full math: run `car-tco` with both scenarios.

*"This is a plain-language reading, not financial advice — lease structures and taxes vary by jurisdiction; confirm anything load-bearing before signing."*

## Why it's shaped this way

- **The money factor became 7.8% in the first line** — MF × 2400 is the skill's signature move, because "0.00325" is unanswerable and "7.8%" can be compared to a credit union quote in one phone call.
- **The lease equation was reconciled and the mismatch explained** — the quoted $389 didn't match the computed $569.51, and per framework rule 2 anything that doesn't reconcile is a question; here the answer (drive-off as prepaid depreciation) reframes the advertised payment honestly.
- **Mileage exposure used 14,500, not 10,000** — the anti-patterns are explicit: the driven mileage, never the leased mileage. The $3,375 goes into the total lease cost headline, because that's where it will actually be paid.
- **Total lease cost is one number, $20,979** — payments are the costume; the decode's job is the all-in figure including the end-of-lease gauntlet.
- **Every trap carries a dollar and an ask** — the wear-standard document request and the disposition-waiver-in-writing are the protective asks dealers routinely grant when asked before signing and never after.
- **The dealer's $389-vs-$620 comparison got corrected, not mocked** — the honest frame (total cost vs. payments-minus-equity) is stated in one paragraph and the full math is routed to `car-tco`, per the don't-declare-universally anti-pattern.
- **Cap cost leads the negotiation list** — "negotiate the price, not the payment" is the single behavior change that most improves lease outcomes, so the wording is provided verbatim.
