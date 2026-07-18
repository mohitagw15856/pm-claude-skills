# Worked Example — Insurance Policy Decoder

A gold-standard run of this skill: a homeowner who thinks she's "fully covered" discovers her three real exposures — an ACV roof, a sewer-backup gap, and a jewelry sublimit — before the claim that would have taught her the hard way.

## The brief

Renata owns a $380,000 house (dwelling coverage $340,000) with a 12-year-old architectural-shingle roof, a finished basement with a home office, and her late mother's jewelry (~$9,000). Her declarations page shows: dwelling $340k / other structures $34k / personal property $170k / liability $300k; deductible $2,500, wind/hail deductible **1% of dwelling**; endorsements: none. The policy's loss-settlement section says roofs over 10 years old settle at **actual cash value**; personal property is replacement cost; special limits include "jewelry, watches, furs: $1,500"; exclusions include "water which backs up through sewers or drains." Her worry list: "storms, break-ins, and the basement flooding again like 2019."

## The output

### Policy Decode: homeowners — [carrier], current term

**1. The verdict** — Three findings change what you think you have: your roof is covered at *depreciated* value (a hail loss pays out roughly a third of replacement), the basement flood you're most worried about is **excluded** (sewer backup isn't in this policy — and it's the cheap endorsement that fixes it), and your mother's jewelry is covered for $1,500 of its $9,000. Everything else reads standard-to-good.

**2. Coverage decode**

| Coverage line | Limit / basis | What it pays in a real scenario | Severity |
|---|---|---|---|
| Dwelling | $340k, replacement cost — **except roof: ACV over 10 yrs** | Kitchen fire, $60k damage → ~$57.5k after deductible. Hailstorm totals the roof → see the ACV math below | 🔴 (roof) |
| Wind/hail deductible | 1% of dwelling = **$3,400** | That "1%" is $3,400 per storm claim, not $2,500 | 🟡 |
| Personal property | $170k RC — sublimit: jewelry $1,500 | Burglary takes the jewelry → **$1,500**, not $9,000 | 🔴 |
| Water backup | **Excluded** | The 2019 basement scenario again → **$0** for the office, carpet, drywall | 🔴 |
| Liability | $300k | Standard; matches her profile | 🟢 |

**3. 🚩 Red flags, ranked** — (1) *Sewer-backup exclusion vs. her #1 stated worry*: quoted — "water which backs up through sewers or drains" — this is precisely the 2019 event; backup endorsements are among the cheapest riders in the book — price one this week. (2) *ACV roof*: quoted from loss-settlement; math below. (3) *Jewelry sublimit*: $1,500 vs. $9,000 — a scheduled-valuables rider (with appraisal) closes it.

**4. The math section** — **ACV roof:** replacement ~$28,000; 12 years into a ~25-year life → depreciation ≈ 48% → payout ≈ $14,560 − $3,400 wind/hail deductible ≈ **$11,160 against a $28,000 roof.** The gap is $16,840 of her own money, today, if hail comes. **Deductible reality:** two deductibles exist — $2,500 general, $3,400 wind/hail; she budgeted for one.

**5. Questions for the agent** — price the water-backup endorsement (at $25k+ given the finished basement and office); price scheduling the jewelry at appraisal; quote replacement-cost roof coverage or a roof-schedule buy-back; confirm in writing whether the home office's business equipment falls under the business-property sublimit (typical: ~$2,500 — the office gear may be underinsured too).

*"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Why it's shaped this way

- **The decode ranked against her stated worries** — storms, break-ins, the basement — which is why the sewer exclusion leads despite the roof being the bigger dollar figure; per the framework, ranking follows the user's worry list and the money, not section order.
- **The ACV math was computed on her roof, not explained abstractly** — 12 years, 25-year life, the actual dollar gap — because framework rule says the payout scenario is the product; "your roof is ACV" changes nothing, "$11,160 against $28,000" changes her week.
- **The percentage deductible became dollars** — $3,400 — per the quality checks; "1%" reads small by design.
- **The sublimit was audited against her actual valuables** — the $9,000-vs-$1,500 line is the sublimit audit rule doing its job; without the inventory question, this finding doesn't exist.
- **The home-office question went to the agent in writing** — the business-property sublimit is real but its number wasn't in her documents, so it's a question, not an asserted finding — the missing-sections honesty rule.
- **Every fix is an endorsement she can price, not a scold** — backup rider, scheduling, roof buy-back: the decode's endpoint is her agent call, armed.
