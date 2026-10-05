---
name: cn-quality-traceability
description: "Use when asked 质量追溯体系怎么建, 产品追溯方案, 批次追溯, 一物一码, 客户要求可追溯性, 召回演练, 正向追溯和反向追溯, or plan product and batch traceability in a Chinese factory. Produces a traceability plan in Chinese: the trace unit and coding rule, the data to capture at each process step (material lots, work orders, equipment, people, inspection results), forward and backward trace paths, record retention, a mock recall drill with a target time, gaps against the current system, and a phased rollout, with industry rules (food, medical devices, automotive) marked to confirm."
version: 1.0.0
---

# Quality Traceability Plan (质量追溯方案)

When a defect reaches a customer, the first questions are which other products are affected and where the cause came from. A factory without traceability answers with a guess and recalls far more than it needs to, or not enough. Customers, especially in automotive, medical devices and food, require it, and some industries have legal requirements. This skill designs traceability that can answer those questions in hours, sized to the factory's systems.

Write in Simplified Chinese unless asked otherwise. Industry and customer requirements differ: food production under the 食品安全法 and its rules, medical devices under the UDI (医疗器械唯一标识) requirements, automotive under IATF 16949 and customer-specific requirements, and others. These are named for orientation and marked 需核实; the plant confirms what applies to its products with its quality and regulatory teams. For writing up a specific complaint, use `cn-8d-report`.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **Products and industry**: what is made, for whom, and any regulatory or customer requirements known
- **Process flow**: from incoming materials to shipment, including outsourced steps
- **Current systems**: paper travellers, Excel, ERP, MES, WMS; barcode or QR capability
- **Volumes**: units per day, lot sizes, number of SKUs
- **Pain**: the last time a trace was needed and how long it took, or a customer audit finding
- **Budget and timeline**

## Output Structure

### 1. 追溯目标与范围
What questions the system must answer and how fast (for example: given a customer serial number, find the material lots and process data within 2 hours; given a bad material lot, find every finished product and customer within 4 hours).

### 2. 追溯单元与编码规则
Unit level (single piece, batch, box, pallet) chosen per product with reasons; the coding rule (for example 产品代码 + 产线 + 日期 + 班次 + 流水号), label type (barcode, QR, DPM laser mark), and where it is applied.

### 3. 各工序采集数据
| 工序 | 采集内容 | 方式 | 记录位置 | 责任人 |
Incoming lot and supplier, work order, equipment and moulds or fixtures, key parameters, operators, first-article and in-process inspection results, rework and scrap, packing and shipment to customer. Includes the link between material lots and work orders (the most common gap).

### 4. 正向与反向追溯路径
- **反向 (backward)**: from a finished product or customer complaint back to materials, process and people
- **正向 (forward)**: from a suspect material lot or process event to every affected product and customer
Each as a step-by-step query in the current system, showing where it breaks today.

### 5. 记录保存
What is kept, in what form, for how long (the product life plus a margin, or the period the customer or regulation requires, 需核实), and backup.

### 6. 召回演练
A mock recall drill: the scenario, the start and stop time, who takes part, the target time, and what is measured (completeness of the lot list, time to answer). Run at least yearly or as the customer requires.

### 7. 差距与分阶段实施
| 差距 | 风险 | 措施 | 阶段 | 成本估计 |
Phase 1 with paper or Excel where needed, phase 2 with scanning, phase 3 with MES integration; quick wins first.

## Quality Checks

- [ ] The target questions and response times are stated
- [ ] Trace unit and coding rule are defined per product
- [ ] The material lot to work order link is captured
- [ ] Both forward and backward paths are written as concrete queries
- [ ] A mock recall drill has a scenario and target time
- [ ] Regulatory and customer requirements are marked 需核实

## Anti-Patterns

- **Buying an MES before defining what to trace.** Software without a data model gives fast answers to the wrong questions.
- **Lots so large the trace is useless.** A lot that is a month of production recalls a month.
- **Mixing lots at a step without recording it.** Shared bins and silos break the chain.
- **Never testing.** The first real recall is a bad time to find the gaps.
- **Outsourced steps left out.** The subcontractor's lot data must link back.

## Example Trigger Phrases

- "我们是做汽车线束的，客户要求能追溯到每一批原材料，帮我设计追溯方案。"
- "出了质量问题查了三天都不知道影响哪些批次，怎么建立追溯？"
- "帮我设计一次召回演练。"
- "食品厂一物一码追溯要怎么做？"
- "Design a batch traceability plan for a Chinese electronics factory."
