#!/usr/bin/env bash
# Run a PM Skill on the files you right-clicked (macOS Finder Quick Action, Linux
# file-manager script). The answer is saved next to each file as
# <file>.<skill>.md and opened. Uses your own key or a free local model, from
#   ~/.config/pm-skills/right-click.env
# (ANTHROPIC_API_KEY=..., or PM_SKILLS_LOCAL_MODEL=qwen2.5:3b for Ollama).
# Set PM_SKILL there to skip the picker and always run one skill.
set -u
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$PATH"
CONF="${XDG_CONFIG_HOME:-$HOME/.config}/pm-skills/right-click.env"
# shellcheck disable=SC1090
[ -f "$CONF" ] && . "$CONF"
CLI="${PM_SKILLS_CLI:-npx -y pm-claude-skills}"
MAX_CHARS="${PM_SKILLS_MAX_CHARS:-60000}"
SKILLS=(summarize-anything explain-simply lease-decoder loan-decoder medical-bill-decoder benefits-decoder insurance-policy-decoder tos-decoder scam-message-decoder pay-stub-decoder clause-explainer executive-summary)

say() {
  if [ "$(uname)" = Darwin ]; then osascript -e 'on run a' -e 'display notification (item 1 of a) with title "PM Skills"' -e 'end run' "$1" >/dev/null 2>&1
  elif command -v notify-send >/dev/null; then notify-send "PM Skills" "$1"
  else echo "PM Skills: $1" >&2; fi
}

pick() {
  [ -n "${PM_SKILL:-}" ] && { echo "$PM_SKILL"; return; }
  local choice=""
  if [ "$(uname)" = Darwin ]; then
    choice=$(osascript -e 'on run a' -e 'set c to choose from list (a as list) with title "PM Skills" with prompt "Run which skill on this file?" default items {item 1 of a}' -e 'if c is false then return ""' -e 'return item 1 of c' -e 'end run' "${SKILLS[@]}" "Another skill…" 2>/dev/null)
    if [ "$choice" = "Another skill…" ]; then
      choice=$(osascript -e 'text returned of (display dialog "Skill name (from the library, for example contract-review):" default answer "" with title "PM Skills")' 2>/dev/null)
    fi
  elif command -v zenity >/dev/null; then
    choice=$(zenity --list --title="PM Skills" --text="Run which skill on this file?" --column=Skill "${SKILLS[@]}" 2>/dev/null)
  elif command -v kdialog >/dev/null; then
    local items=(); for s in "${SKILLS[@]}"; do items+=("$s" "$s"); done
    choice=$(kdialog --title "PM Skills" --menu "Run which skill on this file?" "${items[@]}" 2>/dev/null)
  else
    say "Install zenity or kdialog for the skill picker, or set PM_SKILL in $CONF"; return
  fi
  echo "$choice"
}

# Plain text from the file: text as it is, office files and PDFs when a converter is installed.
text_of() {
  local f="$1"
  case "${f##*.}" in
    txt|md|markdown|csv|tsv|json|eml|log|yml|yaml|xml|html|htm) cat -- "$f" ;;
    pdf) command -v pdftotext >/dev/null && pdftotext -layout -- "$f" - 2>/dev/null ;;
    docx|doc|rtf|odt|pages)
      if [ "$(uname)" = Darwin ] && [ "${f##*.}" != odt ]; then textutil -convert txt -stdout -- "$f" 2>/dev/null
      elif command -v pandoc >/dev/null; then pandoc -t plain -- "$f" 2>/dev/null; fi ;;
    *) file -b --mime-type -- "$f" 2>/dev/null | grep -q '^text/' && cat -- "$f" ;;
  esac
}

[ "$#" -gt 0 ] || { say "Right-click a file and choose PM Skills."; exit 1; }
skill=$(pick)
[ -n "$skill" ] || exit 0
case "$skill" in *[!a-z0-9-]*) say "\"$skill\" is not a skill name."; exit 1 ;; esac

for f in "$@"; do
  [ -f "$f" ] || continue
  tmp=$(mktemp); text_of "$f" | head -c "$MAX_CHARS" > "$tmp"
  if [ ! -s "$tmp" ]; then rm -f "$tmp"; say "Could not read text from $(basename "$f") (for PDFs install poppler, for Word files pandoc)."; continue; fi
  out="${f%.*}.$skill.md"; n=2
  while [ -e "$out" ]; do out="${f%.*}.$skill-$n.md"; n=$((n + 1)); done
  say "Running $skill on $(basename "$f")…"
  # shellcheck disable=SC2086
  if $CLI run "$skill" --input "$tmp" --out "$out" 2>"$tmp.err"; then
    if [ "$(uname)" = Darwin ]; then open -- "$out"; else xdg-open "$out" >/dev/null 2>&1 & fi
  else
    say "$(tail -n 1 "$tmp.err")"
  fi
  rm -f "$tmp" "$tmp.err"
done
