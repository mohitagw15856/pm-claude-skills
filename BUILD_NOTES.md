# Build notes: launch kit, 3D explorer and tech tree

Branch: `feat/launch-kit-explorer-techtree` (local only, not pushed).

## Starting point (Step 0)

| Item | Value at branch point (main `b53851d5`) |
|---|---|
| Skills (live, non-deprecated) | 1,222 |
| Skill folders in `skills/` | 1,234 (12 are deprecated aliases kept so old names resolve) |
| Bundles in `.claude-plugin/marketplace.json` | 140 |
| Marketplace / package / server version | 81.0.0 |

### Conventions followed

- **Two copies per skill**: `skills/<name>/SKILL.md` and `plugins/<bundle>/skills/<name>/SKILL.md`, byte-identical. `scripts/new-bundle.mjs` wires bundles and the marketplace entry; it does not copy `references/` folders, so those are copied by hand.
- **SKILL.md shape**: frontmatter with `name`, `description` and `version`; a short overview; Required Inputs; output sections with exact formats; binary Quality Checks; Anti-Patterns; 3 to 5 Example Trigger Phrases. Descriptions start with what the skill does and include a "Use when asked to..." trigger clause, which is what `scripts/skillcheck.mjs` checks for. The brief asks for descriptions that *start* with the trigger; the new skills do start with "Use when asked to...".
- **plugin.json**: same schema, author, homepage, licence (MIT) and keywords shape as existing bundles. Marketplace entries use category `productivity` like every other bundle.
- **Generated files** are rebuilt, never hand-edited: `web/skills.json` and `web/skills-index.json` (read by the hosted MCP and REST API at `mcp-remote/`), `SKILLS.md`, `DISAMBIGUATION.md`, `exports/`, `integrations/jev/index.json`, `data/risk-tiers.json`, `web/catalog.html`, `web/skill/*`, `conformance/badge.json`.
- **Gates**: `npm run check` plus drift, eval coverage, a11y, web weight, design tokens, skill audit and `check:jev`.
- **Style**: British English, no em dashes, the exact library URL `https://github.com/mohitagw15856/pm-claude-skills`.

### Where things live

- **Voting board**: `SKILL_REQUEST.md` (a hand-kept table; the Votes column is "-" for every row) plus GitHub issues labelled `skill-request` (none open today). `data/skill-requests.json` is machine-readable demand from the gap miner, but every row in it is already covered by a shipped skill.
- **MCP server** (`mcp/server.mjs`): reads `skills/` from the installed package at start-up; no generated index.
- **Hosted MCP and REST API** (`mcp-remote/src/index.js`): fetch `web/skills.json` from GitHub Pages, so rebuilding `web/skills.json` is what "regenerate the index" means here.

## Decisions

