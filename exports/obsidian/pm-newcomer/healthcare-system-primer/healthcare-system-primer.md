---
aliases: ["Healthcare System Primer"]
tags: [pm-skills, skill]
skill: healthcare-system-primer
description: "Understand and enrol in a new country's healthcare system — how it works (public/private/insurance-based), what you're entitled to with your status, how to register with a doctor, get insurance if required, and what to do before you're covered. Use when someone says 'how does healthcare work in [country]', 'register with a doctor abroad', 'do I need health insurance in [country]', or 'I just moved and need to see a doctor'. Produces a system explainer, an enrolment checklist, a coverage-gap plan, and cost expectations. Orients and routes to official sources; not medical or insurance advice."
---

# Healthcare System Primer Skill

Healthcare systems are one of the most disorienting things about a new country because
they work on completely different logics — tax-funded and universal, insurance-mandated,
employer-tied, or pay-as-you-go — and getting it wrong means either an unexpected bill or
being uncovered when you need care. Newcomers routinely don't register until they're sick,
then discover a waitlist, a missing insurance requirement, or that they weren't eligible
yet. This skill explains how *this* country's system works for someone with your status,
gets you enrolled properly, and covers the gap before you're in the system. It orients and
routes to official sources; it gives no medical or insurance-purchase advice.

## What This Skill Produces

- A **system explainer**: how this country's healthcare actually works (funding model,
  public vs private, what's free vs paid, GP-gatekeeping or direct access) and what your
  status entitles you to
- An **enrolment checklist**: the steps to get into the system — register with a doctor/
  GP, obtain a health card/number, buy mandatory insurance if required — in order, with
  the documents each needs
- A **coverage-gap plan**: what to do for healthcare *before* you're enrolled or during a
  waiting period (travel insurance, private options, emergency access — which is usually
  available regardless)
- **Cost and access expectations**: typical costs, waiting times, prescription systems,
  and how to actually get an appointment — the practical reality, not just the theory

## Required Inputs

Ask for (if not already provided):
- The country (and status/visa — it determines eligibility) and where they'll live
- Their situation: any ongoing condition/medication (so continuity-of-care and
  prescription-transfer are addressed), family members to cover
- Whether they have interim coverage now (travel/private insurance) and a job (employer
  health cover changes things)
- Urgency: a current health need vs setting up proactively

## Framework

1. **Explain the model, then their place in it.** Universal/tax-funded (register and
   you're covered), mandatory-insurance (you must buy a policy, often within a deadline),
   employer-tied, or mixed. State the model plainly, then what the user's specific status
   entitles them to and from when — eligibility often has a waiting period or a
   residency/registration prerequisite.
2. **Sequence enrolment with its prerequisites.** Registering usually needs the address
   and the tax/social number from [[arrival-setup]]; a health card/number may gate seeing
   a GP; mandatory insurance often has a signup deadline with penalties. Put the steps in
   dependency order with the documents each wants.
3. **Handle mandatory insurance without recommending a product.** Where insurance is
   required, explain that it's required, the deadline, and the *types* of plan and how to
   compare them — but the skill does not recommend a specific insurer or product; it
   routes to the official comparison/regulator and flags the penalty for going uninsured.
4. **Bridge the coverage gap.** Between arrival and enrolment there's often a gap.
   Options: keep travel/private insurance active, private pay-per-visit, and the key
   reassurance that emergency care is typically available regardless of enrolment (though
   it may be billed). For anyone with an ongoing condition, prioritise continuity —
   carrying prescriptions, a summary from the previous doctor, and finding a GP fast.
5. **Set practical expectations.** How to book (many systems require registering with one
   GP practice first; some gatekeep specialists via referral), typical waits, prescription
   and pharmacy mechanics, and costs. This is what turns "I have coverage" into "I can
   actually see a doctor," which are not the same thing.

## Output Format

```
## How healthcare works here (and your place in it)
[The model · public/private/insurance · GP-gatekeeping or not · what your status
entitles you to, and from when]

## Enrolment checklist (in order)
[Register with a doctor/GP · health card/number · mandatory insurance if required —
prerequisites & documents for each · any signup deadline]

## Before you're covered (the gap)
[Interim insurance · private pay · emergency access regardless · continuity for ongoing
conditions/prescriptions]

## Getting an actual appointment
[How to book · referral system · waits · prescriptions & pharmacies · typical costs]

⚠ Systems and eligibility are country- and status-specific and change — confirm at the
official health-system source. Not medical or insurance-purchase advice.
```

## Quality Checks

- [ ] The system model is explained AND the user's specific entitlement/eligibility is
      stated with timing
- [ ] Enrolment steps are sequenced with prerequisites (address, tax number, deadlines)
- [ ] Mandatory insurance is explained without recommending a specific product, with the
      penalty flagged
- [ ] The coverage gap is bridged, including continuity for ongoing conditions
- [ ] Practical access (booking, referrals, waits, costs) is covered, not just coverage
      in theory

## Anti-Patterns

- [ ] Do not assert a country's exact rules, costs, or eligibility as fact — orient and
      route to the official source
- [ ] Do not recommend a specific insurer or plan, or give medical advice — explain types
      and route to comparison/regulator and to clinicians
- [ ] Do not ignore the coverage gap or continuity for existing conditions — that's where
      real harm happens
- [ ] Do not conflate "enrolled" with "can get an appointment" — cover the practical access
- [ ] Do not skip the mandatory-insurance deadline where one exists — going uninsured is
      often penalized

## Related

[[arrival-setup]] provides the prerequisites (address, tax number); [[tax-residency-primer]]
and [[credit-from-scratch]] for the other systems; [[doctor-visit-prep]] once you're
enrolled; [[perimenopause-navigator]]/[[diagnosis-limbo-kit]] for specific health navigation.

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
