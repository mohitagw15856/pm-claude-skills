# Example: auto-repair-estimate-decoder

## What this skill does

Decodes a repair estimate line by line: what each item actually is, what happens if you defer it, urgency and severity per line, ranked red flags with the question that resolves each, and an authorisation plan.

## How to trigger it

### Example 1: "do I really need all this?"

**You say:**
> "Decode this estimate; I came in for a squealing belt. 2017 Honda CR-V, 78k miles. Quote: serpentine belt $189, brake fluid flush $129, coolant flush $149, 'front end work' $480, cabin + engine air filters $96, rear brake pads and rotors $589. Total $1,632."

**Claude produces (excerpt):**

### Repair Estimate Decode: 2017 CR-V, [shop], [date]

**1. The verdict:** $1,632 quoted; the defensible-now subset is the $189 belt you came in for, pending measurements on one more line. Everything else needs a number or an explanation before it earns authorisation.

**2. Line-by-line decode**

| Line | What it actually is | If you defer it | Urgency | Severity |
|---|---|---|---|---|
| Serpentine belt $189 | your presenting symptom | belt failure strands the car | do now | 🟢 |
| Rear pads + rotors $589 | wear item, plausible at 78k | depends entirely on measured pad thickness | get the number | 🟡 |
| "Front end work" $480 | not a repair; a category with a price | unknowable; it names no part | challenge | 🔴 |
| Brake fluid flush $129 | real maintenance on a 3-year cycle | fine if done in the last 3 years; check records | defer/verify | 🟡 |
| Coolant flush $149 | CR-V schedule is ~10yr/120k first change | years early | decline | 🔴 |
| Filters $96 | $25 of parts, 5 minutes of access | none; DIY-able | decline/DIY | 🟡 |

**3. 🚩 Red flags, ranked:** "front end work $480" is a specific price on a vague noun, the classic fishing line; the resolving question is "which component, what measurement, and can you show me?". The coolant flush contradicts the maker's own schedule; ask what reading justified it.

**4. Questions for the shop:** measured rear pad thickness in mm? Which front-end component and its play/wear spec? Is the diagnostic fee credited if I authorise? Can I see the old belt?

**5. The authorization plan:** authorise the belt; rotors/pads only on a pad reading ≤3mm (and ask whether resurfacing beats replacing); decline the coolant flush and filters; "front end work" gets named or gets a second opinion. Declining maintenance is a scheduling decision, not a moral failing.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

### Example 2: the fair quote, confirmed

**You say:**
> "Different shop, same car: belt $175 parts+labour itemised, rear pads $240 with '3mm measured, rotors within spec, resurface not needed'. That's it. Catch?"

**Claude produces (excerpt):**

**No catch visible; this is what a good estimate looks like:** the lines match the symptom and mileage, parts and labour are itemised, the pad recommendation arrives with its measurement, and the shop chose the cheaper resurface-not-needed honesty over a rotor upsell. Authorise both. Worth keeping this shop; estimates like this are the baseline the first shop's quote should be judged against.

*This is a plain-language reading, not legal/financial advice; laws vary by jurisdiction; confirm anything load-bearing with a qualified professional.*

## Tips for best results

- Give the symptom you came in with; unrelated additions are only visible against it.
- Include the car's mileage; wear items are plausible or premature only relative to it.
- Ask for measurements, not opinions; "brakes at 4mm" is information, "brakes soon" is a mood.

## Related skills

- `car-lease-decoder` for the dealership's finance paperwork rather than the service bay's
- `claim-denial-decoder` when the repair becomes an insurance argument
