---
name: api-for-yourself
description: "Publish 'how to work with me' as a literal API spec — endpoints (what to ask me for and what you'll get back), rate limits (meeting and interrupt tolerance), error codes (what happens when you surprise me Friday 5pm), auth (how to earn trust), and a changelog. Use when onboarding to a new team, when a new manager or report arrives, for a team working-styles session, or 'write my README/user manual'. Produces a personal API spec that's genuinely funny and secretly the best onboarding doc on the team."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/api-for-yourself.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# API For Yourself Skill

"User manual for me" documents have existed for years and mostly read like
horoscopes ("I value transparency"). The API-spec format fixes them by force:
an endpoint must say what you send and what comes back; a rate limit must be a
number; an error code must name the actual failure behaviour. The joke is the
format — the payload is real self-knowledge, and the test of every line is
*would a new teammate behave differently after reading it?* Deadpan technical
voice, honest contents, one page.

## What This Skill Produces

- A **personal API spec**: endpoints, request formats, rate limits, error
  codes, auth & scopes, dependencies, scheduled maintenance, changelog —
  in deadpan OpenAPI-ish style
- A **quickstart** at the top: the three calls that cover 90% of integrations
  with this human
- Optionally a **team version**: specs for a whole team session, plus the
  facilitation note for running it as an exercise

## Required Inputs

Ask for (if not already provided):
- How people should bring them things: channel preferences, context depth
  (one-liner or brief?), and what makes a request instantly workable vs
  instantly annoying
- Real capacity: meeting tolerance per day, focus blocks, response-time honest
  averages by channel
- Actual failure modes, told honestly: what happens when they're surprised
  late Friday, overloaded, given vague asks, or micromanaged
- What earns trust and what burns it; energy sources and drains; current
  quirks a teammate would discover in week three anyway

## Process

1. **Interview past the horoscope.** For every generic answer ("I like
   directness"), push for the behavioural version: what does a *well-formed
   request* actually contain? What's the observable symptom when it's
   missing? The spec is built from behaviours, not values.
2. **Design the endpoints** — the 4–6 things people actually come to this
   person for. Each gets: method + path (`POST /decisions`), request body
   (what to include), response (what they'll get and by when), and the errors
   it can throw. Include one honest deprecated endpoint (`/status-meetings —
   deprecated, use async /updates instead`).
3. **Publish real numbers.** Rate limits with actual figures ("3 meetings/day
   before response quality degrades — 429 after that"), response-time SLAs by
   channel that match reality, scheduled maintenance (focus blocks, the school
   run, timezone). A limit without a number is a mood.
4. **Write error codes as self-knowledge.** The funniest section and the most
   useful: `429 Too Many Meetings` (symptom: monosyllabic replies; retry:
   tomorrow morning) · `400 Vague Request` (returns clarifying questions, not
   work) · `503 Friday 5pm Surprise` (accepted but not processed until Monday;
   don't resend). Each code: symptom, what NOT to do, the retry strategy.
5. **Auth, changelog, quickstart.** Auth: how trust levels are earned and what
   each unlocks (scope: `direct-feedback` granted after…). Changelog: 2–3
   honest entries ("v3.1: no longer needs to win every argument — patched
   after 2024 retro"). Quickstart on top: the three most-used calls, copy-paste
   ready.

## Output Format

```
# [Name] API — v[X.Y]
> One-line summary of what this human is for.

## Quickstart
[The 3 calls covering 90% of use]

## Endpoints
### POST /[thing]
Request: … · Response (SLA): … · Errors: [codes]

## Rate limits
[Real numbers: meetings, interrupts, context switches]

## Error codes
| Code | Trigger | Symptom you'll observe | Retry strategy |

## Auth & scopes
[How trust is earned; what each level unlocks]

## Scheduled maintenance
[Focus blocks, hours, timezone truths]

## Changelog
[2-3 honest entries — growth as version notes]
```

## Quality Checks

- [ ] Every line passes the behaviour test: a new teammate would act
      differently having read it — zero horoscope lines survive
- [ ] Rate limits and SLAs carry real numbers the person will actually honour
- [ ] At least one error code and one changelog entry required genuine honesty
      (a flaw admitted, a patch noted) — that's what makes readers trust the
      rest
- [ ] The joke never outruns the information: deadpan format, true payload
- [ ] One page; the quickstart works standalone if that's all anyone reads

## Anti-Patterns

- [ ] Do not write requirements-for-others disguised as self-documentation —
      it's an API you offer, not an SLA you impose; tone stays "here's how to
      get the best out of me"
- [ ] Do not fake quirks for comedy or hide real ones for image — week three
      reveals everything anyway
- [ ] Do not ship without the errors section; specs with only happy paths are
      marketing
- [ ] Do not let it ossify — the changelog implies maintenance; suggest a
      re-version at role changes

## Related

[[the-understudy]] is how an AI learns your inside; this is how humans call
your outside. [[working-agreements]] for the team-level contract;
[[onboarding-plan]] to slot this into a new joiner's week one.

## Example Trigger Phrases

- "Onboard to a new team."
- "Report arrives."
- "Write my README/user manual."
