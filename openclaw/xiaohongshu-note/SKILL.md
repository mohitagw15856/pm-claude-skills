---
name: xiaohongshu-note
description: "Write a 小红书 (Xiaohongshu, RED) note that reads like a real person's experience: a scroll-stopping title, cover text, a body built on specific personal detail, tags, and a compliance check against restricted advertising words. Use when asked 帮我写小红书笔记, 小红书标题, 种草文案, 小红书怎么写才有流量, or write a Xiaohongshu post. Produces three title options, cover image text, the note body in the platform's style, tags, an engagement question, a check of restricted words and undisclosed advertising, and notes for the images."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/xiaohongshu-note.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# 小红书 Note

小红书 rewards notes that feel like a trusted friend's honest experience: specific, visual, useful. It punishes, through low reach or removal, notes that read as ads, use restricted absolute claims, or hide a commercial relationship. This skill writes in the platform's style and checks the compliance points.

Write in Simplified Chinese.

## What This Skill Produces

- **Three title options**, within about 20 characters, each a different angle
- **Cover text**: the few words on the cover image
- **The note body**: short paragraphs, specific detail, useful takeaway
- **Tags** (话题标签): broad, mid and niche
- **An engagement question** to end on
- **A compliance check**: restricted words, health claims, undisclosed advertising
- **Image notes**: what the images should show, in order

## Required Inputs

Ask for these if not provided:
- **The topic**: product, place, experience, tutorial, or opinion
- **The person's real experience**: what they did, what surprised them, the honest downside
- **The audience**: who should save this note
- **Whether it is sponsored** or involves any commercial relationship
- **Images available**

## Framework

1. **Title**: one of these shapes: a specific result ("通勤一个月，我终于找到不磨脚的鞋"), a number ("3 个让租房变大的小技巧"), a contrast, or a question. About 20 characters. No clickbait the body does not deliver.
2. **Cover text**: five to ten characters, the note's promise.
3. **Body**:
   - First two lines: the hook, written as a real moment
   - Middle: specific detail (price, size, place, time, how it felt), in short paragraphs with a few emoji as section markers
   - One honest downside; it builds trust
   - End: the takeaway and an engagement question
   - Typical length: 300 to 800 characters
4. **Tags**: five to ten, from broad to niche, relevant to the content only.
5. **Compliance**:
   - Avoid absolute claims restricted under China's Advertising Law in commercial content: 最, 第一, 顶级, 国家级, 100%, and similar
   - No medical or efficacy claims for cosmetics, food or supplements
   - If sponsored or gifted, it must be disclosed using the platform's own commercial cooperation tools; do not disguise an ad as a personal note

## Output Format

### 小红书笔记：[主题]

**标题备选**
1. ...
2. ...
3. ...

**封面文字**：...

**正文**
[...]

**话题标签**：#... #... #...

**互动提问**：...

**合规检查**
| 内容 | 问题 | 修改建议 |

**配图建议**：第 1 张 ...，第 2 张 ...

## Quality Checks
- [ ] Every title is about 20 characters or fewer and matches the body
- [ ] The body contains specific details from the person's real experience
- [ ] At least one honest downside is included
- [ ] No restricted absolute words or efficacy claims remain
- [ ] Sponsored content is marked for disclosure

## Anti-Patterns
- **Writing like an advertisement.** Readers and the algorithm both detect it.
- **Inventing experiences** the person did not have.
- **Hiding a sponsorship.** It breaks platform rules and advertising law.
- **Tag stuffing** with unrelated trending tags.

## Example Trigger Phrases
- "帮我写一篇小红书笔记，分享我在大理住的民宿。"
- "给这个护肤品写个种草文案，品牌送的。"
- "小红书标题怎么起才有流量？"
- "Write a Xiaohongshu note about my new standing desk."
