---
trigger: model_decision
description: "Find out whether something you own — a car, appliance, car seat, food item, or gadget — is under a safety recall, and what to do about it. Use when asked to check for a recall, is my [product] recalled, I heard about a recall on, or how do I find out if my car/appliance is affected. Produces a structured way to check by make/model/batch against the official sources, how to read whether your specific unit is affected, the free remedy you're owed, urgency triage for safety risks, and how to register for future recall alerts — flagging that you must confirm against the current official database."
---

# Product-Recall Check

Recalls are the rare case where a company is legally required to fix or replace your thing for free — but only if you know it's recalled and act. Notices get missed: you bought secondhand, moved house, or never registered. This gives you a reliable way to check the right official sources by the details that matter (make, model, serial/VIN, batch, date), read whether *your* specific unit is in scope, and claim the free remedy — with honest urgency for anything that's a genuine safety risk.

## What This Skill Produces

- **The check plan** — which official source to search for this product type (vehicles, appliances/electronics, children's products, food/drugs, general consumer goods) and the exact details to search with
- **The "is mine affected?" read** — how to match your serial/VIN/model/batch against the recall's scope (recalls often cover only specific runs)
- **The remedy** — what you're owed (free repair, replacement, or refund) and how to claim it
- **Urgency triage** — stop-using-now vs schedule-a-fix vs monitor, based on the hazard
- **Future alerts** — how to register the product and subscribe to recall notifications so you're not relying on luck next time

## Required Inputs

Ask for these if not provided:
- **What it is** — product type, brand, model, and (if known) serial number / VIN / batch or lot code
- **How old / where from** — approximate purchase or manufacture date, new or secondhand
- **Why you're asking** — heard a rumor, saw a news story, or a proactive check
- **Your country/region** — recalls and databases are jurisdiction-specific
- **Any symptom** — is it already behaving dangerously (overheating, smoke, fault)?

## Framework: Check Right, Act Fast If Needed

1. **Go to the authoritative source, by product type.** Vehicles, children's products, appliances/electronics, and food/medicine each have their own official recall registers — search those, not just a web rumor.
2. **Search by the identifying detail.** VIN, serial, model, or batch/lot code — because recalls usually target *specific production runs*, not every unit ever made.
3. **Confirm your unit is in scope.** Match your exact identifiers to the recall's stated range before assuming you're affected — or safe.
4. **Triage the hazard honestly.** Fire, electrical, choking, brakes, or contamination = stop using it now and follow the notice's interim advice. Lower-risk = schedule the free fix.
5. **Claim the free remedy, and register for the future.** The remedy is free by law when a recall applies — get it done, then register the product and turn on recall alerts so you catch the next one automatically.

**Always confirm against the current official database** — recalls are added and updated constantly, and this can't stand in for the live source.

## Output Format

### Recall check: [product] · [brand/model] · [region]

**Where to check:** [the right official register for this product type] — search by [VIN / serial / model / batch].

**Is yours affected?** Match [your identifier] against the recall's stated range: [how to read it]. Recalls often cover only specific runs — confirm the exact numbers.

**If it IS recalled**
- Remedy owed: [free repair / replacement / refund]
- How to claim: [manufacturer/dealer/retailer step]
- **Urgency:** [🛑 stop using now / 🔧 schedule the fix / 👀 monitor] — because [hazard].

**Set up alerts:** register the product with the maker + subscribe to official recall notifications for [product type].

> Confirm everything against the current official recall database — this is a guide to checking, not a substitute for the live source.

## Quality Checks
- [ ] Points to the authoritative recall source for that specific product type
- [ ] Tells the user to search by serial/VIN/model/batch, not just brand
- [ ] Explains that recalls usually cover specific runs — confirm the unit is in scope
- [ ] Triages urgency by the actual hazard
- [ ] States the remedy is free and how to claim it
- [ ] Includes registering for future recall alerts
- [ ] Flags "verify against the current official database"

## Anti-Patterns
- **Declaring it recalled (or safe)** from the brand alone, without matching the unit's identifiers.
- **Trusting a news headline or forum** instead of the official register.
- **Underplaying a genuine safety hazard** to avoid alarm.
- **Assuming every unit is covered** when the recall names a specific batch.
- **Treating this as the live database** rather than a guide to checking it.

## Example Trigger Phrases
- "Is my car under any recall? Here's the make, model, and year."
- "I heard there's a recall on a baby stroller like mine — how do I check?"
- "My space heater is the brand in the news — is mine affected?"
- "How do I find out if a food product I bought was recalled?"
- "Bought a used appliance — how do I check it wasn't recalled?"
