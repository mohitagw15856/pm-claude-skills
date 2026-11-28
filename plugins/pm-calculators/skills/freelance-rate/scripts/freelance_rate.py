#!/usr/bin/env python3
"""Freelance rate calculator for the freelance-rate skill.

Derives the day/hourly rate backwards from target income and honest
utilization — the arithmetic that explains why a freelance rate is not
salary/2000. Deterministic, stdlib only.

Usage
-----
    python3 freelance_rate.py --target 90000
    python3 freelance_rate.py --target 90000 --billable-pct 55 --overhead 14000 --json
"""
from __future__ import annotations
import argparse, json, sys

def main(argv=None):
    ap = argparse.ArgumentParser(description="Day/hourly rate derived from target income + honest utilization.")
    ap.add_argument("--target", type=float, required=True, help="Target pre-tax personal income")
    ap.add_argument("--overhead", type=float, default=12000, help="Annual business overhead: insurance, tools, accounting (default 12000)")
    ap.add_argument("--extra-tax-pct", type=float, default=8, help="Self-employment tax premium vs employment, pct of income (default 8; varies by jurisdiction)")
    ap.add_argument("--weeks-off", type=float, default=6, help="Vacation + sick + admin-only weeks (default 6)")
    ap.add_argument("--billable-pct", type=float, default=60, help="Pct of working time actually billable — sales, admin, dry spells eat the rest (default 60)")
    ap.add_argument("--hours-week", type=float, default=40)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)
    if a.target <= 0:
        raise ValueError('target must be > 0')
    if not (0 <= a.weeks_off < 52):
        raise ValueError('weeks_off must be in [0, 52)')
    if not (0 < a.billable_pct <= 100):
        raise ValueError('billable_pct must be in (0, 100]')
    if a.hours_week <= 0:
        raise ValueError('hours_week must be > 0')

    need = a.target * (1 + a.extra_tax_pct / 100) + a.overhead
    working_weeks = 52 - a.weeks_off
    billable_hours = working_weeks * a.hours_week * a.billable_pct / 100
    hourly = need / billable_hours
    day = hourly * 8
    naive = a.target / 2000
    out = {"required_revenue": round(need), "billable_hours_year": round(billable_hours),
           "hourly": round(hourly), "day_rate": round(day),
           "naive_salary_div_2000": round(naive),
           "multiplier_vs_naive": round(hourly / naive, 2),
           "assumptions": {"overhead": a.overhead, "extra_tax_pct": a.extra_tax_pct,
                            "weeks_off": a.weeks_off, "billable_pct": a.billable_pct}}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"required revenue: {need:,.0f}  (target {a.target:,.0f} + {a.extra_tax_pct:g}% tax premium + {a.overhead:,.0f} overhead)")
    print(f"billable hours:   {billable_hours:,.0f}  ({working_weeks:g} weeks x {a.hours_week:g}h x {a.billable_pct:g}% billable)")
    print(f"→ hourly: {hourly:,.0f}   day rate: {day:,.0f}")
    print(f"naive salary/2000 would say {naive:,.0f}/h — the honest rate is {hourly/naive:.1f}x that, and now you know exactly why.")
    print("note: the tax premium varies by jurisdiction — set --extra-tax-pct to yours; this is a model, not tax advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
