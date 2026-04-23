---
name: debugging-log-analyser
description: "Parse error logs, stack traces, and crash reports into a structured root cause diagnosis. Use when sharing a log, stack trace, error output, or crash dump. Produces a structured diagnosis with probable root cause, affected code path, suggested fix, and next debugging steps. Optimised for Opus 4.7 and newer models."
---

# Debugging Log Analyser Skill

Parses raw error logs, stack traces, and crash reports into a structured diagnosis with probable root cause, affected code path, and specific next steps — no hand-waving.

## Required Inputs

Ask for these if not provided:
- **The log / stack trace / error output** (paste directly or describe the error)
- **Language and framework** (e.g. Node.js + Express, Python + Django, Java Spring, Go)
- **Context** (what the user was doing when the error occurred)
- **Environment** (local dev / staging / production)
- **What they've already tried** (if anything)

## Output Structure

### 1. Error Classification
**Error type:** [Runtime exception / Build error / Config error / Network error / Memory/resource error / Unknown]
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

## Quality Checks
- [ ] Root cause is specific (not "there might be a null pointer issue")
- [ ] At least one concrete code-level fix is suggested
- [ ] Next steps are actionable commands, not vague advice
- [ ] Language-specific idioms are used correctly
- [ ] Prevention is proactive (not just "add error handling")

## Example Trigger Phrases
- "Why is this crashing?" + [paste log]
- "Can you analyse this stack trace?"
- "I'm getting this error, what does it mean?"
- "Debug this log for me"
- "What's causing this exception?"
