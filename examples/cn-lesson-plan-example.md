# Example: cn-lesson-plan

## What this skill does

Writes a complete 教案 in the format Chinese schools expect: textbook and learner analysis, objectives tied to the subject's 核心素养, key and difficult points, a timed teaching process, the board design and layered homework. Curriculum references are marked to confirm against the current 课程标准.

## How to trigger it

### Example 1: a new-content maths lesson

**You say:**
> "帮我写一份人教版七年级数学上册《有理数的加法》新授课教案，45 分钟，班里 42 人，上节课不少学生搞混了符号规则。要有教学目标对应核心素养、重难点、按分钟的教学过程、板书和分层作业。"

**Claude produces (excerpt):**

**三、教学目标（对应数学核心素养，需核实）**
1. 能结合数轴说出有理数加法的意义（抽象能力）
2. 能按法则正确计算同号、异号两数相加，正确率 90% 以上（运算能力）
3. 能说出"先定符号、再算绝对值"的理由（推理能力）

**四、重点与难点**
- 重点：有理数加法法则
- 难点：异号两数相加时符号的确定。突破方法：用"向东走、向西走"的数轴情境，让学生先在数轴上走一遍，再归纳法则。

**六、教学过程（节选）**
| 环节 | 时间 | 教师活动 | 学生活动 | 设计意图 |
|---|---|---|---|---|
| 情境导入 | 5 分钟 | 提问："先向东走 3 米，再向西走 5 米，最后在哪里？" | 在数轴上画出路线 | 唤起上节课的易错点 |
| 新知探究 | 15 分钟 | 分四种情况追问：结果的符号由谁决定？ | 小组归纳法则 | 让法则来自学生 |
| 巩固练习 | 12 分钟 | 分层练习 A 组 6 题、B 组 4 题 | 独立完成，同桌互查 | 检查是否掌握 |

**八、作业设计**：基础题 4 道（约 8 分钟）、提高题 2 道（约 7 分钟）、拓展题 1 道选做。总时长控制在学校规定范围内（需核实）。

## Tips for best results

- Give the textbook edition and the class's real mistakes from last lesson.
- Share the school's template if it has one.
- Check every curriculum reference against the current 课程标准 before an inspection.

## Related skills

- `cn-open-class` to turn the 教案 into a 说课稿
- `lesson-plan` for a general, non-Chinese lesson plan
- `cn-term-comments` at the end of term
