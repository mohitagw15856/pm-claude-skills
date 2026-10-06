# Example: outcome-tracker

## What this skill does

Records the testable predictions inside a decision at the moment you make it, then scores them against reality later, producing calibration reports that tell you which frameworks and gut calls to trust.

## How to trigger it

### Example 1: registering predictions at decision time

**You say:**
> "We just committed to building CSV import first based on its RICE score. Log the predictions: we expect onboarding completion to rise from 58% to 70% within 60 days of launch, and import-related tickets to double short-term."

**Claude produces (excerpt):**

### Predictions registered: CSV import priority call, [date]

| # | Claim | Metric (baseline) | Predicted | Confidence | Check by | Framework |
|---|---|---|---|---|---|---|
| 1 | Import lifts onboarding completion | completion rate (58%) | ≥70% | 70% | launch + 60 days | RICE (Impact=2) |
| 2 | Short-term ticket bump | import tickets/week (0) | 2x onboarding-ticket rate for 2 weeks, then below | 60% | launch + 30 days | gut |
| 3 | Reach assumption holds | users touching import/quarter | ≥300 | 80% | launch + 90 days | RICE (Reach) |

*Untestable claims flagged:* "customers will love it" → becomes testable as CSAT ≥4.2 on the import flow survey.

### Example 2: the review when the dates arrive

**You say:**
> "It's 90 days post-launch. Actuals: completion 64%, import users 412, tickets spiked 3x for a month."

**Claude produces (excerpt):**

### Outcome review, [date]

| # | Claim | Predicted | Actual | Outcome | Learning |
|---|---|---|---|---|---|
| 1 | Completion ≥70% | 70% | 64% | Miss (direction right, size wrong) | Impact=2 was optimistic; this shape of fix earns Impact=1 |
| 2 | Ticket bump 2x/2wks | 2x, 2 weeks | 3x, 4 weeks | Miss | budget support capacity on 1.5x the estimate next time |
| 3 | Reach ≥300 | 300 | 412 | Hit | Reach estimates from support data are running reliable |

**Calibration note:** across your last 9 RICE decisions, Reach is well calibrated (7/9), Impact overshoots (2/9 hits). Trust the Reach column; haircut Impact by one level until it earns its way back.

## Tips for best results

- Log predictions the same day as the decision; reconstructed predictions flatter everyone.
- Give each claim a check-by date and a confidence; those two fields make calibration possible.
- Review on the dates even when it is embarrassing; the misses are the product.

## Related skills

- `rice-prioritisation` to produce the scores this skill holds to account
- `decision-journal` for the narrative record around the numbers
