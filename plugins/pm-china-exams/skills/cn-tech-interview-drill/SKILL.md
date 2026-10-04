---
name: cn-tech-interview-drill
description: "Use when asked 帮我准备大厂技术面试, 八股文怎么背, 模拟一面二面, 系统设计面试题, 项目深挖怎么答, 手撕算法, or run a mock technical interview for a Chinese internet company. Produces a preparation plan for the interview rounds Chinese tech companies run (笔试, 技术一面二面, 交叉面, HR 面), a 八股 question bank by stack with answer points, a system design walkthrough, a project deep-dive script, and a mock round asked one question at a time with follow-ups (追问) and scores."
version: 1.0.0
---

# Tech Interview Drill (大厂技术面试)

Technical interviews at Chinese internet companies follow a recognisable pattern: an online test, two or three technical rounds that mix fundamentals (八股), hand-written algorithms (手撕), system design and a deep dive into the candidate's projects, then an HR round. Interviewers chase every answer with 追问 until they find the edge of what the candidate really knows. This skill builds a plan for the target role and runs mock rounds that do the same.

Write in Simplified Chinese unless asked otherwise. Company processes change; confirm the rounds with the recruiter.

## Required Inputs

Ask for these if not provided:
- **Target role and level**: 后端, 前端, 客户端, 算法, 测试, 数据; campus (校招) or experienced (社招)
- **Stack**: for example Java, Go, C++, Python, JavaScript and React or Vue
- **Projects** on the CV, with the person's own role and numbers
- **Interview date** and hours a day available
- **Weak areas**, if known

## Output Structure

### 1. Round map and plan
| Round | What it tests | Preparation | Days |
Covering 笔试 (algorithms under time), 一面 (fundamentals and coding), 二面 (projects and design), 交叉面 or 主管面 (depth and judgement), HR 面 (motivation, expectations).

### 2. 八股 question bank by stack
Grouped, each with the answer points and the likely 追问. For example:
- 计算机网络: TCP 三次握手与四次挥手（追问：为什么是三次？TIME_WAIT 的作用？）; HTTP/1.1, HTTP/2, HTTP/3 的区别; HTTPS 握手
- 操作系统: 进程与线程; 虚拟内存; I/O 多路复用（select / poll / epoll）
- 数据库: MySQL 索引（B+ 树、最左前缀、回表）; 事务隔离级别与 MVCC; 慢查询排查
- Redis: 数据结构; 持久化（RDB / AOF）; 缓存穿透、击穿、雪崩
- Stack-specific: Java（JVM 内存模型、GC、并发包、Spring）, Go（GMP 调度、channel）, 前端（事件循环、浏览器渲染、React 或 Vue 原理）

### 3. Algorithms
A topic list in priority order (数组与双指针, 哈希, 链表, 二叉树, 回溯, 动态规划, 图) with three representative problems each, and the habits interviewers look for: clarify the input, state complexity, test edge cases out loud.

### 4. System design walkthrough
One worked example matched to the role (秒杀系统, 短链服务, Feed 流, 分布式 ID) using a fixed frame: requirements and scale estimate, API, data model, core design, bottlenecks, trade-offs.

### 5. Project deep dive
For each CV project: the 30-second summary, the hardest problem and the person's own decision, the numbers, what they would change, and the five 追问 an interviewer will ask.

### 6. Mock round
Questions one at a time. After each answer: 追问 until the edge is found, then a score (1 to 5) on correctness, depth and communication, with the missing points.

## Quality Checks

- [ ] The plan covers every round the target company runs, with days allocated
- [ ] Every 八股 question has answer points and at least one 追问
- [ ] The system design example states a scale estimate and its trade-offs
- [ ] Every project script names the person's own decision and a number
- [ ] The mock round asks one question at a time and follows up before scoring
- [ ] No company's internal question list is presented as leaked or official

## Anti-Patterns

- **Reciting 八股 without understanding.** The 追问 finds it in two questions.
- **"We did X" in the project deep dive.** Interviewers want what you decided.
- **Silent coding.** Think aloud; communication is scored.
- **Design without numbers.** A design with no scale estimate cannot be judged.

## Example Trigger Phrases

- "下周字节后端一面，帮我模拟一轮。"
- "Java 八股文按优先级帮我列一下，附追问。"
- "帮我准备项目深挖，项目是一个订单系统。"
- "Run a mock technical interview for a Chinese tech company, frontend role."
