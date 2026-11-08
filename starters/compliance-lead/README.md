# Compliance / Security Lead starter (PM Skills)

You own trust, audits, and regulated data. This repository is a ready-made workspace: the skills a compliance / security lead reaches for first, installed the same way on every laptop, checked in CI.

## Start

```bash
npx pm-claude-skills sync          # installs the set in .pm-skills.json for Claude Code and Cursor
npx pm-claude-skills lock          # pins the exact skill contents; commit pm-skills.lock
npx pm-claude-skills doctor        # confirms what is installed and what is stale
```

Then open the project in your agent and describe the task; the skill is picked by its description.

## What is in the loadout

| Skill | Does |
|---|---|
| [`soc2-readiness`](https://mohitagw15856.github.io/pm-claude-skills/skill/soc2-readiness.html) | Assess SOC 2 readiness across the Trust Services Criteria and produce a gap remediation plan |
| [`gdpr-compliance`](https://mohitagw15856.github.io/pm-claude-skills/skill/gdpr-compliance.html) | Assess GDPR compliance and build the core records (ROPA, lawful basis, DSAR, DPIA triggers) |
| [`iso-27001-isms`](https://mohitagw15856.github.io/pm-claude-skills/skill/iso-27001-isms.html) | Scope an ISO 27001 ISMS and build the Statement of Applicability across Annex A controls |
| [`vendor-security-review`](https://mohitagw15856.github.io/pm-claude-skills/skill/vendor-security-review.html) | Run a third-party / vendor security review and assign a risk tier with required controls |
| [`data-retention-policy`](https://mohitagw15856.github.io/pm-claude-skills/skill/data-retention-policy.html) | Build a data retention and deletion schedule grounded in legal basis |
| [`security-threat-model`](https://mohitagw15856.github.io/pm-claude-skills/skill/security-threat-model.html) | Write a STRIDE-based threat model for a service or feature |

Plus the `pm-essentials` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).

## Change the set

Edit `.pm-skills.json` (bundles, skills, agents), run `npx pm-claude-skills sync`, then `npx pm-claude-skills lock` and commit both files. CI runs `sync --check` and `lock --check` on every pull request, so the team never drifts.

Browse the whole library: https://mohitagw15856.github.io/pm-claude-skills/ · Source: https://github.com/mohitagw15856/pm-claude-skills
