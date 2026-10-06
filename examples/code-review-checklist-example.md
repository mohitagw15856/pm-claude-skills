# Example: code-review-checklist

## What this skill does

Generates a focused review checklist for a specific pull request: scope assessment, language-specific correctness checks, risk-appropriate depth, and a clear approve or request-changes recommendation.

## How to trigger it

### Example 1: reviewing a payments PR

**You say:**
> "Review checklist for this PR: TypeScript, 410 lines changed, adds retry logic to our Stripe webhook handler. High risk, it touches money."

**Claude produces (excerpt):**

# Code Review: Stripe webhook retry logic

### 1. PR Overview
**Scope assessment:** Medium (410 lines, one subsystem)
**Recommended review depth:** Deep dive (payment path)
**Estimated review time:** 40 to 50 minutes

### 2. Correctness Checks (TypeScript)
- [ ] Async/await consistent; no unhandled promise on the retry path
- [ ] Retries are idempotent: the same webhook delivered twice cannot double-settle
- [ ] Backoff is bounded (max attempts and max delay both set)
- [ ] Type definitions match Stripe's event payloads; no implicit `any`

### 3. Risk-Specific Checks (money path)
- [ ] Failure after partial work is either rolled back or safely resumable
- [ ] Every retry attempt is logged with the event id, not the customer id
- [ ] A poisoned event cannot block the queue (dead-letter after [N] attempts)

**Recommendation gate:** request changes if idempotency (2.2) is unproven; everything else is negotiable.

### Example 2: right-sizing a trivial PR

**You say:**
> "Same skill, but the PR is 14 lines: a copy change and a new unit test. Python."

**Claude produces (excerpt):**

**Scope assessment:** Small
**Recommended review depth:** Skim, under 5 minutes

- [ ] Copy change is behind the right locale key, not hard-coded
- [ ] Test asserts behaviour, not implementation detail
- [ ] No drive-by changes outside the stated scope

**Recommendation:** approve on green CI; this does not need a second reviewer.

## Tips for best results

- State the language, the diff size and what the code touches; depth follows risk, not length.
- Say what scares you about the change; the checklist will put that first.
- Ask for the gate: which single unchecked box should block approval.

## Related skills

- `technical-debt-register` when review keeps finding the same structural problem
- `incident-postmortem` if the PR is a fix for something that already failed in production
