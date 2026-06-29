---
name: insurance-claim
description: "Write a clear insurance claim letter or appeal that supports a payout. Use when asked to write an insurance claim, file a claim letter, document a loss for insurance, or appeal a denied claim. Produces a structured claim — policy and incident details, the documented loss, the amount claimed, and the evidence — or an appeal that rebuts the denial reason, ready to submit."
---

# Insurance Claim Skill

Claims get paid faster when they're complete and well-documented: the right policy and incident details, an
itemised loss, and the evidence attached. This skill writes that letter — or, for a denial, an appeal that
addresses the insurer's stated reason directly — so the adjuster has everything they need to say yes.

> **Note:** this is a drafting aid, **not legal, financial, or insurance advice**, and it does not guarantee a
> payout. Coverage, deadlines, and procedures depend on your policy and jurisdiction — read your policy, meet
> the insurer's deadlines, and consult a qualified advisor for complex or high-value claims. Never misrepresent
> facts; insurance fraud is a crime.

## Working from a brief

Given "file a claim for water damage from a burst pipe", **write the full claim anyway** — structure it and
bracket the specifics (policy number, dates, amounts, itemised losses) to fill in, and list the evidence to
attach. Never withhold for missing detail; never inflate or invent losses.

## Required Inputs

Ask for these only if they aren't already provided (else bracket to fill in):

- **Policy details** — insurer, policy/claim number, and policyholder.
- **The incident** — what happened, when and where, and how it was discovered/reported.
- **The loss** — what was damaged/lost, itemised, with values/estimates.
- **Evidence** — photos, receipts, repair estimates, police/incident reports, prior correspondence.
- **The claim** — the amount claimed and the outcome you want; or, for an appeal, the denial reason given.

## Output Format

### Insurance Claim Letter

- **Header** — your details, date, insurer, and a **Re:** line with the policy/claim number.
- **1. The incident** — what happened, when, where, and when it was reported (factual, dated).
- **2. The loss** — an itemised list of what was damaged/lost with values/estimates.
- **3. Amount claimed** — the total, and how it's calculated.
- **4. Evidence** — the documents enclosed/available (listed and referenced).
- **5. Request** — the action and timeframe you're asking for, and an offer to provide more on request.
- **Close** — contact details.

For an **appeal**, add a section that **quotes the denial reason and rebuts it** with the policy wording and evidence.

Provide a **document checklist** and **notes** on policy deadlines to confirm.

## Quality Checks

- [ ] Policy/claim number, dates, and incident facts are precise and consistent
- [ ] The loss is itemised with values, and the claimed amount is shown to add up
- [ ] Evidence is listed and referenced — nothing asserted without support
- [ ] For an appeal, the denial reason is quoted and directly rebutted with policy wording
- [ ] Nothing is inflated, invented, or misrepresented
- [ ] A document checklist and a reminder to confirm deadlines are included

## Anti-Patterns

- [ ] Do not inflate or invent losses — it risks the whole claim and is fraud
- [ ] Do not be vague about amounts or dates — itemise and date everything
- [ ] Do not omit or fail to reference evidence — undocumented claims stall
- [ ] Do not ignore the denial reason in an appeal — rebut it specifically with the policy terms
- [ ] Do not present this as legal/insurance advice or guarantee an outcome — flag deadlines to confirm

## Based On

Insurance-claim practice — complete incident documentation, itemised evidenced loss, and denial-specific appeals grounded in policy wording.
