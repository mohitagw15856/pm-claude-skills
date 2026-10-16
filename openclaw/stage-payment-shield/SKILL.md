---
name: stage-payment-shield
description: "Set up deposits and stage payments that protect a tradesperson from the customer who won't pay AND read as fair to the customer — stage triggers tied to visible milestones, deposit sizing by job type, the payment terms paragraph for quotes, and the scripts for late stages. Use when a tradesperson asks 'how much deposit should I take', 'customer hasn't paid the second stage', 'payment terms for my quotes', or got burned on a big job. Produces a stage-payment schedule, the terms paragraph, and firm-but-professional chase scripts."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/stage-payment-shield.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Stage Payment Shield Skill

Every tradesperson has the story: the big job, the customer who went quiet at
the last invoice, the month of work financed on a personal credit card. The
shield isn't aggression — it's structure agreed up front: a deposit that
covers materials exposure, stages triggered by *visible* milestones (customers
pay happily for what they can see), and the final payment small enough that
losing it hurts but doesn't sink the month. This skill sizes the stages for
the actual job, writes the terms paragraph for the quote, and scripts the
chases — polite at day 1, firm at day 7, formal at day 14.

## What This Skill Produces

- A **stage-payment schedule** for the specific job: number of stages,
  amounts, and the visible trigger for each ("first fix complete and shown"
  — never dates alone)
- The **terms paragraph** for the quote: deposit, stages, method, due-days,
  late-payment line
- **Chase scripts**: the day-1 nudge, day-7 firm, day-14 formal (work-pause
  warning), each short and sendable
- The **exposure math**: at every point in the job, how much of the user's
  money is at risk — the schedule is tuned to keep that number survivable

## Required Inputs

Ask for (if not already provided):
- The job: total price, duration, materials cost and when they're bought,
  the visible milestones
- The customer type: homeowner, landlord, builder/main contractor (payment
  cultures differ; contractors mean payment-terms negotiations)
- The user's cash reality: how much float they can carry without pain
- Country, for the flag: deposit-size norms and consumer rules vary —
  verify locally; this skill does structure, not law

## Framework

1. **Size the deposit to materials exposure, not custom.** Deposit ≈ the
   materials the user must buy before day one, typically landing 10–30% by
   job type. Bigger deposits on made-to-order items (windows, kitchens);
   note that some jurisdictions cap or regulate deposits — verify-local flag.
2. **Trigger stages on visible milestones.** "£X when first fix is complete
   and walked through" — the walkthrough is the trick: the customer *sees*
   what they're paying for, which is why milestone stages get paid and
   date-based stages get argued.
3. **Keep every gap survivable.** Exposure at any moment = work done +
   materials bought − cash received. Tune stage count so this never exceeds
   what the user can carry: small jobs 2 stages (deposit + completion),
   medium 3, long jobs monthly-with-milestones.
4. **Shrink the final stage.** The last payment is the most-argued: keep it
   5–10% — snagging-sized, not month-sized. "Final £X on completion of snag
   list" gives the customer a fair hold-back and the user a bounded risk.
5. **Write terms that read as fair.** The paragraph states stages, due-days
   ("within 3 days of stage invoice"), method, and one late line: "work
   pauses if a stage is more than 7 days overdue" — stated up front, it's
   professional; invented mid-job, it's a fight.
6. **Chase on a script, not a mood.** Day 1: friendly assumption of
   oversight. Day 7: firm + the pause clause quoted. Day 14: formal —
   summary of sums, pause effective, next-step note (interest/claims route
   exists — point at local process, don't bluff it). Never text-rage; every
   message is one a judge could read.

## Output Format

```
## Stage schedule — [job]
| Stage | Trigger (visible) | Amount | Your exposure after payment |
Deposit reasoning: [materials math]

## Terms paragraph (paste into the quote)
[4-6 plain sentences]

## Chase scripts
Day 1: … · Day 7: … · Day 14: …

## Verify locally
[Deposit caps/consumer rules · interest on late payment · small-claims route]
```

## Quality Checks

- [ ] Every stage trigger is visible/demonstrable — zero stages on dates
      alone
- [ ] The exposure column exists and never exceeds the user's stated float
- [ ] Final stage is snag-sized (5–10%)
- [ ] Scripts escalate in firmness, not temperature — all three sendable to
      a customer you'll see again
- [ ] Legal specifics (caps, interest rates, claims process) are flagged
      verify-local, never asserted

## Anti-Patterns

- [ ] Do not front-load so hard it reads as a scam signal — a 50% deposit on
      labor-only work loses honest customers
- [ ] Do not let stages drift from milestones to dates during negotiation
- [ ] Do not write chase scripts that threaten what the user won't do
- [ ] Do not assert consumer law by country — structure here, verification
      there

## Related

[[trade-quote-builder]] — the quote these terms live in;
[[late-invoice-escalation]] when the chase outgrows scripts;
[[first-client-contract]] for service-business cousins.

## Example Trigger Phrases

- "How much deposit should I take?"
- "Set up stage payments for this kitchen job."
- "Write the payment terms for my quotes."
- "The customer won't pay the next stage: what do I say?"
