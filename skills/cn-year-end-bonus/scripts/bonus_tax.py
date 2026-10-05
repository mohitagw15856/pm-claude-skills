#!/usr/bin/env python3
"""Year-end bonus tax in mainland China (全年一次性奖金): separate versus combined.

Two treatments, valid until 31 December 2027 under 财政部 税务总局公告 2023 年第 30 号
(confirm the announcement is still current before relying on it):

- Separate taxation (单独计税): divide the bonus by 12, find the rate and quick
  deduction in the MONTHLY table, then tax = bonus x rate - quick deduction.
- Combined (并入综合所得): add the bonus to the year's comprehensive taxable income
  and tax it with the ANNUAL table; the bonus costs the difference.

It also lists the threshold traps: a bonus just above a bracket edge under
separate taxation can leave you with less after tax than one at the edge.
An estimate, not tax advice. Standard library only, no network access.

Usage
-----
    python3 bonus_tax.py --bonus 38000
    python3 bonus_tax.py --bonus 100000 --other-taxable 150000
    python3 bonus_tax.py --traps
    python3 bonus_tax.py --bonus 100000 --json
    python3 bonus_tax.py --selftest
"""
from __future__ import annotations

import argparse
import json
import sys

# (upper bound of the monthly amount, rate, quick deduction), monthly table
MONTHLY = [(3000, 0.03, 0), (12000, 0.10, 210), (25000, 0.20, 1410), (35000, 0.25, 2660),
           (55000, 0.30, 4410), (80000, 0.35, 7160), (float("inf"), 0.45, 15160)]
# (upper bound of annual taxable income, rate, quick deduction), annual table
ANNUAL = [(36000, 0.03, 0), (144000, 0.10, 2520), (300000, 0.20, 16920), (420000, 0.25, 31920),
          (660000, 0.30, 52920), (960000, 0.35, 85920), (float("inf"), 0.45, 181920)]
BASIS = "财政部 税务总局公告 2023 年第 30 号 (separate taxation until 31 December 2027); confirm it is current"


def _bracket(table, amount: float):
    for upper, rate, qd in table:
        if amount <= upper:
            return rate, qd
    raise ValueError("unreachable")


def separate_tax(bonus: float) -> float:
    """Tax on the bonus under separate taxation."""
    if bonus < 0:
        raise ValueError("bonus cannot be negative")
    rate, qd = _bracket(MONTHLY, bonus / 12)
    return round(max(bonus * rate - qd, 0.0), 2)


def annual_tax(taxable: float) -> float:
    """Tax on a year's comprehensive taxable income (after deductions)."""
    taxable = max(taxable, 0.0)
    rate, qd = _bracket(ANNUAL, taxable)
    return round(max(taxable * rate - qd, 0.0), 2)


def combined_tax(bonus: float, other_taxable: float) -> float:
    """Extra tax caused by adding the bonus to comprehensive income."""
    return round(annual_tax(other_taxable + bonus) - annual_tax(other_taxable), 2)


def traps() -> list:
    """Bonus ranges where separate taxation leaves less after tax than the bracket edge."""
    out = []
    for i, (upper, _, _) in enumerate(MONTHLY[:-1]):
        edge = upper * 12
        net_edge = edge - separate_tax(edge)
        rate2, qd2 = MONTHLY[i + 1][1], MONTHLY[i + 1][2]
        # Smallest bonus above the edge whose net equals the edge's net.
        break_even = (net_edge - qd2) / (1 - rate2)
        out.append({"from": edge, "to": round(break_even, 2), "net_at_edge": round(net_edge, 2)})
    return out


def calculate(bonus, other_taxable=None) -> dict:
    bonus = float(bonus)
    sep = separate_tax(bonus)
    r = {"bonus": bonus, "separate_tax": sep, "separate_net": round(bonus - sep, 2), "basis": BASIS, "notes": []}
    if other_taxable is not None:
        other = float(other_taxable)
        comb = combined_tax(bonus, other)
        r.update({"other_taxable": other, "combined_tax": comb, "combined_net": round(bonus - comb, 2),
                  "better": "separate" if sep <= comb else "combined", "saving": round(abs(sep - comb), 2)})
    else:
        r["notes"].append("Give --other-taxable (the year's comprehensive taxable income after the 60,000 standard deduction, social insurance and special deductions) to compare with combining.")
    for t in traps():
        if t["from"] < bonus < t["to"]:
            r["notes"].append(f"Threshold trap: a bonus between {t['from']:,.0f} and {t['to']:,.2f} nets less than one of {t['from']:,.0f} under separate taxation.")
    r["notes"].append("An estimate, not tax advice: check the current rules with the employer, 12366 or a tax adviser.")
    return r


def selftest() -> int:
    t = []
    eq = lambda name, got, want: t.append((name, abs(got - want) < 0.01, got, want))
    eq("36,000 separate", separate_tax(36000), 1080)
    eq("38,000 separate (jumps to 10%)", separate_tax(38000), 3590)
    eq("100,000 separate", separate_tax(100000), 9790)
    eq("first trap ends at 38,566.67", traps()[0]["to"], 38566.67)
    eq("second trap ends at 160,500", traps()[1]["to"], 160500)
    eq("combined 100,000 on 150,000", combined_tax(100000, 150000), 33080 - 13080)
    eq("annual 36,000", annual_tax(36000), 1080)
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"  FAIL {name}: got {got}, want {want}")
    print(f"bonus_tax selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Year-end bonus tax in mainland China: separate versus combined.")
    p.add_argument("--bonus", help="the year-end bonus, RMB, before tax")
    p.add_argument("--other-taxable", help="the year's comprehensive taxable income without the bonus, RMB")
    p.add_argument("--traps", action="store_true", help="list the threshold-trap ranges and exit")
    p.add_argument("--json", action="store_true", help="print JSON")
    p.add_argument("--selftest", action="store_true", help="run the built-in checks")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if a.traps:
        rows = traps()
        print(json.dumps(rows, indent=2) if a.json else "\n".join(f"{r['from']:>10,.0f} to {r['to']:>12,.2f}" for r in rows))
        return 0
    if a.bonus is None:
        p.error("--bonus is required")
    try:
        r = calculate(a.bonus, a.other_taxable)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    print(f"Separate taxation: tax RMB {r['separate_tax']:,.2f}, net RMB {r['separate_net']:,.2f}")
    if "combined_tax" in r:
        print(f"Combined: tax RMB {r['combined_tax']:,.2f}, net RMB {r['combined_net']:,.2f}")
        print(f"Better: {r['better']} (saves RMB {r['saving']:,.2f})")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
