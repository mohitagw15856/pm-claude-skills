#!/bin/bash
# Run this from your repo root: cd pm-claude-skills && bash setup-marketplace.sh
# This creates the full plugin structure and copies all SKILL.md files into place.

echo "=== Creating plugin bundle directories ==="

# ─────────────────────────────────────────
# BUNDLE 1: pm-essentials (5 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-essentials/.claude-plugin
mkdir -p plugins/pm-essentials/skills/prd-template
mkdir -p plugins/pm-essentials/skills/meeting-notes
mkdir -p plugins/pm-essentials/skills/stakeholder-update
mkdir -p plugins/pm-essentials/skills/user-research-synthesis
mkdir -p plugins/pm-essentials/skills/competitive-analysis

cp skills/prd-template/SKILL.md              plugins/pm-essentials/skills/prd-template/SKILL.md
cp skills/meeting-notes/SKILL.md             plugins/pm-essentials/skills/meeting-notes/SKILL.md
cp skills/stakeholder-update/SKILL.md        plugins/pm-essentials/skills/stakeholder-update/SKILL.md
cp skills/user-research-synthesis/SKILL.md   plugins/pm-essentials/skills/user-research-synthesis/SKILL.md
cp skills/competitive-analysis/SKILL.md      plugins/pm-essentials/skills/competitive-analysis/SKILL.md

echo "✓ pm-essentials done (5 skills)"

# ─────────────────────────────────────────
# BUNDLE 2: pm-discovery (4 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-discovery/.claude-plugin
mkdir -p plugins/pm-discovery/skills/discovery-interview-guide
mkdir -p plugins/pm-discovery/skills/job-story-mapper
mkdir -p plugins/pm-discovery/skills/user-interview-synthesis
mkdir -p plugins/pm-discovery/skills/assumption-mapper

cp skills/discovery-interview-guide/SKILL.md plugins/pm-discovery/skills/discovery-interview-guide/SKILL.md
cp skills/job-story-mapper/SKILL.md           plugins/pm-discovery/skills/job-story-mapper/SKILL.md
cp skills/user-interview-synthesis/SKILL.md   plugins/pm-discovery/skills/user-interview-synthesis/SKILL.md
cp skills/assumption-mapper/SKILL.md          plugins/pm-discovery/skills/assumption-mapper/SKILL.md

echo "✓ pm-discovery done (4 skills)"

# ─────────────────────────────────────────
# BUNDLE 3: pm-planning (7 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-planning/.claude-plugin
mkdir -p plugins/pm-planning/skills/okr-builder
mkdir -p plugins/pm-planning/skills/feature-prioritisation
mkdir -p plugins/pm-planning/skills/roadmap-presentation
mkdir -p plugins/pm-planning/skills/pricing-strategy
mkdir -p plugins/pm-planning/skills/rice-prioritisation
mkdir -p plugins/pm-planning/skills/roadmap-narrative
mkdir -p plugins/pm-planning/skills/rice-impact-matrix

cp skills/okr-builder/SKILL.md               plugins/pm-planning/skills/okr-builder/SKILL.md
cp skills/feature-prioritisation/SKILL.md    plugins/pm-planning/skills/feature-prioritisation/SKILL.md
cp skills/roadmap-presentation/SKILL.md      plugins/pm-planning/skills/roadmap-presentation/SKILL.md
cp skills/pricing-strategy/SKILL.md          plugins/pm-planning/skills/pricing-strategy/SKILL.md
cp skills/rice-prioritisation/SKILL.md       plugins/pm-planning/skills/rice-prioritisation/SKILL.md
cp -r skills/rice-prioritisation/scripts     plugins/pm-planning/skills/rice-prioritisation/ 2>/dev/null || true
cp skills/roadmap-narrative/SKILL.md         plugins/pm-planning/skills/roadmap-narrative/SKILL.md
cp skills/rice-impact-matrix/SKILL.md        plugins/pm-planning/skills/rice-impact-matrix/SKILL.md

echo "✓ pm-planning done (7 skills)"

# ─────────────────────────────────────────
# BUNDLE 4: pm-delivery (7 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-delivery/.claude-plugin
mkdir -p plugins/pm-delivery/skills/sprint-planning
mkdir -p plugins/pm-delivery/skills/technical-spec-template
mkdir -p plugins/pm-delivery/skills/ab-test-planner
mkdir -p plugins/pm-delivery/skills/go-to-market-planner
mkdir -p plugins/pm-delivery/skills/product-launch-checklist
mkdir -p plugins/pm-delivery/skills/sprint-brief
mkdir -p plugins/pm-delivery/skills/retro-analysis

