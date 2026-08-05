---
name: fantasy-league-drafter
description: "Build a fantasy-sports draft strategy and weekly plan that fits your league's exact settings — so you draft with a plan instead of vibes. Use when asked to help with my fantasy draft, who should I draft, fantasy league strategy, or set my lineup this week. Produces a settings-aware draft approach (positional strategy by round, tiers over rankings, targets and values), a snake/auction plan for your slot, weekly start/sit and waiver logic, and honest reminders that player values shift — verify current status before locking anything in."
---

# Fantasy League Drafter

Fantasy leagues are won by people who draft with a strategy tuned to *their* league's scoring and roster rules — not by whoever memorized a generic ranking. This builds a plan around your exact settings, gives you a round-by-round approach and target tiers, and sets up the weekly habits (start/sit, waivers) that actually decide the season — while reminding you to check current injury/role news, which changes constantly.

## What This Skill Produces

- **A settings-aware strategy** — approach shaped by your scoring (PPR, categories, etc.), roster spots, and league size
- **A draft plan for your slot** — positional priority by round for snake, or a budget allocation for auction
- **Tiers over rankings** — where the drop-offs are, so you know when to reach or wait at a position
- **Targets & values** — the kinds of players to target and common value/trap picks
- **A weekly playbook** — start/sit logic, waiver-wire priorities, and a trade lens
- **A verify reminder** — player values, injuries, and roles change; confirm current status before draft day and each week

## Required Inputs

Ask for these if not provided:
- **The sport & format** — which sport, redraft/dynasty, snake or auction
- **Scoring** — PPR/standard/points/categories, and any quirks
- **League size & roster** — number of teams, starting slots, bench, flex
- **Your draft slot / budget** — pick position or auction budget
- **Your goal** — win now, build for the future, or just be competitive

## Framework: Settings First, Then Value

1. **Read the settings.** Scoring and roster rules change everything — PPR lifts pass-catchers, deep rosters change scarcity. Strategy flows from here.
2. **Think in tiers.** Draft the last player of a tier before the drop-off, not a name off a flat list — this is where value is won.
3. **Value positional scarcity.** Prioritize positions that fall off a cliff early; wait on deep ones.
4. **Plan your slot.** Snake picks come in pairs from the turn; auction is budget management — plan for the shape you're in.
5. **Win on the waiver wire.** Most seasons turn on weekly start/sit calls and waiver pickups, not the draft — set up those habits.
6. **Verify, always.** Injuries, depth-chart roles, and news move values daily — confirm current status before locking picks or lineups.

## Output Format

### League: [sport/format] · [scoring] · [teams] · slot/budget: [x]

**Draft strategy:** [positional priority by round / auction budget split].
**Tiers to watch:** [position — where the drop-off is].
**Targets & traps:** [types to target] · [common value] · [overpriced trap].

**Weekly playbook**
- Start/sit: [logic — matchup, floor vs ceiling].
- Waivers: [priorities — what to chase].
- Trades: [what to buy low / sell high].

> Player values, injuries, and roles change constantly — verify current status before the draft and each week.

## Quality Checks
- [ ] Strategy is derived from the league's actual scoring and roster settings
- [ ] Uses tiers and positional scarcity, not a flat ranking
- [ ] Draft plan fits the specific slot (snake) or budget (auction)
- [ ] Includes weekly start/sit and waiver logic
- [ ] Flags that values change and to verify current status

## Anti-Patterns
- **Generic rankings** that ignore the league's scoring/roster.
- **Drafting names, not tiers** — missing where value actually sits.
- **All-in on the draft** with no weekly waiver/start-sit plan.
- **Asserting stale player values** as current — always say verify.
- **One-size strategy** regardless of draft slot or format.

## Example Trigger Phrases
- "Help me strategize my fantasy football draft — 12-team PPR, I pick 4th."
- "Who/what should I target in an auction league with a $200 budget?"
- "Set my lineup this week — start/sit logic."
- "What's my waiver-wire strategy this season?"
- "Explain how to draft by tiers for my league settings."
