#!/usr/bin/env python3
"""Solar breakeven calculator for the solar-breakeven skill.

Cumulative savings vs net system cost year by year: bill offset, electricity
price inflation, panel degradation, and an inverter replacement — reports the
breakeven year. Deterministic, stdlib only.

Usage
-----
    python3 solar_breakeven.py --cost 22000 --incentive 6600 --bill 190
    python3 solar_breakeven.py --cost 22000 --incentive 6600 --bill 190 --offset 90 --json
"""
from __future__ import annotations
import argparse, json, sys

def main(argv=None):
    ap = argparse.ArgumentParser(description="Solar panels: breakeven year from bill offset vs net cost.")
    ap.add_argument("--cost", type=float, required=True, help="Installed system cost before incentives")
    ap.add_argument("--incentive", type=float, default=0, help="Tax credits/rebates (verify eligibility; default 0)")
    ap.add_argument("--bill", type=float, required=True, help="Current monthly electric bill")
    ap.add_argument("--offset", type=float, default=85, help="Pct of bill the system offsets year one (default 85)")
    ap.add_argument("--elec-inflation", type=float, default=3.0, help="Electricity price growth pct/yr (default 3)")
    ap.add_argument("--degradation", type=float, default=0.5, help="Panel output loss pct/yr (default 0.5)")
    ap.add_argument("--inverter-cost", type=float, default=2000, help="Inverter replacement cost (default 2000)")
    ap.add_argument("--inverter-year", type=int, default=12, help="Year the inverter is replaced (default 12)")
    ap.add_argument("--horizon", type=int, default=25, help="Years (default 25, typical warranty life)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    net_cost = a.cost - a.incentive
    rows, cum, breakeven = [], 0.0, None
    for y in range(1, a.horizon + 1):
        bill_yr = a.bill * 12 * (1 + a.elec_inflation / 100) ** (y - 1)
        offset_frac = a.offset / 100 * (1 - a.degradation / 100) ** (y - 1)
        saved = bill_yr * offset_frac
        cum += saved
        if y == a.inverter_year:
            cum -= a.inverter_cost
        rows.append({"year": y, "saved": round(saved), "cumulative": round(cum),
                     "vs_cost": round(cum - net_cost)})
        if breakeven is None and cum >= net_cost:
            breakeven = y
    out = {"net_cost": round(net_cost), "breakeven_year": breakeven,
           "cumulative_at_horizon": round(cum), "net_gain_at_horizon": round(cum - net_cost),
           "assumptions": {"offset_pct": a.offset, "elec_inflation": a.elec_inflation,
                            "degradation": a.degradation, "inverter": f"{a.inverter_cost:g} at year {a.inverter_year}"},
           "not_modeled": ["financing interest if the system is loaned (add via loan calc)",
                            "net-metering policy changes (the big regulatory risk - jurisdiction-specific)",
                            "roof repairs forced by/under panels", "home-value effects"]}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"net cost after incentives: {net_cost:,.0f} (incentive {a.incentive:,.0f} — verify eligibility)")
    print("year    saved    cumulative    vs cost")
    for r in rows[:a.horizon]:
        if r["year"] <= 5 or r["year"] % 5 == 0 or r["year"] == breakeven:
            print(f"{r['year']:>4} {r['saved']:>8,} {r['cumulative']:>13,} {r['vs_cost']:>10,}")
    print(f"breakeven: {'year ' + str(breakeven) if breakeven else 'not within horizon'} · net gain at year {a.horizon}: {cum - net_cost:,.0f}")
    print("not modeled: financing interest, net-metering policy risk, roof interactions. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
