---
name: cn-sop-writer
description: "Use when asked 写作业指导书, SOP 作业指导书, 工序作业标准, 标准作业书, 新员工看得懂的操作说明, WI 怎么写, or write a shop-floor work instruction for a production or inspection step in a Chinese factory. Produces a one-station 作业指导书 in Chinese with the header block (文件编号, 版本, 工序, 产品, 标准工时), materials and tools, numbered steps with key points (要点) and the reasons, quality checks and limits, safety notes and PPE, photo or diagram placeholders, abnormal-situation handling, and a revision record, written for a new operator."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-sop-writer.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Work Instruction (作业指导书 / SOP)

On a Chinese production line the 作业指导书 (often called SOP or WI) hangs at the station and is what a new operator follows on day one. Many are copied from engineering documents: dense text, no pictures, steps that skip the critical point, and an outdated version. This skill writes one station's instruction so a new operator can do the job correctly and knows why the key points matter.

Write in Simplified Chinese unless asked otherwise. This is for a single shop-floor operation in manufacturing; for an office or business process SOP, use `sop-writer` instead. The instruction must agree with the plant's control plan, PFMEA and customer requirements, and safety content follows the plant's risk assessment (需核实); a qualified engineer approves it before release.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Station**: product and part number, process step, line, equipment, fixtures and tools
- **How the job is done today**: the steps in order, ideally from watching an experienced operator
- **Quality requirements**: characteristics checked here, specifications, gauges, sampling, from the control plan
- **Safety**: hazards, PPE, lockout or guards
- **Cycle time** and takt, if known
- **Plant format**: the document template and numbering rule, approval roles
- **Readers**: new operators, literacy level, whether pictures carry most of the instruction

## Output Structure

### 1. 表头
| 文件编号 | 版本 | 生效日期 | 产品/料号 | 工序 | 工位 | 标准工时 | 编制 | 审核 | 批准 |

### 2. 物料与工装
| 名称 | 规格/料号 | 数量 | 位置 |
Materials, tools, fixtures, gauges and consumables, with where they are kept at the station.

### 3. 作业步骤
| 步骤 | 作业内容 | 要点 | 要点理由 | 图示 |
- **作业内容**: one action per step, starting with a verb (取, 放, 对准, 拧紧, 目检)
- **要点**: the critical detail (torque, direction, sequence, position)
- **要点理由**: why it matters (prevents a leak, an injury, a mix-up), so operators understand rather than memorise
- **图示**: a placeholder describing the photo or diagram to take (for example 照片：正确方向，箭头朝上) and marking right and wrong

### 4. 质量检查
| 检查项目 | 标准 | 方法/量具 | 频次 | 不合格处理 |
Matching the control plan; what to do with a bad part (red bin, label, tell the team leader).

### 5. 安全注意事项
PPE, hazards at this station, what never to do (reach into a running machine), and the emergency stop location.

### 6. 异常处理
What counts as abnormal (equipment alarm, material mismatch, a defect repeats) and the response: stop, mark, call the team leader, record. A short "停, 呼, 等" rule.

### 7. 修订记录
| 版本 | 日期 | 修改内容 | 修改人 |

## Quality Checks

- [ ] Each step is one action with a verb, in operation order
- [ ] Key points have reasons
- [ ] Quality checks match the control plan, with reaction to a defect
- [ ] Safety and PPE are specific to this station
- [ ] Every step has a photo or diagram placeholder, with right and wrong shown where it helps
- [ ] Header, version and revision record are complete; approval by an engineer is noted

## Anti-Patterns

- **Dense paragraphs.** Operators read the station sheet in seconds; use short steps and pictures.
- **Key points without reasons.** People skip what they do not understand.
- **Copying the engineering spec.** Write what the hands do, in order.
- **Out-of-date versions at the station.** Version control and removing old copies are part of the job.
- **No abnormal-situation rule.** Operators improvise, and defects pass.

## Example Trigger Phrases

- "帮我写一份电机装配线拧螺丝工位的作业指导书。"
- "新员工老是装反，作业指导书怎么写才看得懂？"
- "我们的 SOP 全是文字，帮我改成带图示占位的格式。"
- "注塑机换模的作业指导书。"
- "Write a shop-floor work instruction in Chinese for a soldering station."
