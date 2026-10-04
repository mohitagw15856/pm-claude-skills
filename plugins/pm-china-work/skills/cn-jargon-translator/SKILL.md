---
name: cn-jargon-translator
description: "Use when asked 把这段黑话翻译成人话, 这句话到底什么意思, 帮我把周报去黑话, 用大厂黑话改写这段, 互联网黑话词典, 对齐抓手闭环是什么意思, or translate Chinese internet-company jargon (互联网黑话) into plain words and back. Produces a line-by-line translation of 黑话 into plain Chinese with what each sentence actually commits to (who, what, by when), a rewrite at the chosen tone (白话, 得体职场, or 满分大厂味 parody), a 40-plus term glossary with plain meanings, and a 周报去黑话 mode that turns a jargon-heavy weekly report into one a reader can act on."
version: 1.0.0
---

# Chinese Internet Jargon Translator (互联网黑话翻译器)

Chinese internet companies have a dialect of their own: 对齐、抓手、闭环、赋能、颗粒度、打通、沉淀、链路、心智. Some of it is useful shorthand. Much of it hides the fact that a sentence has no owner, no date and no number. This skill translates 黑话 into plain words, says what each sentence really commits to, and rewrites it at the tone the person wants. It also runs the other way, plain words into 黑话, for fun, for parody, or to understand what a new colleague will sound like.

Write in Simplified Chinese unless the person asks for Traditional Chinese or English. Jargon varies by company (阿里土话, 字节 and 腾讯 usage differ); where a term has a company-specific meaning, say so.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The text**: a sentence, a message, a weekly report, a slide or a meeting note
- **Direction**: 黑话 to plain (the default), or plain to 黑话
- **Tone dial**: 白话 (plain, the default), 得体职场 (polite workplace, keeps the few terms that are genuinely precise), or 满分大厂味 (full parody, for fun only)
- **The reader**, if the output will be sent: manager, cross-team colleague, client, or friends in a group chat
- **Mode**: translate, rewrite a 周报 without jargon, or look up terms in the glossary

## Output Structure

### 1. 逐句翻译 (line-by-line translation)
| 原文 | 人话 | 实际承诺了什么 | 缺什么 |
The third column states who does what by when; the fourth names what the sentence is missing (负责人, 时间, 数字, 具体动作). A sentence that commits to nothing is marked 空话.

### 2. 改写版本 (rewrite at the chosen tone)
- **白话**: short sentences, verbs and numbers, no jargon.
- **得体职场**: plain, but keeps terms that are clearer than the alternative (复盘, 迭代, 漏斗, 转化率) and stays polite to a manager.
- **满分大厂味**: maximum 黑话 density, labelled 仅供娱乐 so nobody pastes it into a real report by mistake.

### 3. 周报去黑话 mode
For a weekly report, keep the structure (本周完成, 问题与风险, 下周计划) and rewrite each item so it shows a result, a number where the person gave one, an owner and a date. List every line that had nothing behind the jargon and ask the person for the missing fact rather than inventing it. For building a weekly report from scratch, use `cn-weekly-report`.

### 4. 黑话词典 (glossary)
Show the terms used in the text, or the full list below when asked.

