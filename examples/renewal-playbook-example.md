# Example: renewal-playbook

## What this skill does

Builds the renewal brief for one account: health snapshot with evidence, negotiation strategy, objection responses, expansion levers and a dated timeline back from the renewal.

## How to trigger it

### Example 1: an amber account, 120 days out

**You say:**
> "Renewal playbook: [Account], £60k ARR, renews [date] (120 days). Health amber: adoption good (18/20 seats weekly), but champion went quiet and procurement flagged 'budget review'. We want +10% with a 2-year option."

**Claude produces (excerpt):**

# Renewal Playbook: [Account]

**Current ARR:** £60,000 | **Target:** £66,000 (+10%) or flat on a 2-year term
**Health status:** Amber | **Days to renewal:** 120

## 1. Account Health Snapshot
| Dimension | Score | Evidence |
|---|---|---|
| Product adoption | 4/5 | 18 of 20 seats active weekly; core workflow daily |
| Relationship depth | 2/5 | champion unresponsive 5 weeks; no exec sponsor contact this year |
| Commercial | 2/5 | procurement "budget review" flag; no multi-year history |

## 2. Negotiation Strategy
Lead with usage evidence, not discount. The 2-year option is the trade: price protection for them, logo security for you. Hold +10% unless procurement produces a competing quote; the fallback is flat on 2 years, never a 1-year discount.

## 3. Objection Responses
- "Budget is under review": "18 of 20 seats are in weekly use; which workflow would you switch 18 people off?" (then quantify switching cost)
- "Match [competitor]'s price": compare on the two features their team uses daily that [competitor] lacks; offer the 2-year at current price instead of matching.

## 4. Timeline
| Day | Action | Owner |
|---|---|---|
| T-110 | Reactivate champion: usage report + 20-min value review | CSM |
| T-90 | Exec sponsor touch: ROI one-pager | AE |
| T-60 | Commercial proposal issued (both options) | AE |
| T-30 | Procurement alignment call; legal redlines window | AE |

### Example 2: a contraction-risk renewal

**You say:**
> "Different account: 50 seats bought, 19 active. They will ask to drop to 25 seats. Play it."

**Claude produces (excerpt):**

**Position:** do not defend 50; defend value per active seat and the growth path.

- **Accept the resize to 25** paired with an activation plan owned jointly (their ops + your CSM) and a written re-expansion trigger: crossing 22 active seats opens the 40-seat tier at today's rate.
- **Why not fight:** 31 shelf seats renewing once is churn deferred; a right-sized account that activates is the only durable expansion story.
- **Protect:** term length and the price floor; concede volume, never unit price, or the next renewal starts below this one.

## Tips for best results

- Give renewal date, ARR and your target; strategy differs completely at flat, +10% and contraction.
- Be honest about champion and sponsor state; relationship scores drive the timeline's first third.
- State your walk-away and fallback before the first call, not during it.

## Related skills

- `cs-health-scorecard` to produce the health evidence this playbook consumes
- `qbr-deck` for the value review meeting the timeline schedules
