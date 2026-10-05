# Example: cn-school-entry

## What this skill does

Plans a child's entry to primary or junior high school in mainland China: the family's likely category, a month-by-month timeline, the documents, the questions to ask the 教育局 about 学区 and 多校划片, and a public versus private comparison, with every local rule marked to confirm.

## How to trigger it

### Example 1: a non-local renting family in Hangzhou

**You say:**
> "我们在杭州西湖区，非杭州户籍，有居住证两年，租房住，社保在杭州交了三年。孩子 2020 年 3 月出生，2026 年秋季幼升小。现在要准备什么？时间线和材料清单，还要问教育局哪些问题？"

**Claude produces (excerpt):**

**一、你的情况可能属于哪一类（需核实）**
非本市户籍、租房、持居住证、社保连续缴纳，一般属于"随迁子女"或"新居民子女"入学类别，通常按积分或材料审核统筹安排学位。请以西湖区教育局当年发布的招生公告为准，重点看"随迁子女入学"一节。

**二、时间线（典型节点，需核实）**
| 时间 | 事项 | 渠道 | 状态 |
|---|---|---|---|
| 现在 | 确认居住证、社保、租房备案的连续时长 | 当地政务服务 App | 待办 |
| 次年春季 | 关注招生政策发布 | 区教育局官网 | 待办 |
| 公告后 | 网上登记、材料审核 | 区教育局指定平台 | 待办 |
| 夏季 | 民办报名与摇号、公办统筹结果 | 同上 | 待办 |

**四、要问教育局的问题**
- 我们租住的地址今年对应哪所或哪几所学校？
- 随迁子女要求居住证和社保满多长时间？截止日期是哪天？
- 租房合同需要备案多久才算数？

**风险提示**：租房备案和社保月数需要提前积累，不能等公告出来再办。

## Tips for best results

- Give the exact district and the child's date of birth.
- List which documents you already hold and since when.
- Rely on the district's official notice for the year, not group chats.

## Related skills

- `school-choice-decision` to compare specific schools
- `cn-home-school-comms` once the child has started
