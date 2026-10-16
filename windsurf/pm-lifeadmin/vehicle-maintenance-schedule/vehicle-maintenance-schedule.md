---
trigger: model_decision
description: "Build a maintenance schedule for your car so it stays reliable and holds value — the service intervals, the DIY-vs-shop split, and the checks that prevent breakdowns and rip-offs. Use when asked for a car maintenance schedule, what maintenance does my car need, how to keep my car running, or am I being upsold at the mechanic. Produces an interval-based schedule keyed to your vehicle and driving, the essential do-not-skip items, DIY vs professional, seasonal checks, and how to spot unnecessary upsells — flagging that your owner's manual is the authority."
---

# Vehicle-Maintenance Schedule

Cars die young and drain money from neglect (a skipped oil change, a worn belt) or from over-servicing pushed by shops. This builds a sensible schedule from your vehicle and how you actually drive, separates the genuinely essential from the upsell, and tells you what you can do yourself — so your car stays reliable and you stop overpaying, with the owner's manual as the real authority.

## What This Skill Produces

- **An interval-based schedule** — services by mileage/time, keyed to your vehicle and driving conditions
- **The do-not-skip essentials** — oil/filters, brakes, tires, fluids, belts, and safety items where neglect gets expensive or dangerous
- **DIY vs. shop** — what's reasonable to do yourself and what needs a professional
- **Seasonal & condition checks** — winter/summer prep and "severe driving" adjustments
- **Upsell defense** — how to tell a genuine need from a padded recommendation, and questions to ask the mechanic
- **A manual-is-authority note** — the owner's manual intervals govern; this is a guide

## Required Inputs

Ask for these if not provided:
- **The vehicle** — make/model/year, mileage, and engine type (incl. EV/hybrid)
- **Driving conditions** — mileage/year, short trips vs. highway, towing, climate ("severe" vs "normal")
- **History** — what's been done recently, any known issues
- **DIY comfort** — how much you'll do yourself
- **Goal** — reliability, resale value, cost control, or all

## Framework: Intervals By Manual, Essentials First, Upsells Out

1. **Anchor to the manual and driving type.** The owner's manual intervals are the base; adjust for "severe" conditions (short trips, extreme climate, towing) which shorten some intervals.
2. **Prioritize the safety/expensive essentials.** Oil and filters, brakes, tires (pressure, tread, rotation), fluids, and belts/timing components are where neglect causes breakdowns or danger — never skip these.
3. **Split DIY and shop.** Empower simple tasks (fluids checks, air filter, wipers, tire pressure) and flag jobs for a professional (timing belt, brakes, transmission service).
4. **Add seasonal checks.** Battery/coolant/tires for winter, cooling system for summer — timed before the season.
5. **Defend against upsells.** Distinguish manual-scheduled work from "while we're in there" padding; give questions to ask and what to be wary of (unnecessary flushes, premature replacements).
6. **Defer to the manual.** Present it as a schedule to confirm against the specific vehicle's manual.

## Output Format

### Maintenance schedule: [vehicle/mileage] · driving: [normal/severe]

**By interval**
| Interval | Service | DIY or shop |
|---|---|---|
| [e.g. every X mi/months] | [oil/filter · tire rotation · …] | |

**Do not skip:** [oil · brakes · tires · fluids · belts/timing].
**Seasonal:** [winter prep · summer cooling].
**Upsell defense:** [manual-scheduled vs "while we're in there"] · ask "[is this in my service schedule / can I see the worn part]".

> Your owner's manual intervals are the authority — confirm this against it for your specific vehicle.

## Quality Checks
- [ ] Schedule is interval-based and keyed to the vehicle and driving type
- [ ] Adjusts for "severe" driving conditions
- [ ] Highlights the safety/expensive do-not-skip items
- [ ] Splits DIY from professional jobs
- [ ] Includes seasonal checks
- [ ] Gives upsell-defense guidance and defers to the manual

## Anti-Patterns
- **A generic schedule** ignoring the specific vehicle and driving.
- **Missing "severe" condition** interval adjustments.
- **Encouraging DIY** on safety-critical jobs beyond skill.
- **No upsell defense** — accepting every shop recommendation.
- **Overriding the owner's manual** intervals.

## Example Trigger Phrases
- "Make me a maintenance schedule for my car."
- "What maintenance does my 2018 sedan need at 60,000 miles?"
- "Which car jobs can I do myself vs. take to a shop?"
- "The mechanic recommended a bunch of services — am I being upsold?"
- "How do I keep my car reliable and holding its value?"
