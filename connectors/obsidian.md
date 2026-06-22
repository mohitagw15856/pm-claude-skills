# 🔗 Obsidian — skills in your vault

[Obsidian](https://obsidian.md) is a local-first Markdown knowledge base. PM Skills is a
near-perfect fit: the skills **are** Markdown, the artifacts they produce (PRDs, meeting
notes, research, retros) are exactly what lives in a vault, and the whole library is
BYO-key / local-first — the same ethos as Obsidian itself.

Better still, the vault gives the library something it otherwise lacks: **persistent,
linked project state.** Run `prd-template`, then `rice-prioritisation`, then `go-to-market`,
and each output is a note that backlinks to the last — your graph view *is* the workflow.

Three ways in, from drop-in to native.

---

## Tier 0 — drop the skills into your vault (no build)

Every skill is exported as a vault-ready note under
[`exports/obsidian/`](../exports/obsidian/) — frontmatter as Obsidian properties, the skill
body, and a footer that applies it to your current selection.

```bash
# clone, then copy the prompt pack into a folder in your vault
git clone https://github.com/mohitagw15856/pm-claude-skills.git
cp -r pm-claude-skills/exports/obsidian /path/to/YourVault/PM-Skills
```

Now they're browsable, linkable (`[[PRD Template]]`), and searchable. On their own they're
reference notes — to *run* one with AI, use Tier 1.

---

## Tier 1 — run a skill with an AI plugin

The exported notes double as **custom prompts** for the popular Obsidian AI plugins:

- **[Copilot for Obsidian](https://github.com/logancyang/obsidian-copilot)** — point its
  *Custom Prompts* folder at `PM-Skills/`. Select text in any note → run the skill prompt →
  it writes the structured output back. (Copilot uses `{}` for the selection — the export's
  `{{selection}}` footer notes the swap.)
- **[Text Generator](https://github.com/nhaouari/obsidian-textgenerator-plugin)** — the
  notes are valid templates; `{{selection}}` and frontmatter work as-is.
- **Templater** — insert a skill note as a template to scaffold the document structure.

All of these use **your own** model key, configured once in the plugin. Nothing leaves your
machine except the call to your chosen provider.

---

## Tier 2 — live catalogue (always current)

The exported pack is a snapshot. To pull skills fresh (e.g. from a Templater user script or
the *Dataview* JS), hit the read-only REST API or the static catalogue — no auth, open CORS:

```
GET https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills
GET https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills/{name}?format=md
```

No-deploy fallback: `https://mohitagw15856.github.io/pm-claude-skills/skills.json`.

---

## Tie it together — Obsidian ⇄ n8n ⇄ PM Skills

The [Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) Obsidian
plugin exposes your vault over HTTP. Combine the three:

```
n8n (orchestrate) → PM Skills (the structure) → Obsidian vault (system of record)
```

e.g. a schedule trigger in [n8n](n8n.md) fetches `executive-update`, runs it on this week's
metrics, and writes the result straight into a dated note in your vault.

---

## Roadmap — a native plugin

A dedicated `obsidian-pm-skills` community plugin (command palette → *Run PM Skill* on the
current note, with the workflow recipes as multi-note chains) is on the roadmap. The Tier 1
export path above needs no plugin and almost no maintenance, so start there.

## Safety

The skill notes are plain instructions — they don't exfiltrate anything. Your model key
lives only in your AI plugin's settings; the catalogue endpoints are read-only and need no
auth.
