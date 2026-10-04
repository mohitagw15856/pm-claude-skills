# 🇨🇳 从这里开始：中文用户

<sub>[PM Skills](../../README.zh-CN.md) 的入门页。先试这三个技能就够了，其他的以后再说。</sub>

## 安装（走国内镜像）

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-work,pm-china-exams,pm-china-life
```

`--agent` 也可以换成 `qoder`、`lingma`（通义灵码）、`codebuddy` 或 `claude`。用 Claude Code 的话，也可以直接输入 `/plugin install pm-china-work@pm-claude-skills`。

## 先试这 3 个技能

直接用中文说出你的需求，补上自己的情况，对应的技能会自动加载。

### 1. [cn-weekly-report](../../skills/cn-weekly-report/SKILL.md) · 写周报

把零散的笔记整理成领导爱看的周报或月报：有数字的结果、目标进度、提前暴露的风险、下周计划和需要的支持。

```text
帮我把这些笔记整理成周报，发给我的直属领导：……
```

### 2. [cn-civil-exam-interview](../../skills/cn-civil-exam-interview/SKILL.md) · 公务员面试模拟

针对公务员和事业单位的结构化面试：常见题型、每类题的答题框架、限时模拟，以及对内容、结构和表达的点评。

```text
下个月考公务员面试，岗位是区税务局。帮我模拟一轮，每题限时 3 分钟。
```

### 3. [cn-severance-calculator](../../skills/cn-severance-calculator/SKILL.md) · 裁员补偿计算

按《劳动合同法》估算经济补偿金：N、N+1 还是 2N，高收入封顶怎么算，不满一年的部分怎么折算，以及决定适用哪种情形的关键问题。

```text
公司要裁我，我在上海工作了 6 年 7 个月，月薪 2.8 万。能拿多少补偿？签字前要注意什么？
```

## 准备好了，再装完整技能包

- **[pm-china-work](../../plugins/pm-china-work/)** 职场：周报月报、述职、晋升答辩、复盘、飞书、钉钉、企业微信。
- **[pm-china-exams](../../plugins/pm-china-exams/)** 考试与求职：申论、结构化面试、考研、开题报告、校招。
- **[pm-china-life](../../plugins/pm-china-life/)** 生活事务：劳动合同、经济补偿金、个税汇算、五险一金、医保报销。

还想要更多？看看 [中文说明](../../README.zh-CN.md)、[国内安装指南](../CHINA.md) 或 [开源小课](../learn-zh/README.md)。

<sub>计算结果仅供参考，具体以当地规定和专业意见为准。</sub>
