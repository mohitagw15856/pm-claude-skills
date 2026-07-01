#!/usr/bin/env bash
# Package the Alfred workflow into a distributable .alfredworkflow file (a zip).
# Usage: ./build.sh   →   dist/PM-Skills.alfredworkflow
set -euo pipefail
cd "$(dirname "$0")"

mkdir -p dist
OUT="dist/PM-Skills.alfredworkflow"
rm -f "$OUT"

# Include the workflow definition, the script filter, an optional icon, and the readme.
FILES=(info.plist filter.cjs)
[ -f icon.png ] && FILES+=(icon.png)
[ -f README.md ] && FILES+=(README.md)

zip -j "$OUT" "${FILES[@]}"
echo "Wrote $OUT"
echo "Double-click it (or drag into Alfred) to install."
