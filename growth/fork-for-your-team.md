# Fork this for your team — build your company's private skill library

PM Skills is MIT-licensed. Fork it and you have a running, validated skill-library *system* — not just files, but the SkillSpec standard, the CI gates, the multi-tool exports, and the Playground. Point it at your own company's playbooks and every AI tool your team uses gets your house standards for free.

## Why fork instead of starting fresh
- **The standard is done.** [SkillSpec](../SKILLSPEC.md) L3 defines what "good" is; `skillcheck` enforces it in CI so bad skills can't merge.
- **Every tool, one source.** `scripts/build-exports.mjs` renders each skill to Claude, ChatGPT, Gemini, Cursor, Codex + 8 more. Write once, use everywhere.
- **Security by default.** `skill-audit.mjs` scans for prompt-injection and exfiltration in CI.
- **A browser Playground.** `web/` is a static site your team can run internally with no install.

## The 5-step setup
1. **Fork** the repo (or use it as a template) into your org.
2. **Strip to the skeleton:** keep `scripts/`, `web/`, `.github/workflows/`, `SKILLSPEC.md`, `SKILL-AUTHORING-STANDARD.md`. Clear `skills/` and `plugins/` of what you don't want.
3. **Write your first skill** with the [skill-creator](../skills/skill-creator/SKILL.md) skill or by copying `SKILLSPEC.md`'s template — e.g. *your* incident runbook, *your* PRD format, *your* deploy checklist.
4. **Wire a bundle:** `node scripts/new-bundle.mjs --name acme-eng --desc "…" --skills "your-skill" --keywords "…"`.
5. **Run the gate:** `node scripts/skillcheck.mjs && node scripts/build-exports.mjs`. Commit. CI does the rest.

## Great first internal skills
- Your **incident postmortem** format (steal the shape of [incident-postmortem](../skills/incident-postmortem/SKILL.md)).
- Your **PRD / one-pager** house style.
- Your **onboarding runbook** for a new hire's first week.
- Your **code-review checklist** as a skill your agents apply.
- Your **CLAUDE.md** conventions (see [claude-project-setup](../skills/claude-project-setup/SKILL.md)).

## Keep it private, keep it yours
Nothing here phones home — no telemetry, no runtime. A private fork stays private. Pull upstream improvements to the *tooling* without exposing your skills.

> Built something great on top of this? Open a Discussion — we love hearing how teams use it.
