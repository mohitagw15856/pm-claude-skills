# Importable trackers

Ready-made trackers for the three things people most often run skills on every week: the **weekly report**, **OKRs** and **job applications**. Import one, then paste each skill's output into it.

| Tracker | Skills that fill it | 飞书多维表格 | Notion | Obsidian |
|---|---|---|---|---|
| Weekly report · 周报 | `cn-weekly-report`, `project-status-report` | [feishu/weekly-report.csv](feishu/weekly-report.csv) | [notion/weekly-report.csv](notion/weekly-report.csv) | [obsidian/weekly-report.md](obsidian/weekly-report.md) |
| OKRs | `okr-builder` | [feishu/okr.csv](feishu/okr.csv) | [notion/okr.csv](notion/okr.csv) | [obsidian/okr.md](obsidian/okr.md) |
| Job applications · 求职 | `jd-decoder`, `company-tailored-cv`, `interview-prep`, `cn-campus-recruitment` | [feishu/job-applications.csv](feishu/job-applications.csv) | [notion/job-applications.csv](notion/job-applications.csv) | [obsidian/job-application.md](obsidian/job-application.md) |

Each CSV has two example rows; delete them after importing.

## Notion

1. In Notion, open the page where the tracker should live and choose **Import → CSV**.
2. Pick the file. Notion creates a database with one property per column.
3. Change the property types where it helps: dates to **Date**, Status and Stage to **Select**, Progress to **Number**.

## Obsidian

1. Copy the `obsidian/` files into your vault, for example into a `Templates` folder.
2. Turn on the core plugin **Templates** and point it at that folder; create a note from a template with **Insert template**.
3. Optional: install the community plugin **Dataview** and open `dashboard.md` for tables of open applications, OKRs and recent reports. The templates' properties (frontmatter) are what the dashboard reads.

## 飞书多维表格

1. 在飞书云文档里新建 **多维表格**，选择导入 Excel 或 CSV，选中 `feishu/` 里的 CSV 文件（UTF-8 编码，带 BOM，中文不会乱码）。
2. 导入后把字段类型改一下效果更好：日期列改成 **日期**，状态、阶段改成 **单选**，进度改成 **数字**。
3. 每周用 `cn-weekly-report` 生成周报后，把各部分分别粘贴到对应字段；求职表配合 `jd-decoder`、`company-tailored-cv` 和 `interview-prep` 使用。

## Notion 与 Obsidian（中文简要说明）

- **Notion**：页面里选择 Import → CSV，导入 `notion/` 里的文件，再把日期、状态等属性改成合适的类型。
- **Obsidian**：把 `obsidian/` 复制到库里，开启核心插件“模板”插入模板；装上 Dataview 插件后打开 `dashboard.md`，可以自动汇总求职进度、OKR 和最近的周报。
