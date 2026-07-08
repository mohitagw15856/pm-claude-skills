#!/usr/bin/env python3
"""tornado — which assumption actually moves the answer? One-at-a-time sensitivity.
Stdlib only. Give it a model (a formula over named drivers) and low/base/high for each
driver; it swings them one at a time and ranks by impact — the tornado diagram's data,
plus a real .xlsx. The chart that ends 'but what if CAC is higher' meetings.

  python3 tornado.py run out.xlsx --model model.json

model.json:
  {"output": "LTV/CAC ratio",
   "formula": "(arpu * margin * lifetime) / cac",
   "drivers": [
     {"name":"arpu","low":30,"base":40,"high":55},
     {"name":"margin","low":0.6,"base":0.72,"high":0.8},
     {"name":"lifetime","low":14,"base":20,"high":30},
     {"name":"cac","low":300,"base":420,"high":650}]}

The formula is evaluated with ONLY the driver names and +-*/(), min, max, abs — no other
Python. Honest limits: one-at-a-time ignores interactions; if two drivers move together
in your world, model the pair as one driver.
"""
import argparse, json, math, re, sys
# ── xlsx writer (stdlib zip+XML — same approach as the excel-model skill) ─────
import zipfile
from xml.sax.saxutils import escape

def _col(i):
    s = ""
    while True:
        s = chr(65 + i % 26) + s
        i = i // 26 - 1
        if i < 0: return s

def write_xlsx(out, data):
    """data: {sheetName: [[cells...], ...]}. Numbers stay numbers; '=...' becomes a live formula."""
    sheets = list(data.items())
    strings, sidx = [], {}
    def sref(v):
        if v not in sidx: sidx[v] = len(strings); strings.append(v)
        return sidx[v]
    sheet_xmls = []
    for name, rows in sheets:
        cells = []
        for r, row in enumerate(rows, 1):
            cs = []
            for c, v in enumerate(row):
                ref = f"{_col(c)}{r}"
                if isinstance(v, (int, float)) and not isinstance(v, bool):
                    cs.append(f'<c r="{ref}"><v>{v}</v></c>')
                elif isinstance(v, str) and v.startswith("="):
                    cs.append(f'<c r="{ref}"><f>{escape(v[1:])}</f></c>')
                elif v is None or v == "":
                    continue
                else:
                    cs.append(f'<c r="{ref}" t="s"><v>{sref(str(v))}</v></c>')
            cells.append(f'<row r="{r}">{"".join(cs)}</row>')
        sheet_xmls.append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            f'<sheetData>{"".join(cells)}</sheetData></worksheet>')
    wb = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'
        + "".join(f'<sheet name="{escape(n)}" sheetId="{i+1}" r:id="rId{i+1}"/>' for i, (n, _) in enumerate(sheets))
        + '</sheets></workbook>')
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + "".join(f'<Relationship Id="rId{i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i+1}.xml"/>' for i in range(len(sheets)))
        + f'<Relationship Id="rId{len(sheets)+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>')
    shared = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="{len(strings)}" uniqueCount="{len(strings)}">'
        + "".join(f'<si><t xml:space="preserve">{escape(s)}</t></si>' for s in strings) + '</sst>')
    ct = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        + "".join(f'<Override PartName="/xl/worksheets/sheet{i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' for i in range(len(sheets)))
        + '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/></Types>')
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ct)
        z.writestr("_rels/.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')
        z.writestr("xl/workbook.xml", wb)
        z.writestr("xl/_rels/workbook.xml.rels", rels)
        z.writestr("xl/sharedStrings.xml", shared)
        for i, x in enumerate(sheet_xmls):
            z.writestr(f"xl/worksheets/sheet{i+1}.xml", x)

SAFE = {"min": min, "max": max, "abs": abs, "sqrt": math.sqrt, "log": math.log, "exp": math.exp}

def evaluate(formula, values):
    if re.search(r"[^\w\s+\-*/().,]", formula): sys.exit("formula contains characters outside the safe set")
    names = set(re.findall(r"[A-Za-z_]\w*", formula))
    unknown = names - set(values) - set(SAFE)
    if unknown: sys.exit(f"formula uses unknown names: {sorted(unknown)}")
    return eval(formula, {"__builtins__": {}}, {**SAFE, **values})   # restricted: drivers + 6 math fns only

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run"); r.add_argument("out"); r.add_argument("--model", required=True)
    a = ap.parse_args()
    m = json.load(open(a.model))
    drivers = m["drivers"]
    base_vals = {d["name"]: d["base"] for d in drivers}
    base = evaluate(m["formula"], base_vals)
    rows = []
    for d in drivers:
        lo = evaluate(m["formula"], {**base_vals, d["name"]: d["low"]})
        hi = evaluate(m["formula"], {**base_vals, d["name"]: d["high"]})
        rows.append({"name": d["name"], "low_out": lo, "high_out": hi,
                     "swing": abs(hi - lo), "low_in": d["low"], "base_in": d["base"], "high_in": d["high"]})
    rows.sort(key=lambda x: -x["swing"])
    total = sum(r["swing"] for r in rows) or 1
    table = [["Driver", "Input low→base→high", "Output at low", "Output at high", "Swing", "Share of total swing"]]
    for r in rows:
        table.append([r["name"], f'{r["low_in"]} → {r["base_in"]} → {r["high_in"]}',
                      round(r["low_out"], 3), round(r["high_out"], 3), round(r["swing"], 3), round(r["swing"] / total, 3)])
    summary = [
        [f'Tornado — {m.get("output", "output")}', ""],
        ["Base case", round(base, 4)],
        ["Formula", m["formula"]],
        ["", ""],
        ["Read: the top bar is where diligence belongs; arguing about the bottom two bars is procrastination with spreadsheets.", ""],
    ]
    write_xlsx(a.out, {"Summary": summary, "Tornado": table})
    top = rows[0]
    print(f"wrote {a.out}: base={base:.3f} · top driver: {top['name']} (swing {top['swing']:.3f}, {top['swing']/total:.0%} of total)")

if __name__ == "__main__":
    main()
