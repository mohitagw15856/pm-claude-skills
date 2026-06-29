# Community Skills

A directory of **skill repos and packs built by the community** that follow the
[`SKILL.md` standard](SKILL-AUTHORING-STANDARD.md). Get your skills listed, and earn a
**badge** for your own repo that shows they're part of the PM Skills community. 🏅

[![Featured in PM Skills Community](https://img.shields.io/badge/Featured%20in-PM%20Skills%20Community-d97757?logo=anthropic&logoColor=white)](https://github.com/mohitagw15856/pm-claude-skills/blob/main/COMMUNITY-SKILLS.md)

> [!IMPORTANT]
> **This is not the curated library.** The skills *in this repo* (`skills/`) are
> single-source, **SkillCheck-validated**, **eval-scored** on a public rubric, and scanned
> by the [skill security auditor](skills/skill-security-auditor/SKILL.md) — they power the
> [playground](https://mohitagw15856.github.io/pm-claude-skills/), the MCP server, the REST
> API, and the [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html).
>
> Entries **below** are **community-contributed and live in their authors' own repos.** They
> are **not eval-scored, not security-audited, and not maintained by this project.** Review
> the source and **install at your own discretion.** Listing here is not an endorsement.

---

## 🏅 The directory

| Skill / pack | Author | What it does | Repo |
|---|---|---|---|
| _Be the first — open a PR to add yours!_ | | | |

<!-- COMMUNITY-SKILLS:ROWS-BELOW
  Add your row directly above this comment, keeping the four columns in order:
  | [Name](https://github.com/you/your-repo) | [@you](https://github.com/you) | One concise line — what it produces and when to use it. | https://github.com/you/your-repo |
  Keep the description to a single line. Alphabetical-ish by name is fine.
-->

---

## Get listed (raise a PR)

Listing is **PR-only** — that's the point: a merged PR is the achievement. It's a one-row change.

1. Make sure your skill is a **public repo** with one or more `SKILL.md` files that follow the
   [authoring standard](SKILL-AUTHORING-STANDARD.md) (frontmatter `name` + `description`, a clear
   output structure, quality checks). The [`writing-great-skills`](skills/writing-great-skills/SKILL.md)
   skill can help you get there.
2. Add **one row** to the table above — name (linked to your repo), your handle, a one-line
   description, and the repo URL. (Run `node scripts/check-community-skills.mjs` to self-check the format.)
3. Open a PR titled **`community: add <your skill/pack>`**.
4. Once it's merged, **add the badge** to your repo (below) to show you're part of the community. 🎉

**Listing guidelines** (keep the directory trustworthy):

- ✅ The link resolves to a public repo with at least one valid `SKILL.md`.
- ✅ A clear, honest one-line description — no marketing fluff.
- ✅ Open-source or clearly-licensed; safe content (no prompt injection, exfiltration, or hidden
  instructions — see the [security standard](SECURITY.md)).
- ❌ No paywalled-only, dead, or unrelated links; no duplicates.

Maintainers may remove entries that go stale, break, or don't meet these guidelines.

---

## 🏅 Earn the badge

Once your PR is merged, show it off in **your** repo's README. Copy one of these — it links
back to this directory:

**Markdown**
```markdown
[![Featured in PM Skills Community](https://img.shields.io/badge/Featured%20in-PM%20Skills%20Community-d97757?logo=anthropic&logoColor=white)](https://github.com/mohitagw15856/pm-claude-skills/blob/main/COMMUNITY-SKILLS.md)
```

**HTML**
```html
<a href="https://github.com/mohitagw15856/pm-claude-skills/blob/main/COMMUNITY-SKILLS.md"><img src="https://img.shields.io/badge/Featured%20in-PM%20Skills%20Community-d97757?logo=anthropic&logoColor=white" alt="Featured in PM Skills Community" /></a>
```

It renders like the badge at the top of this page. Wear it with pride. 🏅

---

## Want your skill in the *curated* library instead?

If you'd like your skill to be eval-scored and available in the playground, MCP, and every
export target, contribute it to the core library through the quality-gated flow:

- Use **[Skill Studio](https://mohitagw15856.github.io/pm-claude-skills/studio.html)** to
  generate a standards-compliant `SKILL.md` and open a prefilled PR in one click, **or**
- Follow [`CONTRIBUTING.md`](CONTRIBUTING.md) — the PR check validates structure and
  cheaply eval-scores your changed skill before merge.

That path has a higher bar, but your skill becomes a first-class, measured part of the library.
