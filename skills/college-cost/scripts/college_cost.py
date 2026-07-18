#!/usr/bin/env python3
"""College cost calculator for the college-cost skill.

The real all-in number: sticker minus aid, inflated per year, split into
cash vs loans — then what the loans cost monthly and in total after
graduation. Deterministic, stdlib only.

Usage
-----
    python3 college_cost.py --sticker 32000 --aid 14000
    python3 college_cost.py --sticker 32000 --aid 14000 --years 4 --loan-share 60 --loan-apr 6.5 --json
"""
from __future__ import annotations
import argparse, json, sys

def payment(p, annual_pct, months):
    r = annual_pct / 100 / 12
    return p / months if r == 0 else p * r / (1 - (1 + r) ** -months)

def main(argv=None):
    ap = argparse.ArgumentParser(description="All-in college cost + the loan's monthly tail.")
    ap.add_argument("--sticker", type=float, required=True, help="Published annual cost of attendance (tuition+room+board+fees)")
    ap.add_argument("--aid", type=float, default=0, help="Annual grants/scholarships — money that is NOT repaid (default 0)")
    ap.add_argument("--cost-inflation", type=float, default=4.0, help="Annual cost growth pct (default 4)")
    ap.add_argument("--years", type=int, default=4)
    ap.add_argument("--loan-share", type=float, default=50, help="Pct of net cost covered by loans (default 50)")
    ap.add_argument("--loan-apr", type=float, default=6.5, help="Loan APR pct (default 6.5)")
    ap.add_argument("--loan-term", type=int, default=10, help="Repayment years (default 10)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    rows, net_total = [], 0.0
    for y in range(a.years):
        gross = a.sticker * (1 + a.cost_inflation / 100) ** y
        net = max(0.0, gross - a.aid)
        net_total += net
        rows.append({"year": y + 1, "gross": round(gross), "net_after_aid": round(net)})
    borrowed = net_total * a.loan_share / 100
    cash = net_total - borrowed
    mo = payment(borrowed, a.loan_apr, a.loan_term * 12)
    repaid = mo * a.loan_term * 12
    out = {"years": rows, "net_total": round(net_total), "cash_portion": round(cash),
           "borrowed": round(borrowed),
           "loan": {"monthly_payment": round(mo, 2), "months": a.loan_term * 12,
                    "total_repaid": round(repaid), "interest": round(repaid - borrowed)},
           "true_all_in": round(cash + repaid),
           "not_modeled": ["aid changes year to year (verify renewal conditions)", "income-driven/forgiveness programs",
                            "living-cost variance", "the 5th/6th year risk (graduation rates are a real input)"]}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"{'year':>4}{'gross':>10}{'net after aid':>15}")
    for r in rows:
        print(f"{r['year']:>4}{r['gross']:>10,}{r['net_after_aid']:>15,}")
    print(f"net {a.years}-year cost: {net_total:,.0f}  ({cash:,.0f} cash + {borrowed:,.0f} borrowed)")
    print(f"the loan tail: {mo:,.2f}/mo for {a.loan_term} years = {repaid:,.0f} repaid ({repaid-borrowed:,.0f} interest)")
    print(f"true all-in (cash + repayments): {cash + repaid:,.0f} — vs sticker x years = {a.sticker*a.years:,.0f}")
    print("not modeled: aid renewal risk, income-driven plans, the 5th-year risk. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
