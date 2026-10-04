# 数据不出域：用本地模型运行 PM Skills

技能本身只是文本：一份写给 AI 的工作方法。把它作为系统提示词交给**部署在你自己机器或内网服务器上的模型**，整个过程就不会有任何数据离开你的网络。适合处理合同、薪酬、客户资料、内部文件等不能发给云端模型的内容。

这份指南讲四件事：

1. 用 Ollama 在个人电脑上运行通义千问（Qwen）和 DeepSeek，以及服务器上的替代方案（vLLM、LM Studio）
2. 在完全断网的环境里，从魔搭 ModelScope 下载模型并拷进内网
3. 把技能接到本地模型上：网页 Playground、Cherry Studio、Python
4. 硬件怎么选，安全上要注意什么

> 标注“⚠ 以官方为准”的地方与软件版本有关，写作时（2026 年 10 月）核对过，但这些工具更新很快，请以各自官网的最新说明为准。

---

## 一、技能是怎么交给模型的

每个技能是一个 `SKILL.md` 文件。用法只有一步：**把整个文件的内容作为 system 消息，你的问题作为 user 消息**。

```text
system: <skills/cn-weekly-report/SKILL.md 的全文>
user:   帮我把这些笔记整理成周报：……
```

Claude Code、Trae 等工具会根据描述自动挑选技能；直接调用本地模型时，由你（或你的程序）决定用哪个技能。技能文件在哪里：

- [内网离线包](offline.md)：`skills/`（英文原版）和 `skills-i18n/zh/`（简体中文译文）
- 或者克隆 Gitee 镜像：`git clone https://gitee.com/mohitagw/pm-claude-skills.git`

中文问题配中文模型时，优先用 `skills-i18n/zh/` 里的中文版；没有中文版的技能，用英文原版加中文提问，Qwen 和 DeepSeek 一样能用中文回答。

**上下文长度要够。** 技能的长度中位数约 4,700 个字符，最长的约 26,000 个字符，加上你的材料和回答，建议上下文窗口至少 16K tokens。Ollama 的默认上下文较短（⚠ 默认值随版本变化，以官方为准），需要手动调大，方法见第三节。

## 二、选模型和硬件

下表按 Q4_K_M 量化（4 位量化，质量和体积比较均衡）估算。“内存”指只用 CPU 运行时的系统内存；“显存”指全部放进 GPU 时的需求。上下文越长，占用越多。

| 模型 | 量化后大小（约） | 只用 CPU：内存 | 用 GPU：显存 | 适合 |
|---|---|---|---|---|
| Qwen3-4B | 2.5 GB | 8 GB | 6 GB | 轻薄本试用、简单的周报和会议纪要 |
| Qwen3-8B | 5 GB | 16 GB | 8 GB | 个人电脑日常使用的起点 |
| DeepSeek-R1-0528-Qwen3-8B | 5 GB | 16 GB | 8 GB | 需要推理过程的分析类任务（会先输出思考过程） |
| Qwen3-14B | 9 GB | 32 GB | 12 至 16 GB | 结构复杂的文档：PRD、合规清单 |
| Qwen3-32B | 20 GB | 64 GB | 24 GB 以上 | 部门共享服务器，质量明显更好 |
| DeepSeek-V3 / R1 满血版（671B） | 数百 GB | 不现实 | 多卡服务器（例如 8 张 80 GB） | 单位级私有化部署，需要专门的运维 |

经验：

- 苹果芯片的 Mac 统一内存可以当显存用，16 GB 的 Mac 跑 8B 模型比较流畅。
- 只用 CPU 能跑，但速度慢，长文档要等几分钟，适合不着急的任务。
- 小模型更容易忽略技能里的细节规则。重要的输出（金额计算、合规判断）用 14B 以上，并且人工复核。
- 国产 GPU 和 NPU（昇腾等）通常需要厂商适配过的推理框架，⚠ 以厂商文档为准，本指南不覆盖。

## 三、Ollama：个人电脑上最省事的方案

