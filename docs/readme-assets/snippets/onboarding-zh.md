<!--
  README.zh-CN.md 的入门引导片段（Stream A）。按每段注释说明的位置粘贴。
  所有图片由 node scripts/build-readme-onboarding.mjs 生成（--check 可检查是否过期）。
  SVG 里的技能数和技能包数是实时读取的；下面标题里的 1,250 粘贴后由 scripts/check-drift.mjs 守护
  （注意：check-drift 目前不扫描 README.zh-CN.md，技能数变化时请手动更新这一处）。
  吉祥物：Nib（小笺），一张会挥手的小纸片。三个姿势：nib-wave、nib-point、nib-idea。
-->

<!-- ═══ 1. 一句话上手 ═══ 放在 H1 标题正下方，第一张图片之前。 -->

> **一句话上手** &nbsp; 安装：`npx --registry=https://registry.npmmirror.com pm-claude-skills add`（走国内镜像，任何工具都能用）· Claude Code 里输入 `/plugin` 搜索 **pm-skills**
> 然后直接说你要什么：*"帮我把这些笔记整理成周报。"*

<!-- ═══ 2. 漏斗图 ═══ 放在「## 它是怎么工作的」之前。 -->

## 🎯 1,250 个技能，你只需要 5 个

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/funnel-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/funnel-zh-light.svg">
    <img src="docs/readme-assets/funnel-zh.svg" width="100%" alt="动画漏斗：整个技能库先缩小到技能包，再缩小到为你挑选的一条路径，最后是你真正会用的 5 个技能。" />
  </picture>
</p>

不用把整个库都装上。选一条路径，装一个技能包，平时最常用的那几个技能就能解决大部分事情。技能只在你的请求对得上时才会加载，其余的不占用任何上下文。

<!-- ═══ 3. 选择你的路径 ═══ 放在漏斗图之后、「## 它是怎么工作的」之前。 -->

## 🧑‍🤝‍🧑 选择你的路径

<table><tr><td width="72">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/nib-wave.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/nib-wave-light.svg">
  <img src="docs/readme-assets/nib-wave.svg" width="64" alt="吉祥物 Nib 在挥手打招呼" />
</picture>
</td><td><b>你好，我是 Nib（小笺）。</b> 中文用户直接点第一张卡片：三个入门技能，每个都附一句可以直接复制的提问。其他卡片的页面目前是英文。</td></tr></table>

<p align="center">
  <a href="docs/start/chinese.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-chinese-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-chinese-zh-light.svg"><img src="docs/readme-assets/path-chinese-zh.svg" width="32%" alt="中文用户：周报、考公、裁员补偿，3 个入门技能" /></picture></a>
  <a href="docs/start/product-manager.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-product-manager-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-product-manager-zh-light.svg"><img src="docs/readme-assets/path-product-manager-zh.svg" width="32%" alt="产品经理：PRD、周报、会议纪要，3 个入门技能（英文页面）" /></picture></a>
  <a href="docs/start/engineer.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-engineer-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-engineer-zh-light.svg"><img src="docs/readme-assets/path-engineer-zh.svg" width="32%" alt="工程师：PR 描述、报错、代码评审，3 个入门技能（英文页面）" /></picture></a>
  <a href="docs/start/job-seeker.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-job-seeker-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-job-seeker-zh-light.svg"><img src="docs/readme-assets/path-job-seeker-zh.svg" width="32%" alt="求职者：读懂 JD、准备面试，3 个入门技能（英文页面）" /></picture></a>
  <a href="docs/start/student.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-student-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-student-zh-light.svg"><img src="docs/readme-assets/path-student-zh.svg" width="32%" alt="学生：备考、笔记、申请文书，3 个入门技能（英文页面）" /></picture></a>
  <a href="docs/start/founder.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/path-founder-zh.svg"><source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/path-founder-zh-light.svg"><img src="docs/readme-assets/path-founder-zh.svg" width="32%" alt="创业者：验证想法、算跑道、融资，3 个入门技能（英文页面）" /></picture></a>
</p>

