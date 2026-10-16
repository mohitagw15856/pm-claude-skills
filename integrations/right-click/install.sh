#!/usr/bin/env bash
# Install "PM Skills" in the right-click menu (macOS and Linux), for this user only.
#   bash install.sh             # install
#   bash install.sh --uninstall # remove
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/.pm-skills"
CONF_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/pm-skills"
LINUX_TARGETS=("$HOME/.local/share/nautilus/scripts/PM Skills" "$HOME/.local/share/nemo/scripts/PM Skills" "$HOME/.config/caja/scripts/PM Skills")
DOLPHIN="$HOME/.local/share/kio/servicemenus/pm-skills.desktop"

if [ "${1:-}" = "--uninstall" ]; then
  rm -f "$DEST/pm-skill-file.sh" "$DOLPHIN"; for t in "${LINUX_TARGETS[@]}"; do rm -f "$t"; done
  echo "Removed. (Your settings in $CONF_DIR are kept. On macOS, delete the Quick Action in ~/Library/Services.)"; exit 0
fi

mkdir -p "$DEST" "$CONF_DIR"
install -m 755 "$HERE/pm-skill-file.sh" "$DEST/pm-skill-file.sh"
if [ ! -f "$CONF_DIR/right-click.env" ]; then
  cat > "$CONF_DIR/right-click.env" <<'CONF'
# Settings for the PM Skills right-click menu. Pick ONE way to run skills:
# 1. Free, on this computer: install Ollama (https://ollama.com), run: ollama pull qwen2.5:3b
PM_SKILLS_LOCAL_MODEL=qwen2.5:3b
# 2. Or your own Anthropic key (comment out the line above):
# ANTHROPIC_API_KEY=sk-ant-...
# Optional: always run one skill, with no picker.
# PM_SKILL=summarize-anything
CONF
  chmod 600 "$CONF_DIR/right-click.env"
fi

if [ "$(uname)" = Darwin ]; then
  cat <<MSG
Installed the script at $DEST/pm-skill-file.sh and settings at $CONF_DIR/right-click.env.

One last step on macOS (about a minute), to add it to Finder's right-click menu:
  1. Open Automator, choose New Document, then Quick Action.
  2. Set "Workflow receives current" to "files or folders" in "Finder".
  3. Add the "Run Shell Script" action, and set "Pass input" to "as arguments".
  4. Replace its text with:   "\$HOME/.pm-skills/pm-skill-file.sh" "\$@"
  5. Save it as "PM Skills". It's now under right-click, Quick Actions.
MSG
else
  for t in "${LINUX_TARGETS[@]}"; do
    d="$(dirname "$t")"; app="$(basename "$(dirname "$d")")"
    [ -d "$(dirname "$d")" ] || command -v "$app" >/dev/null 2>&1 || continue
    mkdir -p "$d"
    printf '#!/bin/sh\n# Nautilus, Nemo and Caja pass the selection as arguments.\nexec "%s" "$@"\n' "$DEST/pm-skill-file.sh" > "$t"; chmod 755 "$t"
    echo "Added: $t"
  done
  if [ -d "$HOME/.local/share/kio" ] || command -v dolphin >/dev/null 2>&1; then
    mkdir -p "$(dirname "$DOLPHIN")"
    cat > "$DOLPHIN" <<DESK
[Desktop Entry]
Type=Service
MimeType=application/octet-stream;text/plain;application/pdf;
Actions=pmskills
X-KDE-Priority=TopLevel

[Desktop Action pmskills]
Name=Run a PM Skill…
Icon=document-edit
Exec="$DEST/pm-skill-file.sh" %F
DESK
    chmod 755 "$DOLPHIN"; echo "Added: $DOLPHIN"
  fi
  added=$(ls "${LINUX_TARGETS[@]}" "$DOLPHIN" 2>/dev/null | wc -l)
  [ "$added" -gt 0 ] || echo "No supported file manager found (Nautilus, Nemo, Caja, Dolphin). Point yours at: $DEST/pm-skill-file.sh <files>"
  echo "Installed. Right-click a file: Scripts, then PM Skills (Nautilus, Nemo, Caja) or Run a PM Skill (Dolphin)."
  echo "Settings: $CONF_DIR/right-click.env"
fi
