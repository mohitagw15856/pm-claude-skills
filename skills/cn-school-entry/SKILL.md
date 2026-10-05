---
name: cn-school-entry
description: "Use when asked 幼升小怎么准备, 小升初流程, 入学信息采集, 学区房和多校划片, 公民同招, 民办摇号, 随迁子女入学, 居住证入学材料, or plan a child's entry to primary or junior high school in mainland China. Produces a month-by-month timeline for the child's city, the documents to prepare (户籍, 房产 or 租房, 居住证, 社保), the questions to ask the 教育局 or school about 学区, 多校划片 and 派位, a public versus private comparison, and a checklist, with every local rule marked to confirm with the local education bureau."
version: 1.0.0
---

# School Entry Planner (幼升小 / 小升初)

Entering primary school (幼升小) or junior high (小升初) is one of the most stressful admin tasks for Chinese parents. Rules are set by each city and district and change every year: which documents count, whether a home is still matched to one school or to several (多校划片), when public and private schools enrol together (公民同招), how lotteries (摇号) work, and what non-local families (随迁子女) must show. This skill turns the family's situation into a timeline, a document list and the right questions.

Write in Simplified Chinese unless asked otherwise. Every date, document requirement and allocation rule depends on the city and district and on that year's 招生政策; everything here is marked 需核实 and must be confirmed against the district 教育局's official notice for the year, usually published in spring. This is planning help, not an official interpretation. For choosing between specific schools, `school-choice-decision` adds a decision framework.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **City and district**, and the child's current stage and date of birth (the age cut-off date varies by place)
- **Transition**: 幼升小 or 小升初, and the target year
- **户籍**: local or non-local; where the 户口 is registered
- **Housing**: owned (whose name, when bought, whether the 学位 was used before), rented (registered lease), or living with relatives
- **Parents' documents**: 居住证, 社保 contribution months, work proof, for non-local families
- **Preferences**: public, private (民办), or both; specific schools; budget for private fees
- **What the family has already heard** from neighbours or the kindergarten, to check against official sources

## Output Structure

### 1. 你的情况属于哪一类（需核实）
Which category the family likely falls into in this district (for example 户籍与房产一致, 有房无户, 租房, 随迁子女), and what that usually means for priority. Quote the year's district notice if the person has it; otherwise say which section to look for.

### 2. 时间线（按月）
| 时间 | 事项 | 渠道 | 状态 |
Typical stages to confirm locally: policy published, 入学信息采集 or online registration, document check (审核), private school applications and 摇号, public allocation or 派位, results, enrolment. For 小升初 add 对口直升, 电脑派位 and any 特长生 routes still permitted.

### 3. 材料清单
| 材料 | 谁的 | 要求（需核实）| 准备情况 |
户口簿, 出生证明, 房产证 or 不动产权证 or 购房合同, 租赁合同 and 备案, 居住证, 社保 records, 疫苗接种证 check, photos. Note which originals and copies are needed and how long processing takes (for example 居住证 or lease registration may need months).

### 4. 学区与多校划片要问的问题
Questions to ask the 教育局 hotline or the school, in writing where possible:
- 这个地址今年对应哪所或哪几所学校？是单校划片还是多校划片？
- 房产学位是否有"几年一学位"的限制？这套房的学位是否已被占用？
- 租房家庭需要满足哪些条件（备案时长、社保月数）？
- 民办和公办是否同步报名？摇号不中如何统筹？
- 随迁子女需要哪些材料，截止时间是哪天？

### 5. 公办与民办对比
| 维度 | 公办 | 民办 |
Allocation method, fees, distance, class size, the risk of not getting a lottery place and the fallback.

### 6. 风险提示
Common mistakes: buying a home for a 学位 without checking the district's 多校划片 or 学位 rules, a lease not registered in time, missing the online window, trusting agents' promises. A reminder to keep screenshots of submissions.

## Quality Checks

- [ ] The family's category is identified, or marked as unclear with the question to ask
- [ ] Every date and document rule is marked 需核实 with the official source named
- [ ] Long-lead documents (居住证, lease registration, 社保 months) are flagged early
- [ ] Questions to the 教育局 are specific to this address and situation
- [ ] No school place is presented as guaranteed
- [ ] The output says to rely on the district's official notice for the year

## Anti-Patterns

- **Last year's rules as this year's.** Policies change annually; check the new notice.
- **Agents' promises.** A 学区 claim from a seller or agent is not a guarantee.
- **Leaving documents to the last month.** Some take months to obtain.
- **One plan only.** Always know the fallback if the lottery or allocation does not go your way.
- **Sharing the child's documents in public groups.** Send them only through official channels.

## Example Trigger Phrases

- "我们在上海浦东，非沪籍，有居住证，孩子 2027 年幼升小，现在要准备什么？"
- "买了二手学区房，怎么确认学位有没有被占用？"
- "多校划片是什么意思？对我们有什么影响？"
- "小升初民办摇号没摇中怎么办？"
- "Explain primary school entry in Shenzhen for a non-local family."
