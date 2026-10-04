#!/usr/bin/env python3
"""Turn a CV written in simple markdown into a parsing-safe Word document.

The output is built for applicant tracking systems: one column, real heading
styles, no tables, text boxes, headers, footers or images, and contact details
in the body. Chinese, Japanese and Korean text gets an East Asian font so it
renders correctly. Standard library only, no network access.

Input format
------------
    # Jane Smith
    London · jane@example.com · +44 7700 900000 · linkedin.com/in/janesmith

    ## Summary
    Product manager with eight years in payments...

    ## Experience
    ### Senior Product Manager, Acme Pay | Jan 2021 to present
    - Cut checkout drop-off by 18% by redesigning...

Supported: one # name line, ## section headings, ### role lines, - bullets,
**bold**, and plain paragraphs. Anything else is kept as a plain paragraph.

Usage
-----
    python3 cv_docx.py cv.md Jane-Smith-CV.docx
    python3 cv_docx.py cv.md Jane-Smith-CV.docx --paper letter
    python3 cv_docx.py cv.md cv.docx --font "Calibri" --east-asian-font "Microsoft YaHei"
    python3 cv_docx.py --check Jane-Smith-CV.docx        # print the text back out
    python3 cv_docx.py --selftest
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
import zipfile
from xml.sax.saxutils import escape

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
PAPER = {  # twentieths of a point
    "a4": (11906, 16838),
    "letter": (12240, 15840),
}
CJK = re.compile(r"[぀-ヿ㐀-䶿一-鿿가-힯]")


def run_xml(text: str, bold: bool = False, size: int | None = None) -> str:
    props = ""
    if bold or size:
        props = "<w:rPr>" + ("<w:b/>" if bold else "") + (f'<w:sz w:val="{size}"/>' if size else "") + "</w:rPr>"
    return f'<w:r>{props}<w:t xml:space="preserve">{escape(text)}</w:t></w:r>'


def inline(text: str, size: int | None = None) -> str:
    parts = re.split(r"(\*\*[^*]+\*\*)", text)
    out = []
    for part in parts:
        if not part:
            continue
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            out.append(run_xml(part[2:-2], bold=True, size=size))
        else:
            out.append(run_xml(part, size=size))
    return "".join(out) or "<w:r><w:t/></w:r>"


def paragraph(text: str, style: str | None = None, bullet: bool = False, size: int | None = None) -> str:
    ppr = ""
    if bullet:
        ppr = '<w:pPr><w:pStyle w:val="ListBullet"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
    elif style:
        ppr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>'
    return f"<w:p>{ppr}{inline(text, size)}</w:p>"


def body_from_markdown(md: str) -> tuple[str, str | None]:
    """Return the body XML and the name (for document properties)."""
    out = []
    name = None
    for raw in md.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        stripped = line.lstrip()
        if stripped.startswith("# ") and not stripped.startswith("## "):
            name = stripped[2:].strip()
            out.append(paragraph(name, style="Title"))
        elif stripped.startswith("### "):
            out.append(paragraph(stripped[4:].strip(), style="Heading2"))
        elif stripped.startswith("## "):
            out.append(paragraph(stripped[3:].strip(), style="Heading1"))
        elif re.match(r"^[-*•]\s+", stripped):
            out.append(paragraph(re.sub(r"^[-*•]\s+", "", stripped), bullet=True))
        else:
            out.append(paragraph(stripped))
    return "".join(out), name


def styles_xml(font: str, east_asian: str) -> str:
    fonts = f'<w:rFonts w:ascii="{escape(font)}" w:hAnsi="{escape(font)}" w:cs="{escape(font)}" w:eastAsia="{escape(east_asian)}"/>'
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="{W}">
<w:docDefaults><w:rPrDefault><w:rPr>{fonts}<w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB" w:eastAsia="zh-CN"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="40"/></w:pPr><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="808080"/></w:pBdr></w:pPr><w:rPr><w:b/><w:caps/><w:sz w:val="23"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="40"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="21"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ListBullet"><w:name w:val="List Bullet"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="40"/><w:ind w:left="360" w:hanging="240"/></w:pPr></w:style>
</w:styles>"""


NUMBERING = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="{W}">
<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="240"/></w:pPr></w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>"""

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>"""

ROOT_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
</Relationships>"""

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>"""


