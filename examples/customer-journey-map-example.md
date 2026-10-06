# Example: customer-journey-map

## What this skill does

Builds a customer journey map: persona, stages, touchpoints, emotions, pain points and prioritised opportunities, honest about which parts rest on research and which on assumption.

## How to trigger it

### Example 1: mapping onboarding for one persona

**You say:**
> "Journey map for our expense tool, persona is an office manager at a 50-person firm, scope is first 30 days. We have 9 onboarding interviews and support-ticket data; biggest complaints are receipt upload failures and not knowing approval status."

**Claude produces (excerpt):**

# Customer Journey Map: [Expense tool], first 30 days

**Persona:** [Priya], office manager at a 50-person consultancy
**Based on:** 9 onboarding interviews + support tickets (evidence-based except where marked assumed)

## Journey Overview

| Stage | Doing | Thinking | Feeling | Pain points |
|---|---|---|---|---|
| Set-up (day 1) | Connects bank, invites staff | "Will people actually use this?" | Hopeful, wary | Invite emails land in spam (4 of 9 interviews) |
| First claims (days 2-7) | Staff submit receipts | "Why are uploads failing?" | Frustrated | Upload failure = 31% of week-1 tickets |
| First approvals (days 7-14) | Chases managers | "Where is this stuck?" | Blind | No status visibility, assumed for managers (not interviewed) |

## Prioritised Opportunities
1. **Approval status tracker** (pain in 7 of 9 interviews; retention cliff at day 12 aligns)
2. **Upload failure recovery** (31% of tickets; fix the error message before the error)
3. Invite deliverability (small fix, first-impression sized impact)

### Example 2: current state vs future state

**You say:**
> "Now the future-state map for the same journey if we ship the status tracker and upload fix."

**Claude produces (excerpt):**

**Changed cells only:**

| Stage | Was feeling | Becomes | Mechanism |
|---|---|---|---|
| First claims | Frustrated | Confident | Failed upload auto-retries and says exactly what to do |
| First approvals | Blind | In control | Status chip on every claim: submitted, with [manager], paid |

**New risk introduced:** visible status shifts pressure to slow approvers; pair with a gentle manager reminder at 48h or the pain moves rather than disappears.

## Tips for best results

- Name one persona and one scope; a map of everyone's whole journey says nothing.
- Label every cell's evidence: interviews, tickets, analytics or assumption.
- Ask for opportunities ranked against your retention or conversion data, not vibes.

## Related skills

- `discovery-interview-guide` to gather the evidence the map should rest on
- `user-research-synthesis` to turn raw interviews into the themes the map uses
