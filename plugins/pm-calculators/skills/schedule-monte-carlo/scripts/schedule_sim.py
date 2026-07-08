#!/usr/bin/env python3
"""schedule_sim — project completion as a distribution, not a date. Stdlib only.
Three-point task estimates + dependencies → Monte Carlo over the DAG → P10/P50/P90
completion, per-task criticality (how often each task sits on the critical path),
and a real .xlsx. Deterministic with --seed.

  python3 schedule_sim.py run out.xlsx --tasks tasks.json [--sims 5000] [--seed 7]

tasks.json: [{"name":"design","optimistic":3,"likely":5,"pessimistic":10,"depends":[]},
             {"name":"build","optimistic":8,"likely":13,"pessimistic":25,"depends":["design"]}, …]
Units are whatever you estimate in (days/weeks). Sampling: PERT-beta approximated by
a triangular distribution (honest, simple, close enough at plan resolution).
Honest limits: no resource contention, no calendar effects — real schedules are worse.
"""
import argparse, json, random, sys
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

def toposort(tasks):
    by = {t["name"]: t for t in tasks}
    seen, order, mark = set(), [], set()
    def visit(n):
        if n in seen: return
        if n in mark: sys.exit(f"dependency cycle at '{n}'")
        mark.add(n)
        for d in by[n].get("depends", []):
            if d not in by: sys.exit(f"'{n}' depends on unknown task '{d}'")
            visit(d)
        mark.discard(n); seen.add(n); order.append(n)
    for t in tasks: visit(t["name"])
    return order, by

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run")
    r.add_argument("out"); r.add_argument("--tasks", required=True)
    r.add_argument("--sims", type=int, default=5000); r.add_argument("--seed", type=int, default=7)
    a = ap.parse_args()
    tasks = json.load(open(a.tasks))
    order, by = toposort(tasks)
    rng = random.Random(a.seed)
    finishes, crit = [], {t["name"]: 0 for t in tasks}
    for _ in range(a.sims):
        end, parent = {}, {}
        for n in order:
            t = by[n]
            dur = rng.triangular(t["optimistic"], t["pessimistic"], t["likely"])
            start = 0.0; p = None
            for d in t.get("depends", []):
                if end[d] > start: start, p = end[d], d
            end[n] = start + dur; parent[n] = p
        # walk back the critical path from the last-finishing task
        last = max(end, key=end.get)
        finishes.append(end[last])
        n = last
        while n is not None:
            crit[n] += 1; n = parent[n]
    finishes.sort()
    q = lambda p: finishes[min(len(finishes) - 1, int(p * len(finishes)))]
    p10, p50, p90 = q(0.10), q(0.50), q(0.90)
    det = deterministic_finish(tasks)
    rows = [["Task", "Optimistic", "Likely", "Pessimistic", "Criticality (share of sims on critical path)"]]
    for t in tasks:
        rows.append([t["name"], t["optimistic"], t["likely"], t["pessimistic"], round(crit[t["name"]] / a.sims, 3)])
    summary = [
        ["Schedule Monte Carlo", ""],
        ["Tasks", len(tasks)], ["Simulations", a.sims], ["Seed", a.seed],
        ["", ""],
        ["Deterministic finish (all 'likely')", round(det, 1)],
        ["P10 (lucky)", round(p10, 1)], ["P50 (median)", round(p50, 1)], ["P90 (plan to this)", round(p90, 1)],
        ["", ""],
        ["Read: promise P50 internally, P90 externally. The gap between them is your honesty budget.", ""],
    ]
    write_xlsx(a.out, {"Summary": summary, "Tasks": rows})
    print(f"wrote {a.out}: deterministic={det:.1f} P10={p10:.1f} P50={p50:.1f} P90={p90:.1f} · top critical: " +
          ", ".join(sorted(crit, key=crit.get, reverse=True)[:3]))

def deterministic_finish(tasks):
    order, by = toposort(tasks)
    end = {}
    for n in order:
        t = by[n]
        start = max([end[d] for d in t.get("depends", [])] or [0.0])
        end[n] = start + t["likely"]
    return max(end.values())

if __name__ == "__main__":
    main()
