# 群聊机器人：飞书 · 钉钉 · 企业微信

在工作群里 @ 机器人说一句"帮我写周报"，它会从 [PM Skills](https://github.com/mohitagw15856/pm-claude-skills) 的 1,255 个技能里挑出最合适的一个，把技能内容作为系统提示词，调用你自己的大模型（DeepSeek、通义千问、智谱 GLM、魔搭 ModelScope 免费推理，或本地 Ollama），再把结果回复到群里。

- 一个文件：`pm_chat_bot.py`，Python 3.9 及以上，只用标准库
- 三个平台的签名校验和消息解密都按官方文档实现，`--selftest` 用 openssl 生成的已知向量逐项验证
- 选技能复用仓库里现成的路由：[`integrations/china-agent-tools/pm_skills_tool.py`](../china-agent-tools/pm_skills_tool.py)（默认），或 [`integrations/router-model/pm_router.py`](../router-model/pm_router.py) 训练出的模型
- 有中文翻译的技能优先用中文版（`skills-i18n/zh/`）

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git   # 或 GitHub
cd pm-claude-skills/integrations/chat-bots
python3 pm_chat_bot.py --selftest          # 离线自检，不联网
python3 pm_chat_bot.py route "帮我写周报"    # 看看会用哪个技能 → cn-weekly-report
PM_LLM_PROVIDER=modelscope PM_LLM_API_KEY=ms-xxxx DINGTALK_APP_SECRET=xxxx \
  python3 pm_chat_bot.py serve --port 8080
```

在群里也可以直接指定技能：`/prd-template 我们要做一个签到功能`，或者发"帮助"查看用法。

> 机器人需要在完整的仓库目录里运行（它从本地读取 `web/skills-index.json` 和 `skills/` 下的技能）。如果本地没有某个技能文件，会回退到从 Gitee 镜像（再到 GitHub）下载。

## 路由

| 路径 | 平台 | 说明 |
|---|---|---|
| `POST /feishu` | 飞书自建应用 | 事件订阅的请求地址 |
| `POST /dingtalk` | 钉钉企业内部机器人 | 消息接收地址（HTTP 模式） |
| `GET` / `POST /wecom` | 企业微信自建应用 | 接收消息的 URL |
| `GET /healthz` | 所有 | 存活检查，返回 `ok` |

三个平台都要求公网 HTTPS 地址，请放在 Nginx / Caddy 等反向代理之后（见"部署"）。

## 环境变量

| 变量 | 说明 |
|---|---|
| `PM_LLM_PROVIDER` | `deepseek`（默认）、`qwen`、`glm`、`modelscope`、`ollama`，决定默认的接口地址和模型 |
| `PM_LLM_BASE_URL` | 自定义 OpenAI 兼容接口地址，覆盖上面的默认值，不含 `/chat/completions` |
| `PM_LLM_API_KEY` | 模型的 API Key（Ollama 不需要） |
| `PM_LLM_MODEL` | 模型名。默认值见下表，各家模型名经常更新，请以控制台里的列表为准 |
| `PM_LLM_MAX_TOKENS` / `PM_LLM_TIMEOUT` | 默认 1500 / 120 秒 |
| `PM_RATE_PER_MIN` | 每个用户每分钟最多几次，默认 5；设为 0 关闭 |
| `PM_MAX_CONCURRENCY` | 同时进行的模型调用数，默认 4 |
| `PM_ROUTER_MODEL` | 可选：`pm_router.py train` 训练出的 `router.json` 路径 |
| `PM_SKILLS_REPO` | 可选：仓库根目录，默认是本文件夹往上两级 |
| `HOST` / `PORT` | 监听地址，默认 `0.0.0.0:8080` |
| `FEISHU_APP_ID` / `FEISHU_APP_SECRET` | 飞书应用凭证，用于获取 `tenant_access_token` 回复消息 |
| `FEISHU_VERIFICATION_TOKEN` | 飞书"事件与回调 → 加密策略"里的 Verification Token，设置后会校验 |
| `FEISHU_ENCRYPT_KEY` | 可选：同一页面的 Encrypt Key。设置后要求请求加密并校验签名 |
| `FEISHU_API_BASE` | 默认 `https://open.feishu.cn`；Lark 国际版填 `https://open.larksuite.com` |
| `DINGTALK_APP_SECRET` | 钉钉应用的 AppSecret（用于签名校验） |
| `WECOM_CORP_ID` / `WECOM_SECRET` / `WECOM_AGENT_ID` | 企业 ID、应用 Secret、应用 AgentId |
| `WECOM_TOKEN` / `WECOM_ENCODING_AES_KEY` | "接收消息 → API 接收"里设置的 Token 和 EncodingAESKey |

默认模型：

| `PM_LLM_PROVIDER` | 接口地址 | 默认模型 |
|---|---|---|
| `deepseek` | `https://api.deepseek.com/v1` | `deepseek-chat` |
| `qwen` | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| `glm` | `https://open.bigmodel.cn/api/paas/v4` | `glm-4.7-flash` |
| `modelscope` | `https://api-inference.modelscope.cn/v1`（魔搭免费额度，Key 在 modelscope.cn 的访问令牌页面） | `deepseek-ai/DeepSeek-V4.1-Flash` |
| `ollama` | `http://localhost:11434/v1` | `qwen2.5` |

## 飞书

1. 在[飞书开放平台](https://open.feishu.cn/app)创建**企业自建应用**，添加"机器人"能力。
2. 权限管理里开通：接收群聊中 @ 机器人消息（`im:message.group_at_msg`）、读取用户发给机器人的单聊消息（`im:message.p2p_msg`）、以单聊或群聊身份回复消息（`im:message:send_as_bot`）。权限名称以控制台为准。
3. "事件与回调 → 事件配置"：订阅方式选"将事件发送至开发者服务器"，请求地址填 `https://你的域名/feishu`，添加事件 `im.message.receive_v1`（接收消息 v2.0）。
4. 保存请求地址时飞书会发送 `url_verification`，机器人原样返回 `challenge`。
5. 发布版本，把机器人拉进群。默认只有 @ 机器人的群消息会推送过来。

**加密**：如果在"加密策略"里设置了 Encrypt Key，就把同样的值填进 `FEISHU_ENCRYPT_KEY`。机器人会用 `SHA256(Encrypt Key)` 作为 AES-256-CBC 密钥解密，并按 `sha256(timestamp + nonce + encrypt_key + body)` 校验 `X-Lark-Signature`。如果你不想用加密，在控制台清空 Encrypt Key，同时不设置 `FEISHU_ENCRYPT_KEY`；此时只校验 Verification Token。两边必须一致，否则请求会被拒绝。

说明：飞书文档没有明确保证 `url_verification` 请求也带签名头，所以这一种请求在没有签名头时只校验 Token；其他事件在启用加密后没有签名一律拒绝。飞书要求 3 秒内返回 200，机器人先返回、再在后台调用模型，并按 `event_id` 去重，避免重试导致重复回复。

## 钉钉

1. 在[钉钉开放平台](https://open-dev.dingtalk.com/)创建应用，添加"机器人"能力。
2. 消息接收模式选择 **HTTP 模式**，消息接收地址填 `https://你的域名/dingtalk`。
3. 把应用的 AppSecret 填进 `DINGTALK_APP_SECRET`。发布后把机器人加进群，@ 它即可。

**签名**：每个请求头带 `timestamp`（毫秒）和 `sign`，机器人计算 `base64(HMAC-SHA256(AppSecret, timestamp + "\n" + AppSecret))` 比对，并拒绝与当前时间相差超过一小时的请求。

**回复**：模型较慢，所以先返回空的 200，再把答案 POST 到消息里带的 `sessionWebhook`。为防止被利用来请求任意地址，只接受 `https://oapi.dingtalk.com` 和 `https://api.dingtalk.com` 的 `sessionWebhook`，并检查过期时间。回复文本会截断到约 18,000 字节，钉钉单条消息的确切上限请以文档为准。

说明：钉钉现在推荐 Stream 模式（长连接，不需要公网地址）。Stream 模式需要钉钉的 SDK，本机器人只实现 HTTP 模式。

## 企业微信

1. 在[企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#apps)"应用管理 → 自建"创建应用，记下 AgentId 和 Secret；"我的企业"里记下企业 ID。
2. 应用详情"接收消息 → 设置 API 接收"：URL 填 `https://你的域名/wecom`，随机生成 Token 和 EncodingAESKey，填进对应的环境变量，然后保存。保存时企业微信会发一个 GET 请求校验，机器人校验 `msg_signature`、解密 `echostr` 并原样返回明文。
3. 新创建的应用可能要求配置"企业可信 IP"，把服务器出口 IP 填进去，否则发送消息的接口会报错。

**签名与解密**：`msg_signature = sha1(把 token、timestamp、nonce、密文按字典序排序后拼接)`。AES 密钥为 `base64(EncodingAESKey + "=")`，IV 为密钥前 16 字节，AES-256-CBC，PKCS#7 按 32 字节填充；明文为 16 字节随机串 + 4 字节网络序长度 + 消息 + 企业 ID。机器人会核对企业 ID。

**回复**：接收消息后立即返回空串（企业微信要求 5 秒内响应），答案通过 `message/send` 主动发送给提问的成员。文本消息上限 2048 字节，较长的答案会拆成最多 4 条。

**限制**：企业微信自建应用的回调接收的是成员与应用的单聊消息；普通群聊里的消息不会推送给自建应用。群聊场景请用飞书或钉钉，或者使用企业微信后台的群机器人功能（其接口与本机器人不同，未实现）。

## AES 解密不需要第三方库

飞书加密和企业微信都用 AES-256-CBC。如果安装了 `cryptography`（`pip install cryptography`），机器人会自动用它；没有安装时，使用文件里自带的纯 Python AES 解密实现（只解密，速度较慢，但对聊天消息足够）。两种实现都用同一组 openssl 生成的向量自检，`--selftest` 最后一行会显示当前用的是哪一种。

## 部署

**VPS（systemd）**

```bash
sudo useradd -r -m pmbot && sudo -u pmbot git clone https://gitee.com/mohitagw/pm-claude-skills.git /home/pmbot/pm-claude-skills
sudo tee /etc/pm-chat-bot.env >/dev/null <<'EOF'
PM_LLM_PROVIDER=deepseek
PM_LLM_API_KEY=sk-xxxx
DINGTALK_APP_SECRET=xxxx
EOF
sudo chmod 600 /etc/pm-chat-bot.env
sudo tee /etc/systemd/system/pm-chat-bot.service >/dev/null <<'EOF'
[Unit]
Description=PM Skills chat bot
After=network-online.target
[Service]
User=pmbot
EnvironmentFile=/etc/pm-chat-bot.env
ExecStart=/usr/bin/python3 /home/pmbot/pm-claude-skills/integrations/chat-bots/pm_chat_bot.py serve --host 127.0.0.1 --port 8080
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF
sudo systemctl enable --now pm-chat-bot
```

然后用 Caddy 一行配置 HTTPS 反向代理（`/etc/caddy/Caddyfile`）：`bot.example.com { reverse_proxy 127.0.0.1:8080 }`。国内服务器使用域名需要 ICP 备案。

**Docker 一行命令**（在仓库根目录运行，环境变量写在 `.env` 文件里）：

```bash
docker run -d --name pm-chat-bot --restart unless-stopped --env-file .env -p 127.0.0.1:8080:8080 \
  -v "$PWD":/app:ro -w /app python:3.12-slim python integrations/chat-bots/pm_chat_bot.py serve
```

用本地 Ollama 时，容器里要把 `PM_LLM_BASE_URL` 设为 `http://host.docker.internal:11434/v1`（Linux 需要加 `--add-host=host.docker.internal:host-gateway`）。

## 安全说明

- **不要把密钥写进代码或提交到仓库**。只用环境变量，`.env` 文件权限设为 600。
- 机器人**从不记录密钥、签名或消息内容**：访问日志只记录方法、路径和状态码（查询参数里带签名，所以不记录），回复日志只记录耗时和字数。模型调用出错时，群里只会看到"出错了"，不会暴露异常详情。
- 所有平台都**先校验签名再处理**；钉钉校验时间戳，企业微信校验企业 ID，飞书按 `event_id`、钉钉按 `msgId`、企业微信按 `MsgId` 去重。
- **限流**：每个用户每分钟默认 5 次（`PM_RATE_PER_MIN`），同时最多 4 个模型调用（`PM_MAX_CONCURRENCY`），请求体上限 1 MB。各平台自己也有发送频率限制（例如群内消息频率），超出时平台接口会返回错误码，机器人只记录错误码。
- 群聊内容会发送给你配置的模型服务商。涉及公司机密或个人信息时，请先确认符合公司规定和《个人信息保护法》，或使用本地 Ollama。
- 技能输出是草稿，涉及法律、财务、医疗的内容请由专业人士复核。

## 自检

```bash
python3 pm_chat_bot.py --selftest
```

覆盖：钉钉 HMAC 签名（openssl 生成的向量、过期时间戳、错误密钥）、`sessionWebhook` 域名白名单、飞书签名与 AES 解密、企业微信签名与 AES 解密、三个平台从收到请求到回复的完整流程（模型和网络用桩替代）、去重、限流。`tests/scripts-smoke.mjs` 在每次 CI 中运行它。

---

## English summary

A dependency-free (Python 3.9+, standard library) HTTP server that lets a Feishu, DingTalk or WeCom group (WeCom: one-to-one chats with a self-built app) ask PM Skills for help. It picks a skill with the library's own routers (`pm_skills_tool.py`, or a trained `pm_router.py` model), sends the skill as the system prompt to any OpenAI-compatible endpoint (DeepSeek, Qwen, GLM, ModelScope API-Inference, local Ollama), and replies in the chat.

- **Feishu**: `url_verification` challenge, Verification Token check, optional Encrypt Key (AES-256-CBC with SHA-256 of the key, plus `X-Lark-Signature`). To run without encryption, clear the Encrypt Key in the console and leave `FEISHU_ENCRYPT_KEY` unset. Replies via the message reply API.
- **DingTalk**: enterprise robot in HTTP mode; `timestamp` + `sign` HMAC-SHA256 check with the AppSecret and a one-hour window; replies via `sessionWebhook`, restricted to DingTalk hosts. Stream mode is not implemented.
- **WeCom**: callback `msg_signature` (SHA-1), AES-256-CBC decryption and CorpID check; replies via `message/send`. Self-built app callbacks carry one-to-one messages, not ordinary group messages.
- **AES**: uses `cryptography` when installed, otherwise a bundled pure-Python AES decryptor. Both are checked against openssl-generated vectors by `--selftest`.
- **Security**: secrets only from the environment, never logged; message content is not logged; signatures verified before any processing; per-user rate limit and a concurrency cap.
- Deploy with systemd behind Caddy, or the Docker one-liner above.

Where the platform docs were not explicit (whether Feishu signs `url_verification`, DingTalk's exact text-length limit), the code takes the cautious option and says so in a comment.
