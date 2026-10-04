# 掘金文章草稿

**标题：** 给 AI 编程助手装上"职场技能"：一个开源的 Agent Skills 库，现在支持 Trae、Qoder 和通义灵码

**标签：** AI编程、Claude、Trae、开源、效率工具

---

你可能有过这样的经历：让 AI 帮忙写周报，它给你一篇像作文的东西；让它解读劳动合同，它给你三段"建议咨询专业人士"。不是模型不够聪明，而是它不知道这件事在你的场景里应该怎么做。

Agent Skills 解决的就是这个问题。

## 一、什么是 Agent Skill

一个 Skill 就是一份 Markdown 文件（`SKILL.md`）：开头的 frontmatter 写清楚什么时候用、产出什么，正文写清楚需要哪些输入、按什么框架做、输出什么格式、交付前检查什么、不能犯什么错。

AI 助手平时只读每个技能的一行描述；当你的请求和某个描述匹配时，才加载整份文件。所以装一千个技能也不会撑爆上下文。

## 二、PM Skills 是什么

[PM Skills](https://github.com/mohitagw15856/pm-claude-skills) 是一个开源的技能库，MIT 协议。PM 指 Professional（专业人士），覆盖产品、工程、数据、设计、法律、财务等 35 个职业，也包括很多生活事务：解读租约、医疗账单、离职协议。

最近新增了几个面向中国用户的技能包：

| 技能包 | 内容 |
|---|---|
| pm-china-work | 周报、述职报告 / 年终总结、晋升答辩、复盘 |
| pm-china-life | 劳动合同解读、经济补偿金（N、N+1、2N）估算、个税年度汇算、五险一金、高考志愿 |
| pm-zh-content | 小红书笔记、公众号文章、抖音脚本、直播带货脚本 |
| pm-chuhai | 出海市场进入、跨境电商 listing、PIPL 与 GDPR 对照 |
| pm-cv | 按目标公司定制简历、中英文简历、导出 ATS 友好的 Word |

## 三、在 Trae、Qoder、通义灵码里使用

这些工具都支持项目规则（rules）。安装命令会在安装时把技能生成为对应工具的规则文件：

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae
npx pm-claude-skills add --agent qoder
npx pm-claude-skills add --agent lingma
npx pm-claude-skills add --agent codebuddy
```

规则采用"智能生效"（按描述由模型决定是否应用），不会每次对话都全量加载。只想装部分技能包：

```bash
npx pm-claude-skills add --agent trae --bundle pm-china-work,pm-cv
```

一个细节：通义灵码单个规则文件上限 10,000 字符，安装时会列出会被截断的技能。

## 四、中文请求也能路由

技能路由原来只按英文单词匹配，中文没有空格，所以中文请求一个都匹配不上。现在中文按两个字一组匹配，并去掉"帮我""一下""怎么"这类没有信息量的组合；英文缩写（PRD、OKR、HR）在中文句子里也会保留。

```bash
npm run route -- "我的房东扣了我的押金"
# security-deposit-recovery
```

同时，50 个常用技能有了简体中文翻译，25 个有繁体中文翻译，翻译后的描述也参与路由。

## 五、计算器是确定性的

涉及数字的技能附带只用 Python 标准库的脚本，比如经济补偿金：

```bash
python3 skills/cn-severance-calculator/scripts/cn_severance.py \
  --start 2018-03-01 --end 2026-09-30 --avg-wage 25000 --scenario n_plus_1 --last-month-wage 26000
```

它实现《劳动合同法》第 47 条的折算规则（六个月以上按一年、不满六个月按半年、最后工作日计入）、高收入封顶，并提示 2008 年以前的工龄可能按旧规计算。模型负责解释和判断适用情形，算术交给脚本。

## 六、几点说明

- 法律、税务、劳动相关的技能都会给出明确的免责声明，并指向劳动仲裁、个税 App 等权威渠道。
- 涉及城市和年份的数据（社保费率、当地平均工资）一律让用户提供，或标注"需核实"，不写死。
- 在线 Playground 托管在 GitHub Pages，国内可能较慢；技能装到本地后不依赖任何在线服务，本地 MCP 服务也不需要海外网络。

项目地址：https://github.com/mohitagw15856/pm-claude-skills

如果某个技能在国内的实际场景里不准确，欢迎用中文提 Issue。
