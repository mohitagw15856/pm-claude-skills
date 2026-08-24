# Registry optimization — rank higher, convert better everywhere (#9, #10, #11, #12)

You're distributed across many registries but they don't reinforce each other. Consolidate them into one funnel and optimize each for search.

## #11 — Cross-link matrix (make them one project, not five islands)
Every listing should link **home** (repo + Playground) and mention the others.

| Registry | Package/id | Must link to | Fix if missing |
|---|---|---|---|
| clawhub | pm-claude-skills | repo, Playground, newsletter | Add CTA block (`clawhub-listing.md`) |
| npm | `pm-claude-skills` | repo homepage, `keywords`, PyPI, MCP | Set `homepage`, `bugs`, `keywords` in package.json |
| PyPI | `pm-skills` | repo, npm | Set `project_urls` in pyproject |
| MCP registry | `pm-claude-skills-mcp` | repo, Playground | Confirm description + repo link |
| Anthropic plugin directory | pm-skills | repo | Keep count/desc current |
| Docker (ghcr) | image | repo | README label |
| Hugging Face | dataset | repo | Card links |

**Action:** one pass to confirm each entry's homepage/description points home and names the sibling channels.

## #10 — Keyword SEO (people search tasks, not "PM skills")
Add these across npm `keywords`, PyPI, and registry tags — they map to real searches:
```
claude, claude-code, agent-skills, chatgpt, gemini, cursor, codex, mcp,
prompt-library, lease-decoder, postmortem, prd, incident-response,
salary-negotiation, adhd, executive-function, debt, budgeting,
caregiving, grief, resume, productivity, open-source
```
Rule: the description's **first 10 words** should contain the highest-value search term ("Agent Skills for Claude, ChatGPT & Gemini…"), because registries weight the lead.

## #9 — Publish bundles as individually installable units
A monolith ranks for one query. Bundles rank for many:
- `pm-hardship` surfaces for "debt / benefits / bankruptcy"
- `pm-reentry` for "record / expungement"
- `pm-thinking` for "brainstorm / decision / red-team"
- `pm-focus` for "ADHD / executive function"

**Where the hub/registry supports sub-packages or tags**, expose each bundle as its own discoverable entry pointing back to the monorepo. This multiplies your search surface without splitting maintenance (they stay generated from the same source).

## #12 — Own every publisher profile
Verify the publisher account on each registry with consistent branding and a repo link (see `clawhub-listing.md` checklist). An anonymous-looking publisher converts far worse than a named, verified one with 1,153 skills behind it.

## Measurement
Track rank + downloads per registry monthly (a row in the impact dashboard, `impact-dashboard.md`) so you know which optimizations moved the needle.
