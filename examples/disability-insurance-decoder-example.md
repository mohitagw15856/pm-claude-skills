# Example: disability-insurance-decoder

## What this skill does

Decodes a disability policy or employer LTD plan into whether it would actually pay: the own-occupation versus any-occupation definitions quoted and explained, the benefit maths after offsets and taxes, ranked red flags, and what to confirm in writing before relying on it.

## How to trigger it

### Example 1: "how much would I actually get?"

**You say:**
> "Decode my employer LTD plan [pasted summary]: 60% of base salary to $8k/month, 90-day elimination period, 'own occupation for 24 months, any occupation thereafter', offsets for Social Security and state disability, premiums employer-paid. I earn $120k base + $30k average commission. Monthly expenses $5,800."

**Claude produces (excerpt):**

### Disability Coverage Decode: [employer] LTD

**1. The verdict:** the brochure says $6,000/month; the realistic claim-time number is **$3,300-3,900 after offsets and tax**, against $5,800 of expenses, a $2,000-2,500 monthly gap. The single clause most worth knowing: at month 25 the definition switches from your occupation to any occupation, which is where long claims end.

**2. Definition decode**

| Clause | The policy's words | What it means when claiming | Severity |
|---|---|---|---|
| "own occupation, 24 months" | as quoted | for 2 years, unable to do *your* job pays | 🟢 for the window |
| "any occupation thereafter" | "...any occupation for which you are reasonably suited by education, training or experience" | at month 25, if you could do *some* suited job, benefits stop; this is the industry's quietest clause | 🔴 |
| base-salary-only | "60% of basic monthly earnings" | your $30k of commission is invisible: coverage is 60% of $120k, not $150k | 🔴 |

**3. The benefit math:** 60% × $10k = $6,000 → minus Social Security disability if awarded (~$2,400 `[verify]`) → **$3,600** → employer-paid premiums usually make benefits taxable `[verify with plan doc]` → roughly **$3,100-3,300 net**. Against $5,800 expenses, the plan funds a little over half your life.

**4. 🚩 Red flags, ranked:** the 24-month switch; commission exclusion (a quarter of your income uninsured); 90-day elimination vs your emergency fund (have 3+ months of runway or the gap starts on day one).

**5. The reliance checklist:** get in writing: the any-occ switch date for your hire cohort, the full offset list, tax treatment, and portability on leaving (usually none). The gap a supplemental individual own-occ policy would need to fill: ~$2,500/month, commission-inclusive; described, not sold.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: comparing an individual policy quote

**You say:**
> "An agent quoted me an individual policy: 'true own-occupation to 65', $3,000/month, $160/month premium, self-paid. Worth it on top of the employer plan?"

**Claude produces (excerpt):**

**What the quote fixes, precisely:** true own-occ to 65 removes the month-25 cliff; self-paid premiums generally make benefits tax-free `[verify]`; and $3,000 approximately fills the decoded gap. The two questions that decide it before price: does its definition really say "own occupation" without a suited-by-training qualifier (ask for the specimen contract, not the brochure), and does it offset against the employer plan or stack? If it stacks and the definition is clean, $160/month is buying certainty on the exact clause your employer plan is weakest on.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Paste the plan's actual definitions section; everything that decides a claim lives in those quoted words.
- Give total comp, not base; the gap between them is often uninsured and invisible until claim time.
- State monthly expenses; the finding is the gap between the real net benefit and real life.

## Related skills

- `benefits-decoder` for the rest of the package this plan sits in
- `claim-denial-decoder` if a claim on this policy is ever denied
