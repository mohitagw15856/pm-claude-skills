---
name: cn-citation-gbt7714
description: "Use when asked 参考文献格式怎么写, 按 GB/T 7714 排参考文献, 帮我改参考文献格式, 顺序编码制还是著者-出版年制, 文献类型标识 J M D 是什么, or format references to the Chinese national standard. Produces references formatted to GB/T 7714 in the numeric (顺序编码制) or author-year (著者-出版年制) system, with the right document type codes, a check of each entry, and a deterministic formatter script for long lists."
version: 1.0.0
---

# GB/T 7714 References (参考文献著录)

Chinese universities and journals format references to GB/T 7714 信息与文献 参考文献著录规则. Most theses still follow the 2015 edition; check whether your school has adopted a newer one. Students lose marks on details: the missing document type code, the wrong punctuation between fields, more than three authors listed in full, or English names written the wrong way round. This skill formats references to the standard and checks each entry, with `scripts/gbt7714.py` for long lists.

Write the notes in Simplified Chinese unless asked otherwise. Format only what the user provides; never add a DOI, page range or year that is not in the source.

## Required Inputs

Ask for these if not provided:
- **The references**, in any form (copied text, BibTeX, a CNKI export, or a list of details)
- **The system**: 顺序编码制 (numbered in order of citation) or 著者-出版年制 (author and year)
- **The edition** and any school or journal variation
- **Language handling**: whether English sources keep English punctuation (usual) or follow a school rule

## Output Structure

### 1. Formatted list
Each entry to the pattern for its type, for example:
- Journal [J]: `[1] 作者. 题名[J]. 刊名, 年, 卷(期): 起止页码. DOI.`
- Book [M]: `[2] 作者. 书名[M]. 版本(第1版不写). 出版地: 出版者, 出版年: 引用页码.`
- Thesis [D]: `[3] 作者. 题名[D]. 保存地: 保存单位, 年份.`
- Conference [C], standard [S], patent [P], report [R], newspaper [N], online [EB/OL] with 引用日期 and URL

Authors: list up to three, then ", 等" for Chinese sources or ", et al." for English. English names are written surname first in full and given names as initials without full stops (SMITH J, or Smith J where the school allows).

### 2. Entry checks
| # | Type code | Missing or wrong fields | Fixed? |

### 3. Formatter script
For long lists, run `python3 scripts/gbt7714.py references.json` with one JSON object per reference (fields: type, authors, title, journal, year, volume, issue, pages, publisher, place, url, accessed, doi). It prints the numbered list and warns about missing required fields instead of guessing them.

## Quality Checks

- [ ] Every entry has a document type code such as [J], [M], [D] or [EB/OL]
- [ ] No entry lists more than three authors before 等 or et al.
- [ ] English author names are surname first with initials
- [ ] Online sources include both the 引用日期 and the URL
- [ ] Numbered entries follow the order of first citation in the text
- [ ] No field was invented; missing fields are flagged 缺失

## Anti-Patterns

- **Copying CNKI's export without checking.** Exports often omit pages or use the wrong type code.
- **Mixing systems.** One thesis uses one system throughout.
- **Full-width punctuation in English entries** (，．) unless the school requires it.
- **Filling gaps from memory.** A wrong year or volume is worse than a flagged gap.

## Example Trigger Phrases

- "帮我把这些参考文献改成 GB/T 7714 格式。"
- "学位论文和会议论文的文献类型标识是什么？"
- "顺序编码制和著者-出版年制有什么区别？我该用哪个？"
- "Format my references to GB/T 7714 for my thesis."
