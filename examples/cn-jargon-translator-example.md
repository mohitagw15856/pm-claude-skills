# Example: cn-jargon-translator

## What this skill does

Translates Chinese internet-company jargon (互联网黑话) into plain words, shows what each sentence actually commits to, rewrites it at a chosen tone, and can turn plain words back into 黑话 for fun.

## How to trigger it

### Example 1: a weekly report full of jargon

**You say:**
> "帮我把这段周报去黑话：本周持续对齐各方，拉通产研运营，找到增长抓手，打通会员链路，下周继续沉淀方法论，形成闭环。"

**Claude produces (excerpt):**

| 原文 | 人话 | 实际承诺了什么 | 缺什么 |
|---|---|---|---|
| 本周持续对齐各方 | 本周和几个团队开了会 | 无 | 和谁对齐、对齐了什么结论 |
| 拉通产研运营 | 让产品、研发、运营一起讨论 | 无 | 讨论结果和决定 |
| 找到增长抓手 | 找到了一个能带来增长的具体做法 | 无 | 是哪个做法、预计带来多少增长 |
| 打通会员链路 | 让会员注册到付费的流程连起来 | 可能是一项开发工作 | 哪两个系统、上线时间 |
| 沉淀方法论，形成闭环 | 把经验写成文档，跟进到有结果 | 无 | 文档名称、完成时间 |

**判断：** 五句话里有四句是空话。请补充：会议的结论、选定的增长做法、会员流程的上线日期。

**得体职场版（补充事实后）：**
> 1. 与产品、研发、运营确定会员付费流程方案，选定"首月 1 元"作为增长切入点。
> 2. 注册到付费流程打通开发中，预计 10 月 20 日上线（负责人：王磊）。
> 3. 下周输出《会员增长复盘》文档，10 月 24 日前发出。

### Example 2: the other way, for fun

**You say:**
> "把'我们明天开个会'改写成满分大厂味。"

**Claude produces:**
> 【仅供娱乐】明日拟拉齐各方颗粒度，对焦底层逻辑，沉淀共识抓手，打好组合拳，确保链路闭环、心智对齐。

## Tips for best results

- Paste the whole message, not one phrase: intent depends on context.
- Say who will read the rewrite, so the tone fits.
- Expect to be asked for missing facts; the skill does not invent dates or owners.

## Related skills

- `cn-weekly-report` to write a weekly report from scratch
- `cn-fupan` for a structured project review
- `plain-language-rewrite` for plain English
