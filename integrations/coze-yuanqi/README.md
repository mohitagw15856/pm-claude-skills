# 在扣子、腾讯元器、文心智能体里使用 PM Skills

扣子（Coze）、腾讯元器和文心智能体平台都可以用"人设与回复逻辑"（系统提示词）创建智能体。PM Skills 的每个中文技能都可以直接作为人设，几分钟就能做出一个专业助手。

> 这些平台的国内版需要绑定中国大陆手机号。

## 三步创建

1. 在平台上新建一个智能体，名称和简介可以参考下表。
2. 打开下表中技能的中文版链接（Gitee，国内可访问），把全文复制到"人设与回复逻辑"。
3. 把技能文末"示例触发语"中的两三句设为开场白推荐问题，选择模型（如 DeepSeek、通义千问、混元），发布。

| 智能体 | 中文技能（复制全文） |
|---|---|
| 📝 周报助手 | [cn-weekly-report](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-weekly-report/SKILL.md) |
| 🎯 晋升答辩教练 | [cn-promotion-defence](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-promotion-defence/SKILL.md) |
| 📋 需求评审助手 | [cn-prd-review](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-prd-review/SKILL.md) |
| ⚖️ 经济补偿金估算 | [cn-severance-calculator](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-severance-calculator/SKILL.md) |
| 📄 劳动合同解读 | [cn-labour-contract-decoder](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-labour-contract-decoder/SKILL.md) |
| 🎤 结构化面试陪练 | [cn-civil-exam-interview](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-civil-exam-interview/SKILL.md) |
| ✍️ 申论批改 | [cn-civil-exam-essay](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-civil-exam-essay/SKILL.md) |
| 📚 考研规划 | [cn-kaoyan-planner](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-kaoyan-planner/SKILL.md) |
| 🎓 校招规划 | [cn-campus-recruitment](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-campus-recruitment/SKILL.md) |
| 💻 大厂技术面试 | [cn-tech-interview-drill](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-tech-interview-drill/SKILL.md) |
| 📑 开题报告 | [cn-thesis-proposal](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-thesis-proposal/SKILL.md) |
| 🏛 公文写作 | [cn-official-document](https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills-i18n/zh/cn-official-document/SKILL.md) |

全部 73 个中文技能见 [`skills-i18n/zh/`](https://gitee.com/mohitagw/pm-claude-skills/tree/main/skills-i18n/zh)。

## 小提示

- 技能里的"所需输入"会让智能体先追问缺少的信息，不要删掉这一节。
- 涉及劳动、税务、医保的技能写有"以官方为准"的提示，请保留。
- 想让一个智能体按需使用全部技能，可以用 [Dify 插件](../dify-plugin/) 或 [MaxKB / FastGPT 工具](../china-agent-tools/)。
