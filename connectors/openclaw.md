# 🦞 OpenClaw — native skills + the ClawHub pack

OpenClaw reads the same `SKILL.md` standard as Claude Code, so every skill here loads as-is (a skill with no `metadata.openclaw` block is always eligible). Three ways in, plus the publishing runbook.

## Install (pick one)

```bash
# 1. Our installer — copies skill folders into ~/.openclaw/skills
npx pm-claude-skills add --agent openclaw

# 2. OpenClaw's own installer, straight from this repo
openclaw skills install git:mohitagw15856/pm-claude-skills

# 3. One-liner install script
bash <(curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/scripts/openclaw-install.sh)
```

## The dressed export

[`exports/openclaw/`](../exports/openclaw/) carries all 515 skills as flat `<skill>/SKILL.md` folders with OpenClaw-native dressing on top of the canonical body: a top-level `homepage` (shown in the macOS Skills UI) and a `metadata.openclaw` block with a per-bundle emoji. Regenerated from `skills/` on every release — never hand-edited. Helper scripts stay in the source repo; per the [authoring standard](../SKILL-AUTHORING-STANDARD.md), every skill is useful with `SKILL.md` alone.

## Publishing to ClawHub (owner runbook, ~15 min)

ClawHub auth rides a GitHub account, so this is an owner action:

```bash
npm i -g clawhub          # the registry CLI (separate from openclaw itself)
clawhub login             # authenticates via GitHub

# Start curated, not firehose: the skills suited to an always-on personal agent.
# Note: give the CLI ABSOLUTE paths — it resolves relative ones against its own workdir.
clawhub skill publish "$PWD/exports/openclaw/email-triage" --slug email-triage --version 49.0.0 --dry-run
# …review the plan, drop --dry-run, repeat for the starter set below.

# Or wholesale (it scans skill folders and publishes new/changed ones):
clawhub sync --dry-run    # review first — 496 uploads is a statement
clawhub sync --all
```

**✅ Published 2026-07-14** — the starter set is live under [@mohitagw15856 on ClawHub](https://clawhub.ai/mohitagw15856) at v49.0.0: `email-triage`, `morning-intelligence`, `meeting-notes`, `brag-doc`, `stakeholder-update`, `executive-summary`, `competitor-signal-tracker`, `apology-letter`, `budget-builder`, `last-30-days-research`. Install any of them:

```bash
clawhub install @mohitagw15856/email-triage      # or: openclaw skills install @mohitagw15856/email-triage
```

**✅ Tranche 2 published 2026-07-14 (43 skills total live):** the full `pm-decoders` and `pm-simulators` bundles, calculators wave 2 (exit-waterfall, offer-comparison, refinance-breakeven, fire-number), the four v50 singles, and the `pm-lifeadmin` + `pm-personal` bundles — all at v50.0.0, self-contained packages (library-local sections stripped by the export).

**Tranche 3 — publish everything:** the export already carries all **515** skills. Publish the rest and refresh bodies to the current release with `sync` (run from `exports/openclaw/`, or pass `--dir exports/openclaw`):

```bash
clawhub sync --dir exports/openclaw --dry-run   # review the full plan first (515 folders)
clawhub sync --dir exports/openclaw --all \
  --source-repo mohitagw15856/pm-claude-skills --source-commit "$(git rev-parse HEAD)" --source-ref main
```

`clawhub sync` scans the folders and uploads new/changed skills, so it's safe to re-run — existing skills update in place, the rest get created. (Note: `sync` has **no** `--version` flag — new skills publish at `1.0.0`; use `--bump patch|minor|major` for updates. The `--source-*` flags are all-or-nothing: pass repo **and** commit together.)

> **⏳ Rate limit — the big-bang publish takes a few days.** ClawHub caps **new** skills at **200 per 24 hours**. A first full publish of 515 therefore rolls out in daily batches (~200 → ~200 → the rest); once the cap is hit, further publishes return `Rate limit: max 200 new skills per 24 hours` and the CLI retries until it stalls — that's expected, not a hang. **This is automated:** the [`clawhub-sync.yml`](../.github/workflows/clawhub-sync.yml) workflow runs `sync --all` daily (set the `CLAWHUB_TOKEN` repo secret) and keeps going until every skill is live, then no-ops. To do it by hand instead, just re-run the `sync` command above once a day until the dry-run shows nothing new.

**Moderation note:** ClawHub may hold a newly-published skill for review before it goes live (e.g. `insurance-claim`). That's a ClawHub-side queue, not a defect — the skill passes this library's own security scan (`npx skillspec-check skills/insurance-claim` → **L3 Trustworthy**), so it's safe to approve from the [ClawHub dashboard](https://clawhub.ai/mohitagw15856).

**House rule:** publish only from `exports/openclaw/` (the generated, dressed copies), and re-`sync` after each release so ClawHub never serves a stale body.

## Lint before you trust (and before you publish)

ClawHub is open by design — which is why hidden-instruction skills have shown up there. The same validator that gates this library's CI works on any OpenClaw skill, including everything you've installed from others:

```bash
npx skillspec-check ~/.openclaw/skills   # security scan + conformance grade
```

The OpenClaw dialect (`homepage`, `user-invocable`, `metadata.openclaw`) validates cleanly — see the [SkillSpec repo](https://github.com/mohitagw15856/skillspec) and RFC-0003.