[Ollama](https://ollama.com) 支持 Windows、macOS 和 Linux，提供 OpenAI 兼容接口（`http://localhost:11434/v1`），默认只监听本机。

### 安装

| 系统 | 方法 |
|---|---|
| Windows、macOS | 从 <https://ollama.com/download> 下载安装包 |
| Linux（能上网） | `curl -fsSL https://ollama.com/install.sh \| sh` |
| Linux x86_64（国内网络或离线） | 用魔搭上的安装包，见下 |

魔搭提供了 Ollama 的 Linux 安装包和**无需联网**的安装脚本（⚠ 版本号以 [modelscope/ollama-linux](https://modelscope.cn/models/modelscope/ollama-linux) 页面为准，写作时为 v0.17.5，只提供 amd64）：

```bash
pip install modelscope
modelscope download --model=modelscope/ollama-linux --local_dir ./ollama-linux --revision v0.17.5

# 把 ollama-linux 文件夹拷到目标机器后：
sudo apt install zstd          # 安装包是 tar.zst 格式，需要 zstd
cd ollama-linux
chmod +x ./ollama-modelscope-install.sh
./ollama-modelscope-install.sh
```

ARM64 服务器（鲲鹏、飞腾）：从 Ollama 的 GitHub 发布页下载 `ollama-linux-arm64` 压缩包，解压到 `/usr`（⚠ 文件名和格式以发布页为准）。

### 下载模型（在能上网的机器上）

从魔搭直接拉取 GGUF 模型，国内速度快：

```bash
ollama pull modelscope.cn/Qwen/Qwen3-8B-GGUF:Q4_K_M
ollama pull modelscope.cn/unsloth/DeepSeek-R1-0528-Qwen3-8B-GGUF:Q4_K_M
```

也可以用 Ollama 官方模型库：`ollama pull qwen3:8b`、`ollama pull deepseek-r1:8b`。

⚠ `modelscope.cn/<用户>/<模型>:<量化>` 这种写法依赖魔搭对 Ollama 的支持，量化标签要和模型库里的文件名一致（例如 `Qwen3-8B-Q4_K_M.gguf` 对应 `:Q4_K_M`）。

### 调大上下文

为技能单独建一个上下文更长的模型（以 Qwen3-8B 为例）。新建文件 `Modelfile`：

```text
FROM modelscope.cn/Qwen/Qwen3-8B-GGUF:Q4_K_M
PARAMETER num_ctx 16384
```

```bash
ollama create qwen3-8b-16k -f Modelfile
ollama run qwen3-8b-16k
```

之后都用 `qwen3-8b-16k` 这个名字调用。

### 完全断网：把模型拷进内网

**方法 A：拷贝 Ollama 的模型目录。** 在能上网的机器上 `ollama pull` 好模型，然后把整个模型目录拷到内网机器的同一位置：

| 系统 | 默认模型目录 |
|---|---|
| macOS | `~/.ollama/models` |
| Windows | `C:\Users\<用户名>\.ollama\models` |
| Linux（用安装脚本装成系统服务） | `/usr/share/ollama/.ollama/models` |

也可以用环境变量 `OLLAMA_MODELS` 指定别的目录。拷好后运行 `ollama list` 确认。

**方法 B：只拷 GGUF 文件。** 在能上网的机器上下载单个文件：

```bash
modelscope download --model Qwen/Qwen3-8B-GGUF Qwen3-8B-Q4_K_M.gguf --local_dir ./models
```

拷进内网后，在同一目录下新建 `Modelfile`：

```text
FROM ./Qwen3-8B-Q4_K_M.gguf
PARAMETER num_ctx 16384
```

```bash
ollama create qwen3-8b-16k -f Modelfile
```

⚠ 从 GGUF 导入时，Ollama 会尽量从文件元数据识别对话模板；如果回答格式异常（例如不停输出或夹带特殊标记），在 Modelfile 里补上 `TEMPLATE`，参考 Ollama 官方模型库里同系列模型的模板（`ollama show qwen3:8b --modelfile` 可以查看）。

## 四、把技能接到本地模型

### 方式 1：网页 Playground（数据仍只在本机）

[Playground](https://mohitagw15856.github.io/pm-claude-skills/) 是纯静态网页，选择 Ollama 后，请求从你的浏览器直接发到 `http://localhost:11434`，不经过任何服务器。前提是这台电脑能打开网页，并且允许网页访问本机 Ollama：

```bash
# macOS（Ollama 桌面版）
launchctl setenv OLLAMA_ORIGINS "https://mohitagw15856.github.io"
# 然后退出并重新打开 Ollama

# Linux（系统服务）
sudo systemctl edit ollama.service
# 在打开的文件里加入：
# [Service]
# Environment="OLLAMA_ORIGINS=https://mohitagw15856.github.io"
sudo systemctl daemon-reload && sudo systemctl restart ollama
```

Windows：在“编辑系统环境变量”里新建用户变量 `OLLAMA_ORIGINS`，值为 `https://mohitagw15856.github.io`，然后从任务栏退出并重新打开 Ollama。

在 Playground 里选择提供方 Ollama，地址填 `http://localhost:11434`。Playground 的模型列表是固定的几个名字（如 `qwen2.5`），所以要先拉取同名模型：`ollama pull qwen2.5`。

只填需要的那个网址，不要用 `OLLAMA_ORIGINS=*`：那样任何网页都能调用你的本地模型。部分浏览器会拦截 https 网页访问 http 本机地址，遇到时改用 Chrome 或 Edge，或者用下面的 Cherry Studio。

### 方式 2：Cherry Studio（桌面客户端，完全离线可用）

[Cherry Studio](https://cherry-ai.com) 是国内常用的开源桌面客户端，支持 Windows、macOS 和 Linux。⚠ 菜单名称可能随版本变化。

1. 设置 → 模型服务 → Ollama：打开开关，API 地址填 `http://localhost:11434`，点“管理”添加 `qwen3-8b-16k`（或你建的模型名）。
2. 新建一个助手（或智能体），把技能 `SKILL.md` 的全文粘贴到提示词里，例如中文周报用 `skills-i18n/zh/cn-weekly-report/SKILL.md`。
3. 选择这个助手和本地模型，直接提问。

每个常用技能建一个助手，就相当于一套离线的“技能库”。如果想让模型自己挑技能，可以接入离线包里的本地 MCP 服务器（设置 → MCP 服务器 → 添加，类型 stdio，命令 `node`，参数为 `mcp/server.mjs` 的完整路径），并选择支持工具调用的模型，例如 Qwen3。

### 方式 3：Python

[pm-skills](https://pypi.org/project/pm-skills/) 包自带一份技能数据，安装后**读取技能不需要联网**（目前只包含英文原版）。在能上网的机器上下载安装文件，再拷进内网离线安装：

```bash
# 能上网的机器
pip download pm-skills -d wheels -i https://pypi.tuna.tsinghua.edu.cn/simple

# 内网机器
pip install --no-index --find-links wheels pm-skills
```

下面的例子只用 Python 标准库调用 Ollama 的 OpenAI 兼容接口，不需要安装其他包：

```python
import json
import urllib.request

import pm_skills

skill = pm_skills.get_skill("meeting-notes")      # 也可以先 pm_skills.search_skills("meeting")
body = {
    "model": "qwen3-8b-16k",
    "messages": [
        {"role": "system", "content": skill["instructions"]},
        {"role": "user", "content": "把下面的会议记录整理成纪要，用中文输出：\n……"},
    ],
    "stream": False,
}
req = urllib.request.Request(
    "http://localhost:11434/v1/chat/completions",
    data=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"},
)
with urllib.request.urlopen(req, timeout=600) as resp:
    print(json.load(resp)["choices"][0]["message"]["content"])
```

想用中文版技能，直接读取离线包里的文件作为 system 内容即可：

```python
from pathlib import Path
system = Path("pm-skills-offline/skills-i18n/zh/cn-weekly-report/SKILL.md").read_text(encoding="utf-8")
```

换成 vLLM 或 LM Studio 时，只需要改地址和模型名，接口格式相同。

## 五、服务器方案：vLLM 和 LM Studio

### vLLM（多人共用的 GPU 服务器）

[vLLM](https://docs.vllm.ai) 适合给一个部门提供服务，吞吐量高，接口同样兼容 OpenAI。需要 Linux 和 NVIDIA GPU（⚠ 其他硬件的支持情况以 vLLM 文档为准）。

```bash
pip install vllm                 # ⚠ 对 CUDA 和 Python 版本有要求，以官方安装文档为准
pip install modelscope

# 能上网时：从魔搭下载完整权重（不是 GGUF）
modelscope download --model Qwen/Qwen3-8B --local_dir /data/models/Qwen3-8B

# 内网服务器：从本地目录启动，不访问网络
HF_HUB_OFFLINE=1 vllm serve /data/models/Qwen3-8B \
  --served-model-name qwen3-8b \
  --max-model-len 16384 \
  --host 0.0.0.0 --port 8000 \
  --api-key "换成你自己的长随机字符串"
```

客户端地址填 `http://服务器地址:8000/v1`，模型名 `qwen3-8b`，密钥填上面设置的值。设置环境变量 `VLLM_USE_MODELSCOPE=True` 后，vLLM 也可以直接按魔搭的模型名下载。

### LM Studio（图形界面）

[LM Studio](https://lmstudio.ai) 适合不想用命令行的个人用户。它内置的模型搜索默认连接 Hugging Face，在国内可能打不开，可以用魔搭下载 GGUF 文件后导入（⚠ 命令以官方文档为准）：

```bash
lms import ./models/Qwen3-8B-Q4_K_M.gguf
lms server start                 # 默认 http://localhost:1234/v1
```

在 LM Studio 里加载模型时，把上下文长度设为 16384 或更大。

## 六、安全注意事项

- **默认只监听本机。** Ollama 默认绑定 `127.0.0.1:11434`。改成 `OLLAMA_HOST=0.0.0.0` 对局域网开放前要想清楚：Ollama 的接口**没有身份验证**，同一网络里任何人都能调用。需要共享时，放在带登录认证的反向代理（例如 Nginx 加认证）后面，并用防火墙限制来源地址。
- **vLLM 一定要设 `--api-key`**，并只在内网开放端口。
- **模型来源要可信。** 只从魔搭官方组织（如 `Qwen`）或可信的发布者下载；拷进内网前后都记录并比对 SHA256（魔搭模型页的文件列表里有校验值）。
- **技能文件同样校验。** 用离线包附带的 `.sha256` 文件校验，见[离线包说明](offline.md)。
- **真正断网再处理敏感数据。** 确认模型已经下载完毕后，再断开网络或在防火墙上禁止推理机出网；Ollama、vLLM 运行时不需要联网。
- **注意日志。** 客户端和推理服务可能把对话写进本地日志或历史记录（Cherry Studio 会保存对话）。处理敏感材料时按单位规定清理，或使用加密磁盘。
- **本地模型也会出错。** 技能里涉及金额、法律、医疗的内容都写明了“不构成专业意见”，小模型更容易算错数、记错条文，结果要由专业人士确认。

---

相关文档：[在中国使用 PM Skills](../CHINA.md) · [内网离线包](offline.md) · [本地模型评测（英文）](../LOCAL-MODELS.md)
