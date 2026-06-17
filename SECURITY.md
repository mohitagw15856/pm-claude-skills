# Security Policy

## Overview

This repository contains Claude Skill files — plain markdown instruction files that teach Claude how to perform professional tasks. There are no backend services, APIs, authentication systems, or databases in this repo.

That said, security matters here in two specific ways: **skill file safety** and **prompt injection risks**.

## Supported Versions

| Version | Supported |
|---|---|
| v16.x (latest) | ✅ Active |
| v14.x – v15.x | ✅ Security fixes only |
| < v14.0.0 | ❌ No longer supported |

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
