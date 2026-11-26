# /.well-known/agent-skills.json

**Status:** draft 0.1, open for comment. Anyone may publish or read this file; nothing here is specific to this library.

An agent that lands on a website has no standard way to ask "which skills do you publish, and how do I know I got the real one?" `robots.txt` and `llms.txt` describe pages for crawlers and readers. This file describes **installable skills** for agents: one JSON document at a fixed path, listing each skill with a link to its `SKILL.md` and the SHA-256 that file should have.

## Where it lives

`https://<host>/.well-known/agent-skills.json`

A site served under a path (such as a GitHub Pages project site) can publish it at `<base>/.well-known/agent-skills.json` and link it from its home page:

```html
<link rel="agent-skills" type="application/json" href=".well-known/agent-skills.json">
```

This library publishes it at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json, rebuilt on every deploy.

## Format

```json
{
  "spec": "agent-skills-discovery/0.1",
  "publisher": { "name": "Example Co", "url": "https://example.com", "repo": "https://github.com/example/skills" },
  "license": "MIT",
  "count": 1,
  "skills": [
    {
      "name": "weekly-report",
      "title": "Weekly Report",
      "summary": "Write a weekly status report with results, risks and next steps.",
      "skill_md": "https://example.com/skills/weekly-report/SKILL.md",
      "sha256": "9f2c…64 hex characters…",
      "zip": "https://example.com/skill-zip/weekly-report.zip",
      "page": "https://example.com/skill/weekly-report.html"
    }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `spec` | yes | `agent-skills-discovery/<major>.<minor>`. A reader ignores fields it does not know and refuses a major version it does not know. |
| `publisher.name`, `publisher.url` | yes | Who publishes the skills. `url` is https. |
| `publisher.repo`, `license`, `version`, `install` | no | Source repository, licence, release, and install commands for common tools. |
| `count` | no | When present, equals the length of `skills`. |
| `skills[].name` | yes | Kebab-case, at most 64 characters, unique in the file. Matches the `name` in the SKILL.md frontmatter. |
| `skills[].summary` | yes | One or two sentences on what the skill does (may be empty). |
| `skills[].skill_md` | yes | https URL of the raw `SKILL.md`. |
| `skills[].sha256` | yes | Lowercase hex SHA-256 of the exact bytes at `skill_md`. |
| `skills[].zip`, `page`, `title`, `bundle`, `tier`, `updated` | no | A folder-at-root ZIP for upload to claude.ai, a human page, and catalogue metadata. |

`skills` is sorted by `name`, so the file is deterministic and diffs cleanly.

## How an agent uses it

1. Fetch the file, check `spec`, pick skills by `name`, `title` and `summary`.
2. Fetch `skill_md` and **refuse it if its SHA-256 differs from `sha256`**. A mismatch means the file changed after the index was built, or someone is serving a different file.
3. Confirm the frontmatter `name` matches, then install or load it as usual.

The hash proves the skill matches the index, not that the index is trustworthy. For that, publish the index from a source the reader already trusts, or sign it (this library signs its release bundle and registry with GitHub build provenance).

## Validate a file

The validator works on any site's file:

```bash
node scripts/check-well-known.mjs https://example.com/.well-known/agent-skills.json --verify 20
```

`--verify N` fetches N of the listed `SKILL.md` files and checks their hashes and frontmatter names. The validator is part of this repository; it has no dependencies beyond Node.js 20.

## Relation to other formats

- **Agent Skills (`SKILL.md`)** defines one skill. This file lists many and says where to fetch them.
- **`llms.txt`** is a reading guide for language models. This file is a machine index of installable skills.
- **MCP** serves tools over a live connection. This file is static and needs no server.
