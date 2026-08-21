---
name: event-budget-plan
description: "Build an event budget that survives the event — every cost line including the ones people forget, the contingency sized to the actual risk, and the tracking that shows overspend while it can still be stopped. Use when asked to build an event budget, cost an event, price a conference or wedding, or explain why an event went over budget. Produces the full cost breakdown, the commonly-forgotten lines, the contingency sizing, the payment and cash-flow schedule, the per-head economics, and the variance tracker."
---

# Event Budget Plan

Events do not overspend on the big lines. They overspend on the twenty small ones nobody budgeted — the extra rigging hour, the corkage, the crew meals, the overtime past curfew, the cost of the thing that broke. This builds the budget with those lines already in it, sizes the contingency against real risk rather than a habitual ten percent, and tracks committed spend rather than paid spend, which is what actually matters.

## What This Skill Produces

- **The full cost breakdown** — by category, separating fixed from per-head so headcount changes reprice instantly
- **The forgotten-lines checklist** — the costs that reliably appear late and unbudgeted
- **Contingency sized to risk** — driven by what is actually uncertain in this event, not a default percentage
- **Payment and cash-flow schedule** — deposits, balances, and when money must actually leave
- **Per-head economics** — cost per attendee at several headcounts, so a drop in numbers is not a crisis
- **The variance tracker** — budget, committed, paid, and forecast, because committed is the number that binds

## Required Inputs

Ask for these if not provided:
- **The event** — type, date, headcount and its confidence, and the format
- **The budget** — the total available, and whether it is a ceiling or a target
- **What is already committed** — venue, suppliers booked, deposits paid
- **The revenue side, if any** — ticket sales, sponsorship, and their certainty
- **The risk profile** — outdoor, live broadcast, international suppliers, first-time venue, or an unproven format

## Framework: Fixed Versus Per-Head, Committed Versus Paid

1. **Split fixed from per-head immediately.** Venue hire is fixed; catering is per head. Without this split, every headcount change requires rebuilding the budget.
2. **Add the forgotten lines before anything else.** Crew meals, overtime, corkage, rigging hours, power distribution, cleaning, storage, insurance, contingency travel, gratuities, and the cost of getting everything home.
3. **Size contingency against real uncertainty.** An indoor repeat event with known suppliers does not need what a first-time outdoor event needs. Justify the percentage.
4. **Track committed, not paid.** The moment a contract is signed the money is gone; a budget tracking only payments looks healthy right up until it does not.
5. **Model headcount sensitivity.** Cost per head at minimum, expected, and maximum attendance. This is the number that decides ticket price and whether the event is viable.
6. **Schedule cash flow, not just totals.** An affordable event with deposits clustered in one month can still fail.

## Output Format

### Event budget: [event] · [date] · [headcount] · v[n]

**Basis:** headcount [expected] (range [min]–[max]) · budget [amount] · [ceiling / target]

**Costs**
| Category | Line | Fixed | Per head | Qty | Total | Committed | Paid |
|---|---|---|---|---|---|---|---|
| Venue | [hire, extra hours, security] | | | | | | |
| Production | [AV, lighting, rigging, power, crew] | | | | | | |
| Catering | [food, drink, corkage, crew meals, service] | | | | | | |
| Talent | [fees, travel, accommodation, riders] | | | | | | |
| Guest | [invitations, badges, gifts, transport] | | | | | | |
| Operations | [insurance, cleaning, storage, waste, permits] | | | | | | |

**Commonly forgotten — confirm each is in or deliberately out**
crew meals ☐ · overtime past curfew ☐ · corkage ☐ · extra rigging hours ☐ · power distribution ☐ · cleaning and waste ☐ · storage before/after ☐ · insurance ☐ · permits and licences ☐ · gratuities ☐ · get-out transport ☐ · damage/replacement ☐

**Contingency:** [amount] = [n]% · **Justification:** [the specific uncertainties driving it]

**Cash flow**
| When | Payment | Amount | To |
|---|---|---|---|

**Per head:** at [min] = [amount] · at [expected] = [amount] · at [max] = [amount]

**Variance:** budget [x] · committed [y] · paid [z] · **forecast out-turn [w]** · variance [±]

> A budgeting framework, not financial or contractual advice. Confirm all rates, tax treatment, licensing costs and cancellation terms with the actual suppliers and your own finance function before committing.

## Quality Checks
- [ ] Fixed and per-head costs are separated
- [ ] Every line on the forgotten-costs checklist is explicitly in or out
- [ ] Contingency is justified by named uncertainties, not set by habit
- [ ] Committed spend is tracked separately from paid
- [ ] Cost per head is modelled at minimum, expected and maximum attendance
- [ ] Cash flow is scheduled, not just the total
- [ ] Forecast out-turn is stated, not only budget versus actual

## Anti-Patterns
- **One blended cost per head.** Headcount changes then require rebuilding everything.
- **A habitual 10% contingency.** Too much for a repeat event, dangerously little for a first outdoor one.
- **Tracking paid instead of committed.** The budget looks fine until every invoice lands at once.
- **Omitting crew meals and overtime.** Small, certain, and always missing.
- **No headcount sensitivity.** A 20% drop in attendance becomes an emergency instead of a scenario.
- **Ignoring cash-flow timing.** Affordable in total, unpayable in March.
- **Forgetting the get-out.** Everything that came in has to leave, and that costs money.

## Example Trigger Phrases
- "Build a budget for a 300-person conference"
- "What costs do people forget when budgeting an event?"
- "How much contingency should an outdoor event carry?"
- "Why did our event go over budget?"
- "What is our cost per head if only 150 people come?"
