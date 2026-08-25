# Awesome-list PR campaign — durable backlinks + discovery

Every "awesome-*" list you're added to is a permanent backlink and a discovery
path. This is a systematic afternoon: one focused PR per list.

> **Status: prepared, not submitted.** Every target below has been resolved to a
> live repo and star count (checked 2026-08-25), and the entry text is final.
> Submitting means opening pull requests on ten third-party repositories under
> your GitHub account, so it needs your go-ahead — it is not something to run
> unattended.

## Two corrections to the previous version of this plan

- It said the repo was **✅ already listed in awesome-claude-skills**. It is not
  in [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
  (★73.2k), and a GitHub code search for `pm-claude-skills` returns only three
  unrelated repositories, none of them an awesome-list. Treat that row as an
  open target, not a completed one.
- The entry text said **1,117 skills**. It is 1,153. Counts in outbound copy
  rot the same way counts in docs do — regenerate before you send.

## Targets (resolved to live repos, 2026-08-25)

| List | Repo | Stars | CONTRIBUTING | Angle to pitch |
|---|---|---:|---|---|
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

| List | PR opened | URL | Status |
|---|---|---|---|
| awesome-claude-skills | | | not started |
| awesome-claude-code | | | not started |
| awesome-mcp-servers | | | not started |
| awesome-llm-apps | | | not started |
| awesome-ai-agents | | | not started |
| awesome-cursorrules | | | not started |
| awesome-chatgpt-prompts | | | not started |
| awesome-ai-coding-tools | | | not started |
| awesome-gemini | | | not started |
| awesome-open-source-alternatives | | | not started |

## Bonus: get *others* to list you

Once the demo video and a Show HN / Product Hunt launch exist, list maintainers
add you unprompted. The awesome-list PRs and the launch reinforce each other.
