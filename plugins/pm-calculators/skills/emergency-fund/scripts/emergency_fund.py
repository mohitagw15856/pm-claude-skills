#!/usr/bin/env python3
"""Emergency fund calculator for the emergency-fund skill.

Sizes the target from essential (not total) monthly spend and risk factors,
then computes the funding timeline. Deterministic, stdlib only.

Usage
-----
    python3 emergency_fund.py --essentials 3400 --saved 4000 --monthly-save 500
    python3 emergency_fund.py --essentials 3400 --saved 4000 --monthly-save 500 \
        --single-income --variable-income --json
"""
from __future__ import annotations
import argparse, json, sys

def main(argv=None):
    ap = argparse.ArgumentParser(description="Emergency fund target from essential spend + risk factors.")
    ap.add_argument("--essentials", type=float, required=True,
                    help="Monthly ESSENTIAL spend: housing, food, insurance, minimum debt payments, utilities")
    ap.add_argument("--saved", type=float, default=0, help="Current liquid emergency savings (default 0)")
    ap.add_argument("--monthly-save", type=float, default=0, help="Monthly amount going to the fund (default 0)")
    ap.add_argument("--single-income", action="store_true", help="Household has one income (+1 month)")
    ap.add_argument("--variable-income", action="store_true", help="Freelance/commission/seasonal (+2 months)")
    ap.add_argument("--dependents", action="store_true", help="Kids or others depend on this income (+1 month)")
    ap.add_argument("--niche-job", action="store_true", help="Specialized role / thin job market (+1 month)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    months = 3.0
    factors = []
    for flag, add, label in ((a.single_income, 1, "single income"), (a.variable_income, 2, "variable income"),
                             (a.dependents, 1, "dependents"), (a.niche_job, 1, "niche job market")):
        if flag:
            months += add
            factors.append(f"{label} (+{add})")
    target = a.essentials * months
    gap = max(0.0, target - a.saved)
    months_to_fund = None if a.monthly_save <= 0 else gap / a.monthly_save
    covered_now = a.saved / a.essentials if a.essentials else 0
    out = {"target_months": months, "risk_factors": factors, "target": round(target),
           "saved": a.saved, "gap": round(gap),
           "months_covered_today": round(covered_now, 1),
           "months_to_full": None if months_to_fund is None else round(months_to_fund, 1)}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"target: {months:g} months of essentials = {target:,.0f}" +
          (f"   (base 3 + {', '.join(factors)})" if factors else "   (base 3, no risk adders)"))
    print(f"today:  {a.saved:,.0f} saved = {covered_now:.1f} months covered · gap: {gap:,.0f}")
    if gap == 0:
        print("fully funded — anything beyond this is investing money wearing a savings label.")
    elif months_to_fund is not None:
        print(f"at {a.monthly_save:,.0f}/mo the fund is full in {months_to_fund:.1f} months.")
    else:
        print("set --monthly-save to get the funding timeline.")
    print("sized on essential spend, not total spend — an emergency budget already cancels the extras. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
