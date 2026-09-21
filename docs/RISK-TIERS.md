# Risk tiers & human review — trust at 1,170+ skills

At this size, *how much a skill can hurt if it's wrong* matters more than how many there are. Every skill now resolves to a structured risk tier, and the high-stakes ones are expected to carry a current human review.

## The three tiers

| Tier | Meaning | What it requires |
|---|---|---|
| **high-stakes** | Being wrong can cost money, rights, health, or safety (debt, benefits, grief logistics, reentry, caregiving, legal/medical decoders, immigration, scams) | A not-advice boundary, a route to a real professional, **and a current human review** |
| **consequential** | Affects a job, a relationship, or a material decision (negotiation, layoffs, wealth-building, HR, family) | A clear not-advice boundary where relevant |
| **informational** | Reading, drafting, planning, thinking | Standard quality gates only |

## How a skill's tier is decided

`config/risk-tiers.json` → resolved by `scripts/check-risk-tiers.mjs`:

1. an explicit **skill override** wins (e.g. `salary-negotiation` is high-stakes even though its bundle isn't);
2. else the **highest tier of any bundle** the skill belongs to;
3. else the **default** (`informational`).

The resolved map is written to `data/risk-tiers.json` for the Playground, the site, and other checks to consume. The script fails if the config names a bundle or skill that doesn't exist, so typos can't silently drop a skill to a lower tier.

```
node scripts/check-risk-tiers.mjs --report   # counts + the high-stakes list
```

## Human review (the part automation can't do)

The staleness board catches *automated* rot. High-stakes skills also need a **person who knows the domain** to have read them recently. That lives in `config/human-review.json` — one entry per real review (reviewer, credential, date). `scripts/check-human-review.mjs` reports coverage and flags overdue (>12 months by default) or missing reviews.

```
node scripts/check-human-review.mjs            # coverage report
node scripts/check-human-review.mjs --strict   # fail CI when any high-stakes skill is unreviewed
```

**Coverage starts at 0% on purpose.** The registry is empty because no expert has reviewed a skill yet — recording an invented review would be worse than none. Recruiting reviewers is the [Expert Review Program](EXPERT-REVIEW-PROGRAM.md). Turn on `--strict` in CI only once coverage is real.

## What tiers should drive (next steps)

- **Labels** in the Playground and skill pages (`data/risk-tiers.json` is ready to consume).
- **Stronger disclaimers** rendered automatically for high-stakes skills.
- **Review SLA**: high-stakes skills re-reviewed every 12 months; the check surfaces what's due.
- **Attribution exclusion** — the opt-out footer already excludes these bundles (`config/attribution.json`); tiers are the principled source for that list going forward.
