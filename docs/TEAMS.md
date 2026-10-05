# Teams: a shared skill set, and a personal profile

Two small features make the library behave the same on every laptop in a team, and fit each person once it is there.

## `.pm-skills.json` and `sync`

Commit a `.pm-skills.json` to a project (or a dotfiles repo) to say which skills the team uses:

```json
{
  "$schema": "https://mohitagw15856.github.io/pm-claude-skills/schemas/pm-skills.schema.json",
  "version": "81.x",
  "agents": ["claude", "cursor"],
  "bundles": ["pm-essentials", "pm-china-work"],
  "skills": ["lease-decoder"],
  "lite": false,
  "targets": { "cursor": ".cursor/rules" }
}
```

| Key | Meaning |
|---|---|
| `agents` | Tools to install for: claude, hermes, codex, openclaw, cursor, windsurf, aider, kilocode, trae, qoder, lingma, codebuddy |
| `bundles`, `skills` | What to install; at least one of the two |
| `version` | Library versions the team has agreed on: `81.2.0`, `81.x`, `81.2.x` or `>=81.2.0` |
| `lite` | Condensed skills for small local models (see `add --lite`) |
| `targets` | Install folder per agent, relative to the file; defaults are each tool's usual folder |

Then everyone runs:

```bash
npx pm-claude-skills sync            # installs exactly that set, for every listed agent
npx pm-claude-skills sync --check    # exits 1 if this machine does not match it
```

`sync --check` compares every installed file with the library version in use, so it catches a missing skill, a hand-edited one, or a laptop on a different version. Put it in an onboarding script or a CI job. A different `--config <file>` can be passed for monorepos.

## `profile`

The profile is a few lines about you that every skill can use, so it stops asking the same questions and fits its output to you: role, seniority, industry, company size, country, city, language and tone. City matters more than it looks: China's 社保, 公积金 and 落户 rules, and many tax and labour rules elsewhere, depend on it.

```bash
npx pm-claude-skills profile init                 # asks for each field; Enter skips
npx pm-claude-skills profile set city=深圳 language=简体中文
npx pm-claude-skills profile show
npx pm-claude-skills profile context              # the block your agent reads
npx pm-claude-skills profile clear
```

It is stored only on your computer (`~/.config/pm-skills/profile.json`, or `%APPDATA%\pm-skills\profile.json` on Windows), readable only by you. When a profile exists, `add` and `sync` install it next to the skills as `pm-profile`: a skill for Claude Code, Codex, Hermes and OpenClaw, and an always-on rule for Cursor, Trae, Qoder, Lingma and CodeBuddy. Run `add` again after changing it; pass `--no-profile` to leave it out.

## 中文说明

- **团队技能清单**：在项目里提交 `.pm-skills.json`，写明用哪些工具（agents）、哪些技能包和技能、约定的版本。每个人运行 `npx pm-claude-skills sync` 就会安装完全相同的一套；`sync --check` 在不一致时返回 1，适合放进入职脚本或 CI。
- **个人档案**：`npx pm-claude-skills profile init` 记录你的职位、行业、城市、语言和语气，只保存在本机。安装技能时会一起装上，技能就能按你的城市套用社保、公积金等地方规定，不用每次重新说明。
