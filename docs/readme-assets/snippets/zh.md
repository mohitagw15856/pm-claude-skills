<!--
  README.zh-CN.md 的中文用户内容（书法题图、打工人的一天、工具支持、提问墙、聊天演示、扫码海报、常见问题）。
  图片在 docs/readme-assets/：
    node scripts/build-readme-zh.mjs     生成 calligraphy-zh*、day-zh*、chats-zh*（深色和浅色各一份）
    node scripts/build-zh-poster.mjs     生成 poster-zh.png（1080x1440）和 poster-zh-small.png，并校验二维码
  书法字形来自 Make Me a Hanzi（Arphic Public License），见 docs/readme-assets/LICENCES.md。
  每一段前面都写了放在哪里（按当前 README.zh-CN.md 的标题）。粘贴下面的代码块，不要粘贴这段注释。
  繁体中文说明在 README.zh-TW.md；导航里的链接由维护者自己加。
-->

<!-- 1. 书法题图。“技能库”一笔一画写出来，最后盖上 PM 印章。
     建议放在“## 中文技能包”标题正下方、表格上面，作为这一节的题图。
     也可以在 Gitee 首页替换首屏的星座字标（二选一，首屏不要同时放两张大图）。 -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/calligraphy-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/calligraphy-zh-light.svg">
    <img alt="书法动画：“技能库”三个字一笔一画写出来，最后盖上 PM 印章" src="docs/readme-assets/calligraphy-zh-light.svg" width="860">
  </picture>
</p>

<!-- 2. 打工人的一天。新的一节，放在“## 它是怎么工作的”这一节末尾（今日技能图下面）、“## 安装（全部走国内网络）”上面。 -->
## ☕ 打工人的一天

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/day-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/day-zh-light.svg">
    <img alt="打工人的一天：9:00 站会、10:30 需求评审、14:00 向老板汇报、16:00 项目复盘、17:30 写周报、19:30 晋升答辩、21:30 下班后考研，每个时刻对应一个技能" src="docs/readme-assets/day-zh-light.svg" width="860">
  </picture>
</p>

<p align="center"><sub>
<b>9:00</b> <a href="skills/async-standup-compiler/SKILL.md">站会</a> ·
<b>10:30</b> <a href="skills/cn-prd-review/SKILL.md">需求评审</a> ·
<b>14:00</b> <a href="skills/stakeholder-update/SKILL.md">向老板汇报</a> ·
<b>16:00</b> <a href="skills/cn-fupan/SKILL.md">项目复盘</a> ·
<b>17:30</b> <a href="skills/cn-weekly-report/SKILL.md">写周报</a> ·
<b>19:30</b> <a href="skills/cn-promotion-defence/SKILL.md">晋升答辩</a> ·
<b>21:30</b> <a href="skills/cn-kaoyan-planner/SKILL.md">下班后考研</a>
</sub></p>

<!-- 3. 支持的 AI 编程工具。放在“## 安装（全部走国内网络）”这一节里，紧跟在 bash 代码块后面、“| 你想… | 国内地址 |”表格前面。
     只列出 CLI 的 --agent 实际支持的工具（bin/cli.mjs）。 -->
### 支持的 AI 编程工具

<table>
<tr>
<td width="50%"><b>✅ Trae</b> <sub>写入 <code>.trae/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae</code></td>
<td width="50%"><b>✅ 通义灵码 Lingma</b> <sub>写入 <code>.lingma/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent lingma</code></td>
</tr>
<tr>
<td><b>✅ CodeBuddy</b> <sub>写入 <code>.codebuddy/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent codebuddy</code></td>
<td><b>✅ Qoder</b> <sub>写入 <code>.qoder/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent qoder</code></td>
</tr>
<tr>
<td><b>✅ Cursor</b> <sub>写入 <code>.cursor/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent cursor</code></td>
<td><b>✅ Claude Code</b> <sub>写入 <code>~/.claude/skills/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent claude</code></td>
</tr>
<tr>
<td><b>✅ Codex</b> <sub>写入 <code>~/.codex/skills/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent codex</code></td>
<td><b>✅ Windsurf</b> <sub>写入 <code>.windsurf/rules/</code></sub><br><code>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent windsurf</code></td>
</tr>
</table>

