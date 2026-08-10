---
name: jury-duty-navigator
description: "Handle a jury summons calmly — confirm it's real, understand what's actually required, request a deferral or excusal the right way if you genuinely need one, arrange work and pay, and know what to expect on the day. Use when someone says 'I got a jury summons', 'can I get out of jury duty', 'how do I defer jury service', or 'what happens at jury duty'. Produces a response plan, a deferral/excusal request if warranted, and a what-to-expect brief. Routes to the court for anything binding; never coaches dodging a legal obligation."
---

# Jury Duty Navigator Skill

A jury summons lands with a jolt of dread and a stack of questions: is this even
real, do I *have* to, what about work, can I move it? Most of that dread is
uncertainty, and the summons itself answers much of it. This skill demystifies the
process, helps you respond correctly and on time (missing a real summons has real
consequences), and — where you have a genuine hardship or conflict — helps you
request a deferral or excusal the legitimate way. It routes anything binding to the
court, and it does not help anyone dodge a civic duty they're able to serve.

## What This Skill Produces

- A **response plan**: what the summons requires and by when, so nothing is missed
  (responding on time is itself often mandatory)
- A **scam check**: real courts don't demand payment, gift cards, or SSNs by phone —
  the "you missed jury duty, pay a fine now" call is a common scam, and this flags it
- A **deferral or excusal request**, if you genuinely qualify: the legitimate grounds
  (dates, hardship, caregiving, medical, prior commitments) and how to ask, on the
  court's own process
- The **logistics**: work notification and your pay/leave rights (routed to verify),
  what to bring, and a plain what-to-expect-on-the-day walkthrough to defuse the fear

## Required Inputs

Ask for (if not already provided):
- What the summons says (jurisdiction, dates, what response it requires and by when)
- Whether there's a genuine conflict or hardship (a booked trip, a caregiving duty, a
  medical issue, exam dates) — vs simple reluctance
- Work situation and whether they know their employer's jury-leave policy / legal
  protections
- First-timer nerves vs specific procedural questions

## Framework

1. **Confirm it's genuine, then respond on time.** Verify the summons is from the real
   court (via the court's own published contact, not a number in a suspicious message)
   and calendar the response deadline immediately — in many places responding is
   compulsory even if you'll seek to be excused. On-time response is the first duty.
2. **Screen the scam version.** A phone call or text claiming you missed jury duty and
   must pay a fine / buy gift cards / confirm your SSN to avoid arrest is fraud — no
   court works that way. If that's what prompted this, the skill's main job is to stop
   the user paying and route them to report it.
3. **Separate genuine conflict from reluctance — honestly.** Legitimate grounds for
   deferral (moving the date) or excusal (being released) typically include prebooked
   travel, caregiving with no alternative, medical issues, financial hardship, or
   recent prior service — and they vary by court. The skill helps make a *real* case
   the proper way; it will not manufacture an excuse or coach evasion for someone
   simply unwilling.
4. **Make the request the court's way.** Draft the deferral/excusal request to the
   court's stated process and grounds, with the documentation they ask for, submitted
   by their deadline. Prefer deferral (serve later) over excusal where the issue is
   timing — courts grant it more readily.
5. **Sort work, pay, and the day itself.** Notify the employer (jury leave is often
   legally protected — route to verify local rights and any pay/reimbursement), pack
   what the summons requires, and walk through the actual day (check-in, waiting,
   selection, that most summoned people aren't seated) so the unknown stops being
   scary.

## Output Format

```
## Is it real? (check first)
[How to verify with the court directly · the scam-call red flags if relevant]

## What you must do, by when
[The required response and its deadline — responding is usually mandatory]

## Deferral or excusal? (only if you genuinely qualify)
[Honest read of whether you have grounds · deferral vs excusal · the request, drafted
to the court's process · documentation needed]

## Work, pay, and rights
[Employer notification · jury-leave protections and pay — verify locally]

## What the day is actually like
[Check-in → waiting → selection → most aren't seated — the fear-defuser]
```

## Quality Checks

- [ ] The summons's response deadline is surfaced as time-critical, and its authenticity
      is confirmed via the court directly
- [ ] The jury-duty scam pattern is flagged whenever a payment/threat prompted the query
- [ ] Deferral/excusal is offered only for genuine grounds, on the court's process —
      never as manufactured evasion
- [ ] Work-leave rights and pay are routed to verify, not asserted
- [ ] The what-to-expect walkthrough is included for first-timers

## Anti-Patterns

- [ ] Do not coach dodging jury service for someone able to serve — it's a civic and
      often legal obligation; help with genuine hardship only
- [ ] Do not assert deferral/excusal rules, leave rights, or pay as fact — they vary by
      jurisdiction; route to the court and the official employment rules
- [ ] Do not miss the scam angle — the fake-jury-fine call fleeces people constantly
- [ ] Do not fabricate hardship documentation or grounds
- [ ] Do not add to the dread — the tone is calming and practical throughout

## Related

[[scam-message-decoder]] for the jury-fine scam; [[voting-navigator]] and
[[elected-rep-letter]] for the rest of civic life; [[saying-no-kindly]] for the work
conversation.
