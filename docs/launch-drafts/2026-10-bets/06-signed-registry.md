# A signed, hash-pinned registry for AI agent skills

**Status:** Live now (the registry signs on the next deploy).
**Shipped in:** [#355](https://github.com/mohitagw15856/pm-claude-skills/pull/355)

## One line
Install a community skill by name; it is refused unless its file matches the version that was reviewed, and the registry itself is Sigstore-signed.

## Headline
Show HN: npm for AI agent skills, with Sigstore-signed registry and hash-pinned installs

## Post
> Agent skills are prompts with authority, and a skill that changes after review is a supply-chain risk. pm-claude-skills install @namespace/skill checks the SKILL.md against the sha256 pinned when it was reviewed, scans it, and records it in a lockfile; --verify-signature checks the registry's build provenance with gh attestation verify.
>
> https://mohitagw15856.github.io/pm-claude-skills/ · https://github.com/mohitagw15856/pm-claude-skills

## Where
- Hacker News
- r/netsec (as a write-up on skill supply-chain risk)
- Lobsters

## 15-second demo
1. npx pm-claude-skills install @mohitagw15856/podcast-guest-pitch
2. The refusal when a pin does not match
3. gh attestation verify registry.json

## Before you post
One community entry today. Lead with the security model, not the catalogue size.
