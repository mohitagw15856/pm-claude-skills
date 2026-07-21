#!/usr/bin/env bash
# SessionStart hook — orient a fresh session from HANDOFF.md (RFC 0002).
#
# If a HANDOFF.md (or .agent/HANDOFF.md) exists and carries the `agent-handoff v1`
# marker, print it so the session opens already knowing what it was doing.
# Whatever this prints to stdout is added to the model's context at start.
#
# Wire in ~/.claude/settings.json under SessionStart — see hooks/settings.example.json.
# No dependencies. Read-only, always exits 0.
set -euo pipefail

find_handoff() {
  local dir; dir="$(pwd)"
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/HANDOFF.md" ]; then echo "$dir/HANDOFF.md"; return 0; fi
    if [ -f "$dir/.agent/HANDOFF.md" ]; then echo "$dir/.agent/HANDOFF.md"; return 0; fi
    dir="$(dirname "$dir")"
  done
  return 1
}

f="$(find_handoff)" || exit 0
grep -q 'agent-handoff v1' "$f" 2>/dev/null || exit 0

# Surface the updated-timestamp so the model can weigh staleness itself.
updated="$(grep -o 'updated: [^ ]*' "$f" | head -1 | cut -d' ' -f2- || true)"
echo "## Resuming from HANDOFF.md${updated:+ (last updated: $updated)}"
echo "You wrote this handoff at the end of the previous session. Read it, then continue from 'Next action'."
echo
cat "$f"
exit 0
