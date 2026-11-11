---
applyTo: "**"
description: "Write a script for a Bilibili (B站) video: a title and cover line that earn the click, an opening that holds the first ten seconds, a chaptered body with points where viewers will post 弹幕, a closing that asks for 一键三连 without begging, and the description, tags and pinned comment. Use when asked 写 B 站视频脚本, B 站标题怎么起, 视频开头怎么写, 知识区视频文案, up 主脚本, or write a Bilibili video script. Produces three title and cover options, a timed script with narration and visuals, 弹幕 interaction points, chapters, a description, tags, a pinned comment and a disclosure check for sponsored content. Distinct from douyin-script (short vertical video) and youtube-script."
---

# B 站视频脚本

Bilibili viewers stay for longer videos than on short-video apps, talk back through 弹幕, and punish content that feels like an advertisement or talks down to them. A script that works there has a real point of view, enough substance to justify its length, and moments built for the audience to react. This skill writes for that audience.

Write in Simplified Chinese.

## What This Skill Produces

- Three title options with matching cover text
- A timed script: narration (口播), visuals and on-screen text
- Marked 弹幕 moments and chapter points
- A closing with a natural call to action
- The description (简介), tags, and a pinned comment
- A check on sponsorship disclosure and platform rules

## Required Inputs

Ask for these if not provided:

- Topic and the one thing the viewer should take away
- Category (分区): 知识, 科技, 生活, 游戏, 影视, 美食, 其他
- Target length and format: talking head, screen recording, vlog, animation, commentary over footage
- The creator's persona and usual tone
- Material: facts, data, sources, footage, personal experience
- Whether the video is sponsored (恰饭) and by whom
- Earlier videos that did well or badly

## Framework

1. **Title and cover.** State the payoff or the question in plain words; a number or a contrast helps. Cover text is a few large characters that add to the title, not repeat it. No bait that the video does not deliver.
2. **First ten seconds.** Give the conclusion, the question or the most striking moment first. Introductions and greetings come after the hook, if at all.
3. **Structure.** Three to five chapters. Each opens with what it will answer and closes with a line that leads on. Chapter markers go in the progress bar.
4. **Substance.** Bilibili rewards information density. Each minute should carry a fact, an example, a demonstration or a joke. Cut filler.
5. **弹幕 moments.** Plan a few points for the audience to react: a question to answer, a prediction to make, a line to complete, a deliberate pause. Do not script fake 弹幕.
6. **Tone.** Speak as an equal. Self-deprecation works; lecturing does not. Use community references only where they fit the creator.
7. **Sources.** Name sources for data and claims on screen or in the description. The audience checks.
8. **Closing.** Summarise in one or two sentences, say what the next video is, and ask for 点赞、投币、收藏 once, tied to something specific.
9. **Sponsored content.** Say so clearly, and keep the sponsor segment distinct. Check the platform's commercial content rules and advertising law for the product category.
10. **Description and pinned comment.** The description lists chapters, sources and credits. The pinned comment asks a question or adds a correction.

## Output Format

### B 站视频：[主题]，约 [时长]

**标题与封面**
| 标题 | 封面文字 | 思路 |
|---|---|---|

**脚本**
| 时间 | 章节 | 口播 | 画面与字幕 | 弹幕点 |
|---|---|---|---|---|
| 0:00 | 开头 | | | |

**结尾**：[总结、预告、三连引导]

**简介**
> [一句话介绍]
> [章节时间轴]
> [资料来源与素材说明]

**标签**：[列表]
**置顶评论**：[文字]

**商业内容检查**：[是否标注、是否符合品类规定]

**Assumptions and gaps**
- [假设的事实或素材]
- [需要核实来源的数据]

## Quality Checks

- [ ] The first ten seconds contain the hook, not a greeting
- [ ] The title and cover promise only what the video delivers
- [ ] Each chapter has a clear question and substance
- [ ] 弹幕 moments are invitations, not fabricated comments
- [ ] Sources are listed for factual claims
- [ ] Sponsorship is disclosed where it exists

## Anti-Patterns

- **Do not open with "大家好我是..." and thirty seconds of preamble.**
- **Do not pad to reach a length.**
- **Do not use a shock title the content cannot support.**
- **Do not hide an advertisement inside the content.**
- **Do not invent data or quotations.**

## Example Trigger Phrases

- "帮我写一个 8 分钟的 B 站知识区视频脚本，讲为什么年轻人不爱换手机了。"
- "这个视频的标题和封面怎么起？"
- "开头 10 秒怎么写才不被划走？"
- "这期是商单，怎么写才不招人烦又合规？"

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/bilibili-video-script.html

<!-- pm-claude-skills v84.0.0 | skill: bilibili-video-script | source: skills/bilibili-video-script/SKILL.md | sha256: 12ca8d8064287d859ac825f541740dfd485b45defcd5fc5d7ae3b7a56aeb0e33 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