<!-- ═══ 4. 流程图 ═══ 放在「选择你的路径」之后。GitHub 和 Gitee 都能直接渲染 mermaid 代码块。
     从顶部出发，两次点击就能到达任何一个技能包；图下方的链接是不支持点击节点时的备用入口。 -->

## 🗺️ 今天想做什么？

<table><tr><td width="72">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/nib-point.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/nib-point-light.svg">
  <img src="docs/readme-assets/nib-point.svg" width="64" alt="吉祥物 Nib 指向下方的流程图" />
</picture>
</td><td><b>不知道自己算哪一类？</b> 从你今天想做的事出发，每个小方框就是一个技能包，点开即可。</td></tr></table>

```mermaid
flowchart TD
  start(["今天想做什么？"])
  start --> zh & work & life & grow
  subgraph zh["🇨🇳 中文场景"]
    direction TB
    cnwork["周报、述职、复盘<br/><b>pm-china-work</b>"] ~~~ cnexams["考公、考研、校招<br/><b>pm-china-exams</b>"] ~~~ cnlife["劳动合同、补偿、社保<br/><b>pm-china-life</b>"] ~~~ cncontent["小红书、公众号、抖音<br/><b>pm-zh-content</b>"]
  end
  subgraph work["💼 把工作做完"]
    direction TB
    essentials["写 PRD、做规划<br/><b>pm-essentials</b>"] ~~~ engineering["写代码、做评审<br/><b>pm-engineering</b>"] ~~~ data["看懂数据<br/><b>pm-data</b>"]
  end
  subgraph life["🏠 处理生活琐事"]
    direction TB
    decoders["看懂合同和账单<br/><b>pm-decoders</b>"] ~~~ money["管好钱<br/><b>pm-money</b>"] ~~~ lifeadmin["投诉、搬家、理赔<br/><b>pm-lifeadmin</b>"]
  end
  subgraph grow["🌱 成长与转变"]
    direction TB
    jobsearch["找工作<br/><b>pm-jobsearch</b>"] ~~~ students["学习与申请<br/><b>pm-students</b>"] ~~~ founders["创业<br/><b>pm-founders</b>"] ~~~ thinking["做艰难的决定<br/><b>pm-thinking</b>"]
  end
  classDef q fill:#f2a65a,stroke:#c46f1f,color:#1f2328
  classDef b fill:#efe6fb,stroke:#4b2a7a,color:#1f2328
  class start q
  class cnwork,cnexams,cnlife,cncontent,essentials,engineering,data,decoders,money,lifeadmin,jobsearch,students,founders,thinking b
  click cnwork "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-china-work" "打开 pm-china-work"
  click cnexams "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-china-exams" "打开 pm-china-exams"
  click cnlife "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-china-life" "打开 pm-china-life"
  click cncontent "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-zh-content" "打开 pm-zh-content"
  click essentials "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-essentials" "打开 pm-essentials"
  click engineering "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-engineering" "打开 pm-engineering"
  click data "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-data" "打开 pm-data"
  click decoders "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-decoders" "打开 pm-decoders"
  click money "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-money" "打开 pm-money"
  click lifeadmin "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-lifeadmin" "打开 pm-lifeadmin"
  click jobsearch "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-jobsearch" "打开 pm-jobsearch"
  click students "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-students" "打开 pm-students"
  click founders "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-founders" "打开 pm-founders"
  click thinking "https://github.com/mohitagw15856/pm-claude-skills/tree/main/plugins/pm-thinking" "打开 pm-thinking"
```

<sub>直接跳转：**中文** [pm-china-work](plugins/pm-china-work/) · [pm-china-exams](plugins/pm-china-exams/) · [pm-china-life](plugins/pm-china-life/) · [pm-zh-content](plugins/pm-zh-content/) · **工作** [pm-essentials](plugins/pm-essentials/) · [pm-engineering](plugins/pm-engineering/) · [pm-data](plugins/pm-data/) · **生活** [pm-decoders](plugins/pm-decoders/) · [pm-money](plugins/pm-money/) · [pm-lifeadmin](plugins/pm-lifeadmin/) · **成长** [pm-jobsearch](plugins/pm-jobsearch/) · [pm-students](plugins/pm-students/) · [pm-founders](plugins/pm-founders/) · [pm-thinking](plugins/pm-thinking/)</sub>

