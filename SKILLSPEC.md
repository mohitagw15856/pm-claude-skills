# SkillSpec v1.0 — a formal specification for `SKILL.md` professional skills

> **The standard now has its own home: [github.com/mohitagw15856/skillspec](https://github.com/mohitagw15856/skillspec)** (RFC governance, validator, schema — see [docs/FOUNDATION.md](docs/FOUNDATION.md)). This file is the pinned copy of the version this repo implements: **SkillSpec 1.0**. Spec changes land there as RFCs, not here.

**Status:** v1.0 (stable core, forward-compatible extensions) · **Reference implementation:** [`scripts/skillcheck.mjs`](scripts/skillcheck.mjs) · **Machine-readable schema:** [`spec/skill.schema.json`](spec/skill.schema.json)

`SKILL.md` files are becoming a cross-tool standard for giving AI agents professional judgment. This document specifies the format precisely enough that **any runtime** (Claude Code, Hermes, a computer-use agent, an A2A service) and **any registry** can consume, validate, and version skills interoperably. The [pm-claude-skills library](https://github.com/mohitagw15856/pm-claude-skills) is the reference corpus; [SKILL-AUTHORING-STANDARD.md](SKILL-AUTHORING-STANDARD.md) remains the human *style guide* — this document is the *contract*.

The key words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are to be interpreted as in RFC 2119.

---

## 1. Package layout

A *skill package* is a directory:

```
<skill-name>/
  SKILL.md            REQUIRED  the skill definition
  scripts/            OPTIONAL  deterministic helper programs
  references/         OPTIONAL  deeper method material a runtime may load on demand
  templates/          OPTIONAL  fill-in artifacts for human use
```

- The directory name MUST equal the frontmatter `name`.
- `SKILL.md` MUST be self-sufficient: a runtime that reads only that file MUST be able to produce a useful result. Everything else is enhancement.
- A skill MUST NOT require network access, package installation, or credentials to be *loaded*. (Its instructions MAY tell an agent to use tools the agent already has.)

## 2. Frontmatter

`SKILL.md` MUST begin with YAML frontmatter containing exactly the required fields and optionally the reserved ones:

| Field | Req | Rule |
|---|---|---|
| `name` | MUST | kebab-case `[a-z0-9]+(-[a-z0-9]+)*`, equal to the directory name, unique within a registry |
| `description` | MUST | One string containing three parts, in order: **what** it does (one clause) · **"Use when …"** trigger phrases in the user's vocabulary · **"Produces …"** the concrete artifact. ≤ 3 sentences plus at most one cross-reference sentence ("For X use `other-skill` instead."). |
| `version` | MAY | SemVer (see §6). Absent means `0.x` (unversioned). |
| `license` | MAY | SPDX identifier. Absent means the containing repository's license. |
| `metadata` | MAY | Open object for registry extensions. Runtimes MUST ignore keys they don't understand. |

The `description` is the *routing surface*: it is all a model sees when deciding whether to load the skill. Registries SHOULD index it verbatim.

## 3. Body sections

Sections are markdown `##` headings. Order SHOULD follow the list; recognition MUST be by heading text, not position.

| Section | Level (see §4) | Contract |
|---|---|---|
| `# Title` + one-line summary | 1 | Restates the value in plain language |
| `## What This Skill Produces` | 2 | Bullet list of deliverables |
| `## Required Inputs` | 2 | Inputs to request when missing; a skill MUST instruct the model to ask for or explicitly label assumed inputs, never silently invent them |
| `## Output Format` | 2 | A concrete template such that two runs are recognisably the same product |
| `## Quality Checks` | 3 | Checklist the output must pass before hand-off |
| `## Anti-Patterns` | 3 | Explicit "Do not …" rules |
| `## Execution` | optional | Machine-actionable block for tool-using / computer-use agents (§5) |
| Framework / method sections | optional | The rubric, formula, or procedure the skill applies |

## 4. Conformance levels

A validator MUST classify a skill at the highest level whose requirements it meets. Registries SHOULD display the level.

- **L1 — Loadable.** Valid frontmatter (§2), a title, non-empty body.
- **L2 — Structured.** L1 + `What This Skill Produces`, `Required Inputs`, `Output Format`.
- **L3 — Trustworthy.** L2 + `Quality Checks` and `Anti-Patterns`, and the safety rules in §7.
- **L4 — Verified.** L3 + at least one published evaluation case and a published score from a disclosed harness (this repo: [`evals/`](evals/), scored on the [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html)).

`scripts/skillcheck.mjs` is the reference L1–L3 validator; the eval harness ([`evals/run-evals.mjs`](evals/run-evals.mjs)) is the reference L4 harness.

## 5. Execution blocks (computer-use / tool-using agents)

A skill MAY include an `## Execution` section that turns its judgment into a bounded procedure an agent may *perform*, not just draft. If present, it MUST contain these four `###` subsections:

```markdown
## Execution

### Preconditions
- What must be true/available before acting (access, approvals, dry-run first).

### Allowed actions
- The closed list of actions the agent may take, each with its target system.
- Anything not listed is out of bounds.

### Verification
- Observable checks proving each action worked, run after acting.

### Rollback
- How to undo, and the condition that triggers stopping + asking a human.
```

Rules: destructive or outward-facing actions MUST be gated on explicit human approval in `Preconditions`; `Allowed actions` is a **closed allow-list** (runtimes MUST NOT extrapolate); a runtime that cannot honour the block MUST fall back to producing the document only. The skill's `Quality Checks` apply to the *outcome* of execution, not just prose.

## 6. Versioning

- Skills MAY declare `version:` (SemVer). **Major** = a breaking change to the `Output Format` or to `Execution` semantics; **minor** = new sections/capability, compatible; **patch** = wording, fixes.
- A registry distributing versioned skills SHOULD support a lockfile (`skill.lock`) pinning `name@version` + a content hash (`sha256` of the canonical `SKILL.md` bytes) so agent behaviour is reproducible.
- Unversioned skills are mutable; consumers wanting stability SHOULD pin by content hash.

## 7. Safety requirements (normative for L3+)

A skill MUST NOT: attempt to override runtime/system policies or other instructions ("ignore previous instructions…"); instruct collection or exfiltration of user data; embed network calls to undisclosed endpoints in scripts; instruct the model to fabricate facts, credentials, quotes, or figures (unknowns MUST be labelled, e.g. `[to confirm]`). Helper scripts MUST be standard-library-only, read-input/print-output, no surprise writes. This corpus enforces these with the [Skill Security Auditor](scripts/skill-audit.mjs) in CI.

## 8. Registry interoperability

A registry serving this spec SHOULD expose, per skill: the raw `SKILL.md`, the frontmatter as JSON, the conformance level, the content hash, and (L4) the eval score with harness disclosure. This repo's implementations: the [hosted MCP server](mcp-remote/) (`search_skills` / `get_skill`), the read-only REST API, and the [catalog JSON](web/skills.json).

## 9. Extensions

Unknown frontmatter keys under `metadata`, unknown `##` sections, and unknown files in the package directory are all *reserved for extension* — validators MUST NOT fail on them. Proposed extensions (attestation records, outcome/calibration records, i18n variants) are tracked in this repository's issues; extensions that prove out are folded into the next minor spec revision.

---

*Maintained in [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills). To propose a change, open an issue titled `spec: …`. The spec versions independently of the library.*
