# Example: executive-summary

## What this skill does

Writes an executive summary a senior reader can absorb in under three minutes: bottom line up front, minimum context, evidence-based findings and a clear ask.

## How to trigger it

### Example 1: summarising a long report

**You say:**
> "Executive summary of this 30-page migration report [pasted] for our CFO. Key facts: migration costs £240k, saves £95k/year in licences, takes 9 months, main risk is the finance-system integration freeze in Q4."

**Claude produces (excerpt):**

### [System] Migration Decision
**Executive Summary**
*Prepared for: CFO | Date: [date]*

**Bottom line up front:**
We recommend approving the £240k migration starting [month]. It pays back in 2.5 years through £95k/year licence savings, and delaying past Q3 pushes completion into the Q4 finance-system freeze, adding a year to payback.

**Background (why this matters):**
The current platform's licence costs rise 18% at renewal in [month], and two core workflows already run on unsupported versions.

**Key findings:**
- **Payback in 30 months:** £240k one-off against £95k/year recurring savings, net positive from year 3.
- **The window is Q2-Q3:** the 9-month plan must clear the Q4 integration freeze; start later than [date] and the timeline becomes 21 months.
- **Risk is concentrated in one integration:** finance-system cutover carries 70% of schedule risk; a parallel-run fallback is costed inside the £240k.

**Decision requested:** approve budget and the [date] start at the [month] steering meeting.

### Example 2: a one-pager with no decision, just findings

**You say:**
> "Same skill, but it's a findings-only brief: our support audit found 34% of tickets are how-do-I questions answerable by docs. No ask yet; the audience is the leadership offsite."

**Claude produces (excerpt):**

**Bottom line up front:**
A third of support volume (34%, 1,840 tickets last quarter) asks questions our documentation already answers, which points at discoverability, not content, as the gap.

**Key findings:**
- **The docs exist:** for 81% of the how-do-I tickets, a current doc answers the question.
- **Nobody arrives there:** only 6% of those ticket submitters visited any doc page first.
- **Cost framing:** at [X] minutes average handle time, this volume is roughly [Y] support-hours per quarter.

**What we are not claiming:** that docs can absorb all 34%; password and billing questions will stay human.

## Tips for best results

- Give the numbers that carry the argument; the summary is only as strong as its three findings.
- Name the reader; a CFO summary and an engineering summary lead with different lines.
- Say whether a decision is being asked for; it changes the whole shape.

## Related skills

- `brief-builder` for the fuller briefing document behind the summary
- `stakeholder-update` for recurring progress communication rather than a one-off decision
