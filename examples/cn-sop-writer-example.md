# Example: cn-sop-writer

## What this skill does

Writes a one-station shop-floor 作业指导书: the header, materials and tools, numbered steps with key points and the reasons, quality checks matching the control plan, safety notes, photo placeholders, abnormal-situation handling and a revision record.

## How to trigger it

### Example 1: tightening end-cover screws on a motor line

**You say:**
> "帮我写一份电机装配线端盖螺丝拧紧工位的作业指导书：4 颗 M5 螺丝，对角顺序拧紧，扭矩 4.5 ± 0.3 N·m，用电动扭力扳手，拧完要打标记。新员工经常漏打标记、顺序拧错。"

**Claude produces (excerpt):**

**三、作业步骤**
| 步骤 | 作业内容 | 要点 | 要点理由 | 图示 |
|---|---|---|---|---|
| 1 | 取端盖，放到定位工装上 | 缺口朝上对准定位销 | 方向错会导致螺孔错位 | 照片：正确方向，箭头朝上 |
| 2 | 预拧 4 颗 M5 螺丝 | 先用手拧 2 圈 | 防止斜拧滑牙 | 照片：手拧 |
| 3 | 用电动扭力扳手按对角顺序拧紧 | 顺序 1-3-2-4，扭矩 4.5 ± 0.3 N·m | 不按对角拧会使端盖受力不均、漏油 | 图示：对角顺序编号 |
| 4 | 每颗螺丝拧完后用记号笔打标记 | 标记跨螺丝头和端盖 | 漏打标记无法确认是否已拧紧 | 照片：正确标记与漏标对比 |

**四、质量检查**
| 检查项目 | 标准 | 方法/量具 | 频次 | 不合格处理 |
|---|---|---|---|---|
| 扭矩 | 4.5 ± 0.3 N·m | 扳手显示 + 每班首件用扭力计复核 | 每件 / 每班 | 放红箱，通知班长 |
| 标记 | 4 颗都有 | 目检 | 每件 | 补拧并标记 |

**六、异常处理**：扳手报警、扭矩超差或连续两件出问题时：停、呼、等：停下作业，按呼叫灯，等班长到场。

## Tips for best results

- Describe the job as an experienced operator actually does it.
- Bring the control plan characteristics for the station.
- Have an engineer approve it before it goes to the line.

## Related skills

- `sop-writer` for office and business process SOPs
- `cn-8d-report` when a defect leads to an SOP change
- `cn-5s-audit` for the station's standards
