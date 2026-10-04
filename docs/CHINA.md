# 在中国使用 PM Skills · Using PM Skills from China

[English section for maintainers](#for-maintainers-english) · [项目主页](https://github.com/mohitagw15856/pm-claude-skills) · [中文说明](../README.zh-CN.md)

PM Skills 是一个开源的 Agent Skills 库：每个技能是一份 Markdown 文件，教 AI 助手把一件专业工作做到资深水平。本页说明在中国大陆如何安装、使用和更新。

## 一、安装

### 用 npm 国内镜像

`npx` 默认从 npmjs.org 下载，在国内可能很慢。加上国内镜像即可：

```bash
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent claude
```

或者一次性设置：

```bash
npm config set registry https://registry.npmmirror.com
npx pm-claude-skills add --agent claude
```

### 用 Gitee 镜像克隆

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git
```

Gitee 镜像每次 GitHub 更新后自动同步。（镜像开通前，此地址可能尚不可用。）

## 二、在国内常用的 AI 编程工具里使用

| 工具 | 命令 | 规则写入位置 |
|---|---|---|
| Trae | `npx pm-claude-skills add --agent trae` | `.trae/rules/` |
| Qoder | `npx pm-claude-skills add --agent qoder` | `.qoder/rules/` |
| 通义灵码 Lingma | `npx pm-claude-skills add --agent lingma` | `.lingma/rules/` |
| CodeBuddy | `npx pm-claude-skills add --agent codebuddy` | `.codebuddy/rules/` |
| Claude Code | `npx pm-claude-skills add --agent claude` | `~/.claude/skills/` |
| Cursor | `npx pm-claude-skills add --agent cursor` | `.cursor/rules/` |

只安装部分技能包，加 `--bundle`：

```bash
npx pm-claude-skills add --agent trae --bundle pm-china-work,pm-cv
```

说明：
- 规则按描述"智能生效"，不会每次对话都全部加载。
- 通义灵码单个规则文件上限 10,000 字符，超长的技能会被截断，安装时会列出。

## 三、适合中国用户的技能包

| 技能包 | 内容 |
|---|---|
| **pm-china-work** 职场 | 周报 / 月报、述职报告 / 年终总结、晋升答辩、复盘 |
| **pm-china-life** 生活事务 | 劳动合同解读、经济补偿金（N、N+1、2N）估算、个税年度汇算、五险一金、高考志愿 |
| **pm-zh-content** 内容平台 | 小红书笔记、公众号文章、抖音脚本、直播带货脚本 |
| **pm-chuhai** 出海 | 出海市场进入计划、跨境电商 listing、PIPL 与 GDPR 对照 |
| **pm-cv** 简历 | 按目标公司定制简历、中英文简历、ATS 检查、导出 Word |

用中文提问即可，例如：

- "帮我把这些笔记整理成周报。"
- "公司要裁我，工作 6 年半，月薪 3 万，能拿多少补偿？"
- "帮我做一份中英文简历，要投外企。"

## 四、在线试用（Playground）

Playground 支持用你自己的 API Key 调用国内模型，Key 只保存在你的浏览器里，请求直接发给模型服务商：

| 模型 | 获取 API Key |
|---|---|
| GLM 智谱（有免费模型） | <https://bigmodel.cn/usercenter/proj-mgmt/apikeys> |
| DeepSeek 深度求索 | <https://platform.deepseek.com/api_keys> |
| Qwen 通义千问 | <https://bailian.console.aliyun.com/?apiKey=1> |
| Kimi 月之暗面 | <https://platform.moonshot.cn/console/api-keys> |
| Doubao 豆包 | <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> |

浏览器语言为简体中文时，默认选中 GLM 免费模型。模型名称更新很快；如果列表里没有你要的模型，选"其他模型"并输入模型名称。

注意：Playground 目前托管在 GitHub Pages，在国内可能访问较慢。离线也能用：安装后技能就在你本地。

## 五、MCP 服务

本地 MCP 服务不依赖任何海外网络：

```bash
claude mcp add pm-skills -- npx -y --registry=https://registry.npmmirror.com -p pm-claude-skills pm-claude-skills-mcp
```

托管的远程 MCP 地址（`workers.dev`）在国内大陆无法访问，请使用上面的本地方式。

## 六、反馈

欢迎用中文提 Issue。如果某个技能在中国的场景下不准确，或者你希望增加哪些技能，请告诉我们。

---

## For maintainers (English)

What is in place, and what still needs an account or a decision.

| Item | Status | To finish |
|---|---|---|
| npm mirror install line | Done | Nothing. npmmirror syncs from npmjs automatically |
| Gitee mirror | Workflow ready: `.github/workflows/mirror-gitee.yml` | Create the Gitee repository, add an SSH deploy key with push access, then set secret `GITEE_SSH_KEY` and variable `GITEE_REPO` |
| ModelScope dataset mirror | Workflow ready: `.github/workflows/publish-modelscope.yml` | Create the dataset on ModelScope, add secret `MODELSCOPE_TOKEN` and variable `MODELSCOPE_DATASET`; for an account on modelscope.ai also set `MODELSCOPE_HOST=www.modelscope.ai` |
| Chinese model providers in the playground | Done in `web/providers.js` | Doubao is untested with a real key: its error responses carry no CORS headers, so only a valid key and activated model will work |
| Trae, Qoder, Lingma, CodeBuddy | Done in `bin/cli.mjs` (`--agent`) | Rule files are generated at install time, not committed |
| Router understands Chinese | Done (`integrations/jev/catalog.mjs`, `find`) | Coverage grows with every translated description in `skills-i18n/zh/` |
| Hosted MCP and usage counter reachable from China | **Needs a custom domain** | `workers.dev` is blocked in mainland China. Add a domain to Cloudflare, attach it to the `pm-skills-mcp` worker (Workers, Settings, Domains and Routes, Add custom domain), then point `web/providers.js`, `web/nav.js`, `web/app.js` and `web/live.js` at it. Even then, reachability from China is not guaranteed |
| Playground reachable from China | Partly | GitHub Pages is slow or blocked at times. A mainland host needs an ICP filing; a Hong Kong or Singapore host is the usual compromise |
| Measuring Chinese usage | Partly | npmmirror publishes download counts per package; the Gitee mirror shows stars and forks. The country counter only sees visitors who can reach `workers.dev` |
