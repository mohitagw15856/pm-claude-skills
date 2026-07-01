# Contributing to pm-claude-skills

Thank you for wanting to contribute. This repo grows through community submissions — every profession added makes it more useful for everyone.

---

## What We're Looking For

Good skills have three things in common:

1. **They solve a recurring workflow** — not a one-off task. If you do this thing more than once a week and it follows a consistent structure, it's probably a good skill candidate.
2. **They have a clear trigger** — Claude needs to know when to activate the skill. The `description` in your frontmatter is what Claude reads to decide if your skill is relevant. Make it specific.
3. **They produce structured, useful output** — the output should be something you'd actually use at work, not a generic response.

---

## 🔁 Structure-checked on PR, eval-scored after merge

This library is a [benchmark](https://mohitagw15856.github.io/pm-claude-skills/benchmark.html) as much as a collection. When you open a PR that adds or changes a skill, the [**Skill PR Check**](.github/workflows/skill-pr-check.yml) automatically validates the SKILL.md **structure** (`skillcheck`) — this must pass — and posts a comment listing the changed skills and whether each has an eval case.

Skills are **not scored on the PR** (so opening one never spends tokens). **Eval scoring is decided later, after merge**, via the manual [**Evaluate selected bundles**](.github/workflows/eval-bundles.yml) Action — maintainers choose when and what to score, and the result lands on the public [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html).

So: **include a case in [`evals/cases.json`](evals/cases.json)** with your skill — it's what lets the skill be scored later (aim for **≥ 4.0/5** on the rubric: structure · completeness · usefulness · grounding). Prefer a guided start? Use the [submit-a-skill form](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=submit-skill.yml).

## ⚡ Fast path: scaffold it in one command

Don't hand-build the folder structure — the repo ships scaffolders that generate a **SkillCheck-passing** starting point so you fill in the blanks instead of remembering the whole layout. A PR is ~10 minutes, not an afternoon.

**A single skill:**

```bash
npm run new-skill -- --name churn-forecaster --description "Forecast account churn. Use when… Produces…"
# or run it with no args for interactive prompts:
npm run new-skill
```

This creates `skills/churn-forecaster/SKILL.md` pre-filled with the required frontmatter and section headings (`Required Inputs`, `Output Structure`, `Quality Checks`, `Anti-Patterns`, `Example Trigger Phrases`). Edit the `<!-- TODO -->` bits, then jump to **Step 5** to validate.

**A whole bundle** (plugin.json + `plugins/<bundle>/skills/**` copies + a marketplace entry, in one step):

```bash
npm run new-bundle -- --name pm-foo --desc "What the bundle is" --skills skill-one,skill-two,skill-three
```

Existing skills named in `--skills` are *wired* into the bundle; names that don't exist yet get a passing *stub* scaffolded for you.

**After either command**, regenerate the catalog + exports and validate:

```bash
node web/build-skills.mjs && node scripts/build-exports.mjs   # or: npm run check
```

Prefer to do it by hand? The full manual walkthrough is below.

---

## How to Submit a Skill

### Step 1: Fork the repo

Click **Fork** in the top right of the GitHub repo. This creates your own copy.

### Step 2: Clone your fork

git clone https://github.com/YOUR_USERNAME/pm-claude-skills.git
cd pm-claude-skills


### Step 3: Create your skill folder

Skills live in the `skills/` directory. Create a folder named after your skill using lowercase and hyphens:

mkdir skills/your-skill-name


**Naming rules:**
- Lowercase only
- Hyphens between words (no underscores, no spaces)
- Descriptive but concise: `legal-contract-review` not `skill-for-reviewing-legal-contracts`

### Step 4: Create your SKILL.md

Every skill needs exactly one file: `SKILL.md` (uppercase, `.md` extension).

**Minimum required structure:**

---
name: your-skill-name
description: "One sentence. Use when [trigger condition]. Produces [output description]."
---

# Skill Title

[Your skill instructions here]


**The description field is the most important part.** It's what Claude reads (~100 tokens) to decide if your skill is relevant. Write it like this:

✅ Good: `"Write structured incident postmortems. Use when asked for a postmortem, RCA, incident report, or P1/P2 review. Produces a blameless postmortem with timeline, root cause, impact, and action items."`

❌ Too vague: `"Helps with incident reports."`

**Full recommended structure for a quality skill:**

---
name: your-skill-name
description: "..."
---

# Skill Title

Brief description of what this skill does.

## Required Inputs

What Claude should ask for if the user doesn't provide it.

## Output Structure

The exact format and sections Claude should produce.

## Quality Checks

A checklist Claude runs before delivering output.

## Example Trigger Phrases

- "Example phrase that would activate this skill"
- "Another example"


### Step 5: Test your skill locally

Before submitting:

1. Copy your skill folder to `~/.claude/skills/`
2. Open Claude Code
3. Try your example trigger phrases
4. Verify the output matches what your SKILL.md describes
5. Adjust and refine until it's working well

### Step 6: Commit and push

git add skills/your-skill-name/SKILL.md
git commit -m "feat: add [skill-name] skill for [profession/use case]"
git push origin main


### Step 7: Open a Pull Request

Go to your fork on GitHub and click **"Compare & pull request"**.

In your PR description, include:
- **What the skill does** (1–2 sentences)
- **Who it's for** (profession or role)
- **Why you built it** (what workflow pain does it solve?)
- **Example output** (paste a sample or screenshot — helps with review)

---

## Review Process

- PRs are reviewed weekly (usually Fridays)
- Feedback will be left as PR comments — usually requesting a description improvement or output structure refinement
- Once approved, your skill is merged and added to the README
- Your GitHub handle is added to the Contributors section

---

## What Gets Rejected

- Skills with vague descriptions that would trigger on too many unrelated tasks
- Skills that just wrap a single simple prompt (a skill should have structure and logic)
- Duplicate skills — check the existing skills list before submitting
- Skills that require external API keys or services not everyone has access to (unless clearly documented)

---

## Adding an export / install target (another AI tool)

Want the library to work in another tool (a new IDE, agent, or rules format)? "Support
another tool" should mean a **working install path**, not just a README mention. So a new
target is only complete when all four of these land together — use this as the checklist:

1. **Registry entry** — one entry in the `PLATFORMS` registry in
   [`scripts/build-exports.mjs`](scripts/build-exports.mjs) (`dir`, `file`, `render`), so the
   skills generate in the format that tool reads. Model it on a similar existing target
   (e.g. Cline/Roo/Kilo Code for a `rules/` directory of markdown).
2. **Install-path mapping** — a `default_target` case in
   [`scripts/install.sh`](scripts/install.sh) pointing at the exact directory *that tool*
   discovers skills in (e.g. `.kilocode/rules`), plus adding it to the rule-install branch
   and the `--list` output.
3. **CLI branch** — entries in [`bin/cli.mjs`](bin/cli.mjs) (`RULEFILE` + `defaultTarget` +
   the post-install hint) so `npx pm-claude-skills add --agent <tool>` routes to that path.
4. **Proof it works** — run `node scripts/build-exports.mjs` to generate the files, and
   `node scripts/build-exports.mjs --check` must pass (this is the fixture proving the
   exports land where the tool actually looks). Verify the install with
   `node bin/cli.mjs add --agent <tool> --dry-run`.

Then update the target list/count in the README and `docs/`. See
[Kilo Code](exports/kilocode/) as a complete worked example.

---

## Listing a community skill (keep it in your own repo)

Not every skill needs to live in this repo. If you've built skills in **your own repo** and
just want people to find them, raise a one-row PR to **[`COMMUNITY-SKILLS.md`](COMMUNITY-SKILLS.md)**
instead of opening a full skill PR — and once it's merged you earn a **"Featured in PM Skills
Community" badge** to display in your own repo. Those listings are community-maintained and **not**
eval-scored or security-audited — the bar is "public repo with a valid `SKILL.md` and an
honest one-liner." The curated, quality-gated flow above is for skills you want *in* the
library (playground, MCP, exports, leaderboard).

---

## Skills Wishlist

These have been requested but not yet built. Pick one up if you have the expertise:

| Skill | Use case |
|---|---|
| `legal-contract-review` | Flag key clauses and risks in contracts |
| `financial-model-narrative` | Turn spreadsheet outputs into board-ready narrative |
| `hr-job-description` | Write inclusive, structured JDs from a role brief |
| `onboarding-plan` | 30/60/90-day plan for new hires |
| `press-release` | Structured press releases from product announcements |
| `seo-content-brief` | Content briefs with keyword strategy and outline |
| `grant-proposal` | Structure grant applications for nonprofits and researchers |
| `sales-battlecard` | Competitive battlecards for sales teams |

Suggest a new skill: [Open an issue](../../issues/new) with the label `skill-request`.

---

## Questions?

Open a [Discussion](../../discussions) or raise an [Issue](../../issues). Happy to help you get a skill PR-ready.

---

*Thank you for contributing. Every skill added here saves someone an hour they'd rather spend on something else.*
