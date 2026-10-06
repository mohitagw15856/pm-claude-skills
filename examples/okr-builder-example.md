# Example: okr-builder

## What this skill does

Writes OKRs with measurable key results, baselines and a scoring guide, and turns vague ambitions into outcomes a team can actually grade at quarter end.

## How to trigger it

### Example 1: quarterly OKRs for a product team

**You say:**
> "OKRs for our activation team this quarter. Problems: trial-to-paid is 11%, time-to-first-value is 3 days, and support says setup confusion drives early refunds (about 40/month)."

**Claude produces (excerpt):**

### [Quarter] OKRs: Activation team

**Objective 1: Make the first day the day it works**

*Why this matters:* three days to first value is where trials die; everything else inherits it.

| # | Key Result | Baseline | Target | Measurement Method |
|---|---|---|---|---|
| KR1 | Median time-to-first-value | 3 days | under 4 hours | event: first [core action] completed |
| KR2 | Trial-to-paid conversion | 11% | 15% | billing, trial cohorts started this quarter |
| KR3 | Setup-confusion refunds per month | 40 | under 15 | refund reason codes |

*Owner:* [activation lead] | *Check-in cadence:* weekly

**Scoring guide:** 0.7 is success on stretch targets; grade KR2 on cohorts that both started and ended in-quarter, or the number lies.

### Example 2: fixing OKRs that are really a task list

**You say:**
> "Review these: 'O: Improve onboarding. KR1: Ship new welcome flow. KR2: Write 5 help articles. KR3: Hold 3 webinars.'"

**Claude produces (excerpt):**

**Diagnosis:** all three KRs are outputs; they can be completed with zero user improvement.

**Rewritten:**

**Objective: New users reach value without help**

| # | Key Result (outcome) | Was (output) |
|---|---|---|
| KR1 | Week-1 activation rate 34% → 45% | "ship welcome flow" becomes the initiative under it |
| KR2 | Onboarding-tagged tickets per 100 signups 18 → 8 | "write articles" is one bet toward it |
| KR3 | % completing setup unaided 51% → 70% | "webinars" may not survive this framing |

**Keep the task list:** it becomes the initiatives column beside each KR, graded by whether the number moved.

## Tips for best results

- Bring baselines; a key result without one is a wish with a deadline.
- Limit to 2 or 3 objectives; the skill will push back on five.
- Say what the team can actually influence; shared metrics become shared excuses.

## Related skills

- `metrics-framework` to choose the numbers worth putting targets on
- `outcome-tracker` to score at quarter end what these OKRs predicted
