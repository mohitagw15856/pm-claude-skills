---
name: unit-economics
description: "Model the unit economics of a business — CAC, LTV, payback, contribution margin — from real inputs. Use when asked to calculate unit economics, work out LTV:CAC, find the payback period, or check whether a business model is viable per customer. Produces a computed unit-economics summary (LTV, CAC, ratio, payback, contribution margin) with a verdict and the levers that move it most."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/unit-economics.html
metadata:
  {
    "openclaw": { "emoji": "🧮" }
  }
---

# Unit Economics Skill

A business is only viable if each customer is worth more than it costs to acquire and serve. This skill
computes the core unit economics — CAC, LTV, the LTV:CAC ratio, payback period, and contribution margin
— from real numbers (not vibes), states a clear verdict against the rule-of-thumb benchmarks, and shows
which lever moves the model most.

## Required Inputs

Ask for these only if they aren't already provided:

- **ARPA** — average revenue per account, per month (or per period).
- **Gross margin %** — the share of revenue left after cost-to-serve.
- **Churn %** — monthly customer (or revenue) churn — drives LTV.
- **CAC** — fully-loaded cost to acquire a customer (sales + marketing ÷ new customers).

## Output Format

### Unit Economics: [business]

**1. The numbers** — computed, with the formula shown (use the helper script so they're consistent):

| Metric | Value | Benchmark |
|---|---|---|
| Lifetime (1/churn) | | |
| LTV (ARPA × margin ÷ churn) | | |
| CAC | | |
| **LTV : CAC** | | ≥ 3:1 healthy |
| **Payback (months)** | | < 12 healthy |
| Contribution margin | | |

**2. Verdict** — healthy / borderline / underwater, in one line, against the benchmarks (LTV:CAC ≥ 3, payback < 12 months).

**3. Biggest levers** — which input, improved realistically, moves the model most (usually churn or CAC), with the rough effect.

**4. Caveats** — where the inputs are assumptions vs. measured, and what to validate before betting on this.

## Programmatic Helper

`scripts/unit_econ.py` (stdlib only) computes the model so the numbers are calculated, not estimated:

```bash
# in.json: {"arpa": 50, "gross_margin": 0.8, "monthly_churn": 0.03, "cac": 400}
python3 scripts/unit_econ.py in.json
python3 scripts/unit_econ.py in.json --json
```

## Quality Checks

- [ ] LTV uses gross margin, not raw revenue (a common, model-breaking error)
- [ ] The numbers are computed by the helper, not eyeballed
- [ ] Verdict is stated against the standard benchmarks (LTV:CAC ≥ 3, payback < 12mo)
- [ ] The biggest lever is identified with its rough effect
- [ ] Assumed inputs are flagged separately from measured ones

## Anti-Patterns

- [ ] Do not compute LTV on revenue instead of gross margin — it inflates LTV and hides an unviable model
- [ ] Do not ignore payback — a great LTV:CAC with a 30-month payback can still starve a business of cash
- [ ] Do not treat blended CAC as paid CAC — separate organic from paid or the model lies
- [ ] Do not present assumptions as facts — label estimated churn/CAC and validate them
- [ ] Do not optimise the smallest lever — model which input actually moves the outcome

## Based On

SaaS unit-economics practice (David Skok / for Entrepreneurs) — margin-based LTV, LTV:CAC ≥ 3, payback < 12 months.

## Example Trigger Phrases

- "Calculate unit economics."
- "Work out LTV:CAC."
- "Find the payback period."
- "Check whether a business model is viable per customer."
