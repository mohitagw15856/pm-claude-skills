# Worked Example — Freelance Rate

A gold-standard run of this skill: a designer leaving a $90k job, talked out of the salary÷2000 rate she was about to quote — with the derivation that doubles as her answer to "why so much?"

## The brief

Mara is leaving her $90,000 in-house design job to freelance. She's about to tell her first prospective client $45/hour, "because that's what I make now." Her plan sketch: she wants to match her old income, expects to take about 6 weeks off across the year (vacation, sick, conferences), guesses overhead at "maybe $1,000 a month" once health insurance, software, accounting, and a coworking desk are counted, and — after some honest conversation — accepts that as a first-year freelancer with no pipeline, 60% of her working time being billable is optimistic-realistic, not pessimistic. Her jurisdiction adds roughly 8% in self-employment tax burden over employment (flagged: verify with her accountant).

## The output

### Freelance Rate: Mara — design practice, year one

**The Derivation** (script: `python3 scripts/freelance_rate.py --target 90000`)

```
required revenue: 109,200  (target 90,000 + 8% tax premium + 12,000 overhead)
billable hours:   1,104  (46 weeks x 40h x 60% billable)
→ hourly: 99   day rate: 791
naive salary/2000 would say 45/h — the honest rate is 2.2x that
```

**Quoted cleanly: $100/hour, $800/day.** (Rounded up from the derivation — a rate you can discount from beats a rate you must survive on.)

**The Client-Safe Justification:** "My day rate is $800. That covers the full cost of a senior designer — the equivalent of a $90k salaried hire once benefits, employment taxes, tools, and the fact that you only pay me for productive days are counted. You're not paying more than an employee costs; you're paying only for the days you need one." — No apology in it, because there's nothing to apologize for: 1.5–2.5× salary-equivalent hourly is what the contract market *is*, for exactly these mechanical reasons.

**Sensitivity — utilization is the input to watch:**
| Billable % | Hourly needed |
|---|---|
| 50% (slow pipeline year) | $119 |
| 60% (the plan) | $99 |
| 70% (mature practice) | $85 |

If Mara books solid months early, the temptation will be to read 70%+ utilization as permanent and cut the rate; the honest read is that year-one billable percentage is a yearly average with dry spells still ahead.

*Educational model, not financial or tax advice — verify the tax premium and business setup with a licensed professional.*

## Why it's shaped this way

- **The derivation runs backwards from the life the rate must fund** — target income → required revenue → honest hours → rate. The $45 she nearly quoted came from the forward direction ("what do I make now?"), which silently deletes the employer's invisible spend and the unbillable half of freelancing.
- **The 60% billable assumption did the heavy lifting and got defended, not assumed** — sales calls, proposals, invoicing, and gaps between clients are the framework's named utilization eaters; 1,104 billable hours instead of 2,000 is where the 2.2× multiplier actually comes from, and the artifact shows that arithmetic so the number arrives pre-justified.
- **The rate rounds up, per the framework** — anchoring at $99 invites $90; anchoring at $100 with room to trade scope preserves the floor. Discounting later is easy; raising an anchored rate with an existing client is nearly impossible.
- **The justification paragraph contains zero apology** — the quality checks require it, because a rate delivered with "...but I'm flexible" is a different, lower rate. The employee-cost comparison is the persuasion: it reframes the multiplier as parity, which it is.
- **The sensitivity table isolates utilization, not overhead** — a $2k overhead error moves the rate by ~$2/hour; a 10-point utilization error moves it by ~$15–20. The table teaches which assumption deserves her attention all year.
- **The tax premium stays flagged** — 8% is a placeholder the skill explicitly refuses to assert as her number; the accountant line item in her overhead exists partly to answer exactly this.
