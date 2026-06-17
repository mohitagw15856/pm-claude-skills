#!/usr/bin/env bash
# One-line installer for OpenClaw. Clones the library (or updates an existing
# clone) and installs all skills where OpenClaw can discover them.
#
#   bash <(curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/scripts/openclaw-install.sh)
#
# Pass extra flags straight through to install.sh, e.g. --link, --target, --dry-run.
set -euo pipefail

AGENT="openclaw"
REPO_URL="https://github.com/mohitagw15856/pm-claude-skills.git"
DEST="${PM_SKILLS_DIR:-$HOME/.pm-claude-skills}"

if [ -d "$DEST/.git" ]; then
  echo "Updating existing clone at $DEST"
  git -C "$DEST" pull --ff-only --quiet || echo "(could not fast-forward; using existing checkout)"
else
  echo "Cloning library into $DEST"
  git clone --depth 1 "$REPO_URL" "$DEST"
fi

exec bash "$DEST/scripts/install.sh" --agent "$AGENT" "$@"
