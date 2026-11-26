# 写回文档：飞书文档 · 语雀 · 钉钉文档

技能产出的 Markdown，一条命令写进你平时用的文档工具里。脚本在你自己的电脑上运行，凭证放在环境变量里，不经过任何中转服务。

```bash
# 飞书：新建一篇文档
export FEISHU_APP_ID=cli_xxx FEISHU_APP_SECRET=xxx
python3 pm_writeback_cn.py --dest feishu --title "周报 11.10" --file out.md --folder <文件夹 token>

# 语雀：在知识库里新建一篇
export YUQUE_TOKEN=xxx
python3 pm_writeback_cn.py --dest yuque --title "项目复盘" --repo team/handbook --file out.md

# 钉钉：覆盖一篇已有文档，或在知识库里新建
export DINGTALK_APP_KEY=xxx DINGTALK_APP_SECRET=xxx
python3 pm_writeback_cn.py --dest dingtalk --title "述职" --doc-key <docKey> --operator-id <unionId> --file out.md

# 先看会发出什么请求，不真正发送
python3 pm_writeback_cn.py --dest feishu --title x --file out.md --dry-run
```

只用 Python 标准库，Python 3.9 及以上。也可以从管道读：`cat out.md | python3 pm_writeback_cn.py --dest yuque ...`。

> **状态：** 请求的地址和参数按各平台公开的接口文档编写，`--selftest` 在本地用录制的请求形状逐项核对（Markdown 转块、分批写入、参数校验、凭证脱敏）。本仓库没有这些平台的账号，所以**没有对真实服务调用过**。第一次用请先 `--dry-run`，再在测试文档上试。接口有出入欢迎提 issue。

## 各平台要准备什么

| 平台 | 凭证 | 目标参数 | 说明 |
|---|---|---|---|
| 飞书 | 自建应用的 `FEISHU_APP_ID`、`FEISHU_APP_SECRET`，开通"创建及编辑新版文档"权限 | `--folder` 文件夹 token（或 `FEISHU_FOLDER_TOKEN`），`--share-email` | 应用创建的文档默认只有应用自己能看到。请把一个文件夹共享给应用并传 `--folder`，或者用 `--share-email` 把文档授权给你自己 |
| 语雀 | `YUQUE_TOKEN`（账户设置里的 Token，可能需要会员） | `--repo` 知识库路径，如 `team/handbook`，或数字 ID | 以 Markdown 格式创建，默认不公开 |
| 钉钉 | 企业内部应用的 `DINGTALK_APP_KEY`、`DINGTALK_APP_SECRET`，开通文档读写权限 | `--operator-id` 操作人的 unionId；`--doc-key` 覆盖已有文档，或 `--workspace-id` 在知识库新建 | 覆盖会**替换**文档全文。在知识库新建文档的接口路径把握较小，建议先用 `--doc-key` |

## 飞书的格式转换

Markdown 会转成飞书文档块：标题（1 到 9 级）、正文、无序列表、有序列表、引用、代码块，行内的 `**加粗**` 和 `` `代码` `` 保留样式。表格和多级嵌套列表按普通文本行写入，到文档里再调整。每次写入最多 50 个块，长文会自动分批。

## 腾讯文档：这次没有做

腾讯文档的开放接口要先注册第三方应用并通过审核，用户再走 OAuth 授权；写入内容要经过"获取上传地址、上传到对象存储、发起异步导入、轮询进度"四步，而且能否导入 Markdown 在公开文档里没有写明。没有账号就无法验证这条链路，所以没有提供适配器。目前的办法：把产出存成 `.md` 或 `.docx`，在腾讯文档里用"导入"上传。

## 和 `integrations/writeback` 的关系

[`integrations/writeback`](../writeback/README.md) 是 Cloudflare Worker，支持 GitHub、Notion、Linear、Slack，部署在 `workers.dev`，大陆访问不了。这个脚本是它在国内的对应版本，本地运行，不需要服务器。

## For maintainers (English)

One file, `pm_writeback_cn.py`. Each destination is a function `(args, markdown, http)` that returns `{id, url, note}`; `http` is injected so `--dry-run` and `--selftest` can record requests instead of sending them. Identifiers that reach a URL path are validated first (`SAFE_ID`, `YUQUE_REPO`). Tencent Docs is left out on purpose: its import flow could not be verified without a registered app. The DingTalk create-in-workspace call is the least certain of the endpoints used.