<sub>另外支持 Kilo Code、Aider、Hermes、OpenClaw（<code>--agent kilocode</code> 等）。通义灵码单个规则文件上限 10,000 字符，超长的技能会被截断，安装时会列出。Qwen Code、Kimi CLI、文心快码（Comate）暂时还没有 <code>--agent</code> 选项；如果你用的工具支持 MCP，可以先接入本地 MCP 服务，见 <a href="docs/CHINA.md">在中国使用</a> 第五节。</sub>

<!-- 4. 聊天演示 + 提问墙。新的一节，放在“## 中文技能包”这一节末尾（考试倒计时下面）、“## 看一看”上面。 -->
## 💬 复制一句，马上就用

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/chats-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/chats-zh-light.svg">
    <img alt="四段聊天演示：写周报、申论提纲、考研计划、小红书笔记，每段由对应的技能给出结构化的回答" src="docs/readme-assets/chats-zh-light.svg" width="860">
  </picture>
</p>

装好以后，把下面任意一句发给你的 AI 助手（省略号换成你自己的情况），它会自动加载对应的技能。

<details open>
<summary><b>💼 职场</b></summary>

```text
帮我把这些笔记整理成周报：……
```
→ [`cn-weekly-report`](skills/cn-weekly-report/SKILL.md)

```text
明天开需求评审，帮我检查这份 PRD，研发和测试会问什么？
```
→ [`cn-prd-review`](skills/cn-prd-review/SKILL.md)

```text
下个月晋升答辩，从 P6 到 P7，帮我搭材料框架，再模拟评委提问。
```
→ [`cn-promotion-defence`](skills/cn-promotion-defence/SKILL.md)

```text
项目延期了一个月，帮我组织一次复盘，不要变成追责会。
```
→ [`cn-fupan`](skills/cn-fupan/SKILL.md)

```text
帮我写年终述职报告，这是我今年的 OKR 和完成情况：……
```
→ [`cn-year-end-review`](skills/cn-year-end-review/SKILL.md)

```text
阿里 P7 跳槽到字节，大概对应几级？这个 offer 算平跳还是升职？
```
→ [`cn-level-mapper`](skills/cn-level-mapper/SKILL.md)

```text
帮我写一份请示，申请增加下半年的培训经费，按公文格式排。
```
→ [`cn-official-document`](skills/cn-official-document/SKILL.md)

```text
项目要延期，我该怎么跟老板说，才能拿到他的支持？
```
→ [`managing-up`](skills/managing-up/SKILL.md)

</details>

<details>
<summary><b>📚 学业与考试</b></summary>

```text
离考研还有 100 天，目标 985 计算机，帮我排每天的复习计划。
```
→ [`cn-kaoyan-planner`](skills/cn-kaoyan-planner/SKILL.md)

```text
这是申论的给定资料和题目，帮我审题、列提纲，再写一段开头。
```
→ [`cn-civil-exam-essay`](skills/cn-civil-exam-essay/SKILL.md)

```text
下个月公务员面试，帮我模拟一轮结构化面试，答完给我打分。
```
→ [`cn-civil-exam-interview`](skills/cn-civil-exam-interview/SKILL.md)

```text
帮我写开题报告，研究方向是……，导师要求下周交。
```
→ [`cn-thesis-proposal`](skills/cn-thesis-proposal/SKILL.md)

```text
帮我把这些参考文献按 GB/T 7714 改成顺序编码制。
```
→ [`cn-citation-gbt7714`](skills/cn-citation-gbt7714/SKILL.md)

```text
明年秋招，计算机硕士，帮我列时间线和目标公司清单。
```
→ [`cn-campus-recruitment`](skills/cn-campus-recruitment/SKILL.md)

```text
下周字节二面，帮我模拟一轮项目深挖和系统设计。
```
→ [`cn-tech-interview-drill`](skills/cn-tech-interview-drill/SKILL.md)

