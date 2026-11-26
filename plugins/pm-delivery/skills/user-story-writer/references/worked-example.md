# Worked Example — User Story Writer

A gold-standard run of this skill: a one-paragraph disruption-handling brief for a rail booking app decomposed into an estimable story set, with the two riskiest stories written in full — including the one that had to be split when engineering flagged it.

## The brief

Wayfarer Rail — a fictional rail booking app with 1.2M monthly active users — needs disruption rebooking: when a train is cancelled, passengers currently get a generic push notification and a support queue with a 40-minute wait. The PM's brief: "When a booked service is cancelled, let the passenger rebook onto another service or claim a refund, in-app." Personas: registered travellers, guest-checkout passengers (31% of bookings, identified only by booking reference + email), and season-ticket commuters. Engineering constraints: the industry disruption feed confirms cancellations with up to 90 seconds' latency, and refunds run through a separate payments service with its own queue. Stories are needed for sprint planning on Thursday.

## The output

```
**Epic:** Disruption Rebooking
**Goal:** A passenger whose train is cancelled can resolve it themselves in-app in
under 2 minutes — rebook or refund — cutting disruption-driven support contacts
(currently ~1,800/month) by 60%.
**Stories:**

| # | Story | Notes | Dependencies |
|---|---|---|---|
| 1 | Notify passenger of cancellation with next available alternatives | Core happy path | |
| 2 | Rebook onto an alternative service (registered traveller) | Split from original "rebook or refund" story — too big | Depends on #1 |
| 3 | Request a refund instead of rebooking | Refund execution is async via payments service | Depends on #1 |
| 4 | Guest passenger accesses rebooking via booking reference | Permission model differs — no account session | Depends on #2 |
| 5 | Handle rebooking when no alternative service exists that day | Empty state + refund fallback | Depends on #2, #3 |
| 6 | Season-ticket commuter flow (no per-journey booking to rebook) | Needs product decision on compensation vs rebooking — do not build yet | |

**Suggested sprint order:** Stories 1–3 are P1 for MVP (a passenger can see, rebook,
or refund). Story 4 follows immediately — 31% of bookings are guests and shipping
without them halves the support-deflection goal. Story 5 next sprint; Story 6 is
blocked on a product decision, not engineering.

---

## Story: Rebook onto an alternative service

**Epic:** Disruption Rebooking
**Story ID:** [blank — not yet created]
**Priority:** P1
**Story points:** [for engineering to estimate]

---

### User Story

> **As a** registered traveller whose booked train has been cancelled,
> **I want to** rebook onto another service on the same route without paying again,
> **so that** I can get where I'm going without calling support or buying a
> duplicate ticket I'd then have to claim back.

---

### Context

This is the resolution step after the cancellation notification (Story 1). It only
matters in the disruption window — passengers are stressed, often on a platform
with poor connectivity. The original story covered "rebook or refund"; engineering
flagged it as two distinct flows touching different backend services, so refund is
Story 3. The disruption feed confirms cancellations with up to 90s latency, which
drives AC4.

---

### Acceptance Criteria

**AC1: Successful rebooking**
```
Given my booked service is cancelled and at least one alternative with availability
  exists on the same route within the ticket's validity window
When I select an alternative and confirm
Then my booking is moved to that service at no charge, my ticket/QR code is
  reissued, and I see a confirmation with the new departure time
```

**AC2: Fare-class mismatch**
```
Given the only available alternatives have no seats in my booked fare class
When I view the alternatives list
Then I am offered the nearest available class at no extra charge, labelled
  "complimentary upgrade due to disruption"
```

**AC3: Alternative sells out mid-flow**
```
Given I have selected an alternative service
When I confirm but that service's availability was exhausted after selection
Then I see "that service just filled up", the list refreshes, and my original
  (cancelled) booking is left untouched — I am never left ticketless
```

**AC4: Cancellation not yet confirmed by feed**
```
Given I opened rebooking from a push notification but the disruption feed has not
  yet confirmed the cancellation (up to 90s latency)
When the rebooking screen loads
Then I see a holding state ("confirming your train's status…") that resolves
  automatically, rather than an error or an empty list
