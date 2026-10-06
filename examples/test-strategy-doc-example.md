# Example: test-strategy-doc

## What this skill does

Writes a test strategy from a spec or PRD: scope with explicit exclusions, a risk assessment that drives coverage depth, test types with owners and targets, and a prioritised test case outline.

## How to trigger it

### Example 1: a strategy for a payments feature

**You say:**
> "Test strategy for our new direct debit feature: users connect a bank account (via a third-party provider), schedule recurring payments, get email receipts. Spec attached. Small team: 3 devs, 1 QA."

**Claude produces (excerpt):**

### 1. Test Scope

**In scope:** account connection flow, mandate creation, recurring schedule execution, failure/retry handling, receipt emails.
**Out of scope:** the provider's own bank-side verification (their SLA, not ours; we test our handling of their responses, not their correctness); load testing (volumes are 2 orders of magnitude below concern).
**Assumptions:** provider sandbox available with scripted failure modes; a test clock exists to advance schedules without waiting real days (if not, this is the first gap to raise, because recurring logic is otherwise untestable before production).

### 2. Risk Assessment

| Area | Risk Level | Why | Test Priority |
|---|---|---|---|
| Mandate creation & payment execution | High | money movement, regulatory | P0, exhaustive |
| Failure/retry handling | High | double-charging is the headline risk | P0, exhaustive |
| Account connection | Medium | provider-owned, but our error states | P1, happy path + each provider error code |
| Receipt emails | Low | reversible, no money | P2, smoke |

### 3. Test Types and Coverage (excerpt)

**Unit:** schedule calculation logic at 100% (date arithmetic across month ends, DST, leap years is where recurring payments rot); devs write.
**Integration:** every documented provider webhook, including out-of-order and duplicate delivery; QA owns the matrix.
**The one E2E that matters:** connect → mandate → first collection → simulated failure → retry → receipt, run against the sandbox on every merge to main.

### 4. Prioritised test case outline (P0 excerpt)
1. Duplicate webhook for the same payment → exactly one charge recorded
2. Retry after failure does not re-collect an already-settled payment
3. Cancelled mandate stops the next scheduled collection within the provider's cutoff

### Example 2: right-sizing for a small change

**You say:**
> "Same product, but the feature is just renaming 'Wallet' to 'Balance' across the app. Do I need a strategy doc?"

**Claude produces (excerpt):**

**One page, and mostly scope:** the testing is a smoke pass plus string search, but the *strategy* question is the hidden coupling: does anything parse the word (analytics events, support macros, App Store screenshots, the API's user-facing error strings)? The risk table has one High row: public API responses containing "wallet" that integrators may string-match on. That row, not the UI, is why even a rename gets ten minutes of strategy.

## Tips for best results

- Attach the spec and name the team size; who-writes-what only works when the who is real.
- Say what you're explicitly not testing and why; an unstated exclusion becomes a production surprise.
- Let the risk table drive depth; uniform coverage spends your one QA on low-risk areas.

## Related skills

- `technical-spec-template` for the engineering spec this strategy tests against
- `runbook-writer` for the operational procedures once the feature ships
