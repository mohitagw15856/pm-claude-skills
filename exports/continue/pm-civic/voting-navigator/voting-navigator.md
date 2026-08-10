---
name: "Work out how to actually vote in a specific election — am I "
description: "Work out how to actually vote in a specific election — am I registered, what's the deadline, how do I vote (in person / mail / early), what ID do I need, and what's on my ballot — with everything routed to the official source to verify. Use when someone says 'how do I vote', 'am I registered', 'what's the deadline to register', 'help me vote by mail', or 'what's on my ballot'. Produces a personal voting plan with dates, steps, and the official links to confirm each one. Non-partisan; procedure only, never who to vote for."
---

# Voting Navigator Skill

Most people who mean to vote and don't are stopped by logistics, not apathy: a
registration deadline that passed weeks before election day, an ID rule they didn't
know, a mail-ballot request window they missed. Rules vary by country, state, and
sometimes county, and they change — so this skill's job is not to *be* the authority
but to build a personal voting plan and point every single step at the official
source to confirm. It is strictly non-partisan: it helps you cast a valid vote and
never touches who that vote is for.

## What This Skill Produces

- A **personal voting plan**: your key dates (registration deadline, early-voting
  window, mail-ballot request and return deadlines, election day) laid out backward
  from the election
- The **method options** available to you (in person on the day, early, by mail/
  postal, absentee) with the steps and any ID/documents each needs
- A **ballot-prep pointer**: how to see what's actually on your ballot and where to
  find non-partisan information on it — never a recommendation
- **Official links to verify everything** — the election authority for your area is
  the source of truth; this skill orients, it does not certify

## Required Inputs

Ask for (if not already provided):
- Where you're registered/live (country and state/region — rules are local) and the
  election you're asking about
- Whether you're already registered, or unsure (if unsure, the plan starts with
  checking)
- Any constraints: you'll be away, have accessibility needs, are a first-time voter,
  or vote from abroad/military
- Citizenship/eligibility questions only insofar as they route you to the official
  eligibility checker — the skill doesn't adjudicate eligibility

## Framework

1. **Register or confirm registration first — it's the gate.** Everything downstream
   assumes you're on the roll. Start with "check your registration status" at the
   official checker, and if there's a registration deadline, that's the most urgent
   date on the plan. Miss it and the other options don't exist.
2. **Map the dates backward from election day.** Registration deadline → mail-ballot
   request deadline → early-voting window → mail-ballot return deadline (received-by
   vs postmarked-by is a real trap) → election day. Put each on the plan with "verify
   at [official source]" because these move.
3. **Pick the method that fits your life.** In person, early, or mail each have
   different steps and ID rules. For anyone who'll be away, has mobility/access needs,
   or is nervous about lines, mail/early is usually the answer — surface it.
   Accessibility options (curbside, accessible machines, assistance) exist; name them.
4. **Sort out ID and documents.** ID requirements vary wildly (none, an option list,
   strict photo ID) and are a top reason valid voters get turned away. List what your
   area requires and what to do if you don't have it (provisional ballots, cure
   processes) — routed to the official rules.
5. **Prep the ballot without steering it.** Point to the official "what's on my
   ballot" tool and to genuinely non-partisan voter guides so the voter isn't
   deciding races in the booth. The skill never says who or what to vote for, and
   declines if asked — that's the voter's alone.

## Output Format

```
## Your voting plan — [election], [area]
| Date (verify at official source) | What must happen |
[registration deadline · mail request · early window · return deadline · election day]

## How you'll vote
[Method chosen · the steps · ID/documents needed · accessibility options if relevant]

## First thing to do now
[Usually: check your registration at [official checker] — the one urgent action]

## See your ballot
[Official "what's on my ballot" tool + a non-partisan guide — decide before you go]

## Verify everything here
[The election authority for your area — the source of truth, because rules change]
```

## Quality Checks

- [ ] Every date and rule is routed to the official election authority to verify —
      the skill never asserts a deadline as fact
- [ ] Registration status/deadline is handled first as the gating step
- [ ] Mail/early and accessibility options are surfaced, not just election-day voting
- [ ] ID requirements and the what-if-I-don't-have-it path are covered
- [ ] The output contains zero guidance on who or what to vote for

## Anti-Patterns

- [ ] Do not state deadlines, ID rules, or eligibility as settled fact — they vary and
      change; orient and route to the official source, always
- [ ] Do not express or imply any partisan preference, endorse candidates/measures, or
      "help decide" a race — decline and point to non-partisan resources
- [ ] Do not adjudicate eligibility (citizenship, residency, felony status) — route to
      the official eligibility checker
- [ ] Do not assume a country/system — ask; US, UK, and other rules differ completely
- [ ] Do not discourage or encourage voting a particular way; the skill removes
      logistical friction, nothing else

## Related

[[jury-duty-navigator]] and [[elected-rep-letter]] for the rest of civic life;
[[arrival-setup]] for newcomers registering for the first time; [[speak-at-the-council]]
to be heard between elections.
