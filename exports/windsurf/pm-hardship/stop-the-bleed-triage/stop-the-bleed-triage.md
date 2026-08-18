---
trigger: model_decision
description: "When money is in free-fall, triage the crisis — what to pay first, what to let slide, and what to protect at all costs — so you cover the essentials and stop the worst damage. Use when asked I can't pay all my bills, which bills do I pay first, financial emergency, or I'm broke and panicking. Produces a priority order for scarce money (keep-the-lights-on essentials and things with severe consequences first, unsecured debt last), what to protect no matter what (housing, utilities, food, transport to work, essential insurance), which creditors to call and what to ask for (hardship programs, deferrals), the help to tap now (assistance programs, food banks), and a calm next-24-hours plan — so panic becomes a sequence. Not financial advice; points to nonprofit credit counseling and assistance programs."
---

# Stop-the-Bleed Triage

When there's not enough money for everything, paying bills in the order they arrive — or freezing in panic — does the most damage. Crisis money has a priority order: essentials and severe-consequence bills first, unsecured debt last. This triages your situation: what to pay, what to let slide, what to protect at all costs, who to call for hardship help, and a calm next-24-hours plan — so a spiral becomes a sequence.

## What This Skill Produces

- **A payment priority order** — scarce money sequenced by consequence: housing, utilities, food, transport to work, and essential insurance first; unsecured debt (credit cards) last
- **The protect-at-all-costs list** — the essentials whose loss causes cascading harm (a roof, heat/power, the car that gets you to work), defended first
- **A "safe to let slide (briefly)" list** — what has less severe short-term consequences, so you delay the right things
- **Creditor calls that help** — who to contact and what to ask for (hardship programs, deferrals, reduced payments, medical-bill relief) — asking early beats defaulting silently
- **Help to tap now** — assistance programs (utility, rent, food), food banks, and nonprofit credit counseling
- **A next-24-hours plan** — the few concrete calls and moves to make today, so panic turns into action

## Required Inputs

Ask for these if not provided:
- **The gap** — roughly what's owed vs. what you have coming in
- **The bills** — what's due and how essential each is (rent, utilities, car, cards, medical)
- **What's threatened** — an eviction/shutoff/repo notice changes the order
- **Where** — region (assistance programs are local)

## Framework: Protect Essentials, Delay the Rest, Ask for Help

1. **Protect the essentials first.** Housing, utilities, food, and transport-to-work come before everything — losing these cascades into much bigger costs. Anything with an eviction/shutoff/repo notice jumps up.
2. **Put unsecured debt last.** Credit cards feel loud but have milder immediate consequences than a shutoff or eviction — they wait while essentials are covered.
3. **Delay the right things briefly.** Some bills tolerate a short delay far better than others — let those slide first, deliberately, not randomly.
4. **Call creditors early and ask.** Hardship programs, deferrals, and reduced payments exist — but usually only if you ask before defaulting. Asking is strength, not shame.
5. **Tap assistance now.** Utility/rent/food assistance and food banks are for exactly this — using them is smart triage, not failure.
6. **Make the next-24-hours plan.** A short list of concrete calls and moves today — action breaks the panic.

## Output Format

### Stop-the-bleed: gap ≈ [amount] · [region]

**Protect at all costs:** [housing · utilities · food · transport to work · essential insurance].
**Pay in this order:** [1 essentials/severe-consequence & any shutoff-eviction-repo notices → … → unsecured debt last].
**Safe to delay (briefly):** [the milder-consequence bills].
**Call and ask:** [creditors → hardship/deferral/reduced payment · medical-bill relief].
**Tap now:** [utility/rent/food assistance · food bank · nonprofit credit counseling].
**Next 24 hours:** [the few concrete calls/moves today].

> Not financial advice — this is triage, not a plan for the underlying situation. Nonprofit credit counseling and local assistance programs can help you go deeper.

## Quality Checks
- [ ] Sequences by consequence: essentials first, unsecured debt last
- [ ] Names the protect-at-all-costs essentials
- [ ] Bumps up anything with an eviction/shutoff/repo notice
- [ ] Directs early creditor calls for hardship help
- [ ] Points to assistance programs; gives a concrete 24-hour plan

## Anti-Patterns
- **Paying the loudest creditor** instead of the highest-consequence bill.
- **Prioritizing credit cards** over rent, power, or the work car.
- **Staying silent** instead of asking creditors for hardship help.
- **Skipping assistance programs** out of shame.
- **Freezing** with no concrete next-24-hours action.

## Example Trigger Phrases
- "I can't pay all my bills this month — which ones come first?"
- "I'm broke and panicking, what do I do right now?"
- "What bills should I prioritize in a financial emergency?"
- "Should I pay my credit card or my rent if I can't do both?"
- "Who do I call when I can't cover everything?"
