---
trigger: model_decision
description: "Figure out which disasters and emergencies your specific location actually faces — and the concrete prep each one demands — so your readiness targets real risks instead of generic ones. Use when someone says 'what disasters should I prepare for', 'am I in a flood/wildfire/quake zone', 'what emergencies are likely where I live', or 'where do I start with preparedness'. Produces a ranked local-hazard list, the specific prep each demands, warning-signal and alert setup, and where to verify official risk data for your area."
---

# Hazard Risk Map Skill

Emergency preparedness advice is usually generic, which is why most of it goes unused —
prepping for an earthquake in a flood plain, or for everything vaguely, is
demotivating and misdirected. The useful first step is narrow: *which* disasters does
*your* specific address realistically face, ranked, and what does each actually demand?
This skill builds that local hazard map — from your location, climate, and geography —
so everything downstream (the go-bag, the evacuation plan) targets real risk. It points
to the official hazard-mapping sources (flood maps, seismic zones, wildfire-risk data)
to verify, because real risk data exists and beats guessing.

## What This Skill Produces

- A **ranked local-hazard list**: the disasters your area realistically faces, ordered
  by likelihood × severity — flood, wildfire, earthquake, hurricane/cyclone, tornado,
  extreme heat/cold, extended power outage, industrial/chemical, etc.
- The **specific prep each demands**: what a flood needs (water, evacuation-readiness,
  document protection) differs from what a heatwave needs (cooling, hydration,
  vulnerable-person checks) — matched to your top hazards
- **Warning-signal and alert setup**: how each hazard announces itself, and the official
  alert systems to enrol in (emergency alerts, weather warnings) so you get notice
- **Where to verify**: the official hazard-mapping tools for your area (flood-risk maps,
  seismic maps, wildfire-risk layers) — real data to confirm the map against

## Required Inputs

Ask for (if not already provided):
- Precise location (country, region, and ideally the specific area — risk is
  address-level for flood/wildfire) and housing type (high-rise, ground floor, rural,
  coastal)
- Household vulnerabilities: elderly, infants, medical/mobility needs, pets, reliance on
  power for medical equipment (raises outage/heat risk)
- Local knowledge they already have (past events, neighborhood history)
- What's prompting this (a recent scare, a house move, general prudence)

## Framework

1. **Derive the candidate hazards from geography and climate.** Coastal → storm surge,
   hurricane/cyclone, flooding. River/low-lying → flood. Wildland interface → wildfire.
   Fault zones → earthquake. Hot climate → extreme heat. Grid-fragile areas → extended
   outage. Build the candidate list from the actual location, then rank by realistic
   likelihood × severity for *there*.
2. **Verify against official risk data — don't guess.** Flood maps, seismic-hazard maps,
   wildfire-risk layers, and historical event data exist for most places. Route the user
   to the official sources to confirm their address's real exposure, since perceived and
   actual risk often differ (people underestimate flood, overestimate the dramatic-but-
   rare).
3. **Translate each top hazard into concrete prep.** For the ranked hazards, the specific
   demands: flood → water, elevation of valuables, evacuation-ready, document protection;
   wildfire → defensible space, air quality/masks, early evacuation; earthquake → secure
   heavy items, drop-cover-hold, sturdy shoes; heatwave → cooling plan, hydration,
   checking on the vulnerable; outage → [[power-outage-plan]]. Prep follows the real map.
4. **Set up warning and alerts.** Each hazard has warning signs and official alert
   channels (emergency-alert enrolment, weather warnings, local sirens/apps). Getting
   notice is half of readiness; enrol now, and know what each warning means and the
   window it gives.
5. **Weight for household vulnerability.** The same hazard is more dangerous for some:
   heat and outage for the elderly and the power-dependent, evacuation for those with
   mobility needs. Adjust the ranking and prep for who's actually in the home — a
   power-dependent medical device turns "outage" from inconvenience to emergency.

## Output Format

```
## Your ranked local hazards
| Hazard | Likelihood × severity here | Why (your geography/climate) |
[verify each against official risk maps — links]

## What each top hazard demands
[Per top hazard: the specific, concrete prep it requires]

## Warnings & alerts (set these up now)
[Per hazard: the warning signs · the official alert system to enrol in · the notice window]

## Adjusted for your household
[Vulnerabilities that raise specific risks · the prep that follows]

⚠ Confirm your address's real exposure with official hazard-mapping sources, and follow
your local emergency authority's guidance and orders.
```

## Quality Checks

- [ ] Hazards are derived from the actual location/geography and ranked by realistic
      likelihood × severity, not a generic list
- [ ] The user is routed to official hazard-mapping data to verify their real exposure
- [ ] Each top hazard is translated into concrete, specific prep
- [ ] Official alert/warning enrolment is included
- [ ] Household vulnerabilities adjust the ranking and prep (power-dependent, elderly,
      mobility, pets)

## Anti-Patterns

- [ ] Do not give a generic all-hazards list — the local ranking is the value
- [ ] Do not assert an address's risk as fact — route to official flood/seismic/wildfire
      data to confirm
- [ ] Do not let the dramatic-but-rare crowd out the likely-but-mundane (flood and heat
      kill more than the cinematic disasters)
- [ ] Do not ignore vulnerability weighting — the same event is an emergency for some and
      an inconvenience for others
- [ ] Do not replace official warnings/orders — this plans; the authorities decide in the moment

## Related

[[go-bag-builder]] and [[family-emergency-plan]] build on this map; [[power-outage-plan]]
and [[after-the-disaster]] for specific scenarios; [[home-insurance|insurance-claim]]
neighbors for protecting against the risks found.
