# PM Skills for Dify · Dify 插件

Find the right professional skill for a request and load its full instructions inside a Dify app. 在 Dify 应用里为请求找到合适的专业技能，并加载完整说明。

| Tool 工具 | What it does 作用 |
|---|---|
| `find_skill` 查找技能 | Ranks the 1,235 skills against a request in English or Chinese. Runs offline on bundled data, so it works on Dify servers in mainland China. 离线运行，国内部署的 Dify 也能用。 |
| `get_skill` 加载技能 | Loads a skill's `SKILL.md` from the Gitee mirror, falling back to GitHub. Choose English or Simplified Chinese. 优先从 Gitee 读取，可选中文版。 |

## Install 安装

1. Download `pm_skills.difypkg` from the latest [GitHub release](https://github.com/mohitagw15856/pm-claude-skills/releases/latest). 从 GitHub Release 下载 `pm_skills.difypkg`。
2. In Dify: **Plugins → Install plugin → Local package file**, and choose the file. 在 Dify 中：插件 → 安装插件 → 本地插件包。
3. Self-hosted Dify only accepts unsigned community packages when `FORCE_VERIFYING_SIGNATURE=false` is set in its `.env` (then restart). 自部署的 Dify 需要在 `.env` 中设置 `FORCE_VERIFYING_SIGNATURE=false` 才能安装社区插件包。

## Use 使用

In an agent or workflow, give the model both tools and an instruction such as: *"Call find_skill with the user's request, then get_skill with the best match, and follow that skill's instructions to produce the result."* 在 Agent 或工作流里加入两个工具，并提示模型：先用 find_skill 找技能，再用 get_skill 加载，然后按技能说明完成任务。

## Build 构建

```bash
node scripts/build-dify-plugin.mjs                     # router + index into data/
cd integrations/dify-plugin && python3 test_core.py     # core tests
dify plugin package integrations/dify-plugin            # Dify CLI, writes pm_skills.difypkg
```

The release workflow `.github/workflows/publish-dify-plugin.yml` does all three on every release, with the CLI pinned by checksum.