</details>

<details>
<summary><b>🏠 生活</b></summary>

```text
公司要裁我，工作 6 年半，月薪 3 万，能拿多少补偿？
```
→ [`cn-severance-calculator`](skills/cn-severance-calculator/SKILL.md)

```text
帮我看看这份劳动合同，有没有对我不利的条款？
```
→ [`cn-labour-contract-decoder`](skills/cn-labour-contract-decoder/SKILL.md)

```text
个税年度汇算怎么做？年终奖单独计税还是并入综合所得更划算？
```
→ [`cn-iit-reconciliation`](skills/cn-iit-reconciliation/SKILL.md)

```text
在上海租房，公积金能提吗？每个月能提多少？
```
→ [`cn-housing-fund-withdrawal`](skills/cn-housing-fund-withdrawal/SKILL.md)

```text
我在上海工作 5 年，本科学历，积分落户还差多少分？
```
→ [`cn-hukou-points`](skills/cn-hukou-points/SKILL.md)

```text
换工作中间断了两个月社保，有什么影响？要不要自己补交？
```
→ [`cn-social-insurance-explainer`](skills/cn-social-insurance-explainer/SKILL.md)

```text
孩子高考 580 分，河南物理类，帮我做一份冲稳保的志愿方案。
```
→ [`cn-gaokao-planner`](skills/cn-gaokao-planner/SKILL.md)

</details>

<details>
<summary><b>🌏 出海</b></summary>

```text
我们做智能家居，想出海，东南亚和欧洲先去哪？帮我做第一年的计划。
```
→ [`chuhai-market-entry`](skills/chuhai-market-entry/SKILL.md)

```text
Temu 全托管、TikTok Shop 还是亚马逊 FBA？帮我对比一下。
```
→ [`crossborder-platform-playbook`](skills/crossborder-platform-playbook/SKILL.md)

```text
把这个产品的中文介绍改写成亚马逊美国站的 listing，不要直译。
```
→ [`cross-border-listing`](skills/cross-border-listing/SKILL.md)

```text
用户数据要同步到海外总部，PIPL 和 GDPR 分别要我们做什么？
```
→ [`pipl-gdpr-crosswalk`](skills/pipl-gdpr-crosswalk/SKILL.md)

```text
我们把国内用户数据传到新加坡服务器，要申报数据出境安全评估吗？
```
→ [`cn-data-export-assessment`](skills/cn-data-export-assessment/SKILL.md)

```text
帮我做一份中英文简历，要投外企。
```
→ [`bilingual-cv-zh-en`](skills/bilingual-cv-zh-en/SKILL.md)

</details>

<!-- 5. 扫码海报。放在“## 看一看”这一节末尾（拜年语生成器那一行下面）、“## 质量”上面。
     完整尺寸的 poster-zh.png（1080x1440，3:4）适合发小红书、朋友圈。 -->
<table><tr>
<td width="300"><a href="docs/readme-assets/poster-zh.png"><img src="docs/readme-assets/poster-zh-small.png" width="280" alt="扫码海报：技能库书法题图、三句示例提问、魔搭在线试用二维码和 Gitee 地址"></a></td>
<td><b>📱 扫码试用，转发给同事</b><br><br>
手机扫码打开 <a href="https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground">魔搭创空间</a>，不用安装就能试。<br><br>
想发小红书或朋友圈？点图片下载 <a href="docs/readme-assets/poster-zh.png">1080×1440 原图</a>。<br><br>
源码国内镜像：<a href="https://gitee.com/mohitagw/pm-claude-skills">gitee.com/mohitagw/pm-claude-skills</a></td>
</tr></table>

<!-- 6. 常见问题。新的一节，放在“## 质量”这一节后面、“## 参与贡献”上面。 -->
## ❓ 常见问题

<details>
<summary><b>这个和直接问 DeepSeek 有什么区别？</b></summary>

