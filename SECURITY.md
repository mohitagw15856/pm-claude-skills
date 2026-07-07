# Security Policy

## Overview

This repository contains Claude Skill files — plain markdown instruction files that teach Claude how to perform professional tasks — plus the open-source tooling around them: a CLI, MCP servers (local and a hosted Cloudflare Worker), validators, and a browser playground. No accounts, no databases of user content, no telemetry of content.

Security matters here in three ways: **skill file safety**, **prompt injection risks**, and the **integrity of the install chain**.

## What this plugin does / does NOT do (trust at a glance)

> A plain-language summary for anyone installing or reviewing this plugin (e.g. the
> Anthropic plugin directory). The whole library is open-source and auditable.

**It does:**
- Ship **plain-markdown `SKILL.md` instruction files** + a handful of **pure-stdlib Python helper scripts** (calculators/validators in `scripts/` folders).
- Run those scripts **only when you explicitly invoke them**, with **no third-party dependencies** and **no network access**.

**It does NOT:**
- ❌ Bundle or require any opaque binary, closed-source component, or auto-updating remote code.
- ❌ Send your inputs, outputs, prompts, or API keys anywhere — there is no telemetry of content. (The optional hosted MCP / playground are separate, open-source, and send your prompt only to the model provider *you* choose, with *your* key.)
- ❌ Execute code, make network calls, or touch your filesystem on its own from a skill.
- ❌ Contain prompt-injection, jailbreak, or data-exfiltration instructions — CI enforces this.

**Automated guardrails:** every change runs **[SkillCheck](.github/workflows/skillcheck.yml)** (structure/safety lint) and a **[security audit](.github/workflows/skill-audit.yml)** in CI; the **[`skill-security-auditor`](skills/skill-security-auditor/)** skill scans any `SKILL.md` for injection / exfiltration / privilege-escalation patterns. MIT licensed.

## The hosted pieces & the chain of trust

- **Keys never leave your browser/machine.** The playground sends prompts only to the provider you select; keys live in `localStorage` and never touch our worker. The one exception is the **sponsored free trial**, which uses the maintainer's key server-side, is hard-capped, and records **counts only, never content**.
- **The chain of trust for installed skills** ([details](community/README.md#-trust--integrity--the-full-chain)): security-pattern scanning on everything `pm-claude-skills install` fetches from anywhere → optional **sha256 content pinning** in the community registry → an install **lockfile** with `pm-claude-skills verify` drift/tamper detection → **npm provenance** on all published packages.
- **Bypass = vulnerability.** If you get malicious phrasing past `skillspec-check`, the registry scan, or the install scanner, that's a security report — same channel below, credited unless you prefer otherwise.

## Supported Versions

| Version | Supported |
|---|---|
| Latest release | ✅ Active |
| Previous minor | ✅ Security fixes only |
| Older | ❌ Please upgrade |

Because skills are plain markdown, "support" means we review and correct any reported
safety issue (prompt injection, unsafe instructions) in the listed versions.

## Skill File Safety

All skills in this repo are reviewed before merging to ensure they:

- Do not contain instructions designed to manipulate Claude into ignoring its guidelines
- Do not attempt prompt injection (e.g. hidden instructions to override system behaviour)
- Do not instruct Claude to request, store, or transmit personal or sensitive data
- Do not contain malicious commands disguised as skill instructions
- Do not include hardcoded credentials, API keys, or personally identifiable information

**If you are installing skills from this repo:** the skills themselves are plain markdown instruction files. They do not execute code, make network requests, or access your file system on their own. Review any skill file before installing if you have concerns.

**A few skills ship optional helper scripts** (in a `scripts/` folder, e.g. the sprint, RICE, and customer-health calculators). These are pure Python standard-library programs — no third-party dependencies, no network calls, no file writes outside what you pass them. They only run when you explicitly invoke them. Read any script before running it, exactly as you would any code from the internet.

## Reporting a Vulnerability

If you discover a skill file in this repo that contains malicious instructions, a prompt injection attempt, or any content that could cause harm to users of Claude Code, please report it **privately** before raising a public issue.

**How to report:**

Email: **mohit15856@gmail.com**
Subject line: `[SECURITY] pm-claude-skills — <brief description>`

Include:
- The skill file path (e.g. `plugins/pm-gtm/skills/go-to-market/SKILL.md`)
- A description of the issue
- Why you believe it is a security concern

**Response time:** You will receive an acknowledgement within 48 hours and a resolution or update within 7 days.

Please do not open a public GitHub Issue for security vulnerabilities — use the email above. Public disclosure before a fix is in place puts other users at risk.

## Community Contributions

All pull requests adding new skill files are reviewed for the safety criteria listed above before merging. If you are submitting a skill, ensure it:

- Only contains instructions relevant to the stated professional workflow
- Does not include any attempt to override Claude's built-in guidelines
- Does not ask Claude to collect or relay user data

See [CONTRIBUTING.md](CONTRIBUTING.md) for full contribution guidelines.
