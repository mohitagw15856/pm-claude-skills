# Code Review Guide Skill

Bad code review nitpicks style while missing the design flaw, or dumps 40 ungraded comments. Good review is
*prioritized* and *kind*: it catches what actually matters (correctness, security, design), separates blocking
issues from nits, explains the *why*, and leaves the author better. This skill runs that review.

## Required Inputs

Ask for these only if they aren't already provided:

- **The change** — the diff/PR, and ideally its description/intent (what it's trying to do).
- **Context** — language/stack, conventions, the part of the system it touches, risk level.
- **Focus** (optional) — anything specific to scrutinize (security, performance, a tricky area).

## Output Format

### Review: [PR / change]

**Summary** — in 1–2 lines: what the change does and your overall read (solid / needs work / risky).

**Review passes** — scan in priority order and note findings:
1. **Correctness** — does it do what it claims? Edge cases, error handling, off-by-ones, concurrency.
2. **Security & data** — input validation, authz, secrets, injection, PII handling.
3. **Design** — is this the right approach? Coupling, the seam, simpler alternative, future pain.
4. **Tests** — do they cover the behavior and the edges? Would they catch a regression?
5. **Readability** — names, clarity, dead code, docs where non-obvious.

**Comments (ranked by severity)** — each with file/line, the issue, *why* it matters, and a concrete suggestion:

| Severity | Where | Comment & why | Suggested change |
|---|---|---|---|
| 🔴 Blocking | | | |
| 🟡 Should-fix | | | |
| 🔵 Nit / optional | | | |

**What's done well** — genuinely (specific, not flattery). Reviews are also for morale and learning.

**Verdict** — ✅ Approve / 🔁 Request changes / 💬 Comment — with the one or two things that gate it.

## Quality Checks

- [ ] Correctness, security, and design are reviewed before style — priority order
- [ ] Comments are ranked by severity (blocking vs. should-fix vs. nit), not a flat list
- [ ] Each comment explains *why* and offers a concrete suggestion, not just "this is wrong"
- [ ] At least one specific thing done well is noted
- [ ] A clear verdict (approve / request changes) with the gating issues named
- [ ] Tone is direct but kind — critiques the code, not the author

## Anti-Patterns

- [ ] Do not nitpick style while missing a correctness or security problem — priority first
- [ ] Do not dump ungraded comments — rank them so the author knows what's blocking
- [ ] Do not say "this is wrong" without why and a suggested fix
- [ ] Do not rewrite it your way for taste — respect working approaches; flag real issues
- [ ] Do not be a jerk — review the code, acknowledge good work, keep the author motivated

## Based On

Senior code-review practice (Google's engineering review guidelines): prioritize correctness/design, severity-tag feedback, be kind.
