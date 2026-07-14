#!/usr/bin/env python3
"""FIRE number calculator for the fire-number skill.

Computes the financial-independence target (annual spend / withdrawal rate),
years to reach it at a given real return, and a sensitivity table across
return and withdrawal-rate assumptions — because the honest answer is a
surface, not a number. Pure Python standard library — no dependencies,
no network access.

Model (say these out loud)
--------------------------
- Deterministic compound growth at a constant REAL return (inflation already
  removed). Real markets deliver returns in the wrong order sometimes:
  sequence-of-returns risk is not modeled and matters most near the finish.
- The withdrawal rate is an assumption (4% is a historical US study, not a
  law of nature).
- Monthly compounding, contributions at month end. Taxes not modeled.

Usage
-----
    python3 fire_number.py --savings 120000 --monthly 3000 --spend 60000
    python3 fire_number.py --savings 120000 --monthly 3000 --spend 60000 --return 5 --wr 4 --json
"""
from __future__ import annotations

import argparse
import json
import sys


def years_to_target(savings, monthly, annual_return_pct, target, max_years=100):
    r = annual_return_pct / 100.0 / 12.0
    bal = savings
    months = 0
    while bal < target and months < max_years * 12:
        bal = bal * (1 + r) + monthly
        months += 1
    return round(months / 12.0, 1) if bal >= target else None


def main(argv=None):
    ap = argparse.ArgumentParser(description="FIRE number + years-to-target with a sensitivity table.")
    ap.add_argument("--savings", type=float, required=True, help="Current invested savings")
    ap.add_argument("--monthly", type=float, required=True, help="Monthly contribution")
    ap.add_argument("--spend", type=float, required=True, help="Target annual spend in retirement (today's dollars)")
    ap.add_argument("--return", dest="ret", type=float, default=5.0, help="Expected REAL annual return, pct (default 5)")
    ap.add_argument("--wr", type=float, default=4.0, help="Withdrawal rate, pct (default 4)")
    ap.add_argument("--json", action="store_true", help="JSON output")
    a = ap.parse_args(argv)
    if a.wr <= 0 or a.spend <= 0:
        ap.error("--spend and --wr must be positive")
    fire = a.spend / (a.wr / 100.0)
    base_years = years_to_target(a.savings, a.monthly, a.ret, fire)
    rets = [3.0, 5.0, 7.0]
    wrs = [3.0, 3.5, 4.0]
    grid = []
    for wr in wrs:
        tgt = a.spend / (wr / 100.0)
        row = {"wr": wr, "target": round(tgt, 2)}
        for r in rets:
            y = years_to_target(a.savings, a.monthly, r, tgt)
            row[f"y_at_{r:g}pct"] = y
        grid.append(row)
    out = {"fire_number": round(fire, 2), "assumed_real_return_pct": a.ret,
           "assumed_withdrawal_rate_pct": a.wr, "years_to_fire": base_years,
           "sensitivity": grid,
           "not_modeled": ["sequence-of-returns risk", "taxes", "variable spending"]}
    if a.json:
        print(json.dumps(out, indent=2))
        return 0
    print(f"FIRE number: {fire:,.0f}  (spend {a.spend:,.0f} / {a.wr:g}% withdrawal — an assumption, not a law)")
    if base_years is not None:
        print(f"years to reach at {a.ret:g}% real return: {base_years}")
    else:
        print(f"years to reach at {a.ret:g}% real return: not within 100 years")
    print("sensitivity (years to target):")
    print("wr \\ return".rjust(14) + "".join(f"{r:g}%".rjust(10) for r in rets))
    for row in grid:
        cells = "".join((f"{row[f'y_at_{r:g}pct']}" if row[f"y_at_{r:g}pct"] is not None else ">100").rjust(10) for r in rets)
        print(f"{row['wr']:g}% ({row['target']:,.0f})".rjust(14) + cells)
    print("not modeled: sequence-of-returns risk, taxes, variable spending — this is a model, not a plan.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
