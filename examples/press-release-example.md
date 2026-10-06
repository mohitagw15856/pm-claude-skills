# Example: press-release

## What this skill does

Writes a journalist-ready press release: specific headline, who-what-when-where-why opening a reporter could run alone, a quote that adds something, supporting detail and boilerplate.

## How to trigger it

### Example 1: a funding announcement

**You say:**
> "Press release: [Company], a Bristol logistics software firm, raised £6m Series A led by [Investor], to grow the engineering team from 12 to 30 and launch in the Netherlands. Quote from CEO [Name] available."

**Claude produces (excerpt):**

FOR IMMEDIATE RELEASE

# [Company] raises £6m to take delivery software into Europe
## Series A led by [Investor] funds Dutch launch and triples engineering team

**Bristol, [date]**: [Company], whose software plans delivery routes for mid-sized logistics fleets, has raised £6m in Series A funding led by [Investor]. The round will grow the engineering team from 12 to 30 and fund the company's first international launch, in the Netherlands, in [quarter].

The raise follows a year in which [Company]'s routed deliveries tripled to [X]m parcels across [N] fleet operators.

"[Specific quote: what the money changes, not a restatement of the headline]," said [Name], CEO of [Company]. "[Second sentence extending the thought]."

[Supporting paragraph: the Netherlands choice, named customer with permission, one data point.]

**About [Company]:** [two-sentence boilerplate]
**Media contact:** [name, email]

### Example 2: pushing back on a weak headline

**You say:**
> "Draft the headline and opening for: we're announcing our product is now 'powered by next-generation AI'."

**Claude produces (excerpt):**

**Problem first:** "powered by next-generation AI" is not news a journalist can print; there is no who-what-when and nothing measurable.

**What would make it news (pick one):**
1. A measured outcome: "[Company]'s AI routing cuts fleet fuel use 11% in six-month trial"
2. A named first: "[Customer] becomes first UK supermarket to route all home delivery with [Company] AI"
3. A launch with a date: "[Company] opens AI route planner to all UK fleets from [date]"

**If none exists yet:** this is a blog post, not a press release; sending it to media spends credibility you will want later.

## Tips for best results

- Lead with the one new fact; everything in the release hangs off it.
- Provide a real quote or ask for one to be drafted for approval; never let a quote restate the headline.
- Include the number a journalist can check; releases without one read as marketing.

## Related skills

- `product-launch-checklist` for everything else launch day needs beyond the release
- `stakeholder-product-updates` for the internal announcement version
