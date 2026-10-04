# Where PM Skills has been submitted, and what is left

Status as of 2026-10-04. Drafts below are ready to paste.

## Submitted

| Where | Link | Notes |
|---|---|---|
| HelloGitHub monthly | https://github.com/521xueweihan/HelloGitHub/issues/3855 | Self-recommendation; the maintainer reviews monthly |
| awesome-deepseek-integration | https://github.com/deepseek-ai/awesome-deepseek-integration/pull/754 | Many open PRs and slow merges; may sit for a while |
| LobeHub agent index | https://github.com/lobehub/lobe-chat-agents/pull/1564 | Three zh-CN agents (周报助手, 晋升答辩教练, 经济补偿金估算); index merges are infrequent |
| ModelScope Skills Central | https://www.modelscope.ai/skills | cn-weekly-report, cn-severance-calculator, cn-promotion-defence, cn-prd-review, cn-campus-recruitment, cn-civil-exam-interview; auto-sync from GitHub |
| ModelScope MCP | https://www.modelscope.ai/mcp/servers/mohitagw15856/pm-skills-mcp | Local stdio via npx |
| ModelScope Studio | https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground | The playground, synced on release |
| ModelScope model | https://www.modelscope.ai/models/mohitagw15856/pm-skills-router | Skill router, retrained on release |

## Not submitted, and why

- **Cherry Studio presets**: the bundled presets are maintained by the core team (780 already, including weekly-report generators) and are not a community-contribution surface. Cherry Studio supports MCP, so docs/CHINA.md shows how to add the server instead.
- **Dify, FastGPT, MaxKB marketplaces**: all three take MCP tools, so the same server works without a separate plugin. A packaged Dify plugin needs Dify's signing CLI and review; worth doing only if Dify users ask.

## To submit yourself

### Ruan Yifeng's weekly (科技爱好者周刊)

Open an issue at https://github.com/ruanyf/weekly/issues with:

**Title:** PM Skills：让 AI 按资深从业者的方法完成专业工作的开源技能库

**Body:**

> https://github.com/mohitagw15856/pm-claude-skills
>
> 一个开源（MIT）的 Agent Skills 库，一千两百多个技能，每个技能是一份 Markdown 文件，写明一件专业工作该怎么做。装进 Claude Code、Trae、通义灵码等工具后，用中文提问就会匹配到对应技能，比如写周报、准备晋升答辩、估算经济补偿金。国内可以通过 npmmirror、Gitee 和魔搭社区安装和下载。

### Chinese awesome lists

Good targets, each takes a one-line pull request under its tools or skills section: lists for Claude Code in Chinese, MCP servers in Chinese, and AI tools for work. Suggested line:

> [PM Skills](https://github.com/mohitagw15856/pm-claude-skills)：一千两百多个专业 Agent Skills（周报、PRD、晋升答辩、劳动合同、简历），支持中文提问，附 MCP 服务。

### Datawhale

Datawhale reviews new learning projects through its project proposal process. Propose `docs/learn-zh/` (six lessons on using and writing Agent Skills) as a short course, offering to co-maintain it with a Datawhale volunteer.

### Juejin, Zhihu, V2EX, Bilibili

Drafts are in this folder. Each platform needs an account bound to a mainland phone number.
