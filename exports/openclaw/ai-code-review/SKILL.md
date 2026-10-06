---
name: ai-code-review
description: "Review AI-authored code for its characteristic failure modes — plausible-but-wrong logic, hallucinated APIs, over-engineering, dead scaffolding, and silent security shortcuts. Use when reviewing an AI-generated or heavily AI-assisted PR, when AI-written code keeps shipping subtle bugs, or when setting review standards for a team using coding agents. Produces a focused review with AI-specific findings, verification steps per risk class, and a team checklist for AI-authored changes. For general PR review use code-review-checklist — this skill covers what that one assumes a human wouldn't do."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ai-code-review.html
metadata:
  {
    "openclaw": { "emoji": "⚙️" }
  }
---

# AI Code Review Skill

Human code fails where the human got tired or didn't know; AI code fails where *plausibility diverged from correctness* — and it fails fluently, with confident naming, clean formatting, and tests that pass without testing anything. Reviewing it with human-code instincts ("looks careful, probably is careful") is how the new bug class ships. This skill reviews for the failure modes that are characteristically AI.

> **Not quite this?** Use `code-review-guide` when the code was written by people and needs a general review.

## What This Skill Produces

- A **review of the change** organised by AI-characteristic risk, each finding with file/line and severity
- **Verification steps** the reviewer must actually run (not read) per risk class
- A **team checklist** for AI-authored PRs, calibrated to this codebase

## Required Inputs

Ask for (if not already provided):
- **The diff or PR** (or the files changed)
- **Provenance honestly**: fully agent-written, human-piloted, or mixed — and whether the *author reviewed it themselves* before requesting review
- **The codebase context**: existing conventions/utilities the AI may not have known, and what the change claims to do
- **Test infrastructure**: what CI actually runs (the AI may have written tests CI never executes)

## The AI-Characteristic Failure Modes

Review in this order — most damaging first:

1. **Plausible-but-wrong logic.** The code reads correctly and does something subtly different: inverted edge conditions, off-by-one on boundaries the prompt never mentioned, the right algorithm for a slightly different problem. *Verification: trace 2-3 concrete inputs through the changed logic by hand — the fluency of the code is not evidence; it's the camouflage.*
2. **Hallucinated or misused APIs.** Methods that don't exist in this version, config keys from a different library, plausible-sounding parameters silently ignored. *Verification: for every external API call touched, check the actual dependency version's docs — not memory, not the AI's comment.*
3. **Tests that test nothing.** Asserting mocks return what they were mocked to return; happy-path-only suites with confident names; tests copied from the implementation (tautological). *Verification: mentally break the implementation — would any test fail? If not, the coverage number is decoration.*
4. **Reinvention and drift.** A new utility duplicating an existing one (the AI didn't know your `utils/`), a new pattern where the codebase has a convention, a second source of truth. *Verification: for each new helper/abstraction, grep for the existing equivalent.*
5. **Over-engineering as default.** Speculative generality: interfaces with one implementer, config for things that never vary, error hierarchies for a script. AI pads scope because scope was ambiguous. *Finding, not felony — but it's yours to maintain forever.*
6. **Dead scaffolding.** Unused imports/variables, TODO stubs presented as done, commented-out alternatives, leftover debug logging. Cheap to catch, and its *presence predicts* the deeper failures — a diff with scaffolding wasn't self-reviewed.
7. **Silent security shortcuts.** Broad exception swallowing, disabled TLS verification "for now", string-built SQL, secrets in examples that became code, permissive CORS. AI reproduces the internet's average security posture unless told otherwise. *Verification: run the security linters even for a "trivial" change; the shortcut is rarely where the feature is.*

## Output Format

### AI Code Review: [PR/change] — provenance: [stated]

**Verdict:** ✅ approve / 🟡 approve with required fixes / 🔴 request changes — [one line]

**Findings**
| # | Failure mode | Location | Severity | Finding + fix |
|---|---|---|---|---|

**Verified by running:** [the hand-traces, API checks, and break-the-test exercises actually performed — a review that only read the diff says so]

**Debt accepted knowingly:** [over-engineering/style items merged anyway, listed so they're chosen]

**Team checklist for AI-authored PRs:** [the 7 modes as a calibrated checklist + the house rule: AI-assisted PRs declare provenance, and the author self-reviews before requesting review]

## Quality Checks

- [ ] At least one concrete input was hand-traced through the changed logic
- [ ] Every touched external API was verified against the actual dependency version
- [ ] Each test was assessed by "what breakage would this catch?"
- [ ] New helpers were grepped against existing utilities
- [ ] The verdict distinguishes required fixes from accepted debt

## Anti-Patterns

- [ ] Do not extend human-code trust heuristics ("clean and well-named, so probably correct") — fluency is the failure mode's costume
- [ ] Do not approve on green CI without checking whether the tests can fail
- [ ] Do not review the description instead of the diff — AI PR descriptions are confident summaries of intent, not of behaviour
- [ ] Do not reject code *for being* AI-written — review the code; provenance calibrates scrutiny, not verdicts
- [ ] Do not skip security linting because the change is small — the shortcut hides in the periphery
- [ ] Do not accept "the agent tested it" as verification — demand the evidence in the PR

## Example Trigger Phrases

- "Review this AI-generated pull request."
- "Claude wrote this code: what did it get wrong?"
- "Check this PR for hallucinated APIs."
- "Set review standards for a team using coding agents."