1. **Skill descriptions start with the trigger.** The brief's rule and the repo's skillcheck agree; existing skills put the summary first, but nothing requires it.
2. **Anti-Patterns kept.** The brief's structure does not list them; every skill in the repo has them and skillcheck recommends them, so they are added after Quality Checks.
3. **Examples.** The repo keeps few per-skill example files (`examples/` has five). The brief asks for one per new skill, so all 13 get `examples/<name>-example.md`.
4. **Long material goes to `references/`.** Code templates (the MCP server, the Three.js viewer, the data generator) live in `references/` next to the SKILL.md, are copied into the plugin copy, and are tested in this branch.
5. **Version bump.** Minor: 81.0.0 to 81.1.0 in `marketplace.json`, `package.json` and `server.json`, so the drift checks stay consistent. Nothing is published; that happens when you release.
6. **Release notes.** `RELEASE_NOTES.md` as asked, plus a matching `CHANGELOG.md` entry, which is the repo's own record.
7. **Tech tree location.** Built at `site/tech-tree/` as asked. `site/` is the separately deployed Vercel site; GitHub Pages publishes `web/`. So the Pages deploy workflow also copies `site/tech-tree/` to `web/tech-tree/`, and the README explains both routes.
8. **Tech tree build script language.** Node (`scripts/build-tech-tree.mjs`), matching every other build script in `scripts/`.
9. **Tech tree node states.** The voting board has no machine-readable votes, so the page reads `site/tech-tree/votes.json`. The build script seeds it from the open rows of `SKILL_REQUEST.md` (dropping names that have since shipped) and, with `--refresh-votes`, re-counts 👍 reactions on open `skill-request` issues through the public GitHub API. The three highest-voted requests show as "in research"; the rest as "proposed". With every count at zero today, ties keep the board's own order.
10. **Bundle sizes.** pm-oss-launch has nine skills and pm-3d-explorer four, as specified.
11. **README sections.** The new bundles use the README's featured-bundle format (heading, pitch, four skill bullets), with colons where existing sections use em dashes, because the brief bans em dashes in new content.
12. **Neighbouring skills.** Each new description says when to use its nearest existing skill instead (readme-writer, contributor-guide, roadmap-narrative, database-migration-plan, mcp-server-spec, demo-script, clip-factory). readme-benefit-writer and readme-writer are declared as a reviewed pair in `skill-dupes-allow.json`.
13. **Risk tier.** licence-notice-auditor is marked consequential in `config/risk-tiers.json`; the other twelve are informational.
14. **Standalone skills on the tree.** 22 live skills are not in any bundle (a pre-existing gap). Building only from bundles would hide them, so the tree adds a "standalone skills" branch.
15. **Em dashes in generated exports.** The Obsidian export template in `scripts/build-exports.mjs` had one em dash, which every generated Obsidian file carried, including the 13 new ones. Fixed at the source, which regenerates all 1,247 Obsidian exports; the diff there is mechanical.
16. **Pre-existing fixes found on the way.** Two README install commands named the marketplace `pm-skills` (it is `pm-claude-skills`); fixed. Text descriptions copied into the tech tree have em dashes replaced with commas at build time; the source skills are unchanged.
17. **China work in this release.** The ten China skills and ModelScope and Gitee work merged to main after v81.0.0 were never released, so RELEASE_NOTES.md and the CHANGELOG entry for 81.1.0 cover them as well.

## Verification log (Step 5)

| Check | Result |
|---|---|
| Every tracked JSON file parses | 280 of 280 |
| Both SKILL.md copies byte-identical (and references/) | 13 of 13 (`diff -rq`) |
| SKILL.md under 300 lines | 13 of 13 (64 to 84 lines) |
| Description starts with "Use when asked to" | 13 of 13 |
| Three or more trigger phrases | 13 of 13 (four each) |
| Example file per skill | 13 of 13 |
| Skill count in README and marketplace.json equals live folders in `skills/` | 1,235 = 1,235 (1,247 folders, of which 12 are deprecated aliases kept so old names resolve) |
| Bundle count | 142 in marketplace.json and README |
| Tech tree builds | 143 branches, 1,235 researched, 3 in research, 5 proposed |
| Tech tree in a headless browser (Chromium, desktop 1280 px and phone 390 px in dark mode) | Renders 1,256 nodes; search, side panel, copy button, state filters, zoom and drag-pan work; no horizontal scroll; no console errors |
| Viewer template, headless | Demo model and a real GLB (Khronos Duck) load; select, exploded view and quiz work; no console errors |
| MCP server template | Lists, searches and reads; refuses `..`, outward symlinks, other file types and unknown tools; no write or network code |
| Demo data generator | Same seed gives byte-identical files; consistency checks pass |
| Em dashes in files added on this branch | 0 |
| Repo gates | skillcheck, skill-dupes, drift, exports, workflows, exports-lint, i18n parity, eval coverage (340), vendor neutrality, a11y, web weight, design tokens, skill releases, announcement, skill audit, check:jev: all pass |

Problems found and fixed during verification: a spread bug that broke part selection in the viewer; a dark-mode button with 2:1 contrast; the side panel covering the zoom controls; search results in tree order rather than by relevance; three tech-tree colour pairs under 4.5:1; skill-count drift from multi-bundle skills; five descriptions without the word "Produces" that skillcheck expects.
