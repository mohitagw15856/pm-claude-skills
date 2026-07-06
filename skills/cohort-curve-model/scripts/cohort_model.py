#!/usr/bin/env python3
"""cohort_model — fit a retention curve to observed cohort data and project LTV.
Stdlib only. The math runs here (deterministic, checkable); the model lands as a
real .xlsx with live formulas so finance can change ARPU/discount and watch LTV move.

  python3 cohort_model.py fit out.xlsx --observed '[100,62,48,41,37,34]'
  python3 cohort_model.py fit out.xlsx --observed-file retention.json --arpu 40 --horizon 36

--observed: retention by period, percent or fraction, period 0 first (period 0 is
normalised to 100%). Fits a power curve r(t)=a*t^-b on periods >=1 (log-log least
squares — the standard shape for consumer retention) and reports R^2, the implied
retention floor, and cumulative lifetime periods. Honest limits: one curve family,
no confidence intervals, needs >=4 observed periods to say anything.
"""
import argparse, json, math, sys
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

def fit_power(obs):
    """obs: [r0, r1, ...] fractions. Fit r(t)=a*t^-b on t>=1 via log-log OLS."""
    pts = [(t, r) for t, r in enumerate(obs) if t >= 1 and r > 0]
    if len(pts) < 3:
        sys.exit("need at least 4 observed periods (period 0 + 3 more) with retention > 0")
    xs = [math.log(t) for t, _ in pts]
    ys = [math.log(r) for _, r in pts]
    n = len(pts)
    mx, my = sum(xs) / n, sum(ys) / n
    sxx = sum((x - mx) ** 2 for x in xs)
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    slope = sxy / sxx if sxx else 0.0
    intercept = my - slope * mx
    a, b = math.exp(intercept), -slope
    ss_res = sum((y - (intercept + slope * x)) ** 2 for x, y in zip(xs, ys))
    ss_tot = sum((y - my) ** 2 for y in ys)
    r2 = 1 - ss_res / ss_tot if ss_tot else 1.0
    return a, b, r2

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    f = sub.add_parser("fit")
    f.add_argument("out")
    f.add_argument("--observed", help="JSON array of retention by period (percent or fraction)")
    f.add_argument("--observed-file")
    f.add_argument("--arpu", type=float, default=0.0, help="revenue per retained user per period (0 = LTV sheet in multiples)")
    f.add_argument("--horizon", type=int, default=24, help="periods to project (default 24)")
    a = ap.parse_args()

    raw = json.loads(open(a.observed_file).read() if a.observed_file else a.observed)
    obs = [float(x) for x in raw]
    if max(obs) > 1.5: obs = [x / 100.0 for x in obs]          # percents → fractions
    if obs[0] != 0: obs = [x / obs[0] for x in obs]            # normalise period 0 to 1.0

    A, B, r2 = fit_power(obs)
    fitted = [1.0] + [min(1.0, A * t ** -B) for t in range(1, a.horizon + 1)]
    floor = sum(obs[-3:]) / min(3, len(obs)) if len(obs) >= 3 else obs[-1]
    lifetime_periods = sum(fitted)

    # Curve sheet: observed vs fitted, then pure projection.
    curve = [["Period", "Observed", "Fitted r(t)=a*t^-b", "Note"]]
    for t in range(a.horizon + 1):
        o = round(obs[t], 4) if t < len(obs) else ""
        curve.append([t, o, round(fitted[t], 4), "" if t < len(obs) else "projected"])

    # Model sheet: parameters + LIVE formulas (edit ARPU in B6, LTV recalculates).
    model = [
        ["Cohort curve model", ""],
        ["a (scale)", round(A, 4)],
        ["b (decay)", round(B, 4)],
        ["R² (log-log fit)", round(r2, 4)],
        ["Observed tail floor (last 3 avg)", round(floor, 4)],
        ["ARPU per period (EDIT ME)", a.arpu if a.arpu else 1.0],
        ["Lifetime periods (Σ fitted, %d p)" % a.horizon, round(lifetime_periods, 3)],
        ["LTV per acquired user", "=B6*B7"],
        ["", ""],
        ["Read: b < 0.5 = strong flattening (habit); b > 1 = leaky bucket.", ""],
        ["R² < 0.9 → the power family fits poorly; trust the observed tail over the projection.", ""],
    ]
    write_xlsx(a.out, {"Model": model, "Curve": curve})
    print(f"wrote {a.out}: a={A:.3f} b={B:.3f} R²={r2:.3f} lifetime≈{lifetime_periods:.2f} periods"
          + (f" LTV≈{a.arpu * lifetime_periods:,.2f}" if a.arpu else ""))

if __name__ == "__main__":
    main()
