---
name: after-the-disaster
description: "Work through the first hours and days after a disaster — a fire, flood, storm, or evacuation — in the right order: safety and people first, then documenting for insurance and aid, then the immediate recovery steps, without missing the things that cost money or health later. Use when someone says 'my house flooded/burned', 'what do I do after the disaster', 'we just evacuated, now what', or 'the storm damaged everything'. Produces a triaged action plan (safety → document → claim → recover), the do-not-miss list, and where to get help. Not legal advice; routes to emergency services and official aid."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/after-the-disaster.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# After The Disaster Skill

In the hours after a disaster, shock and urgency make people do things in the wrong order —
re-entering an unsafe building, throwing out damaged items before documenting them (and
losing the insurance claim), or missing the aid window. There *is* a right order: people
and safety first, then documentation, then claims and recovery — and knowing it turns a
chaotic, costly aftermath into a sequence you can follow. This skill triages the first
hours and days, front-loads the safety non-negotiables, and flags the do-not-miss steps
(the photos before cleanup, the claim deadline, the aid you're entitled to) that quietly
cost people the most later. It routes emergencies to services and claims/aid to the
official bodies.

## What This Skill Produces

- A **triaged action plan** in strict order: (1) safety & people, (2) document everything,
  (3) notify insurance & register for aid, (4) immediate recovery — because doing these out
  of order costs money and safety
- The **do-not-miss list**: the steps people skip in the chaos and regret — photograph
  damage *before* cleaning up, don't discard items until documented, hit the claim/aid
  deadlines, keep every receipt
- **Where to get help**: emergency services for danger, the insurer to start the claim,
  and official disaster-aid/relief programs to register for (which have windows)
- A **health & safety brief**: the hidden post-disaster hazards — contaminated flood water,
  structural instability, mold, carbon monoxide, downed lines — so recovery doesn't create
  the next injury

## Required Inputs

Ask for (if not already provided):
- What happened and the current situation — are people safe *now*, is the building safe,
  is anyone hurt or missing
- The type and rough extent of damage (flood, fire, wind, evacuation with home intact)
- Whether they have insurance and their [[emergency-doc-kit]] (policy numbers, contacts)
- Where they are (country/area) so official aid/relief routes can be pointed to

## Framework

1. **People and safety first — always.** Before anything: is everyone accounted for and
   uninjured? Injuries → medical help. Is the structure safe to be in (fire damage, flood,
   gas, downed power lines)? Do not re-enter an unsafe building for belongings — this is
   where post-disaster deaths and injuries happen. Contaminated flood water, CO, and
   structural collapse are the immediate killers; the skill leads here, firmly.
2. **Document before you touch anything.** The costly, universal mistake: cleaning up or
   discarding damaged property before photographing it, which cripples the insurance claim.
   Photograph and video *everything* — the damage, every damaged item, the waterline —
   before any cleanup, and keep damaged items until the insurer says otherwise. The
   [[emergency-doc-kit]]'s home inventory pairs with this.
3. **Notify insurance and register for aid — mind the windows.** Contact the insurer as
   soon as safe to start the claim (policy number from the doc kit), and register for
   official disaster relief/aid programs, which frequently have application deadlines and
   are missed in the fog. Keep every receipt from the moment of the disaster (emergency
   accommodation, supplies) — many are reimbursable.
4. **Immediate recovery, in safe order.** Prevent further damage where safe (tarp a roof,
   stop water) since insurers expect reasonable mitigation, but not at the cost of safety.
   Secure the property, sort temporary accommodation, and preserve the doc-kit records.
   Guard against post-disaster scams — fake contractors and charities target disaster
   victims ([[scam-message-decoder]]).
5. **Watch the delayed hazards and the human toll.** Mold after flooding, ongoing
   structural risk, contaminated water, and the CO risk from generators/pumps during
   recovery. And the emotional reality: disaster recovery is a marathon of stress and
   grief; name that support (disaster mental-health lines, community relief) is part of
   the plan, not weakness.

## Output Format

```
## FIRST: are people and the building safe?
[Everyone accounted for/uninjured? · is it safe to be in the building? · do NOT re-enter an
unsafe structure · the immediate hazards: flood water, gas, power lines, CO]

## Document before you touch anything
[Photograph/video ALL damage and every damaged item BEFORE cleanup · keep damaged items ·
the waterline/extent]

## Notify & register (mind the deadlines)
[Insurer — start the claim (policy # from your doc kit) · official disaster aid/relief —
register, note the window · keep every receipt from now]

## Immediate recovery (safe order)
[Prevent further damage where safe · secure property · temp accommodation · beware
disaster scammers]

## Delayed hazards & support
[Mold, structural, contaminated water, CO during recovery · disaster mental-health/
community support — part of the plan]

⚠ Emergencies → emergency services. This is not legal/insurance advice — route claims to
your insurer and aid to official relief programs, and follow the authorities.
```

## Quality Checks

- [ ] Safety and people are handled first, with a firm "do not re-enter an unsafe building"
- [ ] "Document before cleanup" is prominent — the costliest common mistake
- [ ] Insurance notification and official-aid registration are included with their deadline
      windows and the keep-receipts rule
- [ ] The delayed hazards (mold, structural, contaminated water, CO) are covered
- [ ] Emotional/mental-health support is named, and scams are flagged

## Anti-Patterns

- [ ] Do not put property before people — re-entering an unsafe structure for belongings is
      how the aftermath kills
- [ ] Do not let cleanup happen before documentation — it destroys the insurance claim
- [ ] Do not miss the aid/claim deadlines — they're real and easily lost in the shock
- [ ] Do not ignore the delayed hazards or the mental-health toll — recovery is where the
      second wave of harm lands
- [ ] Do not give legal/insurance determinations — route to the insurer, official aid, and
      professionals; watch for the scams that target victims

## Related

[[emergency-doc-kit]] supplies the records to start claims; [[insurance-claim]] and
[[claim-denial-decoder]] for the claim itself; [[scam-message-decoder]] for disaster
scams; [[grief-admin]] and [[stoic-setback-debrief]] for the human aftermath;
[[family-emergency-plan]] for reconnecting.
