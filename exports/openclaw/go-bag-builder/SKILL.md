---
name: go-bag-builder
description: "Build an emergency go-bag tailored to your actual household and your most likely local hazards — not a generic list — covering the people, pets, medications, documents, and hazard-specific items you'd need to grab and leave in minutes. Use when someone says 'build an emergency kit', 'what goes in a go-bag', 'prepare for evacuation', or 'emergency preparedness for my family'. Produces a personalised packing list, a grab-in-2-minutes core, storage and maintenance guidance, and per-person/per-pet additions. Points to official preparedness sources for your region."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/go-bag-builder.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Go-Bag Builder Skill

A go-bag is the difference between grabbing one packed bag and leaving in two minutes,
versus running around gathering meds and documents while the situation worsens. Generic
"72-hour kit" lists fail real households because they ignore the specifics that matter
most — the baby's formula, the insulin that needs cool storage, the pet, the passport,
the mobility aid — which are exactly the things you can't improvise in a hurry. This
skill builds *your* go-bag: tailored to who's in your household and the hazards you
actually face, with a grab-in-two-minutes core, and maintenance so it's not expired when
you need it. It complements official preparedness guidance for your region, which it
points to.

## What This Skill Produces

- A **personalised packing list**: the standard essentials PLUS the household-specific
  items — per-person medications and copies of prescriptions, baby/child needs, pet
  supplies, mobility/medical equipment, and the hazard-specific additions for your area
- The **grab-in-2-minutes core**: the subset that must leave with you no matter what
  (meds, documents, phone/chargers, cash, keys, glasses) — so an evacuation isn't a
  scavenger hunt
- **Storage and maintenance guidance**: where to keep it, how to store meds/water/
  batteries that expire, and a rotation reminder so the kit stays current
- **Per-person and per-pet appendices**: individual needs so nobody's essentials are
  forgotten, including for family members who can't advocate for themselves

## Required Inputs

Ask for (if not already provided):
- Who's in the household: adults, children (and ages), infants, elderly, anyone with
  medical/mobility needs, pets
- Where you live and the likely local hazards (or pair with [[hazard-risk-map]] to find
  them) — flood, wildfire, quake, hurricane, extended outage, etc.
- Critical dependencies: prescription meds (and refrigeration needs), medical equipment,
  formula, service animals
- Constraints: budget, storage space, whether some people would evacuate separately

## Framework

1. **Start from the household, not a template.** Enumerate every person and pet and their
   non-negotiables — the medications, the equipment, the formula, the comfort item for a
   scared child. These are the items that can't be bought en route and that generic lists
   miss; they're the reason to build a *personal* bag.
2. **Layer in the hazard-specific gear.** A wildfire bag (masks, goggles), a flood bag
   (waterproofing, water above all), a cold-climate bag (warmth), an earthquake bag
   (sturdy shoes, gloves) differ. Add the items your likely hazards demand rather than
   packing for disasters you'll never face.
3. **Define the grab-in-2-minutes core.** Not everything is equally urgent. The core —
   meds, the [[emergency-doc-kit]], phone + charger/battery, cash, keys, glasses,
   whistle, a day of water — must be grabbable in one motion. Everything else is the
   fuller bag. Two tiers, clearly marked.
4. **Solve the expiry problem.** The reason go-bags fail: expired meds, dead batteries,
   stale water, outdated documents. Store what expires so it rotates (a note on the
   calendar, meds you cycle through), and put a maintenance date on the bag. A go-bag is
   a habit, not a one-time purchase.
5. **Plan the people who can't pack themselves.** Infants, elderly relatives, anyone with
   a disability, and pets each get an appendix so their essentials — and copies of their
   medical/care info — are in the bag. Also: where the bag lives so anyone in the
   household can grab it, and a smaller version for the car/work if relevant.

## Output Format

```
## Grab-in-2-minutes core (must leave with you)
[Meds · documents kit · phone+power · cash · keys · glasses · water — one grab]

## The full go-bag (personalised)
Standard essentials: … · Your household additions: … · Hazard-specific for your area: …

## Per person / per pet
[Each individual's non-negotiables + copies of their medical/care info]

## Storage & maintenance
[Where it lives (anyone can grab it) · rotate the expiring items · the maintenance date ·
car/work mini-version if relevant]

⚠ Pair with your region's official preparedness guidance (emergency agency / red-cross-
type body) — hazards and advice are local.
```

## Quality Checks

- [ ] The list is built from the actual household (people, ages, medical needs, pets),
      not a generic template
- [ ] Hazard-specific items match the user's likely local hazards
- [ ] A clearly-marked grab-in-2-minutes core exists
- [ ] The expiry/maintenance problem is solved with rotation and a maintenance date
- [ ] Everyone who can't pack for themselves (infants, elderly, disabled, pets) has their
      essentials covered

## Anti-Patterns

- [ ] Do not hand over a generic 72-hour list — the personalisation is the entire value
- [ ] Do not pack for hazards the area doesn't face while missing the ones it does
- [ ] Do not ignore the expiry problem — an out-of-date kit is a false sense of security
- [ ] Do not forget medications, medical equipment, and the vulnerable household members —
      these are the true non-negotiables
- [ ] Do not present this as a substitute for official emergency guidance or evacuation
      orders — always follow the authorities in a real event

## Related

[[hazard-risk-map]] to find your real hazards first; [[emergency-doc-kit]] is the
documents core; [[power-outage-plan]] and [[after-the-disaster]] for during and after;
[[family-emergency-plan]] for the household plan around it.
