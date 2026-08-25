# awesome-claude-code — submission draft (paste into the form)

[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
(★53k) is the highest-value remaining target, and it is the one that **has to be
submitted by hand**. Its CONTRIBUTING is explicit:

> **ALL RECOMMENDATIONS MUST BE MADE USING THE WEB UI ISSUE FORM TEMPLATE, OR YOU
> RISK BEING RESTRICTED FROM INTERACTING WITH THIS REPOSITORY TEMPORARILY.**
> […] Do not open a PR. […] It is **not** possible to submit a resource
> recommendation using the `gh` CLI. […] Although resources themselves may be
> partially or entirely written by a coding agent, resource recommendations must
> be created by human beings.

So: no PR, no CLI, and the recommendation itself has to come from a person. This
file is the content, ready to paste — you are the human submitting it.

**Eligibility check (their ground rules):** the project needs 14+ days of history
with continued commits, *or* 100+ stars. It clears both comfortably.

## → [Open the form](https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml)

Fill it in exactly as below. One resource per submission — do not add a second.

---

**Display Name**

```
PM Skills
```

**Category** (dropdown)

```
Skills
```

**Link**

```
https://github.com/mohitagw15856/pm-claude-skills
```

**Author Name**

```
mohitagw15856
```

**Author Link**

```
https://github.com/mohitagw15856
```

**Description**

Their style rule: a description, not a pitch. Don't address the reader, one
line, no emojis. This is written to that:

```
A library of 1,153 Agent Skills as plain-markdown SKILL.md files spanning 35 professions, installable into Claude Code as 127 plugin bundles or individually, with an MCP server, a browser playground, and CI gates for structural conformance and security.
```

If a shorter line is wanted:

```
A library of 1,153 plain-markdown Agent Skills across 35 professions, installable into Claude Code as plugin bundles or individually, with an MCP server and CI-enforced structural and security gates.
```

---

## If the bot asks for anything else

- **License** — MIT, declared in a standard `LICENSE` file at the repo root, so
  GitHub's license detection picks it up automatically.
- **Claude Code specificity** — the guideline favours resources that use Claude
  Code's own features. Worth mentioning in a follow-up comment if asked: it ships
  as a Claude Code plugin marketplace (`/plugin marketplace add
  mohitagw15856/pm-claude-skills`), 127 bundles, plus slash commands, subagents,
  output-style personas, and hooks.

## Afterwards

If it is accepted, the badge goes in the README:

```markdown
[![Mentioned in Awesome Claude Code](https://awesome.re/mentioned-badge.svg)](https://github.com/hesreallyhim/awesome-claude-code)
```

Then update the tracking table in [awesome-lists.md](awesome-lists.md).
