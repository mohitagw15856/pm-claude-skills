---
name: dingtalk-work-log
description: "Write a DingTalk work log (钉钉日志): the daily report (日报), weekly report (周报) or monthly report (月报) in the fields DingTalk's built-in log templates use, so it can be filled in directly. Use when asked 帮我写钉钉日报, 钉钉日志怎么写, 今日完成工作, 写日报, fill in my DingTalk daily report, or turn today's notes into a 日报. Produces the log field by field (今日完成工作, 未完成工作, 需协调工作, 备注 or the weekly and monthly equivalents), each short enough for the mobile form, plus a one-line version for the team group."
version: 1.0.0
---

# DingTalk Work Log (钉钉日志)

Many Chinese companies run on DingTalk, and its log feature (日志) asks staff to submit a daily, weekly or monthly report into fixed fields. The fields are small and usually filled in on a phone, so a good log is short, specific and honest about what slipped. This skill turns rough notes into entries for each field.

Write in Simplified Chinese unless asked otherwise. For a long-form weekly report outside DingTalk, see `cn-weekly-report`.

## What This Skill Produces

- **The log, field by field**, matching DingTalk's default templates:
  - 日报: 今日完成工作 / 未完成工作 / 需协调工作 / 备注
  - 周报: 本周完成工作 / 本周工作总结 / 下周工作计划 / 需协调与帮助
  - 月报: 本月工作内容 / 本月工作总结 / 下月工作计划 / 需帮助与支持
- **A one-line version** for the team group (群消息)
- **A carry-over note**: items moved from 未完成 yesterday that still are not done

## Required Inputs

Ask for these if not provided:
- **Log type**: 日报, 周报 or 月报
- **The notes**: what was done, in any form
- **Yesterday's or last period's log**, if available, so carry-overs are tracked
- **The company's own template fields**, if they differ from the defaults; follow them

## Framework

1. **One line per item.** Each entry starts with a verb and ends with a result or status: "完成订单导出接口联调，已提测", not "订单导出".
2. **Numbers where they exist.** Counts, percentages, ticket numbers. Do not invent any.
3. **未完成 is honest.** Each unfinished item gets a reason and a new date: "支付回调测试未完成：测试环境证书过期，已找运维，预计明天上午完成".
4. **需协调 names a person or team** and what is needed from them by when. An empty field is fine; a vague one is not.
5. **Weekly and monthly summaries add judgement.** 工作总结 says what went well, what did not and what will change, in two or three lines, not a repeat of the list.
6. **Fit the phone.** Keep each field to about five lines; put detail behind a doc link if needed.

## Output Format

```
【今日完成工作】
1. [动词 + 事项 + 结果 / 状态]
2. ...

【未完成工作】
1. [事项]：[原因]，[新的完成时间]

【需协调工作】
1. [需要谁] [做什么] [何时之前]

【备注】
[可选：链接、明日重点]
```

**群消息版本**：[一句话：今天最重要的结果 + 需要的协调]

For 周报 and 月报, use the matching field names listed above, with 工作总结 written as two or three lines of reflection.

## Quality Checks

- [ ] Every completed item starts with a verb and states a result or status
- [ ] Every unfinished item has a reason and a new date
- [ ] Every coordination request names who, what and by when
- [ ] Items carried over from the previous log are marked (顺延)
- [ ] No number, ticket or name appears that the person did not provide
- [ ] Each field is about five lines or fewer

## Anti-Patterns

- **"正常推进中".** It says nothing. State the status or the next step.
- **Copying yesterday's log.** Managers notice. Carry-overs are marked, not repeated silently.
- **Hiding blockers in 备注.** A blocker belongs in 未完成 or 需协调, where it is seen.
- **Padding.** A short honest log reads better than a long one stuffed with routine tasks.

## Example Trigger Phrases

- "帮我写今天的钉钉日报，笔记在这里。"
- "钉钉周报怎么写？帮我把这周的事整理一下。"
- "Fill in my DingTalk daily log from these notes."
- "写月报，下个月的计划要具体一点。"
