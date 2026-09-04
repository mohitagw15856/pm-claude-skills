# Awesome-list PR campaign — durable backlinks + discovery

Every "awesome-*" list you're added to is a permanent backlink and a discovery
path. This is a systematic afternoon: one focused PR per list.

> **Status: prepared, not submitted.** Every target below has been resolved to a
> live repo and star count (checked 2026-08-25), and the entry text is final.
> Submitting means opening pull requests on ten third-party repositories under
> your GitHub account, so it needs your go-ahead — it is not something to run
> unattended.

## Two corrections to the previous version of this plan

- The entry in **awesome-claude-skills is real but stale.** The listing is in
  [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills)
  (★10.1k) — the repo the README badge points at — and it still reads *"771
  professional skills across 35 professions"* against an actual 1,153. That row
  is a **refresh**, not a new submission.
  (A separate, larger [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
  (★73.2k) exists and does **not** list the repo — it is a genuine open target.
  Searching for the list by name returns ComposioHQ's first, which is how these
  two got confused.)
- The entry text said **1,117 skills**. It is 1,153. Counts in outbound copy
  rot the same way counts in docs do — regenerate before you send.

## Targets (resolved to live repos, 2026-08-25)

| List | Repo | Stars | CONTRIBUTING | Angle to pitch |
|---|---|---:|---|---|
| awesome-claude-skills **(listed)** | `BehiSecc/awesome-claude-skills` | 10.1k | — | **Refresh only** — entry says 771 skills, actual is 1,153 |
| awesome-claude-skills | `ComposioHQ/awesome-claude-skills` | 73.2k | yes | 1,153 skills as a single installable library |
| awesome-claude-code | `hesreallyhim/awesome-claude-code` | 53.0k | yes | Native Claude Code plugin + 127 bundles |
| awesome-mcp-servers | `punkpeye/awesome-mcp-servers` | 92.8k | yes | The MCP server — search and pull skills on demand |
| awesome-llm-apps | `Shubhamsaboo/awesome-llm-apps` | 134.0k | — | Browser Playground + multi-model exports |
| awesome-ai-agents | `e2b-dev/awesome-ai-agents` | 29.7k | — | Agent Skills as reusable agent capabilities |
| awesome-cursorrules | `PatrickJS/awesome-cursorrules` | 40.7k | — | `npx pm-claude-skills add --agent cursor` |
| awesome-chatgpt-prompts | `f/awesome-chatgpt-prompts` | 167.9k | — | The `exports/chatgpt/` ready-to-paste set |
| awesome-ai-coding-tools | `ai-for-developers/awesome-ai-coding-tools` | 2.0k | — | 13 editor/platform export targets |
| awesome-gemini | `kr1sp1n/awesome-gemini` | 1.5k | — | The `exports/gemini/` set |
| awesome-open-source-alternatives | `diegoleme/awesome-open-source-alternatives` | 480 | — | Open, no-lock-in skill library |

`sindresorhus/awesome` itself is deliberately excluded: it lists *lists*, not
projects, and its PR bar is a full awesome-list of your own.

## The entry

```md
- [PM Skills](https://github.com/mohitagw15856/pm-claude-skills) — 1,153 open-source, MIT-licensed Agent Skills (plain-markdown `SKILL.md`) that teach AI assistants to do real professional and life tasks to a senior standard. Works with Claude, ChatGPT, Gemini, Cursor and 13 other tools; free browser Playground; spec and security gates in CI.
```

Regenerate the count before sending: `node -e "console.log(require('./web/skills.json').count)"`.

## PR etiquette (so they actually merge)

- **One list = one focused PR.** Match their exact formatting and alphabetisation.
- **Put it in the *right* category** — never under a generic heading.
- **Read CONTRIBUTING first** where one exists (three of the ten). Some require
  a screenshot, a description length, or no marketing adjectives.
- **Factual and short.** Maintainers reject hype; strip "amazing/powerful".
- **Follow up politely** if stale after a week.

## Tracking

Submitted 2026-08-25. Three were **updates to PRs that were already open** at a
stale count — always check for an existing PR before opening one.

| List | PR | State |
|---|---|---|
| awesome-claude-skills (BehiSecc) | [#624](https://github.com/BehiSecc/awesome-claude-skills/pull/624) | open — refresh 771 → 1,153 |
| awesome-claude-skills (ComposioHQ) | [#1439](https://github.com/ComposioHQ/awesome-claude-skills/pull/1439) | open — existing PR refreshed |
| awesome-claude-skills (travisvn) | [#1038](https://github.com/travisvn/awesome-claude-skills/pull/1038) | open — existing PR refreshed; duplicate #885 closed |
| awesome-mcp-servers | [#12850](https://github.com/punkpeye/awesome-mcp-servers/pull/12850) | open — Product Management, agent fast-track opted in |
| awesome-ai-coding-tools | [#652](https://github.com/ai-for-developers/awesome-ai-coding-tools/pull/652) | open — Developer Productivity Tools |
| awesome-llm-apps | [#1119](https://github.com/Shubhamsaboo/awesome-llm-apps/pull/1119) → [#1140](https://github.com/Shubhamsaboo/awesome-llm-apps/pull/1140) | #1119 closed (they host code, not links — fair). #1140 contributes runway-monte-carlo *into* their repo: skill + script + 13-check deterministic eval + trigger spec, their schemas exactly. |
| awesome-cursorrules | [#362](https://github.com/PatrickJS/awesome-cursorrules/pull/362) | open — new `.mdc` rule, Documentation |

## Not submitted, and why

Six targets from the original list do not actually accept an entry like this.
Submitting anyway would have wasted a maintainer's time and, in the first case,
risked the account.

| List | Why not |
|---|---|
| awesome-claude-code | **Already submitted and pending** — [#2073](https://github.com/hesreallyhim/awesome-claude-code/issues/2073) has been open with `validation-passed` since 2026-06-19. A second submission on 2026-08-25 was auto-closed under their one-recommendation-at-a-time rule. It needs a refresh comment, not a resubmission — see [awesome-claude-code-submission.md](awesome-claude-code-submission.md). CONTRIBUTING forbids PRs ("do not open a PR"), requires the web-UI issue form, states it is not possible via the `gh` CLI, and says recommendations "must be created by human beings". Opening one "risks being restricted from interacting with this repository". **This is the one worth doing by hand** — ★53k, and the project clears their 100-star / 14-day bar comfortably. |
| awesome-gemini | Wrong Gemini — it covers the `gemini://` internet protocol, not Google's model. The original plan assumed the latter. |
| awesome-chatgpt-prompts | A prompts dataset (CSV + README), not a directory of projects. |
| awesome-ai-agents | States it is "only for AI assistants and agents" and redirects tools to a sibling list. A skill library is not an agent. |
| awesome-open-source-alternatives | Entries are "X, an open-source alternative to \<proprietary product\>". There is no proprietary product this replaces. |

Also considered and skipped: `e2b-dev/awesome-sdks-for-ai-agents` (SDKs and
observability platforms, ★1.2k, semi-dormant) and
`Chat2AnyLLM/awesome-claude-skills` (★146, a previous submission was closed).

## Bonus: get *others* to list you

Once the demo video and a Show HN / Product Hunt launch exist, list maintainers
add you unprompted. The awesome-list PRs and the launch reinforce each other.
