---
trigger: model_decision
description: "Parse error logs, stack traces, and crash reports into a structured root cause diagnosis. Use when an application is throwing exceptions, crashing, or producing unexpected errors and you need to understand why and what to fix. Produces a structured diagnosis with error classification, stack trace walkthrough, probable root cause with confidence level, affected code path, a concrete code-level fix suggestion, and ordered next debugging steps."
---

# Debugging Log Analyser Skill

Parses raw error logs, stack traces, and crash reports into a structured diagnosis with probable root cause, affected code path, and specific next steps — no hand-waving.

## Where this sits — the diagnosis step

Second in the incident-response spine: **`/slo-error-budget` (frame) →
`debugging-log-analyser` → `/incident-postmortem` → `/oncall-runbook`**. It takes the raw
symptoms of a live incident and hands `/incident-postmortem` **the root-cause diagnosis
and the fix** — so the postmortem builds on the diagnosis instead of re-deriving it.
Shared terms (root cause vs contributing factors, mitigation vs resolution) are defined
once in [`docs/craft/incident-response.md`](../../docs/craft/incident-response.md).

## The loop

Debugging fails when it jumps to a fix before the evidence supports it. Phase 2 is the
skill — a diagnosis is only as good as its confidence, and false certainty sends
responders down the wrong path at the worst time.

1. **Classify and read the evidence.** Categorise the error, walk the stack trace to the
   actual failing frame (not the framework noise), and note what the logs do and don't
   show. Redact secrets in anything you quote back.
   **Done when:** the failing frame is identified, and the evidence gap (what the logs
   can't tell you) is stated rather than filled with a guess.
2. **Reach a root cause with an honest confidence level.** Name the most probable root
   cause *and* its confidence (confirmed / likely / uncertain), plus the alternative if
   it's not certain. A diagnosis without a confidence level is a guess wearing a lab coat.
   **Done when:** the root cause carries a confidence label and, if not confirmed, the
   next observation that would confirm or refute it.
3. **Specify the fix and the mitigation separately.** Give the concrete code-level fix
   for the root cause — and, distinctly, the fastest mitigation to stop user impact now
   (rollback, flag-off), because stopping the bleeding and fixing the wound are different
   moves at different urgencies.
   **Done when:** there's a specific fix for the root cause AND an immediate mitigation,
   and they're not conflated.
4. **Hand off to the postmortem.** Surface the diagnosis, the fix, and the timings so
   `/incident-postmortem` can build the timeline and contributing factors from evidence,
   not memory.
   **Done when:** the postmortem could start from this output without re-diagnosing.

## Required Inputs

Ask for these if not provided:
- **The log / stack trace / error output** (paste directly or describe the error)
- **Language and framework** (e.g. Node.js + Express, Python + Django, Java Spring, Go)
- **Context** (what changed before this started — e.g. recent deploy, config change, increased traffic, new input data; or "nothing changed" is also useful)
- **Frequency** (one-off / intermittent / consistent / regression after a specific change)
- **Environment** (local dev / staging / production)
- **What they've already tried** (if anything)

## Output Format

---

# Debugging Report: [Service/App Name]

### 1. Error Classification
**Error type:** [Runtime exception / Build error / Config error / Network error / Memory error / Unknown]
**Severity:** [Fatal / Critical / Warning / Informational]
**Recurrence pattern:** [One-off / Intermittent / Consistent / On-startup / Under load]

### 2. Stack Trace Analysis

Walk the stack frame by frame, starting from the origin:
- **Origin frame:** [File, line, function where it started]
- **Propagation path:** [How it travelled through the call stack]
- **Crash point:** [Where it ultimately threw/panicked/exited]

For each significant frame, note whether it is:
- User code (fixable here)
- Framework/library code (usually a misuse issue)
- System/runtime code (usually a config or environment issue)

### 3. Root Cause Assessment
**Probable root cause:** [1–2 sentence plain English statement]
**Confidence:** [High / Medium / Low — and why]
**Alternative causes to rule out:** [If confidence is not high]

### 4. Affected Code Path
**Entry point:** [Where the triggering call began]
**Key function(s) involved:** [Specific functions/methods named in the trace]
**Data that triggered it:** [If inferable from the log — e.g. null value, malformed JSON]

### 5. Suggested Fix
Provide a concrete, code-level suggestion:
- What to change (the minimal fix)
- Why this fixes the root cause
- Any trade-offs or risks in the fix
- A short code snippet if helpful

### 6. Next Debugging Steps
If the root cause is uncertain, provide an ordered list of 3–5 specific debugging actions:
1. [Specific thing to check — file, log line, config value]
2. [Specific reproduction step or isolation test]
3. [Specific tool command — e.g. `strace`, `pprof`, `--verbose`, add logging at X]

### 7. Prevention
One or two concrete things that would prevent this class of error recurring:
- Better input validation at [point]
- Add monitoring/alerting for [condition]
- Test that covers [scenario]

---

## Quality Checks
- [ ] Root cause is specific (not "there might be a null pointer issue")
- [ ] At least one concrete code-level fix is suggested
- [ ] Next steps are actionable commands, not vague advice
- [ ] Suggested fix references the actual language/framework in the input (not a generic fix that could apply to any language)
- [ ] Confidence level includes a stated reason (not just "High" or "Low" with no explanation)
- [ ] Prevention is proactive (not just "add error handling")

## Anti-Patterns

- A vague root cause ("something's null somewhere") instead of the specific line/frame
- A generic fix that could apply to any language, ignoring the actual stack trace
- Restating the error message instead of explaining what it means
- "Add error handling" as prevention, with no specific guardrail
- High/Low confidence with no reason behind it

## Usage Examples
- "Why is this crashing?" + [paste log]
- "Can you analyse this stack trace?"
- "I'm getting this error, what does it mean?"
- "Debug this log for me"
- "What's causing this exception?"
