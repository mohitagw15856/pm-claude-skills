# 上架素材包：扣子、阿里云百炼、文心智能体、Kimi

> **In English, briefly.** Everything needed to publish one "PM Skills 职场助手" agent on the main Chinese agent platforms: name, descriptions, opening line, suggested questions, icon and a generated system prompt that routes to the right skill. Publishing needs the maintainer's own accounts on each platform (mainland phone numbers for most), so this is a kit, not a submission. For one agent per skill, see [integrations/coze-yuanqi](../../integrations/coze-yuanqi/README.md).

一个智能体，覆盖全部中文技能：用户说需求，它先选技能、再追问、最后交付成品。各平台都需要你自己的账号来创建和发布（大多要绑定中国大陆手机号），所以这里是素材包，不代你提交。

## 通用素材

| 项目 | 内容 |
|---|---|
| 名称 | PM Skills 职场助手 |
| 一句话简介（20 字内） | 周报、考公、劳动法、出海，一句话出成品 |
| 详细介绍 | 基于开源技能库 PM Skills（MIT 协议，1,250 多个专业技能）。说出你的需求，它会选用最合适的技能：写周报和述职、准备公务员和考研、估算经济补偿金、解读劳动合同、个税汇算、写小红书和公众号、规划出海。先问清关键信息，再交付能直接用的成品。涉及法律、税务、社保的内容只做参考，以官方最新规定为准。 |
| 开场白 | 你好，我是 PM Skills 职场助手。告诉我你要完成什么事，比如“帮我把这些笔记整理成周报”，我会选一个专业技能来帮你做完。 |
| 推荐问题 | 帮我把这些笔记整理成周报 · 公司要裁我，工作 6 年 7 个月，能拿多少补偿？ · 下个月公务员面试，帮我模拟一轮 · 帮我写一篇小红书种草笔记 · 个税汇算怎么弄？ |
| 图标 | 仓库根目录的 [`icon.svg`](../../icon.svg)（平台要求 PNG 时，导出 512×512） |
| 系统提示词 | [system-prompt-zh.md](system-prompt-zh.md)（由 `node scripts/build-listing-prompt.mjs` 生成，技能更新后重新运行） |
| 分类 | 效率工具 / 职场办公 |
| 开源地址 | https://gitee.com/mohitagw/pm-claude-skills |

## 扣子（Coze）

1. 在扣子（国内版 coze.cn）创建智能体，填入名称、简介和图标。
2. 把系统提示词粘贴到“人设与回复逻辑”。
3. 在“开场白”里填开场白和推荐问题。
4. 选择模型（如豆包或 DeepSeek），在预览窗口用推荐问题各试一次。
5. 发布时选择要上架的渠道（如扣子商店）。商店上架需要通过平台审核，审核要求以平台当时的说明为准。

## 阿里云百炼

1. 在百炼控制台的应用管理里新建一个智能体应用，选择通义千问或 DeepSeek 等模型。
2. 把系统提示词粘贴到提示词区域，填入开场白。
3. 用推荐问题测试后发布。百炼的应用主要以 API 或网页链接的方式对外提供，适合嵌入你自己的网站或企业内部系统；对外分发前请查看当前控制台的发布选项。

## 文心智能体平台

1. 在文心智能体平台创建智能体，名称、简介、图标同上。
2. 系统提示词粘贴到“人设与回复逻辑”，推荐问题填到开场白设置里。
3. 测试后提交发布。公开分发需要通过平台审核，请按平台提示补充资料。

## Kimi

如果你的账号能创建 Kimi 智能体（以 Kimi 当前开放的功能为准），名称、简介和系统提示词同上；不能创建时，可以先把系统提示词作为对话开头的第一条消息使用。

## 上架后

- 把各平台的公开链接加到 `README.zh-CN.md` 的“国内渠道”一段，方便用户找到。
- 技能库更新后重新运行 `node scripts/build-listing-prompt.mjs`，把新的系统提示词同步到各平台。
- 平台审核常见的退回原因是简介夸大或缺少免责说明，上面的文案已经避开，修改时请保留“以官方最新规定为准”。
