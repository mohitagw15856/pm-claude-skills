#!/bin/bash

# =============================================================================
# create-plugin-json-pm-design-taste.sh
# Run from the ROOT of your pm-claude-skills repo.
# Creates the bundle folders, copies each SKILL.md from skills/ into the
# bundle, and writes .claude-plugin/plugin.json for pm-design-taste.
# Safe to run again: it overwrites the bundle copies with the master copies.
# The marketplace entry is added by scripts/new-bundle.mjs, not by this script.
# =============================================================================

set -e

if [ ! -d "$(pwd)/plugins" ] || [ ! -d "$(pwd)/skills" ]; then
  echo "ERROR: Run from the root of pm-claude-skills"
  exit 1
fi

BUNDLE="plugins/pm-design-taste"

mkdir -p "$BUNDLE/.claude-plugin"

for SKILL in ui-design-pipeline frontend-design-pointer ui-ux-pro-max-pointer emil-design-eng-pointer impeccable-pointer playwright-cli-pointer; do
  if [ ! -f "skills/$SKILL/SKILL.md" ]; then
    echo "ERROR: skills/$SKILL/SKILL.md is missing"
    exit 1
  fi
  mkdir -p "$BUNDLE/skills/$SKILL"
  cp "skills/$SKILL/SKILL.md" "$BUNDLE/skills/$SKILL/SKILL.md"
  echo "  ✓ $SKILL"
done

cat > "$BUNDLE/.claude-plugin/plugin.json" << 'EOF'
{
  "$schema": "https://anthropic.com/claude-code/plugin.schema.json",
  "name": "pm-design-taste",
  "version": "1.0.0",
  "description": "The design taste pack: a five-stage UI pipeline (direction, system, motion, critique, verification) that stops generic AI-looking interfaces, plus pointers to five specialist design skills with install commands and author credit",
  "author": {
    "name": "Mohit Aggarwal",
    "email": "mohit15856@gmail.com"
  },
  "homepage": "https://github.com/mohitagw15856/pm-claude-skills",
  "license": "MIT",
  "keywords": [
    "design",
    "ui",
    "taste",
    "frontend",
    "motion",
    "critique",
    "verification"
  ]
}
EOF

echo "  ✓ $BUNDLE/.claude-plugin/plugin.json"

if [ ! -f "$BUNDLE/THIRD_PARTY.md" ]; then
  echo "WARNING: $BUNDLE/THIRD_PARTY.md is missing. The bundle must ship it."
fi

echo ""
echo "Done. Next: npm run check"