<!-- ═══ 5. 小测验 ═══ 放在流程图之后。测验页面目前只有英文版，这里如实说明。 -->

## 🧩 你是哪一类专业人士？

四个小问题，每题两个选项，不用注册，最后给你推荐一个技能包和三个先试的技能。（测验页面为英文。）

**第 1 题：今天是为什么而来？**

<a href="docs/quiz/q2.md"><img src="docs/readme-assets/quiz/q1-a.svg" width="320" alt="A：为了工作（My work）" /></a>
<a href="docs/quiz/q3.md"><img src="docs/readme-assets/quiz/q1-b.svg" width="320" alt="B：为了下一步（My next step）" /></a>

<!-- ═══ 6. 任务清单 ═══ 放在「## 安装（全部走国内网络）」一节之后、「## 中文技能包」之前。 -->

## 🏆 任务清单

<table><tr><td width="72">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/nib-idea.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/nib-idea-light.svg">
  <img src="docs/readme-assets/nib-idea.svg" width="64" alt="吉祥物 Nib 想到了一个好主意" />
</picture>
</td><td><b>Nib 的小提示：</b> 第 1 关只要两分钟。随时可以停下，大多数人用不到第 5 关。</td></tr></table>

<details>
<summary><img src="docs/readme-assets/quest-1.svg" width="36" align="absmiddle" alt="第 1 关徽章" /> &nbsp;<b>第 1 关 · 新手：用上第一个技能</b></summary>

<br>

**任务：** 安装，然后提一个你这周真正需要解决的事。

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae   # 或 qoder / lingma / codebuddy / claude
```

然后用自己的话问：*"帮我把这些笔记整理成周报：……"*

**完成标准：** 你拿到的是一份写好的文档，而不是一堆建议。

</details>

<details>
<summary><img src="docs/readme-assets/quest-2.svg" width="36" align="absmiddle" alt="第 2 关徽章" /> &nbsp;<b>第 2 关 · 探索者：找到合适的技能</b></summary>

<br>

**任务：** 描述一件说不清楚该用哪个技能的事，让查找工具告诉你。

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills find "写述职报告"
```

也可以用 [魔搭路由模型](https://www.modelscope.ai/models/mohitagw15856/pm-skills-router)。

**完成标准：** 你用上了一个原本不知道存在的技能。

</details>

<details>
<summary><img src="docs/readme-assets/quest-3.svg" width="36" align="absmiddle" alt="第 3 关徽章" /> &nbsp;<b>第 3 关 · 收藏家：装上你的技能包</b></summary>

<br>

**任务：** 只装和你相关的中文技能包。

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle pm-china-work,pm-china-exams,pm-china-life
```

**完成标准：** 一周内用上其中三个技能。

</details>

<details>
<summary><img src="docs/readme-assets/quest-4.svg" width="36" align="absmiddle" alt="第 4 关徽章" /> &nbsp;<b>第 4 关 · 串联者：跑一条工作流</b></summary>

<br>

**任务：** 从 [WORKFLOWS.md](WORKFLOWS.md) 里挑一条工作流（比如 Run Discovery），在同一个对话里按顺序调用其中的技能。也可以用你自己的 Anthropic API Key 在命令行里一次跑完：

```bash
npx pm-claude-skills chain run-discovery --input notes.txt
```

**完成标准：** 放进去的是零散笔记，拿出来的是一整套成品文档。

</details>

<details>
<summary><img src="docs/readme-assets/quest-5.svg" width="36" align="absmiddle" alt="第 5 关徽章" /> &nbsp;<b>第 5 关 · 高手：做一个自己的技能</b></summary>

<br>

**任务：** 让 [make-me-a-skill](skills/make-me-a-skill/SKILL.md) 把你每周都要重复做的事变成一个 SKILL.md，然后检查它。

```bash
npx pm-claude-skills skillcheck --dir ./my-skills
```

**完成标准：** 你的技能通过检查，并且在你提出对应请求时会自动加载。想分享出来？看 [贡献指南](CONTRIBUTING.md)。

</details>
