# Example: meeting-notes

## What this skill does

Turns raw meeting discussion into structured notes: decisions, action items with owner and deadline, open questions and next steps, so the meeting produces a record people can act on.

## How to trigger it

### Example 1: notes from a messy transcript

**You say:**
> "Make proper notes from this: 'Okay so pricing... [Sana] thinks we hold at £29 til Q2, [Marc] wants the rise now. We agreed: hold, revisit 15 March. [Marc] to model a £35 tier impact by Friday. Oh and the conference, someone needs to book the stand, maybe [Lena]? Deadline's the 20th. Didn't get to the hiring item.'"

**Claude produces (excerpt):**

# Pricing sync, [date]

**Attendees:** [Sana], [Marc], [Lena]

## Decisions
- Hold pricing at £29/month; revisit at the 15 March review. (Proposed by [Sana], agreed by all)

## Action Items
| Action | Owner | Deadline |
|---|---|---|
| Model revenue impact of a £35 tier | [Marc] | Friday [date] |
| Book conference stand (booking closes the 20th) | [Lena], to confirm she accepts | [date] |

## Open Questions
- Conference stand ownership not confirmed in the meeting; [Lena] was suggested, not asked.

## Deferred
- Hiring item: not discussed; carry to next agenda.

### Example 2: the skill pushing back on vagueness

**You say:**
> "Notes from standup: 'We should probably improve onboarding soon. [Devi] mentioned churn. Everyone agreed it matters.'"

**Claude produces (excerpt):**

## Decisions
- None recorded. "Onboarding should improve" is a sentiment, not a decision.

## Action Items
- None could be extracted: no owner, no deadline, no definition of "improve".

## Open Questions (suggested for the next meeting)
1. What metric defines the onboarding problem ([Devi]'s churn point: which cohort, what number)?
2. Who owns proposing options, and by when?

**Note:** this meeting produced agreement without commitment. The two questions above would convert it.

## Tips for best results

- Paste the raw transcript or your scribbles unedited; cleaning is the skill's job.
- Names plus dates matter most; say who said what where you remember it.
- Ask it to flag undecided things as open questions rather than soften them into decisions.

## Related skills

- `meeting-action-extractor` when you only want the action list, nothing else
- `stakeholder-update` to report the outcomes upward after the meeting
