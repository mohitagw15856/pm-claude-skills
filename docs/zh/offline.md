# 内网离线包：在不能上网的电脑上使用 PM Skills

很多单位的办公电脑接不了互联网：政府机关、银行、国企、工厂、研究院，以及装信创系统的桌面。离线包把全部技能打成一个 zip，拷进内网就能用：

- 全部 1,250 个技能（英文原版）和 73 个简体中文、27 个繁体中文译文
- 技能包清单，可以只装需要的几个包
- 命令行工具 `bin/cli.mjs`：只需要 Node.js 18 或更新版本，**不需要 `npm install`，不访问网络**
- Cursor、Windsurf、Aider、Kilo Code 的规则文件
- 本地 MCP 服务器 `mcp/server.mjs`：同样不需要安装依赖，供 Cherry Studio 等支持 MCP 的客户端使用
- `index.html` 离线目录：双击用浏览器打开，能搜索、按技能包筛选，不发任何网络请求
- `INSTALL-zh.md`：简版安装说明

压缩包约 21 MB，解压后约 60 MB。没有遥测、没有账号、没有任何“回传”。

---

## 一、下载

在一台能上网的电脑上下载两个文件，`.zip` 和 `.zip.sha256`：

| 来源 | 地址 | 说明 |
|---|---|---|
| Gitee 发行版 | <https://gitee.com/mohitagw/pm-claude-skills/releases> | 每个版本的附件里都有，国内下载快 |
| GitHub Pages | <https://mohitagw15856.github.io/pm-claude-skills/offline/pm-skills-offline.zip> | 始终是最新版；校验文件在同一目录下的 `pm-skills-offline.zip.sha256` |

也可以自己从源码构建（需要 Node.js 和系统自带的 `zip` 命令）：

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git
cd pm-claude-skills
node scripts/build-offline-pack.mjs          # 输出 dist/pm-skills-offline.zip 和 .sha256
```

## 二、校验文件

把两个文件放在同一个文件夹里，再校验，确认传输中没有损坏或被替换：

**Linux、统信 UOS、银河麒麟**

```bash
sha256sum -c pm-skills-offline.zip.sha256
# 输出 pm-skills-offline.zip: OK 即通过
```

**macOS**

```bash
shasum -a 256 -c pm-skills-offline.zip.sha256
```

**Windows（PowerShell）**

```powershell
(Get-FileHash .\pm-skills-offline.zip -Algorithm SHA256).Hash
Get-Content .\pm-skills-offline.zip.sha256
# 两行开头的 64 位十六进制值一致即通过（不区分大小写）
```

Windows 也可以用命令提示符：`certutil -hashfile pm-skills-offline.zip SHA256`。

校验通过后，用 U 盘、内网文件服务器或单位规定的摆渡方式拷进内网。拷进去后建议再校验一次。

## 三、解压

| 系统 | 方法 |
|---|---|
| Windows | 右键“全部解压缩”，或 PowerShell：`Expand-Archive .\pm-skills-offline.zip -DestinationPath C:\pm-skills` |
| macOS | 双击，或 `unzip pm-skills-offline.zip` |
| Linux、统信 UOS、银河麒麟 | `unzip pm-skills-offline.zip`，或在文件管理器里右键解压 |

解压后得到 `pm-skills-offline` 文件夹。先双击里面的 `index.html` 看看有哪些技能。

## 四、准备 Node.js（可选，但推荐）

命令行工具需要 Node.js 18 或更新版本。先看看有没有：

```bash
node -v
```

没有的话，在能上网的电脑上从 npmmirror 下载安装包，一起拷进内网：<https://npmmirror.com/mirrors/node/>（选一个长期支持版，例如 v22 或 v24 开头的目录）。

| 系统 | 下载哪个文件 |
|---|---|
| Windows | `node-v版本号-x64.msi`，双击安装 |
| macOS | `node-v版本号.pkg`，双击安装 |
| Linux x86_64（Intel、AMD、海光、兆芯） | `node-v版本号-linux-x64.tar.xz` |
| Linux ARM64（飞腾、鲲鹏） | `node-v版本号-linux-arm64.tar.xz` |

不确定是哪种架构，在终端运行 `uname -m`：`x86_64` 选 x64，`aarch64` 选 arm64。

Linux 压缩包的安装方法（统信 UOS、银河麒麟同样适用）：

```bash
sudo mkdir -p /opt/node
sudo tar -xJf node-v*-linux-arm64.tar.xz -C /opt/node --strip-components=1
echo 'export PATH=/opt/node/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
node -v
```

> 龙芯（LoongArch，`uname -m` 显示 `loongarch64`）：Node.js 官方不提供这个架构的安装包。请先试系统软件源里的 `nodejs`（`sudo apt install nodejs`，确认版本不低于 18），或使用龙芯社区提供的构建。具体来源请以龙芯和系统厂商的说明为准。

没有 Node.js 也能用，见下面第六节“手动复制”。

## 五、安装到 AI 工具（用命令行工具）

在解压后的 `pm-skills-offline` 文件夹里打开终端（Windows 用 PowerShell），运行下面的命令。全部在本机完成，不联网。

```bash
# Trae：写到项目的 .trae/rules/ 里
node bin/cli.mjs add --agent trae --target /path/to/你的项目/.trae/rules

