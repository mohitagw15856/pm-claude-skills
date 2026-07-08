#!/usr/bin/env python3
"""erlang_staffing — how many agents does the queue actually need? Erlang C, computed.
Stdlib only. Given arrival rate, handle time, and a service-level target, computes the
agent count (with shrinkage), occupancy, and average wait — the math behind every
serious support/CS staffing plan, instead of "tickets per agent" folklore.

  python3 erlang_staffing.py plan out.xlsx --arrivals 120 --aht 6 --sla 0.8 --answer-in 60
  python3 erlang_staffing.py plan out.xlsx --arrivals 120 --aht 6 --sla 0.8 --answer-in 60 --shrinkage 0.3 --scenarios 0.8,1.0,1.3

--arrivals per hour · --aht minutes · --answer-in seconds · shrinkage = fraction of paid
time agents are NOT available (meetings, breaks, training; 0.3 is a common reality).
Honest limits: assumes Poisson arrivals and exponential handle times (M/M/c) — real
queues are burstier, so treat the answer as the floor, not the ceiling.
"""
import argparse, math, sys
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

def erlang_c(traffic, n):
    """P(wait) for offered load `traffic` (Erlangs) and n agents."""
    if n <= traffic: return 1.0
    s = sum((traffic ** k) / math.factorial(k) for k in range(n))
    top = (traffic ** n) / math.factorial(n) * (n / (n - traffic))
    return top / (s + top)

def solve(arrivals_hr, aht_min, sla, answer_s, shrinkage):
    lam = arrivals_hr / 3600.0                 # per second
    mu = 1.0 / (aht_min * 60.0)                # per second
    traffic = lam / mu                          # Erlangs
    n = max(1, int(math.ceil(traffic)))
    while n < traffic + 200:
        pw = erlang_c(traffic, n)
        sl = 1 - pw * math.exp(-(n * mu - lam) * answer_s)
        if sl >= sla:
            asa = pw / (n * mu - lam)
            occ = traffic / n
            rostered = math.ceil(n / (1 - shrinkage))
            return {"agents_on_queue": n, "rostered": rostered, "service_level": round(sl, 4),
                    "asa_seconds": round(asa, 1), "occupancy": round(occ, 3), "erlangs": round(traffic, 2)}
        n += 1
    sys.exit("no feasible staffing under 200+ agents — check the inputs")

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("plan")
    p.add_argument("out")
    p.add_argument("--arrivals", type=float, required=True, help="contacts per hour")
    p.add_argument("--aht", type=float, required=True, help="average handle time, minutes")
    p.add_argument("--sla", type=float, default=0.8, help="target fraction answered in time (default 0.8)")
    p.add_argument("--answer-in", type=float, default=60, help="answer window, seconds (default 60)")
    p.add_argument("--shrinkage", type=float, default=0.3)
    p.add_argument("--scenarios", default="0.8,1.0,1.25,1.5", help="load multipliers")
    a = ap.parse_args()

    rows = [["Load ×", "Contacts/hr", "Erlangs", "Agents on queue", "Rostered (shrinkage)", "Service level", "ASA (s)", "Occupancy"]]
    base = None
    for m in [float(x) for x in a.scenarios.split(",")]:
        r = solve(a.arrivals * m, a.aht, a.sla, a.answer_in, a.shrinkage)
        if m == 1.0: base = r
        rows.append([m, round(a.arrivals * m, 1), r["erlangs"], r["agents_on_queue"], r["rostered"], r["service_level"], r["asa_seconds"], r["occupancy"]])
    base = base or solve(a.arrivals, a.aht, a.sla, a.answer_in, a.shrinkage)
    assumptions = [
        ["Support Staffing Model (Erlang C / M/M/c)", ""],
        ["Contacts per hour (EDIT ME)", a.arrivals],
        ["AHT minutes (EDIT ME)", a.aht],
        ["SLA target", a.sla],
        ["Answer window (s)", a.answer_in],
        ["Shrinkage", a.shrinkage],
        ["", ""],
        ["Base case rostered agents", base["rostered"]],
        ["Naive 'tickets/agent' staffing (live formula)", "=ROUND(B2*B3/60,1)"],
        ["", ""],
        ["Read: occupancy > 0.9 burns the team even when SLA holds — staff for the humans, not just the queue.", ""],
    ]
    write_xlsx(a.out, {"Assumptions": assumptions, "Scenarios": rows})
    print(f"wrote {a.out}: base {base['agents_on_queue']} on-queue / {base['rostered']} rostered · SL {base['service_level']:.0%} · ASA {base['asa_seconds']}s · occ {base['occupancy']:.0%}")

if __name__ == "__main__":
    main()
