# Skill-output attribution footer (#3) — proposal & spec

The idea: when a skill produces an artifact, append one tasteful line so the output carries its origin into Slack, docs, and email — seeding organic discovery from the 55.5k who never see GitHub. This is the highest-reach discovery lever, but it touches the *product*, so it must be done carefully.

## The line
```
— generated with a PM Skill · pmskills.link/<skill>
```
Small, single line, at the very end. Never mid-content.

## Hard rules (non-negotiable — protects the "no telemetry" trust)
1. **Opt-out, and easy.** A single flag/env (`PM_SKILLS_ATTRIBUTION=off`) or a documented one-line removal. Default-on is a discussion; if in doubt, **default-off with a one-time prompt to enable**.
2. **Excluded entirely on sensitive skills.** Never on grief, hardship, reentry, health, identity, invisible-illness, or anything a person would be embarrassed to have branded. Maintain an explicit `no-attribution` list in skill frontmatter (`attribution: false`).
3. **No tracking.** The link is a plain URL, not a per-user beacon. It carries no identifiers. This is a signpost, not analytics.
4. **Never inside deliverables meant to look official** — legal letters, medical advocacy docs, etc. Those are the user's, unbranded.

## How to implement (least invasive first)
- **Option A (recommended, low-risk):** add an optional `attribution` field to frontmatter; the export builder and Playground append the line only when `attribution !== false` and the user hasn't opted out. One place to change (`scripts/build-exports.mjs` + Playground render), not 1,153 files.
- **Option B:** a documented convention skills *may* include, opt-in per skill. Lower reach, zero risk.

## Why it's worth the care
An artifact with a footer travels to people who've never heard of the project — it's word-of-mouth at the speed of copy-paste. But a branded grief checklist or debt-collector letter would be a serious misstep, so the exclusion list is the feature, not an afterthought.

## ✅ Implemented (default-off, this is the shipped policy)

Decision taken: **default-off-with-opt-in** — max trust, honors the no-telemetry brand, still reaches opt-in users.

- **`config/attribution.json`** — ships with `"enabled": false`, the footer text, and the sensitive exclusion lists (`excludeBundles`: pm-grief, pm-hardship, pm-reentry, pm-caregiving, pm-invisible-illness, pm-neurodivergent, pm-identity, pm-accessibility, pm-health, pm-crisis, pm-scam-defense; plus `excludeSkills` for individually sensitive ones like medical-bill-decoder, disability-benefit-appeal, identity-theft-recovery).
- **`scripts/attribution.mjs`** — the tested policy module. `attributionFor({skill,bundle})` returns the footer or `''`. Precedence: `PM_SKILLS_ATTRIBUTION=off` (hard opt-out) → `=on` → runtime per-user preference → config default (off). Verified by `node scripts/attribution.mjs --selftest` (9/9 pass), including "excluded bundle never shows footer even when enabled."

**How to turn it on** (when you decide to): flip `enabled` to `true` in the config for a build-time default, or pass a per-user preference at runtime (e.g. a Playground localStorage toggle) — excluded skills stay off automatically either way.

**Integration points (each a 1-liner):**
- Playground render: `output = withAttribution(output, {skill, bundle}, {enabled: userPref})`
- Export build (if ever default-on): same call, keyed off the config.

It ships **off**, so nothing changes for anyone until you choose to enable it — the mechanism and the sensitive-skill safety are in place and tested, ready to flip.
