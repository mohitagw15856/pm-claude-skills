---
name: savings-goal-plan
description: "Turn a savings goal into a month-by-month funding plan. Use when asked to save for something (emergency fund, house deposit, trip, big purchase), or to figure out how much to set aside each month. Produces the required monthly contribution, a timeline, milestones, and trade-offs if the target date is too aggressive. Educational, not regulated financial advice."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/savings-goal-plan.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Savings Goal Plan Skill

"I want to save for X" becomes real when it has a number per month and a date. This skill turns a savings goal
into a concrete **funding plan** — the monthly amount needed, the timeline, milestones to stay motivated, and
an honest reckoning if the goal and the deadline don't fit. Educational, not personalized financial advice.

## Required Inputs

Ask for these only if they aren't already provided:

- **The goal & target amount** — what they're saving for and how much (or help estimate it).
- **Deadline or monthly capacity** — either a target date, or how much they can set aside per month.
- **Starting point** — anything already saved toward it.
- **Account context** (optional) — where it'll sit (e.g. a high-yield savings account), any interest.

## Output Format

### Savings plan — [goal]

**Target:** $X by [date] · **Already saved:** $Y · **To go:** $Z

**Required monthly contribution:** **$M/month** for N months (with a one-line note if modest interest changes it).

**Timeline & milestones**

| Milestone | Amount | Approx. date |
|---|---|---|
| 25% there | $ | |
| 50% there | $ | |
| 100% — goal! | $ | |

**Reality check** — does $M/month fit their budget? If the target date forces an unrealistic monthly amount, show the trade-off explicitly:
- Push the date to [later] → $ lower/month, or
- Cut the target to $ → fits $/month, or
- Find $ more/month from [where].

**Keep-it-on-track tips** — automate the transfer on payday; keep this goal in a separate/labeled account; what to do with windfalls.

## Quality Checks

- [ ] The required monthly contribution is calculated and tied to the deadline (or vice versa)
- [ ] Money already saved is subtracted from the target
- [ ] Milestones break the goal into motivating chunks with dates
- [ ] If the goal is unrealistic for the timeline, the trade-offs are shown in numbers
- [ ] Automation / separate-account advice is included

## Anti-Patterns

- [ ] Do not give a monthly number without checking it's realistic against their means
- [ ] Do not ignore money already saved or any starting balance
- [ ] Do not assume an interest rate without saying so — be conservative
- [ ] Do not present a single rigid plan when the date is too tight — offer the trade-off levers
- [ ] Do not present this as personalized financial advice

## Based On

Goal-based saving (sinking funds): target ÷ timeline, milestone tracking, and automated contributions.

## Example Trigger Phrases

- "Help me save for a house deposit."
- "How much should I set aside each month?"
- "Build an emergency fund plan."
- "Save £3,000 for a trip by summer."
