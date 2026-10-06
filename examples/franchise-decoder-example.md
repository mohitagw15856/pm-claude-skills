# Example: franchise-decoder

## What this skill does

Decodes a franchise offering before you sign away a decade: the earnings claim read as a lawyer wrote it, the ten-year cost rebuilt beyond the entry fee, the territory clause's exceptions, the exit terms that decide whether you're buying an asset or a job, and the validation-call script including former franchisees. Not legal or financial advice.

## How to trigger it

### Example 1: evaluating an FDD before the discovery day

**You say:**
> "Evaluate this franchise [FDD excerpts pasted]: $45k entry fee, 6% royalty + 2% marketing on gross, 'protected territory', Item 19 shows average unit revenue $610k, 10-year term renewable 'on then-current terms', mandatory suppliers, non-compete 2 years/25 miles. Sales rep told me owners 'typically clear $120k'."

**Claude produces (excerpt):**

### Franchise decode: [brand] · ~$45k entry + build-out · [date]

**The one-sentence deal:** you pay ~$45k plus build-out to operate under their system for 10 years, pay 8% of gross forever, and at year 10 they decide the terms on which your equity survives.

**Clause decode (excerpt)**

| Clause / item | Class | What it says | What it means for you |
|---|---|---|---|
| 6% + 2% on gross | leak | 8% of revenue, not profit | at $610k revenue that is $48.8k/year off the top, paid in bad years too |
| Renewal "on then-current terms" | exit | they rewrite the deal at year 10 | your equity's value at exit is at their option; this is the contract's most expensive sentence |
| "Protected territory" | control | protected *except* online sales and franchisor-owned channels (§[x]) | the carve-outs are the clause; one sentence of protection, two of exceptions |
| Non-compete 2yr/25mi | exit | you cannot run the skill you spent a decade building | makes walking away expensive, which prices every renewal negotiation |

**Earnings reality:** Item 19's $610k is *average revenue* across reporting units: averages conceal the distribution, revenue is not income, and royalties come off that gross while you live on the net. **Salesperson numbers not in the document:** "typically clear $120k" appears nowhere in the FDD; a verbal earnings figure outside the document is a flag with a name on it. Ask for it in writing and watch what happens.

**Ten-year cost rebuild:** entry $45k + royalties ~$366k + marketing ~$122k + tech fees + one mandated refresh (~$60k, Item 11) + supplier premium (unknown; ask) → **$600k+ against earnings evidence the document declines to state**.

**Validation calls:** 6 for current owners (months to breakeven vs what sales told you; supplier costs vs open market), 4 for former (what ended it; what the exit paid), 3 for the franchisor (unit closures and transfers in the last 3 years; the churn number is the most honest line in the pack).

> Not legal or financial advice. Disclosure regimes and cooling-off periods vary by country and state. A franchise-specialist lawyer reviews the actual documents before any signature; this decode arms that conversation, it does not replace it.

### Example 2: reading closures against openings

**You say:**
> "Item 20 shows 85 openings and 61 closures/terminations over 3 years. The rep says that's 'normal growth churn'. Is it?"

**Claude produces (excerpt):**

**The arithmetic the phrase is covering:** 61 exits against a base of ~240 units is roughly a quarter of the system gone in 3 years, while sales kept 85 new owners arriving. High churn with high openings is the signature of a system that makes its money selling franchises rather than running them; the entry fees fund the engine, the closures feed it. The validation calls now have one priority: former franchisees from those 61, who are listed with contact details in the same Item. Three of those conversations outweigh everything the brochure says.

> Not legal or financial advice; a franchise lawyer reviews before any signature.

## Tips for best results

- Paste the FDD items, not the brochure; the brochure is marketing, the FDD is testimony.
- Write down every number the salesperson says aloud; the ones not in the document are the finding.
- Call former franchisees, not just the references offered; the graveyard knows things the showroom doesn't.

## Related skills

- `startup-idea-validator` for pressure-testing the independent-business alternative
- `care-home-contract-decoder` for the same read-the-exit-first discipline on a different contract
