# Contributing an Agent Template

This guide explains how to contribute a new agent template to the pm-claude-skills library.

## What is an agent template?

An agent template is a runnable workflow that combines existing skills, connectors, and subagents into a single end-to-end task. Following the architecture Anthropic introduced for [financial services agent templates](https://www.anthropic.com/news/finance-agents) on May 5, 2026.

Examples of agent templates that would belong in this repo:

- **PM Discovery Agent** — combines discovery-interview-guide + user-interview-synthesis + assumption-mapper with Granola/Notion connectors
- **Legal Contract Review Agent** — combines contract-review + nda-analyser + compliance-checklist with Google Drive connector
- **Sales Pursuit Agent** — combines sales-battlecard + discovery-call-prep + proposal-writer + account-plan with Salesforce/Gong connectors

## Required structure

Every agent template needs these files:

```
templates/your-agent-name/
├── README.md                  # What it does, install, usage
├── AGENT.md                   # Agent definition (system prompt + tool list)
├── orchestrate.sh             # Orchestration script
├── skills/                    # Skills used (linked from main library)
│   ├── README.md
│   └── [skill-name]/SKILL.md
├── subagents/                 # Specialised subagents
│   └── [subagent-name].md
├── connectors/                # Data source configurations
│   ├── README.md
│   └── [system].example.json
├── examples/                  # Input and output examples
│   ├── input-example.md
│   └── output-example.md
└── tests/
    └── smoke-test.md
```

## Naming conventions

- **Folder name**: Use kebab-case, descriptive of the workflow (e.g., `pm-sprint-agent`, `legal-contract-review-agent`, `sales-pursuit-agent`)
- **AGENT.md**: Always exactly this name (with caps) so it's easily findable
- **Subagent files**: kebab-case in `subagents/`, ending in `.md` (e.g., `capacity-analyst.md`)
- **Connector files**: lowercase, with `.example.json` for the template version (e.g., `linear.example.json`)

## Quality bar for new templates

Before submitting a PR, verify:

- [ ] **README.md** explains what the agent does in the first paragraph (no more burying the lede)
- [ ] **AGENT.md** has a complete system prompt with explicit step-by-step instructions
- [ ] **At least 2 skills** from the main library are referenced (otherwise it's just a skill, not a template)
- [ ] **At least 1 subagent** is defined for analysis the skills can't do alone
- [ ] **At least 1 connector** with a working example config
- [ ] **orchestrate.sh** runs without errors in `--dry-run` mode
- [ ] **Smoke test passes** (documented in `tests/smoke-test.md`)
- [ ] **Example input AND example output** are provided
- [ ] **Honest limitations section** in the README — what the agent doesn't do well
- [ ] **No credentials in any committed file** — credentials must come from environment variables

## What makes a good agent template (vs a bad one)

**Good agent templates:**
- Solve a specific, recurring professional workflow end-to-end
- Have clear separation between skills (output formats), connectors (data access), and subagents (specialised analysis)
- Work without modification for a typical team in the target profession
- Include honest limitations and caveats

**Templates that get rejected:**
- Wrap a single skill with no real orchestration ("just call the skill")
- Combine unrelated skills with no coherent workflow
- Hardcode credentials or organisation-specific data
- Don't include working examples
- Don't include subagents (just skills + connectors isn't a template)

## How to submit a PR

1. Fork the [pm-claude-skills repo](https://github.com/mohitagw15856/pm-claude-skills)
2. Create your template in `templates/your-agent-name/`
3. Run the smoke test successfully
4. Commit your changes with a clear message: `feat: add [agent name] template`
5. Open a PR with this description:
   - **What this template does** (1 paragraph)
   - **Which skills it uses** (list)
   - **Which connectors it requires** (list)
   - **Which subagents it defines** (list with one-line descriptions)
   - **Smoke test result** (paste the output)

PRs get reviewed within 5-7 days. The review focuses on the quality bar above, not personal style — clean templates that meet the bar get merged.

## What you get for contributing

- **Credit in the main README** under the contributing section
- **Mention in the next Medium article** in the Claude Skills series
- **Maintainer access** to your template — you can update it directly without needing review for minor changes after the first merge

## Questions?

Open a [discussion](https://github.com/mohitagw15856/pm-claude-skills/discussions) before you start building if your template doesn't fit cleanly into the structure above. It's much easier to align early than to rework after.