```

---

### Edge Cases

- [ ] **Multi-passenger booking:** rebooking moves all passengers on the booking
      together — partial rebooking is out of scope and the UI must say so
- [ ] **Last service of the day cancelled:** no same-day alternative exists —
      route to Story 5's flow, do not show an empty list with no exit
- [ ] **Offline/poor connectivity on platform:** confirmation state must be
      recoverable — reopening the app shows the rebooked ticket, not a stuck spinner
- [ ] **Permission edge case:** guest-checkout passengers cannot reach this flow
      via account session — they enter through Story 4's booking-reference path

---

### Out of Scope

- Refund instead of rebooking (Story 3)
- Guest-checkout access path (Story 4)
- Rebooking onto a different route or operator
- Delay compensation claims (existing separate flow)

---

### Definition of Done

- [ ] Acceptance criteria all pass
- [ ] Edge cases handled (or explicitly deferred with a new ticket raised)
- [ ] Unit tests written for each AC
- [ ] Works on mobile viewport — this flow is used almost exclusively on phones
- [ ] Accessibility: keyboard navigable and screen-reader compatible
- [ ] Error states are handled and copy approved (disruption copy reviewed by
      support team lead)
- [ ] Product and design have reviewed in staging
- [ ] No console errors in production build

---

## Story: Guest passenger accesses rebooking via booking reference

**Epic:** Disruption Rebooking
**Story ID:** [blank — not yet created]
**Priority:** P1 (fast-follow — 31% of bookings)
**Story points:** [for engineering to estimate]

---

### User Story

> **As a** guest-checkout passenger with no Wayfarer account,
> **I want to** open rebooking using my booking reference and email,
> **so that** I can fix my cancelled journey myself instead of being the one-third
> of passengers who can only queue for support.

---

### Context

Guests are identified only by booking reference + email — there is no session, so
the notification deep link must carry a scoped, single-booking token. This story
gates the epic's support-deflection target: without it the 60% goal is
arithmetically out of reach.

---

### Acceptance Criteria

**AC1: Successful guest access**
```
Given my guest booking's service is cancelled
When I open the link from the cancellation email and my booking reference + email
  match
Then I land directly in the Story 2 rebooking flow for that booking only
```

**AC2: Mismatched details**
```
Given I enter a booking reference and email that do not match
When I submit
Then I see a neutral "we couldn't find that booking" message after a rate-limited
  retry — the message must not reveal whether the reference exists
```

**AC3: Scope of access**
```
Given I have accessed rebooking as a guest
When I attempt to navigate anywhere beyond this booking's disruption flow
Then I am prompted to create an account — the guest token grants this booking's
  rebooking only
```

---

### Edge Cases

- [ ] **Expired token:** disruption resolved or journey date passed — show a clear
      "this journey can no longer be changed" state with the support contact route
- [ ] **Guest booking made through a third-party reseller:** reference format
      differs — detect and route to the reseller-handled message rather than a
      generic failure
- [ ] **Rate limiting:** repeated failed reference/email attempts are throttled

---

### Out of Scope

- Guest refund flow (extends Story 3 — separate ticket)
- Account creation / migration of guest bookings
- Changing contact details on a guest booking

---

### Definition of Done

- [ ] Acceptance criteria all pass
- [ ] Edge cases handled (or explicitly deferred with a new ticket raised)
- [ ] Unit tests written for each AC
- [ ] Works on mobile viewport
- [ ] Accessibility: keyboard navigable and screen-reader compatible
- [ ] Error states are handled and copy approved
- [ ] Product and design have reviewed in staging
- [ ] No console errors in production build
```

## Why it's shaped this way

- **The original "rebook or refund" story is split, and the split is recorded in Context** — the anti-pattern table flags stories that are "too big" and the fix is "split into separate stories per flow"; rebooking and refunds touch different backend services, so they estimate and ship independently, and the Context section says so instead of letting the split look arbitrary.
- **Every "As a" names a specific traveller type** — the quality checks require "a specific user type — not 'a user'"; registered traveller, guest-checkout passenger, and season-ticket commuter behave differently at the exact moment of disruption, and the guest persona carries the number (31%) that justifies its P1 priority.
- **The "so that" clauses carry business value, not feature description** — "without calling support or buying a duplicate ticket I'd then have to claim back" passes the vague-"so that" fix in the anti-pattern table; "so that I can rebook easily" would not.
- **Each AC tests one observable outcome, including the ugly ones** — one GWT each for success, fare-class mismatch, sell-out mid-flow, and feed latency, per "one GWT per observable outcome — not one GWT for the whole feature"; AC3's "never left ticketless" is the behaviour that matters most and is easiest to forget.
- **The 90-second feed latency became AC4 instead of a technical note** — the required *technical constraints* input exists precisely so engineering flags shape the stories; an unconfirmed-cancellation holding state is user-observable behaviour, so it belongs in the ACs, not a comment.
- **Empty, error, and permission states are explicit** — "empty states are part of the feature" and "missing error state" are named anti-patterns; the last-train-of-the-day case routes to Story 5 rather than dead-ending, and the guest token's scope (AC3) plus the non-enumerable "couldn't find that booking" message (AC2) are permission edge cases written as testable criteria.
- **Story 6 is decomposed but deliberately not written** — the epic table's job is to expose that the commuter flow is blocked on a product decision, not engineering; writing full ACs for it would fake a readiness that doesn't exist.
- **Out of Scope names where the next story begins** — each exclusion points at a numbered story or an existing flow, which "prevents scope creep and clarifies where the next story begins" instead of reading as a list of things nobody thought about.
