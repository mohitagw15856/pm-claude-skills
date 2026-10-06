# Example: technical-debt-register

## What this skill does

Builds a prioritised technical debt register: debt inventory by category, business impact and effort scores per item, a priority ranking that rewards high-impact low-effort fixes, and a quarterly reduction roadmap.

## How to trigger it

### Example 1: a register from a team brain-dump

**You say:**
> "Build a tech debt register for the payments team, Q4 planning. Known debt: the charge service still calls the ledger synchronously, test coverage on refunds is near zero, we're two major versions behind on the payment SDK, deploys need a manual DB migration step, and error handling is copy-pasted across 9 handlers."

**Claude produces (excerpt):**

# Technical Debt Register: Payments Team

**Team:** Payments | **Service(s):** charge-service, refund-service
**Planning period:** Q4 2026 | **Review cadence:** Monthly

## Overview

Five items across four categories. The register skews towards reliability debt: two items (sync ledger calls, manual migrations) directly raise incident likelihood during the Q4 peak season, which is the business context that drives this quarter's ordering.

**Total items in register:** 5
**Unresolved items:** 5
**Critical/High priority items:** 2
**Estimated total resolution effort:** ~7 engineer-weeks

## Debt Register (by priority score)

| # | Item | Category | Impact (1-5) | Effort (1-5) | Priority (impact × (6−effort)) |
|---|---|---|---|---|---|
| 1 | Manual DB migration on deploy | Process | 4 | 2 | 16 |
| 2 | Refund path test coverage near zero | Testing | 4 | 3 | 12 |
| 3 | Payment SDK 2 majors behind | Dependencies | 4 | 3 | 12 |
| 4 | Sync charge→ledger call | Architecture | 5 | 5 | 5 |
| 5 | Copy-pasted error handling (9 handlers) | Code quality | 2 | 3 | 6 |

## Resolution plan: top item

**Manual DB migration step:** every deploy carries a human error risk and blocks Friday releases. Automate via the existing CI pipeline; 2 days, one engineer. Done when a deploy to staging runs the migration unattended and rolls back cleanly on failure.

## Q4 roadmap

- Oct: item 1 (quick win before peak season freeze)
- Nov: item 2 (coverage before the SDK upgrade, so item 3 has a safety net)
- Dec: item 3; defer item 4 to Q1 with a written decision, not by silence

### Example 2: pushing back on a vague "we have lots of debt"

**You say:**
> "Engineering says we have too much debt to take new features. Turn that into something leadership can act on."

**Claude produces (excerpt):**

**What the register reframes:** "too much debt" becomes 5 scored items totalling ~7 engineer-weeks, of which 2 items (18% of the effort) carry most of the incident risk. The ask to leadership stops being "slow everything down" and becomes "fund 2 weeks in October, before peak."

**The sentence for the planning meeting:** the top two items cost 7 engineer-days and remove the two most likely causes of a peak-season incident; everything else can wait a quarter and the register says so in writing.

## Tips for best results

- List every item you know of, even embarrassing ones; an incomplete register re-creates the vagueness it exists to fix.
- Give business context (peak season, compliance deadline); it changes the ordering more than the scores do.
- Revisit monthly; a register that only exists at planning time is a document, not a practice.

## Related skills

- `architecture-decision-record` to document the fix decisions the register triggers
- `rice-impact-matrix` when debt items compete directly with feature work for the same quarter
