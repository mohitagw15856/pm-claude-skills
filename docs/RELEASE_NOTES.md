# v84.1.0: Fieldwork and sponsors

**1,390 skills across 171 bundles** (from 1,374 across 167 in v84.0.0).

This release adds sixteen skills, tools that check work without calling a model, more ways to install, and a published sponsorship offer. It also tidies how the repository is built and checked.

## New bundles

| Bundle | Skills |
|---|---|
| **pm-fieldwork** | verified-security-audit, live-competitor-capture, product-knowledge-graph, failure-pattern-library, design-doc-review, scope-cutter, app-store-submission-guard, demo-video-kit, svg-diagram-studio, stitch-design-handoff, equity-research-note, current-practice-check |
| **pm-seo** | technical-seo-audit, keyword-cluster-map, with the existing seo-content-brief, schema-markup, programmatic-seo and aeo-optimizer |
| **pm-investor** | earnings-call-summary, portfolio-review, equity-research-note, with the existing stock-snapshot, investing-policy-statement and annual-report-tutor |
| **pm-daily-ten** | The ten skills behind the README example and the slash commands |

Three skills ship tested helper scripts: `demo_video.py` (captions and ffmpeg commands from a shot list), `knowledge_graph.py` (a document graph from Markdown links and terms) and `capture_log.py` (a dated evidence log). The investing skills work only from figures you supply and are not financial advice.

## Tools

- **`npx pm-claude-skills lint <file.md>`**: a deterministic linter for finished documents. No model call. Also available as a GitHub Action at `.github/actions/doclint`.
- **MCP tools `list_calculators` and `run_calculator`**: run a bundled Python calculator with no shell, in a temporary folder, with a time limit. Arguments that point outside that folder are refused.
- **Four subagents**: `product-director` (coordinates the others), `research-lead`, `data-analyst` and `seo-lead`, and the `/ship-with-director` command.

## More ways to install

- Cursor plugin marketplace manifests in `.cursor-plugin/`.
- `npx skills add mohitagw15856/pm-claude-skills` through the skills CLI.
- Two n8n workflow templates in `integrations/n8n/`.
- One file of working rules, `templates/pm-rules/PM-RULES.md`.
- A page for annotating a draft and sending the comments back, `annotate.html`.

## Sponsorship

`SPONSORS.md` lists six placements, audience figures with their sources, terms and the rules for a labelled sponsored skill. Every README language has a sponsor section, and the site has a printable sponsor page. `scripts/sponsor-report.mjs` produces the monthly report for a sponsor.

## For contributors

- `npm run check` runs every gate and reports all failures. `npm run regen` runs every generator and syncs bundle copies. `scripts/sync-counts.mjs` updates skill and bundle counts in docs.
- 220 bundle copies under `plugins/` had drifted from `skills/` and are now synced, with a gate to keep them so.
- 43 eval cases added for the most-viewed and production-tier skills that had none.
- Five workflows became two. Ten root documents moved to `docs/`. Six demo recordings moved to the `media` branch.
- `data/skill-home.json` pins a skill's home bundle, so wiring it into a new bundle does not move its export path.

## What is not verified

- The n8n templates and Cursor manifests follow the published formats but have not been run in n8n or Cursor.
- The app store rejection-pattern list gives no guideline section numbers and has not been reviewed against the current rules.
- The sponsor sections in six README languages are machine translations awaiting review.
- The weekly data workflow has not yet run on its schedule.

## Upgrade

```bash
npx pm-claude-skills@latest add
```

Full detail is in the [changelog](../CHANGELOG.md).
