#!/usr/bin/env python3
"""van_westendorp — Price Sensitivity Meter from survey data, computed not vibed.
Stdlib only. Takes the four classic answers per respondent, builds the cumulative
curves, finds the crossing points by linear interpolation, and writes a real .xlsx
with the curves and an elasticity-style revenue table with live formulas.

  python3 van_westendorp.py analyze out.xlsx --responses-file survey.json
  python3 van_westendorp.py analyze out.xlsx --responses '[{"too_cheap":5,"cheap":9,"expensive":18,"too_expensive":30}, ...]'

Each response: {"too_cheap": p, "cheap": p, "expensive": p, "too_expensive": p}.
Outputs: OPP (optimal price point: too_cheap × too_expensive crossing), IPP
(indifference: cheap × expensive), and the acceptable range (PMC..PME).
Honest limits: needs >=20 responses for stability (warns below), assumes rational
monotone answers (drops violators, reports how many), no segmentation — split the
input yourself to compare segments.
"""
import argparse, json, sys
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

def cumulative(prices, values, ascending):
    """% of respondents whose answer is <= p (ascending) or >= p (descending)."""
    n = len(values)
    out = []
    for p in prices:
        if ascending: out.append(sum(1 for v in values if v <= p) / n)
        else: out.append(sum(1 for v in values if v >= p) / n)
    return out

def crossing(prices, ya, yb):
    """Price where the curves cross. Strict sign change → linear interpolation.
    If they only meet along a plateau (curves touch zero without overlapping —
    common with narrow surveys), return the plateau midpoint."""
    eps = 1e-9
    for i in range(1, len(prices)):
        d0, d1 = ya[i-1] - yb[i-1], ya[i] - yb[i]
        if d0 * d1 < -eps:                       # strict crossing
            f = abs(d0) / (abs(d0) + abs(d1))
            return prices[i-1] + f * (prices[i] - prices[i-1])
    flat = [prices[i] for i in range(len(prices)) if abs(ya[i] - yb[i]) <= eps]
    if flat: return (flat[0] + flat[-1]) / 2     # plateau midpoint
    return None

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    z = sub.add_parser("analyze")
    z.add_argument("out")
    z.add_argument("--responses"); z.add_argument("--responses-file")
    a = ap.parse_args()
    rows = json.loads(open(a.responses_file).read() if a.responses_file else a.responses)

    keys = ("too_cheap", "cheap", "expensive", "too_expensive")
    clean, dropped = [], 0
    for r in rows:
        try:
            v = [float(r[k]) for k in keys]
            if v[0] <= v[1] <= v[2] <= v[3]: clean.append(v)
            else: dropped += 1
        except (KeyError, TypeError, ValueError): dropped += 1
    if len(clean) < 5: sys.exit(f"only {len(clean)} valid responses after dropping {dropped} — need at least 5")
    if len(clean) < 20: print(f"warning: {len(clean)} valid responses — VW is noisy below ~20", file=sys.stderr)

    tc, ch, ex, te = ([r[i] for r in clean] for i in range(4))
    lo, hi = min(tc), max(te)
    prices = [round(lo + (hi - lo) * i / 60, 2) for i in range(61)]
    # The four classic cumulative curves.
    c_tc = cumulative(prices, tc, ascending=False)   # "too cheap at or below"
    c_ch = cumulative(prices, ch, ascending=False)   # "cheap/bargain"
    c_ex = cumulative(prices, ex, ascending=True)    # "getting expensive"
    c_te = cumulative(prices, te, ascending=True)    # "too expensive"

    opp = crossing(prices, c_tc, c_te)   # optimal price point
    ipp = crossing(prices, c_ch, c_ex)   # indifference price point
    pmc = crossing(prices, c_tc, c_ex)   # lower bound of acceptable range
    pme = crossing(prices, c_ch, c_te)   # upper bound

    curves = [["Price", "% too cheap", "% cheap", "% expensive", "% too expensive"]]
    for i, p in enumerate(prices):
        curves.append([p, round(c_tc[i], 3), round(c_ch[i], 3), round(c_ex[i], 3), round(c_te[i], 3)])

    fmt = lambda v: round(v, 2) if v is not None else "no crossing (widen the survey range)"
    summary = [
        ["Van Westendorp Price Sensitivity Meter", ""],
        ["Valid responses", len(clean)],
        ["Dropped (non-monotone/invalid)", dropped],
        ["", ""],
        ["OPP — optimal price point", fmt(opp)],
        ["IPP — indifference price point", fmt(ipp)],
        ["PMC — range floor (cheaper reads suspicious)", fmt(pmc)],
        ["PME — range ceiling (dearer reads expensive)", fmt(pme)],
        ["", ""],
        ["Revenue what-if (live formulas)", ""],
        ["Candidate price (EDIT ME)", round(opp or ipp or (lo + hi) / 2, 2)],
        ["Est. buyers @1000 prospects (linear within range)", "=ROUND(1000*MAX(0,MIN(1,(B8-B11)/MAX(0.01,B8-B7))),0)"],
        ["Est. revenue", "=B11*B12"],
        ["", ""],
        ["Read: price INSIDE PMC-PME; OPP minimises resistance, not maximises revenue.", ""],
    ]
    write_xlsx(a.out, {"Summary": summary, "Curves": curves})
    print(f"wrote {a.out}: n={len(clean)} OPP={fmt(opp)} IPP={fmt(ipp)} range={fmt(pmc)}–{fmt(pme)} dropped={dropped}")

if __name__ == "__main__":
    main()
