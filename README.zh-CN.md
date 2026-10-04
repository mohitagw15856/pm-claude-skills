# PM Skills：一千多个专业 Agent Skills

[English](README.md) · **简体中文** · [在中国使用](docs/CHINA.md) · [全部技能](SKILLS.md) · [更新日志](CHANGELOG.md)

PM Skills 是一个开源的 Agent Skills 库。每个技能是一份 Markdown 文件（`SKILL.md`），教 AI 助手把一件专业工作做到资深水平：从写 PRD、周报，到解读劳动合同、准备晋升答辩。

这里的 PM 指 Professional（专业人士），不只是产品经理。

MIT 开源协议，永久免费。没有运行时、没有遥测、不需要账号。

## 它是怎么工作的

| | 步骤 | 例子 |
|---|---|---|
| **01** | 用你自己的话说出需要什么 | "公司要裁我，能拿多少补偿？" |
| **02** | AI 助手加载与之匹配的那一个技能 | [`cn-severance-calculator`](skills/cn-severance-calculator/SKILL.md)，一份 Markdown 文件，只在相关时读取 |
| **03** | 你得到的是完成的成果，而不是关于怎么做的建议 | 适用的情形（N、N+1 或 2N）、逐步计算、签字前要核对的事项 |

## 安装

**Claude Code：**

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent claude
```

**国内常用的 AI 编程工具：**

```bash
npx pm-claude-skills add --agent trae        # Trae
npx pm-claude-skills add --agent qoder       # Qoder
npx pm-claude-skills add --agent lingma      # 通义灵码
npx pm-claude-skills add --agent codebuddy   # CodeBuddy
```

只装部分技能包：

```bash
npx pm-claude-skills add --agent trae --bundle pm-china-work,pm-cv
```

还支持 Cursor、Windsurf、Codex、Cline 等，详见 [docs/CHINA.md](docs/CHINA.md)。

## 适合中国用户的技能包

| 技能包 | 内容 | 试着说 |
|---|---|---|
| [**pm-china-work**](plugins/pm-china-work/) 职场 | 周报 / 月报、述职报告 / 年终总结、晋升答辩、复盘 | "帮我把这些笔记整理成周报。" |
| [**pm-china-life**](plugins/pm-china-life/) 生活事务 | 劳动合同解读、经济补偿金估算、个税年度汇算、五险一金、高考志愿 | "三年合同试用期六个月，合法吗？" |
| [**pm-zh-content**](plugins/pm-zh-content/) 内容平台 | 小红书笔记、公众号文章、抖音脚本、直播带货脚本 | "帮我写一篇小红书笔记。" |
| [**pm-chuhai**](plugins/pm-chuhai/) 出海 | 出海市场进入计划、跨境电商 listing、PIPL 与 GDPR 对照 | "我们想出海，东南亚还是中东？" |
| [**pm-cv**](plugins/pm-cv/) 简历 | 按目标公司定制简历、中英文简历、ATS 检查、导出 Word | "帮我做一份中英文简历，要投外企。" |

此外还有一千多个通用技能，覆盖产品、工程、数据、设计、市场、销售、人力、法律、财务等 35 个职业。完整列表见 [SKILLS.md](SKILLS.md)。

## 中文翻译

[`skills-i18n/zh/`](skills-i18n/zh/) 中有 50 个技能的简体中文翻译，[`skills-i18n/zh-TW/`](skills-i18n/zh-TW/) 中有 25 个技能的繁体中文翻译。英文版本为规范版本；翻译由 CI 检查结构是否一致。

用中文提问时，技能路由也能理解：例如"我的房东扣了我的押金"会匹配到押金追回技能。

## 在线试用

[Playground](https://mohitagw15856.github.io/pm-claude-skills/) 支持用你自己的 API Key 调用 DeepSeek、通义千问、Kimi、智谱 GLM（有免费模型）和豆包。Key 只保存在你的浏览器里。

Playground 托管在 GitHub Pages，在国内可能访问较慢；技能安装到本地后不依赖任何在线服务。

## 质量

每个技能都经过结构检查（SkillSpec L3）、安全扫描和重复检测，并在 CI 中强制执行。涉及法律、税务、劳动的技能会给出明确的免责声明，并指向应当咨询的机构。

## 参与贡献

欢迎用中文提 Issue 和 PR：
- 如果某个技能在中国的场景下不准确，请告诉我们
- 希望增加哪些技能
- 帮助翻译或审校翻译

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。项目地址：https://github.com/mohitagw15856/pm-claude-skills

## 协议

MIT。
