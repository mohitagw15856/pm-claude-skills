# 🌐 The Community Skill Registry — publish your skill, keep your repo

npm for skills: your `SKILL.md` stays in **your repo**, an entry in [`registry.json`](registry.json) makes it **discoverable and installable** through the whole pm-skills toolchain — the hosted [REST API](../mcp-remote/#rest-api-for-n8n-lovable-make-any-http-tool) (`/v1/community`), the MCP server's `search_skills`, and the CLI. Namespaced as `you/skill-name`, so nothing collides with the curated library or anyone else.

> **Trust model, stated plainly:** registry entries are validated **structurally** on every PR (SkillSpec conformance + a security-pattern scan of the fetched file) and re-scanned periodically — but they are *not* eval-scored or hand-reviewed like the [core library](../skills/). Consumers see the `community:` prefix wherever these skills surface. This registry supersedes the old link-only directory in [COMMUNITY-SKILLS.md](../COMMUNITY-SKILLS.md), which remains as a showcase list.

## Publish (one PR)

1. Your skill lives in a **public GitHub repo** as a `SKILL.md` following [SkillSpec](../SKILLSPEC.md) — check it locally first:
   ```bash
   npx pm-claude-skills validate ./path/to/SKILL.md   # or: node scripts/skillcheck.mjs from a clone
   ```
2. Add one object to the `skills` array in [`registry.json`](registry.json):
   ```json
   {
     "name": "yourhandle/your-skill-name",
     "description": "Copied from your SKILL.md frontmatter (kept in sync by CI).",
     "repo": "https://github.com/yourhandle/your-repo",
     "path": "skills/your-skill-name/SKILL.md",
     "ref": "main"
   }
   ```
   - `name` MUST be `<your-github-handle>/<skill-name>`; the skill name must match the file's frontmatter `name`.
   - `path` is the file path within your repo; `ref` a branch or tag (tag = your consumers get stability).
3. Open the PR. CI ([`registry-check`](../.github/workflows/registry-check.yml)) fetches your file from `raw.githubusercontent.com`, validates SkillSpec conformance (L1 minimum, level reported), scans for the security patterns the core library bans (prompt-injection phrasing, undisclosed network calls, data-exfiltration instructions), and verifies your handle matches the repo owner. Green check → a maintainer merges → you're live everywhere within minutes.

## Consume

```bash
npx pm-claude-skills install @yourhandle/your-skill-name                      # by name: hash-checked against its reviewed pin
npx pm-claude-skills install @yourhandle/your-skill-name --verify-signature   # and verify the registry's signature first (needs gh)
```

```bash
curl https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/community                 # list
curl https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/community/yourhandle/your-skill-name   # one skill, fetched live from the author's repo
```

Over MCP, `search_skills` results include community entries marked `community: true` — agents and the playground can distinguish curated from community at a glance.

## House rules

- **You own it, you maintain it.** Broken fetch (404/moved) for >30 days → the entry is removed (re-add anytime).
- **Same safety bar as the core library** ([SKILLSPEC §7](../SKILLSPEC.md)): no instruction-override attempts, no undisclosed data collection, no fabrication instructions. The scan is automated *and* adversarially updated; evasion = permanent removal.
- **Namespace = your GitHub handle.** Verified by CI against the repo owner; org repos may use the org name.
- Duplicate-ish skills are fine (competition is good); typosquatting curated skill names is not.

## 🔏 Trust & integrity — the full chain

Five layers, all verifiable, none requiring you to trust us:

1. **Security scan** — every registry entry (and everything `pm-claude-skills install` fetches from *any* repo) is checked against the banned patterns: prompt-injection phrasing, unvetted network calls, data-exfiltration instructions, embedded credentials. Flagged = never installed.
2. **Content pinning (required)** — every skill entry carries `"sha256": "sha256:<hash of your SKILL.md>"` (`shasum -a 256 SKILL.md`). CI verifies the fetched file matches it, and `install @you/skill` refuses any file that no longer matches the reviewed pin. To ship a change, update the pin in a PR so it is reviewed again. Pin plus a tag `ref` means consumers can't be served something nobody reviewed.
3. **Install lockfile** — the installer records the hash of every installed file in `.pm-skills-lock.json`; `npx pm-claude-skills verify` detects any post-install drift or tampering before an agent runs it.
4. **A signed registry** — on every deploy, the registry is published at [`registry/registry.json`](https://mohitagw15856.github.io/pm-claude-skills/registry/registry.json) and signed with GitHub's Sigstore-backed build provenance (`scripts/build-registry-bundle.mjs`). Prove a copy came from this repo's main branch with `gh attestation verify registry.json -R mohitagw15856/pm-claude-skills`, or pass `--verify-signature` to `install`.
5. **Package provenance** — npm packages published from the CI workflow carry [provenance](https://docs.npmjs.com/generating-provenance-statements) (verify with `npm audit signatures`). Releases published by hand from a laptop do not; the release bundle and SBOM on the site are always signed (see `npx pm-claude-skills verify --release`).

## 🪑 Packs — benches & scenarios (the low-bar contribution)

Beyond skills, the registry accepts **packs** — JSON character content for the arenas:

- **Bench packs** (`type: bench`) — a Boardroom executive panel: `{"name":"…","for":"…","executives":[{id,emoji,name,role,color,lens,bias}×2-8]}`. See [`web/benches.json`](../web/benches.json) for the built-in examples (fundraising, healthcare, seed-stage).
- **Scenario packs** (`type: scenario`) — a Gym negotiation world: `{"you":"…","them":"…","stakes":"…"}`.

Add to the `packs` array in [`registry.json`](registry.json):
```json
{ "name": "yourhandle/med-device-bench", "type": "bench",
  "repo": "https://github.com/yourhandle/your-repo", "path": "packs/med-device-bench.json", "ref": "main" }
```
CI validates structure (2-8 complete executives / required scenario fields) and runs the security scan on the fetched JSON. Writing a great *character* is a 20-minute contribution — a great skill is a day. Start here.