cp skills/sprint-planning/SKILL.md           plugins/pm-delivery/skills/sprint-planning/SKILL.md
cp -r skills/sprint-planning/scripts         plugins/pm-delivery/skills/sprint-planning/ 2>/dev/null || true
cp skills/technical-spec-template/SKILL.md   plugins/pm-delivery/skills/technical-spec-template/SKILL.md
cp skills/ab-test-planner/SKILL.md           plugins/pm-delivery/skills/ab-test-planner/SKILL.md
cp skills/go-to-market-planner/SKILL.md      plugins/pm-delivery/skills/go-to-market-planner/SKILL.md
cp skills/product-launch-checklist/SKILL.md  plugins/pm-delivery/skills/product-launch-checklist/SKILL.md
cp skills/sprint-brief/SKILL.md              plugins/pm-delivery/skills/sprint-brief/SKILL.md
cp skills/retro-analysis/SKILL.md            plugins/pm-delivery/skills/retro-analysis/SKILL.md

echo "✓ pm-delivery done (7 skills)"

# ─────────────────────────────────────────
# BUNDLE 5: pm-analytics (3 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-analytics/.claude-plugin
mkdir -p plugins/pm-analytics/skills/data-analysis-standard
mkdir -p plugins/pm-analytics/skills/retention-analysis
mkdir -p plugins/pm-analytics/skills/product-health-analysis

cp skills/data-analysis-standard/SKILL.md   plugins/pm-analytics/skills/data-analysis-standard/SKILL.md
cp skills/retention-analysis/SKILL.md       plugins/pm-analytics/skills/retention-analysis/SKILL.md
cp skills/product-health-analysis/SKILL.md  plugins/pm-analytics/skills/product-health-analysis/SKILL.md

echo "✓ pm-analytics done (3 skills)"

# ─────────────────────────────────────────
# BUNDLE 6: pm-strategy (6 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-strategy/.claude-plugin
mkdir -p plugins/pm-strategy/skills/competitor-signal-tracker
mkdir -p plugins/pm-strategy/skills/competitive-intelligence-monitor
mkdir -p plugins/pm-strategy/skills/stakeholder-influence-mapper
mkdir -p plugins/pm-strategy/skills/strategic-narrative-generator
mkdir -p plugins/pm-strategy/skills/executive-update
mkdir -p plugins/pm-strategy/skills/ambiguity-resolver

cp skills/competitor-signal-tracker/SKILL.md          plugins/pm-strategy/skills/competitor-signal-tracker/SKILL.md
cp skills/competitive-intelligence-monitor/SKILL.md   plugins/pm-strategy/skills/competitive-intelligence-monitor/SKILL.md
cp skills/stakeholder-influence-mapper/SKILL.md       plugins/pm-strategy/skills/stakeholder-influence-mapper/SKILL.md
cp skills/strategic-narrative-generator/SKILL.md      plugins/pm-strategy/skills/strategic-narrative-generator/SKILL.md
cp skills/executive-update/SKILL.md                   plugins/pm-strategy/skills/executive-update/SKILL.md
cp skills/ambiguity-resolver/SKILL.md                 plugins/pm-strategy/skills/ambiguity-resolver/SKILL.md

echo "✓ pm-strategy done (6 skills)"

# ─────────────────────────────────────────
# BUNDLE 7: pm-advanced (4 skills)
# ─────────────────────────────────────────
mkdir -p plugins/pm-advanced/.claude-plugin
mkdir -p plugins/pm-advanced/skills/ai-product-canvas
mkdir -p plugins/pm-advanced/skills/multi-source-signal-synthesiser
mkdir -p plugins/pm-advanced/skills/experiment-designer
mkdir -p plugins/pm-advanced/skills/design-handoff-brief

cp skills/ai-product-canvas/SKILL.md                 plugins/pm-advanced/skills/ai-product-canvas/SKILL.md
cp skills/multi-source-signal-synthesiser/SKILL.md   plugins/pm-advanced/skills/multi-source-signal-synthesiser/SKILL.md
cp skills/experiment-designer/SKILL.md               plugins/pm-advanced/skills/experiment-designer/SKILL.md
cp skills/design-handoff-brief/SKILL.md              plugins/pm-advanced/skills/design-handoff-brief/SKILL.md

echo "✓ pm-advanced done (4 skills)"

# ─────────────────────────────────────────
# BUNDLE 8: pm-rituals (1 skill)
# ─────────────────────────────────────────
mkdir -p plugins/pm-rituals/.claude-plugin
mkdir -p plugins/pm-rituals/skills/pm-weekly-review

cp skills/pm-weekly-review/SKILL.md  plugins/pm-rituals/skills/pm-weekly-review/SKILL.md

echo "✓ pm-rituals done (1 skill)"

# ─────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────
echo ""
echo "=== All done! 33 skills across 8 plugin bundles ==="
echo ""
echo "Next steps:"
echo "  1. Copy marketplace.json   → .claude-plugin/marketplace.json"
echo "  2. Copy plugin.json        → plugins/<bundle>/.claude-plugin/plugin.json  (for each bundle)"
echo "  3. git add . && git commit -m 'add marketplace plugin structure' && git push"
echo "  4. Test in Claude Code:"
echo "     /plugin marketplace add mohitagw15856/pm-claude-skills"
echo "     /plugin install pm-essentials@pm-claude-skills"
