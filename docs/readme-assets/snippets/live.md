<!--
  Live and animated images for README.md (English).
  Static images live in docs/readme-assets/ (built by: node scripts/build-readme-live.mjs --static).
  Live images are built into web/live/ by deploy-playground.yml on every deploy and daily at
  00:05 Beijing time, and served from https://mohitagw15856.github.io/pm-claude-skills/live/.
  Each block below says where it goes. Paste the blocks, not this comment.
-->

<!-- 1. HERO. Goes directly under the H1 title, replacing or above the current hero image. -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/constellation.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/constellation-light.svg">
    <img alt="PM Skills: skill names drift in like stars and join into the PM Skills wordmark" src="docs/readme-assets/constellation-light.svg" width="860">
  </picture>
</p>

<!-- 2. STATS TICKER. Goes right under the hero (above or in place of the static count badges). -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/stats-light.svg">
    <img alt="Live numbers: skills, bundles, GitHub stars, weekly npm downloads and translated skills, refreshed daily" src="https://mohitagw15856.github.io/pm-claude-skills/live/stats-light.svg" width="860">
  </picture>
</p>

<!-- 3. TERMINAL. Goes at the top of the install / quick start section, before the install commands. -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/terminal.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/terminal-light.svg">
    <img alt="A terminal: npx pm-claude-skills add installs the skills, then three requests each load one skill and return finished work" src="docs/readme-assets/terminal-light.svg" width="860">
  </picture>
</p>

<!-- 4. SKILL OF THE DAY. Goes after "How it works" (or wherever the README first invites the reader to try a skill). -->
<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day.html">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-light.svg">
      <img alt="Skill of the day: a different skill every day, with a prompt to try" src="https://mohitagw15856.github.io/pm-claude-skills/live/skill-of-the-day-light.svg" width="860">
    </picture>
  </a>
</p>

<!-- 5. CHINA MIRRORS. Goes on the existing "国内镜像" line near the top (README.md line ~125), as a row of status badges after the links. The check runs from GitHub's servers, so it shows whether each channel is online, not how fast it is from inside China. -->
<p>
  <a href="https://gitee.com/mohitagw/pm-claude-skills"><img alt="Gitee mirror status" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-gitee.svg"></a>
  <a href="https://npmmirror.com/package/pm-claude-skills"><img alt="npmmirror status" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-npmmirror.svg"></a>
  <a href="https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground"><img alt="ModelScope studio status" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-modelscope-studio.svg"></a>
  <a href="https://www.modelscope.ai/datasets/mohitagw15856/pm-skills-instruct"><img alt="ModelScope dataset status" src="https://mohitagw15856.github.io/pm-claude-skills/live/cn-status-modelscope-dataset.svg"></a>
</p>

<!-- 6. CHINESE MODEL LEADERBOARD. Goes in the benchmarks / SkillBench section, after the existing model leaderboard. Shows a "first run in progress" placeholder until web/modelbench-zh.json has results. -->
<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/modelbench.html?set=zh">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh-en.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh-en-light.svg">
      <img alt="Skill lift on Chinese models: SkillBench Chinese task set scores with and without skills" src="https://mohitagw15856.github.io/pm-claude-skills/live/modelbench-zh-en-light.svg" width="860">
    </picture>
  </a>
</p>
