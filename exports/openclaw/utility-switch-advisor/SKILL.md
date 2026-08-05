---
name: utility-switch-advisor
description: "Decide whether to switch energy, broadband, or mobile providers — compare the real total cost, dodge the traps, and time it right. Use when asked should I switch energy/broadband/mobile providers, compare utility deals, is this a good energy tariff, or help me switch and save. Produces an apples-to-apples comparison (total annual cost, not headline rate), the traps to check (intro-then-jump pricing, exit fees, contract length), a switch/stay recommendation, the switching steps, and reminders to verify current prices on a comparison source."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/utility-switch-advisor.html
metadata:
  {
    "openclaw": { "emoji": "💵" }
  }
---

# Utility Switch Advisor

Providers win by making comparison hard — teaser rates that jump, bundled discounts that expire, exit fees that trap you. This compares deals on what actually matters (total yearly cost for *your* usage), surfaces the traps, and gives a clear switch-or-stay call plus the steps to do it — while reminding you that live prices must be checked on a current comparison source.

## What This Skill Produces

- **An apples-to-apples comparison** — total annual cost for your usage, not the headline per-unit rate
- **The traps checklist** — intro pricing that jumps, contract length, exit/early-termination fees, bundle discounts that expire, price-rise clauses
- **A switch/stay recommendation** — with the yearly saving and any risk
- **The switching steps** — how to switch smoothly (readings, timing, no-gap, keeping your number/service)
- **Verify reminders** — that tariffs and deals change constantly, so confirm current prices on a live comparison source before committing

## Required Inputs

Ask for these if not provided:
- **The service** — energy (gas/electric), broadband, mobile, or a bundle
- **Your current deal** — provider, tariff/plan, monthly cost, contract end date, exit fees
- **Your usage** — rough consumption/data/speed needs (drives the real cost)
- **What triggered this** — price rise, contract ending, or just checking
- **Region** — determines the market, rules, and switching process

## Framework: Total Cost, Not Headline Rate

1. **Compare total annual cost.** Estimate the yearly bill for *your* usage on each option — the headline rate hides standing charges, caps, and jumps.
2. **Hunt the traps.** A cheap intro rate that reverts, a long lock-in, exit fees, or a "discount" that expires can turn a "deal" into a loss.
3. **Check your exit first.** If you're in-contract, weigh exit fees against savings; near contract end is the natural switch window.
4. **Recommend with the number.** Give a clear switch/stay call, the estimated yearly saving, and any catch — not just "you could save."
5. **Switch cleanly, verify live.** Take meter readings/note account details, time it to avoid gaps, and confirm today's actual prices on a live comparison source — deals change weekly.

## Output Format

### Switch check: [service] · current: [provider/plan/£] · usage: [x]

**Total-cost compare** (for your usage)
| Option | ~Annual cost | Contract | Traps |
|---|---|---|---|
| Stay | [x] | [term] | [price-rise?] |
| [Option] | [x] | [term] | [intro-jump / exit fee] |

**Recommendation:** [switch/stay] — save ~[£/yr], watch [catch].
**Exit check:** [in-contract exit fee vs saving].
**Switch steps:** [readings/details · timing · no-gap · keep number].

> Tariffs and deals change constantly — confirm today's actual prices on a live comparison source before committing.

## Quality Checks
- [ ] Compares total annual cost for the person's usage, not headline rates
- [ ] Flags the traps (intro jumps, exit fees, contract length, expiring discounts)
- [ ] Weighs exit fees against savings if in-contract
- [ ] Gives a clear switch/stay call with the yearly number
- [ ] Includes clean switching steps
- [ ] Reminds to verify live prices on a current source

## Anti-Patterns
- **Comparing headline rates** while ignoring standing charges/total cost.
- **Missing the intro-to-standard price jump.**
- **Ignoring exit fees** on the current contract.
- **Asserting stale prices** as current — deals move weekly.
- **"You could save"** with no actual number or recommendation.

## Example Trigger Phrases
- "Should I switch energy providers? My bill just went up."
- "Compare broadband deals for me — my contract's ending."
- "Is this mobile plan actually cheaper than what I have?"
- "Help me switch and save on my utilities."
- "My intro internet rate is about to jump — what are my options?"
