---
name: douyin-script
description: "Write a short-video script for 抖音 (Douyin) or similar vertical-video platforms: a hook in the first three seconds, a shot-by-shot plan with on-screen text, spoken lines timed to the length, and a cover and caption. Use when asked 帮我写抖音脚本, 短视频脚本, 分镜脚本, 视频开头怎么抓人, or write a Douyin video script. Produces the hook options, a timed shot list with visuals, voice-over and on-screen text, the caption and tags, the cover frame, and a compliance check of claims."
version: 1.0.0
---

# 抖音 Script

On 抖音 a video is decided in the first seconds: if the opening does not stop the scroll, nothing after it is seen. Completion rate then decides reach. This skill writes a script that opens with a hook, keeps every second earning the next, and fits the planned length exactly.

Write in Simplified Chinese.

## What This Skill Produces

- **Three hook options** for the first three seconds
- **A timed shot list**: each shot's length, the visual, the spoken line, the on-screen text
- **The caption and tags**
- **The cover frame**: which moment, and its text
- **A compliance check** of claims

## Required Inputs

Ask for these if not provided:
- **The topic and the one thing the viewer should take away**
- **Length**: 15, 30, 60 seconds, or longer
- **Format**: talking to camera, voice-over with footage, tutorial, story, product demo
- **The creator**: who appears, and the account's usual style
- **Whether it is commercial**, and if so, the product and any claims

## Framework

1. **Hook (0 to 3 seconds)**: one of: a result shown first, a surprising statement, a question the viewer has, a "don't do this" warning. Visual and words together.
2. **Promise (3 to 5 seconds)**: what the viewer gets if they stay.
3. **Body**: one idea per shot, a change of shot every two to four seconds, on-screen text for viewers watching without sound.
4. **Payoff**: deliver the promise clearly.
5. **Close**: a one-line call to action (follow, comment with a question, watch part two).
6. **Timing**: speaking pace about four to five Chinese characters per second; the script must fit the length.
7. **Compliance**: no restricted absolute advertising words, no efficacy claims without evidence, and commercial content disclosed using the platform's tools.

## Output Format

### 抖音脚本：[主题]｜[时长] 秒

**开头备选（前 3 秒）**
1. ...
2. ...
3. ...

**分镜脚本**
| 序号 | 时间 | 画面 | 口播 | 字幕 / 花字 |

**文案与话题**：...  #...

**封面**：第 [n] 秒画面，封面文字：...

**合规检查**
| 内容 | 问题 | 修改建议 |

## Quality Checks
- [ ] The hook works with the sound off
- [ ] The spoken lines fit the length at a natural pace
- [ ] Shots change every few seconds
- [ ] The payoff delivers what the hook promised
- [ ] Commercial content is marked for disclosure and claims are checked

## Anti-Patterns
- **A slow opening** ("大家好，今天我们来聊一聊").
- **Too many ideas** for the length.
- **A hook the video does not pay off.**
- **Unverified product claims.**

## Example Trigger Phrases
- "帮我写一个 30 秒的抖音脚本，教大家整理衣柜。"
- "这个视频开头怎么写才抓人？"
- "写一个产品测评短视频的分镜脚本。"
- "Write a 60-second Douyin script for our coffee brand."
