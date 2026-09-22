#!/usr/bin/env bash
# UserPromptSubmit hook — suggest the right installed PM Skill with ONE typed decision call.
#
# Same contract as suggest-skill.sh (best-effort, non-blocking, prints at most one line),
# but the pick comes from a calibrated decision model (see integrations/jev/README.md)
# instead of a keyword overlap: sub-second, and it reads the skill descriptions the way
# a router should. It FALLS BACK to suggest-skill.sh whenever:
#   - JEV_API_KEY is not set, node is missing, the call times out, or anything errors.
# Nothing about your prompt leaves your machine unless JEV_API_KEY is set.
#
# Wire it in place of suggest-skill.sh in hooks/settings.example.json. Always exits 0.
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
payload="$(cat 2>/dev/null || true)"
fallback() { printf '%s' "$payload" | bash "$HERE/suggest-skill.sh"; exit 0; }
[ -n "${JEV_API_KEY:-}" ] || fallback
command -v node >/dev/null 2>&1 || fallback
out="$(printf '%s' "$payload" | JEV_HOOK_TIMEOUT_MS="${JEV_HOOK_TIMEOUT_MS:-2500}" node "$HERE/../integrations/jev/suggest.mjs" 2>/dev/null)" || fallback
[ -n "$out" ] && printf '%s\n' "$out"
exit 0
