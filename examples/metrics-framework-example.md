# Example: metrics-framework

## What this skill does

Builds a metrics hierarchy for a product or team: a defended North Star, the metric tree beneath it, and leading indicators with measurement guidance, in the framework that fits the context.

## How to trigger it

### Example 1: a North Star and tree for a marketplace

**You say:**
> "Metrics framework for our tutoring marketplace. Tutors list availability, parents book sessions. Revenue is 15% commission. Leadership keeps staring at GMV."

**Claude produces (excerpt):**

### 2. North Star Metric

**Completed learning hours per week:** hours of tutoring actually delivered (booked, attended, not refunded).

**Why this is the right North Star:** it counts value received by both sides; GMV rises with price inflation or no-show bookings, neither of which is customer value. Maximising completed hours forces supply quality, matching and reliability at once.

**How to measure it:** sum of session durations with status = completed, weekly.
**Current baseline:** [ADD BASELINE] | **Target:** [ADD TARGET]

### 3. Metric Tree

- **Completed learning hours/week**
  - Sessions booked/week
    - Active searching parents (leading)
    - Search → booking conversion
  - Completion rate (booked → attended)
    - Tutor no-show rate (leading, watch weekly)
    - Reschedule-to-cancel ratio
  - Average session length

**Guardrails:** commission revenue per completed hour; tutor retention at 90 days. GMV remains a finance view, not a product goal.

### Example 2: HEART for one feature

**You say:**
> "We shipped in-app messaging between parents and tutors. Give me a HEART framework for just that feature."

**Claude produces (excerpt):**

| HEART | Metric | Measurement |
|---|---|---|
| Happiness | CSAT on message thread close | 1-question in-thread pulse |
| Engagement | Threads with 3+ exchanges per booking | events table |
| Adoption | % of new bookings using messaging in week 1 | cohort cut |
| Retention | Repeat bookings where messaging was used vs not | matched comparison, labelled observational |
| Task success | Time from first message to confirmed booking | median, p90 |

**One warning:** the retention row is correlational; messaging users may simply be keener parents. Mark it as directional unless you can test it.

## Tips for best results

- Describe how the business makes money and who gets the value; the North Star defence is built from that.
- Say what leadership currently stares at; the framework will position it (often as a guardrail, not a goal).
- Ask for leading indicators explicitly; trees of lagging metrics read well and steer nothing.

## Related skills

- `okr-builder` to set targets on the tree once it exists
- `data-analysis-standard` to investigate a metric in the tree when it moves
