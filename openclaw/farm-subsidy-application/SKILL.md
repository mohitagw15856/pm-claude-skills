---
name: farm-subsidy-application
description: "Prepare a farm subsidy, grant or support-scheme application: check eligibility against the scheme's own rules, list the evidence, draft the narrative answers, build the budget table and catch the errors that get claims rejected or penalised. Use when asked to help me apply for a farm grant, fill in this subsidy form, am I eligible for this scheme, write the project description for an agriculture grant, or check my application before I submit. Produces an eligibility table, an evidence checklist, drafted answers, a budget with quotes needed, a deadline plan and a pre-submission check. Distinct from grant-proposal, which is for research and non-profit funding."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/farm-subsidy-application.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Farm Subsidy Application

Farm support schemes reject or penalise applications for reasons that have little to do with the farm: an area that does not match the map, a missing quote, a commitment the applicant did not realise they were making. This skill works from the scheme's published rules, which the user supplies, and prepares an application that matches them. It is preparation help, not advice from the paying agency, and it never guesses a scheme's rules.

## What This Skill Produces

- An eligibility table: each rule, the farm's position, the evidence, and a verdict
- An evidence checklist with who issues each document and how long it takes
- Draft answers to the narrative questions, in the scheme's own terms
- A budget table with eligible and ineligible costs separated
- A plan working back from the deadline
- A pre-submission check of the common errors

## Required Inputs

Ask for these if not provided:

- The scheme name, country or region, and the guidance document or its key rules (paste or summarise them)
- The deadline and how applications are submitted
- The farm: legal form, area owned and rented, land use, livestock numbers, registration numbers
- What the money is for, with costs and any quotes already obtained
- Previous claims under this or related schemes, and any penalties
- Who will sign, and whether an adviser or agent is involved

If the guidance is not supplied, say that eligibility cannot be confirmed and produce the checklist of questions to answer from it.

## Framework

1. **Read the rules as tests.** Turn each eligibility rule into a yes or no question about this farm.
2. **Evidence for every yes.** Land registration or tenancy, maps, tax or business registration, bank details, quotes, permits, training certificates.
3. **Check the numbers against the official record.** Declared area must match the mapped or registered area. Over-declaration is the most common source of penalties.
4. **Separate eligible costs.** Second-hand items, own labour, tax, and costs incurred before approval are often excluded. Flag each and tell the user to verify.
5. **Answer the question asked.** Narrative answers use the scheme's scoring criteria as headings, state the outcome and how it will be measured.
6. **Read the commitments.** Duration, record keeping, inspection, repayment on early exit. List them so the applicant signs knowingly.
7. **Work back from the deadline** with buffer for the slowest document.

## Output Format

### Application pack: [scheme], deadline [date]

**Eligibility**
| Rule (from the guidance) | This farm | Evidence | Verdict |
|---|---|---|---|

**Evidence checklist**
| Document | Issued by | Lead time | Status |
|---|---|---|---|

**Draft answers**
**[Question as worded in the form]**
[Answer.]

**Budget**
| Item | Cost | Quote held | Eligible? | Note |
|---|---|---|---|---|

**Commitments you are signing up to:** [list with duration]

**Plan**
| By | Task | Owner |
|---|---|---|

**Before you submit**
- [ ] Declared areas match the official map or register
- [ ] Every cost has the number of quotes the scheme requires
- [ ] No work has started before approval, if the scheme forbids it
- [ ] Signatory matches the registered holder

**Assumptions and gaps**
- [Rules assumed because the guidance was not supplied]
- [The document or figure most likely to hold the application up]

*Check every rule against the current scheme guidance or with the paying agency before submitting.*

## Quality Checks

- [ ] Each eligibility line quotes or cites the rule it tests
- [ ] No rule, rate or deadline is stated that the user did not supply
- [ ] Ineligible costs are separated from eligible ones
- [ ] The commitments and repayment conditions are listed
- [ ] The plan allows for the slowest document

## Anti-Patterns

- **Do not state scheme rules from memory.** They change each year and differ by region.
- **Do not round areas up.**
- **Do not write a narrative that ignores the scoring criteria.**
- **Do not let work start before approval** where the scheme forbids it.
- **Do not present a verdict of "eligible" without evidence against every rule.**

## Example Trigger Phrases

- "Here is the grant guidance. Am I eligible, and what do I need to gather?"
- "Draft the project description for a drip irrigation grant."
- "Check my subsidy application for mistakes before the deadline on Friday."
- "What am I committing to for five years if I sign this scheme?"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/farm-subsidy-application.html

<!-- pm-claude-skills v84.0.0 | skill: farm-subsidy-application | source: skills/farm-subsidy-application/SKILL.md | sha256: 8dfdbf825464a261a721dbb5e122559a463d0a5a950d106b85e3818cff489752 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
