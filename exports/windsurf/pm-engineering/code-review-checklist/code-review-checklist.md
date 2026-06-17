---
trigger: model_decision
description: "Generate a tailored code review checklist for any pull request based on the language, type of change, and risk level. Use when asked to review code, check a PR, review a pull request, or generate a code review checklist. Produces a focused checklist with language-specific checks, risk-level-appropriate depth, and a clear approve/request-changes recommendation."
---

# Code Review Checklist Skill

Produces a tailored code review checklist for a specific pull request — scaled to the language, type of change, and risk level. Not a generic template.

## Required Inputs

Ask the user for these if not provided:
- **Language and framework** (e.g. TypeScript + React / Python + FastAPI / Go)
- **Type of change** (feature / bug fix / refactor / dependency upgrade / security patch / performance)
- **Risk level** (low / medium / high / critical)
- **PR description** (paste the description or link to the PR)
- **Code or diff** (optional — paste key changed files or a `git diff`; significantly improves checklist specificity)
- **Author context** (new starter / experienced / external contributor)

## Output Format

---

# Code Review: [PR Title or Reference]

### 1. PR Overview
**Scope assessment:** [Small / Medium / Large / Too large — should be split]
**Recommended review depth:** [Skim / Standard / Deep dive]
**Estimated review time:** [e.g. 20–30 min — use 5 min per 50 lines of diff as a rough guide]

### 2. Correctness Checks

Language-specific correctness checks — choose based on the language stated:

**For TypeScript/JavaScript:**
- Type definitions match actual usage
- No implicit `any` in non-test code
- Async/await used consistently; no unhandled promises
- Null/undefined handling is explicit

**For Python:**
- Type hints present on public functions
- Exception handling is specific (no bare except)
- Resources are closed (context managers, with blocks)

**For Go:**
- Errors are handled or explicitly ignored with a comment
- Context propagation is correct
- Goroutine lifetimes are bounded

[Include only the section matching the stated language]

### 3. Change-Type-Specific Checks

**For bug fixes:**
- A test exists that would have caught this bug
- The fix addresses root cause, not symptom
- Related code paths checked for the same issue

**For features:**
- Acceptance criteria met
- Edge cases handled (empty, large, concurrent)
- Error paths tested, not just happy path
- Telemetry/logging added for debugging

**For refactors:**
- Behaviour unchanged (tests still pass)
- No scope creep — refactor only
- Complexity reduced, not just moved

**For dependency upgrades:**
- Breaking changes reviewed
- Security advisories checked
- License compatibility verified

[Include only the section matching the stated change type]

### 4. Risk-Appropriate Checks

**Low risk:** basic correctness, style conventions, test coverage
**Medium risk:** above + rollback plan, monitoring updates, performance considerations
**High risk:** above + security implications, data migration safety, feature flag/gradual rollout
**Critical risk:** above + staging validation plan, incident response plan, post-deploy verification checklist

### 5. Testing Adequacy
- Unit tests cover new logic
- Integration tests cover the contract changes
- Edge cases tested
- Failure modes tested
- Performance tests if performance-sensitive

### 6. Review Decision Framework

**Approve if:** [2-3 specific conditions based on this PR]
**Request changes if:** [Specific blockers]
**Comment (non-blocking) if:** [Items worth discussing but not blocking merge]

### 7. Common Pitfalls for This Change Type
Based on the change type and language, flag 2-3 things reviewers typically miss for this combination.

---

## Quality Checks
- [ ] Checklist is tailored to the stated language (not generic)
- [ ] Change-type-specific section is included
- [ ] Risk-appropriate depth matches stated risk level
- [ ] Decision framework includes at least one named blocking condition and one named non-blocking comment condition
- [ ] Common pitfalls are specific to the stated language + change-type combo (not generic advice like "watch out for bugs")

## Anti-Patterns

- [ ] Do not generate a generic checklist that ignores the stated language — a Python checklist and a Go checklist have fundamentally different correctness concerns
- [ ] Do not treat "looks fine" as a valid review outcome — the checklist exists to surface specific concerns, not validate a superficial read
- [ ] Do not scope a "high risk" review the same as a "low risk" review — depth must scale with the stated risk level
- [ ] Do not flag every stylistic preference as a blocking issue — distinguish between blocking correctness issues and non-blocking comments
- [ ] Do not skip the "common pitfalls" section for the stated language and change-type combination — this is where the most valuable knowledge lives

## Usage Examples
- "Generate a code review checklist for [PR description]"
- "What should I check in this pull request?"
- "Give me a code review checklist for a [language] [change type]"
- "Review checklist for a high-risk PR in [language]"
