# Worked Example — Auto Repair Estimate Decoder

A gold-standard run of this skill: a $2,340 estimate for a car that came in with a squeal, triaged into $700 of now, $800 of soon-with-evidence, and $840 of somebody-else's-Tuesday.

## The brief

Jae's 2017 hatchback (78,000 miles) went in for a **squealing noise when braking**. The estimate came back at $2,340: front brake pads and rotors $680 · rear brake pads and rotors $620 · brake fluid flush $140 · coolant flush $160 · transmission fluid service $240 · cabin + engine air filters $120 · "fuel induction service" $180 · front wiper blades $38 · shop supplies fee $62 · plus a note: "tech recommends addressing all items for safety." Jae plans to keep the car another 4–5 years, has no shop history here, and asks "do I really need all of this today?"

## The output

### Repair Estimate Decode: 2017 hatchback, 78k mi — [shop]

**1. The verdict** — About **$700 of this addresses the squeal you came in for** (front brakes, arguably the fluid); the rest is a maintenance menu attached to your brake job — some of it plausibly due at 78k, none of it urgent today, and two lines are classic padding. The right move is authorize-with-measurements, not authorize-all or storm out.

**2. Line-by-line decode**

| Line | What it actually is | If you defer it | Urgency | Severity |
|---|---|---|---|---|
| Front pads + rotors $680 | The presenting symptom — squeal = wear indicators, likely | Metal-on-metal eventually; braking distance grows | **Safety-now** (pending measurement) | 🟢 with the measurement question |
| Rear pads + rotors $620 | Not the squeal's usual source; rears wear ~half as fast | If truly worn, months of margin; if at 5mm+, a year+ | Get the number | 🟡 |
| Brake fluid flush $140 | Legitimately paired with brake work at this age/mileage | Moisture degrades fluid over years | Soon | 🟢 |
| Coolant flush $160 · trans service $240 | Interval maintenance — check the *owner's manual*, not the menu | Nothing this month | Eventually — by the book | 🟡 |
| Air filters $120 | A 10-minute DIY at half the parts cost | Slightly worse airflow | Optional here | 🟡 |
| "Fuel induction service" $180 | The menu's classic — rarely tied to any symptom or interval | Nothing observable | Optional-upsell | 🔴 |
| Wipers $38 · "shop supplies" $62 | Convenience; and an unitemized fee | — | Optional / query | 🟡 |

**3. 🚩 Red flags, ranked** — (1) *"Address all items for safety"* — bundling wipers and induction service under "safety" flattens the triage; the estimate's flat tone is the pattern. (2) *Fuel induction service* — no symptom, no manual interval; ask what specifically it treats on this car. (3) *Rear brakes without a measurement* — maybe real at 78k, but "recommend" is a mood and "4mm" is a fact.

**4. Questions for the shop** — "What's the measured pad thickness, front and rear?" · "Can you show me the front rotors' condition?" · "Which of these are in the manufacturer's schedule for 78k, and which are shop recommendations?" · "What does the fuel induction service address on this specific car?" · "Is the shop-supplies fee itemizable?"

**5. The authorization plan** — Authorize now: front brakes + fluid (~$820). Get the measurement first: rear brakes (authorize if ≤3mm; schedule if 4–5mm; decline politely above). By-the-book: coolant/trans per the manual's intervals — check tonight, schedule what's actually due. Decline: induction service, filters (DIY), wipers. Declining maintenance is a scheduling decision, not a moral failing.

*"This is a plain-language reading, not legal/financial advice — laws vary by jurisdiction; confirm anything load-bearing with a qualified professional."*

## Why it's shaped this way

- **Every line got a deferral consequence** — the framework's load-bearing question is "what happens if I don't, today?" — and the honest answer for most of the menu was "nothing this month," which is the finding.
- **The symptom anchors the triage** — the squeal maps to front brakes; lines unconnected to it are flagged *for explanation*, not accused — per the anti-pattern, wear items exist and the triage is the value, not the cynicism.
- **Safety items stayed cleanly separated from upsell critique** — front brakes lead as safety-now even while the induction service gets its 🔴; blending those tones is how decodes lose shops' and users' trust simultaneously.
- **Measurements convert arguments into numbers** — "4mm" ends the rear-brake debate in either direction; the questions are designed so the shop's answers are checkable, per the quality checks.
- **The manual outranks the menu** — coolant and transmission intervals are the manufacturer's call, so the decode routes there instead of asserting regional price opinions; costs stay framed as verify-locally.
- **The authorization plan gives Jae three verbs** — authorize, measure-then-decide, decline — because the skill's endpoint is a decision per line, not a vibe about the shop.
