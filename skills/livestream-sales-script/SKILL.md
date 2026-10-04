---
name: livestream-sales-script
description: "Plan and script a live-commerce session (直播带货): the run of show, the script for each product segment, interaction prompts, offer timing, and a compliance check of every claim and price statement. Use when asked 帮我写直播带货脚本, 直播间话术, 直播流程, 直播排品, or write a livestream sales script. Produces the session run of show by minute, a per-product script with selling points and objection answers, interaction and retention prompts, the offer schedule, a host and assistant split, and a compliance check against false advertising and price rules."
version: 1.0.0
---

# Livestream Sales Script (直播带货)

A live-commerce session is a show with a sales target. What decides results is the order of products, how each is demonstrated, when offers land, and how the host keeps viewers in the room. What creates risk is a claim the product cannot back up or a misleading price statement. This skill plans the session and checks every claim.

Write in Simplified Chinese.

## What This Skill Produces

- **The run of show**, minute by minute
- **A script for each product**: opening, demonstration, selling points, objections answered, the offer, the close
- **Interaction prompts**: questions, polls, comment triggers, retention lines for newcomers
- **The offer schedule**: when each discount or gift appears
- **Host and assistant split**: who says and shows what
- **A compliance check** of claims and price statements

## Required Inputs

Ask for these if not provided:
- **Products**: name, price, the offer, stock, specifications, certifications, real selling points
- **Session length and platform**
- **The host**: style, and whether there is an assistant (副播)
- **Goal**: sales, new followers, clearing stock, launching a product
- **Evidence** for any efficacy or quality claim

## Framework

1. **Order the products (排品)**: opener (a strong-value item to build the room), hero products (main revenue), profit products, and a closing item. Repeat hero products for viewers who join late.
2. **Per-product segment (about 5 to 10 minutes)**:
   - Hook: the problem it solves, shown not told
   - Demonstration: close-ups, comparison, real use
   - Three selling points, each with evidence
   - Objections answered (price, size, quality, after-sales)
   - The offer, its condition and its end
   - A clear call to buy, and where the link is
3. **Retention**: re-introduce the session's offer every few minutes for newcomers; ask questions viewers can answer in one word.
4. **Compliance**:
   - No false or exaggerated claims; no restricted absolute words (最, 第一, 全网最低 unless provably true)
   - Price comparisons must be truthful ("原价" must be a real previous price)
   - No medical efficacy claims for ordinary food or cosmetics
   - State after-sales and return terms accurately

## Output Format

### 直播带货脚本：[主题]｜[时长]

**一、流程表**
| 时间 | 环节 | 产品 | 主播 | 副播 | 福利 |

**二、单品话术**（每个产品）
- 开场
- 演示要点
- 三个卖点（附依据）
- 常见疑问与回答
- 优惠与结束时间
- 下单引导

**三、互动与留人话术**

**四、福利排期**

**五、合规检查**
| 话术 | 问题 | 修改建议 |

## Quality Checks
- [ ] Every selling point has evidence the person supplied
- [ ] Every price comparison uses a real previous price
- [ ] Hero products are repeated for late viewers
- [ ] Each segment ends with a clear call to buy
- [ ] No restricted absolute or efficacy claim remains

## Anti-Patterns
- **Inventing selling points** or test results.
- **Fake "原价" anchors.** They breach price rules.
- **Shouting offers with no demonstration.** Viewers buy what they can see working.
- **No plan for late joiners.** Most viewers arrive mid-session.

## Example Trigger Phrases
- "帮我写一场两小时的直播带货脚本，卖厨房小家电。"
- "直播间话术怎么写才能留住人？"
- "帮我排品，有 8 个产品。"
- "Write a livestream sales script for our skincare launch."
