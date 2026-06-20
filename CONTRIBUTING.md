# Contributing to pm-claude-skills

Thank you for wanting to contribute. This repo grows through community submissions — every profession added makes it more useful for everyone.

---

## What We're Looking For

Good skills have three things in common:

1. **They solve a recurring workflow** — not a one-off task. If you do this thing more than once a week and it follows a consistent structure, it's probably a good skill candidate.
2. **They have a clear trigger** — Claude needs to know when to activate the skill. The `description` in your frontmatter is what Claude reads to decide if your skill is relevant. Make it specific.
3. **They produce structured, useful output** — the output should be something you'd actually use at work, not a generic response.

---

## 🔁 Contributions are eval-gated

This library is a [benchmark](https://mohitagw15856.github.io/pm-claude-skills/benchmark.html) as much as a collection. When you open a PR that adds or changes a skill, the [**Skill PR Check**](.github/workflows/skill-pr-check.yml) automatically:

1. Validates the SKILL.md **structure** (`skillcheck`) — this must pass.
2. If you also add a case to [`evals/cases.json`](evals/cases.json), **scores the changed skill** on the rubric (structure · completeness · usefulness · grounding) and posts the result on your PR.

Aim for **≥ 4.0/5**. Adding a case is the fastest way to prove your skill is strong — and it's cheap (the check scores only the *changed* skills). Prefer a guided start? Use the [submit-a-skill form](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=submit-skill.yml).

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
