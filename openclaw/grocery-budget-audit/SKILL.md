---
name: grocery-budget-audit
description: "Find where the food money actually goes — a no-shame ledger built from real receipts/statements, the four leak categories (waste, convenience markup, brand autopilot, the takeaway blur), a per-leak fix with realistic savings ranges, and a target budget that survives real life. Use when someone says 'we spend how much on food?!', 'audit my grocery spending', 'cut our food bill', or takeaway guilt is the household argument. Produces the ledger, the leak report, and a keep-the-joy budget."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/grocery-budget-audit.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Grocery Budget Audit Skill

Food spending is where budgets go to get lied to — partly because it hides
in four places at once (the big shop, the top-ups, the delivery apps, the
work lunches), and partly because every audit turns moral ("we're so bad").
This one doesn't: it's the [[attention-reset]] method pointed at food money
— chosen spending is protected (the Friday takeaway you love stays), and
only the *captured* spending is the target: the food thrown away, the
convenience markup on autopilot, the brand tax nobody chose, and the
delivery blur that's really a logistics failure wearing a menu.

## What This Skill Produces

- A **four-stream ledger**: big shops / top-ups / delivery-takeaway / food
  out, built from whatever evidence exists (receipts, statements, app
  order history — the app history is where the surprise lives)
- The **leak report**: the four leaks quantified for this household, each
  with its real cause (waste is usually a planning gap, not gluttony)
- **Per-leak fixes** with honest expected ranges — labelled as typical
  outcomes to verify against next month, never promised
- A **keep-the-joy budget**: chosen pleasures named and funded, captured
  spending targeted, and the one-month re-audit date

## Required Inputs

Ask for (if not already provided):
- The evidence: last month's statements/receipts/app histories — or the
  honest-guess version, labelled as such, with the audit flagged as
  provisional until real numbers arrive
- Household shape: people, work-lunch patterns, who shops, who cooks
- The chosen pleasures to protect — the spending that's working
- What's been tried and how it died (cash envelopes? meal kits?)

## Framework

1. **Assemble the ledger without commentary.** Four streams, one month,
   totals per stream. The delivery-app order history is mandatory
   evidence if apps are used — memory *always* undercounts it, and the
   gap between guess and history is usually the audit's headline.
2. **Sort chosen from captured.** The planned Friday takeaway: chosen —
   protected, budgeted, guilt evicted. The 9pm Tuesday order because
   nothing was defrosted: captured — a planning gap, addressable. Same
   meal, different category; the distinction does all the work.
3. **Quantify the four leaks.** Waste (what got binned — ask for the
   honest recurring victims; multiply out) · convenience markup
   (top-up-shop pricing, pre-cut everything — the top-up *trip count* is
   the lever, not the lettuce) · brand autopilot (the categories where
   own-brand is identical; typically pantry staples, cleaning, basics) ·
   the delivery blur (fees + markups + the order-because-tired pattern —
   fix is [[meal-prep-os]]'s Thursday plan, not willpower).
4. **Fix per leak, sized honestly.** Each fix names its mechanism and a
   typical range ("top-up trips 4→1/week commonly saves 10-20% of that
   stream — verify against your month"). No global "slash your bill 50%"
   claims; the re-audit is the referee.
5. **Set the budget with the joy line in it.** Streams budgeted with the
   chosen items explicitly inside; one flexible buffer; the rule that
   protects the system: overspend gets *investigated* (which leak?) not
   punished. Re-audit in one month against real numbers.

## Output Format

```
## The ledger — [month]
| Stream | Total | Biggest line | Chosen / captured split |
[The guess-vs-history gap, if apps were involved]

## Leak report
| Leak | This household's number | Real cause |

## Fixes (ranges to verify, not promises)
[Per leak: mechanism · typical range · this household's version]

## The budget (joy included)
[Per stream · the protected list · buffer · the investigate-don't-punish
rule · re-audit date]
```

## Quality Checks

- [ ] All four streams present; delivery history requested by name when
      apps are in play
- [ ] Chosen spending is explicitly protected and appears IN the budget
- [ ] Every savings number is a labelled range-to-verify, never a promise
- [ ] Waste analysis names actual recurring victims from the inputs, not
      hypothetical lettuce
- [ ] The tone check: zero shame anywhere — data, causes, mechanisms,
      re-audit

## Anti-Patterns

- [ ] Do not moralize any line of the ledger — the audit that shames is
      the audit that gets abandoned
- [ ] Do not target the chosen pleasures — cutting the loved takeaway is
      how the whole budget loses its constituency
- [ ] Do not recommend extreme-couponing/13-store optimization — time is
      a cost; the fixes here are structural, not heroic
- [ ] Do not assert current prices or "average household" comparisons as
      fact — this household's month is the only benchmark
- [ ] Do not skip the re-audit date; unverified fixes become folklore

## Related

[[meal-prep-os]] is the fix for half the leaks; [[attention-reset]] — the
same chosen/captured method, different currency; [[debt-payoff]] when the
found money needs a destination.

## Example Trigger Phrases

- "We spend how much on food?!"
- "Audit my grocery spending."
- "Cut our food bill."
