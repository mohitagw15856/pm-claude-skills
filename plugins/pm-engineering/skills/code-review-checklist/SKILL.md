---
name: code-review-checklist
description: "Generate a tailored code review checklist for any PR, language, or risk level. Use when asked to create a code review checklist, review guidelines, PR standards, or quality gates for a codebase. Produces a structured, prioritised checklist adapted to the specific language, PR type, and risk level."
---

# Code Review Checklist Skill

This skill generates a structured, prioritised code review checklist tailored to a specific PR, language, and risk level. It helps reviewers be thorough without being bureaucratic.

## Required Inputs

Ask the user for these if not provided:
- **Programming language(s)** (e.g. Python, TypeScript, Go, Java)
- **PR type** (new feature / bug fix / refactor / performance improvement / security patch / infrastructure change)
- **Risk level** (Low: internal tooling, Low traffic / Medium: user-facing feature / High: payment, auth, data pipeline, public API)
- **Team context** (optional: team size, seniority mix, any known recurring issues)

## Output Structure

### 1. Checklist Header

**PR:** [Title if provided]
**Language:** [Language]
**Type:** [PR Type]
**Risk Level:** [Low / Medium / High]
**Estimated review depth:** [Quick scan ~15 min / Standard ~30 min / Deep review ~60 min+]

---

### 2. The Checklist

Organise into sections. Mark each item with a priority indicator:
- 🔴 **MUST** — Blocking. PR should not merge without this.
- 🟡 **SHOULD** — Important. Address before merge unless there's a good reason not to.
- 🟢 **CONSIDER** — Nice to have. Worth a comment but not blocking.

#### Section A: Correctness
- 🔴 Does the code do what the ticket/requirement describes?
- 🔴 Are edge cases handled? (nulls, empty arrays, zero values, max values)
- 🔴 Are error states handled and surfaced appropriately?
- 🟡 Does the happy path have adequate test coverage?
- 🟡 Are failure paths tested?

#### Section B: Security (scale with risk level — expand for High risk PRs)
- 🔴 [High risk only] Is user input sanitised before use in queries or commands?
- 🔴 [High risk only] Are auth/permission checks in place?
- 🟡 Are secrets/credentials committed anywhere? (check .env handling)
- 🟡 Are third-party dependencies known-safe versions?

#### Section C: Performance
- 🟡 Are there N+1 query patterns in database calls?
- 🟡 Is there unnecessary work inside loops?
- 🟢 Are database queries indexed appropriately?
- 🟢 Is caching considered where appropriate?

#### Section D: Readability & Maintainability
- 🟡 Are function and variable names clear without needing a comment to explain them?
- 🟡 Are complex logic blocks explained with inline comments?
- 🟢 Is the code consistent with existing patterns in the codebase?
- 🟢 Are there any magic numbers that should be named constants?

#### Section E: Language-Specific Checks
[Populate this section based on the specified language. Examples below:]

**Python:**
- 🟡 Are type hints used on function signatures?
- 🟡 Are exceptions caught specifically (not bare `except:`)?
- 🟢 Does it follow PEP 8 (or the team's linter config)?

**TypeScript/JavaScript:**
- 🔴 Are there any `any` types that should be properly typed?
- 🟡 Are async/await patterns used consistently (no mixed Promise.then chains)?
- 🟢 Are there unnecessary re-renders in React components?

**Go:**
- 🔴 Are errors checked (not ignored with `_`)?
- 🟡 Are goroutines properly managed to prevent leaks?
- 🟢 Are exported functions documented?

#### Section F: PR Hygiene
- 🟡 Is the PR a reasonable size? (>500 lines diff suggests it should be split)
- 🟡 Does the PR description explain *why*, not just *what*?
- 🟢 Are there linked tickets or context in the PR description?
- 🟢 Are migration scripts or deployment notes included if needed?

---

### 3. Risk-Specific Additions

For **High risk** PRs, always add:
- 🔴 Has this been tested in a staging environment?
- 🔴 Is there a rollback plan?
- 🔴 Has a second reviewer been assigned?

For **Infrastructure / DB changes**, always add:
- 🔴 Are migrations backward-compatible?
- 🔴 Has the migration been tested against production data volume?

---

## Quality Checks

- [ ] Checklist is tailored to the specified language (not generic)
- [ ] Risk level is reflected in the MUST vs SHOULD balance
- [ ] Language-specific section covers the most common issues for that language
- [ ] PR hygiene section is always present
- [ ] High-risk additions are included when risk level = High

## Example Trigger Phrases

- "Generate a code review checklist for a Python bug fix PR"
- "Give me a review checklist for a high-risk TypeScript auth change"
- "What should I check in this Go PR?"
- "Create PR review standards for our team"