直接问，模型凭印象回答，每次的结构和深度都不一样。加载技能后，模型照着一份写好的专业流程做：先问清缺的信息，再按固定结构产出，最后用清单自查。比如问补偿，[`cn-severance-calculator`](skills/cn-severance-calculator/SKILL.md) 会先判断适用 N、N+1 还是 2N，再一步步算，并列出签字前要核对的事项。技能不替代模型，DeepSeek 照样可以用：在线试用和 MCP 都能接 DeepSeek。
</details>

<details>
<summary><b>国内能用吗？要翻墙吗？</b></summary>

安装和下载都可以只走国内网络：npm 用 npmmirror 镜像，源码用 [Gitee](https://gitee.com/mohitagw/pm-claude-skills)，Python 包用清华 PyPI 镜像，在线试用在 [魔搭创空间](https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground)。本地 MCP 服务也不依赖海外网络。两处例外：托管在 `workers.dev` 的远程 MCP 在大陆无法访问，GitHub Pages 上的网页有时较慢。详见 [在中国使用](docs/CHINA.md)。
</details>

<details>
<summary><b>收费吗？</b></summary>

不收费。MIT 开源协议，可以商用、修改、放进公司内部工具。唯一的费用是你自己调用模型的费用，由模型服务商收取；魔搭每天有免费额度，智谱也有免费模型。
</details>

<details>
<summary><b>数据会上传吗？</b></summary>

技能库本身不上传任何东西。安装后技能就是你电脑上的 Markdown 文件，没有运行时、没有账号、默认没有遥测。你的对话内容只会发给你自己选的 AI 工具和模型，按它们的隐私政策处理。在线试用里的 API Key 只存在你的浏览器里，请求直接发给模型服务商。命令行的 `run` 子命令有一个可选的使用统计，只有设置 `PM_SKILLS_TELEMETRY=1` 才会发送，而且只发技能名，不发内容。
</details>

<details>
<summary><b>支持哪些工具？Trae、通义灵码能用吗？</b></summary>

能。`--agent` 支持 Trae、通义灵码、Qoder、CodeBuddy、Cursor、Claude Code、Codex、Windsurf 等，见上面的工具列表。规则按描述智能生效，不会每次对话都全部加载。
</details>

<details>
<summary><b>不会写代码，能用吗？</b></summary>

能。最简单的是打开 [魔搭创空间](https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground)，选一个技能，用中文说你要做什么。也可以在 Cherry Studio 里加一个 MCP 服务，或者把 [Dify 应用模板](integrations/dify-templates/) 导入 Dify。
</details>

<details>
<summary><b>技能是中文写的吗？</b></summary>

中文技能包里的技能（多数以 `cn-` 开头）专门按国内的实际写：周报的结构、N+1 的算法、GB/T 7714 的格式、公文的版式。技能说明多数用英文写，但会要求模型用简体中文回答。[`skills-i18n/zh/`](skills-i18n/zh/) 有 73 个技能的简体中文译本，[`skills-i18n/zh-TW/`](skills-i18n/zh-TW/) 有 27 个繁体中文译本。你只管用中文提问。
</details>

<details>
<summary><b>劳动、税务这类答案靠谱吗？</b></summary>

技能会把计算过程和依据写出来，列出需要你核实的数字，并给出明确的免责声明和应当咨询的机构（劳动仲裁、税务机关、律师）。它能帮你把问题弄清楚、把材料准备好，但不能代替专业意见。各地政策不同，以当地最新规定为准。
</details>

<details>
<summary><b>怎么更新？</b></summary>

重新运行一次安装命令即可。用 Gitee 克隆的，`git pull` 就行，镜像会在每次 GitHub 更新后自动同步。想看装了哪些、哪些过时了，运行 `npx pm-claude-skills doctor`。
</details>

<details>
<summary><b>哪里不准，怎么反馈？</b></summary>

用中文提 Issue，[GitHub](https://github.com/mohitagw15856/pm-claude-skills/issues) 和 [Gitee](https://gitee.com/mohitagw/pm-claude-skills/issues) 都可以。某个技能不符合国内实际，或者你想要新技能，都欢迎告诉我们。
</details>
