---
name: "Plan for an extended power outage — keeping medically-essent"
description: "Plan for an extended power outage — keeping medically-essential devices running, food safe, the home warm or cool enough, and communication alive — before the lights go out, with the special focus on power-dependent medical needs. Use when someone says 'prepare for a power outage', 'what if the power goes out for days', 'blackout plan', or 'I rely on a medical device that needs electricity'. Produces an outage plan tiered by duration, a medical-power priority plan, food/heat/cool/comms guidance, and safety warnings. Not medical advice; medical-device continuity routes to clinicians/utilities."
---

# Power Outage Plan Skill

An extended outage is one of the most common and underestimated emergencies — and one
of the most dangerous for a specific group: anyone who depends on electricity for a
medical device (oxygen concentrator, CPAP, dialysis, refrigerated medication, powered
mobility). For them a blackout isn't an inconvenience, it's a medical emergency, and the
plan must center on it. For everyone, the hazards are quiet: food spoilage, carbon-
monoxide poisoning from improvised heat/generators, hypothermia or heatstroke, and being
cut off. This skill builds the plan before the lights go out, tiered by how long the
outage lasts, with the safety warnings that prevent the outage's *secondary* deaths.

## What This Skill Produces

- A **duration-tiered plan**: what to do for a few hours vs overnight vs multi-day —
  because the response and the risks escalate with time
- A **medical-power priority plan** (first, for anyone who needs it): battery backup, the
  utility's medical/priority register, backup power options, and the threshold at which
  you relocate to power/a hospital — worked out *with clinicians and the utility* in advance
- **Food, heat/cool, and comms guidance**: keeping food safe (and when to throw it out),
  staying warm or cool safely, and keeping phones and information alive
- **The safety warnings that save lives**: carbon-monoxide (never run generators/grills/
  camp stoves indoors), improvised-heat fire risk, and food-safety thresholds — the
  secondary hazards that kill more than the outage itself

## Required Inputs

Ask for (if not already provided):
- Anyone in the home dependent on power for a medical device or refrigerated medication —
  this reshapes the whole plan
- The likely outage causes and durations for the area (storms, grid strain, wildfire
  shutoffs — pair with [[hazard-risk-map]])
- The home: heating/cooling type (does it need electricity?), cooking, water (well pumps
  fail without power), and vulnerable household members
- Existing backup (generator, battery, none) and budget/space for more

## Framework

1. **Medical power first — it's the emergency inside the emergency.** For any power-
   dependent device or refrigerated medication: how long its battery lasts, backup power
   (device batteries, a suitable power station — sized with the device specs), enrolling
   on the utility's medical/priority-reconnection register, and the pre-decided threshold
   to relocate to reliable power or a hospital. This is worked out with the clinician and
   utility *now*, not improvised in the dark. The skill organizes it and routes the
   medical specifics to them.
2. **Tier the plan by duration.** Hours: fridge stays cold if unopened, use battery light,
   sit tight. Overnight: heat/cool safely, meds and food managed, phones conserved.
   Multi-day: food-safety decisions, water if pumps fail, warmth/cooling as the priority,
   and the relocate-or-stay call. Each tier has different actions and different dangers.
3. **Warn hard about carbon monoxide and fire — the secondary killers.** Generators, grills,
   and camp stoves indoors or in attached garages kill via CO every outage; never run them
   inside, and have a battery CO alarm. Improvised heating (ovens, unvented heaters) causes
   fires and CO. These warnings are not optional garnish — they're the point.
4. **Keep food, warmth/cool, and comms.** Food: keep fridge/freezer closed, know the safe-
   duration thresholds and the "when in doubt throw it out" rule. Temperature: layer for
   cold, hydrate and find cooling for heat, protect the vulnerable (heat and cold kill the
   elderly fast). Comms: charged power banks, a battery/wind-up radio for information,
   knowing that mobile networks can also fail (see [[family-emergency-plan]] for the
   reconnect plan).
5. **Prepare, then know the abandon threshold.** Stock the outage kit (lights, power banks,
   CO alarm, water, non-cook food, warmth), and set the clear line at which staying becomes
   unsafe — no heat in dangerous cold, no medical power, no water — and where you'd go.
   Deciding that threshold in advance prevents the fatal "we'll just wait a bit longer."

## Output Format

```
## Medical power (if anyone depends on it — do this first)
[Device battery life · backup power sized to specs · utility medical/priority register ·
the relocate-to-power/hospital threshold — worked out with clinician + utility now]

## The plan by duration
Hours: … · Overnight: … · Multi-day: …  [actions + the escalating risks]

## ⚠ The safety warnings that save lives
[CO: never run generators/grills/stoves indoors; battery CO alarm · improvised-heat fire
risk · food-safety thresholds]

## Food, warmth/cool, comms
[Food-safe durations & throw-out rule · staying warm/cool safely, protect the vulnerable ·
power banks + battery radio · networks can fail]

## Abandon threshold
[The clear line where staying is unsafe, and where you'd go]

⚠ Not medical advice. Medical-device continuity must be planned with your clinician and
utility. Follow official guidance in a real outage.
```

## Quality Checks

- [ ] Medical-power dependency is handled first and routed to clinician + utility, with a
      relocate threshold
- [ ] The plan is tiered by outage duration with escalating actions and risks
- [ ] The carbon-monoxide and improvised-heat warnings are prominent and unambiguous
- [ ] Food-safety thresholds and vulnerable-person heat/cold protection are covered
- [ ] A clear abandon threshold and destination are set in advance

## Anti-Patterns

- [ ] Do not bury or soften the CO warning — indoor generators/grills/stoves kill every
      outage; this is the highest-stakes line in the skill
- [ ] Do not give medical advice or size medical backup power without the device specs and
      clinician — route it
- [ ] Do not treat all outages as equal — duration changes everything
- [ ] Do not ignore the vulnerable (elderly, infants, power-dependent) — they're who
      outages actually harm
- [ ] Do not omit the abandon threshold — "waiting it out" past safety is how people die at
      home in cold/heat

## Related

[[hazard-risk-map]] to know your outage likelihood; [[go-bag-builder]] and
[[emergency-doc-kit]] for the kit; [[family-emergency-plan]] for reconnecting when
networks fail; [[after-the-disaster]] for the aftermath.