def build(md: str, out_path: str, paper: str = "a4", font: str = "Calibri", east_asian: str = "") -> dict:
    if paper not in PAPER:
        raise ValueError(f"paper must be one of: {', '.join(PAPER)}")
    if not east_asian:
        east_asian = "Microsoft YaHei" if CJK.search(md) else font
    body, name = body_from_markdown(md)
    if not body:
        raise ValueError("the CV is empty")
    w, h = PAPER[paper]
    sect = f'<w:sectPr><w:pgSz w:w="{w}" w:h="{h}"/><w:pgMar w:top="1000" w:right="1000" w:bottom="1000" w:left="1000" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>'
    document = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="{W}"><w:body>{body}{sect}</w:body></w:document>'
    core = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/">'
        f"<dc:title>{escape((name or 'CV') + ' CV')}</dc:title><dc:creator>{escape(name or '')}</dc:creator>"
        "</cp:coreProperties>"
    )
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CONTENT_TYPES)
        z.writestr("_rels/.rels", ROOT_RELS)
        z.writestr("word/_rels/document.xml.rels", DOC_RELS)
        z.writestr("word/document.xml", document)
        z.writestr("word/styles.xml", styles_xml(font, east_asian))
        z.writestr("word/numbering.xml", NUMBERING)
        z.writestr("docProps/core.xml", core)
    return {"path": out_path, "name": name, "paper": paper, "font": font, "east_asian_font": east_asian}


def extract_text(path: str) -> str:
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    paras = re.findall(r"<w:p>(.*?)</w:p>", xml, flags=re.S)
    lines = []
    for p in paras:
        text = "".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", p, flags=re.S))
        text = text.replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"').replace("&amp;", "&")
        lines.append(text)
    return "\n".join(lines)


def selftest() -> int:
    md = (
        "# Jane Smith & Co <test>\r\n"
        "London · jane@example.com\r\n\r\n"
        "## Experience\r\n"
        "### Senior PM, Acme | 2021 to present\r\n"
        "- Cut drop-off by **18%** in 0 weeks\r\n"
        "## 教育背景\r\n"
        "- 北京大学 计算机科学\r\n"
    )
    failed = []
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, "cv.docx")
        info = build(md, out)
        text = extract_text(out)
        with zipfile.ZipFile(out) as z:
            names = set(z.namelist())
            doc = z.read("word/document.xml").decode("utf-8")
            styles = z.read("word/styles.xml").decode("utf-8")
        checks = [
            ("Jane Smith & Co <test>" in text, "special characters survive the round trip"),
            ("18% in 0 weeks" in text, "bold run and a zero are kept"),
            ("北京大学" in text, "Chinese text kept"),
            (info["east_asian_font"] == "Microsoft YaHei", "East Asian font chosen for CJK text"),
            ("<w:tbl" not in doc, "no tables"),
            ("headerReference" not in doc and "footerReference" not in doc, "no header or footer"),
            ('w:w="11906"' in doc, "A4 by default"),
            ('w:eastAsia="Microsoft YaHei"' in styles, "East Asian font in styles"),
            ({"word/document.xml", "word/styles.xml", "[Content_Types].xml"} <= names, "required parts present"),
        ]
        failed += [n for ok, n in checks if not ok]
        out2 = os.path.join(d, "letter.docx")
        build("# A\n- b", out2, paper="letter")
        with zipfile.ZipFile(out2) as z:
            if 'w:w="12240"' not in z.read("word/document.xml").decode():
                failed.append("letter paper size")
        try:
            build("   \n", os.path.join(d, "empty.docx"))
            failed.append("empty CV should raise")
        except ValueError:
            pass
        try:
            build("# A", os.path.join(d, "x.docx"), paper="a5")
            failed.append("unknown paper should raise")
        except ValueError:
            pass
    for n in failed:
        print(f"FAIL {n}", file=sys.stderr)
    total = 12
    print(f"cv_docx selftest: {total - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Turn a markdown CV into a parsing-safe Word document.")
    p.add_argument("source", nargs="?", help="markdown CV file, or - for stdin")
    p.add_argument("output", nargs="?", help="output .docx path")
    p.add_argument("--paper", default="a4", choices=sorted(PAPER), help="a4 (default) or letter")
    p.add_argument("--font", default="Calibri")
    p.add_argument("--east-asian-font", default="", help="font for Chinese, Japanese and Korean text")
    p.add_argument("--force", action="store_true", help="overwrite the output file if it exists")
    p.add_argument("--check", metavar="DOCX", help="print the text of a .docx, to verify it")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if a.check:
        print(extract_text(a.check))
        return 0
    if not a.source or not a.output:
        p.error("give a source markdown file and an output .docx path")
    if not a.output.lower().endswith(".docx"):
        p.error("the output file must end in .docx")
    if os.path.exists(a.output) and not a.force:
        p.error(f"{a.output} exists; pass --force to overwrite it")
    md = sys.stdin.read() if a.source == "-" else open(a.source, encoding="utf-8").read()
    try:
        info = build(md, a.output, a.paper, a.font, a.east_asian_font)
    except ValueError as e:
        p.error(str(e))
    print(f"Wrote {info['path']} ({info['paper'].upper()}, {info['font']}, East Asian font {info['east_asian_font']}).")
    print(f"Check it with: python3 {os.path.basename(__file__)} --check {info['path']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
