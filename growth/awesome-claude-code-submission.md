# awesome-claude-code — do not resubmit; update the open submission

[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
(★53k). **There is already an open, validated submission.** Do not file another.

| Issue | Date | State | Note |
|---|---|---|---|
| [#2073](https://github.com/hesreallyhim/awesome-claude-code/issues/2073) | 2026-06-19 | **OPEN**, `validation-passed` | The live submission. Bot: "All validation checks passed. Your submission is ready for review by a maintainer." |
| [#2628](https://github.com/hesreallyhim/awesome-claude-code/issues/2628) | 2026-08-25 | closed, `auto-closed` | A second recommendation filed while #2073 was open. |

## Why #2628 was auto-closed

Not the ground rules — the project clears them comfortably (**1,308 stars**
against a 100 bar; created 2026-01-29; 77 commits in the last 30 days; MIT
detected). The rule it hit is further down the same section:

> In addition: **You may not recommend more than one resource at a time.**

#2073 was still open, so #2628 was a second simultaneous recommendation. The
bot's message is generic, which is why this reads as a criteria failure when it
is a duplicate.

## What #2073 needs

It is nine weeks old and materially stale — it describes **174 skills across 18
professions**; there are now **1,153 across 35**. It also uses the category
"Agent Skills", which no longer exists in the form's dropdown (now "Skills").

Post this as a **comment on #2073**. Do not edit the original body — the
validator ran against it and passed, and re-triggering validation on an edited
form risks losing the `validation-passed` state.

---

```
Updating this submission with current numbers — it has moved on a good deal since June.

Description (replacing the one in the form above):

A library of 1,153 Agent Skills as plain-markdown SKILL.md files across 35 professions, installable into Claude Code as 127 plugin bundles or individually, with an MCP server, a browser playground, and CI gates for structural conformance and security.

Claude Code specifics, since the guidelines favour them: it ships as a plugin marketplace (/plugin marketplace add mohitagw15856/pm-claude-skills), and alongside the skills it provides slash commands, subagents, output-style personas, and hooks.

Also worth noting the category "Agent Skills" used above no longer appears in the form; the current equivalent is "Skills". Happy to refile under the new taxonomy if that is easier than amending this one — I did not want to open a second issue given the one-at-a-time rule.

Everything else in the original submission still holds: MIT, no executable code in the skills themselves, and the playground still verifies a skill's effect without installing anything.
```

---

## If you would rather start clean

Close #2073 **first**, wait for it to register as closed, then file a fresh
submission using the fields below. Do not do both at once — that is what
triggered the auto-close.

**Title** — keep the `[Resource]: ` prefix GitHub pre-fills:

```
[Resource]: PM Skills
```

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

**Description** — their style rule is a description, not a pitch: don't address
the reader, one line, no emojis.

```
A library of 1,153 Agent Skills as plain-markdown SKILL.md files spanning 35 professions, installable into Claude Code as 127 plugin bundles or individually, with an MCP server, a browser playground, and CI gates for structural conformance and security.
```

## Expectations

Their CONTRIBUTING is blunt about this, and it is worth reading plainly rather
than as an obstacle:

> Recommendations are reviewed in a best-effort way, and no guarantee is made as
> to whether you will receive a response. […] If "getting on the list" is any
> part of a promotional strategy for your project, you should be prepared to
> have a backup plan.

Passing validation means received, not accepted. #2073 has been open and valid
since June; the realistic move is to keep it accurate and leave it.

## Afterwards

If accepted:

```markdown
[![Mentioned in Awesome Claude Code](https://awesome.re/mentioned-badge.svg)](https://github.com/hesreallyhim/awesome-claude-code)
```

Then update the tracking table in [awesome-lists.md](awesome-lists.md).
