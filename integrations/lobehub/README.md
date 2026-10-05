# PM Skills on LobeHub

> **In English, briefly.** The lobe-chat-agents repository no longer accepts agent pull requests; its maintainers ask for agents to be uploaded through the market at app.lobehub.com (or a self-hosted LobeChat). `scripts/build-lobehub-agents.mjs` turns every Simplified Chinese skill into a LobeHub agent file. They are built on each deploy and served at https://mohitagw15856.github.io/pm-claude-skills/lobehub/index.json.

LobeHub 的 agent 仓库（lobehub/lobe-chat-agents）已经不再合并新的 PR，维护者建议直接在 app.lobehub.com 或自部署的 LobeChat 里上传 agent 到市场。这里把每个简体中文技能导出成 LobeHub 的 agent 格式（schemaVersion 1），可以直接上传。

## 文件在哪

- 在线：<https://mohitagw15856.github.io/pm-claude-skills/lobehub/index.json> 列出全部 agent，每个文件在同一目录下，例如 `lobehub/pm-skills-cn-weekly-report.zh-CN.json`。
- 本地生成：`node scripts/build-lobehub-agents.mjs --out dist/lobehub`

每个文件里：技能正文是系统角色（systemRole），技能文末的“示例触发语”是推荐问题，分类按技能包对应到 LobeHub 市场的分类。

## 怎么上架

1. 用你的 LobeHub 账号登录 app.lobehub.com。
2. 在发现页或助手市场里找到提交或上传助手的入口（以当前界面为准）。
3. 上传对应的 JSON 文件，或者新建助手后把 systemRole、开场白和推荐问题粘进去。
4. 先上架最常用的几个：`cn-weekly-report`（中文周报）、`cn-severance-calculator`（经济补偿金估算）、`cn-promotion-defence`（晋升答辩）、`cn-civil-exam-essay`（申论）、`xiaohongshu-note`（小红书笔记）。

## 关于 lobe-chat-agents 的 PR #1564

那个 PR 提交的三个 agent（周报、晋升答辩、经济补偿金）就在这里的导出里。上架完成后，在 PR 里留一句话附上市场链接，然后关闭它。
