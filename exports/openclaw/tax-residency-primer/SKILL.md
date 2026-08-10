---
name: tax-residency-primer
description: "Orient yourself on your tax-residency situation after moving countries — the questions that determine where you owe tax, the double-taxation and dual-residency traps, and what to pin down before you file — so you know what to ask a cross-border tax professional. Use when someone says 'am I tax resident in [country]', 'do I pay tax in two countries', 'moved countries mid-year, what about tax', or 'tax residency rules'. Produces a residency-question map, the trap list, a document checklist, and the questions for a professional. Strictly not tax advice — it orients and routes to a qualified adviser."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/tax-residency-primer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Tax Residency Primer Skill

Cross-border tax is where confident people make expensive mistakes, because moving
countries can leave you tax-resident in two places at once, owing tax you didn't expect,
or missing a treaty benefit that would have saved thousands. This skill does exactly one
thing well: it *orients* you — the factors that determine residency, the traps to watch,
and the specifics to pin down — so that your conversation with a qualified cross-border
tax professional is short and productive. It is emphatically **not tax advice**, gives no
figures or filings, and its main output is often "here's why you need a professional, and
here's exactly what to ask them."

## What This Skill Produces

- A **residency-question map**: the factors tax systems actually use (days present,
  permanent home, centre of vital interests, domicile, the split-year rules) framed as
  questions to answer for your situation — not conclusions
- The **trap list**: dual residency, double taxation, the year-of-move split, exit taxes,
  reporting of foreign accounts/assets, and remote-work-from-abroad complications — so
  none ambush you
- A **document/fact checklist**: what to gather before filing or before seeing an adviser
  (travel dates, home ownership/rental, income sources and countries, prior-country
  status)
- The **questions for a professional**: a tight, specific list so a cross-border tax
  adviser can resolve your situation efficiently — plus how to find one

## Required Inputs

Ask for (if not already provided):
- The countries involved (moved from → to) and the date of the move
- The rough shape of income (employment, self-employment, investments, foreign income,
  remote work for a foreign employer) — categories only, no amounts needed
- Ties to each country (home owned/rented, family, days spent, prior residency)
- What's prompting the question (an approaching filing deadline, a job, uncertainty)

## Framework

1. **Frame residency as questions, never a verdict.** Tax residency turns on factors like
   days present (and the specific counting rules), where your permanent home is, your
   centre of vital interests, and sometimes domicile — combined differently in every
   country. The skill lays these out as questions to answer with an adviser; it does not
   declare you resident anywhere.
2. **Surface the dual-residency and treaty reality.** You can be resident in two countries
   simultaneously; double-tax treaties then have "tie-breaker" rules and relief
   mechanisms — but they must be claimed correctly. Flag that this is likely in a move
   year and that the treaty (if one exists) matters, without interpreting it.
3. **Name the year-of-move and remote-work traps.** The move year is the messiest —
   split-year treatment, part-year residency, income sourced before/after the move. And
   working remotely from a new country for an old-country employer creates residency,
   payroll, and even permanent-establishment questions people rarely anticipate. Flag
   these prominently.
4. **Build the fact pack.** The adviser will need: precise travel/presence dates, home
   status in each country, income types and their source countries, prior tax status,
   and any foreign-account/asset reporting obligations (which carry heavy penalties if
   missed). Gathering these in advance turns an expensive open-ended consult into a
   focused one.
5. **Route to a qualified professional — and say why.** Cross-border tax genuinely needs
   an expert (a cross-border/expat tax adviser or accountant covering both countries).
   The skill's honest deliverable is a well-prepared client with the right questions, and
   the clear message that DIY here risks real money and legal trouble.

## Output Format

```
## Your residency questions (to resolve with an adviser — not answered here)
[Days/presence · permanent home · centre of vital interests · domicile · split-year —
as questions for your situation]

## Traps to raise
[Dual residency & treaty tie-breakers · double-taxation relief · year-of-move split ·
exit taxes · foreign-account/asset reporting · remote-work-from-abroad]

## Fact pack to gather (before filing / before the adviser)
[Travel dates · home status per country · income types & source countries · prior
status · reporting obligations]

## Questions for a cross-border tax professional
[The tight, specific list · how to find a suitable adviser]

⚠ This is NOT tax advice and contains no figures or filings. Cross-border tax must be
handled by a qualified professional for your specific countries and situation.
```

## Quality Checks

- [ ] Residency is framed entirely as questions to resolve with a professional — zero
      residency verdicts or filing guidance
- [ ] The dual-residency/treaty and year-of-move/remote-work traps are surfaced
- [ ] A concrete fact pack to gather is provided
- [ ] The output routes clearly to a qualified cross-border adviser and says why DIY is risky
- [ ] The not-tax-advice line is present and unambiguous

## Anti-Patterns

- [ ] Do not give tax advice, figures, filings, or a residency determination — orient
      only, and route to a professional; this is the hard rule
- [ ] Do not interpret a specific treaty or country's rules as settled — flag that they
      apply and must be handled by an expert
- [ ] Do not understate the risk — missed foreign-asset reporting and double taxation
      carry real penalties
- [ ] Do not skip the remote-work-from-abroad trap — it's increasingly common and rarely
      anticipated
- [ ] Do not send the user off without a prepared question list — a focused consult is
      the whole value

## Related

[[arrival-setup]] for the tax-number step; [[credit-from-scratch]] and
[[healthcare-system-primer]] for the other newcomer systems; [[micro-retirement-planner]]
if the move is a career break; [[financial-model-narrative|budget-variance-analysis]]
neighbors for business finances — but a professional owns the tax itself.
