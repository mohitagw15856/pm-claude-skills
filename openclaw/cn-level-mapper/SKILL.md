---
name: cn-level-mapper
description: "Compare job levels (职级) across Chinese technology companies and against international ladders, to judge an offer, a job move or a promotion target: what a level usually means in scope and expectations, how levels roughly line up, and what to ask the recruiter. Use when asked P7 相当于什么级别, 跳槽职级怎么对标, 字节 2-2 对应阿里什么, 这个 offer 的职级合理吗, compare Chinese tech levels, or how does Alibaba P-level map to Google levels. Produces a level comparison built from the person's own ladders and offer details, a scope-and-expectation profile for each level, the negotiation questions to ask, and a clear note on what is approximate."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-level-mapper.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Level Mapper (职级对标)

When people move between Chinese technology companies, or between China and international employers, the first question is often "what level is this, really?". Ladders differ in naming, number of steps and expectations, and published mappings online are often out of date. This skill builds a comparison from the ladders and offer details the person has, explains what each level usually means in practice, and turns the gaps into questions for the recruiter.

Write in Simplified Chinese unless asked otherwise.

## What This Skill Produces

- **A comparison table** of the levels in question, with the evidence for each mapping
- **A scope profile** for each level: typical scope, independence, people leadership, and what the promotion bar asks for
- **An offer check**: whether the offered level matches the person's experience and current level
- **Questions for the recruiter or hiring manager** to pin down what the level means at that company

## Required Inputs

Ask for these if not provided:
- **Current company and level**, and years of experience
- **Target company and offered or expected level**
- **Role family**: engineering, product, design, data, operations
- **Any ladder documents**, level descriptions or offer letters the person can share
- **What they want to decide**: accept, negotiate, or set a promotion goal

## Framework

1. **Start from the person's documents.** Ladders change; treat the company's own descriptions as the source and say so.
2. **Map by scope, not by number.** Compare what each level is expected to own: a task, a module, a system, a product line, a business. Two levels with the same number can differ by a full step in scope.
3. **Use public reference points carefully.** Widely reported examples include Alibaba's P-series (P6 is commonly described as a senior individual contributor and P7 as an expert who owns a significant area) and ByteDance's two-part levels (such as 2-1 and 2-2). Present these as commonly reported and approximate, and tell the person to confirm with the company.
4. **Check the offer against the evidence.** Compare the person's actual scope (team size, systems owned, impact) with the target level's expectations, not only their title.
5. **Turn gaps into questions.** "这个职级在团队里通常负责什么范围？", "下一级的晋升标准是什么？通常需要多久？", "这个职级对应的薪酬带宽是多少？", "团队里同级别的人做什么？".

## Output Format

### 职级对比
| 公司 | 职级 | 典型负责范围 | 独立程度 | 带人情况 | 依据（文件 / 公开信息 / 推测） |

### 职级画像
For each level: 一句话定位, 典型职责, 晋升到下一级的关键门槛.

### Offer 判断
- 你的实际范围对应：[职级区间]
- 对方给出的职级：[职级] → 偏低 / 合理 / 偏高，理由：[...]

### 建议向 HR / 面试官确认的问题
1. ...

### 说明
职级对标是近似的。各公司职级体系会调整，同一职级在不同部门的实际范围也可能不同，请以对方公司的正式说明为准。

## Quality Checks

- [ ] Every mapping cites its basis: the person's documents, public reporting, or inference
- [ ] Levels are compared by scope and expectations, not by number alone
- [ ] Public reference points are labelled approximate
- [ ] The offer judgement gives a reason tied to the person's actual scope
- [ ] At least four concrete questions for the recruiter are included
- [ ] No salary figure is stated unless the person provided it

## Anti-Patterns

- **Treating an internet table as fact.** Ladders are reorganised; old mappings mislead.
- **Mapping by title.** "高级" or "专家" means different things at different companies.
- **Ignoring the promotion bar.** A level that is easy to get but hard to leave matters as much as the starting point.
- **Quoting pay bands from rumour.** Ask the company.

## Example Trigger Phrases

- "阿里 P7 跳槽到字节，大概对应什么职级？"
- "这个 offer 给了 2-1，我现在是 P6，合理吗？"
- "Compare my Tencent level with Google's ladder for a move to Singapore."
- "帮我对标一下职级，下周要谈 offer。"
