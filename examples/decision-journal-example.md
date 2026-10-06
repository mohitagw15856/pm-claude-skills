# Example: decision-journal

## What this skill does

Records decisions before the outcome arrives: every real option at its strongest, expectations as scoreable probabilities, pre-registered falsifiers with dates, and an outcome review that separates bad luck from bad process.

## How to trigger it

### Example 1: pre-registering a hiring call

**You say:**
> "Help me think through this decision and journal it: whether to hire the strong-but-expensive candidate or keep searching. Offer deadline is Friday. We've been searching 3 months."

**Claude produces (excerpt):**

# Decision Entry: Senior hire, candidate A vs continue search

**Deciding:** extend offer to A by Friday, or decline and keep searching · **State:** 3 months search fatigue noted; mood flag: tired of interviewing, which biases toward yes

## Options (each at its strongest)
1. **Hire A:** strongest technical interview in 3 months; expensive but within band; fatigue argues for it and so does the evidence.
2. **Keep searching:** the market loosens in January; A's system-design round was the one weak spot, and it is the job.
3. **Do nothing** (let the deadline lapse): equivalent to option 2 but with a burned bridge; listed to show it is strictly worse than deciding.

## The Call
**Choice:** hire A · **Because:** the one weak round was weak relative to A's other rounds, not relative to the candidate pool; three months of market data says this is what available looks like.
**Expectations:** 75% A is at full productivity by month 3; 60% A leads the [project] launch by Q3; 10% we regret this inside a year.
**I'm wrong if:** A needs architectural rescue on the first two design docs (observable by month 2) · **Review on:** [date + 3 months]

## Outcome Review: [3 months later, you return]

**You say:** "Review my decision: A is great with people, shipped well, but both design docs needed heavy rework from the staff engineer."

**Claude produces (excerpt):**

**What happened vs expected:** the pre-registered falsifier fired: both docs needed rescue by month 2. Productivity expectation (75%) partially held; the design-lead expectation (60%) is on track to miss.

**Quadrant: tuition, not variance.** The interview surfaced this exact weakness and the entry's own reasoning explained it away ("weak relative to A's other rounds"). The process error is identifiable: you re-graded a red flag on a curve because the search was long. That is a fatigue bias, written down in the entry's own mood flag, which is what makes this review honest instead of hindsight.

**Transferable lesson:** when the mood flag and the rationalisation point the same direction, the mood is usually driving. Next long search: pre-commit the bar in writing before the final round.

### Example 2: catching a pattern across entries

**You say:**
> "That's my 10th reviewed entry. Read across them: what's my pattern?"

**Claude produces (excerpt):**

**Across 10 reviews:** timeline expectations hit 3 of 9 (systematic optimism, median slip 6 weeks); "do nothing" was the unacknowledged winner twice; and both tuition-quadrant entries share the fatigue signature above. Your personal correction list, in order: pad timelines 1.5×, price the do-nothing option seriously, and never decide tired on a deadline someone else set.

## Tips for best results

- Journal before the outcome, always; an entry written after the fact is a story, not a record.
- Keep the probabilities even though they feel false; "probably" can never be scored, 70% can.
- Name the quadrant before discussing feelings at review; the order is what keeps it honest.

## Related skills

- `decision-panel` for structuring the decision itself before journalling the call
- `retro-analysis` for reviewing team processes rather than personal judgement
