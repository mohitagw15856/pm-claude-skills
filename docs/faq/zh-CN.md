# 常见问题

[English](README.md) · 简体中文 · [繁體中文](zh-TW.md) · [日本語](ja.md) · [한국어](ko.md) · [Español](es.md) · [Português](pt-BR.md)

## 技能是什么？和直接问模型有什么区别？

技能是一个纯 Markdown 文件 `SKILL.md`，教 AI 助手按资深专业人士的标准完成一项具体工作。直接问，模型凭印象回答，每次的结构和深度都不一样。加载技能后，模型照着一份写好的流程做：先问清缺的信息，再按固定结构产出，最后用清单自查。数字会列出计算过程。技能不替代模型，它给模型一套方法。

## 收费吗？能在公司用吗？

不收费。MIT 开源协议，可以商用、修改、放进公司内部工具。唯一的费用是你自己调用模型的费用，由模型服务商收取。

## 数据会上传吗？

不会。安装后技能就是你电脑上的 Markdown 文件，没有运行时、没有账号、默认没有遥测。你的对话只会发给你自己选的 AI 工具和模型，按它们的隐私政策处理。在线试用里的 API Key 只存在你的浏览器里，请求直接发给模型服务商。命令行的 `run` 子命令有一个可选的使用统计，只发技能名，而且只有设置 `PM_SKILLS_TELEMETRY=1` 才会发送。

## 支持哪些工具？

Claude Code、Claude Desktop 和 Cowork、Claude.ai、Cursor、Codex、Windsurf、Cline、Zed、Gemini CLI、Trae、通义灵码、Qoder、CodeBuddy，以及任何能读 Markdown 规则或支持 MCP 的工具。`npx pm-claude-skills add --agent <工具>` 会把文件写到各工具要求的位置。技能按描述智能触发，不会每次对话都全部加载。

## 怎么安装？

- **任意工具：**`npx --registry=https://registry.npmmirror.com pm-claude-skills add`，按提示操作。
- **Claude Code：**打开 `/plugin`，在官方目录里搜 pm-skills，安装需要的技能包。
- **Python：**`pip install pm-skills`（可用清华 PyPI 镜像）。
- **MCP：**在 MCP 配置里加 `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp`。
- **不想安装：**[魔搭创空间](https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground) 或 [在线试用](https://mohitagw15856.github.io/pm-claude-skills/) 直接在浏览器里跑。

## 不会写代码，能用吗？

能。最简单的是打开 [魔搭创空间](https://www.modelscope.ai/studios/mohitagw15856/pm-skills-playground)，选一个技能，用中文说你要做什么。也可以在 Cherry Studio 里加一个 MCP 服务，或者把 [Dify 应用模板](../../integrations/dify-templates/) 导入 Dify。

## 技能不触发怎么办？

说得更明确一些：按技能描述里的说法提需求，比如"帮我写一份 PRD"而不是"帮我看看这个"。用 `npx pm-claude-skills doctor` 确认已安装。还是不行，就[提一个 Bug](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)，附上你用的原话。

## 怎么更新？

重新运行一次安装命令即可。`npx pm-claude-skills doctor` 会列出已安装和已过时的技能。Claude Code 里打开 `/plugin` 更新 pm-claude-skills 市场。Python 用 `pip install -U pm-skills`。用 Gitee 克隆的，`git pull` 就行，镜像会在每次 GitHub 更新后自动同步。自己 Fork 的，仓库自带的 `sync-fork.yml` 工作流每周把 `main` 快进到上游，见 [fork-sync.md](../fork-sync.md)。

## 劳动、税务这类答案靠谱吗？

把它当准备材料，不是专业意见。技能会把计算过程和依据写出来，列出需要你核实的数字，并给出应当咨询的机构（劳动仲裁、税务机关、律师）。各地政策不同、变化也快，以当地最新规定为准。

## 能在公司内部用、加自己的私有技能吗？

能。企业版是一个容器：`docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`，把私有技能目录挂载进去即可。私有技能放在单独的目录或仓库里，这样公共技能库随时可以更新。

## 国内能用吗？要翻墙吗？

不用翻墙。npm 用 npmmirror 镜像，源码用 [Gitee](https://gitee.com/mohitagw/pm-claude-skills)，Python 包用清华 PyPI 镜像，在线试用在魔搭创空间。镜像与离线包见 [docs/CHINA.md](../CHINA.md)。

## 怎么提需求、反馈问题、参与贡献？

用 Issue 表单：[技能需求](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml)、[Bug 反馈](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)、[提问](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml)，GitHub 和 [Gitee](https://gitee.com/mohitagw/pm-claude-skills/issues) 都可以，用中文即可。想加技能，看 [CONTRIBUTING.md](../../CONTRIBUTING.md) 然后提 PR。👍 最多的需求优先做。
