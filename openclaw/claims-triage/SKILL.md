---
name: claims-triage
description: "Triage an incoming insurance claim: check the coverage trigger against policy wording, band severity and complexity, screen for fraud indicators, set a first-pass reserve range, and route with an SLA. Use when asked to triage a claim, review a first notice of loss (FNOL), assess a new claim, decide fast-track vs adjuster routing, or screen a claim for SIU referral. Produces a structured triage note with coverage view, severity band, indicator screen, reserve range, and a routing recommendation."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/claims-triage.html
metadata:
  {
    "openclaw": { "emoji": "🛡" }
  }
---

# Claims Triage Skill

The first 24 hours of a claim set its cost and its customer experience. This skill runs a disciplined first-pass triage: does the policy respond, how big and how complicated is this, are there indicators that warrant investigation, what should we hold in reserve, and who should own it by when.

## What This Skill Produces

- A coverage-trigger view against the actual policy wording (trigger, exclusions, conditions)
- A severity/complexity band with rationale
- A fraud-indicator screen — indicators only, never conclusions
- A first-pass reserve range (indemnity + expense), labelled as first-pass
- A routing recommendation (fast-track / adjuster / senior adjuster / SIU referral / coverage counsel) with SLA

## Required Inputs

Ask for these if not provided; if working from a thin FNOL, proceed and label every inference `[assumed — confirm]`:

- **Loss description** — what happened, when, where, reported when
- **Policy details** — line of business, wording or key clauses, limits, deductible, period
- **Claimed amount or damage description** (even rough)
- **Claimant/insured history** if available (prior claims, tenure)

## Triage Framework

**1. Coverage trigger.** Quote or paraphrase the operative insuring clause. State: trigger met / trigger uncertain / trigger likely not met — with the specific wording reason. Sweep exclusions and conditions precedent (notification timing, security warranties). If coverage is uncertain, flag a reservation-of-rights consideration and route to coverage counsel review — never let uncertainty default to "covered".

**2. Severity/complexity banding:**

| Band | Profile | Typical routing |
|---|---|---|
| 1 — Fast-track | Clear coverage, quantum near/below deductible-adjacent threshold, no injury, single party | Automated/desk settlement |
| 2 — Standard | Clear coverage, moderate quantum, routine investigation | Adjuster |
| 3 — Complex | Large loss, bodily injury, multiple parties, coverage questions, or business interruption | Senior adjuster, early expert instruction |
| 4 — Major/CAT | Catastrophe-linked, potential limit loss, litigation likely, reputational exposure | Major-loss team + counsel, executive notification |

Band on the *worse* of severity and complexity.

**3. Fraud-indicator screen.** Check common indicators: loss shortly after inception or cover increase, late reporting without explanation, documentation inconsistencies, over-documentation, prior similar claims, financial-distress signals, uncooperative or steering behaviour, loss narrative inconsistent with physical evidence. **State only which indicators are present and absent.** Two or more material indicators → recommend SIU referral *in parallel with* normal handling; the claim is still handled in good faith.

**4. First-pass reserve.** Give a range for ultimate incurred: indemnity + expense (adjusting, legal, experts), gross and net of deductible. State the basis (repair estimate, comparable claims, injury tariff) and label it **first-pass, to be revised on investigation**.

**5. Routing + SLA.** Name the route, the required first contact/action, and the SLA (e.g. fast-track: decision in 5 business days; Band 3: insured contacted within 24h, site inspection within 5 days).

## Output Format

### Claim triage: [claim ref / insured / loss date]

**1. Loss summary** — 2–3 sentences, facts only.
**2. Coverage trigger** — clause cited, trigger view, exclusions/conditions checked, open coverage questions.
**3. Severity band** — band + one-line rationale.
**4. Indicator screen** — table: indicator | present? | evidence. Then: SIU referral recommended yes/no.
**5. First-pass reserve** — range, basis, gross/net.
**6. Routing & SLA** — route, owner type, first actions with deadlines.
**7. Information needed** — the specific documents/statements to request next.

End every triage note with: *"This is analytical support for triage, not a coverage determination. Coverage, reserving, and referral decisions follow your organisation's claims-handling policy and applicable regulation."*

## Quality Checks

- [ ] Coverage view cites specific wording, not just line of business
- [ ] Severity band has a stated rationale and used the worse of severity/complexity
- [ ] Fraud screen lists indicators present *and* checked-but-absent — no conclusion stated
- [ ] Reserve is a range with a stated basis, labelled first-pass, gross and net shown
- [ ] Routing includes an SLA and concrete first actions
- [ ] Assumptions from a thin FNOL are labelled `[assumed — confirm]`
- [ ] Regulatory support-not-determination line is included

## Anti-Patterns

- [ ] Do not state a fraud conclusion — state indicators and route to SIU; the word is "indicator", never "fraudulent"
- [ ] Do not let a SIU referral pause good-faith handling of the claim
- [ ] Do not default an uncertain trigger to "covered" or "denied" — flag it for coverage review with the wording question stated
- [ ] Do not give a single-point reserve on day one — give a range with basis
- [ ] Do not invent policy terms — if the wording isn't provided, ask, or label the clause `[to confirm against wording]`

## Example Trigger Phrases

- "Triage a claim."
- "Review a first notice of loss."
- "Assess a new claim."
- "Decide fast-track vs adjuster routing."
- "Screen a claim for SIU referral."
