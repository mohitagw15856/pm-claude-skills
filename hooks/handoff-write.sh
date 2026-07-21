#!/usr/bin/env bash
# SessionEnd / PreCompact hook — remind the agent to write HANDOFF.md (RFC 0002).
#
# This hook can't author the note itself (only the model has the session's state),
# so it emits the instruction + the fixed template. On SessionEnd Claude Code runs
# this and the model writes/overwrites HANDOFF.md using the session-handoff skill's
# discipline: state and reasons, not a transcript, ~5% of the session.
#
# Wire in ~/.claude/settings.json under SessionEnd and/or PreCompact.
# No dependencies. Always exits 0.
set -euo pipefail

target="HANDOFF.md"
[ -d ".agent" ] && target=".agent/HANDOFF.md"

cat <<EOF
## Before this session ends: update $target

Overwrite $target (do not append — it holds *current* state, not a log) using the
session-handoff discipline. Keep it to ~5% of this session. Fixed template:

# HANDOFF
<!-- agent-handoff v1 · updated: $(date -u +%Y-%m-%dT%H:%M:%SZ) · by: claude-code -->

## Decisions (with reasons)
- <what was decided · why · what was rejected and why>

## Live state
- <files changed (paths, not diffs) · current values · verified vs assumed>

## In flight
- <each half-done item: exact position + the next physical action>

## Landmines
- <the one-liners that save the next session an hour>

## Next action
- <the single first thing the resuming session does>

Rules: decisions carry their reasons; state is positions not narrative; in-flight items
get physical next actions; skip refetchable facts (file contents reload for free — reasons don't).
EOF
exit 0
