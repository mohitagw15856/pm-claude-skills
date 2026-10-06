# Example: prd-template

## What this skill does

Writes a complete PRD: problem statement, user stories, functional requirements, technical considerations and success metrics, structured so a team can build from it and an executive can approve it.

## How to trigger it

### Example 1: a PRD for a referral feature

**You say:**
> "PRD for a referral programme in our fitness app. Goal: cut CAC. Users get a free month per referred friend who stays 30 days. Constraints: no cash payouts, must work on iOS and Android, fraud is a worry."

**Claude produces (excerpt):**

# PRD: Member referral programme

## Problem Statement
Paid acquisition CAC has risen to [£X]; organic word-of-mouth exists (NPS 54) but is uncaptured. We will convert existing goodwill into measured acquisition by rewarding successful referrals with subscription credit, not cash.

## User Stories
- As a current member, I want a share link that visibly tracks my invite, so I know my free month is coming.
- As an invited friend, I want to see who invited me and what I get, so the signup feels personal rather than promotional.

## Functional Requirements
| # | Requirement | Priority |
|---|---|---|
| FR1 | Unique referral link per member, shareable via sheet/OS share | Must |
| FR2 | Reward: 1 free month to referrer when referee completes 30 paid days | Must |
| FR3 | Referee offer: 14-day extended trial | Must |
| FR4 | Fraud controls: same-device and same-payment-method referrals do not qualify | Must |

## Success Metrics
- Referred signups ≥ 8% of new members by day 90
- Referred-member 90-day retention within 5 points of organic
- Fraud-flagged referrals under 3% of total

### Example 2: tightening scope before writing

**You say:**
> "Same feature, but keep the PRD to a v1 we can ship in 6 weeks with two engineers."

**Claude produces (excerpt):**

## Scope for v1 (6 weeks, 2 engineers)
**In:** FR1, FR2, FR4 (device + payment checks only)
**Out, with reasons:**
- Referee extended trial: pricing-system change, moves to v1.1
- Leaderboards and streaks: no evidence yet that volume needs gamification
- Custom share creatives: OS share sheet is enough to measure demand

**The cut that matters:** reward issuance is manual-reviewed for the first 30 days (a weekly ops task) instead of fully automated; it halves the build and the fraud team wanted eyes on early data anyway.

## Tips for best results

- State the business goal and the constraints; a PRD without constraints is fiction.
- Name the fraud, privacy or compliance worry out loud; it becomes requirements, not surprises.
- Ask for the v1 cut when you have a date; scoping is part of the skill.

## Related skills

- `user-story-writer` to expand any single story with acceptance criteria
- `product-launch-checklist` once the PRD is built and heading to release
