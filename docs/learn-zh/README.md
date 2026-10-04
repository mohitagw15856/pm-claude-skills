# 用 Agent Skills 做职场工作：一门开源小课

[返回中文说明](../../README.zh-CN.md) · [在中国使用](../CHINA.md) · [Gitee 镜像](https://gitee.com/mohitagw/pm-claude-skills)

这门课面向想让 AI 助手稳定地把专业工作做好的人：产品经理、运营、工程师、学生，以及任何每周都要写周报、方案和复盘的人。学完后，你会知道 Agent Skill 是什么、怎么安装和使用、怎么读懂一个技能，并且能写出自己的第一个技能，通过自动检查后贡献回社区。

- **时长**：六课，每课 30 到 60 分钟
- **前置要求**：会用命令行和 Git；有一个能用的 AI 编程工具（Claude Code、Trae、Qoder、通义灵码或 CodeBuddy 任选其一）
- **网络**：全部步骤都可以在国内网络完成，使用 npmmirror 和 Gitee 镜像
- **协议**：课程和技能库均为 MIT 协议，可以自由用于学习小组和课堂

## 第一课：什么是 Agent Skill

直接对 AI 说"帮我写周报"，结果往往是一份流水账。差别不在模型，而在于有没有告诉它"这件事应该怎么做"。

Agent Skill 就是把"怎么做"写成一份 Markdown 文件（`SKILL.md`）：什么时候用、需要什么输入、按什么方法做、产出什么格式、交付前检查什么。AI 助手只在请求与技能描述匹配时才读取它，所以一千多个技能放在本地也不会拖慢对话。

**练习**：打开 [`skills/cn-weekly-report/SKILL.md`](../../skills/cn-weekly-report/SKILL.md) 和它的[中文翻译](../../skills-i18n/zh/cn-weekly-report/SKILL.md)，找出它要求的五个部分，想一想你自己的周报缺了哪一部分。

## 第二课：安装并用起来

```bash
# 用国内镜像安装到 Trae（换成 claude、qoder、lingma、codebuddy 都可以）
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-work,pm-china-exams
```

然后在工具里直接用中文提问：

- "帮我把这些笔记整理成周报：……"
- "明天需求评审，帮我看看 PRD 还缺什么。"
- "下个月公务员面试，帮我模拟一轮结构化面试。"

**练习**：用同一个请求分别在装了技能和没装技能的情况下各问一次，对比两份结果，写下三处差别。

## 第三课：读懂一个技能

每个 `SKILL.md` 都有相同的骨架：

| 部分 | 作用 |
|---|---|
| 头部 `name` 和 `description` | AI 靠描述判断什么时候用这个技能；描述里要写触发语，例如"当被要求帮我写周报时使用" |
| 产出内容 | 交付物清单 |
| 所需输入 | 缺什么就先问用户 |
| 方法 | 资深从业者的做法，一步一步 |
| 输出格式 | 精确的结构，便于复用 |
| 质量检查 | 可以逐条判断"通过 / 不通过"的检查项 |
| 反模式 | 最常见的错误 |
| 示例触发语 | 用户会怎么说 |

完整规范见 [SKILL-AUTHORING-STANDARD.md](../../SKILL-AUTHORING-STANDARD.md)。

**练习**：任选一个技能，把它的质量检查逐条套在一份你最近写的真实文档上，记录通过了几条。

## 第四课：写你自己的第一个技能

选一件你每周都做、而且有明确好坏标准的工作，例如"写竞品周报"或"整理用户访谈"。然后：

1. 写下资深同事做这件事时的三到六个步骤，以及新人最常犯的三个错误。
2. 新建 `skills/<你的技能名>/SKILL.md`，按第三课的骨架填写。技能名用英文小写加连字符。
3. 描述用英文写（英文版本是规范版本），并在描述和触发语里加上中文说法，让中文请求也能匹配到。
4. 在 [`evals/cases.json`](../../evals/cases.json) 里加一条测试用例：一个真实的用户请求。

**练习**：把你的技能交给同学，请他只看技能文件、不问你任何问题，用 AI 完成一次任务，看结果是否达到你的标准。

## 第五课：检查和改进

技能库用脚本做结构检查，不需要任何 API Key：

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git
cd pm-claude-skills
node scripts/skillcheck.mjs          # 结构检查
node scripts/skill-dupes.mjs --check # 和已有技能是否重复
node tests/i18n-parity.mjs           # 翻译结构是否一致
```

改进技能的三个问题：

- 质量检查能不能逐条判断通过与否？"写得清楚"不能，"每个行动项都有负责人和日期"能。
- 方法里有没有只有老手才知道的判断？没有的话，技能只是一个模板。
- 有没有可能编造事实？在质量检查里加上"没有出现用户未提供的数字"。

## 第六课：贡献回社区

- **提交技能**：在 GitHub 上提 Pull Request。如果访问 GitHub 不方便，可以在 [Gitee Issue](https://gitee.com/mohitagw/pm-claude-skills/issues) 里贴出技能内容，维护者会代为提交并注明贡献者。
- **翻译技能**：认领一个技能翻译成简体或繁体中文，放在 `skills-i18n/zh/` 或 `skills-i18n/zh-TW/`。标有 `good first translation` 的 Issue 适合第一次贡献。
- **反馈问题**：某个技能不符合国内实际情况（例如社保、个税、劳动法的地区差异），欢迎用中文提 Issue。

## 给学习小组的建议

- 六课可以安排成两周：每周三次，每次一课，课后交练习。
- 第四课最好两人一组，互相当"只看技能文件的同事"。
- 结课时每人提交一个技能或一份翻译，作为结课作品。
