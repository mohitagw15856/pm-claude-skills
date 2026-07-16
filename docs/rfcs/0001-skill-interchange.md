# RFC-0001: Agent Skill Interchange (.skillpack)

- **Status:** draft | comment-window (until 2026-09-01)
- **Affects:** schema | process | distribution

## Summary

Define a small, provider-neutral **interchange format** for moving a *collection*
of skills between agent systems — a `.skillpack`: a directory or archive holding a
`skillpack.json` manifest plus the referenced `SKILL.md` files. SkillSpec already
standardises **one** skill's frontmatter and body; there is no standard envelope
for shipping **many** together with provenance and integrity. Without one, every
consumer (an IDE plugin, a competing playground, a registry, an enterprise catalog)
reinvents "how do I import a bundle of skills and trust what I got." This RFC
proposes that envelope and a JSON Schema for it.

## Motivation

The library already exports skills into a dozen provider-native shapes
(`exports/aider/…`, `exports/kilocode/…`, Cursor, Windsurf, ChatGPT, etc.) and
publishes a read API. But each export is *lossy and one-way*: it flattens a
skill into a target tool's file and drops the metadata a receiving system needs —
which version, from which commit, under which license, with what integrity hash.

Concretely: a team wants to take fifteen skills from this repo and load them into
their internal agent. Today they either scrape the API skill-by-skill or copy
files by hand, with no manifest, no checksums, and no attribution trail. A
`.skillpack` makes that a single verifiable artifact: *here are 15 skills, here's
where each came from, here's the hash, here's the license*.

This matters most for the ecosystem goal: if skills are to move **between**
vendors (not just out of this one), the transport needs to be a spec, not a
convention that lives in one exporter.

## The change

Add `spec/skill-interchange.schema.json` (JSON Schema 2020-12) defining the
manifest, and adopt the following container convention.

**Before:** no interchange envelope; per-tool exporters only.

**After:** a `.skillpack` is a directory (or a `.zip`/`.tar.gz` of one) containing:

```
skillpack.json            # the manifest (validates against the schema)
skills/
  executive-update/SKILL.md
  prd-template/SKILL.md
  …
```

Manifest shape (abridged):

```json
{
  "spec": "agent-skill-interchange/0.1",
  "pack": { "name": "pm-core", "version": "1.0.0", "license": "MIT",
            "generator": "pm-skills-export/1.2.0", "generated": "2026-07-16T00:00:00Z" },
  "integrity": "required",
  "compatibility": { "runtimes": ["claude", "openai", "gemini", "mcp"], "minSkillspec": "1.0" },
  "skills": [
    { "name": "executive-update", "description": "…Use when… Produces…",
      "version": "1.2.0", "path": "skills/executive-update/SKILL.md",
      "format": "skillmd", "sha256": "…64 hex…",
      "provenance": { "source": "https://github.com/…", "commit": "…", "registry": "pm-claude-skills" } }
  ]
}
```

**Conformance rules (normative):**

1. A consumer MUST reject a manifest whose `spec` it does not implement.
2. Each `skills[].path` MUST resolve within the pack (no traversal outside it).
3. When `integrity` is `"required"`, a consumer MUST verify every `sha256` and
   reject the pack on any missing or mismatched hash.
4. Consumers MUST ignore unknown keys in `metadata`/`pack`/`compatibility`
   (forward compatibility).
5. `skills[].name` MUST be unique within a pack.
6. Each carried `SKILL.md` SHOULD itself validate against SkillSpec
   (`skill.schema.json`); `compatibility.minSkillspec` declares the floor.

The format is deliberately **provider-neutral**: `compatibility.runtimes` is an
advisory hint, not a gate. A `.skillpack` carries the *skill*, and a skill's body
is the system prompt any provider can consume.

## What breaks

Nothing existing. This is additive: a new schema file and a new optional export
shape. No currently-conformant `SKILL.md` changes level; SkillSpec is unchanged.
The existing per-tool exporters continue to work; `.skillpack` sits alongside them
as the *lossless, verifiable* option. A follow-up (out of scope here) would add an
exporter (`--format skillpack`) and an importer/validator.

## Security considerations

- **Path traversal:** rule 2 forbids `path` escaping the pack root; validators
  MUST canonicalise and check.
- **Integrity vs. authenticity:** `sha256` proves the file matches the manifest,
  not who wrote it. Optional `signatures[]` (ed25519/sigstore over the
  canonicalised manifest) provide authenticity for registries that require it.
- **Untrusted bodies:** a `SKILL.md` is instructions for a model. Importers that
  auto-run skills MUST treat pack contents as untrusted input and apply the same
  prompt-safety review they would to any third-party skill.

## Alternatives considered

- **Do nothing / keep per-tool exporters.** Rejected: lossy, one-way, no
  provenance or integrity; blocks skills moving *between* vendors.
- **Reuse an existing package format (npm/OCI).** Overkill and tool-coupled; a
  skillpack must be readable by a human and a small validator with no runtime.
  Nothing stops a registry from *wrapping* a skillpack in OCI later.
- **One-file bundle (all skills inlined in the manifest).** Rejected as the
  default: inlining loses the ability to hash and diff individual SKILL.md files
  and bloats the manifest. `format: text` inline entries remain possible for
  tiny packs, but the file-per-skill layout is the norm.
- **Fold this into SkillSpec.** Rejected: SkillSpec is about *one* skill;
  conflating the transport envelope with the unit spec couples two independently
  versioned things.

## Reference

Schema: [`spec/skill-interchange.schema.json`](../../spec/skill-interchange.schema.json).
Unit spec it builds on: [`spec/skill.schema.json`](../../spec/skill.schema.json) (SkillSpec v1.0).
