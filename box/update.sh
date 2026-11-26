#!/usr/bin/env bash
# Update a PM Skills box while it has internet: new skills, pages and model.
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "Run with sudo."; exit 1; }
DIR=/opt/pm-skills
MODEL=$(node -p "require('$DIR/web/box.json').model || 'qwen2.5:3b'" 2>/dev/null || echo qwen2.5:3b)
git -C "$DIR" pull -q
cd "$DIR" && node web/build-skills.mjs >/dev/null
for s in build-skill-pages build-worked-examples build-overlays build-proven build-i18n-desc build-skill-changes; do [ -f "scripts/$s.mjs" ] && node "scripts/$s.mjs" >/dev/null 2>&1 || true; done
echo "{\"box\": true, \"ollama\": \"/ollama\", \"model\": \"$MODEL\"}" > web/box.json
ollama pull "$MODEL"
systemctl reload nginx
echo "Updated. Model: $MODEL"