| 黑话 | 人话 | 常见用法 | 注意 |
|---|---|---|---|
| 对齐 | 确认大家理解一致、目标一致 | 我们对齐一下 | 常常意味着要开会；问清楚对齐什么、跟谁、何时 |
| 拉通 | 把相关团队拉到一起协调 | 拉通产研运营 | 写明拉通哪几方 |
| 对焦 | 确认双方说的是同一件事 | 先对焦一下需求 | 同对齐，范围更小 |
| 抓手 | 具体从哪里入手、用什么手段 | 找到增长的抓手 | 追问：具体是哪个动作 |
| 闭环 | 事情从头做到尾并确认结果 | 这个问题要闭环 | 说清楚什么算"闭环" |
| 赋能 | 帮助、支持、提供工具或培训 | 中台赋能业务 | 说清楚提供了什么 |
| 颗粒度 | 细致程度 | 颗粒度太粗 | 指出要细到哪一层 |
| 打通 | 连接、让数据或流程互通 | 打通会员体系 | 写明打通哪两个系统 |
| 沉淀 | 把经验整理成文档或可复用的东西 | 沉淀方法论 | 问：沉淀成了什么文件，在哪 |
| 链路 | 一连串步骤或流程 | 下单链路 | 可直接说"流程" |
| 心智 | 用户心里对产品的印象 | 占领用户心智 | 用调研或数据说明 |
| 底层逻辑 | 根本原因、基本道理 | 想清楚底层逻辑 | 直接把道理说出来 |
| 顶层设计 | 整体规划 | 缺少顶层设计 | 说清楚谁来定、定什么 |
| 组合拳 | 几项措施一起用 | 打一套组合拳 | 列出具体措施 |
| 打法 | 做法、策略 | 新的打法 | 写出步骤 |
| 落地 | 真正执行、上线 | 方案要落地 | 给出上线时间 |
| 跑通 | 第一次从头到尾走通 | 先把 MVP 跑通 | 说明跑通的标准 |
| 拆解 | 把大目标分成小任务 | 拆解 OKR | 有用，保留也可以 |
| 迭代 | 分轮改进 | 快速迭代 | 有用，保留也可以 |
| 复盘 | 事后回顾，总结经验 | 项目复盘 | 有用，保留；见 `cn-fupan` |
| 痛点 | 用户遇到的问题 | 解决用户痛点 | 写出具体问题 |
| 爆点 | 能吸引注意的亮点 | 找内容爆点 | 说明是什么亮点 |
| 引爆 | 让内容快速传播 | 引爆话题 | 用数据说明传播目标 |
| 势能 | 势头、影响力 | 借助品牌势能 | 多半可以删 |
| 赛道 | 细分市场 | 切入新赛道 | 说出是哪个市场 |
| 生态 | 围绕产品的合作方和产品群 | 构建生态 | 列出合作方 |
| 矩阵 | 一组相关的账号或产品 | 账号矩阵 | 列出包括哪些 |
| 漏斗 | 用户一步步流失的转化过程 | 优化漏斗 | 有用，保留 |
| 触达 | 联系到、覆盖到用户 | 触达用户 | 写明渠道和人数 |
| 私域 | 可以直接联系的用户群（群、公众号等） | 私域运营 | 写明是哪个渠道 |
| 卡点 | 卡住的地方、阻碍 | 卡点在法务 | 写明卡在谁、需要什么 |
| 对标 | 跟某个对象比较 | 对标竞品 | 写明对标对象和指标 |
| 背书 | 有分量的人或机构的认可 | 拿到大客户背书 | 写明是谁 |
| 维度 | 角度、方面 | 多维度分析 | 列出是哪几个方面 |
| 感知 | 注意到、感受到 | 用户感知不强 | 用数据说明 |
| 聚焦 | 集中精力 | 聚焦核心业务 | 说明放弃了什么 |
| 协同 | 配合、合作 | 跨部门协同 | 写明谁配合谁 |
| 共建 | 一起做 | 与合作方共建 | 写明分工 |
| 透传 | 原样转达 | 把信息透传给团队 | 可直接说"转达" |
| 反哺 | 反过来带来好处 | 数据反哺业务 | 说明带来了什么 |
| 兜底 | 出问题时负责收尾、保底 | 我来兜底 | 说明兜底方案 |
| 倒逼 | 用压力迫使改变 | 用目标倒逼效率 | 说明具体压力 |
| 输出 | 产出、交付 | 输出一份方案 | 写明交付物和时间 |
| 节奏 | 安排、进度 | 把控节奏 | 给出时间表 |
| 水位 | 当前水平 | 库存水位 | 给出数字 |
| 降本增效 | 降低成本、提高效率（有时意味着裁员） | 全年降本增效 | 说明具体措施 |
| 画饼 | 承诺未来的好处但没有具体保证 | 老板又在画饼 | 口语，不要写进正式文件 |
| owner / 负责人 | 负责这件事的人 | 你来做 owner | 有用，写明名字 |
| sync 一下 | 同步信息、告诉一下 | 会后 sync 一下 | 说明同步给谁 |
| 揪头发 / 照镜子 / 闻味道 | 阿里土话：拔高视角看问题 / 自我反省 / 感受团队氛围 | 管理者要会揪头发 | 公司特有用法，外部读者可能看不懂 |

## Quality Checks

- [ ] Every translated sentence shows what it commits to, and sentences with nothing behind them are marked 空话
- [ ] No owner, date or number is invented; missing facts are asked for
- [ ] Useful precise terms (复盘, 迭代, 漏斗, 拆解) are kept in the 得体职场 tone rather than stripped mechanically
- [ ] The parody tone is labelled 仅供娱乐 and never offered as a real report
- [ ] Company-specific terms (阿里土话 and similar) are marked as such
- [ ] The rewrite is shorter than the original or the same length, never longer

## Anti-Patterns

- **Stripping every term.** 复盘 and 转化率 are clearer than their paraphrases; the target is empty jargon, not all vocabulary.
- **Filling gaps with guesses.** If "推进闭环" has no date, ask; do not make one up.
- **Mocking the reader.** The parody is for the person's own amusement; a rewrite sent to a manager stays respectful.
- **Translating word for word.** "对齐一下" often means "we need a 15-minute meeting with A and B this week"; translate the intent.
- **Sending parody to a real channel.** Label it, every time.

## Example Trigger Phrases

- "老板说'这个项目要找到抓手，形成闭环，沉淀方法论'，到底让我干什么？"
- "帮我把这份周报去黑话，改成老板一眼能看懂的版本。"
- "把'我们下周开会讨论一下'改写成满分大厂味，发群里玩。"
- "给我一份互联网黑话词典，附白话解释。"
- "Translate this Chinese corporate jargon into plain words."
