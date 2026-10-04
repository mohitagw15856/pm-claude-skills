---
name: licence-notice-auditor
description: "Use when asked to check a project's licences, audit dependencies before open-sourcing or selling, write a NOTICE file, find licence conflicts, or check whether bundled fonts, images or datasets can be shipped. Produces an inventory of code, data and media dependencies with their licences, flags for conflicts and unclear ownership, and a draft NOTICE.md, with a clear statement that the output is not legal advice."
version: 1.0.0
---

# Licence and Notice Auditor

Before a project is open-sourced, sold or bundled into something else, someone has to know what is inside it and on what terms. The risks are rarely in the main dependencies: they hide in a copied snippet, a bundled font, a dataset scraped years ago, or a screenshot in the docs. This skill inventories everything the project ships, flags conflicts and unclear ownership, and drafts the NOTICE file.

**This output is not legal advice.** It is a structured inventory to take to a qualified lawyer when the stakes are real: a sale, a funding round, a commercial licence, or any conflict flagged red below.

## Required Inputs

Ask for these if not provided:
- **The project's own licence**, or the licence being considered
- **How it is distributed**: source only, binaries, a hosted service, an app store, embedded in hardware
- **Dependency manifests**: package.json, requirements.txt, go.mod, Cargo.toml, or the output of a licence tool
- **Bundled non-code assets**: fonts, icons, images, audio, video, datasets, model weights
- **Copied code**: snippets from blogs, Stack Overflow, other repos, or AI tools

## Output Structure

### 1. Inventory commands
The commands to produce a machine-readable list for the stack, for example `npx license-checker --summary` (Node), `pip-licenses --format=markdown` (Python), `go-licenses report ./...` (Go), `cargo about generate` (Rust), and `reuse lint` for per-file headers.

### 2. Inventory table
| Component | Type (code, font, image, data, model) | Version | Licence (SPDX ID) | Source of truth (file or URL) | How it is used (bundled, linked, dev only) |

Dev-only dependencies are listed but marked, since they are usually not distributed.

### 3. Findings
Each finding rated **red** (conflict or unknown terms on something distributed), **amber** (an obligation to meet, such as attribution or a NOTICE carry-over) or **green** (no action):

| Rating | Component | Issue | Why it matters for this distribution | Suggested action |

Always check for:
- copyleft code (GPL, AGPL, LGPL, MPL) and whether the distribution model triggers its terms (see `references/licence-compatibility.md`)
- Apache-2.0 dependencies with their own NOTICE files, whose contents must be carried over
- components with **no licence**, which means all rights reserved
- non-commercial or no-derivatives terms (for example CC BY-NC) on anything in a commercial product
- fonts, images and datasets with unclear origin or ownership
- copied snippets with no recorded source

### 4. NOTICE.md draft
```markdown
# Notices

[Project] is licensed under [licence]. It includes the following third-party components:

## [Component] [version]
- Licence: [SPDX ID]
- Source: [URL]
- Copyright: [holder and year, as stated by the component]
[Any NOTICE text the component requires, copied verbatim]
```
One section per distributed component that requires attribution, sorted alphabetically.

### 5. Gaps to close
A short checklist of facts only the author can supply (the origin of a font, who drew the logo, where a dataset came from) and the decisions needing a lawyer.

## Quality Checks

- [ ] The not-legal-advice statement appears at the top of the output
- [ ] Every distributed component has an SPDX ID or is marked unknown
- [ ] Every finding is rated red, amber or green with a suggested action
- [ ] Components with no licence are flagged red, not assumed permissive
- [ ] Fonts, images, datasets and copied snippets are covered, not only package dependencies
- [ ] NOTICE text from Apache-2.0 components is carried over verbatim
- [ ] No licence term is stated without naming the source file or URL it came from

## Anti-Patterns

- **Auditing only package.json.** The riskiest items are often the assets.
- **"No licence" read as "free to use".** It means the opposite.
- **Generic compatibility verdicts.** Whether a licence conflicts depends on how the project is distributed; say how.
- **Presenting the audit as clearance.** It finds problems; it does not grant permission.

## Example Trigger Phrases

- "Audit my project's licences before I open-source it."
- "Draft a NOTICE file for this app."
- "Can I ship these fonts and icons in a commercial product?"
- "Check my dependencies for GPL conflicts, we distribute a desktop app."