# 通义灵码：写到项目的 .lingma/rules/ 里
node bin/cli.mjs add --agent lingma --target /path/to/你的项目/.lingma/rules

# CodeBuddy、Qoder 同理：--agent codebuddy、--agent qoder

# Claude Code：默认写到 ~/.claude/skills/（所有项目都能用）
node bin/cli.mjs add --agent claude

# Cursor、Windsurf 也可以：--agent cursor、--agent windsurf
```

Windows 示例：

```powershell
cd C:\pm-skills\pm-skills-offline
node bin\cli.mjs add --agent trae --target D:\work\我的项目\.trae\rules
node bin\cli.mjs add --agent claude
```

先看会写哪些文件、不真正写入，加 `--dry-run`。

装好后，在 Trae 或通义灵码里打开这个项目，直接用中文提问（例如“帮我把这些笔记整理成周报”），工具会按规则的描述自动选用对应的技能。Claude Code 会在需要时自动加载 `~/.claude/skills/` 里的技能。

> 通义灵码单个规则文件上限是 10,000 字符，超长的技能会被截断，安装时会列出是哪几个。

### 在信创系统上：统信 UOS 和银河麒麟

统信 UOS 基于 Debian，银河麒麟桌面版基于 Ubuntu，命令和上面 Linux 部分完全一样：

1. 用 `uname -m` 确认架构，按第四节装好 Node.js（不需要联网）。
2. `unzip pm-skills-offline.zip`，进入 `pm-skills-offline`。
3. 运行 `node bin/cli.mjs add --agent ...`，把技能写进你使用的 AI 工具的规则目录。

如果你的 AI 工具在信创系统上没有桌面版（例如只能用浏览器访问单位内网部署的大模型），可以不装任何工具：打开 `index.html`，找到技能，把对应 `SKILL.md` 的全文复制为系统提示词即可，见[本地模型部署指南](local-models.md)。

### 接入 MCP 客户端

支持 MCP 的客户端（Cherry Studio、Claude Desktop 等）可以直接用包里的本地 MCP 服务器，通过 stdio 运行，不联网：

- 命令：`node`
- 参数：`/path/to/pm-skills-offline/mcp/server.mjs`（Windows 例如 `C:\pm-skills\pm-skills-offline\mcp\server.mjs`）

接入后，模型可以按需搜索和读取技能。配合本地模型时，请选择支持工具调用的模型（例如 Qwen3）。

## 六、手动复制（没有 Node.js 时）

技能就是普通的文本文件，可以直接复制：

- **Claude Code**：把 `skills/` 里需要的技能文件夹（整个文件夹）复制到 `~/.claude/skills/`。Windows 是 `%USERPROFILE%\.claude\skills\`。
- **Trae、通义灵码、CodeBuddy**：这几个工具的规则文件需要特定的文件头。最省事的做法是在内网里任意一台有 Node.js 的电脑上运行一次第五节的命令，再把生成的 `.trae/rules/`（或 `.lingma/rules/`）文件夹复制到其他电脑的项目里。
- **想用中文版**：`skills-i18n/zh/<技能名>/SKILL.md` 是简体中文译文，用它替换 Claude Code 技能文件夹里的 `SKILL.md` 即可。英文原版是规范版本，两者内容一致。

## 七、只装选定的技能包

一共 140 多个技能包。只想装几个，用 `--bundle`，多个包用英文逗号分隔：

```bash
# 中文职场、考试、生活三个包
node bin/cli.mjs add --agent trae --target /path/to/项目/.trae/rules --bundle pm-china-work,pm-china-exams,pm-china-life

# 合规团队只装合规包
node bin/cli.mjs add --agent lingma --target /path/to/项目/.lingma/rules --bundle pm-china-compliance
```

查看有哪些包：打开 `index.html`，“技能包”下拉框里列出了全部包和技能数量，选中后页面会显示对应的安装命令；或者直接看 `plugins/` 文件夹。

适合中文用户的包：`pm-china-work`（职场）、`pm-china-exams`（考试与求职）、`pm-china-life`（生活事务）、`pm-china-compliance`（合规）、`pm-hk-tw`（港台）、`pm-zh-content`（内容平台）、`pm-chuhai`（出海）、`pm-cv`（简历）。

单位统一分发时，也可以只把需要的技能文件夹复制出来，重新打一个小包，再走内网发放流程。

## 八、更新

1. 在能上网的电脑上下载最新的离线包和 `.sha256`，校验。
2. 拷进内网，再校验一次。
3. 解压，覆盖旧的 `pm-skills-offline` 文件夹。
4. 重新运行第五节的 `add` 命令。同名技能会被新版覆盖；已经删除的技能需要手动删掉旧文件。

每个版本的更新内容见 [Gitee 发行版](https://gitee.com/mohitagw/pm-claude-skills/releases)，有中文说明。

## 九、安全说明

- 离线包里只有文本文件（Markdown、JSON）和命令行工具的 JavaScript 源码，没有编译过的二进制文件，可以逐个审阅。
- 命令行工具的 `add` 和 `find` 命令只读写本地文件，不访问网络。
- `index.html` 不加载任何外部脚本、字体或图片。
- 技能是写给 AI 的工作方法，不是法律、医疗或财务意见。涉及金额、劳动纠纷、合规判断的结果，请让专业人士确认。

---

相关文档：[在中国使用 PM Skills](../CHINA.md) · [本地模型部署：数据不出域](local-models.md)
