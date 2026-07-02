#!/usr/bin/env python3
"""xlsx_tool — create or fill .xlsx workbooks with ZERO dependencies (stdlib zip+XML).

An .xlsx file is a zip of XML parts; this tool writes them directly, so it works
anywhere Python does. Two modes:

  create — build a workbook from JSON:
      python3 xlsx_tool.py create out.xlsx --data '{"Sheet1": [["Item","Qty","Price"],["Widget",4,9.5]]}'
      python3 xlsx_tool.py create out.xlsx --data-file model.json

  fill — replace {{placeholders}} in an existing template workbook:
      python3 xlsx_tool.py fill template.xlsx out.xlsx --values '{"month":"July","revenue":21000}'

JSON for create: {sheetName: [[row cells...], ...]}. Cells: numbers stay numbers,
strings become shared strings, "=A1*B1" becomes a live formula.
Limits (honest): no styling/formats beyond defaults, no charts, fill-mode replaces
placeholders in string cells only. For rich formatting, use a real library.
"""
import argparse, json, re, sys, zipfile, shutil
from xml.sax.saxutils import escape

def col_letter(i):
    s = ""
    while True:
        s = chr(65 + i % 26) + s
        i = i // 26 - 1
        if i < 0: return s

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
{sheet_overrides}
<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

def create(out, data):
    sheets = list(data.items())
    strings, string_index = [], {}
    def sref(v):
        if v not in string_index:
            string_index[v] = len(strings); strings.append(v)
        return string_index[v]
    sheet_xmls = []
    for name, rows in sheets:
        cells_xml = []
        for r, row in enumerate(rows, 1):
            cs = []
            for c, v in enumerate(row):
                ref = f"{col_letter(c)}{r}"
                if isinstance(v, (int, float)) and not isinstance(v, bool):
                    cs.append(f'<c r="{ref}"><v>{v}</v></c>')
                elif isinstance(v, str) and v.startswith("="):
                    cs.append(f'<c r="{ref}"><f>{escape(v[1:])}</f></c>')
                elif v is None or v == "":
                    continue
                else:
                    cs.append(f'<c r="{ref}" t="s"><v>{sref(str(v))}</v></c>')
            cells_xml.append(f'<row r="{r}">{"".join(cs)}</row>')
        sheet_xmls.append(
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            f'<sheetData>{"".join(cells_xml)}</sheetData></worksheet>')
    wb_sheets = "".join(
        f'<sheet name="{escape(n)}" sheetId="{i+1}" r:id="rId{i+1}"/>' for i, (n, _) in enumerate(sheets))
    workbook = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<sheets>{wb_sheets}</sheets></workbook>')
    wb_rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + "".join(f'<Relationship Id="rId{i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i+1}.xml"/>' for i in range(len(sheets)))
        + f'<Relationship Id="rId{len(sheets)+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>'
        + '</Relationships>')
    shared = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="{len(strings)}" uniqueCount="{len(strings)}">'
        + "".join(f'<si><t xml:space="preserve">{escape(s)}</t></si>' for s in strings) + '</sst>')
    overrides = "".join(
        f'<Override PartName="/xl/worksheets/sheet{i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        for i in range(len(sheets)))
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CONTENT_TYPES.format(sheet_overrides=overrides))
        z.writestr("_rels/.rels", RELS)
        z.writestr("xl/workbook.xml", workbook)
        z.writestr("xl/_rels/workbook.xml.rels", wb_rels)
        z.writestr("xl/sharedStrings.xml", shared)
        for i, x in enumerate(sheet_xmls):
            z.writestr(f"xl/worksheets/sheet{i+1}.xml", x)
    print(f"wrote {out}: {len(sheets)} sheet(s), {sum(len(r) for _, r in sheets)} row(s)")

def fill(template, out, values):
    shutil.copyfile(template, out + ".tmp")
    replaced = 0
    with zipfile.ZipFile(template) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.namelist():
            data = zin.read(item)
            if item.endswith(".xml") and (item.startswith("xl/") or item == "xl/sharedStrings.xml"):
                text = data.decode("utf-8")
                for k, v in values.items():
                    token = "{{" + k + "}}"
                    if token in text:
                        replaced += text.count(token)
                        text = text.replace(token, escape(str(v)))
                data = text.encode("utf-8")
            zout.writestr(item, data)
    import os; os.remove(out + ".tmp")
    print(f"wrote {out}: {replaced} placeholder(s) filled")
    if replaced == 0:
        print("warning: no {{placeholders}} found — check the template", file=sys.stderr)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("create"); c.add_argument("out"); c.add_argument("--data"); c.add_argument("--data-file")
    f = sub.add_parser("fill"); f.add_argument("template"); f.add_argument("out"); f.add_argument("--values", required=True)
    a = ap.parse_args()
    if a.cmd == "create":
        data = json.loads(open(a.data_file).read() if a.data_file else a.data)
        create(a.out, data)
    else:
        fill(a.template, a.out, json.loads(a.values))

if __name__ == "__main__":
    main()
