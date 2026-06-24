# Salary Negotiation Skill

Most people leave money on the table because they negotiate from anxiety instead of preparation. This
skill replaces nerves with a plan: compare offers on **total comp** (not just base), set a target and a
walk-away anchored to your BATNA, justify the ask with your value, and script the counter — including the
levers beyond base salary that are often easier wins.

## Required Inputs

Ask for these only if they aren't already provided:

- **The offer(s)** — base, bonus, equity, sign-on, and any other components (and competing offers, if any).
- **Your situation** — current comp, your BATNA (best alternative — a competing offer, staying put), and how badly each side needs the other.
- **Market data** — comparable ranges for the role/level/location (levels.fyi, Glassdoor, peers), if you have it.
- **What matters to you** — cash now vs. equity upside, flexibility, title, start date.

## Output Format

### Negotiation Plan: [role] at [company]

**1. Total-comp comparison** — never compare base-to-base. Lay out total annual comp across the offer(s) and your current/alternative (use the helper script). Equity and bonus often flip the ranking.

**2. Your numbers** — **target** (ambitious but justifiable), **walk-away** (below which you decline), and **anchor** (open slightly above target). All three anchored to market + your BATNA.

**3. Leverage read** — how much you have (competing offer? scarce skills? they've invested in the process?) and how to use it without bluffing.

**4. The justification** — the value-based case for the ask: your evidence (impact, comparable comp, the competing offer), framed collaboratively ("I'm excited; to make this work…").

**5. Counter scripts** — exact wording for: countering the base, responding to "that's our max", and the **non-base levers** (sign-on, equity, title/level, start date, remote, review timing) that often move when base can't.

**6. The walk-away plan** — what you do if they won't meet the walk-away (and why having decided this in advance is your real power).

## Programmatic Helper

`scripts/comp_compare.py` (stdlib only) computes total annual comp across offers so you compare apples to apples (equity amortised, sign-on annualised):

```bash
# offers.json: [{"name":"Offer A","base":160000,"bonus":24000,"equity_total":200000,"equity_years":4,"signing":20000}, ...]
python3 scripts/comp_compare.py offers.json
python3 scripts/comp_compare.py offers.json --signing-years 1 --json
```

## Quality Checks

- [ ] Offers are compared on **total comp**, not base alone (equity + bonus + sign-on included)
- [ ] A target, a walk-away, and an anchor are all set — and tied to market + BATNA
- [ ] The justification is value-based and evidenced, not "I need more"
- [ ] Non-base levers are included (sign-on, equity, title, start date, remote)
- [ ] The walk-away decision is made *before* the conversation

## Anti-Patterns

- [ ] Do not compare base to base — total comp is the real number, and equity/bonus often change which offer wins
- [ ] Do not negotiate without a walk-away decided in advance — it's the source of your leverage
- [ ] Do not bluff a competing offer you don't have — if it's called, you lose all credibility
- [ ] Do not anchor low or accept the first number — the first offer almost always has room
- [ ] Do not fixate only on base — sign-on, equity, level, and start date often move when base is capped

## Based On

Principled-negotiation practice (*Getting to Yes* — Fisher & Ury: BATNA, interests over positions) applied to compensation.
