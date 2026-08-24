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

## Decision needed from you
- Default-on (max reach) vs. default-off-with-prompt (max trust)? **Recommendation: default-off with a one-time "enable attribution?" prompt** on first CLI use — it respects the no-telemetry brand and still reaches opt-in users.
- Confirm the sensitive-skill exclusion list before any default-on rollout.
