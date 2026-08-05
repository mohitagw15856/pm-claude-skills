---
aliases: ["Flight-Delay Compensation"]
tags: [pm-skills, skill]
skill: flight-delay-compensation
description: "Work out whether a delayed, cancelled, or overbooked flight likely owes you compensation — and draft the claim with the right rule cited. Use when asked about flight delay compensation, my flight was cancelled/delayed/overbooked, am I owed money for this flight, or how do I claim EU261. Produces an eligibility read against the likely-applicable regime (EU261/UK261/US DOT-style and airline duty-of-care), the amount band, the claim letter with flight details, and the evidence to attach — flagging what to verify because rules and thresholds change."
---

# Flight-Delay Compensation

Airlines rarely volunteer that you're owed money — but for long delays, cancellations, and bumpings, passenger-rights rules often require cash compensation *on top of* a refund or rebooking. The catch is the fine print: which regime applies (where you flew from/to and the airline's home), the delay thresholds, and the "extraordinary circumstances" get-out. This reads your situation, gives a likely-eligible verdict and amount band, and writes the claim — while being honest that thresholds change and must be verified.

## What This Skill Produces

- **The eligibility read** — which regime likely applies (EU261 / UK261 / US DOT-style / other), and whether your delay, cancellation, or denied boarding probably qualifies
- **The amount band** — the rough compensation range for your distance/delay, plus refund vs rebooking rights, and duty-of-care (meals/hotel) for long waits
- **The claim letter** — flight number, date, route, scheduled vs actual times, the specific rule cited, and the amount requested
- **The evidence & the escalation** — boarding pass, booking, delay proof, the airline's stated reason — then the ADR/regulator/claims route if they refuse
- **The verify list** — thresholds, sums, and "extraordinary circumstances" that change and must be checked against the current official rules

## Required Inputs

Ask for these if not provided:
- **The flight** — airline, flight number, date, full route (from → to), and any connections
- **What happened** — delayed (how many hours at final destination), cancelled (how much notice), denied boarding/overbooked, or missed connection
- **The times** — scheduled vs actual departure/arrival
- **The reason given** — weather, technical, staffing, strike, "operational"
- **Where you are based / flying from** — this drives which regime applies

## Framework: From "Owed?" to Claim

1. **Pin the regime.** Compensation rights hinge on departure/arrival country and the airline's base — establish which rule set likely governs before anything else.
2. **Measure at the *final destination*.** Delay compensation usually keys off arrival delay, not departure — and connections count end-to-end.
3. **Separate the entitlements.** Refund/rebooking, duty-of-care (food, phone, hotel for overnight), and cash compensation are *different* rights — you can be owed more than one.
4. **Test the get-out.** "Extraordinary circumstances" (severe weather, air-traffic control, security) can waive cash compensation; technical faults and staffing usually don't. Match their stated reason against this.
5. **Cite the rule, request the sum, keep it factual.** A letter that names the regime, the threshold you meet, and the amount is far harder to fob off — and flag anything you couldn't verify as "to confirm against current rules."

## Output Format

### Flight [number] · [date] · [from → to] · [delayed/cancelled/bumped]

**Likely regime:** [EU261 / UK261 / DOT-style / other] · **Cash compensation likely?** [yes / borderline / probably not] — because [threshold + reason test].

**You may be owed**
- Cash compensation: ~[band] (verify current sum)
- Plus: [refund or rebooking] · [duty-of-care if long wait]

**Claim letter**
> [Flight, date, route, scheduled vs actual times, what happened, the rule cited, the amount requested, "evidence attached"]

**Attach:** boarding pass · booking confirmation · proof of delay/cancellation · the reason the airline gave

**If refused:** [supervisor / airline complaints → ADR or the relevant aviation regulator → small claims or a claims service]

**Verify against current rules:** exact thresholds, compensation sums, and whether their stated reason counts as "extraordinary."

## Quality Checks
- [ ] Identifies which regime likely applies from the route and airline
- [ ] Measures delay at the final destination, not departure
- [ ] Separates refund/rebooking, duty-of-care, and cash compensation
- [ ] Tests the airline's stated reason against the "extraordinary circumstances" carve-out
- [ ] Amounts and thresholds are given as bands and flagged "verify current rules"
- [ ] The claim letter includes flight details, the rule, and a specific amount
- [ ] An escalation path (ADR/regulator/claims) is included

## Anti-Patterns
- **Asserting an exact payout** as fixed — sums and thresholds change; give a band and say verify.
- **Confusing a refund with compensation** — they're separate rights.
- **Measuring departure delay** when the rule keys off arrival.
- **Accepting "weather/operational" at face value** without testing whether it truly waives compensation.
- **Vague "your flight was late, pay me"** with no flight number, times, or rule cited.

## Example Trigger Phrases
- "My flight from Paris landed 4 hours late — am I owed EU261 compensation?"
- "Airline cancelled my flight with one day's notice. What can I claim?"
- "I got bumped off an overbooked flight — write me the claim."
- "Missed my connection because the first leg was delayed. Am I entitled to anything?"
- "They blamed 'operational reasons' for a 5-hour delay — does that count?"

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
