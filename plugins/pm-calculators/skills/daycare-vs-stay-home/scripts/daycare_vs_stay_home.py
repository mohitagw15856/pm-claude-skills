#!/usr/bin/env python3
"""Daycare vs stay-home calculator for the daycare-vs-stay-home skill.

Computes what the second income actually nets after childcare, marginal
taxes, and work costs — and what staying home costs in salary trajectory
over the childcare years. Both sides of the math, no verdict. Deterministic,
stdlib only.

Usage
-----
    python3 daycare_vs_stay_home.py --income 62000 --daycare 1600
    python3 daycare_vs_stay_home.py --income 62000 --daycare 1600 --kids 2 \
        --marginal-tax 28 --work-costs 350 --years-out 4 --json
"""
from __future__ import annotations
import argparse, json, sys

def main(argv=None):
    ap = argparse.ArgumentParser(description="Second income net of childcare/taxes/work costs, and the stay-home trajectory cost.")
    ap.add_argument("--income", type=float, required=True, help="Second earner's gross annual income")
    ap.add_argument("--daycare", type=float, required=True, help="Daycare cost per child per MONTH")
    ap.add_argument("--kids", type=int, default=1, help="Children in care (default 1)")
    ap.add_argument("--marginal-tax", type=float, default=25,
                    help="Marginal tax pct on the second income — marginal, not average (default 25; verify yours)")
    ap.add_argument("--work-costs", type=float, default=250, help="Monthly commute/clothes/convenience costs of working (default 250)")
    ap.add_argument("--retirement-match-pct", type=float, default=3, help="Employer match lost if not working, pct of income (default 3)")
    ap.add_argument("--years-out", type=int, default=5, help="Years out of workforce in the stay-home scenario (default 5)")
    ap.add_argument("--raise-pct", type=float, default=3, help="Annual raise pct while working (default 3)")
    ap.add_argument("--reentry-penalty-pct", type=float, default=10,
                    help="Salary cut vs. never-left trajectory on re-entry, pct (default 10; research varies widely)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    care_yr = a.daycare * 12 * a.kids
    tax = a.income * a.marginal_tax / 100
    work = a.work_costs * 12
    match = a.income * a.retirement_match_pct / 100
    net = a.income - tax - care_yr - work + match
    hourly = net / 2000

    stayed = a.income * (1 + a.raise_pct / 100) ** a.years_out
    reentry = stayed * (1 - a.reentry_penalty_pct / 100)
    lost_earnings = sum(a.income * (1 + a.raise_pct / 100) ** y for y in range(a.years_out)) \
                    - 0  # stay-home earns 0 in the window
    trajectory_gap_yr = stayed - reentry

    out = {"working": {"gross": a.income, "tax": round(tax), "childcare": round(care_yr),
                        "work_costs": work, "match_kept": round(match), "net": round(net),
                        "net_hourly_2000h": round(hourly, 2)},
           "stay_home": {"years_out": a.years_out, "gross_earnings_forgone": round(lost_earnings),
                          "salary_if_never_left": round(stayed), "salary_at_reentry": round(reentry),
                          "trajectory_gap_per_year_after": round(trajectory_gap_yr)},
           "note": "childcare is temporary; trajectory effects compound — compare horizons, not just this year",
           "not_modeled": ["tax credits/subsidies for childcare (jurisdiction-specific — often large)",
                            "benefits/health insurance tied to the job", "the non-financials, which are allowed to win"]}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    w = out["working"]
    print(f"working: {a.income:,.0f} gross - {w['tax']:,} marginal tax - {w['childcare']:,} childcare({a.kids}) - {work:,} work costs + {w['match_kept']:,} match")
    print(f"       = {w['net']:,} net/year ({w['net_hourly_2000h']:,.2f}/hr effective)")
    s = out["stay_home"]
    print(f"stay-home for {a.years_out} yrs: forgoes {s['gross_earnings_forgone']:,} gross; re-entry salary ~{s['salary_at_reentry']:,} vs {s['salary_if_never_left']:,} never-left ({trajectory_gap_yr:,.0f}/yr gap, compounding)")
    print("childcare is temporary; trajectory effects compound — the honest comparison is over horizons, not this year's net.")
    print("not modeled: childcare tax credits (often large — check yours), job-tied benefits, the non-financials. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
