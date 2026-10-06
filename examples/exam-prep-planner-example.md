# Example: exam-prep-planner

## What this skill does

Builds an exam-prep schedule that survives a real week: retrieval-first sessions, each topic spaced to return 3+ times, weak topics weighted into prime slots, only 80% of your hours scheduled, and triage decided in advance.

## How to trigger it

### Example 1: four weeks, three exams, uneven readiness

**You say:**
> "Plan my exam prep: 4 weeks until finals. Exams: Microeconomics (40% of grade, my weakest), Statistics (30%, okay), Accounting (30%, strong). I have about 20 hours a week, evenings and weekends."

**Claude produces (excerpt):**

# Exam Prep Plan: 4 weeks · Micro, Stats, Accounting
**Real hours/week:** 20 → **scheduled: 80% = 16h** · **Method note:** every session below starts closed-book; rereading appears only as a 10-minute warmup.

## The schedule (week 1 excerpt)
| Day | Slot | Exam/topic | Method | Repeat # |
|---|---|---|---|---|
| Mon | 19:00-20:30 | Micro: consumer theory | closed-book blurt, then mark against notes | 1 |
| Tue | 19:00-20:00 | Stats: distributions | 10 past-paper questions, timed | 1 |
| Wed | 19:00-20:30 | Micro: consumer theory | re-derive from memory; teach it aloud | 2 (day 1 → 3) |
| Thu | 19:00-20:00 | Accounting: maintenance only | 20-min self-quiz | 1 |
| Sat | 10:00-12:00 | Micro: market structures | past paper section, closed book | 1 |
| Sat | 14:00-15:00 | Stats: hypothesis testing | blurt + 5 problems | 1 |
| Sun | (none) | **buffer (unscheduled on purpose)** | | |

Micro owns the weekend morning slots all four weeks: weakest subject × highest weight earns the freshest hours. Accounting never gets more than maintenance; it is strong, and improving it buys the fewest marks.

## Weekly retrieval checkpoints
Sunday evening, 45 minutes: one mixed self-test across everything touched that week. Score under 70% on any topic bumps it back to repeat #1 next week.

## If it goes wrong
Missed 1 day → the Sunday buffer absorbs it, no re-planning. Missed 3+ → drop in this order: Accounting maintenance, Stats green topics, never Micro mornings.

### Example 2: the week that exploded

**You say:**
> "Week 2 collapsed: I studied twice. Panicking. Re-plan?"

**Claude produces (excerpt):**

**First, the calibration:** the plan assumed this; that is what the 20% buffer and triage order were for. Two sessions happened, so consumer theory kept its spacing; nothing is lost that was high-value.

**The re-plan, pre-agreed, now executed:** Accounting drops to one 20-minute quiz per week (it was strong; it stays strong enough). Stats loses its green topics. Micro's schedule is untouched. Week 3 is the original week 3 plus one Saturday hour, not a heroic double-load; cramming the missed week would spend your buffer on guilt.

## Tips for best results

- State real available hours, not aspirational ones; the plan schedules 80% of whatever you say, so inflation only hurts you.
- Rank your subjects by weakness and exam weight; the multiplication of the two drives the whole timetable.
- Do the Sunday checkpoint even in bad weeks; the scores, not feelings, decide what gets re-weighted.

## Related skills

- `study-notes-synthesizer` to build the study guide the retrieval sessions test against
- `where-do-i-start` if the plan exists but starting is the problem
