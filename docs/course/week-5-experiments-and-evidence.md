# Week 5: Experiments and evidence

## Learning outcomes

- Design an A/B test with a hypothesis, a primary metric, guardrails and a sample size.
- Read a cohort table and describe what changed and when.
- Tell the difference between a result, a trend and noise.

## Skills used

- `ab-test-planner`: test plan with sample size and duration.
- `cohort-analysis`: cohort definitions and retention curves.
- `retention-analysis`: drivers of retention and where to intervene.

## Case material

A fictional Larder cohort table: monthly sign-up cohorts for the last eight months, with week-1, week-4 and week-8 retention. Build in a visible drop starting in one month, which lines up with an onboarding change.

## In-class exercise (60 minutes)

1. **Cohorts (20 min).** Run `cohort-analysis` on the table. Before reading the output, each student writes down when they think the drop began. Compare with the skill's reading.
2. **Retention (15 min).** Run `retention-analysis`. List each driver it names and mark whether the table supports it or the skill assumed it.
3. **Test plan (25 min).** Run `ab-test-planner` for a test of the smart shopping list on new sign-ups. Check the sample size against Larder's real sign-up rate. How many weeks does the test need? Is that acceptable?

## Graded assignment A5: experiment plan and cohort read-out (10%)

A half-page read-out of the cohort table and a full test plan for the smart shopping list.

**Week-specific criteria (0 to 4 each):**

| Criterion | What a 4 looks like |
|---|---|
| Reading the data | The read-out names the month the drop began, links it to the onboarding change as a hypothesis (not a proven cause), and says what would confirm it. |
| Feasible test | The sample size and duration fit Larder's traffic; guardrails and a stopping rule are stated; the plan says what decision each outcome leads to. |

## Instructor note

Students tend to accept the skill's sample size without checking it against traffic. Make them do the arithmetic once, by hand. A test that needs 30 weeks of sign-ups is not a plan.
