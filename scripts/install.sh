#!/usr/bin/env bash
# Unified skill installer for SKILL.md-native agents (and Cursor rules).
#
# Native agents (Claude Code, Hermes, OpenAI Codex, OpenClaw) read the same
# SKILL.md standard — installing is just placing the skill folders where the
# agent discovers them. Cursor uses .mdc rule files (from exports/cursor/).
#
# Usage:
#   ./scripts/install.sh --agent claude
#   ./scripts/install.sh --agent codex --link
#   ./scripts/install.sh --agent cursor --target ./.cursor/rules
#   ./scripts/install.sh --list
#
# Flags:
#   --agent <name>   claude | hermes | codex | openclaw | cursor
#   --target <path>  override the default install directory
#   --link           symlink instead of copy (native agents only; updates follow git pull)
#   --dry-run        print actions without writing
#   --list           list supported agents and their default targets
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$REPO_DIR/skills"

AGENT=""; TARGET=""; LINK=0; DRYRUN=0

default_target() {
  case "$1" in
    claude)   echo "$HOME/.claude/skills" ;;
    hermes)   echo "$HOME/.hermes/skills" ;;
    codex)    echo "$HOME/.codex/skills" ;;
    openclaw) echo "$HOME/.openclaw/skills" ;;
    cursor)   echo "$PWD/.cursor/rules" ;;
    windsurf) echo "$PWD/.windsurf/rules" ;;
    aider)    echo "$PWD/.aider/skills" ;;
    *) return 1 ;;
  esac
}

list_agents() {
  echo "Supported agents and default targets:"
  for a in claude hermes codex openclaw cursor windsurf aider; do
    printf "  %-9s %s\n" "$a" "$(default_target "$a")"
  done
  echo
  echo "Native SKILL.md agents: claude, hermes, codex, openclaw (install skill folders)."
  echo "Cursor (.mdc) / Windsurf (.md) install generated rule files; Aider installs"
  echo "conventions you load with 'aider --read'."
  echo "Targets are sensible defaults — override with --target if your setup differs."
}

while [ $# -gt 0 ]; do
  case "$1" in
    --agent)   AGENT="${2:-}"; shift 2 ;;
    --target)  TARGET="${2:-}"; shift 2 ;;
    --link)    LINK=1; shift ;;
    --dry-run) DRYRUN=1; shift ;;
    --list)    list_agents; exit 0 ;;
    -h|--help) sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

if [ -z "$AGENT" ]; then echo "Error: --agent is required (see --list)." >&2; exit 2; fi
if ! default_target "$AGENT" >/dev/null 2>&1; then
  echo "Error: unknown agent '$AGENT'. Run --list." >&2; exit 2
fi
[ -n "$TARGET" ] || TARGET="$(default_target "$AGENT")"

if [ ! -d "$SKILLS_DIR" ]; then
  echo "Error: cannot find skills/ at $SKILLS_DIR (run from a clone of the repo)." >&2; exit 1
fi

place() { # place <src> <dest>
  local src="$1" dest="$2"
  if [ "$DRYRUN" = 1 ]; then echo "  would install $(basename "$src") -> $dest"; return; fi
  rm -rf "$dest"
  if [ "$LINK" = 1 ]; then ln -s "$src" "$dest"; else cp -R "$src" "$dest"; fi
}

count=0
if [ "$DRYRUN" = 1 ]; then echo "[dry-run] Installing skills for '$AGENT' into $TARGET";
else echo "Installing skills for '$AGENT' into $TARGET"; mkdir -p "$TARGET"; fi

if [ "$AGENT" = "cursor" ] || [ "$AGENT" = "windsurf" ] || [ "$AGENT" = "aider" ]; then
  # Install generated rule/conventions files (flattened) into the target dir.
  EXPORT_DIR="$REPO_DIR/exports/$AGENT"
  EXT='*.md'; [ "$AGENT" = "cursor" ] && EXT='*.mdc'
  if [ ! -d "$EXPORT_DIR" ]; then
    echo "Error: $EXPORT_DIR missing. Run: node scripts/build-exports.mjs" >&2; exit 1
  fi
  while IFS= read -r f; do
    base="$(basename "$f")"
    [ "$base" = "README.md" ] && continue   # skip the generated index
    if [ "$DRYRUN" = 1 ]; then echo "  would install $base -> $TARGET/$base";
    else cp "$f" "$TARGET/$base"; fi
    count=$((count + 1))
  done < <(find "$EXPORT_DIR" -name "$EXT" | sort)
else
  # Native SKILL.md agents: place each skill folder.
  for skill in "$SKILLS_DIR"/*/; do
    [ -f "$skill/SKILL.md" ] || continue
    name="$(basename "$skill")"
    place "${skill%/}" "$TARGET/$name"
    count=$((count + 1))
  done

  # Claude Code also gets subagents and slash commands (siblings of skills/).
  if [ "$AGENT" = "claude" ]; then
    claude_root="$(dirname "$TARGET")"   # ~/.claude
    for kind in agents commands; do
      src="$REPO_DIR/$kind"
      [ -d "$src" ] || continue
      dest="$claude_root/$kind"
      [ "$DRYRUN" = 1 ] || mkdir -p "$dest"
      for f in "$src"/*.md; do
        base="$(basename "$f")"
        [ "$base" = "README.md" ] && continue
        if [ "$DRYRUN" = 1 ]; then echo "  would install $kind/$base -> $dest/$base";
        else cp "$f" "$dest/$base"; fi
        count=$((count + 1))
      done
    done
  fi
fi

echo
if [ "$DRYRUN" = 1 ]; then
  echo "[dry-run] Would install $count item(s) for '$AGENT'."
else
  echo "Installed $count item(s) for '$AGENT'."
  case "$AGENT" in
    cursor)   echo "Cursor will pick up the rules in $TARGET on its next session." ;;
    windsurf) echo "Windsurf will pick up the rules in $TARGET on its next session." ;;
    aider)    echo "Load any of them with:  aider --read $TARGET/<skill>.md" ;;
    *) echo "Restart $AGENT — it auto-discovers SKILL.md skills in $TARGET by their description." ;;
  esac
fi
