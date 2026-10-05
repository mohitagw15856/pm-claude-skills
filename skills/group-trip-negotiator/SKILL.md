---
name: group-trip-negotiator
description: "Save the group trip from the group chat — budget alignment before anything gets booked (the awkward conversation, scripted), a decision protocol that actually books things, cost-splitting rules with real numbers for unequal rooms and champagne-taste friends, and the it's-okay-to-split-up daytime clause. Use when someone says 'we're planning a trip with friends and it's chaos', 'how do we split costs', 'one friend wants luxury and one is broke', or the trip has been 'being planned' for three months. Produces the budget-alignment script, the decision protocol, and the money agreement."
---

# Group Trip Negotiator Skill

Group trips die in a specific order: someone posts a villa nobody can
afford, silence, someone says "or something cheaper?", silence, three
months pass, the dates stop working. The killer is never logistics — it's
that nobody wants to say their number first, nobody has authority to book,
and the money rules get negotiated *after* the money is spent. This skill
runs the fixes in order: budgets aligned anonymously before anything is
shortlisted, one empowered booker per category with a veto deadline, the
split rules written while everyone still likes each other — and the
liberating clause most groups discover too late: you don't have to do
everything together.

## What This Skill Produces

- The **budget-alignment move**: an anonymous-numbers script (everyone
  sends the organizer their real ceiling privately; the trip is planned to
  the *lowest real number*, stated kindly as the rule) plus the
  champagne-taste protocol (upgrades are personal add-ons, never group
  defaults)
- A **decision protocol**: one booker per category, a shortlist-of-3 rule,
  48-hour veto windows, then it's booked — motion beats consensus
- The **money agreement**: deposit handling, the unequal-rooms formula,
  shared-pot scope (what's in: groceries, taxis; what's out: bar rounds,
  activities), the tracking app choice, and the settle-up date
- The **split-up clause** and the one-per-day anchor: a single shared
  dinner/activity per day, freedom otherwise — the structure that prevents
  both herding and hurt feelings
- **Dropout rules** decided in advance: cancellation cost ownership before
  refundable deadlines vs after

## Required Inputs

Ask for (if not already provided):
- The cast: how many, the friendship topology (couples? one organizer
  doing everything? the flaky one?), and who's currently blocking what
- Trip shape: destination ideas, nights, rough dates, what's already
  booked or promised
- The money reality as far as known: suspected budget spread, the
  champagne friend, the broke friend (both get dignity in the plan)
- Where it's stuck right now

## Framework

1. **Numbers before listings.** The organizer collects each person's
   all-in ceiling *privately* ("send me your realistic total — flights,
   bed, fun — no judgment, I'll only share the range"). The planning
   number becomes the lowest real ceiling, announced as the group's
   number without attribution. This single move deletes the whole
   performative-affordability spiral.
2. **Champagne pays for its own bubbles.** Upgrades (the nicer room, the
   boat day) are opt-in add-ons paid by the upgraders: "the group rate is
   X; anyone who wants the suite tier pays the difference." The broke
   friend is never priced out of the baseline; the flush friend is never
   capped out of their fun.
3. **Consensus shortlists, one person books.** Per category (stay,
   transport, the big activity): the booker proposes ≤3 options inside
   the number, 48-hour veto window (a veto must come with an
   alternative), then the booker books. Groups don't decide; deadlines
   decide.
4. **Write the money rules before the first deposit.** Unequal rooms: the
   formula agreed up front (room-quality weighting or draw-lots-with-
   discount — offer both, the group picks). Shared pot scope listed
   explicitly. One tracking app, one settle-up date (within a week of
   return — debts age into resentment). Deposits: who fronts, and the
   dropout rule (before refund deadline: dropout eats fees; after: dropout
   owes their share unless replaced — agreed NOW, while hypothetical).
5. **Schedule freedom.** One anchor per day everyone attends; everything
   else is optional and guilt-free, said in exactly those words in the
   plan. The trips that end friendships are the ones where "together"
   was compulsory and silent resentment was the only exit.

## Output Format

```
## Unsticking move (send this week)
[The anonymous-ceiling message, ready to send · the announcement of the
group number]

## Decision protocol
| Category | Booker | Shortlist by | Veto closes | Booked by |

## Money agreement (one page)
[Baseline vs add-on rule · rooms formula options · pot scope in/out ·
deposits & the dropout rule · app + settle-up date]

## The shape of the days
[One anchor per day · the split-up clause verbatim]

## The awkward conversations, scripted
[Champagne friend · broke friend (dignity-first) · the flaky one's
deadline]
```

## Quality Checks

- [ ] The ceiling collection is private and the announced number is
      unattributed
- [ ] Baseline is set to the lowest real ceiling; every upgrade is opt-in
      with its payer named
- [ ] Every decision category has one named booker and a real deadline
- [ ] Dropout rules reference the refund deadline and are set before
      booking
- [ ] The split-up clause appears verbatim and the settle-up has a date

## Anti-Patterns

- [ ] Do not plan to the average budget — the average prices out the
      bottom third and calls it consensus
- [ ] Do not let vetoes exist without alternatives or deadlines
- [ ] Do not put upgrades in the shared pot, ever
- [ ] Do not script shaming for either money extreme — the broke friend
      and the champagne friend are both planned *for*, not around
- [ ] Do not promise the trip will be conflict-free — promise the
      conflicts will be about sunscreen, not money

## Related

[[roommate-agreement]] — the same peace-treaty machinery, domestic
edition; [[clone-brief]] for the friend who can't make the planning call;
[[franklin-decision-ledger]] when YOU can't decide whether to even go.

## Example Trigger Phrases

- "We're planning a trip with friends and it's chaos."
- "How do we split costs fairly?"
- "Agree a budget for the group trip."
- "Get the group chat to actually book something."
