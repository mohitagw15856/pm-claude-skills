---
name: wecom-announcement
description: "Write an internal announcement for WeCom (企业微信) or a company group chat: policy changes, office notices, system outages, holiday arrangements and organisational updates, in the clear, polite register Chinese staff expect. Use when asked 写一则企业微信公告, 帮我写内部通知, 放假通知, 系统维护通知, 组织架构调整公告, or write a staff announcement in Chinese. Produces the announcement with a 标题, the one-line 要点, details by audience, actions and deadlines, a contact, plus a short version for group chats and a pinned-message version."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/wecom-announcement.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# WeCom Announcement (企业微信公告)

Internal notices in Chinese companies are read on a phone, in a crowded feed, by people deciding in two seconds whether this affects them. A good notice says who it is for and what they must do in the first line, gives the details below, and names a contact. This skill writes notices for WeCom's announcement feature (公告), group chats and pinned messages.

Write in Simplified Chinese unless asked otherwise. For notices to customers rather than staff, see `customer-outage-notice`.

## What This Skill Produces

- **The full announcement**: 标题, 要点, 详细说明, 需要你做的事, 时间节点, 联系人
- **A group-chat version** (群消息) of three to five lines
- **A pinned-message version** (置顶) of one line
- **A reminder message** to send before the deadline, when there is an action

## Required Inputs

Ask for these if not provided:
- **What is happening**, when, and why (the reason staff will be told, if any)
- **Who is affected**: everyone, certain departments, certain locations or roles
- **What staff must do**, and by when, if anything
- **The contact** for questions: person, team or helpdesk
- **Sender and tone**: HR, IT, administration or leadership; routine or sensitive

## Framework

1. **标题 says what and who.** "【系统维护】10月12日 22:00 至 24:00 OA 系统暂停使用" beats "关于系统维护的通知".
2. **要点 in one line**: the action and the deadline, or "无需操作" when nothing is needed.
3. **Details by audience.** If different groups must do different things, give each its own short section.
4. **Dates and times exact.** Weekday, date, time and time zone where offices span regions. For holidays, list 放假 dates and any 调休 working days explicitly.
5. **Polite, plain register.** Use 请 and 感谢理解与配合 where natural; avoid bureaucratic padding such as 为进一步加强……工作.
6. **Sensitive notices** (organisational change, policy tightening): state the change and its effective date first, the reason second, and where to raise questions. Do not speculate beyond what the sender has confirmed.

## Output Format

```
标题：【类别】[事项]（[时间]）

要点：[谁][需要做什么 / 无需操作]，[截止时间]

一、详细说明
[事项、原因、影响范围]

二、需要你做的事
1. [行动]，[截止时间]

三、时间安排
| 时间 | 事项 |

如有疑问，请联系：[联系人 / 部门 / 方式]

[发布部门]
[日期]
```

Then **群消息版本**, **置顶版本** and, where there is an action, **提醒消息** (to send a day before the deadline).

## Quality Checks

- [ ] The title states the category, the event and the time
- [ ] The first line says what staff must do, or that no action is needed
- [ ] Every date has a weekday and every time window has a start and an end
- [ ] Holiday notices list every 调休 working day explicitly
- [ ] A named contact is given
- [ ] Nothing is stated as fact that the sender has not confirmed

## Anti-Patterns

- **The important line in the fourth paragraph.** Most readers never get there.
- **"关于……的通知" titles.** They hide the content.
- **Missing 调休 days.** The most common cause of follow-up questions after a holiday notice.
- **Leaking unconfirmed details** in sensitive notices. Say what is decided and when more will be shared.

## Example Trigger Phrases

- "帮我写一则国庆放假通知，有两个调休日。"
- "写企业微信公告：周六晚上 OA 系统维护。"
- "Write a staff announcement in Chinese about the office move."
- "部门架构调整，帮我写一则内部公告，语气要稳。"
