---
trigger: model_decision
description: "Keep Claude Code sessions productive across resets with output filtering, session logging, and auto-resume. Use when starting a long or complex coding session, when previous sessions lost context mid-task, or when you need Claude to resume exactly where it left off after a reset. Produces a session.log at the project root, filtered command output that preserves context, and automatic resume of in-progress tasks after any reset."
---

# Context Mode Skill

Fix the two session killers that end most Claude Code sessions in under 30 minutes: context bloat from raw command output, and memory loss after a reset.

Context Mode runs three systems simultaneously to keep sessions alive:

- **Output Filtering** — strips verbose command output before it enters context
- **Session Log** — writes a running log of everything that happened
- **Auto-Resume** — reads the log on reset and picks up exactly where you left off

> **Credit:** Inspired by a skill from Nate Herk's YouTube channel — adapted and extended for this library.

---

## Required Inputs

No inputs required. Context Mode activates on command.

Optional: user can specify a custom log file path if they don't want `session.log` in the project root.

---

## How Context Mode Works

### Part 1 — Output Filtering

The problem: every time Claude Code runs a command, the full raw output enters the context window. A single `npm install` can dump hundreds of lines. A test suite run? Thousands. Within 30 minutes, the context is full of noise and Claude resets.

The fix: before any command output enters context, filter it to the useful summary only.

**What gets kept:**
- Last 10 lines of stdout
- Every line containing `error`, `warn`, `fail`, `exception`, `traceback`, or `fatal` (case-insensitive)
- The exit code
- A one-line summary of what the command did and whether it succeeded

**What gets discarded:**
- Middle section of long stdout (replaced with `[... N lines of output truncated ...]`)
- Progress bars, download indicators, verbose install logs
- Repeated identical lines (deduplicated)

**Filtering summary format:**

```
COMMAND: [command run]
STATUS:  [exit code — success / failed]
SUMMARY: [one sentence: what happened]
ERRORS:  [any error/warn lines — or "none"]
TAIL:    [last 10 lines of stdout]
```

---

### Part 2 — Session Log

Claude maintains a running log file at `[project root]/session.log`. This file is written after every significant action and is the source of truth for resuming after a reset.

**Session log format:**

```
SESSION LOG
===========
Started:    [timestamp]
Branch:     [current git branch]
Directory:  [working directory]

FILES EDITED
────────────
[timestamp] [file path] — [one-line description of what changed]

COMMANDS RUN
────────────
[timestamp] [command] — [outcome: success / failed — brief reason]

TASKS IN PROGRESS
─────────────────
[ ] [Task description — what's been done so far and what's left]
[x] [Completed task]

LAST USER PROMPT
────────────────
[The most recent instruction from the user, verbatim]

LAST ACTION TAKEN
─────────────────
[What Claude did last, in one sentence]
```

**Log update rules:**
- Write to `session.log` after every file edit
- Write to `session.log` after every command run
- Update "Tasks in Progress" when a task is started, progressed, or completed
- Always overwrite "Last User Prompt" and "Last Action Taken" with the current values — don't append, replace

---

### Part 3 — Resume on Reset

When a new Claude session starts, the first action is:

1. Check for `session.log` in the project root
2. If found, read it and announce the resume:

```
Resuming session.

Branch:          [branch]
Last working on: [last task in progress]
Files edited:    [list from session log]
Tasks pending:   [incomplete tasks]
Last prompt:     "[last user prompt]"

Continuing from where we left off.
```

3. Continue with the next logical step — don't ask "what should I do?" — check the task list and carry on

If no `session.log` exists, start fresh and initialise the log.

---

## Activation Response

When the user triggers Context Mode, respond with:

```
Context Mode active.

Session log initialised at: [absolute path to session.log]
Output filtering:           enabled
Auto-resume:                enabled

I'll maintain your session state across resets. Long sessions won't lose context.
```

Then immediately initialise `session.log` with the current timestamp, branch, and directory.

---

## Output Structure

### On activation

```
Context Mode active.
Session log initialised at: [path]
Output filtering: enabled
Auto-resume: enabled
I'll maintain your session state across resets. Long sessions won't lose context.
```

### On command execution (filtered output format)

```
COMMAND: npm test
STATUS:  exit 1 — failed
SUMMARY: 47 tests passed, 3 failed in auth.test.ts
ERRORS:  Error: Expected 200, received 401 (line 84)
         Error: Token not found in response (line 112)
TAIL:
  ✓ login with valid credentials (23ms)
  ✓ logout clears session (11ms)
  ✗ refresh token after expiry
  ...
```

### On reset / new session (resume announcement)

```
Resuming session.

Branch:          feature/auth-refresh
Last working on: Fixing token refresh logic in auth.service.ts
Files edited:    src/auth/auth.service.ts, src/auth/auth.test.ts
Tasks pending:   [ ] Fix failing test on line 112
                 [ ] Run full test suite once fix is applied
Last prompt:     "The refresh token test is still failing — look at the 401 handling"

Continuing from where we left off.
```

---

## CLAUDE.md Installation Text

After activating Context Mode for the session, provide the user with the exact text to add to their `CLAUDE.md` to make it permanent across all sessions:

````
```
## Context Mode

Context Mode is always active in this project.

### Output Filtering
Before any command output enters context, filter it to:
- Last 10 lines of stdout
- Any lines containing: error, warn, fail, exception, traceback, fatal (case-insensitive)
- Exit code
- One-line summary of what the command did

Use this format for filtered output:
COMMAND: [command]
STATUS:  [exit code — success/failed]
SUMMARY: [one sentence]
ERRORS:  [error lines or "none"]
TAIL:    [last 10 lines]

### Session Log
Maintain a running session log at ./session.log. Write to it after every file edit and every command run. Track: files edited, commands run, tasks in progress, last user prompt, last action taken. Format defined in Context Mode skill.

### Auto-Resume
At the start of every new session, check for ./session.log. If it exists, read it and announce the resume state. Continue from the last task in progress without asking for instructions.
```
````

Tell the user: "Add this to your CLAUDE.md and Context Mode will be active permanently for this project — even after you close and reopen the session."

---

## Quality Checks

- [ ] `session.log` was initialised immediately on activation (not deferred)
- [ ] Log path shown to user is the absolute path, not relative
- [ ] Output filtering is applied on the very next command run — not just announced
- [ ] Filtered output format includes: command, status, summary, errors, and tail — all five fields
- [ ] Session log tracks all four categories: files edited, commands run, tasks in progress, last prompt
- [ ] Resume announcement reads the actual log contents — not a generic template
- [ ] On resume, Claude continues the work without prompting the user for instructions
- [ ] CLAUDE.md installation text was offered after activation
- [ ] Log update rule is clear: "Last User Prompt" and "Last Action Taken" replace previous values, not append

---

## Anti-Patterns

- Logging verbatim command output instead of a filtered summary (defeats the context savings)
- A resume announcement from a generic template that ignores what the log actually says
- Appending to "Last User Prompt" / "Last Action Taken" instead of replacing them (the log bloats)
- Activating silently without offering the CLAUDE.md install, so it doesn't persist across sessions
- On resume, asking the user what to do instead of continuing the in-progress task

## Example Trigger Phrases

- "Enable context mode"
- "Turn on context mode for this session"
- "Activate long session mode"
- "I keep losing context — fix it"
- "Set up session logging"
- "Keep track of what you've done so you can resume after a reset"
- "Enable output filtering to save context"
- "Set up auto-resume so we don't lose our place"
