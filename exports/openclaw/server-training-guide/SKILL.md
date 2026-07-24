---
name: server-training-guide
description: "Build an onboarding and training guide for restaurant front-of-house staff (servers, hosts, bartenders). Use when asked to train a new server, create FOH onboarding, write service standards, or build a restaurant training program. Produces a phased training plan (shadow → hands-on → solo with support), the service-sequence standards, menu and allergen knowledge checks, POS and side-work basics, and a sign-off checklist that says when someone's ready to work a section alone."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/server-training-guide.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Server Training Guide Skill

Most restaurants "train" by throwing a new hire on the floor with a tray and hoping. The result is inconsistent service and quick turnover. This skill builds a real ramp: a new server learns the steps of service, the menu, and the systems in a sequence, with a clear bar for when they're ready to run a section solo.

## Working from a brief

Given the restaurant type, **produce the full guide** — infer the service style (fine dining, casual, fast-casual, bar) and scale the depth and standards to it.

## Required Inputs

Ask for (if not provided, else infer and label):
- **Restaurant type / service style** and the **role** (server, host, bartender, busser)
- **Menu complexity** and any signature service points (tableside, wine program, allergen protocol)
- **Systems** — POS, reservation/waitlist, payment, and how long the ramp should be (e.g. 3–5 shifts)

## Output Format

### Training phases
A staged ramp with what happens and who owns it:
1. **Orientation** — culture, standards, safety, sanitation basics.
2. **Shadow** — follow a trainer, observe the full service sequence.
3. **Hands-on with a trainer** — take tables with support.
4. **Solo with a safety net** — own a small section, trainer on call.
5. **Sign-off** — cleared for a full section.

### Service-sequence standards
The steps of service for this restaurant (greet time, drink/order timing, check-backs, pre-bussing, the close), with the specific standards (e.g. "greet within 2 minutes").

### Knowledge checks
Menu and allergen quiz points, upsell/pairing basics, and the "86 / substitution / allergy" protocol every server must know cold.

### Systems & side-work
POS order flow, payment and comps/voids policy, opening/closing side-work, and section/station setup.

### Sign-off checklist
The observable competencies a trainer checks before solo — greeting, order accuracy, timing, allergen handling, POS, closing.

## Quality Checks

- [ ] Training is phased (shadow → supported → solo), not sink-or-swim
- [ ] Service-sequence standards are specific and observable (times, steps)
- [ ] Allergen and 86/substitution protocol is explicitly trained and checked
- [ ] A sign-off checklist defines "ready for a section alone"
- [ ] Depth matches the service style (fine dining ≠ fast-casual)

## Anti-Patterns

- Day-one solo with no shadow or support
- Service "standards" too vague to observe or coach
- Skipping the allergen/86 protocol (a safety and liability gap)
- No defined bar for readiness — trainers guessing
- A binder no one uses instead of hands-on, checked practice
