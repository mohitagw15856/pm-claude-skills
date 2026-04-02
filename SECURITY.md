# Security Policy

## Overview

This repository contains Claude Skill files — plain markdown instruction files that teach Claude how to perform professional tasks. There are no backend services, APIs, authentication systems, or databases in this repo.

That said, security matters here in two specific ways: **skill file safety** and **prompt injection risks**.

## Supported Versions

| Version | Supported |
|---|---|
| v4.0.0 (latest) | ✅ Active |
| v3.0.0 | ✅ Security fixes only |
| < v3.0.0 | ❌ No longer supported |

## Skill File Safety

All skills in this repo are reviewed before merging to ensure they:

- Do not contain instructions designed to manipulate Claude into ignoring its guidelines
- Do not attempt prompt injection (e.g. hidden instructions to override system behaviour)
- Do not instruct Claude to request, store, or transmit personal or sensitive data
- Do not contain malicious commands disguised as skill instructions
- Do not include hardcoded credentials, API keys, or personally identifiable information

**If you are installing skills from this repo:** skills are plain text markdown files. They do not execute code, make network requests, or access your file system on their own. Review any skill file before installing if you have concerns.

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
