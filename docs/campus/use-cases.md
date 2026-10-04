# 学生使用场景：课程作业、毕业设计、实习求职

[校园资料包](README.md) · [怎么安装](../CHINA.md)

下面每个技能名都对应仓库 `skills/` 下的真实技能，装好后直接用中文描述需求即可，AI 会按描述匹配。不确定用哪个，就运行 `npx --registry=https://registry.npmmirror.com pm-claude-skills find "你的需求"`，或者问它 `which-skill`。

> **先读这一条**：课程作业和论文要遵守课程和学校关于 AI 使用的规定。技能能帮你理清结构、检查逻辑、找出漏洞，但不能代替你完成作业，更不能编造数据和参考文献。不确定能不能用，先问老师，并在作业里说明你如何使用了 AI。

## 课程作业

| 你想做的事 | 技能 | 说明 |
|---|---|---|
| 期末复习，把笔记、课件和阅读材料整理成一份提纲 | `study-notes-synthesizer` | 是综合，不是摘要：概念之间的联系和可能的考法 |
| 制定复习计划 | `exam-study-plan`、`exam-prep-planner` | 从考试日期倒排，用主动回忆和间隔重复，而不是反复重读 |
| 写课程论文的文献部分 | `literature-review`、`literature-review-builder` | 按主题综合、找出争议和空白，而不是一篇一篇列 |
| 参考文献格式 | `cn-citation-gbt7714` | GB/T 7714 格式；只整理你真实读过的文献 |
| 看懂老师给的代码、报错 | `code-explainer`、`git-troubleshooter`、`sql-query-explainer` | 适合编程、数据库课程 |
| 设计调查问卷 | `survey-design-basics` | 不带诱导的题目、合适的量表和分析计划 |
| 小组汇报做幻灯片、写讲稿 | `slide-deck`、`presenter-notes` | 一页一个结论，讲稿写提示词而不是逐字稿 |
| 案例分析作业 | `case-study-writeup` | 背景、问题、方案、结果的结构 |

## 毕业设计与毕业论文

| 阶段 | 技能 | 说明 |
|---|---|---|
| 开题 | `cn-thesis-proposal` | 按国内高校常用顺序：选题背景与意义、国内外研究现状、研究内容、技术路线、创新点、进度安排 |
| 搭大纲 | `thesis-outline` | 论证先行，每一章服务于主线 |
| 文献综述 | `literature-review-builder` | 把文献按观点组织，指出你的研究填补的空白 |
| 研究方法 | `research-protocol`、`survey-design-basics` | 研究方案、样本和伦理考虑 |
| 软件类毕设的设计文档 | `technical-spec-template`、`architecture-decision-record`、`test-strategy-doc` | 需求、架构取舍和测试方案，答辩时经得起追问 |
| 引用检查 | `cn-citation-gbt7714`、`citation-hygiene` | 格式统一；每个关键论断都有出处 |
| 答辩准备 | `the-thesis-defense` | 模拟不同类型的评委提问，找出你最怕被问的问题 |
| 答辩幻灯片 | `slide-deck`、`data-slide-design` | 数据图表一页说清一个结论 |

## 实习与求职

| 你想做的事 | 技能 | 说明 |
|---|---|---|
| 规划秋招、春招和实习转正 | `cn-campus-recruitment` | 时间线、目标公司清单、网申和笔试准备 |
| 第一份简历 | `graduate-cv` | 没有工作经历，用课程项目、社团、兼职和志愿活动作为证据 |
| 中英文简历 | `bilingual-cv-zh-en` | 外企和出海公司常要求 |
| 针对某家公司改简历 | `company-tailored-cv` | 对照岗位描述调整重点 |
| 投递前自查 | `cv-honesty-check` | 找出经不起面试追问和背景调查的说法 |
| 技术岗面试 | `cn-tech-interview-drill`、`system-design-interview` | 一面二面模拟、项目深挖、系统设计 |
| 通用面试准备 | `interview-prep`、`interview-me` | 行为面试题和模拟问答 |
| 国企、央企面试 | `cn-soe-interview` | |
| 考研或考公 | `cn-kaoyan-planner`、`cn-civil-exam-essay`、`cn-civil-exam-interview` | |
| 比较多个 offer | `offer-comparison` | 把薪资、成长、城市成本放在一起算 |
| 谈薪 | `salary-negotiation` | |
| 实习周报 | `cn-weekly-report`、`dingtalk-work-log` | 实习期间让导师看到你的成果 |

## 一个完整的例子

计算机专业大四的小林，秋招和毕设同时进行：

1. 九月用 `cn-campus-recruitment` 列出目标公司和时间线，用 `graduate-cv` 写简历，再用 `cv-honesty-check` 删掉了两句他在面试里讲不清的话。
2. 十月用 `cn-tech-interview-drill` 每周模拟一次面试，项目深挖部分暴露出他说不清毕设项目的技术取舍，于是用 `architecture-decision-record` 把三个关键决定写了下来。
3. 十一月开题，用 `cn-thesis-proposal` 理清结构，文献是他自己检索和阅读的，`cn-citation-gbt7714` 只负责格式。
4. 拿到两个 offer 后，用 `offer-comparison` 算清楚两个城市的实际收入。

每一步的内容和判断都是他自己的，技能负责的是"别漏掉什么"和"按什么结构写"。
