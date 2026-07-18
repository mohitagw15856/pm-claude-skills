#!/usr/bin/env python3
"""Student loan strategy calculator for the student-loan-strategy skill.

Compares three uses of the same extra money: attack the loans (avalanche),
pay minimums and invest the extra, or ride toward a forgiveness horizon.
Deterministic, stdlib only.

Usage
-----
    python3 student_loan_strategy.py --loan "grad:38000:6.8:410" --loan "undergrad:12000:4.5:130" --extra 400
    python3 student_loan_strategy.py --loan "fed:52000:6.2:560" --extra 300 --forgiveness-months 84 --json
"""
from __future__ import annotations
import argparse, json, sys

def payoff(loans, extra):
    loans = [dict(l) for l in loans]
    months, interest = 0, 0.0
    while any(l["bal"] > 0.005 for l in loans) and months < 1200:
        months += 1
        for l in loans:
            if l["bal"] > 0:
                i = l["bal"] * l["apr"] / 100 / 12
                l["bal"] += i
                interest += i
        budget = extra + sum(l["min"] for l in loans if l["bal"] > 0)
        for l in sorted((x for x in loans if x["bal"] > 0), key=lambda x: (-x["apr"], x["name"])):
            pay = min(l["min"], l["bal"], budget)
            l["bal"] -= pay
            budget -= pay
        for l in sorted((x for x in loans if x["bal"] > 0), key=lambda x: (-x["apr"], x["name"])):
            if budget <= 0:
                break
            pay = min(budget, l["bal"])
            l["bal"] -= pay
            budget -= pay
    return months, round(interest, 2)

def main(argv=None):
    ap = argparse.ArgumentParser(description="Extra money vs student loans: attack, invest, or ride to forgiveness.")
    ap.add_argument("--loan", action="append", required=True, help="name:balance:apr:minimum (repeatable)")
    ap.add_argument("--extra", type=float, required=True, help="Monthly money beyond the minimums")
    ap.add_argument("--invest-return", type=float, default=6.0, help="Assumed annual return if invested instead, pct (default 6)")
    ap.add_argument("--forgiveness-months", type=int, default=0,
                    help="Months until a forgiveness program would discharge the remainder (0 = not on a track)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    loans = []
    for spec in a.loan:
        try:
            n, b, r, m = spec.split(":")
            loans.append({"name": n, "bal": float(b), "apr": float(r), "min": float(m)})
        except ValueError:
            ap.error(f"bad --loan '{spec}' — expected name:balance:apr:minimum")

    atk_months, atk_interest = payoff(loans, a.extra)
    min_months, min_interest = payoff(loans, 0)
    # invest branch: pay minimums for min_months; extra compounds monthly
    r = a.invest_return / 100 / 12
    pot = 0.0
    for _ in range(min_months):
        pot = pot * (1 + r) + a.extra
    invest = {"months_in_debt": min_months, "interest_paid": min_interest, "portfolio_at_payoff": round(pot)}
    weighted_apr = sum(l["bal"] * l["apr"] for l in loans) / sum(l["bal"] for l in loans)

    forgive = None
    if a.forgiveness_months > 0:
        # minimums only until the horizon; remaining balance discharged
        sim = [dict(l) for l in loans]
        paid = 0.0
        for _ in range(a.forgiveness_months):
            for l in sim:
                if l["bal"] > 0:
                    l["bal"] += l["bal"] * l["apr"] / 100 / 12
                    pay = min(l["min"], l["bal"])
                    l["bal"] -= pay
                    paid += pay
        forgiven = round(sum(l["bal"] for l in sim))
        forgive = {"months": a.forgiveness_months, "total_paid": round(paid), "balance_forgiven": forgiven,
                   "note": "extra payments on a forgiveness track REDUCE the forgiven amount - verify program rules"}

    out = {"loans": [{k: l[k] for k in ("name", "bal", "apr", "min")} for l in loans],
           "weighted_apr": round(weighted_apr, 2),
           "attack": {"months": atk_months, "interest_paid": atk_interest},
           "minimums_only": {"months": min_months, "interest_paid": min_interest},
           "invest_instead": invest,
           "forgiveness_track": forgive,
           "the_comparison": f"attacking is a guaranteed {weighted_apr:.2f}% return; investing assumes {a.invest_return:g}% unguaranteed",
           "not_modeled": ["tax treatment of interest/investments (jurisdiction-specific)", "rate changes on variable loans",
                            "forgiveness program eligibility risk"]}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"{len(loans)} loans, weighted APR {weighted_apr:.2f}% · extra {a.extra:,.0f}/mo")
    print(f"  attack (avalanche):  debt-free in {atk_months} mo ({atk_months/12:.1f} yr) · interest {atk_interest:,.2f}")
    print(f"  minimums + invest:   debt-free in {min_months} mo · interest {min_interest:,.2f} · portfolio ~{pot:,.0f} at payoff (at {a.invest_return:g}%)")
    if forgive:
        print(f"  forgiveness track:   pay {forgive['total_paid']:,} over {a.forgiveness_months} mo · ~{forgive['balance_forgiven']:,} forgiven — extra payments would shrink that; verify program rules")
    print(f"the honest frame: attacking = guaranteed {weighted_apr:.2f}%; investing = assumed {a.invest_return:g}% with risk. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
