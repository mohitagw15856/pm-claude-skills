<!--
  README.zh-CN.md 的实时图片与动画。
  静态图片在 docs/readme-assets/（node scripts/build-readme-live.mjs --static 生成）。
  实时图片由 deploy-playground.yml 在每次部署和每天北京时间 00:05 生成到 web/live/，
  地址是 https://mohitagw15856.github.io/pm-claude-skills/live/ 。
  每一段前面都写了放在哪里。粘贴下面的代码块，不要粘贴这段注释。
-->

<!-- 1. 节气与节日横幅。放在一级标题正下方，作为首屏横幅。每天按北京时间更新：二十四节气、春节（红包雨）、中秋、国庆、618、双 11。 -->
<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/live/season.html">
    <img alt="今日节气与节日横幅，每天更新" src="https://mohitagw15856.github.io/pm-claude-skills/live/season.svg" width="860">
  </a>
</p>

<!-- 2. 星座字标。紧接在节气横幅下面（或替换现有的首屏图）。 -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/constellation-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/constellation-zh-light.svg">
    <img alt="PM Skills：技能名称像星星一样聚拢，连成 PM Skills 字样" src="docs/readme-assets/constellation-zh-light.svg" width="860">
  </picture>
</p>

<!-- 3. 实时数据。放在徽章行下面。 -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats-zh-light.svg">
    <img alt="实时数据：技能数、技能包数、GitHub 星标、npm 周下载量和译文数，每天更新" src="https://mohitagw15856.github.io/pm-claude-skills/live/stats-zh-light.svg" width="860">
  </picture>
</p>

<!-- 4. 国内渠道状态。放在“国内安装”或镜像链接那一段里。检测从 GitHub 服务器发起，只说明渠道在线，不代表国内访问速度。 -->
<p>
  <a href="https://gitee.com/mohitagw/pm-claude-skills"><img alt="Gitee 镜像状态" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-gitee.svg"></a>
  <a href="https://npmmirror.com/package/pm-claude-skills"><img alt="npmmirror 状态" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-npmmirror.svg"></a>
  <a href="https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground"><img alt="魔搭创空间状态" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-modelscope-studio.svg"></a>
  <a href="https://www.modelscope.ai/datasets/mohitagw15856/pm-skills-instruct"><img alt="魔搭数据集状态" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-modelscope-dataset.svg"></a>
</p>
<sub>状态每天从 GitHub 服务器检测一次，✅ 表示在线，⚠️ 表示当天没有响应；不代表国内访问速度。</sub>

<!-- 5. 终端演示。放在安装章节开头、安装命令前面。 -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/terminal-zh.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/terminal-zh-light.svg">
    <img alt="终端演示：用 npmmirror 安装技能，然后三个中文请求各自加载一个技能并给出成品" src="docs/readme-assets/terminal-zh-light.svg" width="860">
  </picture>
</p>

<!-- 6. 今日技能。放在“工作原理”之后，或第一次邀请读者试用技能的地方。 -->
<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-zh.html">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-zh.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-zh-light.svg">
      <img alt="今日技能：每天推荐一个有中文译文的技能，并附一句可以直接说的话" src="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-zh-light.svg" width="860">
    </picture>
  </a>
</p>

<!-- 7. 考试倒计时。放在考试相关技能（pm-china-exams 技能包、高考规划）那一段。日期见 data/cn-exam-dates.json，标“预计”的日期等官方公告后改成 confirmed。 -->
<p>
  <a href="https://mohitagw15856.github.io/pm-claude-skills/skill/cn-gaokao-planner.html"><img alt="高考倒计时" src="https://mohitagw15856.github.io/pm-claude-skills/live/exam-gaokao.svg"></a>
  <a href="https://mohitagw15856.github.io/pm-claude-skills/skill/cn-kaoyan-planner.html"><img alt="考研初试倒计时" src="https://mohitagw15856.github.io/pm-claude-skills/live/exam-kaoyan.svg"></a>
  <a href="https://mohitagw15856.github.io/pm-claude-skills/skill/cn-civil-exam-essay.html"><img alt="国考笔试倒计时" src="https://mohitagw15856.github.io/pm-claude-skills/live/exam-guokao.svg"></a>
</p>

<!-- 8. 中文模型技能增益榜。放在评测 / SkillBench 章节。第一轮结果出来前显示“首次评测进行中”。 -->
<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/modelbench.html">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh-light.svg">
      <img alt="中文模型技能增益榜：加载技能前后的得分" src="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh-light.svg" width="860">
    </picture>
  </a>
</p>

<!-- 9. 拜年语生成器。放在“在线工具”或首屏链接行，春节前后最有用。 -->
[🧧 拜年语生成器](https://mohitagw15856.github.io/pm-claude-skills/bainian.html)：选对象、选语气、选生肖年份，一键复制新春祝福。
